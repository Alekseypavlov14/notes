import { useEffect, useState } from 'react'
import { getUserAccount } from '@/app/auth'
import { AccountEntity } from '@/entities/accounts'
import { Nullable } from '@/shared/types/nullable'

export interface UseAccountResult {
  account: Nullable<AccountEntity>
  isLoading: boolean
}

export function useAccount(): UseAccountResult {
  const [account, setAccount] = useState<Nullable<AccountEntity>>(null)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    getUserAccount()
      .then(setAccount)
      .catch(() => setAccount(null))
      .finally(() => setLoading(false))
  }, [])

  return { account, isLoading } 
}
