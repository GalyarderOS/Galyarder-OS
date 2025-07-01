import { motion } from 'framer-motion'
import { Shield, Key, Eye, AlertTriangle, Plus, Lock } from 'lucide-react'
import { usePrivacyStore } from '../store/privacyStore'

export function VaultDashboard() {
  const { vaultItems, securityKeys, securityAudits, privacySettings } = usePrivacyStore()

  const getSecurityScore = () => {
    const latestAudit = securityAudits[0]
    return latestAudit?.score || 85
  }

  const getVulnerabilities = () => {
    return securityAudits
      .flatMap(audit => audit.findings)
      .filter(finding => finding.severity === 'high' || finding.severity === 'critical')
      .length
  }

  const getExpiringSoon = () => {
    const thirtyDaysFromNow = new Date()
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30)
    
    return securityKeys.filter(key => 
      key.expiryDate && new Date(key.expiryDate) <= thirtyDaysFromNow
    ).length
  }

  const typeIcons = {
    password: '🔑',
    document: '📄',
    key: '🗝️',
    note: '📝',
    identity: '👤',
    payment: '💳'
  }

  const statusColors = {
    active: 'text-emerald-400',
    expired: 'text-red-400',
    revoked: 'text-amber-400'
  }

  const securityScore = getSecurityScore()
  const vulnerabilities = getVulnerabilities()
  const expiringSoon = getExpiringSoon()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Shield className="w-5 h-5 text-blue-400" />
          <h3 className="text-xl font-semibold text-white">Vault Dashboard</h3>
        </div>
        <button className="flex items-center space-x-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
          <Plus className="w-4 h-4 text-white" />
          <span className="text-white text-sm">Add Item</span>
        </button>
      </div>

      {/* Security Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <Shield className={`w-5 h-5 mx-auto mb-2 ${
            securityScore >= 80 ? 'text-emerald-400' : 
            securityScore >= 60 ? 'text-amber-400' : 'text-red-400'
          }`} />
          <p className="text-lg font-bold text-white">{securityScore}%</p>
          <p className="text-xs text-slate-400">Security Score</p>
        </div>
        
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <Lock className="w-5 h-5 text-blue-400 mx-auto mb-2" />
          <p className="text-lg font-bold text-white">{vaultItems.length}</p>
          <p className="text-xs text-slate-400">Vault Items</p>
        </div>
        
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <AlertTriangle className={`w-5 h-5 mx-auto mb-2 ${
            vulnerabilities > 0 ? 'text-red-400' : 'text-emerald-400'
          }`} />
          <p className="text-lg font-bold text-white">{vulnerabilities}</p>
          <p className="text-xs text-slate-400">Vulnerabilities</p>
        </div>
        
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <Key className={`w-5 h-5 mx-auto mb-2 ${
            expiringSoon > 0 ? 'text-amber-400' : 'text-emerald-400'
          }`} />
          <p className="text-lg font-bold text-white">{expiringSoon}</p>
          <p className="text-xs text-slate-400">Expiring Soon</p>
        </div>
      </div>

      {/* Recent Vault Items */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-white mb-4">Recent Vault Items</h4>
        <div className="space-y-3">
          {vaultItems.slice(0, 5).map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg hover:bg-slate-800/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <span className="text-lg">{typeIcons[item.type]}</span>
                <div>
                  <p className="text-sm font-medium text-white">{item.name}</p>
                  <div className="flex items-center space-x-2 text-xs text-slate-400">
                    <span className="capitalize">{item.type}</span>
                    <span>•</span>
                    <span>{item.category}</span>
                    <span>•</span>
                    <span>Last accessed: {new Date(item.lastAccessed).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {item.encrypted && (
                  <Lock className="w-3 h-3 text-emerald-400" />
                )}
                <Eye className="w-4 h-4 text-slate-400 hover:text-white transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Security Keys Status */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-white mb-4">Security Keys</h4>
        <div className="space-y-2">
          {securityKeys.slice(0, 3).map((key, index) => (
            <motion.div
              key={key.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <Key className="w-4 h-4 text-blue-400" />
                <div>
                  <p className="text-sm font-medium text-white">{key.name}</p>
                  <p className="text-xs text-slate-400 capitalize">{key.type} key</p>
                </div>
              </div>
              
              <div className="text-right">
                <p className={`text-sm ${statusColors[key.status]}`}>
                  {key.status}
                </p>
                {key.expiryDate && (
                  <p className="text-xs text-slate-400">
                    Expires: {new Date(key.expiryDate).toLocaleDateString()}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Security Settings Status */}
      <div className="p-4 bg-slate-800/30 rounded-lg">
        <h4 className="text-sm font-medium text-white mb-3">Security Settings</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">Two-Factor Auth</span>
            <div className={`w-2 h-2 rounded-full ${
              privacySettings.twoFactorEnabled ? 'bg-emerald-400' : 'bg-red-400'
            }`} />
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">Biometric Lock</span>
            <div className={`w-2 h-2 rounded-full ${
              privacySettings.biometricEnabled ? 'bg-emerald-400' : 'bg-red-400'
            }`} />
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">Auto Lock</span>
            <span className="text-xs text-white">{privacySettings.autoLockTimeout}m</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">Log Retention</span>
            <span className="text-xs text-white">{privacySettings.dataRetention.logRetentionDays}d</span>
          </div>
        </div>
      </div>

      <div className="mt-6 p-3 bg-blue-600/20 rounded-lg">
        <p className="text-sm text-blue-300">
          🔒 Your vault is secure with {vaultItems.filter(i => i.encrypted).length} encrypted items and strong security policies.
        </p>
      </div>
    </motion.div>
  )
}