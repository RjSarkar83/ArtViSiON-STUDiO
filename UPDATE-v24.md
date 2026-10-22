# ArtViSiON Studio — v24 Update

**Theme: Pro Output Pack — "design se aage: QR, press-ready CMYK, multi-copy sheet, batch export."**

v23 ne design banana aasan kar diya (3 click wizard, 18 templates, 60 assets, Print & Cut Pack).
v24 usi app me **chaar naye professional output tools** jodta hai — sab **offline**, sab **click-click**, koi server/API/account nahi.

Upload karna hai: **`index.html`** (aur ye `UPDATE-v24.md` / `UPDATE-v24.html` optional).
`mockups.html`, `assets/`, `js/`, `svg/`, `converter.html`, `screenshots/`, `converter-engine/`, `desktop-app/` — **kuch nahi badla**, unhe upload mat karo.

---

## 1. QR Code generator (naya)

Neeche quick bar me **QR** button (side panel me **QR Code generator** card, ☰ Menu → File me bhi).

| Kya milta hai | Detail |
|---|---|
| **Asli QR** | Khud ka encoder — byte mode, EC **L / M**, version 1–10, mask auto-select (best 8 mask me se). Koi internet nahi |
| **Quick chips** | Website · WhatsApp · UPI pay · Phone — chip dabao, format auto bhar jata hai, bas number/naam badlo |
| **Live preview** | Type karte hi QR update. Neeche info: version, modules (33×33), EC level, mask, aur **minimum print size 30 mm** |
| **Colour** | Foreground/background colour picker (safest black-on-white) |
| **Quiet zone** | 2/3/4/5 module border |
| **`Design me add karo`** | QR seedha **editable layer** ban jata hai — move, resize, colour, layer order sab normal |
| **`PNG download`** | 1200 px raster (WhatsApp, poster, visiting card) |
| **`SVG (vector)`** | Vector QR — print me kitna bhi zoom, kabhi blur nahi |
| **`QR + Print Pack`** | QR design me daal ke seedha Print & Cut Pack khol deta hai |

Test kiya gaya: website URL, WhatsApp link, UPI link, vCard-style text, Hindi/Hinglish + emoji text,
240–430 character lamba text — sab phone camera se scan hote hain (decode verify kiya gaya).
QR print me **kam se kam 20–30 mm** rakhein (screen par hint bhi dikhta hai).

---

## 2. CMYK PDF — press ke liye

`Pro output → CMYK PDF`. Aam PDF RGB hoti hai; offset press CMYK maange to ab **seedha CMYK PDF**:

- Har pixel ko **C/M/Y/K** alag channel me convert (GCR + **300% total ink limit** — press safe).
- Page **actual print size + bleed + crop marks** ke saath, `MediaBox` / `TrimBox` / `BleedBox` set.
- 300 dpi raster image, JPEG + `/DeviceCMYK` + `FlateDecode` compression (file chhoti rehti hai).
- Naam: `<design>-CMYK-300dpi.pdf`

**Imaandaar note:** conversion browser me hoti hai (GCR approx). Exact press profile (ISO Coated v2 etc.)
chahiye to printer se profile match karayein. Screen/WhatsApp ke liye normal **Print Pack (.zip)** hi best hai — wahi card me likha bhi hai.

---

## 3. Multi-copy sheet (N-up) — cards, stickers, labels

`Pro output → Multi-copy sheet`. Ek hi A4/A3 sheet par **jitni copies fit hoti hain** + har copy ke corner par **crop marks**:

- Sheet: **A4 · A3 · Letter** (default A4) · copies: Auto (max) ya 4/6/8/10/12/16/20/24/30.
- Live **mini preview** — kitne column × row, kitni copies per sheet (jaise Visiting Card par A4 = **2×4 = 8 copies**).
- Output: single-page PDF, hairline crop marks, trim-accurate placement → print shop ko sheet de do, cutting easy.
- Naam: `<design>-sheet-A4-8up.pdf`

---

## 4. Batch export — saare artboards ek ZIP

`Pro output → All artboards`. Multi-page project (10 posters, 20 cards) ke liye:

- **Har artboard ka PNG** (white background flatten, poora size).
- Saath me **`artboards-index.txt`** — naam, size px, sequence.
- Ek ZIP, offline, ek click.

---

## Naye buttons kahan hain

| Jagah | Kya |
|---|---|
| Neeche quick bar | **QR** (teal) · **Pro output** (dark) |
| Side panel | **QR Code generator** card · **Pro output** card |
| ☰ Menu → File | **QR Code generator** · **Pro output (CMYK · Sheet · Batch)** |
| Design Hub (Menu) | do naye hub cards: QR + Pro output |

Sab panels **Esc** ya ✕ se band, koi popup open par nahi aata (v19 se waisa hi).

---

## 5. Purana sab intact (v13 → v23)

- v23: click-click design wizard (16 sizes × 8 themes), 18 templates, 60 vector assets, Print & Cut Pack (bleed/crop PDF, cut SVG/PNG, social JPG, specs TXT, ZIP).
- v22: Selection & Edit Toolkit (copy/cut/paste/fill/feather/grow/invert).
- v21: 174-scene mockup library · v20: simple light UI default · v19: no opening popup, drag = workspace pan.
- 15 tools / 5 steps, Remove BG (on-device), Subject, Resize, Text, Filters, layers, animation, exports PNG/JPG/SVG/PDF, PSD — sab waisa hi chalta hai.

---

## Test results (v24 build)

| Suite | Result |
|---|---|
| v24 tools (`t28`) | **37 / 37** — QR decode (URL, UPI, vCard, 94-char text, EC L+M, v10), QR PNG/SVG download + decode, QR layer insert, CMYK PDF (`/DeviceCMYK`, `/FlateDecode`, TAC ≤ 300%, size = W×H×4, TrimBox), N-up (A4 grid, copies = image placements, 8 crop marks/copy), batch ZIP (all boards + index), panels open/close, 0 console errors |
| v23 wizard/pack (`t26`, `t27`) | 33/34, 26/26 (1 known assert = purana version string) |
| v22 / v22b / v23 / v24 / v25 regression | 19/20, 13/13, 20/21, 7/7, 13/13 (2 known asserts = purana version string) |
| Mobile 390 px | QR + Pro panels usable, footer buttons grid me fit, no horizontal scroll |
| Console errors | **0** |

---

## Upload checklist (GitHub)

1. `index.html` replace karo (single file, sab kuch andar hai — 1.19 MB).
2. `UPDATE-v24.md` (+ `UPDATE-v24.html` chaho to) add karo.
3. Baaki repo files ko chhedna nahi hai.
4. Browser me kholo → neeche **QR** ya **Pro output** dabao → kaam kar raha hai.
