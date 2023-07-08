### @unionpdf/engines

This package defines engines used for parsing PDF files. Right now, we only provide one PDF engine that is based on PDFium and a mock of engine for testing purpose.

#### Install

```bash
npm install @unionpdf/engines
```

#### Usage

```typescript
import { createPdfiumModule, PdfiumEngine } from '@unionpdf/engines';

// implement loadWasmBinary to load pdifum wasm file
const wasmBinary = await loadWasmBinary();
const wasmModule = await createPdfiumModule({ wasmBinary });
const engine = new PdfiumEngine(wasmModule, new ConsoleLogger());

engine.initialize();

// implement fetchFile to load pdf file
const file = await loadFile();
const task = engine.openDocument(file);
task.wait(
  (doc) => {
    console.log('opened: ', doc);

    engine.closeDocument(doc);
  },
  (err) => {
    console.log('failed: ', err);
  }
);
```
