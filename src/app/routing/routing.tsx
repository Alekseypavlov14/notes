import { createBrowserRouter } from 'react-router-dom'
import { SignUpPage } from '@/pages/SignUpPage'
import { LoginPage } from '@/pages/LoginPage'

export const routing = createBrowserRouter([
  {
    path: '/',
    element: <div />
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
    path: '/settings',
    element: <div />
  },
  {
    path: '*',
    element: <div />
  }
])
