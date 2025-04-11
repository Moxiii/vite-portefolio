import './Layout.scss'
import Sidebar from '../Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'
import Loader from 'react-loaders'
import { lazy, Suspense } from 'react'
const MobileView = lazy(() => import('../../Screens/MobileView/MobileView.jsx'))
import {  useMediaQuery } from 'react-responsive'
const Layout = () => {
  const isDesktop = useMediaQuery({minWidth:769})


  return (
    <>
      {isDesktop ? (
          <Suspense fallback={<Loader type="pacman" />}>
            <Sidebar />
            <Outlet />
          </Suspense>
      ) : (
        <Suspense fallback={<Loader type="pacman" />}>
          <MobileView />
        </Suspense>
      )}
    </>
  )
}
export default Layout
