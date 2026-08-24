import s from './Dashboard.module.scss'
import { useAuth } from '@src/AuthProvider/AuthProvider'
export default function dashboard() {
  const { logout } = useAuth()
  const handleLogout = async () => {
    await logout()
  }
  return (
    <div className="container">
      <span>Dashboard</span>
      <button onClick={() => handleLogout()}>Deconnection</button>
    </div>
  )
}
