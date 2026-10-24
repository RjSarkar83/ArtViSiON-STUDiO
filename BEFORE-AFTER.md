# ArtViSiON Studio — FIXES & BEFORE/AFTER

> Round 2: "saare tool aur function professional nahi hai / proper kaam nahi kar raha / system hang-lag kar raha hai."
> Round 3: "brush stroke continue kaha se kaha chal raha hai dikh nahi raha… chhodne ke baad hi dikhta hai."
> Har round me har tool alag-alag test kiya gaya, jo bug mile wo fix hue, aur lag ke asli source hataye gaye.

---

## 1. Is round me fix hua (bug → root cause → proof)

| # | Bug (jo aapko dikh raha tha) | Root cause | Fix | Proof |
|---|---|---|---|---|
| 1 | **Mockup library me 174 cards khaali dabbe** (broken image icon, kuch bhi nahi dikhta) | `assets/mockups/*.svg` repo/package me hi nahi the — `mockups.html` unhe fetch karta tha aur 404 aata tha | 174 original SVG wapas add kiye + grid ke liye **10 KB WebP thumbnails** banaye (`assets/mockups/thumbs/`, build script `tools/make-thumbs.py`) | 174/174 cards render, **0 broken, 0 404** (laptop + phone dono par) |
| 2 | **Lag / hang, khaas kar bade size ke artboard par** | (a) autosave har 30 s par *poora* document 2× JSON.stringify karta tha, change ho ya na ho, background tab me bhi; (b) canvas backing store 2.5× DPR tak jaata tha → 4K par 25 MP = ~400 MB canvas | (a) dirty-flag + hidden-tab skip + sirf ek pass + >9 MP doc par raster-stripped payload; (b) backing store par **9 MP ceiling** (memory-safe DPR) | 34 s idle window me **0 stringify call** (pehle ~2), edit karne par save hota hai; desktop boot **151 ms DCL / 216 ms load, 0 long task** |
| 3 | **Filters button bilkul dead** (click par kuch nahi) | dock handler me `openFilterDialog()` us scope me defined hi nahi tha aur handler me try/catch bhi nahi tha → chup-chaap error | global alias / `AV12.filterDialog` fallback + poore dock handler par try/catch + visible error toast | 63 targets ka automated audit: **0 dead** (pehle 1) |
| 4 | **Line / Pen / Pencil tool chunne par kuch nahi banta** | ye tools sirf stroke se draw karte hain, aur default me `strokeOn=false` — tool select karne par stroke on nahi hota tha | in 3 tools par select karte hi stroke auto-on | teeno tools drag par pixels badalte hain ✅ |
| 5 | **Dark mode me QR / Pro / Signage / Design-hub panels tuta hua** — safed card par safed text (contrast 1.0:1, kuch padha hi nahi jaata) | v23–v25 panels apni hardcoded light-only CSS laate hain | token-based dark overrides (surface, text, border, chips, tabs, inputs, badges) | 4 panels × light+dark: **0 low-contrast text node** |
| 6 | **Help dialog me headings invisible** (dark text on dark surface) | legacy `style="color:#fff"` inline light-mode me bhi lagu | inline light-colour rules ko light theme me token ink par map kiya | help/brand/guide dialogs readable |
| 7 | **Tool icons ka naam pata nahi chalta** (kuch modes me tooltip hide) | `.tip` bubble kai modes me `display:none`, `aria-label` bhi nahi tha | har tool par native `title` + `aria-label` (bubble hide ho to bhi naam mile) | 23/23 tools par label ✅ |
| 8 | **Chhote tap targets** (zoom −/+, ruler/grid/snap 24–28 px) | inline width/height legacy rules | 30 px (coarse pointer 40 px) floor | audit: **0 target < 28 px** |
| 9 | **Panel/modal footer glitch** | `insertBefore(head, bar.firstChild)` par node add fail ho sakta tha | safe append | verified |

**Kuch bhi remove nahi kiya** — 23 tools, 27 dock actions, saare menus, 5 export formats, converter ke 4 tools, 174 mockups, sab intact.


---

## 1b. Round 3 — brush stroke live preview (aapki latest report)

