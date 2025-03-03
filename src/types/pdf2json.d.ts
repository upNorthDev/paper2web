declare module "pdf2json" {
    import { Readable } from "stream";
    import * as fs from "fs";
    
    class PDFParser {
        constructor();
        loadPDF(pdfPath: string): void;
        on(event: string, callback: (data: any) => void): void;
        static createContentStream(jsonObj: any): Readable;
        static createOutputStream(outputPath: any, resolve: any, reject: any): fs.WriteStream;
    }

    export default PDFParser;
}