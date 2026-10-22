# ArtViSiON Studio — v25 Update

**Theme: QR Pro (chhota icon + minimal QR) + Signage & Retail Board pack (1:1 se 10:1 tak production files).**

v24 me QR, CMYK PDF, multi-copy sheet aur batch export aaye. v25 usi QR ko **behtar scan** banata hai — QR ke
beech me chhota logo, aur **jitna kam module utna aasan scan** — aur saath me **retail signage ka poora pack**:
7 ratio, 15 production sizes, design-theory grid, aur press-ready CMYK PDF + JPG + specs file.

Upload karna hai: **`index.html`** (aur ye `UPDATE-v25.md` / `UPDATE-v25.html` optional).
`mockups.html`, `assets/`, `js/`, `svg/`, `converter.html`, `screenshots/`, `converter-engine/`, `desktop-app/` — **kuch nahi badla**.

---

## 1. QR Pro — chhota icon + minimal QR (naya)

Neeche quick bar me **QR** (ab "QR Pro"), side panel ka **QR code** card, ☰ Menu → File → *QR Pro (icon + minimal)*.

### Centre icon (chhota logo)
- **10 built-in icons** — Shop, Cart, Phone, WhatsApp, Instagram, Rupee ₹, Offer %, Star, Heart (+ "icon nahi").
- **Apna logo upload** — PNG/JPG/SVG; icon white rounded tile par baithta hai, isliye QR ke saath clean dikhta hai.
- **Icon size slider** (8–30%) — chhota rakho to scan aasan.
- **Icon safety meter** — app khud batata hai kitne modules icon ne dhake aur kitne codewords recover ho sakte hain:
  "icon 18% (7 modules) — 11/56 recoverable — Safe ✓". Zyada bada karne par warning.
- Icon on hone par app **EC level H (30%) auto** kar deta hai — QR thoda dense hota hai par logo ke peeche se bhi padha jata hai.

### Minimal QR (kam modules = aasan scan)
- **Mode auto**: sirf digits → *numeric*, CAPS + symbols → *alphanumeric*, baaki → *byte*. Isse version chhota rehta hai
  (jaise `9876543210` sirf **21×21** modules).
- **EC auto (minimal)** — sabse halka level jo safe ho. Manual bhi: L / M / Q / H.
- **Minimal tip buttons** — `https:// hatao`, `www. hatao` — chhota text, kam modules.
- **Density meter** — Bahut minimal / Minimal / Medium / Dense + "kam se kam 4 px per module print me".
- **Print size hint** — kitne mm me print karo (kam se kam 20–30 mm).
- Quick chips: Website · WhatsApp · UPI pay · Phone · **vCard**.
- Output: **PNG (1200 px)**, **vector SVG** (print me crisp), **Design me add karo** (editable layer), **QR + Print Pack**.

Tested: URL, UPI, vCard, Hindi/emoji text, numeric, alphanumeric — sab QR **decode verify** (jsQR),
aur **L/M/Q/H chaar levels ka module-matrix reference encoder se bilkul identical** (16/16 cases).

---

## 2. Signage & Retail board — 7 ratios, production files

Neeche quick bar me **Signage** (purple), side panel **Signage** card, ☰ Menu → File → *Signage board (1:1 … 10:1)*.

### Ratios + sizes (15)
| Ratio | Sizes (mm) | Typical use |
|---|---|---|
| **1:1** | 300×300 · 600×600 · 1000×1000 | Square sticker, shop board, wall panel |
| **1:2** | 300×600 · 600×1200 | Door/pillar panel, standee |
| **2:1** | 600×300 · 1200×600 | Counter board, flex board |
| **3:1** | 900×300 · 1800×600 | Name plate, shop front |
| **4:1** | 1200×300 · 2400×600 | Banner strip, wide banner |
| **5:1** | 1500×300 · 3000×600 | Long fascia, hoarding |
| **10:1** | 2500×250 · 3000×300 | Shutter strip, lintel strip |

Ratio chip dabao → sirf us ratio ke sizes. **Artboard ka pixel ratio exactly mm ratio ke barabar** hota hai (letterbox nahi).

### 5 layout styles (teeno ratio families ke liye)
- **Retail sale** — brand + bada headline + offer badge + contact + QR
- **Brand / name board** — brand focus, clean underline
- **Offer / discount** — offer line highlight
- **Menu / rate board** — 3 items + price, dotted rule (square me vertical list, wide me row list)
- **Wayfinding / arrow** — arrow + direction text

