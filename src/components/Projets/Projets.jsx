import { useState, useEffect ,useRef} from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import { Typed } from 'react-typed'
import './Projets.scss'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faJava,faReact,faPython, faJs,faSass, faAngular} from '@fortawesome/free-brands-svg-icons'
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
const iconMap={
  React:faReact,
  "React Native":faReact,
  Java:faJava,
  Python:faPython,
  Javascript:faJs,
  Sass:faSass,
  Angular:faAngular,
}
const Projets = () => {
  const PARAGRAPH_LIMIT = 2;
  const MAX_PARAGRAPH_LENGTH = 300;
  const typedElement = useRef(null);
  const typedInstance = useRef(null);
  const { id } = useParams();
  const [projet, setProjet] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const {setLoading} = useOutletContext();
  const [currentIcon, setCurrentIcon] = useState(null);
  useEffect(() => {
    const fetchProjet = async () => {
      try {
        let response;
        let data;
        try {
          response = await fetch(`http://localhost:3000/api/projects/${id}`);
          if (!response.ok) {
            throw new Error('Erreur lors de la récupération de l\'API');
          }
          data = await response.json();
          const filteredImages = data.img;
          const remainder = data.img.length%3;
          if(remainder !==0){
            const lastImage = filteredImages[filteredImages.length-1];
            for(let i=0;i<3 -remainder;i++){
              filteredImages.push(lastImage);
            }
          }
          setProjet(data);
          return;
        } catch (error) {
          console.warn('L\'API ne répond pas, tentative de récupération du JSON', error);
        }

        response = await fetch('/Json/projects.json');
        if (!response.ok) {
          throw new Error('Erreur lors du chargement des données JSON locales');
        }

        data = await response.json();
        const foundProjet = data.find((p) => p.id === parseInt(id));
        if (!foundProjet) {
          throw new Error('Projet introuvable dans les données JSON');
        }
        let filteredImages = foundProjet.img.filter(image=>image.isMock===false)
        const remainder = filteredImages.length%3;
        if(remainder !==0){
          const lastImage = filteredImages[filteredImages.length-1];
          for(let i=0;i<3 -remainder;i++){
            filteredImages.push(lastImage);
          }
        }
        setProjet({ ...foundProjet, img: filteredImages });
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjet();
  }, [id, setLoading]);

  useEffect(() => {
    if (projet && typedElement.current) {
      const techNames = projet.technologies.map((tech) => tech.name);
      const options = {
        strings: techNames,
        typeSpeed: 75,
        backSpeed: 100,
        loop: true,
        backDelay: 200,
        preStringTyped: (index) => {
          const tech = projet.technologies[index % techNames.length];
          setCurrentIcon(iconMap[tech.name]);
        },
      };

      typedInstance.current = new Typed(typedElement.current, options);
      return () => {
        typedInstance.current.destroy();
      };
    }
  }, [projet]);
  const visibleItemRef = useRef(null);
  const [carouselHeight, setCarouselHeight] = useState(500);

  // Fonction pour mettre à jour la hauteur du carousel
  const updateCarouselHeight = () => {
    if (visibleItemRef.current) {
      const visibleItemHeight = visibleItemRef.current.getBoundingClientRect().height;
      setCarouselHeight(prevHeight => {
        if (prevHeight !== visibleItemHeight) {
          return visibleItemHeight;
        }
        return prevHeight;
      });
    }
  };

  useEffect(() => {
    updateCarouselHeight();
    const handleResize = () => {
      updateCarouselHeight();
    };
    const observer = new ResizeObserver(()=>{
      updateCarouselHeight();
    });
    if (visibleItemRef.current){observer.observe(visibleItemRef.current)}

    window.addEventListener('resize', handleResize);

    return () => {
      if(visibleItemRef.current){observer.unobserve(visibleItemRef.current)}
      window.removeEventListener('resize', handleResize);
    };
  }, []);



  const handleImageClick = (index) => {
    setCurrentImageIndex((index +1)% (projet.img.length || 1));
  };
  const initialParagraphs = projet?.presentation
    .filter((para) => para.length <= MAX_PARAGRAPH_LENGTH)
    .slice(0, PARAGRAPH_LIMIT) || [];

  const remainingParagraphs = projet?.presentation
    .slice(initialParagraphs.length)
    .concat(projet.presentation.filter((para) => para.length > MAX_PARAGRAPH_LENGTH)) || [];

const renderParagraphAndTitles = (presentation)=>{
  let sections = [];
  let currentSection = [];
  presentation.forEach((element,index)=> {
    if(typeof element === 'object' && element.titre){
      if (currentSection.length > 0){
        sections.push(<div key={`section-${sections.length}`} className="section">{currentSection}</div>);
      }
      currentSection = [<h2 key={index}>{element.titre}</h2>]
    } else {
      currentSection.push(<p key={index}>{element}</p>);
    }
  });
    if(currentSection.length > 0){
      sections.push(<div key={`section-${sections.length}`} className="section">{currentSection}</div>);
    }
    return sections;
  };
  return (
    <>
      <div className="container projet">
        <div className="text-zone">
          <h1>{projet ? projet.title : 'Chargement...'}</h1>
          <div style={{ marginBottom: '10px'}} className="typed">
            <p> Développé en <span ref={typedElement} style={{ fontWeight: 'bold' }} />
              {currentIcon && <FontAwesomeIcon icon={currentIcon} style={{ marginLeft: '5px', fontSize: '150%' }} />}</p>
          </div>
          {projet && (
            <div className="project-status">
              <div className="status-item">
                <span>Fini: </span>
                <FontAwesomeIcon
                  icon={projet.fini ? faCheckCircle : faTimesCircle}
                  style={{
                    color: projet.fini ? '#1ee11e' : 'red',
                    marginLeft: '5px'
                  }}
                />
              </div>
              <div className="status-item">
                <span>Déployé: </span>
                <FontAwesomeIcon
                  icon={projet.deploy ? faCheckCircle : faTimesCircle}
                  style={{
                    color: projet.deploy ? '#1ee11e' : 'red',
                    marginLeft: '5px'
                  }}
                />
              </div>
            </div>
          )}
          {renderParagraphAndTitles(initialParagraphs)}
        </div>
        <div className="carouselProjet" style={{ height : carouselHeight  , marginBottom : '3%' }}>
          <div className="carousel__wrapper">
            {projet && projet.img.map((image, index) => {
              const isVisible = index === currentImageIndex;
              const isNext = index === (currentImageIndex + 1) % projet.img.length;
              const isPrev = index === (currentImageIndex - 1 + projet.img.length) % projet.img.length;
              return (
                <div
                  className={`item ${isVisible ? 'visible' : ''} ${isNext ? 'next' : ''} ${isPrev ? 'prev' : ''}`}
                  key={index}
                  ref = {isVisible? visibleItemRef : null}
                  onClick={() => handleImageClick(index)}
                >
                  <img src={image.src} alt={image.title} />
                </div>)

            })}
          </div>
        </div>
        <div className="links">
          <p>Liens utiles :</p>
          {projet&&projet.links.map((link, index) => (
            <div key={index}>

              <a href={link.url} target="_blank" rel="noopener noreferrer" key={link.name}>
                {link.name}
              </a>
            </div>
          ))}
        </div>
        {remainingParagraphs.length > 0 && (
          <div className="remaining-presentation">
            {renderParagraphAndTitles(remainingParagraphs)}
          </div>
          )}
      </div>

    </>
  );
};

export default Projets;
