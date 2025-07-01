import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Camera, Mail, Check, X, Edit3, LogOut, Moon, Sun, Settings } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '@/lib/store'

interface UserProfileProps {
  onClose?: () => void
}

export function UserProfile({ onClose }: UserProfileProps) {
  const navigate = useNavigate()
  const { user, setUser, setHasCompletedWelcome, theme, setTheme } = useAppStore()
  const [isEditing, setIsEditing] = useState(false)
  const [editedName, setEditedName] = useState(user?.name || '')
  const [editedEmail, setEditedEmail] = useState(user?.email || '')
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || '')
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose?.()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])

  // Extract username from Gmail if email is Gmail
  const getGmailUsername = (email: string) => {
    if (email.includes('@gmail.com')) {
      return email.split('@')[0]
    }
    return email.split('@')[0]
  }

  // Generate default avatar based on name
  const generateDefaultAvatar = (name: string) => {
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase()
    const colors = [
      'from-blue-500 to-blue-600',
      'from-purple-500 to-purple-600',
      'from-emerald-500 to-emerald-600',
      'from-amber-500 to-amber-600',
      'from-pink-500 to-pink-600',
      'from-indigo-500 to-indigo-600'
    ]
    const colorIndex = name.length % colors.length
    return { initials, gradient: colors[colorIndex] }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    if (user) {
      setUser({
        ...user,
        name: editedName,
        email: editedEmail,
        avatar: avatarPreview
      })
    }
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedName(user?.name || '')
    setEditedEmail(user?.email || '')
    setAvatarPreview(user?.avatar || '')
    setIsEditing(false)
  }

  const handleUseGmailDefaults = () => {
    if (editedEmail.includes('@gmail.com')) {
      const username = getGmailUsername(editedEmail)
      setEditedName(username)
      // Use a default Gmail-style avatar
      setAvatarPreview(`https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=4285f4&color=fff&size=150`)
    }
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
    
    // Close modals
    onClose?.()
    setShowLogoutConfirmation(false)
    
    // Redirect to landing page
    navigate('/', { replace: true })
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const defaultAvatar = generateDefaultAvatar(editedName || 'User')

  // Create portal to render modal at document body level
  const modalContent = (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative w-[90vw] max-w-md
                     bg-slate-800/95 backdrop-blur-2xl 
                     border border-slate-700/60 
                     rounded-2xl p-6 
                     shadow-2xl shadow-black/50
                     ring-1 ring-white/5
                     max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Profile Settings</h3>
            {onClose && (
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors group"
                aria-label="Close profile settings"
              >
                <X className="w-4 h-4 text-slate-400 group-hover:text-white" />
              </button>
            )}
          </div>

          <div className="space-y-6">
            {/* Avatar Section */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative group">
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="Profile"
                    className="w-20 h-20 rounded-full ring-4 ring-slate-600/50 object-cover
                             shadow-lg transition-all duration-200 group-hover:ring-blue-500/50"
                  />
                ) : (
                  <div className={`w-20 h-20 rounded-full ring-4 ring-slate-600/50 
                                 bg-gradient-to-br ${defaultAvatar.gradient} 
                                 flex items-center justify-center shadow-lg
                                 transition-all duration-200 group-hover:ring-blue-500/50`}>
                    <span className="text-white text-xl font-bold">{defaultAvatar.initials}</span>
                  </div>
                )}
                
                {isEditing && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center 
                             opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    aria-label="Change profile photo"
                  >
                    <Camera className="w-5 h-5 text-white" />
                  </motion.button>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                aria-label="Upload profile photo"
              />

              {isEditing && (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-sm text-blue-400 hover:text-blue-300 transition-colors
                           px-3 py-1 rounded-md hover:bg-blue-500/10"
                >
                  Change Photo
                </button>
              )}
            </div>

            {/* Form Fields */}
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Display Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 
                             rounded-lg text-white placeholder-slate-400 
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                             transition-all duration-200"
                    placeholder="Enter your name"
                  />
                ) : (
                  <div className="flex items-center space-x-3 p-3 bg-slate-700/30 rounded-lg">
                    <User className="w-4 h-4 text-slate-400" />
                    <span className="text-white">{user?.name}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Email Address
                </label>
                {isEditing ? (
                  <div className="space-y-3">
                    <input
                      type="email"
                      value={editedEmail}
                      onChange={(e) => setEditedEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 
                               rounded-lg text-white placeholder-slate-400 
                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                               transition-all duration-200"
                      placeholder="Enter your email"
                    />
                    {editedEmail.includes('@gmail.com') && (
                      <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        onClick={handleUseGmailDefaults}
                        className="text-xs text-blue-400 hover:text-blue-300 transition-colors 
                                 flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-blue-500/10"
                      >
                        <Mail className="w-3 h-3" />
                        <span>Use Gmail defaults</span>
                      </motion.button>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center space-x-3 p-3 bg-slate-700/30 rounded-lg">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <span className="text-white text-sm break-all">{user?.email}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="flex items-center justify-center space-x-2 p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-4 h-4 text-amber-400" />
                    <span className="text-sm text-white">Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4 text-blue-400" />
                    <span className="text-sm text-white">Dark Mode</span>
                  </>
                )}
              </button>
              
              {/* Settings */}
              <button
                onClick={() => {
                  navigate('/app/settings')
                  onClose?.()
                }}
                className="flex items-center justify-center space-x-2 p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors"
              >
                <Settings className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-white">Settings</span>
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4">
              {isEditing ? (
                <>
                  <button
                    onClick={handleCancel}
                    className="flex-1 px-4 py-3 bg-slate-700/50 hover:bg-slate-600/50 
                             rounded-lg text-white transition-all duration-200 
                             flex items-center justify-center space-x-2
                             border border-slate-600/30 hover:border-slate-500/50"
                  >
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 
                             rounded-lg text-white transition-all duration-200 
                             flex items-center justify-center space-x-2
                             shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40"
                  >
                    <Check className="w-4 h-4" />
                    <span>Save</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 
                           rounded-lg text-white transition-all duration-200 
                           flex items-center justify-center space-x-2
                           shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
              )}
            </div>

            {/* Logout Button */}
            {!isEditing && (
              <div className="pt-4 border-t border-slate-700/50">
                <button
                  onClick={() => setShowLogoutConfirmation(true)}
                  className="w-full px-4 py-3 bg-red-600/20 hover:bg-red-600/30 
                           border border-red-600/30 hover:border-red-600/50
                           rounded-lg text-red-400 hover:text-red-300 transition-all duration-200 
                           flex items-center justify-center space-x-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            )}

            {/* Gmail Integration Info */}
            {!isEditing && user?.email?.includes('@gmail.com') && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="pt-4 border-t border-slate-700/50"
              >
                <div className="flex items-center space-x-2 text-xs text-slate-400 
                              p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <Mail className="w-3 h-3 text-blue-400" />
                  <span>Synced with Gmail account</span>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Logout Confirmation Modal */}
        {showLogoutConfirmation && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute inset-0 flex items-center justify-center z-10"
          >
            <div className="bg-slate-800/95 backdrop-blur-2xl border border-slate-700/60 rounded-2xl p-6 max-w-sm mx-4">
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <LogOut className="w-6 h-6 text-red-400" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Confirm Logout</h4>
                <p className="text-slate-300 text-sm">
                  Are you sure you want to logout? Your session will be terminated and you'll be redirected to the landing page.
                </p>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowLogoutConfirmation(false)}
                  className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  )

  // Render modal using portal to document.body
  return createPortal(modalContent, document.body)
}