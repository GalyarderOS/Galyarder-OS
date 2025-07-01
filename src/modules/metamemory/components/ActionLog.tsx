import { motion } from 'framer-motion'
import { Activity, Tag, Search, Filter, Clock } from 'lucide-react'
import { useMetaMemoryStore } from '../store/metaMemoryStore'

export function ActionLog() {
  const { actionLogs } = useMetaMemoryStore()

  const getModuleColor = (module: string) => {
    const colors = {
      FinanceHub: 'text-emerald-400',
      HealthForge: 'text-red-400',
      ProductivityMatrix: 'text-purple-400',
      AIAssistant: 'text-blue-400',
      ChronoCopilot: 'text-amber-400',
      MindGuard: 'text-pink-400',
      CareerCommand: 'text-indigo-400',
      RelationshipsForge: 'text-violet-400'
    }
    return colors[module as keyof typeof colors] || 'text-slate-400'
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-400/20 text-red-400'
      case 'medium': return 'bg-amber-400/20 text-amber-400'
      case 'low': return 'bg-emerald-400/20 text-emerald-400'
      default: return 'bg-slate-400/20 text-slate-400'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Activity className="w-5 h-5 text-blue-400" />
          <h3 className="text-xl font-semibold text-white">Action Log</h3>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
            <Filter className="w-4 h-4 text-slate-400 hover:text-white" />
          </button>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search logs..."
              className="w-48 pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Log Timeline */}
      <div className="space-y-4">
        {actionLogs.map((log, index) => (
          <motion.div
            key={log.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
            className="p-4 bg-slate-800/30 rounded-lg"
          >
            <div className="flex items-start space-x-3">
              <div className="relative">
                <div className="p-2 bg-slate-700/50 rounded-lg">
                  <Activity className={`w-4 h-4 ${getModuleColor(log.module)}`} />
                </div>
                {index < actionLogs.length - 1 && (
                  <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-px h-8 bg-slate-600" />
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <h4 className="text-sm font-medium text-white">{log.action}</h4>
                    <span className={`text-xs px-2 py-1 rounded ${getModuleColor(log.module)}`}>
                      {log.module}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs px-2 py-1 rounded ${getImpactColor(log.impact)}`}>
                      {log.impact} impact
                    </span>
                    <span className="text-xs text-slate-400">
                      <Clock className="inline w-3 h-3 mr-1" />
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
                
                <p className="text-sm text-slate-300 mb-3">{log.details}</p>
                
                {/* Context Data */}
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {Object.entries(log.context).map(([key, value]) => (
                    <div key={key} className="bg-slate-700/30 rounded p-2 text-xs">
                      <span className="text-slate-400">{key}: </span>
                      <span className="text-white">{
                        typeof value === 'object' 
                          ? JSON.stringify(value) 
                          : value.toString()
                      }</span>
                    </div>
                  ))}
                </div>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {log.tags.map(tag => (
                    <span key={tag} className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded flex items-center space-x-1">
                      <Tag className="w-2 h-2" />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 p-3 bg-blue-600/20 rounded-lg">
        <p className="text-sm text-blue-300">
          🔍 Your action log provides a complete history of your system interactions for reflection and analysis.
        </p>
      </div>
    </motion.div>
  )
}