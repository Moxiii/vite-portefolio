import { useEffect, useState } from 'react';
import "./Carousel.scss";
import { useNavigate } from 'react-router-dom';

export default function Carousel() {
  const [projets, setProjets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/api/projects')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des projets');
        }
        return response.json();
      })
      .then((data) => {
        setProjets(data);
      })
      .catch((error) => console.error('Erreur du chargement Json:', error));
  }, []);

  const handleClick = (id) => {
    navigate(`/projet/${id}`);
  };

  return (
    <div className="carousel">
      {projets.map((projet) => {
        // Filtrer les images pour obtenir le mockup
        const mockup = projet.img.find(image => image[1] === "1")?.[0] || '';

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
              <span>{projet.desc}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
