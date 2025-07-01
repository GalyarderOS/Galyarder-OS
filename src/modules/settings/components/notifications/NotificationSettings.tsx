import { useState } from 'react'
import { motion } from 'framer-motion'
import { Bell, Mail, Smartphone, Clock, Calendar, Zap, Check, Volume2 } from 'lucide-react'

export function NotificationSettings() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [quietHoursEnabled, setQuietHoursEnabled] = useState(false)
  const [quietHoursStart, setQuietHoursStart] = useState('22:00')
  const [quietHoursEnd, setQuietHoursEnd] = useState('07:00')
  const [notificationPreferences, setNotificationPreferences] = useState({
    system: true,
    security: true,
    updates: true,
    reminders: true,
    insights: true,
    goals: true,
    social: true,
    finance: true
  })

  const handleTogglePreference = (key: keyof typeof notificationPreferences) => {
    setNotificationPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  return (
    <div className="space-y-6">
      {/* Notification Channels */}
      <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-6">
        <h3 className="text-lg font-medium text-white mb-4 flex items-center space-x-2">
          <Bell className="w-5 h-5 text-amber-400" />
          <span>Notification Channels</span>
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600/20 rounded-full flex items-center justify-center">
                <Mail className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">Email Notifications</p>
                <p className="text-xs text-slate-400">Receive notifications via email</p>
              </div>
            </div>
            <button 
              onClick={() => setEmailNotifications(!emailNotifications)}
              className={`w-12 h-6 ${emailNotifications ? 'bg-blue-600' : 'bg-slate-600'} rounded-full relative transition-colors`}
            >
              <div 
                className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                  emailNotifications ? 'right-0.5' : 'left-0.5'
                }`} 
              />
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-600/20 rounded-full flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">Push Notifications</p>
                <p className="text-xs text-slate-400">Receive notifications on your devices</p>
              </div>
            </div>
            <button 
              onClick={() => setPushNotifications(!pushNotifications)}
              className={`w-12 h-6 ${pushNotifications ? 'bg-purple-600' : 'bg-slate-600'} rounded-full relative transition-colors`}
            >
              <div 
                className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                  pushNotifications ? 'right-0.5' : 'left-0.5'
                }`} 
              />
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-emerald-600/20 rounded-full flex items-center justify-center">
                <Volume2 className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">Sound Effects</p>
                <p className="text-xs text-slate-400">Play sounds for notifications</p>
              </div>
            </div>
            <button 
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`w-12 h-6 ${soundEnabled ? 'bg-emerald-600' : 'bg-slate-600'} rounded-full relative transition-colors`}
            >
              <div 
                className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                  soundEnabled ? 'right-0.5' : 'left-0.5'
                }`} 
              />
            </button>
          </div>
        </div>
      </div>
      
      {/* Quiet Hours */}
      <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-6">
        <h3 className="text-lg font-medium text-white mb-4 flex items-center space-x-2">
          <Clock className="w-5 h-5 text-blue-400" />
          <span>Quiet Hours</span>
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white">Enable Quiet Hours</p>
              <p className="text-xs text-slate-400">Silence notifications during specific hours</p>
            </div>
            <button 
              onClick={() => setQuietHoursEnabled(!quietHoursEnabled)}
              className={`w-12 h-6 ${quietHoursEnabled ? 'bg-blue-600' : 'bg-slate-600'} rounded-full relative transition-colors`}
            >
              <div 
                className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                  quietHoursEnabled ? 'right-0.5' : 'left-0.5'
                }`} 
              />
            </button>
          </div>
          
          {quietHoursEnabled && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="grid grid-cols-2 gap-4"
            >
              <div>
                <label className="block text-sm text-slate-300 mb-1">
                  Start Time
                </label>
                <input
                  type="time"
                  value={quietHoursStart}
                  onChange={(e) => setQuietHoursStart(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 
                           rounded-lg text-white 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm text-slate-300 mb-1">
                  End Time
                </label>
                <input
                  type="time"
                  value={quietHoursEnd}
                  onChange={(e) => setQuietHoursEnd(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 
                           rounded-lg text-white 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Notification Preferences */}
      <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-6">
        <h3 className="text-lg font-medium text-white mb-4 flex items-center space-x-2">
          <Zap className="w-5 h-5 text-purple-400" />
          <span>Notification Preferences</span>
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
            <div>
              <p className="text-sm font-medium text-white">System Notifications</p>
              <p className="text-xs text-slate-400">Updates, maintenance, and system alerts</p>
            </div>
            <button 
              onClick={() => handleTogglePreference('system')}
              className={`w-12 h-6 ${notificationPreferences.system ? 'bg-blue-600' : 'bg-slate-600'} rounded-full relative transition-colors`}
            >
              <div 
                className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                  notificationPreferences.system ? 'right-0.5' : 'left-0.5'
                }`} 
              />
            </button>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
            <div>
              <p className="text-sm font-medium text-white">Security Alerts</p>
              <p className="text-xs text-slate-400">Login attempts, security risks, and warnings</p>
            </div>
            <button 
              onClick={() => handleTogglePreference('security')}
              className={`w-12 h-6 ${notificationPreferences.security ? 'bg-blue-600' : 'bg-slate-600'} rounded-full relative transition-colors`}
            >
              <div 
                className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                  notificationPreferences.security ? 'right-0.5' : 'left-0.5'
                }`} 
              />
            </button>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
            <div>
              <p className="text-sm font-medium text-white">Updates & Features</p>
              <p className="text-xs text-slate-400">New features, improvements, and updates</p>
            </div>
            <button 
              onClick={() => handleTogglePreference('updates')}
              className={`w-12 h-6 ${notificationPreferences.updates ? 'bg-blue-600' : 'bg-slate-600'} rounded-full relative transition-colors`}
            >
              <div 
                className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                  notificationPreferences.updates ? 'right-0.5' : 'left-0.5'
                }`} 
              />
            </button>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
            <div>
              <p className="text-sm font-medium text-white">Reminders & Tasks</p>
              <p className="text-xs text-slate-400">Task due dates, reminders, and deadlines</p>
            </div>
            <button 
              onClick={() => handleTogglePreference('reminders')}
              className={`w-12 h-6 ${notificationPreferences.reminders ? 'bg-blue-600' : 'bg-slate-600'} rounded-full relative transition-colors`}
            >
              <div 
                className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                  notificationPreferences.reminders ? 'right-0.5' : 'left-0.5'
                }`} 
              />
            </button>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
            <div>
              <p className="text-sm font-medium text-white">AI Insights</p>
              <p className="text-xs text-slate-400">Personalized insights and recommendations</p>
            </div>
            <button 
              onClick={() => handleTogglePreference('insights')}
              className={`w-12 h-6 ${notificationPreferences.insights ? 'bg-blue-600' : 'bg-slate-600'} rounded-full relative transition-colors`}
            >
              <div 
                className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                  notificationPreferences.insights ? 'right-0.5' : 'left-0.5'
                }`} 
              />
            </button>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
            <div>
              <p className="text-sm font-medium text-white">Goals & Progress</p>
              <p className="text-xs text-slate-400">Goal updates, achievements, and milestones</p>
            </div>
            <button 
              onClick={() => handleTogglePreference('goals')}
              className={`w-12 h-6 ${notificationPreferences.goals ? 'bg-blue-600' : 'bg-slate-600'} rounded-full relative transition-colors`}
            >
              <div 
                className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                  notificationPreferences.goals ? 'right-0.5' : 'left-0.5'
                }`} 
              />
            </button>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
            <div>
              <p className="text-sm font-medium text-white">Social & Relationships</p>
              <p className="text-xs text-slate-400">Connection updates and social reminders</p>
            </div>
            <button 
              onClick={() => handleTogglePreference('social')}
              className={`w-12 h-6 ${notificationPreferences.social ? 'bg-blue-600' : 'bg-slate-600'} rounded-full relative transition-colors`}
            >
              <div 
                className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                  notificationPreferences.social ? 'right-0.5' : 'left-0.5'
                }`} 
              />
            </button>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
            <div>
              <p className="text-sm font-medium text-white">Financial Updates</p>
              <p className="text-xs text-slate-400">Budget alerts, expense tracking, and financial insights</p>
            </div>
            <button 
              onClick={() => handleTogglePreference('finance')}
              className={`w-12 h-6 ${notificationPreferences.finance ? 'bg-blue-600' : 'bg-slate-600'} rounded-full relative transition-colors`}
            >
              <div 
                className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                  notificationPreferences.finance ? 'right-0.5' : 'left-0.5'
                }`} 
              />
            </button>
          </div>
        </div>
      </div>
      
      {/* Calendar Notifications */}
      <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-6">
        <h3 className="text-lg font-medium text-white mb-4 flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-red-400" />
          <span>Calendar Reminders</span>
        </h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-300 mb-1">
                Default Reminder Time
              </label>
              <select className="w-full px-3 py-2 bg-slate-700 border border-slate-600 
                               rounded-lg text-white 
                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="0">At time of event</option>
                <option value="5">5 minutes before</option>
                <option value="10">10 minutes before</option>
                <option value="15">15 minutes before</option>
                <option value="30">30 minutes before</option>
                <option value="60">1 hour before</option>
                <option value="120">2 hours before</option>
                <option value="1440">1 day before</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm text-slate-300 mb-1">
                Reminder Method
              </label>
              <select className="w-full px-3 py-2 bg-slate-700 border border-slate-600 
                               rounded-lg text-white 
                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="notification">Notification</option>
                <option value="email">Email</option>
                <option value="both">Both</option>
              </select>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white">All-Day Event Notifications</p>
              <p className="text-xs text-slate-400">Receive reminders for all-day events</p>
            </div>
            <button 
              className="w-12 h-6 bg-blue-600 rounded-full relative transition-colors"
            >
              <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5" />
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white">Multiple Reminders</p>
              <p className="text-xs text-slate-400">Allow multiple reminders per event</p>
            </div>
            <button 
              className="w-12 h-6 bg-blue-600 rounded-full relative transition-colors"
            >
              <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}