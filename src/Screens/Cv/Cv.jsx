import './Cv.scss'
import Loader from 'react-loaders'
import cvPdf from "../../assets/Cv/CV LAPOUGE Maxime-4.pdf"
const Cv = () => {
  return (
    <>
      <div className="container cv">
        <div className="text-zone">
          <h1>Mon Cv trop bien</h1>
          {/* Affichage du PDF dans une iframe */}
          <embed
            src={cvPdf}
            type="application/pdf"
            width="1000px"
            height="700px"
            style={{ border: 'none' }}
          />
          {/* Bouton de téléchargement */}
          <a href={cvPdf} download="CV-Lapouge-Maxime" className="download-btn">Télécharger le CV</a>
        </div>
      </div>
      <Loader type="pacman" />
    </>
  )
}

export default Cv;