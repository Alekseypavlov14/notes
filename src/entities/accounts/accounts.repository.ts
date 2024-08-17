import { AccountEntity, AccountEntityDTO } from './account.entity'
import { FirebaseRepository } from '@/shared/utils/firebase'

export const accountsRepository = new FirebaseRepository<AccountEntity, AccountEntityDTO>('accounts')
