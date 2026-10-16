<div align="center">

# ◆ ArtViSiON STUDiO

**Hybrid Vector + Bitmap + Animation Editor — Business Branding Suite**

*100% Offline · Single HTML File · No Install · No Account*

`v9.9` ![platforms](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux%20%7C%20Web-blue) ![license](https://img.shields.io/badge/license-MIT-green) ![size](https://img.shields.io/badge/size-%E2%89%88375KB-orange)

</div>

Ek hi HTML file me **pura creative suite** — Photopea jaisa editor, Canva jaisa templates, business branding ka pura workflow. Browser me kholo aur kaam shuru!

---

## ✨ Features

### 🎨 Editor Core
- **Hybrid editing** — Vector (pen, node edit, shapes, text-on-path) + Bitmap (brush, smudge, clone, wand) ek hi app me
- **Layer system** — groups, blend modes, opacity, masks (🎭 **Layer Masks** non-destructive), **Clipping Masks ↳**
- **Artboards 🗂** — ek file me multiple canvases, har board ka apna undo/history/animation
- **Filters + Curves** — Filter Gallery (live previews), Photoshop-style Curves, feather masks
- **Animation** — timeline, onion-skin (1-3 frames + opacity), export **GIF / WebM / Sprite-sheet**
- **Import/Export** — PNG JPG WebP GIF BMP SVG **PSD (in+out)**, **PDF/AI editable**, **EPS/PS import**, **DXF (ASCII + binary) editable**, **TIFF (JPEG/tiles bhi)**, `.artvision` project format
- **Pro tools** — rulers/guides/snap, smart guides, symmetry/mandala, HSV picker, Image Trace, Background Remover, Video→Frames import

### ⚡ Workspace (fast)
- **Home Screen** — size presets se turant start
- **Ctrl+K Command Palette** — 100+ commands 2 second me
- **Tab Focus Mode** — zero distraction canvas
- **History Panel** — kisi bhi step pe wapas
- **Right-click context menu** · drag-drop · paste-from-clipboard

### 🏪 Business Suite (stores / offices / showrooms / malls)
- **Brand Kit** — business details bharo → **8 ready materials** (Logo+Guide, Visiting Card, Letterhead, Shop Board, Insta Post, Pamphlet, FB Cover, Sticker) — 1 click!
- **12 Advertising Mockups** — Shop Facade, Roll-up Standee, Hoarding, Mall Pillar, Shopping Bag, Staff T-Shirt, ID Card, Name Plate, Wayfinding Sign, Dangler, Table Tent, Glass Decal — checkbox se chuno
- **Branding theory auto-applied** — 60-30-10 color rule, consistent lockups, contact hierarchy, auto accent colors
- **Template Gallery** — 6 starter designs · **Moodboard** with ghost-tracing · **My Library** (reusable assets)

---

## 🚀 Quick Start

### Web (turant chalana)
1. `ArtViSiON-Studio.html` **download** karo
2. **Chrome/Edge/Firefox** me kholo (double-click)
3. Done! Sab kuch offline chalta hai

> 💡 **Desktop app chahiye?** Neeche [Desktop Build](#-desktop-build-windows-exe) section dekho

### 30-second tour
1. Home Screen → **Templates** ya **🏪 Brand Kit** → business details → Generate
2. **Ctrl+K** dabao → "gif" type karo → animation timeline me frames banao
3. Koi photo drop karo → **Layer > Add Layer Mask** → ◐ chip se paint
4. **File > Mockup Studio** → scenes chuno → **⬇ SVG Pack** → 126 vector SVGs ka zip download
5. **File > Export All Artboards** → sab PNG ready

---

## 💻 Desktop Build (Windows .exe)

`desktop-app/` folder me ready-to-build **Electron project** hai:

```bat
cd desktop-app
build.bat        ← double-click (Node.js LTS chahiye)
```

`dist/` me milega:
- `ArtViSiON STUDiO Setup 9.9.0.exe` — installer
- `ArtViSiON STUDiO 9.9.0.exe` — portable

**Manual:**
```bash
cd desktop-app
npm install
npm run dist     # → dist/ me .exe
npm start        # bina build, dev mode
```

macOS/Linux: same `npm install && npm start` — electron-builder target `package.json` me change karke DMG/AppImage bhi ban sakta hai.

---

## 📁 Repo Structure

```
├── ArtViSiON-Studio.html        ← PURA APP (single file — yahi asli product hai)
├── desktop-app/                 ← Electron wrapper (.exe builder)
│   ├── app.html                 ← (ArtViSiON-Studio.html ki copy)
│   ├── main.js                  ← Electron main process
│   ├── build.bat / run.bat      ← Windows build/run scripts
│   └── package.json
├── svg/                         ← 🎨 126 ready-made mockup SVGs (pure vector, 2–10 KB)
│   ├── 01-Retail-Store--….svg   ← category-wise numbered: 01 Retail … 13 Signage-Specials
│   └── …
├── Branding-Mockup-Guide.pdf    ← 📄 Full branding guide (Retail→Stadium, AI prompts ke saath)
├── screenshots/                 ← Proof: Mockup Studio, PDF import, History Time Machine
├── .github/workflows/           ← CI: Windows .exe auto-build on release
└── LICENSE
```

---

## 🏗️ Versions

| Ver | Kya aaya |
|-----|----------|
| v1–v4 | Base editor · all import formats · `.artvision` save · PSD import · animation+WebM · stability |
| v4.5 | Curves · GIF export · PSD layers export · Electron project |
| v5.0 | History panel · right-click menu · Filter Gallery · text presets |
| v5.5 | Home screen · Ctrl+K palette · Tab focus · Video→Frames |
| v6.0 | Moodboard+ghost · My Library · Templates · Onion-skin pro |
| v7.0 | **Layer Masks** · **Artboards** (per-board history) |
| v8.0 | **Clipping Masks** · Batch export · Mask feather |
| v9.x | **🏪 Brand Kit (8 materials)** · **📣 12 Advertising Mockups** |
| v9.3 | **📥 Pro Import Pack** — PDF/AI editable (text+vector+images, 12 pages=12 artboards) · DXF editable (LINE/CIRCLE/ARC/ELLIPSE/LWPOLYLINE/SPLINE/TEXT/MTEXT/INSERT blocks) · TIFF raster (LZW/Deflate/PackBits/16-bit/palette) · PSD already editable |
| v9.3+ | **🔥 Complex import DONE** — modern PDFs (xref-stream/ObjStm) · RC4-protected PDFs (empty user pw) · PDF **gradients + transparency** · **ToUnicode** (Hindi/Unicode text) · **EPS/PostScript mini-interpreter** · **Binary DXF** · JPEG-in-TIFF + tiled JPEG-TIFF |
| v9.4 | **🔐 AES-encrypted PDFs** — AES-256 (R6/V6) + AES-128 (AESV2/R4), empty user password · **Raw tiled TIFF** (non-JPEG, 8/16-bit, palette, predictor) · **CDR preview import** (embedded raster + Export-PDF tip) |
| v9.5 | **⏱️ Undo/Redo 2.0 — Time Machine** — full History timeline (forward+backward jump, thumbnails, steps+MB counter) · smart auto-labels (100+ operations) · 512 MB smart memory budget (10–120 steps) · layer-opacity undo · Ctrl+Alt+Z |
| v9.6 | **🎨 Mockup Studio — 126 SVG scenes** (Retail · Office · Showroom · Mall · POSM · Restaurant · Brand ID · Industry · Stadium · Events · Expo · Common · Signage) — guide ke saare size/material/lighting specs caption me · **100% pure-vector** (SVG export 4 KB, zero raster) · AI-prompt copy 🤖 · File > Mockup Studio |
| v9.7 | **⚡ Studio Power Pack** — **Sab 126** one-click batch (async, ~3 s, memory-safe lazy comps, toast-flood mute) · **Day/Raat/Sandhya variants** har scene par · **🎯 Doc se prefill** (imported client doc se naam + dominant colour auto-detect) |
| v9.7+ | **🛠 Startup UX fix** — Autosave/Home modal conflict hataya · **har Cancel-type button ab sahi dismiss karta hai** (modal buttons me fn ho ya na ho) |
| v9.8 | **🧼 Clean Presentation Mode** — saare 126 scenes ab client-clear: log/plants/light-beams/star-moon clutter hataya · neutral studio backdrops · subtle glows (2 rings) · chhota tidy caption — subject par focus |
| v9.9 | **⬇ SVG Pack export** — Mockup Studio me **SVG Pack** button + "SVG pack bhi download" checkbox · ≤8 scenes = direct files, zyada = **ArtViSiON-Mockups-SVG.zip** (self-built ZIP writer) · repo me **126 ready-made SVGs** included |

---

## 🔒 Privacy

**100% offline.** Koi server nahi, koi telemetry nahi, koi account nahi. Autosave sirf browser ke `localStorage` me. Tumhare files tumhare paas.

## ⚠️ Known Limits (honest)
- PSD export uncompressed hai (file badi ban sakti hai, Photoshop me sab khulta hai)
- GIF = 256 colors (format limit)
- CDR (CorelDRAW): embedded **preview raster** import hota hai (editable nahi) — full editable ke liye CorelDRAW me File > Export > PDF/AI karo, wo fully editable khulta hai; legacy (PostScript) AI files ke liye Illustrator me "Create PDF Compatible File" ON karke save karo
- Encrypted PDFs: **AES-256 (R6) + AES-128 (AESV2) + RC4** — empty user password wale khul jaate hain; non-empty password ya owner-only-lock wale nahi (Acrobat me Security OFF karke re-save karo)
- EPS: basic drawing operators (paths/text/colors/transforms) — rare legacy operators skip ho sakte hain
- In-app preview sandboxes me download buttons block ho sakte hain — file ko seedha browser me kholo

## 🤝 Contributing

PRs welcome! Single-file architecture hai — `ArtViSiON-Studio.html` ke andar `<script>` section me sab logic hai. Bade changes se pehle issue kholo.

## 📄 License

[MIT](LICENSE) — tumhara hai, jaise chaho use karo. ❤️

<div align="center">

**◆ ArtViSiON STUDiO** — banaya gaya designers ke liye, Hinglish pyar ke saath 🇮🇳

</div>
