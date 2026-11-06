export const HOST_STYLES = `
:host {
  box-sizing: border-box;
  min-width: 0;
  max-width: 100%;
}
*, *::before, *::after {
  box-sizing: border-box;
}
button, input, select, textarea {
  min-width: 0;
  max-width: 100%;
}
button {
  overflow-wrap: anywhere;
}
`;

export const PANEL_STYLES = `
${HOST_STYLES}
:host {
  overflow-wrap: anywhere;
}
table {
  width: 100%;
  table-layout: fixed;
}
`;
