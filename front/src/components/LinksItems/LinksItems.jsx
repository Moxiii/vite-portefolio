import s from "./LinksItems.module.scss"
import gsap from 'gsap'
import {useEffect, useRef} from "react";

// eslint-disable-next-line react/prop-types
export default function LinksItm({to,label}) {
  const isExternal = to.startsWith("http");
  const underlineRef = useRef(null)
  const hoverRef = useRef(null)
  const duration = .7
  useEffect(() => {
    const underline  = underlineRef.current
    const hover  = hoverRef.current
    if(!underline || !hover)return

    gsap.set(underlineRef.current, {
      scaleX:0,
      transformOrigin:"left center"
    })
    const handleEnter = () =>{
      gsap.to(underline,{scaleX:1, duration: duration , ease: 'power2.out'})
    }
    const handleLeave = () =>{
      gsap.to(underline,{scaleX:0, duration: duration , ease: 'power2.out'})
    }
    hover.addEventListener("mouseenter", handleEnter)
    hover.addEventListener("mouseleave", handleLeave)
    return () => {
      hover.removeEventListener("mouseenter", handleEnter)
      hover.removeEventListener("mouseleave", handleLeave)
    }
  })
  return (
    <a
      href={to}
      target={isExternal ? "_blank" : "_self"}
      rel={isExternal ? "noopener noreferrer" : undefined}
      ref={hoverRef}
    >
      <span>{label}</span>
      <div className={s.underline} ref={underlineRef}/>
    </a>
  )
}