import { createBrowserRouter } from 'react-router-dom'
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
    element: <div />
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
