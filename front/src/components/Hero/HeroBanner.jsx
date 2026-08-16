import { useState, useEffect } from 'react'
import s from './HeroBanner.module.scss'
import { AnimatePresence, motion } from 'framer-motion'
export default function Herobanner() {
  const technologies = ['Java', 'Spring Boot', 'JavaScript', 'React']
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % technologies.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className={s.heroContainer}>
      <h1>Développeur web</h1>

      <p>Je conçois des applications modernes et performantes</p>

      <p>Développeur passionné par les nouvelles technologies</p>

      <div className={s.technology}>
        <span>Développeur : </span>
        <div className={s.technologyPop}>
          <AnimatePresence mode="popLayout">
            <motion.span
              key={technologies[index]}
              initial={{
                y: '100%',
                opacity: 0,
              }}
              animate={{
                y: '0%',
                opacity: 1,
              }}
              exit={{
                y: '-100%',
                opacity: 0,
              }}
              transition={{
                duration: 0.75,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {technologies[index]}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
