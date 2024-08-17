import { Entity } from '@/shared/types/entity'

export interface UserEntity extends Entity {
  email: string
  password: string
}
