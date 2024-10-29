import './MobileView.scss'
import Cv from '../Cv/Cv.jsx'
import About from '../About/About.jsx'
import Home from '../Home/Home.jsx'
import Contact from '../Contact/Contact.jsx'
import ReactLenis from 'lenis/react'

export default function MobileView(){

    const lenisOption = {
      lerp:0.1,
      duration:1.5,
      smoothTouch: false,
      smooth: true,

}
return(
  <>
    <ReactLenis root options ={lenisOption}/>
     <section id="home"><Home/></section>
     <section id="about"><About/></section>
     <section id="cv"><Cv/></section>
     <section id="contact"><Contact/></section>
    <ReactLenis/>
  </>
)
}

