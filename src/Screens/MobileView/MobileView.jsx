import './MobileView.scss'
import Cv from '../Cv/Cv.jsx'
import About from '../About/About.jsx'
import ZoomText from "../../components/Scroll/ZoomText/Zoom.js"
import Contact from '../Contact/Contact.jsx'
import { ReactLenis } from 'lenis/react'
import { useEffect, useState } from 'react'
import FetchProject from '../../Hook/Fetch/FetchProject.js'
import SharedLayout from '../../components/SharedLayout/SharedLayout.jsx'

export default function MobileView(){
  const [projets, setProjets] = useState([]);
  const lenisOption = {
    autoRaf: true,
    smooth: true,
    lerp: 0.1,
  };
  useEffect(() => {
    const getData = async () =>{
      const projects = await FetchProject();
      setProjets(projects)
    }
    getData();
  }, []);
  return(
    <ReactLenis
      root
      options={lenisOption}
      style={{ height: "100vh", overflowY: "auto" }}>
      <div className="mobile-view">
        <ZoomText
          title1={"Portfolio"}
          title2={"Maxime Lapouge"}
          text={`Étudiant\nDéveloppeur\nIPI ${new Date().getFullYear()}`}/>

        <section id="about"><About/></section>
        <section className="projets">
          <h1>Mes Projets:</h1>
          <SharedLayout projects={projets}/>
        </section>

        <section id="cv"><Cv/></section>
        <section id="contact"><Contact/></section>
      </div>

    </ReactLenis>
)
}

