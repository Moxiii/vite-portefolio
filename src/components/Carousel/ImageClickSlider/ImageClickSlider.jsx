import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './ImageClickSlider.scss'
import { useVisibility } from '../../../Hook/VisibilityProvider/Visibilityprovider.jsx'
import FetchProject from "../../../Utils/FetchProject.js"

export default function ImageClickSlider({projet}) {

  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
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

  const projectRefs = useRef([]);
  const { visibleProjects , setVisibleProjects } = useVisibility() ;



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




  return (
    <div className="carouselProjet" style={{ height: carouselHeight, marginBottom: '3%' }}>
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
              ref={isVisible ? visibleItemRef : null}
              onClick={() => handleImageClick(index)}
            >
              <img src={image.src} alt={image.title} />
            </div>)

        })}
      </div>
    </div>
  );
}
