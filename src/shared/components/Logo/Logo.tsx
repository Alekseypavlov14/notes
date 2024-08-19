import { useNavigation } from '@/app/routing'
import styles from './Logo.module.css'

export function Logo() {
  const { navigateHomePage } = useNavigation()

  return (
    <div 
      className={styles.Logo}
      onClick={navigateHomePage}
    >
      NOTES
    </div>
  )
}