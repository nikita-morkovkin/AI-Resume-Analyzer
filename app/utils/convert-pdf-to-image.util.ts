import { PDF_CONVERT_CONFIG } from "~/consts";

export interface PdfToImageResult {
  file: File;
  dataUrl: string;
}

export async function convertPdfToImage(file: File): Promise<PdfToImageResult> {
  if (typeof window === "undefined") {
    throw new Error(
      "convertPdfToImage can only be executed in a browser environment.",
    );
  }

  const pdfjsLib = await import("pdfjs-dist");

  if (pdfjsLib.GlobalWorkerOptions) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = `${PDF_CONVERT_CONFIG.WORKER_SRC_URL}${pdfjsLib.version}/pdf.worker.min.mjs`;
  }

  let canvas: HTMLCanvasElement | null = null;

  try {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({
      data: new Uint8Array(arrayBuffer),
    });
    const pdf = await loadingTask.promise;

    if (pdf.numPages === 0) {
      throw new Error("PDF file has no pages.");
    }

    const page = await pdf.getPage(1);
    const viewport = page.getViewport({ scale: PDF_CONVERT_CONFIG.SCALE });

    canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error("Canvas 2D context could not be created.");
    }

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    const renderContext = {
      canvasContext: context,
      canvas: canvas,
      viewport: viewport,
    };

    await page.render(renderContext).promise;

    const dataUrl = canvas.toDataURL(PDF_CONVERT_CONFIG.IMAGE_MIME_TYPE);

    const blob = await new Promise<Blob | null>((resolve) => {
      canvas?.toBlob(resolve, PDF_CONVERT_CONFIG.IMAGE_MIME_TYPE);
    });

    if (!blob) {
      throw new Error("Failed to convert PDF canvas to Blob.");
    }

    const imageName = file.name
      ? file.name.replace(/\.pdf$/i, ".png")
      : PDF_CONVERT_CONFIG.DEFAULT_IMAGE_NAME;

    const imageFile = new File([blob], imageName, {
      type: PDF_CONVERT_CONFIG.IMAGE_MIME_TYPE,
    });

    return {
      file: imageFile,
      dataUrl,
    };
  } catch (error) {
    console.error("Error converting PDF to image:", error);
    throw error;
  } finally {
    if (canvas) {
      canvas.width = 0;
      canvas.height = 0;
    }
  }
}
