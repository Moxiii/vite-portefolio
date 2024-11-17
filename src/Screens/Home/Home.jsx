
import './Home.scss'
import Carousell from '../../components/Carousel/Carousel.jsx'
import {useMediaQuery} from 'react-responsive'
import { useEffect, useRef } from 'react'
import { Typed } from 'react-typed'
import anime from 'animejs'
const Home = () => {
  const isDesktop = useMediaQuery({ minWidth: 769 });
  const typedElement = useRef(null);
  const typedInstance = useRef(null);
  useEffect(() => {
    if (!isDesktop) {
      const strings = ["Bienvenue"]
      const options = {
        strings: strings,
        typeSpeed: 100,
        backSpeed: 100,
        loop: false,
        backDelay: 900,
        showCursor:false,
        smartBackspace:true,
      };

      if (typedElement.current) {
        typedInstance.current = new Typed(typedElement.current, options);
      }
      return () => {
        if (typedInstance.current) {
          typedInstance.current.destroy();
        }
      };
    }
  }, [isDesktop]);
  useEffect(() => {
    anime({
      targets: '.line',
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutSine',
      duration: 1500,
      direction: 'alternate',
      loop: true,
    });
  }, []);
  return (
    <>
      <div className="container home">
        <div className="text-zone">
          {isDesktop ? (<h1>
            Bonjour !  <br/> Bienvenue sur mon portefolio.
          </h1>): (<h1>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 500 150"
                className="animated-svg"
                style={{ maxWidth: '100%', height: 'auto', fontFamily: 'DM Sans', }}
              >
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dy=".5em"
                  className="line"
                >
                  Bienvenue !
                </text>
              </svg>
            </h1>

          )}

          {isDesktop && <h2>Voici mes réalisations : </h2>}

        </div>
        <Carousell />
      </div>
    </>
  )
}

export default Home
