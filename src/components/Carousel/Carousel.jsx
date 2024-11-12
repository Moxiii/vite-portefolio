  import { useEffect, useRef, useState } from 'react'
  import { useNavigate,useOutletContext } from 'react-router-dom';
  import './Carousel.scss'
  import { useMediaQuery } from 'react-responsive'
  import { useVisibility,VisibilityProvider } from '../../Hook/VisibilityProvider/Visibilityprovider.jsx'
  import { useStore } from '../../Hook/Scrolll/Store.js'

  export default function Carousel() {
    const PARAGRAPH_LIMIT = 2;
    const MAX_PARAGRAPH_LENGTH = 300;

    const [flippedCards, setFlippedCards] = useState({});
    const [projets, setProjets] = useState([]);
    const navigate = useNavigate();
    const { setLoading } = useOutletContext() || {};
    const handleClick = (id) => {
      navigate(`/projet/${id}`);
    };
    const [selectedProject, setSelectedProject] = useState(null);
    const handleReadMore = (projet)=>{
      setSelectedProject(projet);
    }
    const closeModal = () => {
      setSelectedProject(null);
    }

    const handleFlipCard = (id) => {
      setFlippedCards(prev =>({...prev , [id]: !prev[id]}))
    }
    const isDesktop = useMediaQuery({minWidth:769})
    const projectRefs = useRef([]);
    const { visibleProjects , setVisibleProjects } = useVisibility() ;
    const lenis = useStore(state => state.lenis)

    useEffect(() => {
      const fetchProjets = async () => {
        try {
          let response = await fetch('http://localhost:3000/api/projects').catch(() => null);
          if (response && response.ok) {
            let data = await response.json();
            const filteredData = data.map(projet => ({
              ...projet,
              img: projet.img.filter(image => image.isMock === true),
              mockup: projet.img.length > 0 ? projet.img[0].src : '../../Project/nomockup.png'
            }));
            setProjets(filteredData);
          } else {
            // Si l'API est indisponible, basculer vers les données locales
            console.warn("API non disponible, chargement des données locales...");

            response = await fetch('/Json/projects.json');
            if (response.ok) {
              let data = await response.json();
              const filteredData = data.map(projet => {
                const isMockup = projet.img.filter(image => image.isMock === true);
                return {
                  ...projet,
                  isMockup,
                  mockup: isMockup.length > 0 ? isMockup[0].src : '/Project/nomockup.png',
                };
              });
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

    useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const projectId = entry.target.getAttribute('data-id');
          if (entry.isIntersecting) {
            setVisibleProjects((prev) =>
              !prev.includes(projectId) ? [...prev, projectId] : prev
            );
          } else {
            setVisibleProjects((prev) => prev.filter((id) => id !== projectId));
          }
        });
      },
      { threshold: 0.5 }
    );

    projectRefs.current.forEach((project) => {
      if (project) observer.observe(project);
    });

    return () => {
      observer.disconnect();
    };
  }, [setVisibleProjects]);

    useEffect(()=>{
      if(!lenis) return;
      lenis.on('scroll' , ()=>{
        const currentIndex = Math.floor(lenis.scrollY / window.innerHeight);
        const projectId = projets[currentIndex]?.id;
        setVisibleProjects([projectId]);
        return ()=>{
          lenis.off('scroll');
        }
      })
},[lenis,projets,setVisibleProjects]);


    return (
      <>
      {isDesktop ? (
        <div className="carousel">
          {projets.map((projet) => {
            return (
              <div
                key={projet.id}
                className="carousel-item"
                style={{ backgroundImage: `url(${projet.mockup})` }}
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
        <VisibilityProvider>
          <div className="projects" id='projects'>
            {projets.map((projet, index) => (
              <div
                key={projet.id}
                className={`card-container ${visibleProjects.includes(projet.id) ? 'active' : ''}`}
                data-id={projet.id}
                ref={(el) => (projectRefs.current[index] = el || null)}

              >
                <div className={`card ${flippedCards[projet.id] ? 'is-switched' : ''}`}>
                  <div className="card__wrapper">
                    <div className={`card__side is-active`}>
                      <figure>
                        <img src={projet.mockup} alt={projet.title} />
                      </figure>
                      <div className="card-content">
                        <h2>{projet.title}</h2>
                        <p>{projet.description}</p>
                        <a className="read-more"
                           onClick={() => handleFlipCard(projet.id)} >
                          Read more
                        </a>
                      </div>
                    </div>
                    <div className={`card__side card__side--back`}>
                      <div className="card-content">
                        <h2>{projet.title}</h2>

                        {Array.isArray(projet.presentation) ? (
                          projet.presentation
                            .filter((item) => {
                              // Filtrer les éléments qui sont des chaînes et ne contiennent pas de titre
                              return typeof item === 'string' && item.length <= MAX_PARAGRAPH_LENGTH;
                            })
                            .slice(0, PARAGRAPH_LIMIT) // Limiter le nombre de paragraphes à afficher
                            .map((para, index) => (
                              <p key={index}>{para}</p>
                            ))
                        ) : (
                          projet.presentation
                            .split('\n')
                            .filter((para) => para.length <= MAX_PARAGRAPH_LENGTH)
                            .filter((para) => !para.startsWith('<h'))
                            .slice(0, PARAGRAPH_LIMIT)
                            .map((para, index) => (
                              <p key={index}>{para}</p>
                            ))
                        )}
                        <div className="card_links">
                        {projet&&projet.links.map((link) => (
                            <a href={link.url} target="_blank" rel="noopener noreferrer" key={link.name}>
                              {link.name}
                            </a>
                        ))}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </VisibilityProvider>
      )}


      </>
        );
  }
