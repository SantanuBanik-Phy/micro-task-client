import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { RouterProvider } from 'react-router-dom'
import router from './routes/router'
import AuthProvider from './provider/AuthProvider'


import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { HelmetProvider } from 'react-helmet-async'

const queryClient = new QueryClient();




createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <div >
            <RouterProvider router={router} />
          </div>
        </HelmetProvider>
      </QueryClientProvider>
    </AuthProvider>
   
  </StrictMode>,
)
