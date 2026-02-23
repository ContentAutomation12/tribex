import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './modules/navbar/components/Navbar'
import Footer from './modules/footer/components/Footer'
import AboutPage from './modules/about/components/AboutPage'
import PricingPage from './modules/pricing/components/PricingPage'
import LoginPage from './modules/auth/components/LoginPage'
import DashboardPage from './modules/dashboard/components/DashboardPage'
import './App.css'

function AppLayout() {
  const location = useLocation()
  const isAuthLayout = location.pathname === '/login' || location.pathname === '/dashboard'

  return (
    <div className="bg-gray-100 flex flex-col w-full min-h-screen">
      {!isAuthLayout && <Navbar />}
      <main className={isAuthLayout ? 'flex-1' : 'flex-1 pt-16'}>
        <Routes>
          <Route path="/" element={<AboutPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </main>
      {!isAuthLayout && <Footer />}
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  )
}

export default App