### Design theory jo app khud lagata hai
- **Safe margin = short side ka 6%** — text kabhi artboard ke edge par nahi jata (test se verify).
- **3-zone grid**: brand · message · contact + QR (wide me left/centre/right, square me top/middle/bottom band).
- **Hierarchy**: headline short side ka ~36%, brand ~24%, body ~7% — har ratio par same optical weight.
- **Viewing distance & minimum text** — panel me live: *10:1 · 3000×300 mm · ~7 m · min text 15 mm*.
- **Effective dpi auto** — large format me dpi kam (53–320 dpi), pixels 5200 px tak capped (file bhaari nahi hoti).
- **Colour**: 8 themes (Modern Blue, Sunrise Orange, Minimal White, Festival Magenta, Nature Green, Royal Gold, Bold Black, Candy Pink) — high contrast lock.
- **QR vector** hota hai (path), print me kitna bhi zoom — crisp.

### Output (ek click)
| Button | File |
|---|---|
| **CMYK PDF** | `<brand>-signage-3x1-900x300mm-CMYK.pdf` — asli CMYK, 300% ink limit, **bleed + crop marks**, TrimBox/BleedBox |
| **JPG** | Flat JPG (WhatsApp, sign shop ko turant preview) |
| **Production pack (.zip)** | PDF + JPG + **specs.txt** + vector QR SVG |

`specs.txt` me: ratio, cm/m size, pixel + effective dpi, bleed, safe margin, viewing distance, min text height,
style/theme, QR modules, poora content aur printing notes (lamination, flex colour note).

---

## 3. Kahan-kahan buttons hain

| Jagah | Kya |
|---|---|
| Neeche quick bar | **Design · QR · Pro · Signage** (sabse aage, scroll ke bina) |
| Side panel | QR code (icon · minimal) · Pro output · **Signage (1:1–10:1)** |
| ☰ Menu → File | QR Pro (icon + minimal) · Signage board (1:1 … 10:1) · Pro output |
| Design Hub | **QR Pro — icon + minimal** · **Signage & retail board** (+ purane 4 cards) |
| ☰ Menu → Naya kya hai | v25 list |

Mobile (390 px) par dono panel stack ho jate hain, koi horizontal scroll nahi, footer buttons 2×2 grid me.

---

## 4. Purana sab intact (v13 → v24)

- v24: QR generator, CMYK PDF, multi-copy sheet (A4/A3 N-up + crop marks), batch ZIP.
- v23: click-click design wizard (16 sizes × 8 themes), 18 templates, 60 vector assets, Print & Cut Pack.
- v22: Selection & Edit Toolkit · v21: 174-scene mockup library · v20: simple light UI default · v19: no opening popup, drag = pan.
- 15 tools / 5 steps, Remove BG (on-device), Subject, Resize, Text, Filters, layers, animation, PNG/JPG/SVG/PDF/PSD export — sab chalta hai.

---

## 5. Test results (v25 build)

| Suite | Result |
|---|---|
| **v25 suite (`t29`)** | **96 / 96** — QR mode auto (num/alnum/byte), 6 decode round-trips, EC L/M/Q/H decode, **matrix = reference lib (16 cases)**, icon safety math, icon drawn + decodes, panel UI, 15 sizes × 7 ratios (px ratio exact), 7 ratio builds (text inside artboard), PDF (`DeviceCMYK`, `FlateDecode`, `TrimBox`, page = trim+bleed+marks), pack ZIP (pdf+jpg+specs+qr.svg), panel, hub, 0 console errors |
| v24 suite (`t28`) | 37 / 37 |
| v23 wizard + pack (`t26`, `t27`) | 33/34 · 26/26 |
| Regression (`t22`, `t22b`, `t23`, `t24`, `t25`) | 19/20 · 13/13 · 20/21 · 7/7 · 13/13 |
| Mobile 390 px | QR Pro + Signage panels fit, no h-scroll |
| Console errors | **0** |

Jo 3 asserts reh gaye wo sirf purane version-string wale hain (`AV12.version === '22.0'/'23.0'`) — v25.0 ke saath by design.

---

## 6. Upload checklist (GitHub)

1. `index.html` replace karo (single file — sab andar, ~1.21 MB).
2. `UPDATE-v25.md` (+ `UPDATE-v25.html` chaho to) add karo.
3. Baaki repo files ko chhedna nahi hai.
4. Browser me kholo → neeche **QR** ya **Signage** dabao → kaam kar raha hai.