> "brush stroke continue kaha se kaha chal raha hai dikh nahi raha, brush ko khich ke chhodne ke baad hi dikhne lagta hai"

**Bug:** painting ke waqt stroke ek scratch canvas (`G.stroke.tmp`) me jata tha, par **composite canvas har frame par refresh hi nahi hota tha** —
`docDirty` sirf stroke ke *start* aur *end* par set hota tha, move par nahi. Isliye jab tak mouse release na ho, screen par kuch nahi dikhta tha.
(Measure kiya: poore drag me composite **1 baar** refresh ho raha tha, ab **har move par**.)

**Fix (2 parts):**
1. `v11StrokeMove()` / quick-shape redraw me `docDirty = true` → har dab par preview repaint.
2. Saath hi **fast stroke compositing**: stroke ke time poore stack ko dobara composite karne ke bajaye
   "layers below" + "layers above" ek baar cache hote hain (signature-check se invalid), phir har frame par sirf 4 blit.
   Non-normal blend (multiply/screen…) ke liye stroke pehle layer-copy me merge hota hai — isliye **preview = final** (pixel diff 0–1).
3. Bade artboard par stroke-end ka thumbnail redraw 40 ms baad chalta hai (ek ~100 ms hitch khatam).

**Measured (A4 300 dpi doc, 7 layers, 90-step stroke):**

| | Pehle (full recomposite per move) | Ab (cached stroke composite) |
|---|---|---|
| median frame | 17 ms | **17 ms** |
| p95 frame | 50 ms | **17 ms** |
| worst frame | 217 ms | 117–150 ms |
| long tasks per stroke | 35–90 | **6–15** |
| live stroke visible while dragging | ❌ nahi | ✅ haan |

**Verify bhi kiya:**
- Brush/eraser live preview: drag ke beech wale pixels stroke colour ke hain, aur release ke baad wahi colour rehta hai (diff ≤ 1).
- Layer ordering sahi: neeche wali layer par paint karo to upar wala vector shape dhak ke rakhta hai (mid-drag aur final dono me).
- Multiply blend + layer opacity wale case me preview aur commit identical (diff 0–1).
- Undo ke baad pixel wapas, 23 tools + 34 dock/top/tab actions + export + mockups + converter + 6 viewports: sab pass, 0 page error.

---

## 1c. Round 4 — brush ke saare artistic presets (engine + presets dono update)

> "brush ke saare artistic presets update karo"

**Pehle kya galat tha**

1. Engine me har dab bas ek gol stamp tha — sirf **size / softness / opacity** farak dikhata tha. Isliye G-Pen, Pencil, Charcoal, Marker, Watercolour sab lagbhag ek jaise dikhte the (bas mota-patra).
2. `jitter`, `scatter`, `grain`, `taper` **sirf stroke chhodne par** lagte the (`v11StampPath`). Yaani jab tak drag chal raha tha, stroke plain round brush jaisa dikhta tha, aur **release karte hi texture aa jaata tha** (dikhne wala pop).
3. Chunki dab hamesha sprite se aata tha, paper tooth / bristle / wet edge / chisel tip jaisi koi cheez hi na thi.

**Naya engine (v11.2) — kya add hua (kuch hataya nahi)**

| Naya control | Kya karta hai | Kis preset me |
|---|---|---|
| **Surface** | `solid` / `dry` (paper gap) / `wet` (bleed rim) / `tone` (screentone dots) | sab (per-preset) |
| **Paper texture per-dab** | 3-octave noise field se har dab ka alpha gate hota hai → asli tooth, blob nahi | pencil, charcoal, textured, tone, kneaded |
| **Bristle split** | ek dab 3–5 baal-dabs me tootta hai, side wisps | charcoal, pencil, textured, kneaded |
| **Wet edge** | dab ke kinare par darker bleed rim | watercolour, ink, marker |
| **Chisel (streak + angle)** | dab ellipse ban jaata hai fixed angle par | marker |
| **Colour jitter** | stroke ke andar halka shade variation | watercolour, charcoal, pencil, ink |
| **Flow** | per-dab paint density (opacity se alag) | sab |
| **Spacing** | per-preset dab spacing (pen tight, airbrush loose) | sab |

**Live preview ab = committed stroke (measured)**

