import {  NavLink } from 'react-router-dom'
import './Sidebar.scss'
import links from "../../const/_const.ts"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUser,
  faHome,
  faEnvelope,
  faFile,
} from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'

export default function Sidebar() {

  return (
    <>
      <div className="nav-bar">
            <nav>
              <NavLink exact="true" activeclassname="active" to={links.home} data-title="Home">
              <FontAwesomeIcon icon={faHome} className="icon-color" />
            </NavLink>
              <NavLink
                exact="true"
                activeclassname="active"
                className="about-link"
                data-title="About"
                to={links.about}

              >
                <FontAwesomeIcon icon={faUser} className="icon-color" />
              </NavLink>

              <NavLink
                exact="true"
                data-title="Cv"
                activeclassname="active"
                className="cv-link"
                to={links.cv}

              >
                <FontAwesomeIcon icon={faFile} className="icon-color" />
              </NavLink>
              <NavLink
                exact="true"
                activeclassname="active"
                className="contact-link"
                data-title="Contact"
                to={links.contact}

              >
                <FontAwesomeIcon icon={faEnvelope} className="icon-color" />
              </NavLink>
            </nav>
        <ul>
          <li>
            <a
              data-title="Linkedin"
              target="_blank"
              rel="noreferrer"
              href={links.externalLinks.linkedin}
            >
              <FontAwesomeIcon icon={faLinkedin} className="icon-color" />
            </a>
          </li>
          <li>
            <a
              data-title="Github"
              target="_blank"
              rel="noreferrer"
              href={links.externalLinks.github}
            >
              <FontAwesomeIcon icon={faGithub} className="icon-color" />
            </a>
          </li>
        </ul>
      </div>


    </>
  )
}

