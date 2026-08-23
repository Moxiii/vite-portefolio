import s from "./slideCarousel.module.scss"
import { useState} from "react";
import {FaChevronRight, FaChevronLeft} from "react-icons/fa";
import {motion} from "framer-motion";

export default function slideCarousel({images}){
  const [currentIndex, setCurrentIndex] = useState(0);
  const filteredImages = images.filter(image => image.isMock !== true);
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? filteredImages.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className={s.SlideContainer}>
      <motion.div
        key={currentIndex}
        className={s.SlideContent}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.5 }}
      >
        <div className={s.SlideText}>
          <h2>{filteredImages[currentIndex].title}</h2>
        </div>
        <div className={s.SlideImage} style={{ backgroundImage: `url(${filteredImages[currentIndex].src})` }} />
      </motion.div>
      <button className={s.PrevButton} onClick={prevSlide} aria-label="Image précédente">
        <FaChevronLeft />
      </button>
      <button className={s.NextButton} onClick={nextSlide} aria-label="Image suivante">
        <FaChevronRight />
      </button>
    </div>
  )
}