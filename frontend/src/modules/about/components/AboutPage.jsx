export default function AboutPage() {
  return (
    <>
    <section id="about" className="relative min-h-[calc(100vh-4rem)] w-full overflow-hidden bg-[#0c1445]">
      {/* Stars */}
      <div className="absolute inset-0">
        <div className="absolute top-[10%] left-[15%] w-1 h-1 rounded-full bg-white opacity-90" />
        <div className="absolute top-[20%] left-[25%] w-1.5 h-1.5 rounded-full bg-white opacity-80" />
        <div className="absolute top-[15%] left-[70%] w-1 h-1 rounded-full bg-white opacity-70" />
        <div className="absolute top-[30%] left-[80%] w-1 h-1 rounded-full bg-white opacity-60" />
        <div className="absolute top-[25%] left-[50%] w-1 h-1 rounded-full bg-white opacity-80" />
        <div className="absolute top-[8%] left-[35%] w-2 h-2 rounded-full bg-white opacity-95 shadow-[0_0_8px_2px_rgba(255,255,255,0.8)]" />
        <div className="absolute top-[40%] left-[10%] w-1 h-1 rounded-full bg-white opacity-60" />
        <div className="absolute top-[35%] left-[90%] w-1 h-1 rounded-full bg-white opacity-50" />
      </div>

      {/* Moon */}
      <div className="absolute top-12 right-[15%] sm:right-[20%] w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-[#f5e6c8] shadow-[0_0_40px_20px_rgba(245,230,200,0.3)]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex flex-col items-center justify-center gap-1">
          <div className="flex gap-4 sm:gap-6">
            <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#2d2d2d]" />
            <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#2d2d2d]" />
          </div>
          <span className="w-6 h-1 sm:w-8 sm:h-1.5 rounded-full bg-[#2d2d2d] mt-1 opacity-80" style={{ transform: 'scaleY(-1) translateY(-2px)' }} />
        </div>
      </div>

      {/* Content: left = headline + buttons (neeche center), right = image */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[calc(100vh-4rem)] min-h-[420px] flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 w-full items-center">
          {/* Left: headline + buttons - thoda neeche center */}
          <div className="flex flex-col justify-center pt-8 lg:pt-16">
            <h1 className="text-white font-bold text-3xl sm:text-4xl md:text-5xl leading-tight tracking-tight">
              Turning Tokens
              <br />
              into Connections,
              <br />
              One Community
              <br />
              at a Time
            </h1>
            <div className="flex flex-wrap gap-4 mt-8">
              <a
                href="#"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#facc15] text-black font-semibold hover:bg-[#fde047] transition-colors"
              >
                Add to Discord
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#facc15] text-black font-semibold hover:bg-[#fde047] transition-colors"
              >
                Add to Telegram
              </a>
            </div>
          </div>

          {/* Right: image with transparent background (use PNG without background) */}
          <div className="flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-md flex items-end justify-center min-h-[200px]">
              {/* Put your transparent-background PNG in public folder as hero-robots.png */}
              <img
                src="/hero-robots.png"
                alt="Community"
                className="w-full max-h-[320px] sm:max-h-[380px] object-contain object-center"
                onError={(e) => {
                  e.target.style.display = 'none'
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Rocky ground */}
      <div className="absolute bottom-0 left-0 right-0 h-40 sm:h-52">
        <svg viewBox="0 0 1200 200" className="w-full h-full" preserveAspectRatio="none">
          <path
            fill="#6b5344"
            d="M0,120 L0,200 L1200,200 L1200,80 Q1100,40 900,70 T600,50 T300,90 T0,120 Z"
          />
          <path
            fill="#5c4a3d"
            d="M0,140 L150,200 L400,160 L600,200 L850,150 L1200,200 L1200,200 L0,200 Z"
            opacity="0.9"
          />
          <path
            fill="#7d6b5c"
            d="M200,200 L350,170 L500,200 L650,175 L800,200 L950,180 L1200,200 Z"
            opacity="0.7"
          />
        </svg>
      </div>

      {/* Robots row */}
      <div className="absolute bottom-12 sm:bottom-16 left-0 right-0 flex justify-center items-end gap-4 sm:gap-6 px-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="flex flex-col items-center transition-transform hover:scale-105"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#facc15] border-2 border-amber-600 flex items-center justify-center">
              <div className="flex gap-0.5">
                <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#1e3a5f]" />
                <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#1e3a5f]" />
              </div>
            </div>
            <div className="w-8 h-10 sm:w-10 sm:h-12 rounded-lg bg-[#facc15] border-2 border-amber-600 -mt-1 flex items-center justify-center">
              <div className="w-3 h-3 sm:w-4 sm:h-4 rounded bg-[#3b82f6] flex flex-col items-center justify-center gap-0">
                <div className="flex gap-0.5">
                  <span className="w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full bg-white" />
                  <span className="w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full bg-white" />
                </div>
                <span className="w-1.5 h-0.5 sm:w-2 sm:h-1 rounded-full border-b-2 border-white mt-0.5 scale-y-[-1]" />
              </div>
            </div>
            <div className="w-6 h-4 sm:w-8 sm:h-5 rounded bg-amber-700 -mt-0.5" />
          </div>
        ))}
      </div>
    </section>

    {/* Second section: intro text + 2x2 cards */}
    <section className="w-full bg-[#191942] py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#FFD700] mb-8 sm:mb-10">
          Tribex: The Ultimate Solution for Web3 Community Management
        </h2>
        <div className="space-y-6 text-[#F5F5F5] text-base sm:text-lg leading-relaxed">
          <p>
            Tribex simplifies managing tokenized crypto communities by taking care of membership verification with precision. We ensure every new member holds the necessary token(s) to join and perform regular re-verifications to keep your community safe and accurate.
          </p>
          <p>
            And unlock the full potential of your community with Pro Mini Apps, available exclusively through our Premier Subscription. Go beyond token gating to supercharge engagement and create dynamic, pro-social spaces that thrive.
          </p>
          <p>
            For over four years, tens of thousands of communities have trusted Tribex to deliver secure, seamless access to exclusive content, chats, and tools that elevate the community experience.
          </p>
          <p>
            Take control and manage your bot effortlessly in the Admin Portal:{' '}
            <a href="https://admin.tribex.io" className="text-[#FFD700] font-medium hover:underline">admin.tribex.io</a>
          </p>
        </div>
      </div>

      {/* 2x2 Cards grid - fixed size, yellow on hover */}
      <div className="max-w-5xl mx-auto mt-16 sm:mt-20 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        <div className="bg-[#F8F8F8] hover:bg-[#FFD700] rounded-xl p-6 sm:p-8 text-left transition-colors duration-200 w-full min-h-[280px] h-[220px] flex flex-col">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 text-center">Comprehensive Community Management</h3>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed text-justify flex-1 overflow-hidden">
            Tribex offers a full-service tool that curates membership based on token ownership, ensuring that only verified token holders can access and participate in your community.
          </p>
        </div>
        <div className="bg-[#F8F8F8] hover:bg-[#FFD700] rounded-xl p-6 sm:p-8 text-left transition-colors duration-200 w-full min-h-[280px] h-[220px] flex flex-col">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 text-center">Supported Chains and Wallets</h3>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed text-justify flex-1 overflow-hidden">
            We support 40+ chains, 30+ wallets, and the list is always growing. Don&apos;t see your favorite? Submit a request via the form in the Resources drop-down. We&apos;re building with the community - you included!
          </p>
        </div>
        <div className="bg-[#F8F8F8] hover:bg-[#FFD700] rounded-xl p-6 sm:p-8 text-left transition-colors duration-200 w-full min-h-[280px] h-[220px] flex flex-col">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 text-center">Pricing</h3>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed text-justify flex-1 overflow-hidden">
            Choose from our flexible subscription plans to unlock premium features and enhance your community management experience.
          </p>
        </div>
        <div className="bg-[#F8F8F8] hover:bg-[#FFD700] rounded-xl p-6 sm:p-8 text-left transition-colors duration-200 w-full min-h-[280px] h-[220px] flex flex-col">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 text-center">Security</h3>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed text-justify flex-1 overflow-hidden">
            Safely serving tokenized communities since Spring 2020. Ensure your community&apos;s security by verifying our official bot.
          </p>
        </div>
      </div>
    </section>
    </>
  )
}
