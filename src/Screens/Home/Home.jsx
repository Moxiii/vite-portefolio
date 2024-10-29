
import './Home.scss'
import Carousell from '../../components/Carousel/Carousel.jsx'
import {useMediaQuery} from 'react-responsive'
import { useEffect, useRef } from 'react'
import { Typed } from 'react-typed'

const Home = () => {
  const isDesktop = useMediaQuery({ minWidth: 769 });
  const typedElement = useRef(null);
  const typedInstance = useRef(null);
  useEffect(() => {
    if (!isDesktop) {
      var today = new Date();
      var curHr = today.getHours();
      var time = null;
      if(curHr<18){
        var time="Bonjour"
      } else if (curHr>18 && curHr <24){
        var time = "Bonsoir"
      } else{
        var time = "Bonne nuit"
      }
      const strings = [`${time}!` , "Bienvenue"]
      const options = {
        strings: strings,
        typeSpeed: 100,
        backSpeed: 100,
        loop: false,
        backDelay: 900,
        showCursor:false,
        smartBackspace:true,
      };

      typedInstance.current = new Typed(typedElement.current, options);
      return () => {
        typedInstance.current.destroy();
      };
    }
  }, [isDesktop]);

  return (
    <>
      <div className="container home">
        <div className="text-zone">
          {isDesktop ? (<h1>
            Bonjour !  <br/> Bienvenue sur mon portefolio.
          </h1>):(<h1 ref={typedElement}></h1>)}

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
