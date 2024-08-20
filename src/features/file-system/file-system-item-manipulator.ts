import { getFileSystemItemsWithFilters, IFileSystemItem } from '@/entities/file-system-items'
import { getUserAccount } from '@/app/auth'
import { HTTPException } from '@/shared/utils/exception'
import { Repository } from '@/shared/utils/database'
import { EntityDTO } from '@/shared/types/entity'
import { findById } from '@/shared/utils/entities'
import { Id } from '@/shared/types/id'

export interface IFileSystemItemManipulator<E extends IFileSystemItem, DTO extends EntityDTO<IFileSystemItem>> {
  getUserItems(): Promise<E[]>
  create(dto: Omit<DTO, 'userId'>): Promise<E>
  move(id: Id, newRootId: Id): Promise<E>
  getPathSegments(id: Id): Promise<string[]>
  getPathDirectories(id: Id): Promise<IFileSystemItem[]>
}

export abstract class FileSystemItemManipulator<E extends IFileSystemItem, DTO extends EntityDTO<IFileSystemItem>> implements IFileSystemItemManipulator<E, DTO> {
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
}
