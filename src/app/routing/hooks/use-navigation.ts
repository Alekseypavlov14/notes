import { useNavigate } from 'react-router-dom'
import { Id } from '@/shared/types/id'

export function useNavigation() {
  const navigate = useNavigate()
  
  return ({
    navigateLoginPage: () => navigate('/login'),
    navigateSignUpPage: () => navigate('/sign-up'),
    navigateHomePage: () => navigate('/'),
    navigateNotesPage: () => navigate('/notes'),
    navigateDirectoryPage: (directory: Id) => navigate(`/notes/${directory}`),
    navigateNotePage: (noteId: Id) => navigate(`note/${noteId}`),
    navigateCreateFileRelativePage: () => navigate('note/create'),
    navigateSettingsPage: () => navigate('/settings'),
  })
}
