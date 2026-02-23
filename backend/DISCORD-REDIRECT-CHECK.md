# Discord "Invalid OAuth2 redirect_uri" – Live URL fix

**Zaroor:** Vercel par env add/change karne ke baad **Redeploy** karna zaroori hai, warna purana deployment purane env se chalता hai.

Request mein ye redirect ja raha hai (isiko Discord accept karega):

```
https://tribexserver.vercel.app/api/auth/discord/callback
```

## Discord par ye karo (step-by-step)

1. **Open:** https://discord.com/developers/applications  
2. **Us app ko kholo** jiska Client ID hai: **1475571792163766272**  
3. Left side se **OAuth2** → **Redirects** pe jao  
4. **Add Redirect** pe click karo  
5. Neeche diya hua URL **bilkul copy karo** (Ctrl+C). Kuch type mat karo, sirf paste karo:

   ```
   https://tribexserver.vercel.app/api/auth/discord/callback
   ```

6. Paste karke **Save Changes** zaroor dabao (nahi to add nahi hoga)  
7. 1–2 minute ruk kar phir live site se **Login with Discord** try karo  

## Check list

- [ ] Sahi application kholi hai? (Client ID 1475571792163766272)
- [ ] OAuth2 → Redirects pe ho?
- [ ] URL mein **https** hai (http nahi)?
- [ ] URL ke end par **slash (/) nahi** hai?
- [ ] Koi extra space (start/end) nahi hai?
- [ ] **Save Changes** click kiya?

## Redeploy zaroor karo (env change ke baad)

1. **Vercel** → **tribex_server** project → **Deployments**
2. Sabse upar wali (latest) deployment pe **⋯** (three dots) click karo
3. **Redeploy** choose karo → **Redeploy** confirm karo
4. 1–2 minute wait karo, phir **Login with Discord** try karo

Bina redeploy ke naye env vars use nahi hote.

---

## Vercel env

**Ab code `DISCORD_REDIRECT_URI` env use nahi karta** — redirect_uri hamesha `BACKEND_URL + '/api/auth/discord/callback'` se banta hai. So Vercel par **DISCORD_REDIRECT_URI** rakho ya hata do, dono theek. Sirf **BACKEND_URL** sahi hona chahiye: `https://tribexserver.vercel.app`.

---

## Agar redirect_uri sahi hai phir bhi "Invalid OAuth2 redirect_uri" aaye

Jab address bar mein **`/api/auth/discord/callback`** dikhe (sahi URL) par Discord phir bhi 400 de, to problem **Discord Developer Portal** par hai — Redirects list mein exact URL add nahi hai ya galat app.

**Ye karo:**

1. **Discord** → https://discord.com/developers/applications  
2. **Sahi app** kholo: **Tribex** (Client ID **1475571792163766272**).
3. **OAuth2** (left) → **Redirects**.
4. **Pehle saari redirects hata do** (Delete), phir **sirf ye ek add karo** (copy-paste, no typing):
   ```
   https://tribexserver.vercel.app/api/auth/discord/callback
   ```
5. **Save Changes** zaroor dabao — green "Saved" dikhna chahiye.
6. **2–3 minute wait** karo (Discord propagate karta hai), phir **incognito** ya naya tab se **Login with Discord** try karo.

**Check:** Redirects list mein **bilkul yehi** dikhna chahiye, bina trailing slash, bina space. Agar `http://` ya `/api/discord/` (bina auth) hai to delete karke sahi wala add karo.

---

## (Optional) Dono variants add karke try karo

Agar abhi bhi 400 aaye to dono add karke test karo:

1. `https://tribexserver.vercel.app/api/auth/discord/callback`
2. `https://tribexserver.vercel.app/api/auth/discord/callback/`

Save → 2 min wait → phir login try karo.
