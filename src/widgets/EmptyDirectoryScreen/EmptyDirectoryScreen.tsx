import { Headline } from '@/shared/components/Headline'
import { Center } from '@/shared/components/Center'
import styles from './EmptyDirectoryScreen.module.css'

export function EmptyDirectoryScreen() {
  return (
    <Center className={styles.EmptyDirectoryScreen}>
      <Headline level={4}>This directory is empty</Headline>
    
      <div className={styles.Separator}></div>

      <Headline level={6}>Click top right corner icons to create some stuff</Headline>
    </Center>
  )
}