
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
import { ReactLenis } from "lenis/react";

import ReactGA from 'react-ga'
import NotFound from './Screens/NotFound/NotFound.jsx'

const TRACK_ID = "G-QFY45Q5VPP"
ReactGA.initialize(TRACK_ID);

function App() {

  const location = useLocation();

  const lenisOption = {
    autoRaf: true,
    smooth: true,
    lerp: 0.1,
  };

  useEffect(()=>{
    ReactGA.pageview(location.pathname + location.search)
  },[location])
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  }, []);


  return (
    <ReactLenis
      root
      options={lenisOption}
      style={{ height: "100vh", overflowY: "auto" }}
    >
      <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cv" element={<Cv />} />
          <Route path="/projet/:id" element={<Projets />} />
          <Route path="*" element={<NotFound/>}/>
        </Route>
      </Routes>
      </ErrorBoundary>
    </ReactLenis>
  )
}

export default App
