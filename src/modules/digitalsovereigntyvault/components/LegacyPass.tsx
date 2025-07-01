import { motion } from 'framer-motion'
import { Users, Plus, AlertCircle, CheckCircle, FileText } from 'lucide-react'
import { useDigitalSovereigntyStore } from '../store/digitalSovereigntyStore'

export function LegacyPass() {
  const { inheritanceProtocols, digitalAssets } = useDigitalSovereigntyStore()

  const getAssetName = (assetId: string) => {
    const asset = digitalAssets.find(a => a.id === assetId)
    return asset ? asset.name : 'Unknown Asset'
  }

  const getProtocolStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-emerald-400'
      case 'draft': return 'text-amber-400'
      case 'archived': return 'text-slate-400'
      default: return 'text-slate-400'
    }
  }

  const getDaysSinceReview = (lastReviewed: string) => {
    const lastDate = new Date(lastReviewed)
    const today = new Date()
    const diffTime = Math.abs(today.getTime() - lastDate.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="glass-card rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Users className="w-5 h-5 text-purple-400" />
          <h3 className="text-xl font-semibold text-white">Legacy Pass</h3>
        </div>
        <button className="flex items-center space-x-2 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors">
          <Plus className="w-4 h-4 text-white" />
          <span className="text-white text-sm">New Protocol</span>
        </button>
      </div>

      {/* Protocol Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <p className="text-lg font-bold text-white">
            {inheritanceProtocols.filter(p => p.status === 'active').length}
          </p>
          <p className="text-xs text-slate-400">Active Protocols</p>
        </div>
        
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <p className="text-lg font-bold text-white">
            {digitalAssets.filter(a => a.inheritanceStatus === 'configured').length}
          </p>
          <p className="text-xs text-slate-400">Protected Assets</p>
        </div>
      </div>

      {/* Inheritance Protocols */}
      <div className="space-y-4">
        {inheritanceProtocols.map((protocol, index) => (
          <motion.div
            key={protocol.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
            className="p-4 bg-slate-800/30 rounded-lg"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="text-sm font-medium text-white">{protocol.name}</h4>
                  <span className={`text-xs ${getProtocolStatusColor(protocol.status)}`}>
                    {protocol.status}
                  </span>
                </div>
                <p className="text-xs text-slate-400">{protocol.description}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-2 text-xs text-slate-400">
                  <FileText className="w-3 h-3" />
                  <span>
                    Last reviewed: {getDaysSinceReview(protocol.lastReviewed)} days ago
                  </span>
                </div>
              </div>
            </div>
            
            {/* Beneficiaries */}
            <div className="mb-3">
              <p className="text-xs text-slate-400 mb-1">Beneficiaries:</p>
              <div className="space-y-2">
                {protocol.beneficiaries.map(beneficiary => (
                  <div key={beneficiary.id} className="flex items-center justify-between p-2 bg-slate-700/30 rounded">
                    <div>
                      <p className="text-sm text-white">{beneficiary.name}</p>
                      <p className="text-xs text-slate-400">{beneficiary.relationship}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-300">{beneficiary.assets.length} assets</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {beneficiary.assets.slice(0, 2).map(assetId => (
                          <span key={assetId} className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded">
                            {getAssetName(assetId)}
                          </span>
                        ))}
                        {beneficiary.assets.length > 2 && (
                          <span className="text-xs text-slate-400">+{beneficiary.assets.length - 2}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Activation Conditions */}
            <div className="mb-3">
              <p className="text-xs text-slate-400 mb-1">Activation Conditions:</p>
              <div className="space-y-1">
                {protocol.activationConditions.map((condition, condIndex) => (
                  <div key={condIndex} className="flex items-center space-x-2 text-xs text-slate-300">
                    <AlertCircle className="w-3 h-3 text-amber-400" />
                    <span>{condition}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Executors */}
            <div>
              <p className="text-xs text-slate-400 mb-1">Executors:</p>
              <div className="flex flex-wrap gap-2">
                {protocol.executors.map((executor, execIndex) => (
                  <span key={execIndex} className="text-xs bg-purple-600/20 text-purple-300 px-2 py-1 rounded">
                    {executor}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Review Reminder */}
      <div className="mt-6 p-3 bg-purple-600/20 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <CheckCircle className="w-4 h-4 text-purple-400" />
          <h4 className="text-sm font-medium text-purple-300">Protocol Health Check</h4>
        </div>
        <p className="text-sm text-purple-200">
          Your inheritance protocols are up to date. Next scheduled review: {new Date('2024-07-10').toLocaleDateString()}
        </p>
      </div>
    </motion.div>
  )
}