import { readFileSync, writeFileSync } from "fs";
import { getDocument, PDFPageProxy, PageViewport, PDFDocumentProxy } from "pdfjs-dist/legacy/build/pdf.mjs";
import { createCanvas, ImageData as CanvasImageData, Image } from "canvas";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { JSDOM } from "jsdom";

class FixedImageData extends CanvasImageData {
  colorSpace = "srgb";
}

const dom = new JSDOM('', {
  runScripts: "outside-only",
  resources: "usable"
});

global.window = dom.window as any;
global.document = dom.window.document as any;
globalThis.ImageData = FixedImageData as unknown as typeof ImageData;
globalThis.HTMLCanvasElement = createCanvas(1, 1).constructor as unknown as { new (): HTMLCanvasElement; prototype: HTMLCanvasElement };
globalThis.HTMLImageElement = Image as any;

global.window.requestAnimationFrame = global.window.requestAnimationFrame || ((callback: Function) => setTimeout(callback, 0));
global.window.cancelAnimationFrame = global.window.cancelAnimationFrame || ((id: any) => clearTimeout(id));
globalThis.requestAnimationFrame = global.window.requestAnimationFrame;
globalThis.cancelAnimationFrame = global.window.cancelAnimationFrame;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function isBold(fontName: string): boolean {
  return fontName.includes('f1') || fontName.includes('Bold');
}

async function convertPdfToHtml(pdfPath: string, outputHtmlPath: string): Promise<string> {
  const data = new Uint8Array(readFileSync(pdfPath));
  const pdfDoc: PDFDocumentProxy = await getDocument({ data }).promise;

  let htmlContent = "<html><head><meta charset='utf-8'></head><body>";
  let pageHtml = '<div>';

  for (let i = 1; i <= pdfDoc.numPages; i++) {
    const page: PDFPageProxy = await pdfDoc.getPage(i);
    const textContent: any = await page.getTextContent();
    const viewport: PageViewport = page.getViewport({ scale: 1.5 });

    const canvas = createCanvas(viewport.width, viewport.height);
    const context = canvas.getContext("2d") as unknown as CanvasRenderingContext2D;

    await page.render({ canvasContext: context as any, viewport }).promise;

    textContent.items.forEach((textItem: any) => {
      let text = textItem.str;

      if (isBold(textItem.fontName)) {
        pageHtml += `<strong><p>${text}</p></strong>`;
      } else if (textItem.fontName.includes("Italic")) {
        pageHtml += `<em>${text}</em>`;
      } else if (textItem.hasEol) {
        pageHtml += `</br>`;
      } else {
        pageHtml += `<p>${text}</p>`;
      }
    });

    pageHtml += "</div>";
    htmlContent += pageHtml;
  }

  htmlContent += "</body></html>";
  
  console.log(pageHtml)
  return pageHtml;
}

export default convertPdfToHtml;