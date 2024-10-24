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
        let response;
        let data;
        try{
         response = await fetch('http://localhost:3000/api/projects');
          if (!response.ok) {
            throw new Error('Erreur de l\'API');
          }
         data = await response.json();
         setProjets(data)
        }
        catch(error)
        {(console.log(error))
        }
          response = await fetch('/Json/projects.json');
          if (!response.ok) {
            throw new Error('Erreur lors du chargement des données JSON');
        }

        data = await response.json();

          const filteredData = data.map(projet => {
            const mockups = projet.img.filter(image => image.isMock === true); // Filtrer les mockups
            return {
              ...projet,
              img: mockups
            };
          });

        setProjets(filteredData);
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
