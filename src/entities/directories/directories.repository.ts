import { DirectoryEntity, DirectoryEntityDTO } from './directory.entity'
import { FirebaseRepository } from '@/shared/utils/firebase'

export const directoriesRepository = new FirebaseRepository<DirectoryEntity, DirectoryEntityDTO>('directories')
