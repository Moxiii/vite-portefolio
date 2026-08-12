import './Home.scss'
import { lazy, useEffect, useState } from 'react'
const SharedLayout = lazy(
  () => import('@components/SharedLayout/SharedLayout.jsx')
)

import FetchProject from '../../Hook/Fetch/FetchProject.js'
import Contact from '@components/Contact/Contact.jsx'
import Herobanner from '@components/Hero/HeroBanner.jsx'
export default function Home() {
  const [projets, setProjets] = useState([])
  const [widthScreen, setWidthScreen] = useState(window.innerWidth)
  const handleResize = () => {
    setWidthScreen(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [widthScreen])

  useEffect(() => {
    const getData = async () => {
      const projects = await FetchProject()
      setProjets(projects)
    }
    getData()
  }, [])
  return (
    <div className="container home">
      <div className="text-zone">
        <Herobanner />
        <h2>Voici mes réalisations : </h2>
        <SharedLayout projects={projets} />
        <Contact />
      </div>
    </div>
  )
}
