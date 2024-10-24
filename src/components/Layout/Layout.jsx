import './Layout.scss'
import Sidebar from '../Sidebar/Sidebar'
import { Outlet, useLocation } from 'react-router-dom'
import Loader from 'react-loaders'
import { useEffect, useState } from 'react'
const Layout = () => {

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
    <div className="App">
       <Sidebar  />
      <div className="page">
        {loading ? (<Loader type="pacman" />):(
          <Outlet context={{ setLoading }} /> )}
      </div>
    </div>
    </>
  )
}
export default Layout
