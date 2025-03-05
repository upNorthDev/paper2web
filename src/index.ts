export async function convertToHtml(pdfPath: string): Promise<string> {
  const { default: PDFParser } = await import("pdf2json");
  const pdfParser = new PDFParser();

  return new Promise((resolve, reject) => {
    pdfParser.on("pdfParser_dataReady", (pdfData) => {
      let html = "";
      let fontSizes: number[] = [];
      let lastX = 0;
      let inUnorderedList = false;

      pdfData.Pages.forEach((page: { Texts: any[] }) => {
        page.Texts.forEach((text: { R: { T: string; TS: number[]; }[] }) => {
          fontSizes.push(text.R[0].TS[1]);
        });
      });

      const uniqueSizes = [...new Set(fontSizes)].sort((a, b) => b - a);

      const h1Size = uniqueSizes[0] || 24;
      const h2Size = uniqueSizes[1] || (h1Size * 0.8);
      const h3Size = uniqueSizes[2] || (h2Size * 0.8);

      pdfData.Pages.forEach((page: { Texts: any[] }) => {
        page.Texts.forEach((text: { R: { T: string; TS: number[], x: number }[] }, index: number) => {
          let extractedText = decodeURIComponent(text.R[0].T);
          let fontSize = text.R[0].TS[1];
          let isBold = text.R[0].TS[2] === 1;
          let isItalic = text.R[0].TS[3] === 1;
          let xPosition = text.R[0].TS[4];

          let styledText = extractedText;

          if (fontSize >= h1Size) {
            styledText = `<h1>${styledText}</h1>`;
          } else if (fontSize >= h2Size) {
            styledText = `<h2>${styledText}</h2>`;
          } else if (fontSize >= h3Size) {
            styledText = `<h3>${styledText}</h3>`;
          } else {
            if (isBold) styledText = `<b>${styledText}</b>`;
            if (isItalic) styledText = `<i>${styledText}</i>`;
          }

          let previousText = "";
          if (index > 0) {
            previousText = decodeURIComponent(page.Texts[index - 1].R[0].T);
          }

          if (/^[-•●▪◦]/.test(extractedText)) {
            if (!inUnorderedList) {
              html += "<ul>";
              inUnorderedList = true;
            }
            styledText = `<li>${styledText.substring(1).trim()}</li>`;
          } 
          if (!(/^[-•●▪◦]/.test(extractedText)) && (/^[-•●▪◦]/.test(previousText))) {
            html += '</ul>';
            inUnorderedList = false;
          }

          html += styledText + " ";
          lastX = xPosition;
        });

        html += "<br>";
      });

      resolve(html);
    });

    pdfParser.on("pdfParser_dataError", (error) => {
      reject(error);
    });

    pdfParser.loadPDF(pdfPath);
  });
}