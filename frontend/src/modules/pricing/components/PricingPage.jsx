import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CHECK_ICON = (
  <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
)

const plansSet1 = [
  {
    name: 'Starter',
    features: [
      'Up to 25 Verified Members',
      'Balance checks every 24 hours',
      'Create roles from assets on 50+ blockchains*',
      '35+ wallets supported, including Delegate, OpenSea, WalletConnect*',
      'Members can verify using multiple wallets',
      'ETH Event Listener: Real-time balance checks for ETH Mainnet',
      'Standard Support for our privacy-first, safety-focused verification',
    ],
    price: null,
    period: null,
    cta: 'Subscribe Now',
  },
  {
    name: 'Basic',
    features: [
      'Up to 100 Verified Members',
      'Priority Lite Support',
      'Plus all features from STARTER included',
    ],
    price: '$17.99 USD',
    period: 'Monthly',
    cta: 'Subscribe Now',
  },
  {
    name: 'Premium',
    features: [
      'Up to 1000 Verified Members',
      'PRO miniapps, including Role Composition (AND/OR conditions) and POAP distribution within your server',
      { text: 'Metaplex Core NFTs Support', tag: 'NEW' },
      { text: 'Compressed NFTs Support', tag: 'NEW' },
      'Staking Contract Support**',
      'Priority Support',
      'Plus all features from STARTER + BASIC included',
    ],
    price: '$35 USD',
    period: 'Monthly',
    cta: 'Subscribe Now',
  },
]

const plansSet2 = [
  {
    name: 'Exclusive',
    features: [
      'Up to 2500 Verified Members',
      '5 Bonus admin-initiated balance checks monthly',
      'Dedicated support human',
      "Customize your Discord verification channel's Let's go! message",
      'Opt-out feature for community messages',
      'Solana Event Listener: Real-time balance checks for Solana',
      { text: 'SmartTag: Peer-to-peer onchain transactions for your whole community, in one place', highlight: true },
      'Plus all features from STARTER + BASIC + PREMIUM included',
    ],
    price: '$149 USD',
    period: 'Monthly',
    cta: 'Subscribe Now',
  },
  {
    name: 'Elite',
    features: [
      'Up to 7500 Verified Members',
      { text: 'Customized AI Quiz Agent: Drive engagement with AI generated quizzes from your content in Discord; award points to token gate roles, channels, and perks - or to power future TGEs and token drops', tag: 'NEW' },
      { text: 'Partner Spotlight on Tribex Website', tag: 'NEW' },
      'Plus all features from EXCLUSIVE included',
    ],
    price: '$449 USD',
    period: 'Monthly',
    cta: 'Subscribe Now',
  },
  {
    name: 'Enterprise',
    features: [
      'Unlimited Verified Members',
      'White label (with sub-features: Change the bot\'s username, Change logo)',
      'Personalized features on demand',
      'Dedicated support slack channel',
      'Plus all features from ELITE included',
    ],
    price: null,
    period: null,
    cta: 'Contact Us',
  },
]

const planSets = [plansSet1, plansSet2]

// All 6 plans in one array for one-by-one carousel
const allPlans = [...plansSet1, ...plansSet2]

