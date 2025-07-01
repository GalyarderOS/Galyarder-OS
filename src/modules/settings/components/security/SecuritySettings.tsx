import { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, Lock, Key, Download, RefreshCw, AlertTriangle, Check, X, Laptop, Smartphone } from 'lucide-react'
import { useSettingsStore } from '../../../../lib/stores/useSettingsStore'

export function SecuritySettings() {
  const { security, updateSecuritySetting, updatePasswordPolicy, updateDataRetention } = useSettingsStore()
  const [showBackupModal, setShowBackupModal] = useState(false)
  const [backupPassword, setBackupPassword] = useState('')
  const [backupConfirmPassword, setBackupConfirmPassword] = useState('')
  const [backupError, setBackupError] = useState('')
  const [backupSuccess, setBackupSuccess] = useState(false)

  const handleBackupData = (e: React.FormEvent) => {
    e.preventDefault()
    setBackupError('')
    
    // Validate backup password
    if (backupPassword.length < 8) {
      setBackupError('Password must be at least 8 characters')
      return
    }
    
    if (backupPassword !== backupConfirmPassword) {
      setBackupError('Passwords do not match')
      return
    }
    
    // Simulate backup process
    setTimeout(() => {
      setBackupSuccess(true)
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setBackupSuccess(false)
        setBackupPassword('')
        setBackupConfirmPassword('')
        setShowBackupModal(false)
      }, 3000)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      {/* Security Settings */}
      <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-6">
        <h3 className="text-lg font-medium text-white mb-4 flex items-center space-x-2">
          <Shield className="w-5 h-5 text-blue-400" />
          <span>Security</span>
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white">Two-Factor Authentication</p>
              <p className="text-xs text-slate-400">Add an extra layer of security to your account</p>
            </div>
            <button 
              onClick={() => updateSecuritySetting('twoFactorEnabled', !security.twoFactorEnabled)}
              className={`w-12 h-6 ${security.twoFactorEnabled ? 'bg-emerald-600' : 'bg-slate-600'} rounded-full relative transition-colors`}
            >
              <div 
                className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                  security.twoFactorEnabled ? 'right-0.5' : 'left-0.5'
                }`} 
              />
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white">Biometric Authentication</p>
              <p className="text-xs text-slate-400">Use fingerprint or face recognition to login</p>
            </div>
            <button 
              onClick={() => updateSecuritySetting('biometricEnabled', !security.biometricEnabled)}
              className={`w-12 h-6 ${security.biometricEnabled ? 'bg-emerald-600' : 'bg-slate-600'} rounded-full relative transition-colors`}
            >
              <div 
                className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                  security.biometricEnabled ? 'right-0.5' : 'left-0.5'
                }`} 
              />
            </button>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-sm font-medium text-white">Auto-Lock Timeout</p>
                <p className="text-xs text-slate-400">Automatically lock after inactivity</p>
              </div>
              <span className="text-sm text-white">{security.autoLockTimeout} minutes</span>
            </div>
            <input
              type="range"
              min="1"
              max="60"
              step="1"
              value={security.autoLockTimeout}
              onChange={(e) => updateSecuritySetting('autoLockTimeout', parseInt(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>1 min</span>
              <span>15 min</span>
              <span>30 min</span>
              <span>60 min</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Password Policy */}
      <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-6">
        <h3 className="text-lg font-medium text-white mb-4 flex items-center space-x-2">
          <Key className="w-5 h-5 text-purple-400" />
          <span>Password Policy</span>
        </h3>
        
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-sm font-medium text-white">Minimum Password Length</p>
                <p className="text-xs text-slate-400">Set the minimum required length</p>
              </div>
              <span className="text-sm text-white">{security.passwordPolicy.minLength} characters</span>
            </div>
            <input
              type="range"
              min="8"
              max="24"
              step="1"
              value={security.passwordPolicy.minLength}
              onChange={(e) => updatePasswordPolicy('minLength', parseInt(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>8</span>
              <span>12</span>
              <span>16</span>
              <span>24</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white">Require Special Characters</p>
              <p className="text-xs text-slate-400">Passwords must include special characters</p>
            </div>
            <button 
              onClick={() => updatePasswordPolicy('requireSpecialChars', !security.passwordPolicy.requireSpecialChars)}
              className={`w-12 h-6 ${security.passwordPolicy.requireSpecialChars ? 'bg-emerald-600' : 'bg-slate-600'} rounded-full relative transition-colors`}
            >
              <div 
                className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                  security.passwordPolicy.requireSpecialChars ? 'right-0.5' : 'left-0.5'
                }`} 
              />
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white">Require Numbers</p>
              <p className="text-xs text-slate-400">Passwords must include numbers</p>
            </div>
            <button 
              onClick={() => updatePasswordPolicy('requireNumbers', !security.passwordPolicy.requireNumbers)}
              className={`w-12 h-6 ${security.passwordPolicy.requireNumbers ? 'bg-emerald-600' : 'bg-slate-600'} rounded-full relative transition-colors`}
            >
              <div 
                className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                  security.passwordPolicy.requireNumbers ? 'right-0.5' : 'left-0.5'
                }`} 
              />
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white">Require Uppercase Letters</p>
              <p className="text-xs text-slate-400">Passwords must include uppercase letters</p>
            </div>
            <button 
              onClick={() => updatePasswordPolicy('requireUppercase', !security.passwordPolicy.requireUppercase)}
              className={`w-12 h-6 ${security.passwordPolicy.requireUppercase ? 'bg-emerald-600' : 'bg-slate-600'} rounded-full relative transition-colors`}
            >
              <div 
                className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                  security.passwordPolicy.requireUppercase ? 'right-0.5' : 'left-0.5'
                }`} 
              />
            </button>
          </div>
        </div>
      </div>
      
      {/* Data & Privacy */}
      <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-6">
        <h3 className="text-lg font-medium text-white mb-4 flex items-center space-x-2">
          <Lock className="w-5 h-5 text-emerald-400" />
          <span>Data & Privacy</span>
        </h3>
        
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-sm font-medium text-white">Log Retention Period</p>
                <p className="text-xs text-slate-400">How long to keep activity logs</p>
              </div>
              <span className="text-sm text-white">{security.dataRetention.logRetentionDays} days</span>
            </div>
            <input
              type="range"
              min="30"
              max="365"
              step="30"
              value={security.dataRetention.logRetentionDays}
              onChange={(e) => updateDataRetention('logRetentionDays', parseInt(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>30 days</span>
              <span>90 days</span>
              <span>180 days</span>
              <span>365 days</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white">Auto-Delete Inactive Data</p>
              <p className="text-xs text-slate-400">Automatically delete data that hasn't been accessed</p>
            </div>
            <button 
              onClick={() => updateDataRetention('autoDeleteInactive', !security.dataRetention.autoDeleteInactive)}
              className={`w-12 h-6 ${security.dataRetention.autoDeleteInactive ? 'bg-emerald-600' : 'bg-slate-600'} rounded-full relative transition-colors`}
            >
              <div 
                className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                  security.dataRetention.autoDeleteInactive ? 'right-0.5' : 'left-0.5'
                }`} 
              />
            </button>
          </div>
          
          {security.dataRetention.autoDeleteInactive && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-sm font-medium text-white">Inactivity Threshold</p>
                  <p className="text-xs text-slate-400">Delete data after this many days of inactivity</p>
                </div>
                <span className="text-sm text-white">{security.dataRetention.inactiveThresholdDays} days</span>
              </div>
              <input
                type="range"
                min="90"
                max="730"
                step="30"
                value={security.dataRetention.inactiveThresholdDays}
                onChange={(e) => updateDataRetention('inactiveThresholdDays', parseInt(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>90 days</span>
                <span>6 months</span>
                <span>1 year</span>
                <span>2 years</span>
              </div>
            </div>
          )}
          
          <div className="pt-2">
            <button
              onClick={() => setShowBackupModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Backup My Data</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Session Management */}
      <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-6">
        <h3 className="text-lg font-medium text-white mb-4">Active Sessions</h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-emerald-600/10 border border-emerald-600/20 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-emerald-600/20 rounded-full flex items-center justify-center">
                <Laptop className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">Current Session</p>
                <p className="text-xs text-slate-400">MacBook Pro • San Francisco, CA</p>
              </div>
            </div>
            <div className="text-xs text-emerald-400">Active Now</div>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-slate-600/20 rounded-full flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-slate-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">iPhone 13</p>
                <p className="text-xs text-slate-400">San Francisco, CA • Last active 2 hours ago</p>
              </div>
            </div>
            <button className="text-xs text-red-400 hover:text-red-300 transition-colors">
              Logout
            </button>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-slate-600/20 rounded-full flex items-center justify-center">
                <Laptop className="w-5 h-5 text-slate-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">Windows PC</p>
                <p className="text-xs text-slate-400">New York, NY • Last active 3 days ago</p>
              </div>
            </div>
            <button className="text-xs text-red-400 hover:text-red-300 transition-colors">
              Logout
            </button>
          </div>
        </div>
        
        <div className="mt-4">
          <button className="text-sm text-red-400 hover:text-red-300 transition-colors">
            Logout of all other sessions
          </button>
        </div>
      </div>
      
      {/* Backup Modal */}
      {showBackupModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-800 border border-slate-700 rounded-xl p-6 w-full max-w-md mx-4"
          >
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
              <Download className="w-5 h-5 text-blue-400" />
              <span>Backup Your Data</span>
            </h3>
            
            {backupSuccess ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-emerald-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-emerald-400" />
                </div>
                <p className="text-emerald-400 font-medium mb-2">Backup Created Successfully!</p>
                <p className="text-slate-300 mb-6">Your data has been encrypted and is ready to download.</p>
                <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg">
                  Download Backup File
                </button>
              </div>
            ) : (
              <>
                <p className="text-slate-300 mb-4">
                  Create an encrypted backup of all your GalyarderOS data. This backup will be password-protected.
                </p>
                
                <div className="p-3 bg-amber-600/10 border border-amber-600/20 rounded-lg mb-4">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-amber-200">
                      Your backup will contain sensitive information. Keep it secure and remember your password - we cannot recover it for you.
                    </p>
                  </div>
                </div>
                
                <form onSubmit={handleBackupData} className="space-y-4">
                  <div>
                    <label className="block text-sm text-slate-300 mb-1">
                      Backup Password
                    </label>
                    <input
                      type="password"
                      value={backupPassword}
                      onChange={(e) => setBackupPassword(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 
                               rounded-lg text-white placeholder-slate-400 
                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Create a strong password"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-slate-300 mb-1">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      value={backupConfirmPassword}
                      onChange={(e) => setBackupConfirmPassword(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 
                               rounded-lg text-white placeholder-slate-400 
                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Confirm your password"
                      required
                    />
                  </div>
                  
                  {backupError && (
                    <div className="text-red-400 text-sm">
                      {backupError}
                    </div>
                  )}
                  
                  <div className="flex justify-end space-x-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowBackupModal(false)}
                      className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center space-x-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>Create Backup</span>
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </div>
  )
}