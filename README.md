<div align="center">

# ◆ ArtViSiON STUDiO

**Hybrid Vector + Bitmap + Animation Editor · Real CorelDRAW (.cdr/.cdt) Import · Pro Converter · 174 Portfolio Mockups**

*Browser-based · local-first · GitHub Pages-ready · MIT*

</div>

ArtViSiON Studio combines a vector/bitmap design editor with an integrated Pro Converter and the searchable **Vector Portfolio mockup library**. The portfolio integration includes 174 original SVG scenes across 23 categories. The editor's unrelated tools and the Converter integration remain included.

## 🟠 v10.0 — Real CorelDRAW engine

`.cdr` and `.cdt` files now open as **editable artwork**, not a preview picture. The parser reads CorelDRAW's own file format directly in the browser:

| Container | Covers |
| --- | --- |
| RIFF (`RIFF…CDR*`) | CorelDRAW 3 – X3 |
| ZIP with `content/riffData.cdr` | X4 – X5 |
| ZIP with `content/root.dat` + `content/data/*.dat` | X6+ (ZIP packages) |
| OLE compound file (CFB) with `content/root.dat` | X6+ (CFB packages) |

What arrives on the artboard:

- **Rectangles** (with corner radius), **ellipses**, **5/7-point stars**, custom polygons, rounded rects and **Bezier paths** — real nodes you can edit with the node tool, not a traced bitmap.
- **Live text** with font family, size, colour and baseline preserved (still editable as text).
- **Fills**: solid RGB/CMYK/spot colours plus multi-stop linear/radial gradients.
- **Outlines**: colour, width, cap, join and dash pattern.
- **Embedded bitmaps** placed on their own raster layer, underneath the vectors.
- **Multi-page documents** become one artboard per page.
- A summary toast after import: object counts, CDR version, container, page size.

CorelDRAW effects that have no Studio equivalent (blends, contours, envelopes, lenses, mesh fills, artistic-media strokes) are approximated or skipped — the underlying shapes still import. Sibling AI/EPS/PDF importers also received a `T_vec` repair in this build, so they no longer throw on import.

## 🖼 Portfolio Mockup Library

Open **File → Portfolio Mockups · 174 SVG scenes** or choose **Portfolio Mockups · 174** from the Home launcher.

- Search the mockups by name, category, or scene details; filter by category and browse in portfolio order or alphabetically.
- Open a large preview, download the **original SVG**, or generate one selected mockup at a time as editable vector shapes on a new Studio artboard. Embedded bitmap elements are preserved on a separate raster layer.
- Original files are in `assets/mockups/` and the scene/category manifest is `js/mockups-data.js`.
- The gallery is `mockups.html`. Keep it, the manifest, and the entire `assets/mockups/` folder alongside the Studio entry point when deploying.

