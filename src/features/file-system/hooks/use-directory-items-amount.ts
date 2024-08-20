import { getFileSystemItemsWithFilters, IFileSystemItem } from '@/entities/file-system-items'
import { useEffect, useState } from 'react'
import { useAccount } from '@/features/accounts'
import { Id } from '@/shared/types/id'

export interface UseDirectoryItemsAmountResult { 
  getAmountById: (id: Id) => number
  revalidate: () => Promise<void>
  isLoading: boolean
}

export function useDirectoryItemsAmount(): UseDirectoryItemsAmountResult {
  const [fileSystemItems, setFileSystemItems] = useState<IFileSystemItem[]>([])
  const [isLoading, setLoading] = useState(true)
  const { account } = useAccount()

  useEffect(() => {
    revalidateFileSystemItems()
  }, [account])

  async function revalidateFileSystemItems() {
    if (!account) return 

    setLoading(true)

    return getFileSystemItemsWithFilters({ userId: account.id })
      .then(({ items }) => setFileSystemItems(items))
      .catch(() => setFileSystemItems([]))
      .finally(() => setLoading(false))
  }

  function getItemsAmountById(id: Id) {
    return fileSystemItems.filter(item => item.rootId === id).length
  }

  return ({
    revalidate: revalidateFileSystemItems,
    getAmountById: getItemsAmountById,
    isLoading,
  })
}
