export async function login(username, password) {
  try {
    const response = await fetch(
      'https://portfolio-api.localhost/api/auth/login',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
        
      }
    )
    if (!response.ok) {
      const error = await response.json().catch(() => null)
      throw new Error(error?.message || `Login failed (${response.status})`)
    }
  } catch (error) {
    console.error('Login error:', error)
    throw error
  }
}
export async function logout() {
  try {
    const response = await fetch(
      'https://portfolio-api.localhost/api/auth/logout',
      { method: 'POST', credentials: 'include' }
    )
    if (!response.ok) {
      const error = await response.json().catch(() => null)

      throw new Error(error?.message || `Logout failed (${response.status})`)
    }
    return await response.json()
  } catch (error) {
    console.error('Logout error:', error)
    throw error
  }
}
