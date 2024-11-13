
import './App.scss'
import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'

import Layout from './components/Layout/Layout.jsx'
import Home from './Screens/Home/Home.jsx'
import About from './Screens/About/About.jsx'
import Contact from './Screens/Contact/Contact.jsx'
import Cv from './Screens/Cv/Cv.jsx'
import Projets from './components/Projets/Projets.jsx'
import ErrorBoundary from './Hook/ErrorBoundary/ErrorBoundary.jsx'

import ReactGA, { set } from 'react-ga'
import Lenis from 'lenis'
import {useStore} from './Hook/Scrolll/Store.js'

const TRACK_ID = "G-QFY45Q5VPP"
ReactGA.initialize(TRACK_ID);

function App() {

  const location = useLocation();
  const setLenis = useStore(state => state.setLenis)

  useEffect(()=>{
    ReactGA.pageview(location.pathname + location.search)
  },[location])
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  }, []);

  useEffect(()=>{
    const lenisInstance = new Lenis({
      duration:1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth:true,
    })
    setLenis(lenisInstance);
    function raf(time){
      lenisInstance.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    return ()=>{
      lenisInstance.destroy()
    }
  },[setLenis])
  return (
    <>
      <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cv" element={<Cv />} />
          <Route path="/projet/:id" element={<Projets />} />
        </Route>
      </Routes>
      </ErrorBoundary>
    </>
  )
}

export default App
