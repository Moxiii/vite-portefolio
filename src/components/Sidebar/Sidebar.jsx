import { Link, NavLink } from 'react-router-dom'
import './Sidebar.scss'
import Logo from '../../assets/profile1.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUser,
  faHome,
  faEnvelope,
  faFile,
  faTimes,
  faBars,
} from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { useEffect, useState } from 'react'
const Sidebar=({ isMobile }) => {


  return (
    <>
      <div className="nav-bar">
        <Link className="Logo" to="/">
          <img src={Logo}></img>
        </Link>
        <nav>
          {isMobile?(
            <>
              <a href='#home'></a>
              <a href="#about">About</a>
              <a href="#cv">CV</a>
              <a href="#contact">Contact</a>
            </>
          ):(
            <>
              <NavLink exact="true" activeclassname="active" to="/" data-title="Home">
              <FontAwesomeIcon icon={faHome} className="icon-color" />
            </NavLink>
              <NavLink
                exact="true"
                activeclassname="active"
                className="about-link"
                data-title="About"
                to="/about"

              >
                <FontAwesomeIcon icon={faUser} className="icon-color" />
              </NavLink>

              <NavLink
                exact="true"
                data-title="Cv"
                activeclassname="active"
                className="cv-link"
                to="/cv"

              >
                <FontAwesomeIcon icon={faFile} className="icon-color" />
              </NavLink>
              <NavLink
                exact="true"
                activeclassname="active"
                className="contact-link"
                data-title="Contact"
                to="/contact"

              >
                <FontAwesomeIcon icon={faEnvelope} className="icon-color" />
              </NavLink>
            </>
          )}

        </nav>
        <ul>
          <li>
            <a
              data-title="Linkedin"
              target="_blank"
              rel="noreferrer"
              href="https://www.linkedin.com/in/maxime-lapouge-1a0970207/"
            >
              <FontAwesomeIcon icon={faLinkedin} className="icon-color" />
            </a>
          </li>
          <li>
            <a
              data-title="Github"
              target="_blank"
              rel="noreferrer"
              href="https://github.com/Moxiii"
            >
              <FontAwesomeIcon icon={faGithub} className="icon-color" />
            </a>
          </li>
        </ul>
      </div>


    </>
  )
}
export default Sidebar
