# Vercel par deploy (Frontend + Backend)

Pehle **backend** deploy karo, phir **frontend** (taake frontend ka API URL backend ke URL se set ho sake).

---

## 1. Backend deploy (Vercel)

### Option A: Backend folder alag repo / alag project
1. [Vercel](https://vercel.com) → **Add New** → **Project**
2. **Import** karo: backend ka repo ya **Upload** se `tribex/backend` folder select karo.
3. **Root Directory** set karo: `backend` (agar poora tribex repo import kiya ho to).
4. **Build**: Vercel auto-detect karega. Koi extra build command mat daalo.
5. **Environment Variables** add karo:

   | Name | Value |
   |------|--------|
   | `DISCORD_CLIENT_ID` | Apna Discord Application ID |
   | `DISCORD_CLIENT_SECRET` | Apna Discord Client Secret |
   | `FRONTEND_URL` | Frontend ka URL, e.g. `https://tribex.vercel.app` (deploy ke baad update kar sakte ho) |

   `BACKEND_URL` optional hai – Vercel apne aap `VERCEL_URL` use karta hai.

6. **Deploy** karo. Deploy ke baad backend URL milega, e.g. `https://tribex-api.vercel.app`.

### Discord Developer Portal (backend deploy ke baad)
- **OAuth2** → **Redirects** → **Add Redirect**
- URL daalo: `https://<BACKEND_URL>/api/auth/discord/callback`  
  Example: `https://tribex-api.vercel.app/api/auth/discord/callback`
- **Save Changes**

---

## 2. Frontend deploy (Vercel)

1. Vercel → **Add New** → **Project**
2. **Import** karo: frontend ka repo ya `tribex` repo (root se frontend folder select karna hoga).
3. **Root Directory**: **`frontend`** (zaroor set karo — agar galat ho to `/dashboard` pe 404 aayega).
4. **Build**: `npm run build`, **Output**: `dist` (Vite default – usually auto-detect).
5. **Environment Variables** add karo:

   | Name | Value |
   |------|--------|
   | `VITE_API_URL` | Backend ka full URL, e.g. `https://tribex-api.vercel.app` |

6. **Deploy** karo.

---

## 3. Final links set karna

- **Backend** project mein jao → **Settings** → **Environment Variables**
  - `FRONTEND_URL` = frontend ka actual URL (e.g. `https://tribex.vercel.app`)
- **Redeploy** backend (env change ke baad).

---

## Monorepo (ek hi repo) se deploy

Agar `tribex` ek hi repo hai jisme `frontend` aur `backend` dono hain:

1. **Backend project (Vercel)**  
   - Same repo connect karo  
   - **Root Directory**: `backend`  
   - Baaki steps upar jaisa (env vars + Discord redirect)

2. **Frontend project (Vercel)**  
   - Same repo hi connect karo  
   - **Root Directory**: `frontend`  
   - `VITE_API_URL` = backend URL  
   - Deploy

---

## Quick commands (Vercel CLI)

```bash
# Backend
cd backend
vercel --prod

# Frontend (backend URL milne ke baad)
cd frontend
vercel -e VITE_API_URL=https://<your-backend>.vercel.app --prod
```

---

## Check list

- [ ] Backend deploy ho chuka hai, URL open ho raha hai (e.g. `/api/health` → `{"ok":true}`).
- [ ] Discord Redirect URI add hai: `https://<backend-url>/api/auth/discord/callback`.
- [ ] Frontend deploy ho chuka hai, `VITE_API_URL` backend URL pe set hai.
- [ ] Backend env mein `FRONTEND_URL` frontend URL se set hai.

---

## Agar `/dashboard` pe 404 aaye

**Option A – Root Directory = `frontend` (recommended)**  
1. **Vercel** → **tribex** (frontend) project → **Settings** → **General**  
2. **Root Directory** = **`frontend`** (empty mat chhorna).  
3. **Save** → **Deployments** → **Redeploy** (latest deployment pe ⋯ → Redeploy).  
4. Latest code push karke **new deployment** trigger karo (Redeploy purane commit se hota hai — push se naya deploy aata hai).

**Option B – Root Directory khali / repo root**  
Agar frontend project ka Root Directory **empty** hai ya **`.`** hai:  
1. **Settings** → **Build & Development**  
2. **Build Command**: `cd frontend && npm run build`  
3. **Output Directory**: `frontend/dist`  
4. Repo root par **`vercel.json`** add hai (SPA rewrites) — usi se `/dashboard` handle hoga.  
5. **Save** → **Redeploy**.

**Don’t forget:** Push karke **naya deploy** aane do; sirf Redeploy se purana commit dobara deploy hota hai.
