import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, ChevronDown, Command } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useAppStore } from '@/lib/store'
import { UserProfile } from './UserProfile'
import { LogoutConfirmation } from './LogoutConfirmation'
import logo from '../../assets/logo.png'

interface HeaderProps {
  onOpenCommandPalette: () => void
}

export function Header({ onOpenCommandPalette }: HeaderProps) {
  const navigate = useNavigate()
  const { user, setUser, setHasCompletedWelcome } = useAppStore()
  const [showUserProfile, setShowUserProfile] = useState(false)
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)
    
    return () => clearInterval(timer)
  }, [])

  // Format time as "06:38 PM"
  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  })
  
  // Format date as "Mon, Jun 16"
  const formattedDate = currentTime.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  })

  // Generate default avatar if no avatar is set
  const generateDefaultAvatar = (name: string) => {
    const initials = name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'
    const colors = [
      'from-blue-500 to-blue-600',
      'from-purple-500 to-purple-600',
      'from-emerald-500 to-emerald-600',
      'from-amber-500 to-amber-600',
      'from-pink-500 to-pink-600',
      'from-indigo-500 to-indigo-600'
    ]
    const colorIndex = (name?.length || 0) % colors.length
    return { initials, gradient: colors[colorIndex] }
  }

  const handleLogout = () => {
    // Clear user session
    setUser(null)
    setHasCompletedWelcome(false)
    
    // Clear any stored authentication tokens/cookies
    localStorage.removeItem('galyarderos-storage')
    sessionStorage.clear()
    
    // Clear any other session data
    if ('caches' in window) {
      caches.keys().then(names => {
        names.forEach(name => {
          caches.delete(name)
        })
      })
    }
    
    // Redirect to landing page
    navigate('/', { replace: true })
    
    // Close confirmation dialog
    setShowLogoutConfirmation(false)
  }

  const defaultAvatar = generateDefaultAvatar(user?.name || 'User')

  return (
    <>
      <header className="h-16 bg-slate-900/80 backdrop-blur-md border-b border-slate-700/30 flex items-center justify-between px-4 lg:px-8">
        {/* Left: Logo and App Name */}
        <div className="flex items-center space-x-3">
          <Link to="/app/dashboard" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <img src={logo} alt="GalyarderOS Logo" className="w-8 h-8" />
            <span className="text-white font-semibold text-lg hidden sm:block">GalyarderOS</span>
          </Link>
        </div>

        {/* Center: Search/Command Palette */}
        <div className="hidden md:block relative max-w-md w-full mx-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search modules, tasks, or insights..."
            className="w-full pl-10 pr-10 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
            onFocus={onOpenCommandPalette}
            onClick={onOpenCommandPalette}
            readOnly
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
            <Command className="w-3 h-3 text-slate-400" />
            <span className="text-xs text-slate-400">K</span>
          </div>
        </div>

        {/* Mobile Search Button */}
        <button 
          className="md:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          onClick={onOpenCommandPalette}
        >
          <Search className="w-5 h-5" />
        </button>

        {/* Right: User Profile and Time */}
        <div className="flex items-center space-x-4">
          {/* User Profile */}
          <div className="relative">
            <button
              onClick={() => setShowUserProfile(!showUserProfile)}
              className="flex items-center space-x-3 p-2 hover:bg-slate-800/50 rounded-lg transition-colors group"
            >
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full ring-2 ring-slate-700 group-hover:ring-blue-500 transition-all object-cover"
                />
              ) : (
                <div className={`w-8 h-8 rounded-full ring-2 ring-slate-700 group-hover:ring-blue-500 transition-all bg-gradient-to-br ${defaultAvatar.gradient} flex items-center justify-center`}>
                  <span className="text-white text-xs font-bold">{defaultAvatar.initials}</span>
                </div>
              )}
              
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform hidden sm:block ${showUserProfile ? 'rotate-180' : ''}`} />
            </button>

            {/* User Profile Dropdown */}
            <AnimatePresence>
              {showUserProfile && (
                <div className="absolute right-0 top-full mt-2 z-50">
                  <UserProfile onClose={() => setShowUserProfile(false)} />
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Time */}
          <div className="text-right text-slate-300 hidden sm:block">
            <div className="text-sm font-medium">{formattedTime}</div>
            <div className="text-xs text-slate-400">{formattedDate}</div>
          </div>
        </div>
      </header>

      {/* Logout Confirmation Modal */}
      <LogoutConfirmation
        isOpen={showLogoutConfirmation}
        onConfirm={handleLogout}
        onCancel={() => setShowLogoutConfirmation(false)}
      />
    </>
  )
}