import { motion } from 'framer-motion'
import { Key, Plus, RotateCcw, AlertCircle, Shield, Calendar } from 'lucide-react'
import { useDigitalSovereigntyStore } from '../store/digitalSovereigntyStore'

export function KeyVault() {
  const { securityKeys, rotateSecurityKey, getKeysNeedingRotation } = useDigitalSovereigntyStore()

  const keysNeedingRotation = getKeysNeedingRotation(30)

  const getKeyTypeIcon = (type: string) => {
    const icons = {
      'password': '🔑',
      'seed-phrase': '🌱',
      'private-key': '🔐',
      'api-key': '🔌',
      'other': '🔒'
    }
    return icons[type as keyof typeof icons] || '🔒'
  }

  const getStorageMethodColor = (method: string) => {
    switch (method) {
      case 'hardware': return 'text-emerald-400'
      case 'encrypted': return 'text-blue-400'
      case 'paper': return 'text-amber-400'
      case 'mental': return 'text-purple-400'
      default: return 'text-slate-400'
    }
  }

  const getDaysSinceRotation = (lastRotated: string) => {
    const lastDate = new Date(lastRotated)
    const today = new Date()
    const diffTime = Math.abs(today.getTime() - lastDate.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Key className="w-5 h-5 text-blue-400" />
          <h3 className="text-xl font-semibold text-white">Key Vault</h3>
        </div>
        <button className="flex items-center space-x-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
          <Plus className="w-4 h-4 text-white" />
          <span className="text-white text-sm">Add Key</span>
        </button>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <p className="text-lg font-bold text-white">{securityKeys.length}</p>
          <p className="text-xs text-slate-400">Total Keys</p>
        </div>
        
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <p className="text-lg font-bold text-white">{keysNeedingRotation.length}</p>
          <p className="text-xs text-slate-400">Need Rotation</p>
        </div>
        
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <p className="text-lg font-bold text-white">
            {securityKeys.filter(k => k.storageMethod === 'hardware').length}
          </p>
          <p className="text-xs text-slate-400">Hardware Secured</p>
        </div>
      </div>

      {/* Keys Needing Rotation */}
      {keysNeedingRotation.length > 0 && (
        <div className="mb-6 p-4 bg-amber-600/20 border border-amber-600/30 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <AlertCircle className="w-4 h-4 text-amber-400" />
            <h4 className="text-sm font-medium text-amber-300">Keys Needing Rotation</h4>
          </div>
          <div className="space-y-2">
            {keysNeedingRotation.map(key => (
              <div key={key.id} className="flex items-center justify-between text-sm">
                <span className="text-amber-200">{key.name}</span>
                <button
                  onClick={() => rotateSecurityKey(key.id)}
                  className="text-xs text-blue-400 hover:text-blue-300 transition-colors flex items-center space-x-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Rotate Now</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Security Keys */}
      <div className="space-y-4">
        {securityKeys.map((key, index) => (
          <motion.div
            key={key.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
            className="p-4 bg-slate-800/30 rounded-lg"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{getKeyTypeIcon(key.type)}</span>
                <div>
                  <h4 className="text-sm font-medium text-white">{key.name}</h4>
                  <p className="text-xs text-slate-400 capitalize">{key.type}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-2">
                  <span className={`text-xs ${getStorageMethodColor(key.storageMethod)}`}>
                    {key.storageMethod} storage
                  </span>
                  <button
                    onClick={() => rotateSecurityKey(key.id)}
                    className="p-1 hover:bg-slate-700 rounded transition-colors"
                  >
                    <RotateCcw className="w-3 h-3 text-slate-400 hover:text-blue-400" />
                  </button>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Last rotated: {getDaysSinceRotation(key.lastRotated)} days ago
                </p>
              </div>
            </div>
            
            {/* Associated Assets */}
            {key.associatedAssets.length > 0 && (
              <div className="mb-3">
                <p className="text-xs text-slate-400 mb-1">Associated Assets:</p>
                <div className="flex flex-wrap gap-1">
                  {key.associatedAssets.map(assetId => (
                    <span key={assetId} className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded">
                      {assetId}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Rotation Schedule */}
            {key.nextRotation && (
              <div className="flex items-center space-x-2 text-xs">
                <Calendar className="w-3 h-3 text-blue-400" />
                <span className="text-slate-400">
                  Next rotation: {new Date(key.nextRotation).toLocaleDateString()}
                </span>
              </div>
            )}
            
            {key.notes && (
              <p className="text-xs text-slate-400 mt-2 italic">"{key.notes}"</p>
            )}
          </motion.div>
        ))}
      </div>

      <div className="mt-6 p-3 bg-blue-600/20 rounded-lg">
        <p className="text-sm text-blue-300">
          🔐 Regular key rotation is essential for maintaining digital sovereignty and security.
        </p>
      </div>
    </motion.div>
  )
}