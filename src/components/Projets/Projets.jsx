import './Projets.scss';
import Loader from 'react-loaders';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
  useEffect(() => {
    fetch('/Json/projects.json')
      .then((response) => response.json())
      .then((data) => {
        const foundProjet = data.find((p) => p.id === parseInt(id));
        setProjet(foundProjet);
      })
      .catch((error) => console.error('erreur de chargement du Json : ', error));
  }, [id]);

const handleImageClick=(index)=>{
  setCurrentImageIndex(index)
}
  const filteredImages = projet ? projet.img.filter((image) => !image.isMock) : [];

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
            {filteredImages.map((image, index) => (
                  <div
                    className={`item ${index === currentImageIndex ? 'visible' : ''}`}
                    key={index}
                    onClick={()=> handleImageClick(index)}
                  >
                    <img src={image.src} alt={image.title} />
                  </div>
                ))}
          </div>
          {filteredImages.length > 0 && (
            <footer className="carousel-footer">
              <div className="carousel-title-card">
                <h4>{filteredImages[currentImageIndex].title}</h4>
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
      <Loader type="pacman" />
    </>
  );
};

export default Projets;
