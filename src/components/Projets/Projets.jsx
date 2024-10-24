import './Projets.scss';
import { useState, useEffect } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faJava,faReact,faPython} from '@fortawesome/free-brands-svg-icons'
const iconMap={
  faReact,
  faJava,
  faPython
}
const Projets = () => {

  const { id } = useParams();
  const [projet, setProjet] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const {setLoading} = useOutletContext();
  useEffect(() => {
    const fetchProjet = async () => {
      try {
        let response;
        let data;

        // Essayer d'abord de récupérer les données de l'API
        try {
          response = await fetch(`http://localhost:3000/api/projects/${id}`);
          if (!response.ok) {
            throw new Error('Erreur lors de la récupération de l\'API');
          }
          data = await response.json();
          setProjet(data);
          return; // Sortir de la fonction si les données de l'API ont été récupérées
        } catch (error) {
          console.warn('L\'API ne répond pas, tentative de récupération du JSON', error);
        }

        // Si l'API échoue, récupérer les données depuis le fichier JSON
        response = await fetch('/Json/projects.json');
        if (!response.ok) {
          throw new Error('Erreur lors du chargement des données JSON locales');
        }

        data = await response.json();
        // Trouver le projet par ID dans les données JSON
        const foundProjet = data.find((p) => p.id === parseInt(id));
        if (!foundProjet) {
          throw new Error('Projet introuvable dans les données JSON');
        }
        const filteredData = foundProjet.img.filter(image=>image.isMock===false)
        setProjet({ ...foundProjet, img: filteredData });
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      } finally {
        setLoading(false); // Arrêter le chargement
      }
    };

    fetchProjet();
  }, [id, setLoading]);

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <>
      <div className="container projet">
        <div className="text-zone">
          <h1>{projet ? projet.title : 'Chargement...'}</h1>
          {projet ? projet.presentation.map((para, index)=>(
            <p key={index}>{para}</p>
          )): 'Chargement ...'}
        </div>
        <div className="carouselProjet">
          <div className="carousel__wrapper">
            {projet && projet.img.map((image, index) => (
                  <div
                    className={`item ${index === currentImageIndex ? 'visible' : ''}`}
                    key={index}
                    onClick={()=> handleImageClick(index)}
                  >
                    <img src={image.src} alt={image.title} />
                  </div>
                ))}
          </div>
          {projet && projet.img.length > 0 && (
            <footer className="carousel-footer">
              <div className="carousel-title-card">
                <h4>{projet.img[currentImageIndex].title}</h4>
              </div>
              <div className="links">
                {projet.links.map((link, index) => (
                  <div key={index}>
                    {Object.entries(link).map(([linkName, linkUrl]) => (
                      <a href={linkUrl} target="_blank" rel="noopener noreferrer" key={linkName}>
                        {linkName}
                      </a>
                    ))}
                  </div>
                ))}
              </div>
            </footer>
          )}
        </div>
      </div>
    </>
  );
};

export default Projets;
