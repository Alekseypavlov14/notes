import { usePathDirectories } from '@/features/file-system'
import { HomeOutlined } from '@ant-design/icons'
import { ReactNode } from 'react'

interface BreadcrumbsItem {
  title: ReactNode,
  href: string
}

const rootSegment: BreadcrumbsItem = { 
  title: <HomeOutlined />,
  href: '/notes'
}

export function useBreadcrumbs(): BreadcrumbsItem[] {
  const directories = usePathDirectories()

  const segments: BreadcrumbsItem[] = directories.map(directory => ({
    title: directory.name,
    href: `/notes/${directory.id}`
  }))

  return [rootSegment, ...segments]
}
