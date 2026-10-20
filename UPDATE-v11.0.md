# ArtViSiON STUDiO — v11.0 “Clip Studio × Procreate” (21 Oct 2026)

Ye update purane v10.3 build ke **upar** inject kiya gaya hai. Sirf `index.html` badla hai —
converter.html, mockups.html, assets/, js/, svg/ sab waise hi hain, kuch delete nahi hua.

---

## 1. Brush Studio (Procreate Brush Studio + CSP sub-tool)

Brush (B) ya Eraser (E) select karte hi **canvas ke neeche brush shelf** aa jati hai
(13 built-in brushes) aur Properties panel me **⚙ Brush Studio** khulta hai:

| Setting | Kya karti hai |
| --- | --- |
| Size / Opacity / Softness | base brush |
| **Stabilizer** | hand-shake correction 0–100 % (CSP 手ブレ補正 / Procreate StreamLine) |
| **Pressure → Size** | pen pressure se stroke patla/mota |
| **Pressure → Opacity** | pressure se alpha |
| **Taper** | stroke ke dono ends sharp |
| **Jitter** | dab ki position random offset |
| **Scatter** | stroke ke perpendicular dab scatter |
| **Grain** | paper texture (destination-out grain) |
| **Blend** | brush ka apna blend mode (Normal / Multiply / Screen / Overlay …) |
| **QuickShape** | stroke end par hold → shape snap |

Built-in: G-Pen · Mapping Pen · Ink Brush · Textured Pen · Pencil · Airbrush · Marker ·
Watercolor · Charcoal · Tone · Soft Eraser · Hard Eraser · Kneaded Eraser.

- Dials live hain: slider hilate hi preview canvas update hota hai.
- **Save as preset** se apni brush ban jati hai (naam + saari settings), browser
  `localStorage` me rehti hai; **Delete preset** sirf custom presets par chalta hai.
- Mouse par pressure = 1.0 maana jata hai (pen/tablet par asli pressure).

## 2. QuickShape (Procreate)

Stroke khatam karke **pen ko ~0.4 s tak still rakho** (release kiye bina):
- seedhi line → **Line**
- band loop jo gol hai → **Circle / Ellipse**
- band loop jo chaukor hai → **Rectangle**

Badge “◇ QuickShape · Circle” dikhta hai; release = commit. Properties chip se ON/OFF.
Pen tool jaisa jitter nahi — shape perfect ho jata hai.

## 3. ColorDrop (Procreate)

Colors panel ke kisi bhi swatch (primary, secondary ya palette) ko **canvas par drag** karke
chhodo → us region me fill ho jata hai. Selection ho to poora selection bhar jata hai.
Bucket tool bhi **Reference layers (◎)** ko dekh kar fill karta hai — line-art alag layer par ho
to bhi fill sahi jagah rukta hai.

> Drag 7 px se kam ho to normal click (color select) chalta hai — dono kaam karte hain.

## 4. Layer roles — α Alpha Lock + ◎ Reference Layer

Layer row me do naye chips:

- **α Alpha Lock** — sirf layer ke existing pixels par paint/erase hota hai (Procreate).
- **◎ Reference Layer** — bucket / ColorDrop is layer ko "reference" maanta hai
  (CSP reference layer). Ek se zyada reference layers ho to wo merge karke reference bante hain.

Dono flags `.artvision` project, artboard save, autosave aur undo/history me persist hote hain.

## 5. Vector Eraser (CSP)

Eraser properties → **Vector erase** ON → vector layer par erase karne se strokes
**uske intersection par kaट jaate hain** — naye nodes banate hain, pixels nahi bante.
Rect / ellipse / polygon bhi path ban jaate hain (CSP jaisa behaviour).
Vector layer na mile to normal raster erase fallback chalta hai.

## 6. Drawing Guides (CSP rulers + Procreate drawing guide)

Naya **Guide tool (U)** ya **View ▸ Drawing Guides**:
- Grid · Isometric · **1-point perspective** · **2-point perspective** · Radial
- V1 / V2 aur horizon canvas par **drag** karo (V1/V2 badges)
- **Snap stroke** ON → brush aur line tool strokes ruler par lock ho jaate hain
  (1-pt: V1 + vertical/horizontal; 2-pt: V1/V2 + vertical; iso: 30°/90°; grid: grid points)
- Opacity aur grid size adjustable; guides canvas overlay hain — export me nahi aate.

## 7. Lasso + selection ops

- **Lasso (Q)** — freehand selection; Shift = add, Alt = subtract.
- **Select menu** → Feather… · Expand… · Contract… (photo blend aur manga ke liye).

## 8. Filter menu — manga / Procreate filters

| Filter | Kya karta hai |
| --- | --- |
| **Screentone / Halftone** | dots / lines / cross pattern; dot size luminance se (dark = bada dot); pitch + angle + ink colour; new layer ya merge |
| **Gradient Map** | luminance → 4-stop gradient (Sunset / Teal / Neon / Mono / Sepia / Duotone presets) |
| **Liquify** | push · twirl · pinch · bloat — live preview, Apply par full-resolution warp |
| **Focus Lines** | manga speed lines (count / length / thickness / inner gap / colour) |

Sab filters selection ke andar respect karte hain aur undo me `Screentone`, `Gradient Map`,
`Liquify`, `Focus Lines` naam se aate hain.

## 9. Comic panels + Flip canvas

- **File ▸ Comic Panel Template…** — 6 layouts (Grid 2×2, Grid 3×2, Strip 4, Manga 5-panel,
  Splash + 2, Cinema 3 rows) — margin / gutter / border / fill set karke ek click me
  **naya vector layer** with white panels + black borders.
- **Image ▸ Flip Canvas Horizontal / Vertical** — raster + vector + guides sab mirror hote hain.
- **Layer ▸ Alpha Lock / Reference Layer (toggle)** menu shortcuts bhi hain.

## 10. Chhote fixes

- Toasts ab max 3 (pehle 4) — screen bharne nahi deti.
- Brush stroke undo label “Brush” / “Eraser” (pehle function name aa jata tha).
- Eraser par bhi QuickShape/brush shelf ka state sahi rehta hai.
- Persistence: `alphaLock` / `ref` har save path (project, autosave, artboards, history) me.

---

## Upload / deploy (GitHub Pages)

1. Is folder ka `index.html` apne repo ke root me **replace** karo (baaki files same rakho).
2. Commit → push (ya GitHub web UI se “Upload files”).
3. GitHub → Settings ▸ Pages ▸ Deploy from branch ▸ main ▸ /(root).
4. Live site par **Ctrl+Shift+R** (hard refresh) — purana `index.html` cache me ho sakta hai.

Test checklist (jo is build me headless Chromium se verify hua):
- Brush stroke + undo + redo, brush shelf, Brush Studio preview, preset apply.
- QuickShape circle detect + commit.
- ColorDrop drag fill, lasso + expand, perspective guide snap.
- Alpha Lock painting (square ke bahar 0 px), vector eraser (line 2 subpaths, rect 3),
  comic panels (5 shapes), screentone + gradient map + focus lines, liquify dialog.
- Alpha lock undo/redo + project JSON round-trip.
- Phone (390×844) aur tablet (900×1000) layouts — shelf bottom rail ke upar, koi overlap nahi.
