export function getDirectoryItemsAmount(amount: number) {
  if (amount <= 0) return 'Empty'

  const suffix = amount === 1 ? 'item' : 'items'

  return `${amount} ${suffix}`
}
