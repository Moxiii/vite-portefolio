import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '@src/AuthProvider/AuthProvider'
export default function ProtectedRoute() {
  const auth = useAuth()
  if (!auth) {
    return null
  }
  const { isAuthenticated, isLoading } = auth
  if (isLoading) {
    return null
  }
  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }
  return <Outlet />
}
