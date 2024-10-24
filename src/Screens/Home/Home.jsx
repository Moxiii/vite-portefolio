
import './Home.scss'
import Carousell from '../../components/Carousel/Carousel.jsx'
const Home = () => {

  return (
    <>
      <div className="container home">
        <div className="text-zone">
          <h1>
            Bonjour !  <br/> Bienvenue sur mon portefolio.
          </h1>
          <h2>Voici mes réalisations : </h2>
          <Carousell/>
        </div>
      </div>
    </>
  )
}

export default Home
