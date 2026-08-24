import { Outlet, Navigate } from 'react-router-dom'

export default function ProtectedRoute() {
  const isAuth = true
  if (!isAuth) {
    return <Navigate to="/" replace />
  }
  return <Outlet />
}
