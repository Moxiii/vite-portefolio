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
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect } from 'react'
import { useStore } from '../../Hook/Scrolll/Store.js'
gsap.registerPlugin(ScrollTrigger)

const About = () => {
  const lenis = useStore(state => state.lenis)
  useEffect(() => {
    if(!lenis)return;
    lenis.on('scroll', ({ scroll })=>{
      const scrollTriger = Math.floor(scroll / 100)
    })
    return ()=>{
      lenis.off('scroll')
    }
  }, [lenis])
  const isDesktop = useMediaQuery({minWidth:769})


  return (
    <>
      <div className="container about-page">
        <div className="text-zone">
          <h1>A propos de moi</h1>
          <div className="scrollable-content">
            <p>
              Passionné  d&apos;informatique depuis mon plus jeune âge aujourd&apos;hui cela devient mon métier !
            </p>
            <p>
              Toujours d&apos;une curiosité sans faille je m&apos;autoforme sur
              <ol>
                <li>React</li>
                <li>Docker</li>
                <li>Git</li>
                <li>Le creative web (Lenis , gsap , framer motion)</li>
                <li>Java - Spring</li>
                <li>Python</li>
                <li>Angular</li>
                <li>Front-End (Scss)</li>
              </ol>
            </p>
            <p>
              Mais aussi passionné par :
              <ol>
                <li>La mode de seconde main</li>
                <li>La mécanique</li>
                <li>La création de clavier custom</li>
                <li>La moto</li>
              </ol>
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
