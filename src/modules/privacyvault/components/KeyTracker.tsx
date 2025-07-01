import { motion } from 'framer-motion'
import { Key, Plus, AlertTriangle, CheckCircle, RotateCcw } from 'lucide-react'
import { usePrivacyStore } from '../store/privacyStore'

export function KeyTracker() {
  const { securityKeys, revokeSecurityKey, runSecurityAudit } = usePrivacyStore()

  const getKeyStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-emerald-400'
      case 'expired': return 'text-red-400'
      case 'revoked': return 'text-amber-400'
      default: return 'text-slate-400'
    }
  }

  const getKeyTypeIcon = (type: string) => {
    const icons = {
      api: '🔌',
      ssh: '🖥️',
      pgp: '🔐',
      certificate: '📜',
      token: '🎫'
    }
    return icons[type as keyof typeof icons] || '🔑'
  }

  const isExpiringSoon = (expiryDate?: string) => {
    if (!expiryDate) return false
    const thirtyDaysFromNow = new Date()
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30)
    return new Date(expiryDate) <= thirtyDaysFromNow
  }

  const activeKeys = securityKeys.filter(k => k.status === 'active')
  const expiredKeys = securityKeys.filter(k => k.status === 'expired')
  const expiringSoon = securityKeys.filter(k => k.status === 'active' && isExpiringSoon(k.expiryDate))

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="glass-card rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Key className="w-5 h-5 text-amber-400" />
          <h3 className="text-xl font-semibold text-white">Key Tracker</h3>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => runSecurityAudit('key_rotation')}
            className="flex items-center space-x-2 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4 text-white" />
            <span className="text-white text-sm">Audit Keys</span>
          </button>
          <button className="flex items-center space-x-2 px-3 py-1.5 bg-amber-600 hover:bg-amber-700 rounded-lg transition-colors">
            <Plus className="w-4 h-4 text-white" />
            <span className="text-white text-sm">Add Key</span>
          </button>
        </div>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <CheckCircle className="w-5 h-5 text-emerald-400 mx-auto mb-2" />
          <p className="text-lg font-bold text-white">{activeKeys.length}</p>
          <p className="text-xs text-slate-400">Active Keys</p>
        </div>
        
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <AlertTriangle className="w-5 h-5 text-amber-400 mx-auto mb-2" />
          <p className="text-lg font-bold text-white">{expiringSoon.length}</p>
          <p className="text-xs text-slate-400">Expiring Soon</p>
        </div>
        
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <div className="w-5 h-5 bg-red-400 rounded-full mx-auto mb-2" />
          <p className="text-lg font-bold text-white">{expiredKeys.length}</p>
          <p className="text-xs text-slate-400">Expired</p>
        </div>
      </div>

      {/* Expiring Soon Alert */}
      {expiringSoon.length > 0 && (
        <div className="mb-6 p-4 bg-amber-600/20 border border-amber-600/30 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <h4 className="text-sm font-medium text-amber-300">Keys Expiring Soon</h4>
          </div>
          <div className="space-y-2">
            {expiringSoon.map(key => (
              <div key={key.id} className="flex items-center justify-between text-sm">
                <span className="text-amber-200">{key.name}</span>
                <span className="text-amber-400">
                  {key.expiryDate && new Date(key.expiryDate).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Security Keys List */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-white">Security Keys</h4>
        {securityKeys.map((key, index) => (
          <motion.div
            key={key.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
            className={`p-4 border rounded-lg ${
              key.status === 'expired' ? 'border-red-400 bg-red-400/10' :
              isExpiringSoon(key.expiryDate) ? 'border-amber-400 bg-amber-400/10' :
              'border-slate-700 bg-slate-800/30'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <span className="text-lg">{getKeyTypeIcon(key.type)}</span>
                <div>
                  <h5 className="text-sm font-medium text-white">{key.name}</h5>
                  <div className="flex items-center space-x-2 text-xs text-slate-400">
                    <span className="capitalize">{key.type} key</span>
                    <span className={getKeyStatusColor(key.status)}>
                      {key.status}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {key.status === 'active' && (
                  <button
                    onClick={() => revokeSecurityKey(key.id)}
                    className="text-xs text-red-400 hover:text-red-300 transition-colors"
                  >
                    Revoke
                  </button>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-xs text-slate-400">
              <div>
                <span className="block">Last Used:</span>
                <span className="text-white">{new Date(key.lastUsed).toLocaleDateString()}</span>
              </div>
              
              {key.expiryDate && (
                <div>
                  <span className="block">Expires:</span>
                  <span className={`${
                    isExpiringSoon(key.expiryDate) ? 'text-amber-400' : 'text-white'
                  }`}>
                    {new Date(key.expiryDate).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
            
            {key.permissions.length > 0 && (
              <div className="mt-3">
                <span className="text-xs text-slate-400 block mb-1">Permissions:</span>
                <div className="flex flex-wrap gap-1">
                  {key.permissions.slice(0, 3).map(permission => (
                    <span key={permission} className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded">
                      {permission}
                    </span>
                  ))}
                  {key.permissions.length > 3 && (
                    <span className="text-xs text-slate-400">
                      +{key.permissions.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Key Rotation Recommendations */}
      <div className="mt-6 p-4 bg-purple-600/20 rounded-lg">
        <h4 className="text-sm font-medium text-purple-300 mb-2">Key Rotation Recommendations</h4>
        <ul className="text-sm text-purple-200 space-y-1">
          <li>• Rotate API keys every 90 days</li>
          <li>• Update SSH keys annually or when team members change</li>
          <li>• Monitor key usage patterns for anomalies</li>
          <li>• Use key rotation automation where possible</li>
        </ul>
      </div>

      <div className="mt-4 p-3 bg-amber-600/20 rounded-lg">
        <p className="text-sm text-amber-300">
          🔑 {activeKeys.length} active keys are protecting your systems. Regular rotation maintains security.
        </p>
      </div>
    </motion.div>
  )
}