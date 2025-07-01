import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Key, Camera, Check, X, RefreshCw, Shield } from 'lucide-react'
import { useAppStore } from '../../../../lib/store'

export function AccountSettings() {
  const { user, updateUserProfile } = useAppStore()
  const [isEditing, setIsEditing] = useState(false)
  const [editedName, setEditedName] = useState(user?.name || '')
  const [editedEmail, setEditedEmail] = useState(user?.email || '')
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || '')
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [passwordSuccess, setPasswordSuccess] = useState(false)
  
  const fileInputRef = React.useRef<HTMLInputElement>(null)

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
      updateUserProfile({
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

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordError('')
    
    // Validate passwords
    if (newPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters')
      return
    }
    
    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match')
      return
    }
    
    // Simulate password change
    setTimeout(() => {
      setPasswordSuccess(true)
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setPasswordSuccess(false)
        setShowPasswordForm(false)
      }, 3000)
    }, 1000)
  }

  // Generate default avatar if no avatar is set
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

  const defaultAvatar = generateDefaultAvatar(editedName || 'User')

  return (
    <div className="space-y-6">
      {/* Profile Information */}
      <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-6">
        <h3 className="text-lg font-medium text-white mb-4 flex items-center space-x-2">
          <User className="w-5 h-5 text-blue-400" />
          <span>Profile Information</span>
        </h3>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Avatar */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative group">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Profile"
                  className="w-32 h-32 rounded-full ring-4 ring-slate-600/50 object-cover"
                />
              ) : (
                <div className={`w-32 h-32 rounded-full ring-4 ring-slate-600/50 bg-gradient-to-br ${defaultAvatar.gradient} flex items-center justify-center`}>
                  <span className="text-white text-4xl font-bold">{defaultAvatar.initials}</span>
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
                  <Camera className="w-8 h-8 text-white" />
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
          
          {/* Profile Form */}
          <div className="flex-1 space-y-4">
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
              ) : (
                <div className="flex items-center space-x-3 p-3 bg-slate-700/30 rounded-lg">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <span className="text-white">{user?.email}</span>
                </div>
              )}
            </div>
            
            {/* Password Change Button */}
            {!isEditing && (
              <div>
                <button
                  onClick={() => setShowPasswordForm(!showPasswordForm)}
                  className="flex items-center space-x-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors"
                >
                  <Key className="w-4 h-4" />
                  <span>Change Password</span>
                </button>
              </div>
            )}
            
            {/* Password Change Form */}
            {showPasswordForm && !isEditing && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 p-4 bg-slate-700/30 rounded-lg border border-slate-600/50"
              >
                <h4 className="text-sm font-medium text-white mb-3 flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-blue-400" />
                  <span>Change Password</span>
                </h4>
                
                {passwordSuccess ? (
                  <div className="flex items-center space-x-2 text-emerald-400 mb-2">
                    <Check className="w-4 h-4" />
                    <span>Password updated successfully!</span>
                  </div>
                ) : (
                  <form onSubmit={handlePasswordChange} className="space-y-3">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">
                        Current Password
                      </label>
                      <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-600 
                                 rounded-lg text-white placeholder-slate-500 
                                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">
                        New Password
                      </label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-600 
                                 rounded-lg text-white placeholder-slate-500 
                                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-600 
                                 rounded-lg text-white placeholder-slate-500 
                                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    
                    {passwordError && (
                      <div className="text-red-400 text-xs">
                        {passwordError}
                      </div>
                    )}
                    
                    <div className="flex justify-end space-x-2">
                      <button
                        type="button"
                        onClick={() => setShowPasswordForm(false)}
                        className="px-3 py-1.5 bg-slate-600 hover:bg-slate-500 text-white rounded-lg text-sm"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
                      >
                        Update Password
                      </button>
                    </div>
                  </form>
                )}
              </motion.div>
            )}
            
            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-4">
              {isEditing ? (
                <>
                  <button
                    onClick={handleCancel}
                    className="flex items-center space-x-2 px-4 py-3 bg-slate-700/50 hover:bg-slate-600/50 
                             rounded-lg text-white transition-all duration-200 
                             border border-slate-600/30 hover:border-slate-500/50"
                  >
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center space-x-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 
                             rounded-lg text-white transition-all duration-200 
                             shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40"
                  >
                    <Check className="w-4 h-4" />
                    <span>Save Changes</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 
                           rounded-lg text-white transition-all duration-200 
                           shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Account Preferences */}
      <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-6">
        <h3 className="text-lg font-medium text-white mb-4">Account Preferences</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white">Language</p>
              <p className="text-xs text-slate-400">Select your preferred language</p>
            </div>
            <select className="bg-slate-700 border border-slate-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              <option value="ja">日本語</option>
              <option value="zh">中文</option>
            </select>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white">Time Zone</p>
              <p className="text-xs text-slate-400">Set your local time zone</p>
            </div>
            <select className="bg-slate-700 border border-slate-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="utc">UTC (GMT+0)</option>
              <option value="est">Eastern Time (GMT-5)</option>
              <option value="cst">Central Time (GMT-6)</option>
              <option value="mst">Mountain Time (GMT-7)</option>
              <option value="pst">Pacific Time (GMT-8)</option>
              <option value="ist">India (GMT+5:30)</option>
              <option value="jst">Japan (GMT+9)</option>
            </select>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white">Date Format</p>
              <p className="text-xs text-slate-400">Choose how dates are displayed</p>
            </div>
            <select className="bg-slate-700 border border-slate-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="mdy">MM/DD/YYYY</option>
              <option value="dmy">DD/MM/YYYY</option>
              <option value="ymd">YYYY-MM-DD</option>
            </select>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white">First Day of Week</p>
              <p className="text-xs text-slate-400">Set calendar start day</p>
            </div>
            <select className="bg-slate-700 border border-slate-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="sunday">Sunday</option>
              <option value="monday">Monday</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Connected Accounts */}
      <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-6">
        <h3 className="text-lg font-medium text-white mb-4">Connected Accounts</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#4285F4] rounded-full flex items-center justify-center">
                <span className="text-white font-bold">G</span>
              </div>
              <div>
                <p className="text-sm font-medium text-white">Google</p>
                <p className="text-xs text-slate-400">
                  {user?.email?.includes('@gmail.com') 
                    ? `Connected as ${user.email}` 
                    : 'Not connected'}
                </p>
              </div>
            </div>
            <button className={`px-3 py-1.5 rounded-lg text-sm ${
              user?.email?.includes('@gmail.com')
                ? 'bg-red-600/20 text-red-400 hover:bg-red-600/30'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}>
              {user?.email?.includes('@gmail.com') ? 'Disconnect' : 'Connect'}
            </button>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#1DA1F2] rounded-full flex items-center justify-center">
                <span className="text-white font-bold">T</span>
              </div>
              <div>
                <p className="text-sm font-medium text-white">Twitter</p>
                <p className="text-xs text-slate-400">Not connected</p>
              </div>
            </div>
            <button className="px-3 py-1.5 bg-blue-600 text-white hover:bg-blue-700 rounded-lg text-sm">
              Connect
            </button>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#0A66C2] rounded-full flex items-center justify-center">
                <span className="text-white font-bold">L</span>
              </div>
              <div>
                <p className="text-sm font-medium text-white">LinkedIn</p>
                <p className="text-xs text-slate-400">Not connected</p>
              </div>
            </div>
            <button className="px-3 py-1.5 bg-blue-600 text-white hover:bg-blue-700 rounded-lg text-sm">
              Connect
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}