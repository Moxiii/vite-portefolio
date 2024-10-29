import './MobileView.scss'
import Cv from '../Cv/Cv.jsx'
import About from '../About/About.jsx'
import Home from '../Home/Home.jsx'
import Contact from '../Contact/Contact.jsx'
import { ReactLenis,useLenis } from 'lenis/react'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
export default function MobileView(){
  const lenisRef = useRef()

  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000)
    }

    gsap.ticker.add(update)

    return () => {
      gsap.ticker.remove(update)
    }
  })
return(
  <>
    <ReactLenis ref={lenisRef}>
     <section id="home"><Home/></section>
     <section id="about"><About/></section>
     <section id="cv"><Cv/></section>
     <section id="contact"><Contact/></section>
    </ReactLenis>
  </>
)
}

