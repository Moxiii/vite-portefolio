import s from "./SharedLayout.module.scss"
import {AnimatePresence, motion} from "framer-motion";
import React, {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAngular,
  faJava,
  faJs,
  faPython,
  faReact,
  faSass,
} from "@fortawesome/free-brands-svg-icons";
export default function SharedLayout({ projects , setOpen , setOpenedProject }) {
  const iconMap = {
    faReact: faReact,
    faJava: faJava,
    faAngular: faAngular,
    faJs: faJs,
    faPython: faPython,
    faSass: faSass,
  };
  const categories = ["Tous", "Frontend", "Mobile", "Fullstack"];

  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const filteredProjects = selectedCategory === "Tous"
    ? projects
    : projects.filter((p) => p.category.includes(selectedCategory.toLowerCase()));
  const [selectedTab, setSelectedTab] = useState(projects.length > 0 ? projects[0] : null);
  const handleClickButton = (selectedTab) => {
    setOpen(true);
    setOpenedProject(selectedTab);
  }
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
            key={selectedTab ? selectedTab.title : "empty"}
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

                  <motion.div className={s.button} onClick={() => handleClickButton(selectedTab)}>En
                    savoir plus
                  </motion.div>
                </motion.div>

              </motion.div>
            ))
            }
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}