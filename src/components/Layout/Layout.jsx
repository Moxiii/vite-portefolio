import './Layout.scss'
import Sidebar from '../Sidebar/Sidebar'
import { Outlet, useLocation } from 'react-router-dom'
import Loader from 'react-loaders'
import { useEffect, useState } from 'react'
import MobileView from '../../Screens/MobileView/MobileView.jsx'
import {  useMediaQuery } from 'react-responsive'
const Layout = () => {
  const isDesktop = useMediaQuery({minWidth:769})
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);

    return () => clearTimeout(timer); // Nettoyage
  }, [location]);
  return (
    <>
      {isDesktop ? (
        <div className="App">
          <Sidebar />
          <div className="page">
            {loading ? (
              <Loader type="pacman" />
            ) : (
              <Outlet context={{ setLoading }} />
            )}
          </div>
        </div>
      ) : (
        <div className="page">
          {/* Directement le rendu mobile */}
          {loading ? (
            <Loader type="pacman" />
          ) : (
            <MobileView setLoading={setLoading} />
          )}
        </div>
      )}
    </>
  )
}
export default Layout
