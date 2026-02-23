import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import axios from 'axios'

const app = express()
const PORT = process.env.PORT || 4000
// On Vercel: use BACKEND_URL or auto https://VERCEL_URL
const BACKEND_URL = (process.env.BACKEND_URL || (process.env.VERCEL ? `https://${process.env.VERCEL_URL}` : null) || `http://localhost:${PORT}`).trim().replace(/\/$/, '')
const FRONTEND_URL = (process.env.FRONTEND_URL || 'http://localhost:5173').trim().replace(/\/$/, '')
const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID?.trim()
const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET?.trim()

app.use(cors({ origin: FRONTEND_URL, credentials: true }))
app.use(express.json())

const DISCORD_AUTHORIZE_URL = 'https://discord.com/api/oauth2/authorize'
const DISCORD_TOKEN_URL = 'https://discord.com/api/oauth2/token'
const DISCORD_USER_URL = 'https://discord.com/api/users/@me'
const SCOPES = 'identify email'
// Discord redirect_uri: hamesha BACKEND_URL se banao (env ignore — typo se bachne ke liye)
const DISCORD_REDIRECT_URI = process.env.VERCEL
  ? `${BACKEND_URL}/api/auth/discord/callback`
  : (String(PORT) === '4000' ? `http://127.0.0.1:4000/api/auth/discord/callback` : `${BACKEND_URL}/api/auth/discord/callback`)
const getRedirectUri = () => DISCORD_REDIRECT_URI

// Start Discord OAuth: redirect user to Discord (always use /api/auth/discord/callback as redirect_uri)
const handleDiscordOAuthStart = (req, res) => {
  if (!DISCORD_CLIENT_ID) {
    return res.status(500).json({ error: 'Discord OAuth not configured. Set DISCORD_CLIENT_ID in .env' })
  }
  const redirectUri = getRedirectUri()
  const state = req.query.state || ''
  const params = new URLSearchParams({
    client_id: DISCORD_CLIENT_ID,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: SCOPES,
  })
  if (state) params.set('state', state)
  const url = `${DISCORD_AUTHORIZE_URL}?${params.toString()}`
  res.redirect(url)
}
app.get('/api/auth/discord', handleDiscordOAuthStart)
// Safety: agar koi /api/discord hit kare (purana link/cache), tab bhi sahi redirect_uri bhejenge
app.get('/api/discord', handleDiscordOAuthStart)

// Discord callback: exchange code for token, get user, redirect to frontend
app.get('/api/auth/discord/callback', async (req, res) => {
  const { code, error } = req.query
  if (error) {
    return res.redirect(`${FRONTEND_URL}/login?error=${encodeURIComponent(error)}`)
  }
  if (!code) {
    return res.redirect(`${FRONTEND_URL}/login?error=no_code`)
  }
  if (!DISCORD_CLIENT_ID || !DISCORD_CLIENT_SECRET) {
    return res.redirect(`${FRONTEND_URL}/login?error=server_config`)
  }

  const redirectUri = getRedirectUri()

  try {
    const tokenRes = await axios.post(
      DISCORD_TOKEN_URL,
      new URLSearchParams({
        client_id: DISCORD_CLIENT_ID,
        client_secret: DISCORD_CLIENT_SECRET,
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
      }).toString(),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
    )
    const { access_token } = tokenRes.data

    const userRes = await axios.get(DISCORD_USER_URL, {
      headers: { Authorization: `Bearer ${access_token}` },
    })
    const user = userRes.data

    // Redirect to frontend with success; you can pass user in query or set httpOnly cookie
    const payload = encodeURIComponent(JSON.stringify({
      id: user.id,
      username: user.username,
      discriminator: user.discriminator,
      avatar: user.avatar,
      email: user.email,
    }))
    res.redirect(`${FRONTEND_URL}/dashboard?user=${payload}`)
  } catch (err) {
    const message = err.response?.data?.error_description || err.message || 'auth_failed'
    res.redirect(`${FRONTEND_URL}/login?error=${encodeURIComponent(message)}`)
  }
})

// Health check
app.get('/api/health', (req, res) => {
  res.json({ ok: true, service: 'tribex-backend' })
})

// Debug: exact redirect_uri we send to Discord (compare with Discord Developer Portal)
app.get('/api/auth/discord/redirect-uri', (req, res) => {
  res.json({
    redirect_uri: DISCORD_REDIRECT_URI,
    hint: 'This must EXACTLY match the URI in Discord Developer Portal → OAuth2 → Redirects',
  })
})

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Tribex backend running at ${BACKEND_URL}`)
    console.log(`Discord redirect_uri: ${DISCORD_REDIRECT_URI}`)
    if (!DISCORD_CLIENT_ID) {
      console.warn('DISCORD_CLIENT_ID not set. Add it to .env to enable Login with Discord.')
    }
  })
}

export default app
