import { FileEntity, FileEntityDTO } from './file.entity'
import { FirebaseRepository } from '@/shared/utils/firebase'

export const filesRepository = new FirebaseRepository<FileEntity, FileEntityDTO>('files')
