import { useRef } from 'react'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from 'framer-motion'

import './tiltCard.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const ROTATION_RANGE = 15
const HALF_ROTATION_RANGE = ROTATION_RANGE / 2

export default function TiltCard({ title, icon, href, external = false }) {
  const ref = useRef(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const xSpring = useSpring(x, {
    stiffness: 150,
    damping: 15,
  })

  const ySpring = useSpring(y, {
    stiffness: 150,
    damping: 15,
  })

  const transform = useMotionTemplate`
    rotateX(${xSpring}deg)
    rotateY(${ySpring}deg)
  `

  const handleMouseMove = (e) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()

    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    const rX = (mouseY / rect.height) * ROTATION_RANGE - HALF_ROTATION_RANGE

    const rY = (mouseX / rect.width) * ROTATION_RANGE - HALF_ROTATION_RANGE

    x.set(rX * -1)
    y.set(rY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }
  const CardComponent = href ? motion.a : motion.div
  return (
    <CardComponent
      ref={ref}
      {...(href
        ? {
            href,
            target: external ? '_blank' : undefined,
            rel: external ? 'noopener noreferrer' : undefined,
          }
        : {})}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        transform,
      }}
      className="tilt-card"
    >
      <div className="card-content">
        <p>
          {title}
          {href && (
            <span className="card-arrow" aria-hidden="true">
              ↗
            </span>
          )}
        </p>

        {icon && <FontAwesomeIcon icon={icon} />}
      </div>
    </CardComponent>
  )
}
