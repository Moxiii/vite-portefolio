import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faDocker,
  faGitAlt,
  faJava,
  faJsSquare, faPython,
  faReact,
} from '@fortawesome/free-brands-svg-icons'
import CubeSpinner from "./CubeSpinner/CubeSpinner.jsx"
import {
  faKeyboard,
  faMotorcycle,
  faCar,
  faShirt,
  faMusic,
} from "@fortawesome/free-solid-svg-icons";
import './About.scss'
import { lazy } from 'react'

const TiltCard = lazy(() => import('@components/Card/TiltCard/TiltCard.jsx'));
const QuestionMark3D = lazy(()=>import('@components/three/QuestionMark/QuestionMark.jsx'))

import { useBreakPoint } from '@hook/IsDesktop/useBreakPoint.js'

export default function About() {
  const { isMobile } = useBreakPoint();
  const interests = [
    {
    title: "Clavier custom",
      content: "Création de claviers custom (Neo65 / Neo Ergo)",
      icon: faKeyboard,
  },
  {
    title: "Sport automobile",
    content:"Suivi de la scène WRC, F1, etc."
,
  icon: faCar,
},
{
  title: "Moto",
    content:"Passage du permis A2 en cours",
  icon: faMotorcycle,
},
{
  title: "Mode de seconde main",
    content:
      <div>
        <p>Fan de vêtements vintage.</p>
        <p>Utilisation de Vinted et achats en friperie.</p>
      </div>
  ,
  icon: faShirt,
},
    {
  title: "Musique",
    content:
      <div>
        <p>Écoute et découverte de multiples styles musicaux.</p>
      </div>
  ,
  icon: faMusic,
},
  ];

  return (
    <div className="container about-page">
      <section className="about-me">
        <div className="text-zone">
          <h1>A propos de moi</h1>
          <p>Jeune homme passionné d&apos;informatique depuis tout petit, j&apos;ai grandi avec une manette de NES dans les mains. </p>

          <p>Aujourd&apos;hui, je suis en voie d&apos;en faire mon métier ! </p>

          <p> D&apos;une curiosité sans faille, je continue de m&apos;auto-former sur les technologies suivantes : </p>

          {!isMobile  ? (
            <CubeSpinner isDesktop={!isMobile} />
          ) : (
            <div className="mobile-tech-icons">
              <div className="tech-item">
                <FontAwesomeIcon icon={faJava} />
                <p>Java</p>
              </div>
              <div className="tech-item">
                <FontAwesomeIcon icon={faDocker} />
                <p>Docker</p>
              </div>
              <div className="tech-item">
                <FontAwesomeIcon icon={faReact} />
                <p>React</p>
              </div>
              <div className="tech-item">
                <FontAwesomeIcon icon={faPython} />
                <p>Python</p>
              </div>
              <div className="tech-item">
                <FontAwesomeIcon icon={faJsSquare} />
                <p>JavaScript</p>
              </div>
              <div className="tech-item">
                <FontAwesomeIcon icon={faGitAlt} />
                <p>Git</p>
              </div>
            </div>
          )}
          <p>Technologies utilisées pour les projets Georges et Hera</p>
        </div>
      </section>
      <section className="formation">
        <div className="text-zone">
          <h3>Sans oublier :</h3>
          <p> Lenis , Gsap , Framer Motion pour les bibliothèques front. </p>
          <p>Spring Boot et .Net pour les Framework Backend. </p>
          <h3>Aussi du coté réseau : </h3>
          <p>Je surveille la disponibilité de serveur OVH Kimsufi pour m&apos;entraîner à la CI/CD et au déploiement
            d&apos;applications Javascript/Java </p>
        </div>

      </section>
      <section className="passion">
        <div className="text-zone">
          <h2>Mais aussi passionné par :</h2>
          {!isMobile  ? (
            <div className="card-container">
              {interests.map((interest, index) => (
                <TiltCard
                  key={index}
                  title={interest.title}
                  icon={interest.icon}
                />
              ))}
            </div>) : (
            <div className="mobile-card-container">
              {interests.map((interest, index) => (
                <div
                  key={index}
                  className={`interest-row ${index % 2 === 0 ? 'right' : 'left'}`}
                >
                  <div className="interest-text">
                    <h3>{interest.title}</h3>
                    <p>{interest.content}</p>
                  </div>
                  <div className="card">
                    <div className="header">
                      <FontAwesomeIcon className="card-icon" icon={interest.icon} />
                    </div>
                  </div>
                </div>
              ))}
            </div>)}
          <div className="sub-interest">
            <h3>Des passions qui motive la création d&#39;outils.</h3>
            <ul>
              <li>
                Hera : outil pour la vente de vêtements et objets de collection.
              </li>
              <li>
                Un outil de configuration/aide a la création de clavier custom est prévu.
              </li>
            </ul>
          </div>
        </div>

      </section>
      <section className="futur">
        <div className="text-zone">
          <h2> Qu&apos;est-il prévu pour le futur ? </h2>
          {!isMobile && (<QuestionMark3D />)}
          <p>Apprentissage de Three.js pour proposer un portfolio interactif</p>
          <p>Actuellement entrain de suivre la formation three.js journey afin d&#39;améliorer ma comprehension de l&#39;outil
            et
            du WebGL en regle générale</p>
        </div>
      </section>

    </div>


  )
}
