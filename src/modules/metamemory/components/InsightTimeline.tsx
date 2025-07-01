import { motion } from 'framer-motion'
import { Lightbulb, Star, TrendingUp, Tag, Zap } from 'lucide-react'
import { useMetaMemoryStore } from '../store/metaMemoryStore'

export function InsightTimeline() {
  const { insights, toggleStarInsight } = useMetaMemoryStore()

  const getInsightTypeColor = (type: string) => {
    switch (type) {
      case 'pattern': return 'text-blue-400'
      case 'correlation': return 'text-purple-400'
      default: return 'text-slate-400'
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-emerald-400'
    if (confidence >= 60) return 'text-amber-400'
    return 'text-red-400'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass-card rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Lightbulb className="w-5 h-5 text-amber-400" />
          <h3 className="text-xl font-semibold text-white">Insight Timeline</h3>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-400">
            {insights.length} insights generated
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {insights.map((insight, index) => (
          <motion.div
            key={insight.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
            className="p-4 bg-slate-800/30 rounded-lg"
          >
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-slate-700/50 rounded-lg">
                <Lightbulb className={`w-4 h-4 ${getInsightTypeColor(insight.type)}`} />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <h4 className="text-sm font-medium text-white">{insight.title}</h4>
                    <button
                      onClick={() => toggleStarInsight(insight.id)}
                      className="p-1 hover:bg-slate-700 rounded transition-colors"
                    >
                      {insight.isStarred ? (
                        <Star className="w-3 h-3 text-amber-400 fill-current" />
                      ) : (
                        <Star className="w-3 h-3 text-slate-400" />
                      )}
                    </button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs px-2 py-1 rounded-full bg-slate-700 ${getInsightTypeColor(insight.type)}`}>
                      {insight.type}
                    </span>
                    <span className="text-xs text-slate-400">
                      {new Date(insight.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                
                <p className="text-sm text-slate-300 mb-3">{insight.description}</p>
                
                {/* Source & Confidence */}
                <div className="flex items-center justify-between mb-3 text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="text-slate-400">Source:</span>
                    <span className="text-white">{insight.source.modules.join(', ')}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className={`w-3 h-3 ${getConfidenceColor(insight.confidence)}`} />
                    <span className={`${getConfidenceColor(insight.confidence)}`}>
                      {insight.confidence}% confidence
                    </span>
                  </div>
                </div>
                
                {/* Actionable Items */}
                {insight.actionable && insight.actions && (
                  <div className="mb-3 p-3 bg-blue-600/10 border-l-2 border-blue-500 rounded">
                    <h6 className="text-xs font-medium text-blue-400 mb-2 flex items-center space-x-2">
                      <Zap className="w-3 h-3" />
                      <span>Actionable Insights:</span>
                    </h6>
                    <ul className="space-y-1">
                      {insight.actions.map((action, actionIndex) => (
                        <li key={actionIndex} className="text-xs text-blue-200 flex items-start space-x-2">
                          <span>•</span>
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {insight.tags.map(tag => (
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

      <div className="mt-6 p-3 bg-amber-600/20 rounded-lg">
        <p className="text-sm text-amber-300">
          💡 Your system continuously analyzes patterns across modules to generate personalized insights.
        </p>
      </div>
    </motion.div>
  )
}