import {
  createContext,
  createElement,
  useContext,
  useEffect,
  useState,
} from 'react'
import {
  me,
  login as loginRequest,
  logout as logoutRequest,
} from '@hook/Fetch/AuthFetch'

type User = {
  username: string
}

type AuthContextValue = {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (username: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

type AuthProviderProps = {
  children: React.ReactNode
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  async function login(username: string, password: string) {
    await loginRequest(username, password)
    const data = await me()
    setUser(data.user)
  }

  async function logout() {
    await logoutRequest()

    setUser(null)
  }
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
        login,
        logout,
      },
    },
    children
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }

  return context
}
