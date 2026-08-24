import { useState } from 'react'
import s from './Login.module.scss'
import { useAuth } from '@src/AuthProvider/AuthProvider'
import { Navigate } from 'react-router-dom'
export default function Login() {
  const { login, isAuthentaticated } = useAuth()
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const handleSubmit = async (event) => {
    event.preventDefault()
    setError(null)
    try {
      await login(userName, password)
    } catch (error) {
      console.error(error)
      setError('Identifiants invalides')
    }
  }
  if (isAuthentaticated) {
    return <Navigate to="/dasboard" replace />
  }
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <span>Login</span>
        <input
          type="text"
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
          placeholder="Username"
        />
        <input
          type="text"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
        />
        {error && <p>{error}</p>}
        <button type="submit"> Se connecter </button>
      </form>
    </div>
  )
}
