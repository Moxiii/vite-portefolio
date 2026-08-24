const API_URL = 'https://portfolio-api.localhost/api/projects'
export async function FetchProject() {
  try {
    const response = await fetch(`${API_URL}/public`)
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }
    const data = await response.json()
    return data.map((projet) => {
      const mockups =
        projet.images?.filter((image) => image.isMock === true) ?? []

      return {
        ...projet,
        isMockup: mockups,
        mockup: mockups.length > 0 ? mockups[0].src : '/Project/nomockup.png',
      }
    })
  } catch (error) {
    console.error('Erreur lors du chargement des projets:', error)
    return []
  }
}
export async function FetchAllProject() {
  try {
    const response = await fetch(API_URL, { credentials: 'include' })
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }
    const data = await response.json()
    return data.map((projet) => {
      const mockups =
        projet.images?.filter((image) => image.isMock === true) ?? []

      return {
        ...projet,
        isMockup: mockups,
        mockup: mockups.length > 0 ? mockups[0].src : '/Project/nomockup.png',
      }
    })
  } catch (error) {
    console.error('Erreur lors du chargement des projets:', error)
    return []
  }
}
export async function FetchProjectById(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, { credentials: 'include' })
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error('Erreur lors du chargement du projet:', error)
    return []
  }
}
export async function deleteProject(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    })
    if (!response.ok) {
      const error = await response.json().catch(() => null)

      throw new Error(error?.message || `HTTP ${response.status}`)
    }

    return true
  } catch (error) {
    console.error('Erreur lors de la suppression du projet:', error)
    throw error
  }
}
export async function createProject(project) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(project),
    })
    if (!response.ok) {
      const error = await response.json().catch(() => null)

      throw new Error(error?.message || `HTTP ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error('Erreur lors de la création du projet:', error)
    throw error
  }
}
export async function updateProject(id, project) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => null)

      throw new Error(error?.message || `HTTP ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Erreur lors de la modification du projet:', error)
    throw error
  }
}
