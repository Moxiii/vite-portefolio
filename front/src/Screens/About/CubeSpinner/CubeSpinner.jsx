import "./CubeSpinner.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faJava, faDocker, faReact, faJsSquare, faGitAlt } from '@fortawesome/free-brands-svg-icons'
import PythonLogo from '/src/assets/Logo/Python-logo-notext.svg'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
// eslint-disable-next-line react/prop-types
export default function CubeSpinner({isDesktop}){

const cubeRef = useRef(null)

  useEffect(() => {
    if(!cubeRef.current)return
    const cube = cubeRef.current
    const rotation = { x: 0, y: 0, z: 0 }

    gsap.set(cube, { transformPerspective: 800 })

    const tl = gsap.timeline({ repeat: -1, defaults: { duration:3.5, ease: 'power2.inOut' } })


    tl
      .to(rotation, {
      y: -90,
      z: 90,
      onUpdate: () => updateRotation(cube, rotation),
    })
      .to(rotation, {
        x: 90,
        z: 0,
        onUpdate: () => updateRotation(cube, rotation),
      })
      .to(rotation, {
        y: -180,
        z: 90,
        x: 0,
        onUpdate: () => updateRotation(cube, rotation),
      })
      .to(rotation, {
        y: 0,
        z: 0,
        x: 90,
        onUpdate: () => updateRotation(cube, rotation),
      })
      .to(rotation, {
        y: 0,
        x: 180,
        z: 0,
        onUpdate: () => updateRotation(cube, rotation),
      })
      .to(rotation, {
        x: 0,
        y: 0,
        z: 0,
        onUpdate: () => updateRotation(cube, rotation),
      })

  }, [])

  const updateRotation = (cube, { x, y, z }) => {
    cube.style.transform = `rotateX(${x}deg) rotateY(${y}deg) rotateZ(${z}deg)`
  }



  return isDesktop && (
    <div className="stage-cube-cont">
      <div className="cubespinner" ref={cubeRef}>

        <div className="face1"> <FontAwesomeIcon icon={faJava} color="#007396" /> </div>
        <div className="face2"> <FontAwesomeIcon icon={faDocker} color="#2496ED" /> </div>
        <div className="face3"> <FontAwesomeIcon icon={faReact} color="#61DAFB" /> </div>
        <div className="face4"> <img src={PythonLogo} /> </div>
        <div className="face5"> <FontAwesomeIcon icon={faJsSquare} color="#F7DF1E" /> </div>
        <div className="face6"> <FontAwesomeIcon icon={faGitAlt} color="#F05032" /> </div>

      </div>
    </div>
  )
}