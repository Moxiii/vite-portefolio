import { useEffect, useState } from 'react';
import "./Carousel.scss";
import { useNavigate,useOutletContext } from 'react-router-dom';

export default function Carousel() {
  const [projets, setProjets] = useState([]);
  const navigate = useNavigate();
  const { setLoading } = useOutletContext();

  useEffect(() => {
    const fetchProjets = async () => {
      try {
        let response = await fetch('http://localhost:3000/api/projects');
        let data;
        let isFromApi = true;

        if (!response.ok) {
          console.warn('API non disponible, tentative de récupération du JSON');
          console.log('Response status:', response.status);
          response = await fetch('/Json/projects.json');
          isFromApi = false;

          if (!response.ok) {
            throw new Error('Erreur lors du chargement des données JSON');
          }
        }

        data = await response.json();
        if (!isFromApi) {
          data = data.map(projet => {
            const mockups = projet.img.filter(image => image.isMock === true); // Filtrer les mockups
            return {
              ...projet,
              img: mockups
            };
          });
        }
        setProjets(data);
      } catch (error) {
        console.error('Erreur lors du chargement des projets:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjets();
  }, [setLoading]);

  const handleClick = (id) => {
    navigate(`/projet/${id}`);
  };

  return (
    <div className="carousel">
      {projets.map((projet) => {
        const mockup = projet.img[0]?.src || '';
        return (
          <div
            key={projet.id}
            className="carousel-item"
            style={{ backgroundImage: `url(${mockup})` }}
            onClick={() => handleClick(projet.id)}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => e.key === 'Enter' && handleClick(projet.id)}
          >
            <div className="content">
              <h2>{projet.title}</h2>
              <span>{projet.description}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
