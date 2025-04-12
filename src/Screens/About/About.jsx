import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PythonLogo from '../../assets/Logo/Python-logo-notext.svg'
import {
  faDocker,
  faGitAlt,
  faJava,
  faJsSquare, faPython,
  faReact,
} from '@fortawesome/free-brands-svg-icons'
import {
  faKeyboard,
  faMotorcycle,
  faCar,
  faShirt,
} from "@fortawesome/free-solid-svg-icons";
import './About.scss'
import { useMediaQuery } from 'react-responsive'
import TiltCard from '../../components/Card/TiltCard/TiltCard.jsx'
import QuestionMark3D from '../../components/three/QuestionMark/QuestionMark.jsx'


const About = () => {

  const isDesktop = useMediaQuery({minWidth:769})
  const monoChromaticIcon = "#FFC300"
  const interests = [
    {
    title: "Clavier custom",
      content: "Création de clavier Custom (Neo65 / Neo Ergo)",
      icon: faKeyboard,
  },
  {
    title: "Sport automobile",
    content:"Suivis de la scene WRC , F1 etc"
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
        <p>Fan de vetement vintage</p>
        <p>Utilisation de Vinted et passage en fripperie</p>
        <p>Ce qui a motiver la creation de "Hera" pour faire un
        outils de recherche pour vetements de
        'collection'</p>
      </div>
  ,
  icon: faShirt,
},
  ];

  return (
    <>
      <div className="container about-page">
        <div className="text-zone">
          <h1>A propos de moi</h1>
          <p> Jeune homme passionné d&apos;informatique depuis petit , j&apos;ai grandi avec une manette de NES dans les
            mains . </p>
          <p>Aujourd&apos;hui je suis en voie d&apos;en faire mon métier ! </p>
          <p>D&apos;une curiositée sans faille je continue de m&apos;auto-former sur les technologies suivantes : </p>
          {isDesktop ? (
            <div className="stage-cube-cont">
              <div className="cubespinner">
                <div className="face1">
                  <FontAwesomeIcon icon={faJava} color="#007396" />
                </div>
                <div className="face2">
                  <FontAwesomeIcon icon={faDocker} color="#2496ED" />
                </div>
                <div className="face3">
                  <FontAwesomeIcon icon={faReact} color="#61DAFB" />
                </div>
                <div className="face4">
                  <img src={PythonLogo} />
                </div>
                <div className="face5">
                  <FontAwesomeIcon icon={faJsSquare} color="#F7DF1E" />
                </div>
                <div className="face6">
                  <FontAwesomeIcon icon={faGitAlt} color="#F05032" />
                </div>
              </div>
            </div>
          ) : (
            <div className="mobile-tech-icons">
            <div className="tech-item">
            <FontAwesomeIcon icon={faJava} color={monoChromaticIcon} size="2x" />
        <p>Java</p>
      </div>
      <div className="tech-item">
        <FontAwesomeIcon icon={faDocker} color={monoChromaticIcon} size="2x" />
        <p>Docker</p>
      </div>
      <div className="tech-item">
        <FontAwesomeIcon icon={faReact} color={monoChromaticIcon} size="2x" />
        <p>React</p>
      </div>
      <div className="tech-item">
        <FontAwesomeIcon icon={faPython} color={monoChromaticIcon} size="2x" />
        <p>Python</p>
      </div>
      <div className="tech-item">
        <FontAwesomeIcon icon={faJsSquare} color={monoChromaticIcon} size="2x" />
        <p>JavaScript</p>
      </div>
      <div className="tech-item">
        <FontAwesomeIcon icon={faGitAlt} color={monoChromaticIcon} size="2x" />
        <p>Git</p>
      </div>
    </div>
  )}
          <h3>Sans oublier :</h3>
          <p> Lenis , Gsap , Framer Motion  pour les library front . </p>
          <h3>Aussi du coté réseaux : </h3>
          <p>je surveille la disponibilité de serveur OVH kimsufi pour m&apos;entrainer a la CI/CD et au déploiment
            d&apos;application Javascript / Java </p>
          <h2>Mais aussi passionné par :</h2>
          {isDesktop ? (
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
                className={`interest-row ${index % 2 === 0 ? "right" : "left"}`}
                >
                 <div className="interest-text">
                   <h3>{interest.title}</h3>
                   <p>{interest.content}</p>
                 </div>
                  <div className="card">
                    <div className="header">
                      <FontAwesomeIcon icon={interest.icon}/>
                    </div>
                  </div>
                </div>
              ))}
          </div>)}

          <h2> Qu&apos;est-il prévu pour le futur ? </h2>
          {isDesktop ? (<QuestionMark3D text="Apprentissage de THREE JS pour proposer un portfolio interractif" />):(<p>Apprentissage de THREE JS pour proposer un portfolio interractif</p>) }
        </div>
      </div>

    </>
  )
}

export default About
