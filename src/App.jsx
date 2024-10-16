import { useState } from 'react'
import './App.scss'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout/Layout.jsx'
import Home from './components/Home/Home.jsx'
import About from './components/About/About.jsx'
import Contact from './components/Contact/Contact.jsx'
import Cv from './components/Cv/Cv.jsx'
import Projets from './components/Projets/Projets.jsx'
import "./App.scss"
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cv" element={<Cv />} />
          <Route path="/projets" element={<Projets />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
