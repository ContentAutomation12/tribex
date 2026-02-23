import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'

const WELCOME_DISMISSED_KEY = 'tribex_welcome_dismissed'

export default function DashboardPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [user, setUser] = useState(null)
  const [showWelcome, setShowWelcome] = useState(true)
  const [dontShowAgain, setDontShowAgain] = useState(false)
  const [checkedAuth, setCheckedAuth] = useState(false)

  useEffect(() => {
    const userJson = searchParams.get('user')
    if (userJson) {
      try {
        const u = JSON.parse(decodeURIComponent(userJson))
        setUser(u)
        if (typeof window !== 'undefined') {
          window.sessionStorage.setItem('tribex_user', JSON.stringify(u))
        }
      } catch (_) {}
    } else if (typeof window !== 'undefined') {
      const stored = window.sessionStorage.getItem('tribex_user')
      if (stored) setUser(JSON.parse(stored))
    }
    setCheckedAuth(true)
  }, [searchParams])

  useEffect(() => {
    if (!checkedAuth) return
    const hasUser = user || (typeof window !== 'undefined' && window.sessionStorage.getItem('tribex_user'))
    if (!hasUser) navigate('/login', { replace: true })
  }, [checkedAuth, user, navigate])

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage.getItem(WELCOME_DISMISSED_KEY) === 'true') {
      setShowWelcome(false)
    }
  }, [])

  const closeWelcome = () => {
    if (dontShowAgain && typeof window !== 'undefined') {
      window.localStorage.setItem(WELCOME_DISMISSED_KEY, 'true')
    }
    setShowWelcome(false)
  }

  const hasUser = user || (typeof window !== 'undefined' && window.sessionStorage.getItem('tribex_user'))
  if (checkedAuth && !hasUser) return null

  return (
    <div className="min-h-screen flex bg-[#1a1a24]">
      {/* Left Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-[#252530] border-r border-[#333] flex flex-col items-center py-6 px-4">
        <div className="w-12 h-12 rounded-full bg-amber-400 flex items-center justify-center text-[#1a1a24] font-bold text-xl mb-4">
          T
        </div>
        <div className="w-full bg-[#333] rounded-lg h-9 mb-6" />
        <div className="flex items-center gap-2 text-gray-300 text-sm mb-6">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
          </svg>
          <span>Logged in with Discord</span>
        </div>
        <button type="button" className="w-12 h-12 rounded-xl bg-[#3a3a4a] flex items-center justify-center text-white text-2xl hover:bg-[#4a4a5a] transition-colors mb-8">
          +
        </button>
        <nav className="w-full space-y-1">
          <a href="#premium" className="block py-2 px-3 text-gray-300 rounded-lg hover:bg-[#333] text-sm">Premium Services</a>
          <a href="#core" className="block py-2 px-3 text-gray-300 rounded-lg hover:bg-[#333] text-sm">Tribex Core</a>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col relative min-h-screen bg-[#1a1a24]">
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 relative">
          {/* Wave pattern at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-48 opacity-30 overflow-hidden">
            <div className="absolute inset-0" style={{
              backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(139, 92, 246, 0.3) 40px, rgba(139, 92, 246, 0.3) 41px)',
              transform: 'skewY(-3deg) scale(1.2)',
            }} />
          </div>

          {/* 3D cube-style graphic */}
          <div className="relative z-10 w-48 h-48 sm:w-56 sm:h-56 mb-8 flex items-center justify-center">
            <div className="absolute inset-0 flex flex-wrap gap-1 justify-center items-center max-w-[180px]">
              {[...Array(27)].map((_, i) => (
                <div key={i} className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-amber-400/60 bg-purple-900/40 rounded-sm" style={{ opacity: 0.6 + (i % 3) * 0.15 }} />
              ))}
            </div>
          </div>

          <p className="text-gray-300 text-center text-lg mb-1">You don&apos;t have any servers connected yet.</p>
          <p className="text-gray-400 text-center mb-8">Start your first Tokenized Community with us!</p>
          <button type="button" className="px-8 py-3 rounded-lg bg-[#facc15] text-gray-900 font-semibold hover:bg-[#fde047] transition-colors">
            Connect bot
          </button>
        </div>
      </main>

      {/* Welcome Modal */}
      {showWelcome && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60" onClick={closeWelcome}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden flex flex-col sm:flex-row" onClick={(e) => e.stopPropagation()}>
            <div className="flex-1 p-8 sm:p-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Tribex&apos;s network of communities</h2>
              <p className="text-gray-700 mb-2">The #1 tokenized community management tool since 2020!</p>
              <p className="text-gray-600 text-sm mb-4">Tribex simplifies membership management with automated qualification checks. Utilize tokens on 24+ blockchains, manage staked tokens, implement advanced token-gating rules with ease, and more!</p>
              <ol className="list-decimal list-inside text-gray-700 text-sm space-y-2 mb-4">
                <li>Create roles in Discord, then return to this page and refresh</li>
                <li>Review step-by-step directions for how to create a token-granted role (TGR)</li>
                <li>Go to the Miniapps tab to supercharge your Tribex bot with new one-click install miniapps like POAP, Role Composition, Kudos, and Guest Pass. Free for a limited time!</li>
              </ol>
              <p className="text-gray-600 text-sm mb-4">
                For Bot Updates: <a href="https://discord.gg" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Join our Discord</a> and <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Follow us on Twitter</a>
              </p>
              <label className="flex items-center gap-2 text-sm text-gray-600 mb-4 cursor-pointer">
                <input type="checkbox" checked={dontShowAgain} onChange={(e) => setDontShowAgain(e.target.checked)} className="rounded" />
                <span>Don&apos;t show this again</span>
              </label>
              <button
                type="button"
                className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-[#7c3aed] text-white font-semibold hover:bg-[#6d28d9] transition-colors"
                onClick={closeWelcome}
              >
                Ok, got it
              </button>
            </div>
            <div className="w-full sm:w-72 flex-shrink-0 bg-[#bae6fd] flex items-center justify-center p-8">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-[#facc15] border-4 border-amber-600 flex items-center justify-center">
                <div className="flex gap-2">
                  <span className="w-4 h-4 rounded-full bg-blue-500" />
                  <span className="w-4 h-4 rounded-full bg-blue-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
