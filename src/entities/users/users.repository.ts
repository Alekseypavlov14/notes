import { UserEntity, UserEntityDTO } from './user.entity'
import { FirebaseRepository } from '@/shared/utils/firebase'

export const userRepository = new FirebaseRepository<UserEntity, UserEntityDTO>('users')
