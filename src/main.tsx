import { AntDesignProvider } from './layouts/AntDesignProvider'
import { RouterProvider } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { routing } from '@/app/routing'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <AntDesignProvider>
    <RouterProvider router={routing} />
  </AntDesignProvider>
)
