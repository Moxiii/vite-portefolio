
// @ts-ignore
import React, { useEffect, useRef, useState} from "react";

// @ts-ignore
import { useBreakPoint } from '@hook/IsDesktop/useBreakPoint'

interface PDFRendererprops{
  pdfUrl:string;
}
export default function PDFRenderer({pdfUrl}:PDFRendererprops):React.JSX.Element{
const { isMobile } = useBreakPoint();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pdfLoaded, setPdfLoaded] = useState(false);
  useEffect(() => {
    const renderPDF = async () => {
      const pdfjsLib = await import("pdfjs-dist");
      await import("pdfjs-dist/build/pdf.worker.min.mjs");
      const loadingTask = pdfjsLib.getDocument(pdfUrl);
      const pdf = await loadingTask.promise;
      const page = await pdf.getPage(1);
      const scale = isMobile ?  1 : 1.2;
      const viewport = page.getViewport({ scale });
      const canvas = canvasRef.current;
      if (!canvas) return;
      const context = canvas.getContext("2d");
      canvas.width =   viewport.width ;
      canvas.height =   viewport.height ;
      const renderContext = {
        canvasContext: context!,
        viewport,
      };
      await page.render(renderContext).promise;
      setPdfLoaded(true);
    };
    renderPDF().catch(console.error);
  }, [pdfUrl]);
  return (
    <div className="pdfContainer">
      {!pdfLoaded && <p>Chargement du CV...</p>}
      <canvas ref={canvasRef} style={{border: "none" , width:"100%" , height:"100%"}} />
    </div>
  )
}