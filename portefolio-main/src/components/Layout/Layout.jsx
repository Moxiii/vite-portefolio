import './Layout.scss'
import Sidebar from '../Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'
import Loader from 'react-loaders'
const Layout = () => {
  return (
    <>
    <div className="App">
       <Sidebar /> 
      <div className="page">
        <Outlet />
      </div>
    </div>
    <Loader type="pacman" />
    </>
  )
}

export default Layout