export default function PricingPage() {
  const navigate = useNavigate()
  const [platform, setPlatform] = useState('Discord')
  // Carousel: show 3 cards at a time, one arrow click = slide by 1 (index 0..3)
  const [slideIndex, setSlideIndex] = useState(0)
  const maxSlideIndex = allPlans.length - 3 // 3 cards visible, so index 0..3

  const goPrev = () => setSlideIndex((i) => (i <= 0 ? 0 : i - 1))
  const goNext = () => setSlideIndex((i) => (i >= maxSlideIndex ? maxSlideIndex : i + 1))
  const goToLogin = () => navigate('/login')

  return (
    <section id="pricing" className="min-h-[calc(100vh-4rem)] w-full bg-[#191942] py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#FFD700] mb-3">
            Subscription Plans
          </h1>
          <p className="text-[#FFD700]/90 text-base sm:text-lg max-w-2xl mx-auto">
            No hidden fees. No surprises. Start for free and upgrade as you grow.
          </p>
        </div>

        {/* Platform Toggle */}
        <div className="flex justify-center mb-10 sm:mb-12">
          <div className="inline-flex rounded-lg bg-gray-700/50 p-1 gap-0">
            <button
              type="button"
              onClick={() => setPlatform('Discord')}
              className={`px-6 py-2.5 rounded-md text-sm font-medium transition-colors ${
                platform === 'Discord'
                  ? 'bg-[#FFD700] text-gray-900'
                  : 'text-white hover:bg-gray-600/50'
              }`}
            >
              Discord
            </button>
            <button
              type="button"
              onClick={() => setPlatform('Telegram')}
              className={`px-6 py-2.5 rounded-md text-sm font-medium transition-colors ${
                platform === 'Telegram'
                  ? 'bg-[#FFD700] text-gray-900'
                  : 'text-white hover:bg-gray-600/50'
              }`}
            >
              Telegram
            </button>
          </div>
        </div>

        {/* Pricing Cards - 3 visible, arrow moves one by one */}
        <div className="relative flex items-stretch justify-center">
          {/* Left arrow */}
          <button
            type="button"
            onClick={goPrev}
            disabled={slideIndex <= 0}
            className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 rounded-full bg-[#1E2A47] border border-white/10 text-white items-center justify-center hover:bg-[#2a3a5c] transition-colors z-10 disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
            aria-label="Previous plans"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Desktop: 3 cards visible, slide one by one. Mobile: all plans stacked */}
          <div className="overflow-hidden w-full max-w-5xl mx-auto">
            {/* Desktop carousel */}
            <div
              className="hidden md:flex transition-transform duration-300 ease-out"
              style={{
                width: '180%',
                transform: `translateX(-${slideIndex * (100 / 6)}%)`,
              }}
            >
              {allPlans.map((plan) => (
                <div
                  key={plan.name}
                  className="bg-[#E8E8E8] rounded-xl p-6 sm:p-8 flex flex-col flex-shrink-0 mr-6 last:mr-0"
                  style={{ width: '16.666%' }}
                >
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: '"IBM Plex Sans", sans-serif' }}>
                    {plan.name}
                  </h2>
                  <ul className="space-y-3 flex-1 mb-6">
                    {plan.features.map((item, i) => {
                      const line = typeof item === 'string' ? item : item.text
                      const tag = typeof item === 'object' ? item.tag : null
                      const highlight = typeof item === 'object' && item.highlight
                      return (
                        <li key={i} className="flex gap-2 items-start">
                          {CHECK_ICON}
                          <span
                            className={`flex-1 leading-tight ${highlight ? 'bg-blue-200/80 text-gray-900 px-2 py-1.5 rounded -mx-0.5' : ''}`}
                            style={{
                              fontFamily: '"IBM Plex Sans", "IBM Plex Sans Fallback", sans-serif',
                              fontSize: '0.75rem',
                              lineHeight: '1.25',
                              color: '#1A1A40',
                            }}
                          >
                            {line}
                            {tag && (
                              <span className="ml-1.5 inline-block px-1.5 py-0.5 text-xs font-semibold bg-[#FFD700] text-gray-900 rounded">
                                {tag}
                              </span>
                            )}
                          </span>
                        </li>
                      )
                    })}
                  </ul>
                  {plan.price && (
                    <div className="mb-4" style={{ fontFamily: '"IBM Plex Sans", sans-serif' }}>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Price</p>
                      <p className="text-lg font-bold text-gray-900" style={{ color: '#1A1A40' }}>{plan.price}</p>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mt-1">Billing period</p>
                      <p className="text-gray-800" style={{ color: '#1A1A40' }}>{plan.period}</p>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={goToLogin}
                    className="w-full py-3 rounded-lg bg-[#FFD700] text-gray-900 font-semibold hover:bg-[#facc15] transition-colors mt-auto"
                    style={{ fontFamily: '"IBM Plex Sans", sans-serif' }}
                  >
                    {plan.cta}
                  </button>
                </div>
              ))}
            </div>

            {/* Mobile: stacked list */}
            <div className="md:hidden grid grid-cols-1 gap-6">
              {allPlans.map((plan) => (
                <div
                  key={plan.name}
                  className="bg-[#E8E8E8] rounded-xl p-6 sm:p-8 flex flex-col"
                >
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: '"IBM Plex Sans", sans-serif' }}>
                    {plan.name}
                  </h2>
                  <ul className="space-y-3 flex-1 mb-6">
                    {plan.features.map((item, i) => {
                      const line = typeof item === 'string' ? item : item.text
                      const tag = typeof item === 'object' ? item.tag : null
                      const highlight = typeof item === 'object' && item.highlight
                      return (
                        <li key={i} className="flex gap-2 items-start">
                          {CHECK_ICON}
                          <span
                            className={`flex-1 leading-tight ${highlight ? 'bg-blue-200/80 text-gray-900 px-2 py-1.5 rounded -mx-0.5' : ''}`}
                            style={{
                              fontFamily: '"IBM Plex Sans", "IBM Plex Sans Fallback", sans-serif',
                              fontSize: '0.75rem',
                              lineHeight: '1.25',
                              color: '#1A1A40',
                            }}
                          >
                            {line}
                            {tag && (
                              <span className="ml-1.5 inline-block px-1.5 py-0.5 text-xs font-semibold bg-[#FFD700] text-gray-900 rounded">
                                {tag}
                              </span>
                            )}
                          </span>
                        </li>
                      )
                    })}
                  </ul>
                  {plan.price && (
                    <div className="mb-4" style={{ fontFamily: '"IBM Plex Sans", sans-serif' }}>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Price</p>
                      <p className="text-lg font-bold text-gray-900" style={{ color: '#1A1A40' }}>{plan.price}</p>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mt-1">Billing period</p>
                      <p className="text-gray-800" style={{ color: '#1A1A40' }}>{plan.period}</p>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={goToLogin}
                    className="w-full py-3 rounded-lg bg-[#FFD700] text-gray-900 font-semibold hover:bg-[#facc15] transition-colors mt-auto"
                    style={{ fontFamily: '"IBM Plex Sans", sans-serif' }}
                  >
                    {plan.cta}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Right arrow */}
          <button
            type="button"
            onClick={goNext}
            disabled={slideIndex >= maxSlideIndex}
            className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 rounded-full bg-[#1E2A47] border border-white/10 text-white items-center justify-center hover:bg-[#2a3a5c] transition-colors z-10 disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
            aria-label="Next plans"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
