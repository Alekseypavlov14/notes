import { usePathDirectories } from '@/features/file-system'
import { BreadcrumbsItem } from '../types/breadcrumbs-item'

export function useBreadcrumbs(): BreadcrumbsItem[] {
  const directories = usePathDirectories()

  const segments: BreadcrumbsItem[] = directories.map(directory => ({
    title: directory.name,
    href: `/notes/${directory.id}`
  }))

  return segments
}