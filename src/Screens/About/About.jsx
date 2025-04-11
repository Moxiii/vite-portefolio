import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PythonLogo from '../../assets/Logo/Python-logo-notext.svg'
import {
  faDocker,
  faGitAlt,
  faJava,
  faJsSquare,
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



const About = () => {

  const isDesktop = useMediaQuery({minWidth:769})
  const interests = [
    {
      title: "Clavier custom",
      icon: faKeyboard,
    },
    {
      title: "Sport automobile",
      icon: faCar,
    },
    {
      title: "Moto",
      icon: faMotorcycle,
    },
    {
      title: "Mode de seconde main",
      icon: faShirt,
    },
  ];

  return (
    <>
      <div className="container about-page">
        <div className="text-zone">
          <h1>A propos de moi</h1>
            <p> Jeune homme passionné d&apos;informatique une manette de NES dans les mains des le plus jeune age </p>
            <p>Aujourd&apos;hui je suis en voie d&apos;en faire mon métier ! </p>
            <p>Toujours en cours de formation !</p>
          {isDesktop && (<div className="stage-cube-cont">
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
          )}
            <h2>Mais aussi passionné par :</h2>
          <div className="card-container">
            {interests.map((interest, index) => (
              <TiltCard
                key={index}
                title={interest.title}
                icon={interest.icon}
              />
            ))}
          </div>

        </div>

      </div>
    </>
  )
}

export default About
