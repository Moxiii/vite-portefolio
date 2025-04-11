// @ts-ignore
import React, { useEffect, useRef, useState} from "react";
import * as pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker.min.mjs";
interface PDFRendererprops{
  pdfUrl:string;
}
export default function PDFRenderer({pdfUrl}:PDFRendererprops):React.JSX.Element{
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pdfLoaded, setPdfLoaded] = useState(false);
  useEffect(() => {
    const renderPDF = async () => {
      const loadingTask = pdfjsLib.getDocument(pdfUrl);
      const pdf = await loadingTask.promise;
      const page = await pdf.getPage(1);
      const scale = 1.2;
      const viewport = page.getViewport({ scale });
      const canvas = canvasRef.current;
      if (!canvas) return;
      const context = canvas.getContext("2d");
      canvas.width = viewport.width;
      canvas.height = viewport.height;
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
      <canvas ref={canvasRef} style={{border: "none"}}/>
    </div>
  )
}