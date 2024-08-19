import { IFileSystemItem } from '@/entities/file-system-items'
import { getUserAccount } from '@/app/auth'
import { HTTPException } from '@/shared/utils/exception'
import { Repository } from '@/shared/utils/database'
import { EntityDTO } from '@/shared/types/entity'
import { Id } from '@/shared/types/id'

export interface IFileSystemItemManipulator<E extends IFileSystemItem, DTO extends EntityDTO<IFileSystemItem>> {
  create(dto: Omit<DTO, 'userId'>): Promise<E>
  move(id: Id, newLocation: Id): Promise<E>
}

export abstract class FileSystemItemManipulator<E extends IFileSystemItem, DTO extends EntityDTO<IFileSystemItem>> implements IFileSystemItemManipulator<E, DTO> {
  constructor(private readonly repository: Repository<E, DTO>) {}

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
}