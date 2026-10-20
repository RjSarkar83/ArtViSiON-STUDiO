# Node.js 20 deprecation warning — kya hai aur fix

## Pehle: warning kahan se aa rahi hai
Tumhare build log me workflow ka naam hai **`pages build and deployment`**, path
`dynamic/pages/pages-build-deployment`.

Ye **GitHub ka apna built-in Pages pipeline** hai — tumhare repo ki koi file nahi.
Repo me `.github/workflows` folder hi nahi hai (branch `rj` par), isliye is warning ko
repo ke code se fix nahi kiya ja sakta.

Wo internal pipeline andar se `actions/upload-pages-artifact@v3` → `actions/upload-artifact@v4`
(Node 20) use karta hai. GitHub jab apna action update karega, warning khud chali jayegi.

**Zaroori:** warning hai, error nahi —
`completed success` — site deploy ho chuki hai. Ignore karna bilkul safe hai.

---

## Fix (optional): apna Pages workflow — zero warnings

Is folder me `.github/workflows/pages.yml` hai jo sab **Node 24** actions use karta hai:

| Action | Version | Runtime |
| --- | --- | --- |
| `actions/checkout` | **v7.0.1** | node24 |
| `actions/configure-pages` | **v6.0.0** | node24 |
| `actions/upload-pages-artifact` | **v5.0.0** | composite → `upload-artifact@v7.0.0` (node24) |
| `actions/deploy-pages` | **v5.0.1** | node24 |

### Lagane ke steps
1. GitHub par repo kholo → **Add file ▸ Create new file**.
2. File name me exactly likho: `.github/workflows/pages.yml`
   (slash type karne par folders apne aap ban jaate hain).
3. Is folder ki `pages.yml` ka content paste karo → **Commit changes** (branch `rj`).
4. **Settings ▸ Pages ▸ Build and deployment ▸ Source = `GitHub Actions`**
   (pehle `Deploy from a branch` tha — switch karna zaroori hai).
5. **Actions** tab → "Deploy Pages" workflow chalega → green tick aane par site live.

> Rollback: Settings ▸ Pages ▸ Source wapas `Deploy from a branch` (main/rj, /(root)) kar do.

### Workflow kya karta hai
- `rj` branch par har push par chalta hai (manual `workflow_dispatch` bhi).
- Poora repo root (`path: .`) artifact bana ke Pages par deploy karta hai.
- `.git` aur `.github` automatically exclude ho jaate hain (`upload-pages-artifact` default).
- Jekyll bypass hota hai (artifact as-is serve hota hai) — branch-deploy wala Jekyll step hata jata hai.
- `concurrency: pages` — ek waqt me ek hi deploy, purana cancel nahi hota (safe).
- `permissions`: `pages: write`, `id-token: write` (Pages deploy ke liye required).

### Version bump karna ho to
`actions/checkout@v7.0.1` jaisi lines me sirf version badal do — latest:
<https://github.com/actions/checkout/releases> ·
<https://github.com/actions/upload-pages-artifact/releases> ·
<https://github.com/actions/deploy-pages/releases>

---

## Alternative (sabse simple)
Kuch mat karo. Warning sirf log me dikhegi, deploy successful rahega.
