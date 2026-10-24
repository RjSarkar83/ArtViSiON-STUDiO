# BEFORE → AFTER — ArtViSiON Studio UI 2026

**Kya hua:** website ka poora editor chrome (top bar, tool rail, right inspector, bottom dock, mobile dock,
modals/overlays, converter + mockup overlays) naye design system par shift ho gaya — **bina ek bhi feature ya
tool hataye**. Sirf duplicacy aur repetition saaf ki gayi hai.

---

## 1. Ek nazar me (numbers)

| Cheez | Before | After |
|---|---|---|
| Design layer | nahi thi (har v12–v25 IIFE apna late `<style>` inject karta tha, rules aapas me ladte the) | 1 authored source → 1 built sheet (`assets/ui/studio-ui.css`, 1,887 lines, 535 rules) |
| Chrome ko live rakhta kaun | koi nahi — app ka re-render custom UI ko overwrite kar deta tha | `keepLast()` MutationObserver (re-inject) + build-time `!important` lock (1,910 locks) |
| Behaviour layer | 0 | `assets/ui/studio-ui.js` (502 lines, `window.__AVUI26`) |
| Top bar | 8–10 elements bina order ke, breakpoint par scramble | ek fixed order (logo → Menu → artboard tabs → mode → quick → panel) |
| Phone top bar | do rows me label toota hua, logo ke saath Menu chip sookh raha tha | 1 row: logo · Menu · mode pill · Export · Properties + neeche full-width artboard row |
| Tool rail | bade text labels, "More tools" par kat raha tha | icon-first compact rail, hover/sheet fallback, Pro/Studio me extra tools visible |
| Right panel | legacy dark card, adhoori styling | Design / Layers / Colour / More tabs, sab responsive |
| Mobile | kuch bhi overflow, `Actions` FAB nahi | bottom tool dock + `⌘ Actions` bottom-sheet + inspector bottom-sheet |
| Converter overlay | page ka duplicate header frame ke andar | `?embed=1` → `html.av-embed` (header/topnote/footer hidden), phone par scrollable mode tabs |
| Mockups overlay | same problem | same fix + mobile results-bar auto-scroll |

Files jo actually badle (vs pristine repo):

```
index.html        +608 B    (UI layer inject, embed=1 iframes, top-bar order)
converter.html    −103 KB   (duplicate inline assets/logo dedupe, QoL tail script, embed mode)
mockups.html      +9.8 KB   (skin, embed mode, mobile scroll QoL)
assets/ui/studio-ui.css   NEW   ~84 KB  (built sheet — last load, `#avui-css`)
assets/ui/studio-ui.js    NEW   ~25 KB  (behaviour layer)
```

---

## 2. Design decisions (locked)

- **Light neutral default** (`--bg #eef0f4`, `--card #fff`, `--hair #e3e7ee`, `--txt #0f1419`, `--mut #5a6472`),
  dark theme `html.av-dark` optional.
- **Ek accent** — brand `#f54927` + `--brand-grad` (135°, #ff7a45 → #f54927 → #dc3716). Koi doosra colour nahi.
- Radii 6 / 9 / 12 / 16 / 20 — ek hi scale, poore app me.
- Touch targets ≥ 40 px (coarse pointer par 44 px), inputs ≤700 px par 16 px (iOS zoom fix).
- Motion 140 ms, `prefers-reduced-motion` respect.
- Inspector tabs: **Design · Layers · Colour · More** — "More" ek panel-launcher hub hai
  (All tools, History, Shortcuts, Brand kit, Export, Pro mode) — purane menu items yahan se bhi khulte hain.

## 3. Responsive behaviour

| Breakpoint | Kya hota hai |
|---|---|
| > 1180 px (laptop/desktop) | poora chrome: floating dock `#av12bar`, right panel pinned, tool rail expanded |
| 1181–1440 px | dock low-frequency buttons mid-width par hide, baaki sheet me |
| ≤ 1180 px (tablet) | right panel overlay ho jata hai, wordmark visible, dock compact |
| ≤ 900 px (phone) | top bar 2 rows (logo · Menu · mode · Export · Properties / artboard tabs), bottom tool dock + `Actions` FAB, panel bottom-sheet, modals bottom-sheet |
| landscape phone (`max-height:520px`) | top bar 46 px, tool rail horizontal scroll |

## 4. Verification (jeeta hua, dhoka nahi)

- **9 viewports** (phone-sm, phone, phone-land, tab-port, tab-land, tab10, laptop-sm, laptop, desktop) →
  `overflowX = false` sab par, **0 page errors**, device label (phone/tablet/laptop/desktop) sahi detect.
- **20/20 functional checks** (`functest.py`): dock ke 9 actions, help/export, 4 inspector tabs,
  Menu sheet + classic-bar switch, save→download, converter overlay (sahi tool par khulta hai + `av-embed`),
  mockup library (174 scenes render).
- **194/231 click-audit actions** visible response dete hain; baaki 37 known false-negatives
  (same-state re-render / panel-content-only change — `dbg_actions.py` se triage) — inme 0 crash, 0 page error.
- Screenshots: `compare/*-pair.png` (before left, after right), `shots13/` (9 viewports), `dlg/`, `feat/`, `flows/`.

## 5. GitHub par kaise daalein

1. ZIP extract karo → `ArtViSiON-STUDiO/` folder milega.
2. Repo (`rjsarkar83/ArtViSiON-STUDiO`, branch `rj`) me ye files replace karo:
   `index.html`, `converter.html`, `mockups.html`, aur naya folder `assets/ui/` (2 files).
3. `.git` ke saath push karna ho to:
   ```bash
   git add index.html converter.html mockups.html assets/ui
   git commit -m "UI 2026: design system layer + responsive chrome (no feature removed)"
   git push origin rj
   ```
4. Baaki files (assets/, desktop-app/, converter-engine/, docs) waise hi rakho — unme kuch nahi badla.

> **Rollback:** purane 3 HTML files wapas rakho aur `assets/ui/` folder hata do. Kuch aur nahi.

## 6. Optional cleanup (main stream se hataya NAHI hai)

Ye files repo me padi hain par runtime me kahin reference nahi hoti — chaho to alag commit me hata sakte ho:

| File/dir | Size | Note |
|---|---|---|
| `art_*.jpg` (21 files) | 6.2 MB | index.html / js me 0 reference |
| `converter-engine/samples/demo.tiff` | 6.7 MB | CLI sample input, web app use nahi karta |
| `svg/` (126 files) | 664 KB | sirf docs me mention, app `assets/mockups/*.svg` use karta hai |
| `UPDATE-v19/v22/v24/v25.html` | 2.4 MB | app code ke purane snapshot, deploy root se serve ho jaate hain |
| `ArtViSiON-Studio.html` | 813 KB | index.html ka purana single-file version |
| `desktop-app/converter.html` | 1.6 MB | root `converter.html` ka duplicate (Electron path check karke hatao) |

**Mockup SVGs (`assets/mockups/*.svg`, 174 scenes) kabhi na hatao** — Electron IPC aur library inhi par chalti hai.

## 7. Kya nahi chhua (jaan-boojh kar)

- Sab tools, sab dock actions, sab menus, converter ke saare tabs/formats, mockup library ke 174 scenes —
  sab intact, sirf UI shell badla.
- `converter-engine/`, `desktop-app/`, `js/mockups-data.js`, `assets/` — zero change.
- Koi CDN/font/script bahar se nahi add kiya (offline + Electron safe).
