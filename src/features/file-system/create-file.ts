import { FileEntityDTO, filesRepository } from '@/entities/files'
import { getUserAccount } from '@/app/auth'

export async function createFile(fileData: Omit<FileEntityDTO, 'userId'>) {
  const account = await getUserAccount()

  const fileEntityDTO: FileEntityDTO = {
    ...fileData,
    userId: account.id
  }

  const file = await filesRepository.create(fileEntityDTO)

  return file
}