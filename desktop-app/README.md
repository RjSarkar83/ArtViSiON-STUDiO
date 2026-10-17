# ArtViSiON STUDiO — Desktop App (Electron)

This folder contains the Electron wrapper for the Studio, integrated Pro Converter, and 174-scene Portfolio Mockup Library. The mockup SVGs are kept only once in the repository at `../assets/mockups/`; build/start scripts copy them into the Electron app before launch/package, avoiding duplicate 42 MB asset trees in the source ZIP.

## Contents

| File / folder | Purpose |
|---|---|
| `app.html` | Studio editor, Converter launcher, and Portfolio Mockup Library launcher |
| `converter.html` | Browser-based Converter Suite |
| `mockups.html` | Searchable, filterable gallery page |
| `scripts/sync-portfolio-mockups.js` | Copies the shared gallery manifest and SVG assets into this app before run/build |
| `main.js` | Electron window launcher and restricted local SVG reader |
| `preload.js` | Exposes the safe mockup-file read bridge to the Studio window |
| `package.json` | Electron build config (NSIS installer + portable `.exe`) |
| `build.bat` | Install dependencies and build the Windows app |
| `run.bat` | Run the app in development mode |

## Build / run

Install Node.js LTS, then in this folder run:

```bash
npm install
npm start       # syncs gallery assets, then runs the app
npm run dist    # syncs gallery assets, then builds installer + portable app
```

Or double-click `build.bat` / `run.bat` on Windows. The first build downloads Electron dependencies and requires internet access. `npm start` and `npm run dist` run the corresponding asset-sync step automatically; when launching Electron by another method, run `node scripts/sync-portfolio-mockups.js` first.

## Mockup library

The Studio's **File → Portfolio Mockups · 174 SVG scenes** opens the local gallery. Click **Generate editable SVG in Studio** to import one selected mockup per click as editable vector paths on a new artboard; embedded bitmaps are retained on a separate raster layer. **Download original SVG** keeps the source. Shared files are `../mockups.html`, `../js/mockups-data.js`, and `../assets/mockups/`.

## Converter notes

The browser Converter UI is bundled in `converter.html`. The optional Python print engine is in the project root's `converter-engine/`; it is not required to browse or edit, and must be started separately for its native/ICC features.

## Existing build caveats

- The packaged desktop app includes the full-size SVG library and is consequently larger than the editor alone.
- Unsigned Windows executables can trigger SmartScreen or antivirus warnings.
- macOS/Linux Electron targets can be added by changing the `build` targets in `package.json`.
