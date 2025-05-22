import './Layout.scss'
import Sidebar from '../Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'
import Loader from 'react-loaders'
import { lazy, Suspense } from 'react'
import IsDesktop from "../../Hook/IsDesktop/isDesktop.ts"
const MobileView = lazy(() => import('../../Screens/MobileView/MobileView.jsx'))

export default function Layout() {
const useIsDesktop = IsDesktop()


  return (
    <>
      {useIsDesktop ? (
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

