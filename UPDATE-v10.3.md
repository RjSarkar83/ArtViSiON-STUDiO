# ArtViSiON STUDiO — v10.3 (20 Oct 2026)

## 1. Vector files ab pixelate nahi hote
Purana viewport document-resolution `comp` canvas ko zoom se scale karke blit karta tha —
100 % se upar har zoom par edges stair-step ho jate the.

v10.3 model se seedha device resolution par paint karta hai:

| Case | Renderer |
| --- | --- |
| zoom < 1.25× | cached composite blit (jaisa tha) |
| zoom ≥ 1.25×, ≤ 600 shapes | direct vector paint to screen |
| zoom ≥ 1.25×, heavy artwork | off-screen tile at `zoom × DPR`, 30 % margin |
| gesture ke dauran | tile 1:1 blit (sharp) / composite |
| gesture ke baad (~180 ms) | full-resolution repaint |

Test: `shapes_cdr7.cdr` ka pink star 600 % par — pehle jagged, ab clean antialiased.
`09-Visiting Card.cdr` (1,129 paths / 30,242 nodes) par pan ke dauran ~50 ms/frame
headless software-renderer me, cached tile ke saath.

## 2. Current app versions (20 Oct 2026 tak verified)

| App | Version | Route |
| --- | --- | --- |
| CorelDRAW Graphics Suite | 2026 (v27.2) | `.cdr` `.cdt` native engine |
| Adobe Photoshop | 2026 (v27.11) | `.psd` `.psb` — 8/16-bit, RGB/Gray/CMYK, Raw+RLE |
| Adobe Illustrator | 2026 (v30.8.1) | `.ai` `.pdf` |
| Affinity by Canva | 3.3.1 | `.svg` `.pdf`, `.af` detect + export hint |
| Canva | current web | `.svg` `.pdf` `.png` |

In-app reference: **Help ▸ Supported apps & formats… 🧩**

## 3. Photoshop PSB / 16-bit / CMYK
`decodePSD` replace hua `psdDecode` se:
- PSB (version 2) — layer/mask section 64-bit length, RLE row counts UInt32
- 16-bit channels (big-endian samples → 8-bit output)
- CMYK (with K channel) aur Grayscale
- Raw + PackBits RLE, defensive size limits (30k px PSD / 300k px PSB, 120 MP)

## 3b. Layer FX / groups bhi sharp
Shadow, glow aur outline pehle layer ko **document resolution** par rasterize karte the —
200%+ par FX wali layer blurry dikhti thi. Ab FX layer apne bounds ke andar
device-resolution buffer me banti hai, aur group layer apne children ko usi tarah render karta hai.

## 4. Chhote fixes
- File picker: `.psd .psb .af .afdesign .afphoto` accepted
- `.af` file drop par saaf message (Affinity closed container hai)
- Help dialog v10.3 + formats section
- `setPointerCapture` guarded — cancelled/stale pointer se stroke beech me nahi tootta
- Toast stack max 4 — Ctrl+Z hold karne par screen bhar nahi jaati
