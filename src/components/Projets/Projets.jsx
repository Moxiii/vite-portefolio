import { useState, useEffect ,useRef} from 'react';
import { useParams } from 'react-router-dom';
import TypedText from '../../Utils/TypedText.js'
import './Projets.scss'
import FetchProject from '../../Utils/FetchProject.js'
import SlideCarousel from '../Carousel/InfiniteSlideCarousel/slideCarousel.jsx'
import ScrollReveal from '../Scroll/ScrollReveal.jsx'
import { motion } from 'motion/react'

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
export default function Projets(){
  const PARAGRAPH_LIMIT = 2;
  const MAX_PARAGRAPH_LENGTH = 300;

  const { id } = useParams();
  const [projet, setProjet] = useState(null);


  useEffect(() => {
      const getData = async()=>{
      try {
        const data = await FetchProject();
        const foundProjet = data.find((p) => p.id === parseInt(id));
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
      getData();
  }, [id]);


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
      <div className="container projet">
        <div className="text-zone">
          <h1>{projet ? projet.title : 'Chargement...'}</h1>
          <div  className="typed">
            {projet && <TypedText
              mainTitle="Développé en "
              project={{
              techno : projet.technologies?.map((tech)=>
                ({
                name:tech.name,
                icon:tech.icon,
              })),
            }}/>}
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
        {projet && <SlideCarousel images={projet.img}/>}
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
  );
};