Live aur release dono ab **same seed + same rng budget + same spacing** se bante hain, isliye dab positions bilkul identical hote hain — sirf tail ka taper release par add hota hai.

| Preset | drag ke dauraan paint dikha? | live vs final diff (pixels > 24) |
|---|---|---|
| G-Pen | ✅ | 0.02% |
| Mapping Pen | ✅ | 0.00% |
| Ink Brush | ✅ | 0.27% |
| Textured Pen | ✅ | 0.01% |
| Pencil | ✅ | 0.00% |
| Charcoal | ✅ | 0.45% |
| Tone Brush | ✅ | 0.03% |
| Airbrush | ✅ | 0.00% |
| Marker | ✅ | 0.00% |
| Watercolour | ✅ | 0.18% |

(bache hue diff sirf stroke ke tapered tail par hain — wahi to taper ka kaam hai.)

**Presets jo re-tune hue (naam/emoji/ids wahi — purane saved presets tootenge nahi)**

| Preset | Pehle | Ab |
|---|---|---|
| G-Pen / Mapping Pen | plain round line | tight spacing, in/out taper, continuous hairline (tail par dash nahi) |
| Ink Brush | flat stroke | flow 72 + soft edge + wet rim |
| Textured Pen | solid, grain sirf end par | dry surface, paper gaps, bristle 40 |
| Pencil | thick stroke w/ end grain | 9px dry tooth, bristle 46, shade jitter |
| Charcoal | dark blob | dry 80% tooth, bristle 45, flow 55 → rough grainy smudge |
| Tone Brush | solid band | **screentone dots** (halftone), spacing 0.22 |
| Airbrush | solid soft band | flow 7 + spacing 0.10 → halka diffuse spray |
| Marker | soft band | **chisel tip 55% @ −35°** + wet edge + multiply |
| Watercolour | dark blob | wet surface, flow 14, wet rim, colour jitter 30 → wash |

**Brush Studio UI me naye controls** (sab live kaam karte hain, preset ke saath save hote hain)
`Flow · Spacing · Surface (Solid/Dry media/Wet/Screentone) · Texture scale · Bristle split · Wet edge · Chisel streak · Tip angle · Colour jitter`
— properties panel me bhi **Flow** slider aa gaya, aur Studio ka info line surface dikhata hai.

**Verify (asli mouse drag se, screenshot se nahi)**
- 10/10 paint presets canvas par ink chhodte hain, sabka pixel alag.
- 3/3 erasers erase karte hain (kneaded partial — jaisa hona chahiye), undo se pixel wapas.
- QuickShape (jo engine se hi banta hai) — line/rect/circle ab bhi perfect.
- Brush Studio preview canvas par stroke render hota hai (3,003 ink pixels), surface/flow UI se badalte hain, localStorage me naye fields save hote hain.
- Perf A/B (A4 300 dpi, 7 layers, same probe, fresh page): gpen 12.6 vs 14.2 ms median · charcoal 12.6 vs 15.8 · water 14.7 vs 13.2 · airbrush 13.6 vs 12.3 — matlab **barabar**, artistic gain ke saath. Naya dab path numeric sprite-cache + shade cache se optimised hai.
- 10/10 app regression: 23/23 tools, 10+3 brush shelf, export PNG, 174 mockups 0 broken, converter, 4 viewports, **0 page error, 0 404**.
- Bonus fix: Filters dialog band karne ke 60 ms andar deferred preview chal jaata tha → `Cannot read properties of null` error; ab guard laga hai.

---

## 1d. Round 5 — Signage & Branding Studio v26 (in-shop + outdoor, material-wise output)

> "signage update all ratio for inshop branding and signage design — branding ye dono type ke ratio file ke design alag-alag hote hai, aur sabhi ratio ko nonlit / backlit flex, fabric, vinyl, canvas print ke hisab se CMYK me PDF, TIF ya JPG banega; ACP, Acrylic Sheet, MDF, Wood, Metal aur other file CNC Router cutting PDF, DXF banenge; coming soon 3D DWG and SVG file."

**Pehle kya tha:** ek hi "Signage" panel — 7 ratio (1:1 … 10:1), ek hi layout har ratio par, aur export sirf CMYK PDF + JPG + specs. Material ka koi concept nahi tha, CNG/DXF nahi tha.

