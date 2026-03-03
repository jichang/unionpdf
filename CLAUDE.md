# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

UnionPDF is a monorepo of npm packages for displaying and editing PDF files in the browser, powered by PDFium compiled to WebAssembly.

## Commands

```bash
npm install              # Install dependencies
npm run build            # Build all packages
npm run typecheck        # Type check all packages
npm run test             # Run all tests (Jest)
npm run format           # Format with Prettier
npm run lint             # Lint with ESLint (auto-fix)
npm run e2e              # Run Playwright e2e tests (react package only)
```

### Per-package commands

```bash
npm run test --workspace=packages/models     # Test a single package
npm run build --workspace=packages/react     # Build a single package
npm run typecheck --workspace=packages/engines
```

### Test runner

Jest with ts-jest. Tests use `*.test.ts` / `*.test.tsx` naming. React tests use `@testing-library/react` and `jest-dom`.

## Architecture

### Package dependency graph

```
@unionpdf/pdfium  →  @unionpdf/engines  →  @unionpdf/react
                                          →  @unionpdf/webcomponents
       @unionpdf/models (shared by all)
```

### Packages

- **`@unionpdf/models`** — Core data types and interfaces. Defines `PdfEngine` interface (`src/pdf.ts:1321`), geometry primitives, PDF document/page/annotation object types, and task utilities. All other packages depend on this.
- **`@unionpdf/pdfium`** — PDFium WASM bindings. Wraps the Emscripten-compiled `pdfium.wasm` binary and exposes typed C function wrappers via `cwrap`. The `init()` function bootstraps the WASM module.
- **`@unionpdf/engines`** — PDF engine implementations. Contains `PdfiumEngine` (implements `PdfEngine` using the pdfium bindings), a WebWorker runner for off-main-thread execution, and a mock engine for testing.
- **`@unionpdf/react`** — React 19 components. Organized as:
  - `core/` — Context providers (engine, document, application, theme, navigation, intersection observer)
  - `components/` — UI: annotations, editor, page layers, plugins (search, bookmarks, thumbnails, attachments, signatures, metadata, toolbar)
  - `adapters/` — Platform adapters and UI string localization
  - `hooks/` — Shared React hooks
- **`@unionpdf/webcomponents`** — Framework-agnostic Web Components wrapping the same engine. Custom elements: `pdf-application`, `pdf-pages`, `pdf-toolbar`, `pdf-thumbnails`, `pdf-bookmarks`, `pdf-search`, `pdf-editor`, etc.

### Key design patterns

- **`PdfEngine` interface** (`models/src/pdf.ts`) is the central abstraction. All rendering/parsing goes through it, enabling swappable backends (pdfium, mock, future engines).
- **WebWorker isolation** — `engines/src/webworker/` provides a message-passing runner to execute the engine in a worker thread, keeping the main thread responsive.
- **Context-driven React architecture** — The react package uses deeply nested React contexts (engine, document, application config, theme, decorations) rather than prop drilling.

## Build

- Parcel is used for bundling all packages (CJS + ESM dual output with generated `.d.ts`).
- Each package outputs to `dist/cjs/`, `dist/esm/`, and `dist/types/`.
- TypeScript with strict mode across all packages.

## Search Exclusions

Do not search in: `out/`, `.bsp/`, `.metals/`, `.idea/`, `dist/`, `.parcel-cache/`, `node_modules/`.
