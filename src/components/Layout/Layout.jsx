import './Layout.scss'
import Sidebar from '../Sidebar/Sidebar'
import { Outlet, useLocation } from 'react-router-dom'
import Loader from 'react-loaders'
import { useEffect, useState } from 'react'
import MobileView from '../../Screens/MobileView/MobileView.jsx'
const Layout = () => {

  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [isMobile, setisMobile] = useState(window.innerWidth <= 1000);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1000) {
        setisMobile(true);
      } else {
        setisMobile(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
       <Sidebar isMobile={isMobile} />
      <div className="page">
        {loading ? (
          <Loader type="pacman" />
        ):isMobile ? (
            <MobileView setLoading={ setLoading}/>
        ) :
          (
          <Outlet context={{ setLoading }} />
          )
        }
      </div>
    </div>
    </>
  )
}
export default Layout