**Ab do alag design families (ratio set bhi alag, layout bhi alag)**

| | In-shop branding | Outdoor signage |
|---|---|---|
| Ratio set | 1:1, 5:7, 2:3, 4:5, 3:4, 9:16, 2:1, 3:1, 16:9, 4:1, 6:1, 1:2 | 1:1, 1:2, 2:3, 2:1, 3:1, 4:1, 5:1, 8:1, 10:1, 3:4, 4:5 |
| Sizes | 15 (counter sticker → ceiling dangler, digital standee 1080×1920) | 15 (shutter plate 600 → hoarding 8000×900, gate arch 3000×1000) |
| Design | soft paper card · accent plate · price/rate rows · QR · contact band | bold accent header · name board · tagline · contact bar (phone · web · address) |
| Layout styles | Logo wall, Shelf talker+price, Rate/menu, Offer/wobbler, Wayfinding | Name board/fascia, Hoarding, Backlit light box, Shutter strip, Directional |
| Custom size | haan (50–15000 mm, live ratio label) | haan |

**Material → output (app khud decide karta hai)**

| Material | Group | Bleed | dpi | Output |
|---|---|---|---|---|
| Nonlit Flex | print | 25 mm | 150 | CMYK PDF + CMYK TIF + JPG · DXF (outline + 4 mounting holes) |
| Backlit Flex | print | 25 mm | 150 | same + halka white lift (light box me wash-out nahi) |
| Fabric (blockout) | print | 25 mm | 150 | CMYK PDF / TIF / JPG |
| Vinyl / Sticker | print | 5 mm | 300 | CMYK PDF / TIF / JPG |
| Canvas print | print | 40 mm | 200 | CMYK PDF / TIF / JPG (gallery-wrap bleed) |
| ACP Sheet | CNC | 0 | 150 | CNC cut PDF + DXF + print file (3 mm kerf, R6 corner, 4×4 mm holes) |
| Acrylic Sheet | CNC | 0 | 150 | kerf 2 mm, R3 corner |
| MDF Board | CNC | 0 | 150 | kerf 6 mm, R4 |
| Wood / Ply | CNC | 0 | 150 | kerf 6.35 mm (1/4"), R4 |
| Metal (MS/Alu) | CNC | 0 | 150 | kerf 1 mm, R2 |

**Naya file engine (sab browser me, koi server nahi)**

- **CMYK PDF** — DeviceCMYK image, ink limit (TAC 280%), bleed + crop marks + TrimBox/BleedBox. (pehle se tha, ab material ke hisaab se bleed/dpi/TAC auto.)
- **CMYK TIFF** — poora TIFF writer: Adobe Deflate (compression 8), Photometric=Separated (CMYK), 4 samples/pixel, InkSet=CMYK, resolution tags — RIP/print shop direct khol sakta hai. **PIL se verify: mode CMYK, dpi tag sahi.**
- **JPG** — soft proof / WhatsApp approval.
- **CNC cut PDF** — vector hairlines, 100% K ke OUTLINE, DRILL, EYELET, FOLD, SAFE layers, mm-accurate, 15 mm sheet margin.
- **DXF (R12)** — layers `OUTLINE / DRILL / EYELET / FOLD / SAFE`, `$INSUNITS = 4 (mm)`, closed polyline outline, circles for holes. **ezdxf se read + audit pass.**
- **Production pack (.zip)** — PDF + TIF + JPG + CNC PDF + DXF + specs.txt + QR SVG.

**Board ke andar bhi production layer** — jab aap artboard banate ho to `CUT & GUIDES (print me hide)` layer bhi aati hai: laal cut outline, neeli safe line, drilled holes, eyelets (magenta), pole-pocket fold (green). Ye layer print/CNC export me **apne aap hide** ho jati hai (design par laal line kabhi print nahi hoti).

**Measured (12 asli cases par, files Python se verify kiye)**

| Case | Ratio | Pixels | TIF check | PDF | DXF |
|---|---|---|---|---|---|
| in-shop 300×300 nonlit | 1:1 | 1772² @150 | CMYK 2104² 150dpi | 356 mm · DeviceCMYK | outline 300×300 mm, 4 holes |
| in-shop 500×700 vinyl | 5:7 | 3720×5209 @189 | CMYK 3838×5327 | 516×716 mm (bleed 5) | 500×700 |
| in-shop 1080×1920 canvas | 9:16 | 2934×5216 @69 | CMYK 3168×5450 | 1166×2006 mm | 1080×1920 (bleed 40mm) |
| in-shop 1500×500 fabric | 3:1 | 5197×1732 @88 | CMYK 5391×1926 | 1556×556 mm | 1500×500 |
| outdoor 1800×600 backlit | 3:1 | 5173×1724 @73 | CMYK 5335×1886 | 1856×656 mm | 1800×600 + 8 eyelets |
| outdoor 6000×600 fabric | 10:1 | 5197×520 @22 | CMYK 5247×570 | 6056×656 mm | 6000×600 |
| outdoor 3000×600 ACP | 5:1 | 5197×1039 @44 | CMYK 5197×1039 | 3000×600 mm | 3000×600 + 6 holes (4 + 2 mid), R6 |
| outdoor 900×900 acrylic | 1:1 | 5209² @147 | CMYK 5209² | 900×900 mm | 900×900 + 4 holes, R3 |
| outdoor 900×1350 MDF | 2:3 | 3472×5209 @98 | CMYK 3472×5209 | 900×1350 mm | 900×1350 + 4 holes, R4 |
| outdoor 1200×600 wood | 2:1 | 5197×2598 @110 | CMYK 5197×2598 | 1200×600 mm | 1200×600 + 4 holes, R4 |
| outdoor 3000×1000 metal | 3:1 | 5197×1732 @44 | CMYK 5197×1732 | 3000×1000 mm | 3000×1000 + 6 holes, R2 |
| outdoor 600×600 nonlit | 1:1 | 3543² @150 | CMYK 3875² | 656×656 | 600×600 |

- 12/12 case: 0 page error, 4/4 file valid, print PDF hamesha `DeviceCMYK`
- DXF sabhi cases ezdxf se **read + audit OK**, extents exactly board size, units mm
- Print scale **1:1** (sign industry standard) — bade board par dpi kam hota hai (6000 mm @ 22 dpi), file normalize nahi hoti; panel me dpi + viewing distance + min text height dikhta hai
- 10/10 app regression pass (tools, mockups 174/0, converter, export, viewports, 0 error, 0 404)
- Mobile 390 px: panel scrollable, koi horizontal overflow nahi

**Coming soon (aapke kehne par, UI me chip lagi hai):** 3D DWG · SVG cut

**Real output samples** (`ArtViSiON-signage-samples.zip` me 3 complete packs hain):
- `ARTVISION-STUDIO-inshop-1x1-300x300mm-nonlit/` — CMYK PDF + TIF + CNC PDF + DXF + specs
- `ARTVISION-STUDIO-outdoor-3x1-1800x600mm-backlit/` — same set (8 eyelets)
- `ARTVISION-STUDIO-outdoor-5x1-3000x600mm-acp/` — CNC PDF + DXF (6 drill holes, R6 corner) + CMYK print
  → ye files asli Illustrator/RIP/CorelDRAW me khulti hain, kyunki PDF/TIFF/DXF standard hain (koi custom format nahi).

---

## 2. Verification (jo maine actually chala kar dekha)

**Tool-by-tool (27/27 pass)** — har test canvas ke pixels/tool-hint se verify hota hai, sirf click se nahi:

```
23/23 tools activate + hint · Move · Node · Pen · Pencil · Brush · Eraser · BG-eraser · Smudge · Clone
Paint bucket · Gradient · Marquee · Lasso · Magic wand · Eyedropper · Hand · Zoom · Text · Rect · Ellipse
Star · Line · Undo/Redo · Export PNG/JPG/WEBP/SVG/PDF · Save project
```

**Click audit (63 targets)**: **0 dead** — 27 dock actions, 23 tools, 10 top-bar actions, 4 inspector tabs. Har click par visible response ya honest toast.

**Responsive (9 viewports × 3 pages = 27 combinations)**: `0 overflow`, `0 JS error`, `0 HTTP 404`
(360×640 → 1920×1080, phone-landscape included)

**Performance (Chrome, measured)**
| | Desktop (1× CPU) | Phone (4× CPU throttle) |
|---|---|---|
| DOMContentLoaded | 151 ms | 580 ms |
| Load complete | 216 ms | 800 ms |
| Long tasks (>50 ms) | **0** | 5 (57–154 ms, boot paint) |
| JS heap | 10 MB | 10 MB |
| Mockups overlay open | 0 long task | 1 (71 ms) |
| Converter overlay open | 0 long task | 2 (138+106 ms) |

**Mockup library payload**: thumbnail 15 KB avg vs full SVG 558 KB avg → **~37× lighter grid**, 20 cards = **1 ms** (pehle 361 ms). Full SVG sirf preview / download / Studio-import par load hota hai.

**Converter (asli file daal kar)**: PNG → PDF / Vectorize / BG-remove / Color Lab → sab cards `done`, download `test.pdf` (3.7 KB) — laptop + phone dono par, 0 error.

**ZIP ko extract karke alag server par dobara test**: 174 cards render, 0 broken, converter `av-embed` mode me khulta hai, export `welcome-design.png` (315 KB) download hota hai, 0 page error.

---

## 3. Files jo badle / jude

```
index.html                     1,275,757 B   UI layer, top-bar order, autosave fix, canvas memory cap,
                                             dock error-guard, line/pen stroke fix
converter.html                 1,556,437 B   embed mode + QoL (pehle round se)
mockups.html                      29,308 B   thumbnails + graceful fallback chain
assets/ui/studio-ui.css           95,715 B   built design system (580 rules, braces balanced)
assets/ui/studio-ui.js            25,567 B   behaviour layer (tabs, dock, a11y, menu sheet)
assets/mockups/*.svg             174 files   ← wapas add (library isi par chalti hai)
assets/mockups/thumbs/*.webp     174 files   ← naya, 2.1 MB total, grid inhi se chalta hai
desktop-app/converter.html                   root converter.html ka synced copy (Electron)
desktop-app/mockups.html                     synced copy
tools/make-thumbs.py                         thumbnail builder (SVG → WebP 500 px)
```

## 4. Kaise deploy karein

**A) Deploy-ready package (recommended):** `ArtViSiON-STUDiO-FULL.zip` (23 MB) — repo root par extract/replace karo.
Isme `assets/mockups/` + `thumbs/` bhi hain, isliye library turant chalegi.

