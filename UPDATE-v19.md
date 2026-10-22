# ArtViSiON STUDiO — UPDATE v19 (final)

**Aapke do points, dono done:**

1. **Software open hone par koi popup nahi** — seedha editor khulta hai.
2. **Mouse se click + khinchne par workspace move hota hai** (canvas piche khisakta hai).

Install: repo ka `index.html` **sirf is ek file se replace** karo. Sab kuch file ke andar inline hai —
koi alag `.js` upload nahi karna, internet ke bina bhi chalta hai. Rollback: purana `index.html` wapas.

---

## 1. Open karte hi koi popup nahi

| Pehle | Ab |
|---|---|
| Studio-home modal ("Kya banana hai?" 6 cards) | **Nahi** — seedha canvas + tools |
| Brand splash (2 sec logo screen) | **Nahi** |
| Purana 4-step launcher | **Nahi** |
| Start toast messages | **Nahi** |
| — | Studio home **chahiye to** ☰ Menu → "Studio home — click se shuru" |

Guidance gayab nahi hui, popup hata hai: right panel me **"Shuru karo · 5 steps"** card hamesha dikhta hai,
khaali canvas par chhota "Shuru karo" card aata hai.

## 2. Mouse se workspace move

**Move tool** (default) me:

- **Khaali jagah par click + drag** → poora workspace/canvas move (cursor `grab` / `grabbing`)
- **Kisi object par drag** → wahi object move (jaisa pehle tha)
- **Space + drag** ya **middle-button drag** → kahin se bhi workspace move
- **Marquee / Pen / Brush** par purana behaviour (selection draw, painting)
- **Wheel** = zoom · **Shift + wheel** = horizontal pan

Status bar hint bhi update: `Click=select · Khaali jagah par drag = workspace move · Shift+Click=multi-select …`

## 3. ☰ Menu me naya: "Naya kya hai — v19 update"

Ek jagah poora changelog — kya badla, kaise use karna hai. "Shuru karo" button se seedha photo picker khul jaata hai.

## 4. v18 ka user-friendly UI isi me hai

- Tool rail ke naam **11 px** (pehle 8.5 px) — "Marquee" jaise naam poore, **0 truncated**
- Right panel me **0 clipping**, scroll chalta hai
- Layers + Colours beginner ke liye **"Advanced — layers + colours"** button ke peeche (setting yaad rehti hai)
- Mobile: quick bar me icon + naam, toast neeche, koi horizontal scroll nahi
- Khaali canvas par "Shuru karo" card

---

## Verification — 42/42 pass, 0 console errors

Boot
- version 19.0 · open par koi popup nahi (home/splash/launcher/toast/modals) · reload par bhi nahi · editor seedha visible

Workspace move
- khaali jagah par drag → `panX +160, panY +80` exact · pan ke baad state clean
- object par drag → workspace **nahi** hilti
- Space+drag = pan · `grab` cursor · Marquee tool par pan **nahi**

UI
- 15 tools · 5-step card · **9 menus / 145 actions** · rail labels 11 px, 0 clipped · panel 0 overflow
- Advanced button · "Naya kya hai" panel khulta/band hota hai · menu se Studio home

Features
- Photo layer · **Remove BG 9,92,789 px cutout** · BG step tick · **Subject select 18,564 px** · Resize card
- Text tool · Filters dialog · **PNG / JPG / SVG / PDF — chaaron export download** · undo stack
- Empty-state card → Sample design load

Modes & mobile
- Studio → Pro → Simple → Studio · reload ke baad mode yaad · reload par popup nahi
- 390 px: popup nahi · koi horizontal scroll nahi · 5-step card maujood

## Files

- `index.html` — poora app (bas yehi replace karna hai)
- `UPDATE-v19.md` / `UPDATE-v19.html` — ye notes (html me screenshots)
