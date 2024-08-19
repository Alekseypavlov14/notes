import { CreateDirectoryModal } from '@/widgets/CreateDirectoryModal'
import { useDirectoryContent } from '@/features/file-system'
import { useSettingsStore } from '@/features/settings'
import { StructureLayout } from '@/layouts/StructureLayout'
import { ProtectedRoute } from '@/app/auth'
import { useNavigation } from '@/app/routing'
import { LoaderScreen } from '@/widgets/LoaderScreen'
import { NotesHeader } from '@/widgets/NotesHeader'
import { FileSystem } from '@/widgets/FileSystem'
import { Container } from '@/shared/components/Container'
import { Headline } from '@/shared/components/Headline'
import { useModal } from '@/features/modals'
import { Page } from '@/shared/components/Page'
import styles from './NotesPage.module.css'

export function NotesPage() {
  const { files, directories, isLoading, revalidate } = useDirectoryContent()
  const settings = useSettingsStore((state) => state)

  const createDirectoryModal = useModal()
  const { navigateCreateFileRelativePage } = useNavigation()

  if (isLoading) return (
    <ProtectedRoute>
      <Page className={styles.NotesPage}>
        <StructureLayout>
          <LoaderScreen>
            <Headline level={5}>Loading...</Headline>
          </LoaderScreen>
        </StructureLayout>
      </Page>
    </ProtectedRoute>
  )

  return (
    <ProtectedRoute>
      <Page className={styles.NotesPage}>
        <StructureLayout>
          <Container>
            <NotesHeader 
              onDirectoryIconClick={createDirectoryModal.open}
              onFileIconClick={navigateCreateFileRelativePage}
            />
  
            <FileSystem 
              files={files} 
              directories={directories} 
              settings={settings} 
            />
  
            <CreateDirectoryModal 
              isOpened={createDirectoryModal.isOpened}
              close={createDirectoryModal.close}
              onSubmit={revalidate}
            />
          </Container>
        </StructureLayout>
      </Page>
    </ProtectedRoute>
  )
}