```bash
git add index.html converter.html mockups.html assets/ js/ desktop-app/ tools/
git commit -m "Fix: mockup thumbnails, autosave/canvas perf, dark panels, dead filter button, tap targets"
git push origin rj
```

**B) Sirf badli hui files:** `ArtViSiON-STUDiO-UPDATED-FILES.zip` (≈1 MB) — agar repo me `assets/mockups/` pehle se
maujood hai to sirf yahi 7 files paste karo. `thumbs/` folder naya hai use bhi add karna (2.1 MB).

**Rollback:** purane `index.html`, `mockups.html`, `converter.html` wapas + `assets/ui/` aur `assets/mockups/thumbs/` hata do.

## 5. Dead weight (package se hata diya, feature nahi gaya)

`art_*.jpg` (21 files, 6.2 MB, kahin reference nahi) · `UPDATE-v19/v22/v24/v25.html` (2.4 MB purane snapshot) ·
`ArtViSiON-Studio.html` (813 KB purana single-file) · `converter-engine/samples/demo.tiff` (6.7 MB sample input)

> Repo me ye files rakhni hain to rakho — ZIP se nikalne se app par koi asar nahi.

## 6. Agar phir bhi lag mehsoos ho (checklist)

1. **Hard refresh** (Ctrl+Shift+R) — purana 82 KB CSS cache me ho sakta hai.
2. Browser me sirf ek Studio tab rakho — har tab apna canvas + autosave rakhta hai.
3. Bahut bada artboard (A2 300 dpi se bada) + 20+ raster layers ho to `Pro` mode ke bajaye normal mode use karo.
4. Chrome par `Memory Saver` / 40+ extensions ka asar hota hai — incognito me ek baar test karke dekh lo.
5. DevTools → Performance → 5 s record karke bhejo; main us trace par exact hotspot nikal dunga.
