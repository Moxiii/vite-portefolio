import { Link, NavLink } from 'react-router-dom'
import './Sidebar.scss'
import Logo from '../../assets/profile1.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUser,
  faHome,
  faEnvelope,
  faFile,
  faGears,
  faTimes,
  faBars,
} from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { useState } from 'react'
const Sidebar = () => {
  const [isOpen, setisOpen] = useState(false)
  const toggleSidebar = () => {
    setisOpen(!isOpen)
  }
  return (
    <>
      <div className="nav-bar">
        <Link className="Logo" to="/">
          <img src={Logo}></img>
        </Link>
        <nav>
          <NavLink exact="true" activeclassname="active" to="/">
            <FontAwesomeIcon icon={faHome} color="#022c43" />
          </NavLink>
          <NavLink
            exact="true"
            activeclassname="active"
            className="about-link"
            to="/about"
          >
            <FontAwesomeIcon icon={faUser} color="#022c43" />
          </NavLink>

          <NavLink
            exact="true"
            activeclassname="active"
            className="cv-link"
            to="/cv"
          >
            <FontAwesomeIcon icon={faFile} color="#FF7f00" />
          </NavLink>
          <NavLink
            exact="true"
            activeclassname="active"
            className="projet-link"
            to="/projets"
          >
            <FontAwesomeIcon icon={faGears} color="#FF7f00" />
          </NavLink>
          <NavLink
            exact="true"
            activeclassname="active"
            className="contact-link"
            to="/contact"
          >
            <FontAwesomeIcon icon={faEnvelope} color="#FF7f00" />
          </NavLink>
        </nav>
        <ul>
          <li>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.linkedin.com/in/maxime-lapouge-1a0970207/"
            >
              <FontAwesomeIcon icon={faLinkedin} color="#4d4d4e" />
            </a>
          </li>
          <li>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/Moxiii"
            >
              <FontAwesomeIcon icon={faGithub} color="#4d4d4e" />
            </a>
          </li>
        </ul>
      </div>

      <div className="burger-menu" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} color="#FF7f00" />
      </div>
    </>
  )
}
export default Sidebar
