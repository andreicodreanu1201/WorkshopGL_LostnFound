import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { router } from './routes/routes'
import { AuthProvider } from './context/AuthContext'
import { NotificationProvider } from './context/NotificationContext'
import NotificationContainer from './components/NotificationContainer'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <NotificationProvider>
    <AuthProvider>
      <RouterProvider router={router} />
      <NotificationContainer />
    </AuthProvider>
    </ NotificationProvider>
    </QueryClientProvider>
  </StrictMode>
);
