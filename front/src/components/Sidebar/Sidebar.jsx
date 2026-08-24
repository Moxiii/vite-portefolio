import { NavLink } from 'react-router-dom'
import './Sidebar.scss'
import links from '../../const/_const.ts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUser,
  faHome,
  faFile,
  faGauge,
  faRightToBracket,
} from '@fortawesome/free-solid-svg-icons'

import { useAuth } from '@src/AuthProvider/AuthProvider'

export default function Sidebar() {
  const { isAuthenticated } = useAuth()
  return (
    <div className="nav-bar">
      <nav>
        <NavLink
          exact="true"
          activeclassname="active"
          to={links.home}
          data-title="Home"
        >
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
        {isAuthenticated && (
          <NavLink
            to={links.dashboard}
            data-title="dashboard"
            activeclassname="active"
          >
            <FontAwesomeIcon icon={faGauge} className="icon-color" />
          </NavLink>
        )}
        {!isAuthenticated && (
          <NavLink to={links.login} data-title="login" activeclassname="active">
            <FontAwesomeIcon icon={faRightToBracket} />
          </NavLink>
        )}
      </nav>
    </div>
  )
}
