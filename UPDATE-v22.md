# ArtViSiON Studio — v22 Update

**Theme: Selection & Edit Toolkit — "jo bhi banao, usko delete / copy / cut / paste / adjust sab kar sako."**

v22 fixes the four selection problems you reported, and adds a visible action bar so nothing stays hidden in menus.

Files to upload to GitHub (root): **`index.html`** + this `UPDATE-v22.md` / `UPDATE-v22.html`.
Nothing else changed — `mockups.html`, `assets/`, `js/`, `svg/`, `converter.html`, `screenshots/` are untouched.

---

## The 4 problems → root cause → fix

| # | Aap ne kaha | Asli wajah (root cause) | v22 fix |
|---|---|---|---|
| 1 | "Selection delete nahi hoti / kuch bhi delete nahi hota" | App me **copy / cut / paste ka koi handler hi nahi tha**. `Delete` sirf *vector shapes* par kaam karta tha — pixel selection aur poora layer ignore ho rahe the. | `Delete`/`Backspace` ab smart hai: **selection ke pixels** hatao → warna **layer** delete. Whole raster/vector layer bhi delete (Delete key, layer panel, ☰ Menu). Sab undo-able. |
| 2 | "Marquee aur Lasso se copy/cut/paste nahi hota" | Marquee/lasso sirf mask banate the, unka content copy karne ka koi code nahi tha. | **Copy (Ctrl+C) · Cut (Ctrl+X) · Paste (Ctrl+V)** — marquee, lasso, wand, sab par. Paste hamesha **naya "Pasted" layer** banata hai (original safe), aur pasted hissa auto-selected aata hai → turant Move tool se drag kar sakte ho. Cut = copy + delete. |
| 3 | "Selection ke andar fill / feather / grow / shrink / adjust chahiye" | Function `deleteSelectionPixels` jaisa internal code tha, par UI se reachable nahi. | Selection bar me **Fill · Grow · Shrink · Feather · Invert · Layer (new layer from selection) · Adjust**. Colour adjust (`Ctrl+U`, Image → Adjust Colors) **sirf selection ke andar** lagta hai. |
| 4 | "Wand se select karne ke baad kuch dikhata nahi" | Wand/marquee selection ban jata tha lekin **koi control surface nahi hota tha** — user ko lagta tha kuch hua hi nahi. | **Floating Selection bar** (`SELECTION · 35,200 px` + 12 buttons) selection bante hi neeche aa jata hai, aur `Ctrl+D` / Done par chala jata hai. |

**Bonus fix (v22 me mila):** Move tool se selection ke andar drag karne par selection **content** move hota hai (float), pehle poora layer khisak jata tha. `Enter` se commit, `Esc` se safe commit, `Ctrl+Z` se undo.

---

## How to use (Hinglish, 3 steps)

1. **Select karo** — `M` marquee, `L` lasso, ya `W` magic wand se area choose karo.
2. **Neeche bar dekho** — `Fill`, `Delete`, `Copy`, `Cut`, `Paste`, `Grow`, `Shrink`, `Feather`, `Invert`, `Layer`, `Adjust`, `Done`.
3. **Move tool (`V`)** se selection ke andar drag = content shift; `Enter` = fix. `Ctrl+D` = deselect.

### Keyboard shortcuts

| Key | Kaam |
|---|---|
| `Ctrl+C` | Copy selection / shape |
| `Ctrl+X` | Cut selection / shape |
| `Ctrl+V` | Paste → naya layer |
| `Delete` / `Backspace` | Selection pixels delete → warna layer delete |
| `Ctrl+D` / `Esc` | Deselect |
| `Enter` | Floating selection commit |
| `Ctrl+U` | Adjust colours (selection ke andar) |
| `Ctrl+Z` / `Ctrl+Shift+Z` | Undo / Redo |

Edit menu me bhi ye sab milta hai: *Copy Selection / Shape, Cut Selection / Shape, Paste, Delete Selection Pixels, Fill Selection, Feather / Grow / Shrink, New Layer from Selection, Adjust Colours (inside selection), Delete Layer.*

---

## Purana sab intact (v13 → v21 regression)

* Default = **first simple & easy light UI** (Simple mode, orange-red `#F54927`), dark Studio skin optional.
* **No popup** on open (What's new sirf ☰ Menu se).
* Drag = **workspace pan**; 15 tools / 5 steps (Shuru Karo) panel jaise the.
* **Mockup library** — 174 scenes, 23 categories (`Mockups` quick-bar button, ☰ Menu, side card); `file://` par friendly fallback.
* Remove BG (on-device), Subject, Resize, Text, Filters, exports (PNG/JPG/SVG/PDF), frames, layers, animation — untouched.

---

## Verified (real browser tests, headless Chromium)

| Suite | Result |
|---|---|
| Selection core (marquee, bar, paste layer, delete, fill, grow/shrink, wand, menu) | **20/20 pass** |
| Bar buttons + lasso + shape copy/paste + last-layer protection | **13/13 pass** |
| Full v13→v21 regression (version, light UI, no popup, 15 tools, 174 mockups, drag pan, exports, mobile 390×844) | **21/21 pass** |
| Wand + Adjust/filters + float drag + new layer | **7/7 pass** |
| Selection-content move (float, Enter/Esc commit, undo) + bar layout 1500/1400/1280 px | **13/13 pass** |

**0 console errors** in every run. Sample proof numbers: delete `208,000 → 156,000` px (undo restores), copy+paste `4 → 5` layers, cut `208,000 → 182,800` px, fill exactly `13,000` px of `#F54927`, grow `13,000 → 14,416` then shrink back, wand selects `21,600` px, vector shape copy/paste `5 → 6` then delete.

---

## Install

1. GitHub repo me sirf **`index.html`** replace karo (aur ye `UPDATE-v22.*` files add kar do).
2. Hard refresh (`Ctrl+F5`).
3. Kuch bhi missing na ho — poora v13→v21 code isi single file me hai.

Made for beginners: click-first, English UI + Hinglish hints, koi hidden menu nahi.
