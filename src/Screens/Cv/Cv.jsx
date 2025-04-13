
import './Cv.scss';
import links from '../../Utils/_const.js'
import RenderPDF from './renderPDF.tsx';

const Cv = () => {

  return (
    <div className="container cv">
      <div className="text-zone">
        <h1>Mon CV </h1>
        <div className="cv-embed">
          <RenderPDF pdfUrl={links.download.cv}/>
        </div>
        <a href={links.download.cv} download="CV-Lapouge-Maxime" className="download-btn">Télécharger le CV</a>
      </div>
    </div>
  );
}

export default Cv;
