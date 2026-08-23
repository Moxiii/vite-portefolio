  import { useEffect, useState } from 'react'
  import { useNavigate } from 'react-router-dom';
  import './Carousel.scss'

import FetchProject from "../../Hook/Fetch/FetchProject.js"

  export default function Carousel() {
    const [projets, setProjets] = useState([]);
    const navigate = useNavigate();
    const handleClick = (id) => {
      navigate(`/projet/${id}`);
    };

    useEffect(() => {
      const getData = async () =>{
        const projects = await FetchProject();
        const showingProjects = projects.filter(project => project.visible !== false);
        setProjets(showingProjects)
      }
      getData();
    }, []);

    return (
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
        );
  }
