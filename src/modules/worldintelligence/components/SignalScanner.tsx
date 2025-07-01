import { motion } from 'framer-motion'
import { Search, AlertCircle, CheckCircle, Clock, Zap } from 'lucide-react'
import { useWorldIntelligenceStore } from '../store/worldIntelligenceStore'

export function SignalScanner() {
  const { implications } = useWorldIntelligenceStore()

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'opportunity': return 'text-emerald-400'
      case 'threat': return 'text-red-400'
      case 'neutral': return 'text-blue-400'
      default: return 'text-slate-400'
    }
  }

  const getCategoryBg = (category: string) => {
    switch (category) {
      case 'opportunity': return 'bg-emerald-400/10'
      case 'threat': return 'bg-red-400/10'
      case 'neutral': return 'bg-blue-400/10'
      default: return 'bg-slate-400/10'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'identified': return 'text-amber-400'
      case 'analyzing': return 'text-blue-400'
      case 'actioning': return 'text-emerald-400'
      case 'monitoring': return 'text-purple-400'
      default: return 'text-slate-400'
    }
  }

  const getTimeframeColor = (timeframe: string) => {
    switch (timeframe) {
      case 'immediate': return 'text-red-400'
      case 'short-term': return 'text-amber-400'
      case 'mid-term': return 'text-blue-400'
      case 'long-term': return 'text-emerald-400'
      default: return 'text-slate-400'
    }
  }

  const highImpactImplications = implications.filter(i => 
    i.impact === 'high' || i.impact === 'critical'
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass-card rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Search className="w-5 h-5 text-amber-400" />
          <h3 className="text-xl font-semibold text-white">Signal Scanner</h3>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-400">
            {implications.length} implications identified
          </span>
        </div>
      </div>

      {/* Implication Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <CheckCircle className="w-5 h-5 text-emerald-400 mx-auto mb-2" />
          <p className="text-lg font-bold text-white">
            {implications.filter(i => i.category === 'opportunity').length}
          </p>
          <p className="text-xs text-slate-400">Opportunities</p>
        </div>
        
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <AlertCircle className="w-5 h-5 text-red-400 mx-auto mb-2" />
          <p className="text-lg font-bold text-white">
            {implications.filter(i => i.category === 'threat').length}
          </p>
          <p className="text-xs text-slate-400">Threats</p>
        </div>
        
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <Clock className="w-5 h-5 text-blue-400 mx-auto mb-2" />
          <p className="text-lg font-bold text-white">
            {implications.filter(i => i.timeframe === 'immediate' || i.timeframe === 'short-term').length}
          </p>
          <p className="text-xs text-slate-400">Urgent</p>
        </div>
      </div>

      {/* High Impact Implications */}
      {highImpactImplications.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-white mb-3 flex items-center space-x-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>High Impact Implications</span>
          </h4>
          <div className="space-y-3">
            {highImpactImplications.map((implication, index) => (
              <motion.div
                key={implication.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
                className={`p-4 rounded-lg ${getCategoryBg(implication.category)} border border-${getCategoryColor(implication.category).replace('text-', '')}/30`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h5 className="text-sm font-medium text-white">{implication.title}</h5>
                    <div className="flex items-center space-x-2 text-xs">
                      <span className={`${getCategoryColor(implication.category)}`}>
                        {implication.category}
                      </span>
                      <span className={`${getTimeframeColor(implication.timeframe)}`}>
                        {implication.timeframe}
                      </span>
                      <span className={`${getStatusColor(implication.status)}`}>
                        {implication.status}
                      </span>
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-slate-300 mb-3">{implication.description}</p>
                
                {/* Action Items */}
                <div className="mb-3">
                  <p className="text-xs text-slate-400 mb-1">Action Items:</p>
                  <div className="space-y-1">
                    {implication.actionItems.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-start space-x-2 text-xs text-slate-300">
                        <span>•</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Related Trends */}
                {implication.relatedTrends.length > 0 && (
                  <div>
                    <p className="text-xs text-slate-400 mb-1">Related Trends:</p>
                    <div className="flex flex-wrap gap-1">
                      {implication.relatedTrends.map(trendId => (
                        <span key={trendId} className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded">
                          Trend #{trendId}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* All Implications */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-white mb-3">All Implications</h4>
        {implications
          .filter(i => i.impact !== 'high' && i.impact !== 'critical')
          .map((implication, index) => (
            <motion.div
              key={implication.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg"
            >
              <div>
                <p className="text-sm font-medium text-white">{implication.title}</p>
                <div className="flex items-center space-x-2 text-xs">
                  <span className={`${getCategoryColor(implication.category)}`}>
                    {implication.category}
                  </span>
                  <span className={`${getTimeframeColor(implication.timeframe)}`}>
                    {implication.timeframe}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className={`text-xs px-2 py-1 rounded-full bg-slate-700 ${getStatusColor(implication.status)}`}>
                  {implication.status}
                </span>
              </div>
            </motion.div>
          ))}
      </div>

      <div className="mt-6 p-3 bg-amber-600/20 rounded-lg">
        <p className="text-sm text-amber-300">
          🔍 Regularly scan for signals and implications to stay ahead of global changes that may affect your strategy.
        </p>
      </div>
    </motion.div>
  )
}