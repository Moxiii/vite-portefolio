  import { useEffect, useState } from 'react';
  import { useNavigate,useOutletContext } from 'react-router-dom';
  import './Carousel.scss'
  import { useMediaQuery } from 'react-responsive'
  export default function Carousel({ lenisRef }) {
    const [projets, setProjets] = useState([]);
    const navigate = useNavigate();
    const { setLoading } = useOutletContext() || {};

    useEffect(() => {
      const fetchProjets = async () => {
        try {
          let response = await fetch('http://localhost:3000/api/projects').catch(() => null);
          if (response && response.ok) {
            // Si l'API est disponible et répond correctement
            let data = await response.json();
            setProjets(data);
          } else {
            // Si l'API est indisponible, basculer vers les données locales
            console.warn("API non disponible, chargement des données locales...");

            response = await fetch('/Json/projects.json');
            if (response.ok) {
              let data = await response.json();
              const filteredData = data.map(projet => ({
                ...projet,
                img: projet.img.filter(image => image.isMock === true)
              }));
              setProjets(filteredData);
            } else {
              throw new Error("Erreur lors du chargement des données locales");
            }
          }
        } catch (error) {
          console.error("Erreur lors du chargement des projets:", error);
        } finally {
          setLoading(false); // Désactiver le chargement en toutes circonstances
        }
      };

      fetchProjets();
    }, []);

    const handleClick = (id) => {
      navigate(`/projet/${id}`);
    };
    const [selectedProject, setSelectedProject] = useState(null);
    const handleReadMore = (projet)=>{
      selectedProject(projet);
    }
    const closeModal = () => {
      setSelectedProject(null);
    }
  const isDesktop = useMediaQuery({minWidth:769})
    return (
      <>
      {isDesktop ? (
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
        ):(
          <div className="projects">
      {projets.map((projet) => {
        return (
        <div key={projet.id} className="card-container">
      <div className="card">
        <figure>
          <img src={projet.img[0]?.src || ''} alt=""  />
        </figure>
        <div className="card-content">
        <h2>{projet.title}</h2>
        <p>{projet.description}</p>
        <a onClick={() => handleReadMore(projet)} className="read-more">
          Read more
        </a>
        </div>
      </div>
      </div>
    );
  })}
  </div>
      )
      }
      </>
        );
  }
