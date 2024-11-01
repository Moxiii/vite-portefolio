import './MobileView.scss'
import Cv from '../Cv/Cv.jsx'
import About from '../About/About.jsx'
import Home from '../Home/Home.jsx'
import Contact from '../Contact/Contact.jsx'
import { ReactLenis,useLenis } from 'lenis/react'
import { useEffect} from 'react'
export default function MobileView(){
  const lenis = useLenis(({ scroll }) => {
    return {
      wheelMultiplier: 0.33,
      lerp: 0.05,
      smoothTouch: true,
      touchMultiplier: 2,
      duration: 1.2,
    };
  });
  useEffect(() => {
    if (!lenis) {
      console.error("Lenis is undefined!");
      return;
    }
    const handleScroll = () => {
      const scrollPos = lenis.scroll; // Obtenez la position de défilement
      console.log('Scroll position:', scrollPos);
      if (scrollPos > 100) {
        console.log('Vous avez défilé plus de 100 pixels');
      }
    };

    lenis.on('scroll', handleScroll); // Ajoutez l'écouteur d'événement

    // Nettoyage à la destruction du composant
    return () => {
      lenis.off('scroll', handleScroll);
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

