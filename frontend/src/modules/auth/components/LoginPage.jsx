import { Link, useSearchParams, useNavigate } from 'react-router-dom'

// Use 127.0.0.1 when app is opened from 127.0.0.1 (Discord redirect_uri fix)
const API_URL = import.meta.env.VITE_API_URL || (typeof window !== 'undefined' && window.location.hostname === '127.0.0.1' ? 'http://127.0.0.1:4000' : 'http://localhost:4000')

export default function LoginPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const error = searchParams.get('error')
  const success = searchParams.get('success')
  const userJson = searchParams.get('user')
  let user = null
  try {
    if (userJson) user = JSON.parse(decodeURIComponent(userJson))
  } catch (_) {}
  if (success && userJson) {
    navigate(`/dashboard?user=${userJson}`, { replace: true })
    return null
  }

  return (
    <div className="min-h-screen w-full bg-[#0f0f14] flex flex-col items-center justify-center px-4 py-12">
      {error && (
        <div className="mb-4 px-4 py-2 rounded-lg bg-red-500/20 text-red-300 text-sm max-w-sm text-center">
          {error}
        </div>
      )}
      {success && user && (
        <div className="mb-4 px-4 py-2 rounded-lg bg-green-500/20 text-green-300 text-sm max-w-sm text-center">
          Logged in as {user.username}
        </div>
      )}
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 mb-8">
        <span className="w-10 h-10 rounded-lg bg-amber-400 flex items-center justify-center text-[#0f0f14] font-bold text-xl">
          T
        </span>
        <span className="text-2xl font-semibold text-white tracking-tight">
          Tribex
        </span>
      </Link>

      {/* Heading */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-10">
        Welcome to Command Center
      </h1>

      {/* Robot illustration placeholder */}
      <div className="w-40 h-48 sm:w-48 sm:h-56 flex flex-col items-center justify-end mb-10">
        <div className="relative">
          <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-[#facc15] border-4 border-amber-600 flex items-center justify-center">
            <div className="flex gap-2">
              <span className="w-4 h-4 rounded-full bg-blue-500" />
              <span className="w-4 h-4 rounded-full bg-blue-500" />
            </div>
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-16 sm:w-24 sm:h-20 rounded-lg bg-[#facc15] border-4 border-amber-600 flex items-center justify-center">
            <span className="text-2xl">💜</span>
          </div>
        </div>
        <div className="flex gap-1 mt-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <span key={i} className="w-1 h-2 bg-gray-600 rounded-full opacity-60" style={{ width: 3 }} />
          ))}
        </div>
      </div>

      {/* Login buttons */}
      <div className="flex flex-col gap-4 w-full max-w-sm">
        <a
          href={`${API_URL}/api/auth/discord`}
          className="flex items-center justify-center gap-3 w-full py-3.5 px-5 rounded-xl text-white font-semibold transition-opacity hover:opacity-95"
          style={{
            background: 'linear-gradient(90deg, #5865F2 0%, #7289da 100%)',
            boxShadow: '0 4px 14px rgba(88, 101, 242, 0.4)',
          }}
        >
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
          </svg>
          Login with Discord
        </a>
        <a
          href="#"
          className="flex items-center justify-center gap-3 w-full py-3.5 px-5 rounded-xl text-white font-semibold transition-opacity hover:opacity-95"
          style={{
            background: 'linear-gradient(90deg, #229ED9 0%, #2AABEE 100%)',
            boxShadow: '0 4px 14px rgba(42, 171, 238, 0.4)',
          }}
        >
          <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
          </svg>
          Login with Telegram
        </a>
      </div>
    </div>
  )
}
