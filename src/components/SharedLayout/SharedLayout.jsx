import s from "./SharedLayout.module.scss"
import {AnimatePresence, motion} from "framer-motion";
import React, {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import InfiniteSlideCarousel  from "../Carousel/InfiniteSlideCarousel/slideCarousel.jsx"
import {
  faAngular,
  faJava,
  faJs,
  faPython,
  faReact,
  faSass,
} from "@fortawesome/free-brands-svg-icons";
import InfoDrawer from "../../components/DragCloseDrawer/infoDrawer.jsx"
export default function SharedLayout({ projects }) {
  const iconMap = {
    faReact: faReact,
    faJava: faJava,
    faAngular: faAngular,
    faJs: faJs,
    faPython: faPython,
    faSass: faSass,
  };
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const categories = ["Tous", "Frontend", "Mobile", "Fullstack"];
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const filteredProjects = selectedCategory === "Tous"
    ? projects
    : projects.filter((p) => p.category.includes(selectedCategory.toLowerCase()));
  const handleClickButton = (projet) => {
    setDrawerOpen(true)
    setSelectedProject(projet)
  }
  const renderMobilePresentation = (presentation) => {
    let sections = [];
    let currentSection = [];

    presentation.forEach((element, index) => {
      if (typeof element === 'object') {
        if (element.titre) {
          if (currentSection.length > 0) {
            sections.push(
              <div key={`section-${sections.length}`} className="section">
                {currentSection}
              </div>
            );
          }
          currentSection = [<h2 key={index}>{element.titre}</h2>];
        }

        if (element.liste) {
          currentSection.push(
            <ul key={`list-${index}`}>
              {element.liste.map((item, i) => (
                <li key={`item-${i}`}>{item}</li>
              ))}
            </ul>
          );
        }
      } else {
        currentSection.push(<p key={index}>{element}</p>);
      }
    });

    if (currentSection.length > 0) {
      sections.push(
        <div key={`section-${sections.length}`} className="section">
          {currentSection}
        </div>
      );
    }

    return sections;
  };
  return (
    <div className={s.SharedLayoutContainer}>
      <nav className={s.SharedLayoutNav}>
        <ul className={s.tabsContainer}>
          {categories.map((cat) => (
            <motion.li
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={s.tabs}
            >
              <motion.div
                className={s.tabButton}
                animate={{
                  fontWeight: selectedCategory === cat? "bold" : "normal",
                  color: selectedCategory=== cat? "#000" : "#aaaaaa",
                }}
              >
                {cat}

              </motion.div>
            </motion.li>
          ))}
        </ul>
      </nav>
      <main className={s.SharedLayoutMain}>
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedProject ? selectedProject.title : "empty"}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={s.content}
          >
            {filteredProjects.map((item)=> (
              <motion.div
                key={item.id}
                className={s.projectCard}
              >
                <div className={s.projectPreview}>
                  {item.img?.some(img => img.isMock) ? (
                    <img
                      src={item.img.find(img => img.isMock)?.src}
                      alt={`Mockup de ${item.title}`}
                      className={s.previewImage}
                    />
                  ) : item.category?.includes("mobile") ? (
                    <img src="../../assets/Logo/mobile-placeholder.svg" alt="Mobile placeholder" />
                  ) : (
                    <img src="../../assets/Logo/desktop-placeholder.png" alt="Desktop placeholder" />
                  )}
                </div>
                <motion.div className={s.ProjectDescription}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <div className={s.techBadges}>
                    {item.technologies?.map((tech, index) =>
                    (<span key={index} className={s.techBadge}>
                      {iconMap[tech.icon] ? <FontAwesomeIcon icon={iconMap[tech.icon]} /> : tech.name}
                    </span>))}
                  </div>

                  <motion.div className={s.button} onClick={() => handleClickButton(item)}>En
                    savoir plus
                  </motion.div>
                </motion.div>

              </motion.div>
            ))
            }
          </motion.div>
        </AnimatePresence>
      </main>
      <InfoDrawer isOpen={isDrawerOpen} onClose={()=>setDrawerOpen(false)}
      >
        {selectedProject && (
          <>
          <h3 className={s.projectTitle}>{selectedProject.title}</h3>
            {selectedProject && <InfiniteSlideCarousel images={selectedProject.img} />}
            {renderMobilePresentation(selectedProject.presentation)}
          </>
        )}
      </InfoDrawer>
    </div>
  )
}