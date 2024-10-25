import cvPdf from "../../assets/Cv/CV LAPOUGE Maxime-4.pdf"
import './Cv.scss'
const Cv = () => {

  return (
    <>
      <div className="container cv">
        <div className="text-zone">
          <h1>Mon Cv trop bien</h1>
          <div className="cv-embed">
            <embed
              src={cvPdf}
              type="application/pdf"
              width="1000px"
              height="700px"
              style={{ border: 'none' }}
            />
          </div>

          <a href={cvPdf} download="CV-Lapouge-Maxime" className="download-btn">Télécharger le CV</a>
        </div>
      </div>
    </>
  )
}

export default Cv;