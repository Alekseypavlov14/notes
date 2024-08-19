import { createBrowserRouter, Navigate } from 'react-router-dom'
import { SettingsPage } from '@/pages/SettingsPage'
import { SignUpPage } from '@/pages/SignUpPage'
import { LoginPage } from '@/pages/LoginPage'
import { NotesPage } from '@/pages/NotesPage'

export const routing = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to='/notes' />
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/sign-up',
    element: <SignUpPage />
  },
  {
    path: '/notes/:id?',
    element: <NotesPage />
  },
  {
    path: '/settings',
    element: <SettingsPage />
  },
  {
    path: '*',
    element: <div />
  }
])
