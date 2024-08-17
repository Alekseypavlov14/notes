import { createBrowserRouter } from 'react-router-dom'

export const routing = createBrowserRouter([
  {
    path: '/',
    element: <div />
  },
  {
    path: '/login',
    element: <div />
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
