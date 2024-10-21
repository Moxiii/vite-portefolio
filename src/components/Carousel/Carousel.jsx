import  { useEffect, useState } from 'react';
import "./Carousel.scss"
import { useNavigate } from 'react-router-dom'
export default function Carousel() {
  const [projets, setProjets] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch('/Json/projects.json') // URL correcte pour accéder au JSON
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erreur du chargement JSON');
        }
        return response.json();
      })
      .then((data) => setProjets(data))
      .catch((error) => console.error('Erreur du chargement Json:', error));
  }, []);
const handleClick = (id)=>{
  navigate(`/projet/${id}`);
}
  return (
    <div className="carousel">
      {projets.map((projet) => {
        // Cherche l'image de mockup pour le projet
        const mockup = projet.img.find(image => image.isMock)?.src || '';

        return (
          <div
            key={projet.id}
            className="carousel-item"
            style={{ backgroundImage: `url(${mockup})` }} // Définir l'arrière-plan ici
            onClick={() => handleClick(projet.id)}
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
