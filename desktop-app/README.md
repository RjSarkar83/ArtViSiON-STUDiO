# ArtViSiON STUDiO v4.5 — Desktop App (Windows .exe)

HTML wala pura editor ab **real Windows application** ban jayega — is folder me ready-to-build Electron project hai.

## Is folder me kya hai

| File | Kaam |
|---|---|
| `app.html` | Pura ArtViSiON STUDiO editor (single file — yahi asli app hai) |
| `main.js` | Electron window launcher |
| `package.json` | Build config (NSIS installer + portable .exe) |
| `build.bat` | **Double-click** → sab install + .exe build, kuch type nahi karna |
| `run.bat` | Bina build ke turant app chalao (dev mode) |

## .exe banana (3 steps, internet chahiye sirf pehli baar)

1. **Node.js LTS install karo** → https://nodejs.org (bas Next-Next-Done)
2. Is folder me **`build.bat` pe double-click** karo
   - Pehli baar ~2–5 min (Electron download) + build me 5–10 min lagenge
3. Ho gaya! `dist` folder khul jayega:
   - `ArtViSiON STUDiO Setup 4.5.0.exe` → installer (desktop shortcut banata hai)
   - `ArtViSiON STUDiO 4.5.0.exe` → portable (koi install nahi, direct chalta hai)

> Ya manually: is folder me terminal kholo → `npm install` → `npm run dist`

## Bina build ke turant chalana

`run.bat` double-click karo — app window khul jayegi (install ki zarurat nahi).

## Naya HTML version aaye to

Naye `ArtViSiON-Studio.html` ko is folder me copy karke naam `app.html` rakh do (purane ko replace karo) → dobara `build.bat` chalao. Bas.

## Honest baatein (pehli baar builder ke waqt)

- Internet sirf **pehli baar** chahiye (Electron ~100MB download hota hai). Uske baad offline build hoga.
- Antivirus kabhi-kabhi unsigned .exe pe warning deta hai — "More info → Run anyway" karo. Certificate sign karne se ye jata hai (paid, abhi zarurat nahi).
- Icon abhi default Electron ka hai — apna icon chahiye to `icon.ico` banake folder me daalo aur `package.json` ke `build.win` me `"icon": "icon.ico"` add karo.
