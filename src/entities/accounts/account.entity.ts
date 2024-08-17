import { Entity, EntityDTO } from '@/shared/types/entity'

export interface AccountEntity extends Entity {
  email: string
  password: string
}

export interface AccountEntityDTO extends EntityDTO<AccountEntity> {}
