import cvPdf from "../../assets/Cv/CV LAPOUGE Maxime-4.pdf"
import './Cv.scss'
import { useMediaQuery } from 'react-responsive'
import { useEffect, useState } from 'react'
const Cv = () => {
  const [heightScreen, setHeightScreen] = useState(window.innerHeight);
  const [widthScreen, setWidthScreen] = useState(window.innerWidth);
  const isDesktop = useMediaQuery({ minWidth: 769 });

  const handleResize= () => {
    setWidthScreen(window.innerWidth);
    setHeightScreen(window.innerHeight)
  };

  useEffect(() => {
    window.addEventListener('resize' , handleResize)
    return ()=>{
      window.removeEventListener('resize',handleResize)
    }
  }, [])
  return (
    <>
      <div className="container cv">
        <div className="text-zone">
          <h1>Mon Cv trop bien</h1>
          <div className="cv-embed">
            <embed
              src={cvPdf}
              type="application/pdf"
              width={isDesktop? widthScreen*0.6 : widthScreen*0.9}
              height={heightScreen* 0.70}
              style={{border: 'none' , frameborder:0}}
            />
          </div>

          <a href={cvPdf} download="CV-Lapouge-Maxime" className="download-btn">Télécharger le CV</a>
        </div>
      </div>
    </>
  )
}

export default Cv;