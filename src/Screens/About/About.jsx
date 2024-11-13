import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PythonLogo from '../../assets/Logo/Python-logo-notext.svg'
import {
  faDocker,
  faGitAlt,
  faJava,
  faJsSquare,
  faReact,
} from '@fortawesome/free-brands-svg-icons'
import './About.scss'
import { useMediaQuery } from 'react-responsive'


const About = () => {

  const isDesktop = useMediaQuery({minWidth:769})


  return (
    <>
      <div className="container about-page">
        <div className="text-zone">
          <h1>A propos de moi</h1>
          <div className="scrollable-content">
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis
              aliquam iusto, voluptas exercitationem laborum maxime corporis atque
              consequatur perferendis cupiditate a et rem autem alias, vel quidem
              voluptatem ex non!
            </p>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis
              aliquam iusto, voluptas exercitationem laborum maxime corporis atque
              consequatur perferendis cupiditate a et rem autem alias, vel quidem
              voluptatem ex non!
            </p>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis
              aliquam iusto, voluptas exercitationem laborum maxime corporis atque
              consequatur perferendis cupiditate a et rem autem alias, vel quidem
              voluptatem ex non!
            </p>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis
              aliquam iusto, voluptas exercitationem laborum maxime corporis atque
              consequatur perferendis cupiditate a et rem autem alias, vel quidem
              voluptatem ex non!
            </p>
          </div>

        </div>
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
                {/* <FontAwesomeIcon icon={faPython} color="#3776AB" /> */}
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
      </div>
    </>
  )
}

export default About
