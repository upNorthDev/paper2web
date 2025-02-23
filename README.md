# paper2web [WIP]

A simple Node.js package for converting PDF documents into structured HTML without losing formatting.

## Features

- Extracts text content from PDFs.
- Preserves basic text formatting (bold, italic).
- Converts each page into structured HTML.

# Installation

Install via npm:

```sh
npm install paper2web
```

## Dependencies

This package relies on the following libraries:

- [`pdfjs-dist`](https://github.com/mozilla/pdf.js)
- [`canvas`](https://github.com/Automattic/node-canvas) – For usage of `pdfjs-dist`
- [`jsdom`](https://github.com/jsdom/jsdom) – To simulate a browser-like environment for `pdfjs-dist`.

## Acknowledgments

This project uses [PDF.js](https://mozilla.github.io/pdf.js/) (`pdfjs-dist`) by Mozilla to extract data from PDF files for further processing.


# Usage

```js
import { convertPdfToHtml } from "paper2web";

const pdfPath = "path/to/input.pdf";

convertPdfToHtml(pdfPath)
  .then(() => console.log("Conversion successful!"))
  .catch((error) => console.error("Error:", error))
```

# License

This project is licensed under the MIT License

# Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request!

# Future of this package

- Add support for images
- Add support for tables
- Add cli support

# Author
Developed by Malte Harms
```vbnet
Let me know if you need any changes! 🚀
```
