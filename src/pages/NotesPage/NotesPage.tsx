import { useDirectoryContent } from '@/features/file-system'
import { useSettingsStore } from '@/features/settings'
import { StructureLayout } from '@/layouts/StructureLayout'
import { LoaderScreen } from '@/widgets/LoaderScreen'
import { NotesHeader } from '@/widgets/NotesHeader'
import { FileSystem } from '@/widgets/FileSystem'
import { Container } from '@/shared/components/Container'
import { Headline } from '@/shared/components/Headline'
import { Page } from '@/shared/components/Page'
import styles from './NotesPage.module.css'

export function NotesPage() {
  const { files, directories, isLoading } = useDirectoryContent()
  const settings = useSettingsStore((state) => state)

  if (isLoading) return (
    <Page className={styles.NotesPage}>
      <StructureLayout>
        <LoaderScreen>
          <Headline level={5}>Loading...</Headline>
        </LoaderScreen>
      </StructureLayout>
    </Page>
  )

  return (
    <Page className={styles.NotesPage}>
      <StructureLayout>
        <Container>
          <NotesHeader />

          <FileSystem 
            files={files} 
            directories={directories} 
            settings={settings} 
          />
        </Container>
      </StructureLayout>
    </Page>
  )
}