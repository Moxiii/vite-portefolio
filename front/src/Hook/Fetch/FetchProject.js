export async function FetchProject() {
  try {
    const response = await fetch(
      'https://portfolio-api.localhost/api/projects/public'
    )
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
    const response = await fetch(
      `https://portfolio-api.localhost/api/projects/${id}`
    )
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error('Erreur lors du chargement du projet:', error)
    return []
  }
}
