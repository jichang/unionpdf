const fs = require('fs')
const path = require('path');
const { methods } = require('./exported-runtime-methods');

const names = methods.join(',');
fs.writeFileSync(path.join(__dirname, '../build/exported-runtime-methods.txt'), names, { encoding: 'utf-8' });

const defintion = `
/// <reference types="emscripten" />

export interface PdfiumRuntimeMethods {
${methods.map(func => {
  return `  ${func}: typeof ${func};`;
}).join('\n')}
}
`

fs.writeFileSync(path.join(__dirname, '../src/runtime.ts'), defintion, { encoding: 'utf-8' });
