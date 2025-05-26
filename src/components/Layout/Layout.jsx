import './Layout.scss'
import Sidebar from '../Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'
import Loader from 'react-loaders'
import { lazy, Suspense, useEffect } from 'react'
import { useBreakPoint } from "../../Hook/IsDesktop/useBreakPoint.ts"
import BurgerMenu from '../../components/Sidebar/Burger/BurgerMenu.tsx'
const MobileView = lazy(() => import('../../Screens/MobileView/MobileView.jsx'))

export default function Layout() {
const { isMobile , isTinyDesktop } = useBreakPoint()
useEffect(() => {
  if(isTinyDesktop){
    console.log("tiny");
  }
},[isTinyDesktop])

  return (
    <>
      {isMobile ? (
        <Suspense fallback={<Loader type="pacman" />}>
          <MobileView />
        </Suspense>

      ) : (
        <Suspense fallback={<Loader type="pacman" />}>
    {isTinyDesktop ? (<BurgerMenu
      strokeWidth="5"
      color="#FFC300"
      lineProps={{ strokeLinecap: "round" }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      width="40"
      height="40"
    />):(<Sidebar />)}
    <Outlet />
    </Suspense>
      )}
    </>
  )
}

