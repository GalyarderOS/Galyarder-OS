import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { LanguageSwitcher } from '../ui/LanguageSwitcher'
import { ThemeToggle } from '../ui/ThemeToggle'
import logo from '../../assets/logo.png'

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Add scroll event listener to change navbar appearance on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Add keyboard shortcut for language switcher (Alt+L)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key === 'l') {
        // This would trigger the language switcher
        // For now, we'll just log it
        console.log('Language switcher shortcut pressed')
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-slate-950/90 backdrop-blur-md shadow-md' : 'bg-slate-950/80 backdrop-blur-sm'
    } border-b border-slate-800`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <img src={logo} alt="GalyarderOS Logo" className="w-8 h-8" />
              <span className="text-white font-semibold text-lg hidden sm:block">GalyarderOS</span>
            </Link>
          </div>

          {/* Right Side Controls */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            <ThemeToggle />
            <Link to="/login" className="text-slate-300 hover:text-white transition-colors">Login</Link>
            <Link 
              to="/register" 
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center space-x-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden py-4 border-t border-slate-800"
          >
            <div className="flex flex-col space-y-4">
              <Link to="/login" className="text-slate-300 hover:text-white transition-colors">Login</Link>
              <Link 
                to="/register" 
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-center"
              >
                Get Started
              </Link>
              <div className="pt-2 border-t border-slate-800">
                <LanguageSwitcher />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}