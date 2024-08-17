import { Entity, EntityDTO } from '@/shared/types/entity'

export interface UserEntity extends Entity {
  email: string
  password: string
}

export interface UserEntityDTO extends EntityDTO<UserEntity> {}
