import { AccountEntity, getAccountByFilters } from '@/entities/accounts'
import { credentialsStorage } from './credentials'
import { HTTPException } from '@/shared/utils/exception'

export async function getUserAccount(): Promise<AccountEntity> {
  const credentials = credentialsStorage.getValue()
  if (!credentials) throw new HTTPException(401)

  const account = await getAccountByFilters(credentials)
  if (!account) throw new HTTPException(401)

  return account
}
