import CV from "../../assets/Cv/CV LAPOUGE Maxime-1.pdf";
import './Cv.scss';

import RenderPDF from './renderPDF.tsx';

const Cv = () => {



  return (
    <div className="container cv">
      <div className="text-zone">
        <h1>Mon CV </h1>
        <div className="cv-embed">
          <RenderPDF pdfUrl={CV}/>
        </div>
        <a href={CV} download="CV-Lapouge-Maxime" className="download-btn">Télécharger le CV</a>
      </div>
    </div>
  );
}

export default Cv;
