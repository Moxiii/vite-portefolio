import './MobileView.scss'
import Cv from '../Cv/Cv.jsx'
import About from '../About/About.jsx'
import Home from '../Home/Home.jsx'
import Contact from '../Contact/Contact.jsx'
import { ReactLenis } from 'lenis/react'

export default function MobileView(){


  return(
    <ReactLenis root >

     <section id="home"><Home /></section>
     <section id="about"><About/></section>
     <section id="cv"><Cv/></section>
     <section id="contact"><Contact/></section>
    </ReactLenis>
)
}

