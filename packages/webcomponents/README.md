# @unionpdf/webcomponents

Framework-agnostic Web Components for rendering and editing PDF files in the browser. This package provides the same features as `@unionpdf/react` but uses native Custom Elements, making it usable with any framework or vanilla JavaScript.

## Features

- **PDF Viewing** – Render PDF pages with canvas, text selection, and annotations
- **Navigation** – Page navigation, bookmarks, thumbnails
- **Search** – Full-text search with match flags
- **Metadata** – View PDF metadata
- **Attachments** – List and download PDF attachments
- **Signatures** – View PDF signatures
- **Editor** – Edit annotations, stamps, and forms
- **Toolbar** – Configurable toolbar with plugin toggle buttons
- **Download / Print** – Save and print PDF documents
- **Theming** – CSS custom properties for styling
- **No framework dependency** – Works with vanilla JS, React, Vue, Angular, Svelte, etc.

## Installation

```bash
npm install @unionpdf/webcomponents @unionpdf/models @unionpdf/engines
```

## Usage

```html
<script type="module">
  import '@unionpdf/webcomponents';
  import { PdfiumEngine } from '@unionpdf/engines';

  const engine = new PdfiumEngine(/* ... */);
  const app = document.querySelector('pdf-application');
  app.engine = engine;
  app.file = { name: 'sample.pdf', content: arrayBuffer };
  app.password = '';
</script>

<pdf-application>
  <pdf-toolbar slot="toolbar"></pdf-toolbar>
  <pdf-pages slot="content">
    <template data-layer="canvas"></template>
    <template data-layer="text"></template>
    <template data-layer="annotations"></template>
  </pdf-pages>
  <pdf-thumbnails slot="sidebar"></pdf-thumbnails>
  <pdf-bookmarks slot="sidebar"></pdf-bookmarks>
  <pdf-search slot="sidebar"></pdf-search>
  <pdf-metadata slot="sidebar"></pdf-metadata>
  <pdf-attachments slot="sidebar"></pdf-attachments>
  <pdf-signatures slot="sidebar"></pdf-signatures>
  <pdf-downloader></pdf-downloader>
  <pdf-printer></pdf-printer>
</pdf-application>
```

## Responsive layout

Components adapt to their container width, including narrow embedded viewers:
toolbar side controls collapse into Tools and Actions dropdowns at container
widths up to 48rem, leaving navigation, zoom, and rotation visible. Wider toolbars
show their controls inline. Dropdowns support Escape and outside-click dismissal;
customize their labels with the optional `toolbarTools` and `toolbarActions`
strings. Editor controls wrap, table values wrap, thumbnail columns shrink,
and download/print dialogs stay within the viewport with scrollable content.
PDF pages keep their selected zoom and scroll inside `<pdf-pages>` rather than
stretching the surrounding layout.

Set a width and height on your viewer layout. Flex/grid wrappers around
`<pdf-pages>` should use `min-width: 0` and `min-height: 0`. Sidebar placement is
controlled by the host application; the demo stacks it above the pages on
screens up to 600px wide.

## Custom Elements

| Element             | Description                                                          |
| ------------------- | -------------------------------------------------------------------- |
| `<pdf-application>` | Root container, provides engine, document, and configuration context |
| `<pdf-pages>`       | Renders PDF pages with configurable layers                           |
| `<pdf-toolbar>`     | Toolbar with plugin toggles, navigation, and file actions            |
| `<pdf-thumbnails>`  | Page thumbnail panel                                                 |
| `<pdf-bookmarks>`   | Bookmark tree panel                                                  |
| `<pdf-search>`      | Search panel                                                         |
| `<pdf-metadata>`    | Metadata panel                                                       |
| `<pdf-attachments>` | Attachments panel                                                    |
| `<pdf-signatures>`  | Signatures panel                                                     |
| `<pdf-downloader>`  | Download dialog                                                      |
| `<pdf-printer>`     | Print dialog                                                         |
| `<pdf-editor>`      | Editor panel                                                         |

## Testing

Run commands from the repository root:

```bash
npm run test --workspace=@unionpdf/webcomponents
npm run e2e --workspace=@unionpdf/webcomponents
```

Jest discovers unit tests under `src`; Playwright runs browser tests under
`tests`. The unit test command succeeds when no unit tests exist.

## License

MIT
