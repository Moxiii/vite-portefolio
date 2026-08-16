import s from './SharedLayout.module.scss'

import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
  faAngular,
  faJava,
  faJs,
  faPython,
  faReact,
  faSass,
} from '@fortawesome/free-brands-svg-icons'

import InfiniteSlideCarousel from '../Carousel/InfiniteSlideCarousel/slideCarousel.jsx'
import InfoDrawer from '../../components/DragCloseDrawer/infoDrawer.jsx'

import { useBreakPoint } from '../../Hook/IsDesktop/useBreakPoint.ts'
import { useNavigate } from 'react-router-dom'

export default function SharedLayout({ projects }) {
  const { isMobile } = useBreakPoint()
  const navigate = useNavigate()

  const [isDrawerOpen, setDrawerOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('Tous')

  const categories = ['Tous', 'Frontend', 'Mobile', 'Fullstack']

  const iconMap = {
    faReact,
    faJava,
    faAngular,
    faJs,
    faPython,
    faSass,
  }

  const filteredProjects = projects
    .filter((project) => project.visible !== false)
    .filter((project) =>
      selectedCategory === 'Tous'
        ? true
        : project.category?.includes(selectedCategory.toLowerCase())
    )

  const handleProjectClick = (project) => {
    if (isMobile) {
      setSelectedProject(project)
      setDrawerOpen(true)

      return
    }

    navigate(`/project/${project.id}`)
  }

  const getProjectImage = (project) => {
    const mockup = project.img?.find((img) => img.isMock)

    if (mockup) {
      return {
        src: mockup.src,
        alt: `Mockup de ${project.title}`,
      }
    }

    if (project.category?.includes('mobile')) {
      return {
        src: '../../assets/Logo/mobile-placeholder.svg',
        alt: 'Mobile placeholder',
      }
    }

    return {
      src: '../../assets/Logo/desktop-placeholder.png',
      alt: 'Desktop placeholder',
    }
  }

  const renderTechnologies = (project) => {
    return project.technologies?.map((tech, index) => (
      <span
        key={`${project.id}-tech-${index}`}
        className={s.techBadge}
        title={tech.name}
      >
        {iconMap[tech.icon] ? (
          <FontAwesomeIcon icon={iconMap[tech.icon]} />
        ) : (
          tech.name
        )}
      </span>
    ))
  }

  const renderMobilePresentation = (presentation) => {
    if (!presentation) {
      return null
    }

    const sections = []
    let currentSection = []

    presentation.forEach((element, index) => {
      if (typeof element === 'object' && element !== null) {
        if (element.titre) {
          if (currentSection.length > 0) {
            sections.push(
              <div
                key={`section-${sections.length}`}
                className={s.presentationSection}
              >
                {currentSection}
              </div>
            )
          }

          currentSection = [<h2 key={`title-${index}`}>{element.titre}</h2>]
        }

        if (element.liste) {
          currentSection.push(
            <ul key={`list-${index}`}>
              {element.liste.map((item, itemIndex) => (
                <li key={`item-${index}-${itemIndex}`}>{item}</li>
              ))}
            </ul>
          )
        }
      } else {
        currentSection.push(<p key={`paragraph-${index}`}>{element}</p>)
      }
    })

    if (currentSection.length > 0) {
      sections.push(
        <div
          key={`section-${sections.length}`}
          className={s.presentationSection}
        >
          {currentSection}
        </div>
      )
    }

    return sections
  }

  return (
    <section className={s.SharedLayoutContainer}>
      <nav className={s.SharedLayoutNav}>
        <ul className={s.tabsContainer}>
          {categories.map((category) => {
            const isSelected = selectedCategory === category

            return (
              <li
                key={category}
                className={s.tab}
                onClick={() => setSelectedCategory(category)}
              >
                <motion.button
                  className={s.tabButton}
                  animate={{
                    color: isSelected ? '#0D3B66' : '#665C55',
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                >
                  {category}

                  {isSelected && (
                    <motion.span
                      layoutId="activeCategory"
                      className={s.activeIndicator}
                      transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 35,
                      }}
                    />
                  )}
                </motion.button>
              </li>
            )
          })}
        </ul>
      </nav>

      <main className={s.SharedLayoutMain}>
        <motion.div layout className={s.content}>
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              const image = getProjectImage(project)

              return (
                <motion.article
                  layout
                  key={project.id}
                  className={s.projectCard}
                  initial={{
                    opacity: 0,
                    y: 25,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -15,
                  }}
                  transition={{
                    duration: 0.45,
                    ease: 'easeOut',
                  }}
                  whileHover={{
                    y: -5,
                  }}
                >
                  <div className={s.projectPreview}>
                    <motion.img
                      src={image.src}
                      alt={image.alt}
                      className={s.previewImage}
                      transition={{
                        duration: 0.4,
                        ease: 'easeOut',
                      }}
                    />
                  </div>

                  <div className={s.ProjectDescription}>
                    <div className={s.projectHeader}>
                      <h3>{project.title}</h3>

                      {project.category?.[0] && (
                        <span className={s.projectCategory}>
                          {project.category[0]}
                        </span>
                      )}
                    </div>

                    <p>{project.description}</p>

                    <div className={s.techBadges}>
                      {renderTechnologies(project)}
                    </div>

                    <button
                      className={s.projectButton}
                      onClick={() => handleProjectClick(project)}
                    >
                      <span>En savoir plus</span>

                      <span aria-hidden="true">↗</span>
                    </button>
                  </div>
                </motion.article>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </main>

      <InfoDrawer isOpen={isDrawerOpen} onClose={() => setDrawerOpen(false)}>
        {selectedProject && (
          <>
            <h3 className={s.projectTitle}>{selectedProject.title}</h3>

            <InfiniteSlideCarousel images={selectedProject.img} />

            <div className={s.ProjectLinks}>
              <h3>Liens utiles :</h3>

              <ul>
                {selectedProject.links?.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className={s.ProjectPresentation}>
              {renderMobilePresentation(selectedProject.presentation)}
            </div>
          </>
        )}
      </InfoDrawer>
    </section>
  )
}
