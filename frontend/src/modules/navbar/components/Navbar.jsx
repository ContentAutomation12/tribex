import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const location = useLocation()
  const links = [
    { label: 'Pricing', path: '/pricing' },
    { label: 'About', path: '/#about' },
    { label: 'Admin', path: '/#admin' },
    { label: 'Socials', path: '/#socials' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1E2A47] border-b border-[#1E2A47]/90 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - left */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <span className="w-9 h-9 rounded-lg bg-amber-400 flex items-center justify-center text-[#1E2A47] font-bold text-lg">
              T
            </span>
            <span className="text-xl font-semibold text-white tracking-tight">
              Tribex
            </span>
          </Link>

          {/* Links - right, no arrows */}
          <div className="flex items-center gap-8">
            {links.map(({ label, path }) => (
              path.startsWith('/#') ? (
                <a
                  key={label}
                  href={path}
                  className="text-white font-medium hover:text-amber-300 transition-colors"
                >
                  {label}
                </a>
              ) : (
                <Link
                  key={label}
                  to={path}
                  className={`font-medium transition-colors ${
                    location.pathname === path ? 'text-amber-300' : 'text-white hover:text-amber-300'
                  }`}
                >
                  {label}
                </Link>
              )
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
