import s from './Dashboard.module.scss'
import { useAuth } from '@src/AuthProvider/AuthProvider'
import {
  FetchAllProject,
  createProject,
  deleteProject,
  updateProject,
} from '@src/Hook/Fetch/FetchProject'
export default function dashboard() {
  const { logout } = useAuth()
  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }
  return (
    <div className="container">
      <span>Dashboard</span>
      <button onClick={() => handleLogout()}>Deconnection</button>
    </div>
  )
}
