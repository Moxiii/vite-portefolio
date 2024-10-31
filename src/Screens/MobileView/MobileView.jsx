import './MobileView.scss'
import Cv from '../Cv/Cv.jsx'
import About from '../About/About.jsx'
import Home from '../Home/Home.jsx'
import Contact from '../Contact/Contact.jsx'
import { ReactLenis,useLenis } from 'lenis/react'

export default function MobileView(){
  const lenis = useLenis(({scroll})=>{
      wheelMultiplier: 1;
      lerp: 0.05;
      smoothTouch: true;
      touchMultiplier: 2;
      duration:1.2;

  });

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