These assets were brought over from [ArtViSiON Vector Portfolio](https://rjsarkar83.github.io/vector-portfolio/). The six separate portfolio template SVGs were not imported.

## 🧰 Pro Converter Suite

- **PDF Converter** — convert supported artwork and design formats to PDF.
- **Vectorize Art** — trace raster images into SVG.
- **Background Remove** — browser-side cutout to transparent PNG.
- **Color Lab** — RGB/HEX tools, palette sampling, soft proof, and optional ICC/CMYK engine.

Open **Converter** in the Studio top bar, choose a tool, and return with **← Studio**. `converter.html` must remain beside the Studio entry point. Standard browser tools run in the page; the background-removal model is fetched and cached on first use. The optional `converter-engine/` contains local Python print/conversion tools. GitHub Pages is static and cannot run that Python service.

See [`CONVERTER-INTEGRATION.md`](CONVERTER-INTEGRATION.md) and [`converter-engine/README.md`](converter-engine/README.md) for setup and limitations.

## ✨ Studio features

- **Vector and bitmap editing** — pen/node tools, shapes, text-on-path, brush, smudge, clone, selections, and more.
- **Layers and artboards** — groups, blend modes, opacity, masks, clipping masks, multiple boards, and per-board history.
- **Filters and color tools** — live filter gallery, curves, color adjustments, guides, snapping, and smart alignment.
- **Animation** — timeline, onion-skin, and GIF/WebM/sprite-sheet export.
- **Import/export** — **CorelDRAW CDR/CDT**, PNG, JPG, WebP, GIF, BMP, SVG, PSD, PDF, AI, EPS/PS, DXF, TIFF, and `.chitra` project files (support varies by format).
- **Workspace** — size presets, command palette, focus mode, autosave, and reusable personal library.

## 🚀 Quick start

### Web / GitHub Pages

1. Download and extract the repository ZIP, preserving its folder structure.
2. Use the deployed GitHub Pages URL or serve the repository root with a local static server (recommended; some browsers block SVG fetch from a direct `file://` page).
3. For the mockup library, keep `mockups.html`, `js/mockups-data.js`, and all files in `assets/mockups/` in their original relative paths.
4. For the Converter, keep `converter.html` and `converter-engine/` as provided.

The alternate entry points `ArtViSiON-Studio.html` and `desktop-app/app.html` include the same Studio features. GitHub Pages can host the browser app and mockups, but it cannot host the optional Python engine.

### Replace the old GitHub Pages version

The ZIP is a source package; uploading the ZIP file itself will not deploy it. Extract it and replace the matching files/folders in the Studio repository's active Pages branch, preserving the root-relative paths. **Delete the old `svg/` directory, `Branding-Mockup-Guide.pdf`, and old mockup-only screenshots** from that repository; simply adding new files leaves the old assets there. Ensure the updated `index.html`, `converter.html`, `mockups.html`, `js/mockups-data.js`, and all 174 files under `assets/mockups/` are committed. Then wait for Pages to rebuild and hard-refresh the Studio URL. The separate `Converter` repository is not modified by this Studio ZIP.

### Desktop app (Electron)

The `desktop-app/` folder contains the Electron wrapper and the matching gallery assets. With Node.js LTS installed:

```bash
cd desktop-app
npm install
npm start       # development
npm run dist    # Windows installer + portable app
```

The Electron build includes `app.html`, `converter.html`, `mockups.html`, `js/mockups-data.js`, and `assets/mockups/`.

## 📁 Project map

```text
index.html                     GitHub Pages Studio entry point
ArtViSiON-Studio.html          Alternate Studio entry point
mockups.html                   Searchable 174-scene portfolio gallery
js/mockups-data.js             Gallery categories and scene manifest
assets/mockups/                Original portfolio SVGs (174 files)
converter.html                 Integrated, standalone Converter UI
converter-engine/              Optional local Python print/conversion service
desktop-app/                   Electron wrapper and packaged gallery assets
screenshots/                   Existing Studio screenshots
LICENSE                        MIT
```

## 🔒 Privacy and file notes

Studio editing and gallery preview rendering happen in the browser. Selecting **Generate editable SVG in Studio** imports the selected SVG's vector paths into a new artboard, one mockup per click. Embedded bitmap decorations are placed on their own raster layer. Use **Download original SVG** to keep the unchanged source file. Files are not uploaded by the gallery. Some Converter features fetch a model from their configured CDN on first use; optional native/ICC print workflows use the local Python engine.

## ⚠️ Known limits

- PSD export writes a flattened composite; use `.chitra` for editable Studio layers.
- GIF is limited to 256 colors by the format.
- CDR import converts geometry, text, fills, outlines and bitmaps (pattern/bitmap fills are skipped rather than approximated); exotic effects (blends, contours, lenses, mesh fills, envelopes) can't be reproduced exactly — export SVG/PDF from CorelDRAW if you need a pixel-identical result. Files that carry only a preview raster fall back to that image with a warning.
- Encrypted PDFs with a non-empty password and some uncommon legacy EPS/PostScript operators may not import.
- Review print output and color profiles before production.

## 📄 License

[MIT](LICENSE). The portfolio artwork remains distributed as SVG files in `assets/mockups/`; see the linked source portfolio for context and attribution.
