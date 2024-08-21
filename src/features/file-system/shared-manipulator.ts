import { FileSystemItemManipulator } from './file-system-item-manipulator'
import { directoriesManipulator } from './directory-manipulator'
import { filesManipulator } from './file-manipulator'
import { IFileSystemItem } from '@/entities/file-system-items'
import { HTTPException } from '@/shared/utils/exception'
import { Id } from '@/shared/types/id'

export interface ISharedManipulator extends Pick<FileSystemItemManipulator, 'move' | 'delete'> {}

export class SharedManipulator implements ISharedManipulator {
  constructor(private readonly manipulators: FileSystemItemManipulator[]) {}

  async move(id: Id, newRootId: Id): Promise<IFileSystemItem> {
    const results = await Promise.all(this.manipulators.map(manipulator => manipulator.move(id, newRootId).catch(() => null)))
    const foundResult = results.find(results => Boolean(results))

    if (!foundResult) throw new HTTPException(404)

    return foundResult
  }

  async delete(id: Id): Promise<IFileSystemItem> {
    const results = await Promise.all(this.manipulators.map(manipulator => manipulator.delete(id).catch(() => null)))
    const foundResult = results.find(results => Boolean(results))

    if (!foundResult) throw new HTTPException(404)

    return foundResult
  }
}

export const sharedManipulator = new SharedManipulator([filesManipulator, directoriesManipulator])
