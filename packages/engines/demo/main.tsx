/// <reference path="./url.d.ts" />

import { ConsoleLogger, PdfDocumentObject, TaskBase } from '@unionpdf/models';
import { WebWorkerEngine } from '../src/index';
import webworker from 'url:./webworker';

async function readFile(file: File): Promise<ArrayBuffer> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (evt) => {
      resolve(reader.result as ArrayBuffer);
    };

    reader.readAsArrayBuffer(file);
  });
}

function logError(error: Error) {
  console.error(error);
}

async function run() {
  const engine = new WebWorkerEngine(new URL(webworker), new ConsoleLogger());

  engine.initialize();

  const inputElem = document.getElementById('pdf-file') as HTMLInputElement;
  const bookmarksElem = document.getElementById(
    'pdf-bookmarks'
  ) as HTMLParagraphElement;

  let currDoc: PdfDocumentObject | null = null;
  inputElem?.addEventListener('input', async (evt) => {
    const closeTask = currDoc
      ? engine.closeDocument(currDoc)
      : TaskBase.resolve(true);

    closeTask.wait(async () => {
      const file = (evt.target as HTMLInputElement).files?.[0];
      if (file) {
        const arrayBuffer = await readFile(file);
        const task = engine.openDocument(file.name, arrayBuffer);
        task.wait((doc) => {
          currDoc = doc;

          const task = engine.getBookmarks(doc);
          task.wait((bookmarks) => {
            console.log(bookmarks);
          }, logError);

          for (let i = 0; i < doc.pageCount; i++) {
            const page = doc.pages[i];

            const renderTask = engine.renderPage(doc, page, 1, 0);
            renderTask.wait((imageData) => {
              const canvasElem = document.createElement(
                'canvas'
              ) as HTMLCanvasElement;
              const rootElem = document.getElementById(
                'root'
              ) as HTMLDivElement;
              rootElem.appendChild(canvasElem);
              canvasElem.style.width = `${page.size.width}px`;
              canvasElem.style.height = `${page.size.height}px`;
              canvasElem.width = imageData.width;
              canvasElem.height = imageData.height;

              const ctx = canvasElem.getContext('2d');
              ctx?.putImageData(
                imageData,
                0,
                0,
                0,
                0,
                imageData.width,
                imageData.height
              );
            }, logError);

            const annotationsTask = engine.getPageAnnotations(doc, page, 1, 0);
            annotationsTask.wait((annotations) => {
              console.log(page.index, annotations);
            }, logError);
          }
        }, logError);
      }
    }, logError);
  });
}

window.addEventListener('DOMContentLoaded', run);
