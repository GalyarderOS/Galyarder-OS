import { motion } from 'framer-motion'
import { Activity, Eye, Edit, Plus, Trash2, Download, LogIn, LogOut } from 'lucide-react'
import { usePrivacyStore } from '../store/privacyStore'

export function AccessLogs() {
  const { accessLogs, vaultItems } = usePrivacyStore()

  const getActionIcon = (action: string) => {
    const icons = {
      view: Eye,
      edit: Edit,
      create: Plus,
      delete: Trash2,
      export: Download,
      login: LogIn,
      logout: LogOut
    }
    return icons[action as keyof typeof icons] || Activity
  }

  const getActionColor = (action: string) => {
    const colors = {
      view: 'text-blue-400',
      edit: 'text-amber-400',
      create: 'text-emerald-400',
      delete: 'text-red-400',
      export: 'text-purple-400',
      login: 'text-emerald-400',
      logout: 'text-slate-400'
    }
    return colors[action as keyof typeof colors] || 'text-slate-400'
  }

  const getItemName = (itemId?: string) => {
    if (!itemId) return 'System'
    const item = vaultItems.find(i => i.id === itemId)
    return item?.name || 'Unknown Item'
  }

  const getLocationFlag = (location?: string) => {
    if (!location || location === 'Unknown') return '🌍'
    if (location.includes('US') || location.includes('United States')) return '🇺🇸'
    if (location.includes('CA') || location.includes('Canada')) return '🇨🇦'
    if (location.includes('UK') || location.includes('United Kingdom')) return '🇬🇧'
    return '🌍'
  }

  const todayLogs = accessLogs.filter(log => {
    const logDate = new Date(log.timestamp).toDateString()
    const today = new Date().toDateString()
    return logDate === today
  })

  const thisWeekLogs = accessLogs.filter(log => {
    const logDate = new Date(log.timestamp)
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)
    return logDate >= weekAgo
  })

  const failedAttempts = accessLogs.filter(log => !log.success)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass-card rounded-xl p-6"
    >
      <div className="flex items-center space-x-3 mb-6">
        <Activity className="w-5 h-5 text-cyan-400" />
        <h3 className="text-xl font-semibold text-white">Access Logs</h3>
      </div>

      {/* Log Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <Activity className="w-5 h-5 text-blue-400 mx-auto mb-2" />
          <p className="text-lg font-bold text-white">{todayLogs.length}</p>
          <p className="text-xs text-slate-400">Today</p>
        </div>
        
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <div className="w-5 h-5 bg-emerald-400 rounded-full mx-auto mb-2" />
          <p className="text-lg font-bold text-white">{thisWeekLogs.length}</p>
          <p className="text-xs text-slate-400">This Week</p>
        </div>
        
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <div className="w-5 h-5 bg-red-400 rounded-full mx-auto mb-2" />
          <p className="text-lg font-bold text-white">{failedAttempts.length}</p>
          <p className="text-xs text-slate-400">Failed Attempts</p>
        </div>
      </div>

      {/* Failed Attempts Alert */}
      {failedAttempts.length > 0 && (
        <div className="mb-6 p-4 bg-red-600/20 border border-red-600/30 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-4 h-4 bg-red-400 rounded-full" />
            <h4 className="text-sm font-medium text-red-300">Failed Access Attempts</h4>
          </div>
          <div className="space-y-2">
            {failedAttempts.slice(0, 3).map(log => (
              <div key={log.id} className="flex items-center justify-between text-sm">
                <span className="text-red-200">
                  {log.action} on {getItemName(log.itemId)}
                </span>
                <span className="text-red-400">
                  {new Date(log.timestamp).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Access Logs */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-white">Recent Activity</h4>
        {accessLogs.slice(0, 10).map((log, index) => {
          const ActionIcon = getActionIcon(log.action)
          const actionColor = getActionColor(log.action)
          
          return (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className={`p-4 rounded-lg ${
                log.success ? 'bg-slate-800/30' : 'bg-red-600/10 border border-red-600/20'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${log.success ? 'bg-slate-700/50' : 'bg-red-600/20'}`}>
                  <ActionIcon className={`w-4 h-4 ${log.success ? actionColor : 'text-red-400'}`} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-white capitalize">
                        {log.action}
                      </span>
                      {log.itemId && (
                        <>
                          <span className="text-slate-400">•</span>
                          <span className="text-sm text-slate-300">
                            {getItemName(log.itemId)}
                          </span>
                        </>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-slate-400">
                        {new Date(log.timestamp).toLocaleString()}
                      </span>
                      {!log.success && (
                        <span className="text-xs text-red-400 font-medium">FAILED</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-slate-400">
                    <div>
                      <span className="block">IP Address:</span>
                      <span className="text-white">{log.ipAddress}</span>
                    </div>
                    
                    <div>
                      <span className="block">Location:</span>
                      <div className="flex items-center space-x-1">
                        <span>{getLocationFlag(log.location)}</span>
                        <span className="text-white">{log.location || 'Unknown'}</span>
                      </div>
                    </div>
                    
                    <div className="col-span-2">
                      <span className="block">User Agent:</span>
                      <span className="text-white truncate block">
                        {log.userAgent.split(' ')[0]} {log.userAgent.includes('Mac') ? '(macOS)' : 
                         log.userAgent.includes('Windows') ? '(Windows)' : 
                         log.userAgent.includes('Linux') ? '(Linux)' : ''}
                      </span>
                    </div>
                  </div>
                  
                  {log.details && (
                    <div className="mt-2">
                      <span className="text-xs text-slate-400 block">Details:</span>
                      <span className="text-xs text-slate-300">{log.details}</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Log Retention Info */}
      <div className="mt-6 p-4 bg-cyan-600/20 rounded-lg">
        <h4 className="text-sm font-medium text-cyan-300 mb-2">Log Retention Policy</h4>
        <div className="text-sm text-cyan-200 space-y-1">
          <p>• Access logs are retained for 90 days</p>
          <p>• Failed attempts are flagged for security review</p>
          <p>• Logs are encrypted and stored securely</p>
          <p>• Export logs for compliance or analysis</p>
        </div>
      </div>

      <div className="mt-4 p-3 bg-cyan-600/20 rounded-lg">
        <p className="text-sm text-cyan-300">
          📊 {accessLogs.length} access events logged. Monitor for unusual patterns or unauthorized access.
        </p>
      </div>
    </motion.div>
  )
}