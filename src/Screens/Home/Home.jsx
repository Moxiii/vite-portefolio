
import './Home.scss'
import Carousell from '../../components/Carousel/Carousel.jsx'
import {useMediaQuery} from 'react-responsive'

const Home = () => {
  const isDesktop = useMediaQuery({ minWidth: 769 });
  return (
    <>
      <div className="container home">
        <div className="text-zone">
          <h1>
            Bonjour !  <br/> Bienvenue sur mon portefolio.
          </h1>
          {isDesktop && <h2>Voici mes réalisations : </h2>}

        </div>
        <div className='projects'>
          <Carousell/>
        </div>
      </div>
    </>
  )
}

export default Home
