import './MobileView.scss'
import Cv from '../Cv/Cv.jsx'
import About from '../About/About.jsx'
import Home from '../Home/Home.jsx'
import Contact from '../Contact/Contact.jsx'
import { ReactLenis,useLenis } from 'lenis/react'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
export default function MobileView(){
  const lenis = useLenis(({ scroll }) => {
    // Configuration de Lenis
    return {
      wheelMultiplier: 0.33,
      lerp: 0.05,
      smoothTouch: true,
      touchMultiplier: 2,
      duration: 1.2,
    };
  });
  useEffect(() => {
    return () => {
      lenis.destroy(); // Nettoyage lors du démontage
    };
  }, [lenis]);

  return(
  <>
    <ReactLenis root >
     <section id="home"><Home /></section>
     <section id="about"><About/></section>
     <section id="cv"><Cv/></section>
     <section id="contact"><Contact/></section>
    </ReactLenis>
  </>
)
}

