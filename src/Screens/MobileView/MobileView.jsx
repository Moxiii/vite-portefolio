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
      const scrollPos = lenis.scroll;

    };

    lenis.on('scroll', handleScroll);


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

