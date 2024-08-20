import { createBrowserRouter, Navigate } from 'react-router-dom'
import { CreateNotePage } from '@/pages/CreateNotePage'
import { SettingsPage } from '@/pages/SettingsPage'
import { SignUpPage } from '@/pages/SignUpPage'
import { LoginPage } from '@/pages/LoginPage'
import { NotesPage } from '@/pages/NotesPage'
import { NotePage } from '@/pages/NotePage'

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
    path: '/notes/:id?/note/:noteId',
    element: <NotePage />
  },
  {
    path: '/notes/:id?/note/create',
    element: <CreateNotePage />
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
