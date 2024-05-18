const fs = require('fs');
const path = require('path');
const { functions } = require('./exported-functions');

const extraFunctions = ['malloc', 'free'];

const funcNames = Object.keys(functions);

const unsupportedFuncNames = [
  'PDFium_OpenFileWriter',
  'PDFium_CloseFileWriter',
  'PDFium_GetFileWriterSize',
  'PDFium_GetFileWriterData',
  'PDFium_OpenFormFillInfo',
  'PDFium_CloseFormFillInfo',
  'PDFium_InitFormFillEnvironment',
  'PDFium_ExitFormFillEnvironment',
  'PDFium_SaveAsCopy',
];

const names = [...extraFunctions, ...funcNames]
  .filter((funName) => {
    return unsupportedFuncNames.indexOf(funName) === -1;
  })
  .map((funcName) => {
    return '_' + funcName;
  })
  .join(',');
fs.writeFileSync(
  path.join(__dirname, '../build/exported-functions.txt'),
  names,
  { encoding: 'utf-8' },
);

const defintion = `
export const functions = {
${funcNames
  .map((funcName) => {
    const args = functions[funcName][0];
    const ret = functions[funcName][1];
    return `  ${funcName}: [${JSON.stringify(args)} as const, ${ret === null ? 'null' : "'" + ret + "'"}] as const`;
  })
  .join(',\n')}
}
`;

fs.writeFileSync(path.join(__dirname, '../src/functions.ts'), defintion, {
  encoding: 'utf-8',
});
