# ArtViSiON STUDiO v10.2 — CorelDRAW import + all-devices update

**Kya badla:** `.cdr` / `.cdt` ab asli CorelDRAW engine se parse hote hain (preview image nahi).
CorelDRAW **v3 se X6+** tak — RIFF, ZIP (`content/riffData.cdr`), ZIP `content/root.dat` aur OLE compound file (CFB) — sab automatically detect hote hain.

Import hone par milta hai:

- Rectangles (corner radius), ellipses, stars, polygons, rounded rects, **Bezier paths** — editable nodes ke saath
- **Live text** — font, size, colour, baseline
- Solid (RGB/CMYK) + **gradients** (multi-stop, linear/radial)
- Outline: colour, width, cap, join, dash
- **Embedded bitmaps** alag raster layer par (neeche), vectors upar
- Multi-page CDR → har page ka apna artboard tab
- Import ke baad toast: object count, CDR version, container, page size

Saath hi **PDF / EPS / AI import ka `T_vec` bug fix** — pehle wo import throw karta tha.

---

## v10.0.1 — "file upload ho gayi par dikh nahi rahi" fix

Asli CorelDRAW files par 4 bugs mile aur theek kiye:

| Bug | Asar | Fix |
| --- | --- | --- |
| RIFF form check sirf `CDRT/CDRX/CDR` accept karta tha | Asli `CDRB`, `CDR9`, `CDRD`… files reject ho rahi thi | Ab poora CDR family (CDR0–CDR9, CDRA–CDRZ, CDRT, CDRX, CSL, CDT) accept, version libcdr ke `getCDRVersion()` jaisa decode |
| Objects file order me draw ho rahe the | Aakhri object (aksar black/solid bg) sab kuch dhak deta tha → "kuch dikh hi nahi raha" | libcdr ke `m_reverseOrder` ke mutabik paint order reverse |
| Pattern/bitmap fills ko solid black banaya ja raha tha | Poore page par kaala block | Ab `pattern` type → transparent (shape visible, fill skip) |
| Text size mm/points mix ho rahi thi | Text 25× bada | mm → pt correct conversion |

Saath me: off-page artwork auto-reframe, "no fill + no outline" objects ka visible fallback, aur fail hone par error toast ki jagah detail **dialog** (file ka naam + reason + kya karein).

Test (real files, preview thumbnails se match):

- `09 Visiting Card` (CDRB) — 1,129 paths, front+back card bilkul sahi
- `06 Business Card` (CDRB) — 411 paths + 103 bitmaps + live text
- `01 Receipt` (CDRB) — 9 paths + 7 text objects, layout match
- `15 Logo Designs` (ZIP X6) — 95 paths, gradients

## v10.2 — All-devices update

Ek hi `index.html` har screen par chalega:

| Screen | Kya badla |
| --- | --- |
| **Desktop** (≥981px) | Layout bilkul pehle jaisa — kuch nahi bigda |
| **Tablet / small laptop** (701–980px) | Properties/Layers panel ☰ button se **slide-over drawer**; tap outside ya `Esc` se band |
| **Phone** (≤700px) | **Bottom tool rail** + bottom-sheet panel, 2-row topbar (actions + artboard tabs + scrollable menus) |
| **Phone landscape** | Ek row ka chrome + bottom rail — canvas ko poori height |

Touch features:

- **Pinch zoom + two-finger pan** canvas par
- **44px touch targets**, node/handle hit-area 2.2×, iOS focus-zoom band
- DPR cap (2×, low-end par 1.5×) — purane phone par bhi smooth
- `dvh` + safe-area padding (notch/gesture bar), PWA "Add to Home Screen" full-screen
- Menu dropdown viewport ke andar clamp, toast phone-safe width
- CDR import ke baad phone/tablet par auto fit + panel auto-band

Tested: iPhone 12 (390×844), SE (375×667), Android (360×640), phone landscape (844×390), iPad (768×1024 & 1024×768), desktop (1440×900) — sab par zero errors, CDR import + pinch + tap-select + drag verified.

## GitHub par update kaise karein

1. ZIP extract karo.
2. Apne repo (`rjsarkar83/ArtViSiON-STUDiO`) ke **active Pages branch** (usually `main`) me root par **replace** karo:
   - `index.html`  ← ye naya v10.0 build hai (self-contained, koi external JS/CSS nahi)
   - `README.md`   ← updated docs
   - `.nojekyll`   ← agar pehle se hai to koi baat nahi, same file hai
3. `converter.html`, `mockups.html`, `js/mockups-data.js`, `assets/mockups/` — **inhe chhedne ki zarurat nahi**, wahi rehne do.
4. Commit → Pages rebuild hone do (1–2 min) → Studio URL par **Ctrl+Shift+R** (hard refresh) karo.

> Sirf `index.html` replace karna hi kaafi hai. Baaki files (mockups, converter) waise hi kaam karte rahenge.

## Test kaise karein

1. Studio kholo → **File ▸ Open** (Ctrl+O) → koi bhi `.cdr` file chuno.
2. Canvas par artwork aayega; Layers panel me **CDR vectors** + **CDR bitmaps** dikhenge.
3. Kisi shape par click karo → Properties me fill/stroke/gradient badlo.
4. `N` (node tool) se Bezier nodes edit karo, `T` se text edit karo — sab editable hai.
5. Import na ho to toast me reason + tip dikhega (SVG/PDF export karke import karna).
