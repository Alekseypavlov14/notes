import { getFileSystemItemsWithFilters, IFileSystemItem } from '@/entities/file-system-items'
import { directoriesRepository } from '@/entities/directories'
import { filesRepository } from '@/entities/files'
import { getUserAccount } from '@/app/auth'
import { HTTPException } from '@/shared/utils/exception'
import { mergeArrays } from '@/shared/utils/lists'
import { Repository } from '@/shared/utils/database'
import { EntityDTO } from '@/shared/types/entity'
import { findById } from '@/shared/utils/entities'
import { Id } from '@/shared/types/id'

export interface IFileSystemItemManipulator<E extends IFileSystemItem = IFileSystemItem, DTO extends EntityDTO<IFileSystemItem> = EntityDTO<IFileSystemItem>> {
  getUserItems(): Promise<E[]>
  create(dto: Omit<DTO, 'userId'>): Promise<E>
  move(id: Id, newRootId: Id): Promise<E>
  rename(id: Id, newName: string): Promise<E>
  getPathSegments(id: Id): Promise<string[]>
  getPathDirectories(id: Id): Promise<IFileSystemItem[]>
  delete(id: Id): Promise<E>
}

export abstract class FileSystemItemManipulator<E extends IFileSystemItem = IFileSystemItem, DTO extends EntityDTO<IFileSystemItem> = EntityDTO<IFileSystemItem>> implements IFileSystemItemManipulator<E, DTO> {
  constructor(private readonly repository: Repository<E, DTO>) {}

  async getUserItems(): Promise<E[]> {
    const account = await getUserAccount()

    const items = this.repository.getByFilters({ userId: account.id } as Partial<E>)

    return items
  }

  async create(dto: Omit<DTO, 'userId'>): Promise<E> {
    const account = await getUserAccount()

    const fileSystemItemDTO: DTO = {
      ...dto,
      userId: account.id
    } as DTO

    const fileSystemItem = await this.repository.create(fileSystemItemDTO)
    if (!fileSystemItem) throw new HTTPException(500)

    return fileSystemItem
  }

  async move(id: Id, newRootId: Id): Promise<E> {
    const file = await this.repository.getById(id)
    if (!file) throw new HTTPException(404)

    const fileSystemItemUpdateDTO: Partial<DTO> = {
      rootId: newRootId
    } as Partial<DTO>

    const updatedFile = await this.repository.updateById(id, fileSystemItemUpdateDTO)
    if (!updatedFile) throw new HTTPException(404)

    return updatedFile
  }

  async rename(id: Id, newName: string): Promise<E> {
    const fileSystemItem = await this.repository.getById(id)
    if (!fileSystemItem) throw new HTTPException(404)

    const fileSystemItemUpdateDTO: Partial<DTO> = {
      name: newName
    } as Partial<DTO>

    const updatedFileSystemItem = await this.repository.updateById(id, fileSystemItemUpdateDTO)
    if (!updatedFileSystemItem) throw new HTTPException(404)

    return updatedFileSystemItem
  }

  async getPathSegments(id: Id): Promise<string[]> {
    const account = await getUserAccount()

    const { items: fileSystemItems } = await getFileSystemItemsWithFilters({ userId: account.id })

    const fileSystemItem = await this.repository.getById(id)
    if (!fileSystemItem) throw new HTTPException(404)

    return this.recursivelyGetFileSystemData(fileSystemItems, fileSystemItem, item => item.name)
  }

  async getPathDirectories(id: Id): Promise<IFileSystemItem[]> {
    const account = await getUserAccount()

    const { items: fileSystemItems } = await getFileSystemItemsWithFilters({ userId: account.id })

    const fileSystemItem = await this.repository.getById(id)
    if (!fileSystemItem) throw new HTTPException(404)

    return this.recursivelyGetFileSystemData(fileSystemItems, fileSystemItem, item => item)
  }

  private recursivelyGetFileSystemData<T>(
    fileSystemItems: IFileSystemItem[], 
    fileSystemItem: IFileSystemItem, 
    selector: (item: IFileSystemItem) => T
  ): T[] {
    if (!fileSystemItem) return []

    const parentFileSystemItem = fileSystemItems.find(findById(fileSystemItem.rootId))
    if (!parentFileSystemItem) return [selector(fileSystemItem)]
    
    return this.recursivelyGetFileSystemData(fileSystemItems, parentFileSystemItem, selector).concat([selector(fileSystemItem)])
  }

  async delete(id: Id): Promise<E> {
    const account = await getUserAccount()

    const { items } = await getFileSystemItemsWithFilters({ userId: account.id })

    const fileSystemItem = await this.repository.getById(id)
    if (!fileSystemItem) throw new HTTPException(404)

    const nestedFileSystemItemIds = this.recursivelyGetNestedFileSystemItems(items, fileSystemItem, item => item.id)

    await Promise.all(nestedFileSystemItemIds.map(async id => {
      await filesRepository.deleteById(id)
      await directoriesRepository.deleteById(id)
    }))

    return fileSystemItem
  }

  private recursivelyGetNestedFileSystemItems<T>(
    fileSystemItems: IFileSystemItem[], 
    fileSystemItem: IFileSystemItem,
    selector: (item: IFileSystemItem) => T
  ): T[] {
    if (!fileSystemItem) return []

    const childrenItems = fileSystemItems.filter(item => item.rootId === fileSystemItem.id)
    const childrenItemsData = childrenItems.map(item => this.recursivelyGetNestedFileSystemItems(fileSystemItems, item, selector))

    const mergedChildrenItemsData = mergeArrays(childrenItemsData)

    return [selector(fileSystemItem), ...mergedChildrenItemsData]
  }
}
