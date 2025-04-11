
import './Home.scss'
import Carousell from '../../components/Carousel/Carousel.jsx'
import {useMediaQuery} from 'react-responsive'
import ZoomText from '../../components/Scroll/ZoomText/Zoom.tsx'
import { useEffect, useState } from 'react'

const Home = () => {
  const isDesktop = useMediaQuery({ minWidth: 769 });
  const [widthScreen, setWidthScreen] = useState(window.innerWidth);
  const handleResize = () => {
    setWidthScreen(window.innerWidth);
  };
  const svgVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 2, staggerChildren: 0.2 },
    },
  };

  const pathVariants = {
    hidden: { strokeDasharray: "1000", strokeDashoffset: "1000" },
    visible: {
      strokeDashoffset: 0,
      transition: { duration: 2, ease: "easeInOut" },
    },
  };

  const groupVariants = {
    hidden: { scale: 0.8 },
    visible: {
      scale: 1,
      transition: { type: "spring", stiffness: 50 },
    },
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
        {isDesktop ? (
          <h1>
            Bienvenue sur mon portfolio.
          </h1>
        ) : (<ZoomText
          title1={"Portfolio"}
          title2={"Maxime Lapouge"}
          text={`Étudiant\nDéveloppeur\nIPI ${new Date().getFullYear()}`}/>
          )}

        {isDesktop && <h2>Voici mes réalisations : </h2>}
      </div>
      <Carousell />
    </div>
  );
};

export default Home;
