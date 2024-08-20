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
    navigateSettingsPage: () => navigate('/settings'),
    navigateCreateFileRelativePage: () => navigate('create/file'),
  })
}
