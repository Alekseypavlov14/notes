import { directoriesManipulator, filesManipulator } from '../file-system'
import { directoriesRepository } from '@/entities/directories'
import { filesRepository } from '@/entities/files'
import { deleteAccount } from '@/app/auth'

export async function deleteAccountAndUserData() {
  const files = await filesManipulator.getUserItems()
  const directories = await directoriesManipulator.getUserItems()

  await deleteAccount()

  await Promise.all(files.map((file) => filesRepository.deleteById(file.id)))
  await Promise.all(directories.map((directory) => directoriesRepository.deleteById(directory.id)))
}
