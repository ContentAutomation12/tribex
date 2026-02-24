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

**Sabse pehle – Production vs Project Settings warning:**  
Agar Vercel par dikhe: *"Configuration Settings in the current Production deployment differ from your current Project Settings"*, to **live abhi purani settings use kar raha hai**. Naye rewrites tabhi chalenge jab **current project settings** se **naya deploy** hoga.

**Kya karna hai (step-by-step):**

1. **Settings** → **Build and Deployment** pe jao.
2. **Root Directory** check karo: **`frontend`** hona chahiye. Agar sahi hai to **Save** dabao.
3. **"Production Overrides"** wala section **expand** karo (jahan deployment URL dikhta hai).
4. Wahan **Redeploy** / **Use current project settings** jaisa option ho to use karo, **ya** neeche step follow karo.
5. **Deployments** tab pe jao → sabse upar wali (latest) deployment pe **⋯** (three dots) → **Redeploy**.
6. **Redeploy** karte waqt agar option ho to **"Use existing Build Cache"** **OFF** karo (clean build ke liye).
7. Deploy **complete** hone ka wait karo (1–2 min), phir **incognito** window mein `https://tribex.vercel.app/dashboard` khol ke check karo.

**Option A – Root Directory = `frontend` (recommended)**  
- **Root Directory** = **`frontend`** (empty mat chhorna).  
- Latest code **push** karke **new deployment** aane do (sirf Redeploy purane commit se hota hai).

**Option B – Root Directory khali / repo root**  
Agar frontend project ka Root Directory **empty** hai ya **`.`** hai:  
1. **Build Command**: `cd frontend && npm run build`  
2. **Output Directory**: `frontend/dist`  
3. Repo root par **`vercel.json`** add hai (SPA rewrites).  
4. **Save** → **Redeploy** (production overrides sync karke).
