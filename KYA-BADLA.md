# ArtViSiON STUDiO — v11.0 FINAL · kya-kya badla

Is package me **sirf v11.0 update ki files** hain (8 files). Baaki repo — `converter.html`,
`mockups.html`, `assets/` (174 SVGs), `js/`, `svg/`, `screenshots/`, `converter-engine/`, `desktop-app/`,
`LICENSE` — **bilkul waisa hi rahega**, use chhedne ki zaroorat nahi.

| # | File | Status | Kya karna hai |
|---|---|---|---|
| 1 | `index.html` | **updated** v10.3 → **v11.0** | repo root me replace |
| 2 | `ArtViSiON-Studio.html` | **updated** v9.9 → v11.0 | repo root me replace |
| 3 | `README.md` | **updated** (v11.0 features table) | repo root me replace |
| 4 | `UPDATE-v11.0.md` | **naya** — Hinglish changelog | root me add |
| 5 | `UPLOAD-TO-GITHUB.md` | **naya** — deploy guide | root me add (optional) |
| 6 | `.github/workflows/pages.yml` | **naya** — Node 24 Pages workflow (deprecation warning fix) | `.github/workflows/` path par add |
| 7 | `WORKFLOW-FIX.md` | **naya** — warning ka explanation + steps | root me add (optional) |
| 8 | `KYA-BADLA.md` | **naya** — yehi list | root me add (optional) |

## Upload — do raste

### A) Sirf code update (recommended)
1. Files **1–3** repo root me replace karo.
2. Files **4–5** root me add karo.
3. File **6** `.github/workflows/pages.yml` par add karo
   (GitHub UI: *Add file ▸ Create new file* → naam me `.github/workflows/pages.yml` type karo).
4. Commit → push.

### B) Deploy ke liye
- **Simple (jo abhi chal raha hai):** Settings ▸ Pages ▸ Source = `Deploy from a branch` → `rj` → `/(root)`.
  Is case me `.github/workflows/pages.yml` ko ignore karo (warning aati rahegi, deploy fir bhi success).
- **Zero warnings:** Settings ▸ Pages ▸ Source = **`GitHub Actions`** kar do — naya workflow sab Node 24 actions use karta hai.

## Verify (2 min)
- Studio kholo → **Help ▸ About** me `11.0`
- `B` dabao → canvas ke neeche brush shelf
- `U` → Drawing Guides → *2-pt Perspective*
- Filter menu → Screentone / Gradient Map / Liquify / Focus Lines
- File menu → Comic Panel Template
- Site par **Ctrl+Shift+R** (GitHub Pages cache)
