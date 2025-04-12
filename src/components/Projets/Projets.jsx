import { useState, useEffect ,useRef} from 'react';
import { useParams } from 'react-router-dom';
import { Typed } from 'react-typed'
import './Projets.scss'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faJava,faReact,faPython, faJs,faSass, faAngular} from '@fortawesome/free-brands-svg-icons'
import ScrollReveal from '../Scroll/ScrollReveal.jsx'
import { motion } from 'motion/react'
const iconMap={
  React:faReact,
  "React Native":faReact,
  Java:faJava,
  Python:faPython,
  Javascript:faJs,
  Sass:faSass,
  Angular:faAngular,
}
const textVariants = {
  hidden: { opacity: 0, y: 200 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: 'easeOut',
      type : "spring",
      bounce:0.3,

    }
  }
};
const Projets = () => {
  const PARAGRAPH_LIMIT = 2;
  const MAX_PARAGRAPH_LENGTH = 300;
  const typedElement = useRef(null);
  const typedInstance = useRef(null);
  const { id } = useParams();
  const [projet, setProjet] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [currentIcon, setCurrentIcon] = useState(null);
  const [visibleIndex, setVisibleIndex] = useState(0);

  useEffect(() => {
    const fetchProjet = async () => {
      try {
        const response = await fetch('/Json/projects.json');
        if (!response.ok) {
          throw new Error('Erreur lors du chargement des données JSON locales');
        }

         const data = await response.json();
        const foundProjet = data.find((p) => p.id === parseInt(id));
        if (!foundProjet) {
          throw new Error('Projet introuvable dans les données JSON');
        }
        let filteredImages = foundProjet.img.filter(image=>image.isMock===false)
        const remainder = filteredImages.length%3;
        if(remainder !==0 && filteredImages.length <= 3 ){
          const lastImage = filteredImages[filteredImages.length - 1 ];
          for(let i=0;i<3 - remainder ;i++){
            filteredImages.push(lastImage);
          }
        }
        setProjet({ ...foundProjet, img: filteredImages });
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      }
    };

    fetchProjet();
  }, [id]);
let shouldLoop= true;
  useEffect(() => {
    if (projet && typedElement.current) {
      const techNames = projet.technologies.map((tech) => tech.name);
      if (techNames.length <= 1) {
        shouldLoop = false;
      }
      const options = {
        strings: techNames,
        typeSpeed: 75,
        backSpeed: 100,
        loop: shouldLoop,
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

  const renderParagraphAndTitles = (presentation) => {
    let sections = [];
    let currentSection = [];

    presentation.forEach((element, index) => {
      if (typeof element === 'object') {
        if (element.titre) {
          if (currentSection.length > 0) {
            sections.push(
              <ScrollReveal key={`section-${sections.length}`}>
                <div className="section">
                  {currentSection}
                </div>
              </ScrollReveal>
            );
          }
          currentSection = [<h2 key={index}>{element.titre}</h2>];
        }

        if (element.liste) {
          currentSection.push(
            <ul key={`list-${index}`}>
              {element.liste.map((item, itemIndex) => (
                <li key={`list-item-${itemIndex}`}>{item}</li>
              ))}
            </ul>
          );
        }
      } else {
        currentSection.push(
          <ScrollReveal key={index}>
            <p>{element}</p>
          </ScrollReveal>
        );
      }
    });

    if (currentSection.length > 0) {
      sections.push(
        <ScrollReveal key={`section-${sections.length}`}>
          <div className="section">
            {currentSection}
          </div>
        </ScrollReveal>
      );
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

          {initialParagraphs.map((para, index) => (
            <motion.p
              key={`initial-${index}`}
              initial="hidden"
              animate="visible"
              variants={textVariants}
            >
              {para}
            </motion.p>
          ))}
        </div>
        <div className="carouselProjet" style={{ height : carouselHeight  , marginBottom : '3%' }}>
          <div className="carousel__wrapper">
            {projet && projet.img.map((image, index) => {
              const isVisible = index === currentImageIndex;
              const isNext = index === (currentImageIndex + 1) % projet.img.length;
              const isPrev = index === (currentImageIndex - 1 + projet.img.length) % projet.img.length;
              const classes = `
      item 
      ${isVisible ? 'visible' : ''} 
      ${isNext ? 'next' : ''} 
      ${isPrev ? 'prev' : ''} 
      ${!(isVisible || isNext || isPrev) ? 'outside' : ''}
    `.trim();
              return (
                <div
                  className={classes}
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
          <h3>Liens utiles :</h3>
          <ul>
          {projet&&projet.links.map((link, index) => (
            <li key={index}>

              <a href={link.url} target="_blank" rel="noopener noreferrer" key={link.name}>
                {link.name}
              </a>
            </li>
          ))}
          </ul>
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
