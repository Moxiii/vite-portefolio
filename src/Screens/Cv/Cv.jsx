import cvPdf from "../../assets/Cv/CV LAPOUGE Maxime-4.pdf";
import './Cv.scss';
import { useMediaQuery } from 'react-responsive';
import { useEffect, useRef, useState } from 'react';
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const Cv = () => {
  const [heightScreen, setHeightScreen] = useState(window.innerHeight);
  const [widthScreen, setWidthScreen] = useState(window.innerWidth);
  const isDesktop = useMediaQuery({ minWidth: 769 });
  const canvasRef = useRef(null);
  const isRendering = useRef(false);

  const handleResize = () => {
    setWidthScreen(window.innerWidth);
    setHeightScreen(window.innerHeight);
  };

  const loadPDF = async () => {
    if (isRendering.current) return;
    isRendering.current = true;

    try {
      const loadingTask = pdfjs.getDocument(cvPdf);
      const pdf = await loadingTask.promise;
      const page = await pdf.getPage(1);
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      if (!canvas) {
        console.error('Canvas is null');
        return;
      }


      const canvasWidth = widthScreen * 0.8;
      const canvasHeight = isDesktop ? Math.min(heightScreen * 0.9, 700) : heightScreen * 0.7;


      const viewport = page.getViewport({ scale: 1 });
      const scale = Math.min(canvasWidth / viewport.width, canvasHeight / viewport.height);


      const scaledViewport = page.getViewport({ scale });


      canvas.height = scaledViewport.height;
      canvas.width = scaledViewport.width;


      const renderContext = {
        canvasContext: context,
        viewport: scaledViewport,
      };

      await page.render(renderContext).promise;
    } catch (error) {
      console.error('Error loading PDF: ', error);
    } finally {
      isRendering.current = false;
    }
  };

  useEffect(() => {
    loadPDF();


    window.addEventListener('resize', handleResize);


    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [widthScreen, heightScreen]);

  return (
    <div className="container cv">
      <div className="text-zone">
        <h1>Mon CV </h1>
        <div className="cv-embed">
          <canvas ref={canvasRef} />
        </div>
        <a href={cvPdf} download="CV-Lapouge-Maxime" className="download-btn">Télécharger le CV</a>
      </div>
    </div>
  );
}

export default Cv;
