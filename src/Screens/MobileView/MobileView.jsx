import './MobileView.scss'
import Cv from '../Cv/Cv.jsx'
import About from '../About/About.jsx'
import Home from '../Home/Home.jsx'
import Contact from '../Contact/Contact.jsx'
import { ReactLenis,useLenis } from 'lenis/react'
import { useEffect, useRef } from 'react'

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
const atBottomRef = useRef(false);
  const checkAtBottom = () => {
    const projectsSection = document.getElementById('projects');
    if (!projectsSection) return;

    const scrollHeight = projectsSection.scrollHeight;
    const clientHeight = projectsSection.clientHeight;
    const scrollTop = projectsSection.scrollTop;

    // Vérifiez si nous sommes au bas de la section des projets
    const atBottom = scrollTop + clientHeight >= scrollHeight;
    atBottomRef.current = atBottom;

    // Vérifiez si la section est à l'écran
    const rect = projectsSection.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0; // La section est visible à l'écran

    if (isVisible && atBottom) {
      console.log("At the bottom of projects section and it's visible!");
      // Ici, vous pouvez mettre en place la logique pour arrêter le défilement vertical ou d'autres actions
    }
  };
  useEffect(() => {
    const handleScroll = (e) => {
      e.preventDefault();
      if(atBottomRef.current){
        console.log("Nous y est")
        return;
      }
    }

      window.addEventListener('wheel' , handleScroll , {passive:false})
      return () => {
        window.removeEventListener('wheel', handleScroll);
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

