### @unionpdf/engines

This package defines engines used for parsing PDF files. Right now, we only provide one PDF engine that is based on PDFium and a mock of engine for testing purpose.

#### Install

```bash
npm install @unionpdf/engines
```

#### Usage

```typescript
import { createPdfiumModule, PdfiumEngine } from '@unionpdf/engines';

// implement loadWasm to load pdifum wasm file
const pdfiumWasm = loadWasm();
const response = await fetch(pdfiumWasm);
const wasmBinary = await response.arrayBuffer();
const wasmModule = await createPdfiumModule({ wasmBinary });
const engine = new PdfiumEngine(wasmModule);

// implement fetchFile to load pdf file
const file = await loadFile();
const task = engine.openDocument(file);
task.wait(
  (doc) => {
    console.log('opened: ', doc);
  },
  (err) => {
    console.log('failed: ', err);
  }
);
```
