# paper2web [WIP]

A simple Node.js package for converting PDF documents into structured HTML without losing formatting.

## Features

- Extracts text content from PDFs.
- Preserves basic text formatting (bold, italic).
- Extract unordered lists to a HTML list
- Converts each page into structured HTML.

# Installation

Install via npm:

```sh
npm install paper2web
```

## Dependencies

This package relies on the following libraries:

- [`pdf2json`](https://github.com/modesty/pdf2json)
- [`nodejs`](https://nodejs.org/en) >= 22.14.0

## Acknowledgments

This project uses [pdf2json]([https://mozilla.github.io/pdf.js/](https://github.com/modesty/pdf2json)) (`pdf2json`) by modesty to extract data from PDF files for further processing.


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
- Add cli support

# Author
Developed by Malte Harms
```vbnet
Let me know if you need any changes! 🚀
```
