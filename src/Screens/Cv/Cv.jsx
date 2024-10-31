import cvPdf from "../../assets/Cv/CV LAPOUGE Maxime-4.pdf"
import './Cv.scss'
import { useMediaQuery } from 'react-responsive'
import { useEffect, useRef, useState } from 'react'
import {pdfjs} from 'react-pdf'
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
const Cv = () => {
  const [heightScreen, setHeightScreen] = useState(window.innerHeight);
  const [widthScreen, setWidthScreen] = useState(window.innerWidth);
  const isDesktop = useMediaQuery({ minWidth: 769 });
  const canvasRef = useRef(null);

  const handleResize = () => {
    setWidthScreen(window.innerWidth);
    setHeightScreen(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    const loadPDF = async () => {
      try {
        const loadingTask = pdfjs.getDocument(cvPdf);
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(1);
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        // Récupération des dimensions du canvas
        const canvasWidth = widthScreen * 0.7;
        const canvasHeight = heightScreen * 0.7;
        // Calcul du scale pour que le PDF remplisse le canvas
        const viewport = page.getViewport({ scale: 1 });
        const scale = Math.min(canvasWidth / viewport.width, canvasHeight / viewport.height);
        // Nouveau viewport avec le scale calculé
        const scaledViewport = page.getViewport({ scale });
        // Ajuster la taille du canvas
        canvas.height = scaledViewport.height;
        canvas.width = scaledViewport.width;
        // Rendu de la page
        const renderContext = {
          canvasContext: context,
          viewport: scaledViewport,
        };
        await page.render(renderContext).promise;
      } catch (error) {
        console.error('Error loading PDF: ', error);
      }
    };
    loadPDF();
    // Nettoyage
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [widthScreen, heightScreen]);
  return (
    <>
      <div className="container cv">
        <div className="text-zone">
          <h1>Mon CV trop bien</h1>
          <div className="cv-embed">
            {/* Utilisation du canvas pour afficher le PDF */}
            <canvas ref={canvasRef}  />
          </div>
          <a href={cvPdf} download="CV-Lapouge-Maxime" className="download-btn">Télécharger le CV</a>
        </div>
      </div>
    </>
  );
}

export default Cv;