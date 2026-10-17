# ArtViSiON Studio integrations

The Studio includes both the Pro Converter workspace and the Portfolio Mockup Library. The existing editor and Converter integration are retained.

## Pro Converter

Open **Converter** from the Studio top bar, or choose PDF Converter, Vectorize, Remove Background, or Color Lab. The UI is in `converter.html`; the optional Python service and ICC profiles are in `converter-engine/`. GitHub Pages is static and cannot run Python. See `converter-engine/README.md` for local-engine setup and browser-only limits.

## Portfolio Mockup Library

Open **File → Portfolio Mockups · 174 SVG scenes** or choose the gallery from the Studio Home launcher. Search/filter the 174 source scenes, open a preview, download the original SVG, or click **Generate editable SVG in Studio**. Each click imports one selected SVG's supported paths as editable vector shapes on a new artboard; embedded bitmap elements are retained in a separate raster layer. The current artboard is preserved.

Keep `mockups.html`, `js/mockups-data.js`, and `assets/mockups/` beside the Studio entry point. The folder contains 174 mockups across 23 categories sourced from the [Vector Portfolio](https://rjsarkar83.github.io/vector-portfolio/); the separate portfolio template SVGs were not imported. The Electron package also includes these assets.

## Deploy to GitHub Pages

Upload the updated entry points and new/changed assets to the repository root, preserving relative paths. Keep `converter.html`, `mockups.html`, `js/mockups-data.js`, and all of `assets/mockups/`. GitHub Pages serves the browser app and gallery but cannot run the optional Python engine. This integration ZIP is a prepared local package; publishing still requires uploading/committing it to the GitHub repository.
