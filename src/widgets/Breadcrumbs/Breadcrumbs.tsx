import { BreadcrumbsItem } from './types/breadcrumbs-item'
import { useBreadcrumbs } from './hooks/use-breadcrumbs'
import { HomeOutlined } from '@ant-design/icons'
import { Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'
import styles from './Breadcrumbs.module.css'

export function Breadcrumbs() {
  const breadcrumbs = useBreadcrumbs()

  const rootSegment: BreadcrumbsItem = { 
    title: (
      <span className={styles.Root}>
        <HomeOutlined className={styles.RootIcon} />
        <span className={styles.RootText}>Home</span>
      </span>
    ),
    href: '/notes'
  }

  const breadcrumbsSegments: BreadcrumbsItem[] = [rootSegment, ...breadcrumbs]

  return (
    <Breadcrumb 
      className={styles.Breadcrumbs}
      items={breadcrumbsSegments}
      separator='>'

      itemRender={(route, _, routes) => {
        const isLast = route.href === routes.at(-1)?.href

        return isLast ? (
          <span className={styles.LastItem}>{route.title}</span>
        ) : (
          <Link 
            className={styles.BreadcrumbLink} 
            to={route.href || ''}
          >
            {route.title}
          </Link>
        )
      }}
    />
  )
}