import {
  createContext,
  createElement,
  useContext,
  useEffect,
  useState,
} from 'react'
import { me } from '@hook/Fetch/AuthFetch'

type User = {
  username: string
}

type AuthContextValue = {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

type AuthProviderProps = {
  children: React.ReactNode
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    me()
      .then((data) => {
        setUser(data.user)
      })
      .catch(() => {
        setUser(null)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  return createElement(
    AuthContext.Provider,
    {
      value: {
        user,
        isAuthenticated: user !== null,
        isLoading,
      },
    },
    children
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
