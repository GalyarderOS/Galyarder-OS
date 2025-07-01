import { motion } from 'framer-motion'
import { Globe, Plus, AlertCircle, ExternalLink, Tag } from 'lucide-react'
import { useWorldIntelligenceStore } from '../store/worldIntelligenceStore'

export function WorldMapSignals() {
  const { signals, verifySignal } = useWorldIntelligenceStore()

  const getCategoryColor = (category: string) => {
    const colors = {
      'economic': 'text-emerald-400',
      'geopolitical': 'text-red-400',
      'technological': 'text-blue-400',
      'environmental': 'text-green-400',
      'social': 'text-purple-400',
      'other': 'text-slate-400'
    }
    return colors[category as keyof typeof colors] || 'text-slate-400'
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'critical': return 'bg-red-400/20 text-red-400'
      case 'high': return 'bg-amber-400/20 text-amber-400'
      case 'medium': return 'bg-blue-400/20 text-blue-400'
      case 'low': return 'bg-emerald-400/20 text-emerald-400'
      default: return 'bg-slate-400/20 text-slate-400'
    }
  }

  const getRegionEmoji = (region: string) => {
    const emojis: Record<string, string> = {
      'Global': '🌎',
      'North America': '🇺🇸',
      'South America': '🇧🇷',
      'Europe': '🇪🇺',
      'Asia': '🇨🇳',
      'Africa': '🇿🇦',
      'Middle East': '🇦🇪',
      'Australia': '🇦🇺'
    }
    return emojis[region] || '🌍'
  }

  const recentSignals = signals.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Globe className="w-5 h-5 text-blue-400" />
          <h3 className="text-xl font-semibold text-white">World Signals</h3>
        </div>
        <button className="flex items-center space-x-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
          <Plus className="w-4 h-4 text-white" />
          <span className="text-white text-sm">Add Signal</span>
        </button>
      </div>

      {/* Signal Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <p className="text-lg font-bold text-white">{signals.length}</p>
          <p className="text-xs text-slate-400">Total Signals</p>
        </div>
        
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <p className="text-lg font-bold text-white">
            {signals.filter(s => s.impact === 'high' || s.impact === 'critical').length}
          </p>
          <p className="text-xs text-slate-400">High Impact</p>
        </div>
        
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <p className="text-lg font-bold text-white">
            {signals.filter(s => s.isVerified).length}
          </p>
          <p className="text-xs text-slate-400">Verified</p>
        </div>
      </div>

      {/* World Signals */}
      <div className="space-y-4">
        {recentSignals.map((signal, index) => (
          <motion.div
            key={signal.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
            className="p-4 bg-slate-800/30 rounded-lg"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="text-sm font-medium text-white">{signal.title}</h4>
                  {!signal.isVerified && (
                    <button
                      onClick={() => verifySignal(signal.id)}
                      className="text-xs text-amber-400 hover:text-amber-300 transition-colors flex items-center space-x-1"
                    >
                      <AlertCircle className="w-3 h-3" />
                      <span>Verify</span>
                    </button>
                  )}
                </div>
                <p className="text-sm text-slate-300 mb-3">{signal.description}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-2">
                  <span className={`text-xs px-2 py-1 rounded ${getImpactColor(signal.impact)}`}>
                    {signal.impact} impact
                  </span>
                  <span className={`text-xs capitalize ${getCategoryColor(signal.category)}`}>
                    {signal.category}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  {new Date(signal.date).toLocaleDateString()}
                </p>
              </div>
            </div>
            
            {/* Source & Regions */}
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="flex items-center space-x-2 text-xs">
                <span className="text-slate-400">Source:</span>
                <span className="text-slate-300">
                  {signal.source}
                  {signal.url && (
                    <a 
                      href={signal.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center ml-1 text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-xs">
                <span className="text-slate-400">Relevance:</span>
                <span className="text-slate-300">{signal.relevance}%</span>
              </div>
            </div>
            
            {/* Regions */}
            <div className="mb-3">
              <div className="flex flex-wrap gap-1">
                {signal.regions.map(region => (
                  <span key={region} className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded flex items-center space-x-1">
                    <span>{getRegionEmoji(region)}</span>
                    <span>{region}</span>
                  </span>
                ))}
              </div>
            </div>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-1">
              {signal.tags.map(tag => (
                <span key={tag} className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded flex items-center space-x-1">
                  <Tag className="w-2 h-2" />
                  <span>{tag}</span>
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 p-3 bg-blue-600/20 rounded-lg">
        <p className="text-sm text-blue-300">
          🌎 Stay informed about global developments that may impact your strategic decisions.
        </p>
      </div>
    </motion.div>
  )
}