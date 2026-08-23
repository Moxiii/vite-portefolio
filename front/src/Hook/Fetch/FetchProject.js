export default async function FetchProject() {
    try {
      const response = await fetch('/Json/projects.json');
        let data = await response.json();
        const filteredData = data.map(projet => {
          const isMockup = projet.img.filter(image => image.isMock === true);
          return {
            ...projet,
            isMockup,
            mockup: isMockup.length > 0 ? isMockup[0].src : '/Project/nomockup.png',
          };
        });
        return filteredData;
    } catch (error) {
      console.error("Erreur lors du chargement des projets:", error);
      return []
    }
}