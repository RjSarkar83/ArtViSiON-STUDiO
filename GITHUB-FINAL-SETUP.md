# ArtViSiON Studio — browser-only update

## GitHub Pages upload (Hinglish)
1. ZIP extract karein. Andar ke files/folders existing ArtViSiON-STUDiO repository ke root mein upload/replace karein. ZIP ko as-is upload karne se site update nahi hogi.
2. `index.html`, `converter.html`, `mockups.html`, `assets/` root mein rakhein; extra enclosing folder na banayein.
3. Commit changes. GitHub Settings → Pages → Deploy from branch → main → /(root) → Save. Agar branch alag hai to apni publishing branch chunein.
4. Deployment complete hone par site hard refresh karein (Ctrl+Shift+R).
5. Welcome popup ke Converter section se tool kholein. Converter ab same repository ki `converter.html` use karta hai, external Converter repository nahi. External Converter website is ZIP se automatically update nahi hogi.

## Changes in this package
- Existing Studio, mockup library and assets retained.
- Four welcome-popup Converter shortcuts; bundled converter and matching tab selection.
- Vector: actual traced SVG paths, palette 8/16/32/64, fine/balanced/simple curve tolerance, speckle control, optional near-white fill removal, PNG-alpha-preserving decoding and processing. Removed automatic color blur to protect small edges. Existing ImageTracer engine retained; not a proprietary AI reconstruction engine.
- PDF: lossless PNG default or JPEG with white matte, A4/Letter/native dimensions, margins, automatic landscape for wide images. Original physical size retained when huge images are downsampled. Raster conversion maximum dimension 8000 px. Corrected error handler scope.
- Background: existing IMG.LY model pipeline with GPU→CPU fallback retained; failed module loads can be retried. Added full-resolution erase/restore correction canvas with interpolated brush strokes, bounded undo, reset, checker/white/black preview and separate edited-PNG download.
- Color Lab retained.

## Important limits
- Free, static browser tools: no server installation or API key required. Network required for the third-party AI module and model files. Model downloads can be large. Modern Chrome/Edge recommended.
- Background removal is not guaranteed perfect. Fine hair, glass, shadows and low contrast require manual corrections. Brush is a hard round brush, not an AI hair-refinement brush. The original download and edited download are intentionally separate.
- Photo tracing creates stylised vector shapes, not lossless photo reconstruction. Preserve-transparency and remove-white options should be inspected before production. White removal can remove legitimate white design details. Very large complex traces can temporarily block the browser.
- Raster PDF outputs are RGB, not PDF/X/ICC-CMYK. SVG input is rasterised for PDF. Native PDF extraction/DXF retain their original geometry and bypass raster page settings. TIFF multi-pages supported by existing engine. PSD exports merged composite only.
- Full native CDR/AI/EPS interpretation is not possible in this static build; only supported embedded PDFs/previews can be extracted. A low-resolution preview does not become a full vector document.
- Existing optional local-engine controls are retained for compatibility, but not required or enabled by this update. They are not part of the tested free-browser workflow.
- This is an updated downloadable source package, not a live GitHub deployment.

## Validation performed
Automated headless Chromium smoke tests:
- Transparent synthetic PNG → downloadable SVG containing paths, not an embedded image.
- Synthetic PNG → downloadable A4 PDF.
- Invalid PSD error flow without uncaught page errors.
- Welcome popup → bundled converter → correct Vectorize tab.
- Manual mask erase changes alpha to zero; Undo restores alpha.
No uncaught page errors in tested Studio/PDF/vector workflow.
AI model download/inference and real-world hair/product quality have NOT been end-to-end validated in this environment. Color Lab, all format variants and all existing Studio functions were not regression-tested.

## Third-party licensing
Retains existing upstream code and notices. ImageTracer and the existing PDF/image libraries remain their respective authors' work. IMG.LY background-removal has its own licence conditions (including AGPL terms for the open-source distribution); review upstream licences before commercial distribution. This update does not grant new rights over third-party code/assets.
