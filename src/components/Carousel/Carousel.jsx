  import { useEffect, useRef, useState } from 'react'
  import { useNavigate } from 'react-router-dom';
  import './Carousel.scss'
  import { useVisibility } from '../../Hook/VisibilityProvider/Visibilityprovider.jsx'
import FetchProject from "../../Utils/FetchProject.js"

  export default function Carousel() {
    const [projets, setProjets] = useState([]);
    const navigate = useNavigate();
    const handleClick = (id) => {
      navigate(`/projet/${id}`);
    };
    const projectRefs = useRef([]);
    const { visibleProjects , setVisibleProjects } = useVisibility() ;

    useEffect(() => {
      const getData = async () =>{
        const projects = await FetchProject();
        setProjets(projects)
      }
      getData();
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




    return (
      <>
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
      </>
        );
  }
