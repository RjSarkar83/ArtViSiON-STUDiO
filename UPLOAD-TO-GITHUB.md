# 🚀 ArtViSiON STUDiO v11.0 — GitHub upload (Hinglish)

Ye folder **poora website** hai. Bas ise apne repo me daal do — kuch build karne ki zaroorat nahi.

---

## 1. GitHub web UI se upload (sabse aasan)

1. https://github.com/rjsarkar83/ArtViSiON-STUDiO kholo → **Add file ▸ Upload files**.
2. ZIP ko **extract** karo (ZIP ko as-is upload mat karo — site update nahi hogi).
3. Extracted folder ke **andar ka content** (index.html, converter.html, mockups.html, assets/, js/, svg/, README.md…)
   drag-and-drop karo. Dhyan rahe: `ArtViSiON-STUDiO/` jaisa **extra enclosing folder na bane** —
   `index.html` repo ke root me hona chahiye.
4. Commit message: `v11.0 — Clip Studio × Procreate pack` → **Commit changes**.
5. GitHub → **Settings ▸ Pages** → Source: *Deploy from a branch* → Branch: `main` → Folder: `/(root)` → **Save**.
6. 1–2 minute baad site par jao aur **Ctrl + Shift + R** (hard refresh) karo.

## 2. Git CLI se (agar terminal comfortable ho)

```bash
git clone https://github.com/rjsarkar83/ArtViSiON-STUDiO.git
cd ArtViSiON-STUDiO
# extracted v11.0 folder ka content yahan copy/paste karo (index.html replace hoga)
git add .
git commit -m "v11.0 — Clip Studio × Procreate pack (brush studio, quickshape, colordrop, guides…)"
git push origin main
```

Pages pehle se configured hai to 1 minute me live ho jayega.

---

## 3. File structure (zip me kya hai)

```
index.html                 ← Studio v11.0 (yahan naye features hain)
converter.html             ← Pro Converter (PDF / Vectorize / Remove BG / Color Lab)
mockups.html               ← Portfolio Mockup Library (174 scenes)
README.md                  ← updated, v11.0 section sabse upar
UPDATE-v11.0.md            ← changelog (Hinglish)
UPLOAD-TO-GITHUB.md        ← ye file
GITHUB-FINAL-SETUP.md      ← purana setup doc (reference)
assets/                    ← portfolio mockup SVGs + jpgs
js/                        ← mockups-data.js manifest
svg/                       ← vector assets
screenshots/               ← promo screenshots
converter-engine/          ← converter ka engine
desktop-app/               ← optional Electron wrapper (website ke liye zaroori nahi)
*.jpg                      ← gallery artwork images
LICENSE
```

> `desktop-app/` aur `converter-engine/` ko chhod bhi sakte ho — GitHub Pages sirf
> `index.html` + `converter.html` + `mockups.html` + `assets/` + `js/` + `svg/` use karta hai.

---

## 4. Update ke baad kya check karein (2 minute)

| Check | Kaise |
| --- | --- |
| Version | Studio kholo → **Help ▸ About** me `11.0` dikhna chahiye |
| Brush shelf | `B` dabao → canvas ke neeche brushes ki shelf aaye |
| Brush Studio | ⚙ button → 13 brushes + pressure preview |
| QuickShape | Brush se circle banao, end par 0.4 s hold → perfect circle |
| ColorDrop | Colors panel se color canvas par drag karo → fill |
| Guides | `U` → Properties me *2-pt Perspective* → V1/V2 drag |
| Vector eraser | Eraser → Properties me *Vector erase* ON → vector stroke par brush |
| Filters | **Filter** menu → Screentone / Gradient Map / Liquify / Focus Lines |
| Comic panels | **File ▸ Comic Panel Template…** |

Agar kuch purana dikh raha ho → hard refresh (Ctrl+Shift+R) ya incognito window.
GitHub Pages ka apna cache hota hai, 2–3 minute lag sakte hain.

---

## 5. Zaroori baat

- **`.artvision` project / autosave browser ke localStorage me** rehta hai — same browser + same domain par.
- Purane v10.3 ke project files v11.0 me khul jayenge (format same hai, naye flags optional hain).
- Sab kuch client-side hai — koi server, koi upload, koi API key nahi.
