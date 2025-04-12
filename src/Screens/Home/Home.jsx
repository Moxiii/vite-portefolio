
import './Home.scss'
import Carousel from '../../components/Carousel/Carousel.jsx'

import { useEffect, useState } from 'react'

const Home = () => {

  const [widthScreen, setWidthScreen] = useState(window.innerWidth);
  const handleResize = () => {
    setWidthScreen(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [widthScreen]);
  return (
    <div className="container home">
      <div className="text-zone">
          <h1> Bienvenue sur mon portfolio. </h1>
        <h2>Voici mes réalisations : </h2>
      </div>
      <Carousel />
    </div>
  );
};

export default Home;
