import { Link } from 'react-router-dom'
import './Home.scss'
import Loader from 'react-loaders'

const Home = () => {
  return (
    <>
      <div className="container home-page">
        <div className="text-zone">
          <h1>
            Bonjour <br /> je suis Maxime <br /> developpeur web
          </h1>
          <h2>Frontend / Backend developpeur</h2>
          <Link to="/contact" className="flat-button">
            Contactez-moi
          </Link>
        </div>
      </div>
      <Loader type="pacman" />
    </>
  )
}

export default Home
