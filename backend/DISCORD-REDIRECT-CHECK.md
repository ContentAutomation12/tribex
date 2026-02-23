# Discord "Invalid OAuth2 redirect_uri" – Live URL fix

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

## Vercel env (zaroor check karo)

Agar request mein **`/api/discord/callback`** ja raha hai (bina **`/auth/`**), matlab backend par **galat** `DISCORD_REDIRECT_URI` set hai.

1. **Vercel** → apna **backend** project → **Settings** → **Environment Variables**
2. **DISCORD_REDIRECT_URI** dhoondo:
   - Agar value **`.../api/discord/callback`** hai (auth nahi) → **Delete** karo **ya** sahi value set karo:  
     `https://tribexserver.vercel.app/api/auth/discord/callback`
   - Agar variable hi nahi hai to theek hai — code apne aap sahi URL bana leta hai.
3. Save karke **backend ko dobara deploy** karo (Redeploy).

Code mein ab safeguard hai: agar env par galat URL set hai to bhi use **sirf sahi path** (`/api/auth/discord/callback`) wala redirect bhejega. Phir bhi Vercel se galat env hata dena behtar hai.

---

## Agar phir bhi error aaye

Discord **do** redirect add kar sakta hai. Dono add karke try karo:

1. `https://tribexserver.vercel.app/api/auth/discord/callback`
2. `https://tribexserver.vercel.app/api/auth/discord/callback/`

Save → 2 min wait → phir login try karo.
