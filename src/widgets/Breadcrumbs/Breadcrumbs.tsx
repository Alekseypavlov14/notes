import { useBreadcrumbs } from './hooks/use-breadcrumbs'
import { Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'
import styles from './Breadcrumbs.module.css'

export function Breadcrumbs() {
  const breadcrumbs = useBreadcrumbs()

  return (
    <Breadcrumb 
      className={styles.Breadcrumbs}
      items={breadcrumbs}
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