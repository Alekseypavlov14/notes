import { useDirectoryContent } from '@/features/file-system'
import { StructureLayout } from '@/widgets/StructureLayout'
import { Container } from '@/shared/components/Container'
import { Headline } from '@/shared/components/Headline'
import { Page } from '@/shared/components/Page'
import styles from './NotesPage.module.css'

export function NotesPage() {
  const { files, directories, isLoading } = useDirectoryContent()

  if (isLoading) return <Headline>Loading</Headline>

  return (
    <Page className={styles.NotesPage}>
      <StructureLayout>
        <Container>
          <Headline level={2}>Notes</Headline>
        </Container>
      </StructureLayout>
    </Page>
  )
}