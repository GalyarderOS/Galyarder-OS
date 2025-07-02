import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, ChevronDown, Command } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useAppStore } from '@/lib/store'
import { getThemeClasses } from '@/lib/theme'
import { useTranslation } from '@/lib/i18n'
import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'
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
  
  const { colors, glass, isDark } = getThemeClasses()
  const { t } = useTranslation()

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
      <motion.header 
        className="h-16 border-b flex items-center justify-between px-4 lg:px-8 relative z-30"
        style={{
          backgroundColor: colors.bg.elevated,
          borderColor: colors.border.primary,
          backdropFilter: 'blur(16px)',
        }}
        initial={{ y: -64 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Left: Logo and App Name */}
        <motion.div 
          className="flex items-center space-x-3"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <Link 
            to="/app/dashboard" 
            className="flex items-center space-x-3 hover:opacity-80 transition-all duration-200 p-2 rounded-lg"
            style={{ color: colors.text.primary }}
          >
            <motion.img 
              src={logo} 
              alt="GalyarderOS Logo" 
              className="w-8 h-8"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.8 }}
            />
            <span className="font-semibold text-lg hidden sm:block">
              GalyarderOS
            </span>
          </Link>
        </motion.div>

        {/* Center: Search/Command Palette */}
        <div className="hidden md:block relative max-w-md w-full mx-4">
          <Search 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" 
            style={{ color: colors.text.tertiary }}
          />
          <motion.input
            type="text"
            placeholder={t('common.search', 'Search modules, tasks, or insights...')}
            className="w-full pl-10 pr-10 py-2.5 border rounded-xl text-sm transition-all duration-200 cursor-pointer"
            style={{
              backgroundColor: colors.bg.secondary,
              borderColor: colors.border.primary,
              color: colors.text.primary,
            }}
            onFocus={onOpenCommandPalette}
            onClick={onOpenCommandPalette}
            readOnly
            whileHover={{ scale: 1.01 }}
            whileFocus={{ scale: 1.02 }}
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
            <Command 
              className="w-3 h-3" 
              style={{ color: colors.text.tertiary }}
            />
            <span 
              className="text-xs" 
              style={{ color: colors.text.tertiary }}
            >
              K
            </span>
          </div>
        </div>

        {/* Mobile Search Button */}
        <motion.button 
          className="md:hidden p-2 rounded-lg transition-colors"
          style={{
            color: colors.text.secondary,
            backgroundColor: 'transparent'
          }}
          onClick={onOpenCommandPalette}
          whileHover={{ 
            scale: 1.05,
            backgroundColor: colors.bg.secondary 
          }}
          whileTap={{ scale: 0.95 }}
        >
          <Search className="w-5 h-5" />
        </motion.button>

                  {/* Right: Language Switcher, Theme Switcher, User Profile and Time */}
        <div className="flex items-center space-x-3">
          {/* Language Switcher */}
          <LanguageSwitcher />
          
          {/* Theme Switcher */}
          <ThemeSwitcher />

          {/* User Profile */}
          <div className="relative">
            <motion.button
              onClick={() => setShowUserProfile(!showUserProfile)}
              className="flex items-center space-x-3 p-2 rounded-lg transition-all duration-200 group"
              style={{
                backgroundColor: showUserProfile ? colors.bg.secondary : 'transparent'
              }}
              whileHover={{ 
                backgroundColor: colors.bg.secondary,
                scale: 1.02 
              }}
              whileTap={{ scale: 0.98 }}
            >
              {user?.avatar ? (
                                 <motion.img
                   src={user.avatar}
                   alt={user.name}
                   className="w-8 h-8 rounded-full ring-2 transition-all object-cover"
                   style={{
                     borderColor: showUserProfile ? colors.consciousness.primary : colors.border.secondary
                   }}
                   whileHover={{ scale: 1.1 }}
                 />
              ) : (
                                 <motion.div 
                   className={`w-8 h-8 rounded-full ring-2 transition-all bg-gradient-to-br ${defaultAvatar.gradient} flex items-center justify-center`}
                   style={{
                     borderColor: showUserProfile ? colors.consciousness.primary : colors.border.secondary
                   }}
                   whileHover={{ scale: 1.1 }}
                 >
                  <span className="text-white text-xs font-bold">
                    {defaultAvatar.initials}
                  </span>
                </motion.div>
              )}
              
              <motion.div
                animate={{ rotate: showUserProfile ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown 
                  className="w-4 h-4 transition-transform hidden sm:block" 
                  style={{ color: colors.text.secondary }}
                />
              </motion.div>
            </motion.button>

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
          <motion.div 
            className="text-right hidden sm:block"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div 
              className="text-sm font-medium"
              style={{ color: colors.text.primary }}
            >
              {formattedTime}
            </div>
            <div 
              className="text-xs"
              style={{ color: colors.text.tertiary }}
            >
              {formattedDate}
            </div>
          </motion.div>
        </div>
      </motion.header>

      {/* Logout Confirmation Modal */}
      <LogoutConfirmation
        isOpen={showLogoutConfirmation}
        onConfirm={handleLogout}
        onCancel={() => setShowLogoutConfirmation(false)}
      />
    </>
  )
}