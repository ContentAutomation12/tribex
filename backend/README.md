# Tribex Backend

Node.js backend with Discord OAuth2 login.

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Discord Application (required for Login with Discord)**
   - Go to [Discord Developer Portal](https://discord.com/developers/applications)
   - Open your application (or create one) → **OAuth2** → **Redirects**
   - Click **Add Redirect** and paste this **exact** URL (no space, no trailing slash):
     ```
     http://localhost:4000/api/auth/discord/callback
     ```
   - Click **Save Changes**
   - Copy **Application ID** (Client ID) and **Client Secret** from **OAuth2** → **General**

   **If you see "Invalid OAuth2 redirect_uri":** The backend now sends `127.0.0.1` (not localhost) by default for Discord:
     1. In **Discord** → OAuth2 → Redirects: remove all, add **only** `http://127.0.0.1:4000/api/auth/discord/callback` → Save.
     2. **Restart the backend** (Ctrl+C then `npm run dev`). No .env change needed.
     3. Try Login with Discord again (from localhost:5173 or 127.0.0.1:5173).

3. **Environment**
   ```bash
   cp .env.example .env
   ```
   Edit `.env`:
   ```
   DISCORD_CLIENT_ID=your_application_id
   DISCORD_CLIENT_SECRET=your_client_secret
   BACKEND_URL=http://localhost:4000
   FRONTEND_URL=http://localhost:5173
   PORT=4000
   ```

4. **Run**
   ```bash
   npm run dev
   ```
   Backend runs at `http://localhost:4000`.

## API

- **GET /api/auth/discord** – Redirects user to Discord login. After login, Discord redirects to callback.
- **GET /api/auth/discord/callback** – Exchanges code for token, fetches user, redirects to frontend `/login?success=1&user=...` or `?error=...`.
- **GET /api/health** – Health check.

## Frontend

Ensure frontend points to this backend: set `VITE_API_URL=http://localhost:4000` in frontend `.env` (or it defaults to that). "Login with Discord" will open Discord and then return to your app.
