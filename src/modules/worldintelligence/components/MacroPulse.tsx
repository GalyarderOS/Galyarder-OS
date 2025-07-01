import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Activity, Plus, Tag } from 'lucide-react'
import { useWorldIntelligenceStore } from '../store/worldIntelligenceStore'

export function MacroPulse() {
  const { trends } = useWorldIntelligenceStore()

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

  const getTimeframeColor = (timeframe: string) => {
    switch (timeframe) {
      case 'short-term': return 'text-blue-400'
      case 'mid-term': return 'text-purple-400'
      case 'long-term': return 'text-amber-400'
      default: return 'text-slate-400'
    }
  }

  const getDirectionIcon = (direction: string) => {
    switch (direction) {
      case 'increasing': return TrendingUp
      case 'decreasing': return TrendingDown
      case 'volatile': return Activity
      default: return Activity
    }
  }

  const getDirectionColor = (direction: string) => {
    switch (direction) {
      case 'increasing': return 'text-emerald-400'
      case 'decreasing': return 'text-red-400'
      case 'volatile': return 'text-amber-400'
      case 'stable': return 'text-blue-400'
      default: return 'text-slate-400'
    }
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
          <TrendingUp className="w-5 h-5 text-purple-400" />
          <h3 className="text-xl font-semibold text-white">Macro Pulse</h3>
        </div>
        <button className="flex items-center space-x-2 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors">
          <Plus className="w-4 h-4 text-white" />
          <span className="text-white text-sm">Add Trend</span>
        </button>
      </div>

      {/* Trend Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <p className="text-lg font-bold text-white">
            {trends.filter(t => t.timeframe === 'short-term').length}
          </p>
          <p className="text-xs text-slate-400">Short-term</p>
        </div>
        
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <p className="text-lg font-bold text-white">
            {trends.filter(t => t.timeframe === 'mid-term').length}
          </p>
          <p className="text-xs text-slate-400">Mid-term</p>
        </div>
        
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <p className="text-lg font-bold text-white">
            {trends.filter(t => t.timeframe === 'long-term').length}
          </p>
          <p className="text-xs text-slate-400">Long-term</p>
        </div>
      </div>

      {/* Macro Trends */}
      <div className="space-y-4">
        {trends.map((trend, index) => {
          const DirectionIcon = getDirectionIcon(trend.direction)
          const directionColor = getDirectionColor(trend.direction)
          
          return (
            <motion.div
              key={trend.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              className="p-4 bg-slate-800/30 rounded-lg"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="text-sm font-medium text-white">{trend.name}</h4>
                    <span className={`text-xs capitalize ${getCategoryColor(trend.category)}`}>
                      {trend.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mb-2">{trend.description}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs ${getTimeframeColor(trend.timeframe)}`}>
                      {trend.timeframe}
                    </span>
                    <DirectionIcon className={`w-4 h-4 ${directionColor}`} />
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-slate-400 mt-1">
                    <span>Confidence:</span>
                    <span className="text-white">{trend.confidence}%</span>
                  </div>
                </div>
              </div>
              
              {/* Regions */}
              <div className="mb-3">
                <div className="flex flex-wrap gap-1">
                  {trend.regions.map(region => (
                    <span key={region} className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded">
                      {region}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Related Signals */}
              {trend.relatedSignals.length > 0 && (
                <div className="mb-3">
                  <p className="text-xs text-slate-400 mb-1">Related Signals:</p>
                  <div className="flex flex-wrap gap-1">
                    {trend.relatedSignals.map(signalId => (
                      <span key={signalId} className="text-xs bg-blue-600/20 text-blue-300 px-2 py-1 rounded">
                        Signal #{signalId}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {trend.tags.map(tag => (
                  <span key={tag} className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded flex items-center space-x-1">
                    <Tag className="w-2 h-2" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className="mt-6 p-3 bg-purple-600/20 rounded-lg">
        <p className="text-sm text-purple-300">
          📈 Understanding macro trends helps you make better strategic decisions and prepare for future scenarios.
        </p>
      </div>
    </motion.div>
  )
}