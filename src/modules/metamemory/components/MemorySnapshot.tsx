import { motion } from 'framer-motion'
import { Camera, Calendar, TrendingUp, Award, AlertCircle, CheckCircle } from 'lucide-react'
import { useMetaMemoryStore } from '../store/metaMemoryStore'

export function MemorySnapshot() {
  const { snapshots } = useMetaMemoryStore()

  const getSnapshotTypeColor = (type: string) => {
    switch (type) {
      case 'daily': return 'text-blue-400'
      case 'weekly': return 'text-purple-400'
      case 'monthly': return 'text-emerald-400'
      case 'milestone': return 'text-amber-400'
      default: return 'text-slate-400'
    }
  }

  const getSnapshotTypeIcon = (type: string) => {
    switch (type) {
      case 'daily': return Calendar
      case 'weekly': return Calendar
      case 'monthly': return Calendar
      case 'milestone': return Award
      default: return Calendar
    }
  }

  const getMoodEmoji = (mood: number) => {
    if (mood >= 8) return '😄'
    if (mood >= 6) return '🙂'
    if (mood >= 4) return '😐'
    return '😔'
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
          <Camera className="w-5 h-5 text-purple-400" />
          <h3 className="text-xl font-semibold text-white">Memory Snapshots</h3>
        </div>
        <button className="flex items-center space-x-2 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors">
          <Camera className="w-4 h-4 text-white" />
          <span className="text-white text-sm">Take Snapshot</span>
        </button>
      </div>

      <div className="space-y-4">
        {snapshots.map((snapshot, index) => {
          const SnapshotIcon = getSnapshotTypeIcon(snapshot.type)
          const typeColor = getSnapshotTypeColor(snapshot.type)
          
          return (
            <motion.div
              key={snapshot.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              className="p-4 bg-slate-800/30 rounded-lg"
            >
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-slate-700/50 rounded-lg">
                  <SnapshotIcon className={`w-4 h-4 ${typeColor}`} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-white">{snapshot.title}</h4>
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs px-2 py-1 rounded-full bg-slate-700 ${typeColor}`}>
                        {snapshot.type}
                      </span>
                      <span className="text-xs text-slate-400">
                        {new Date(snapshot.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-slate-300 mb-3">{snapshot.summary}</p>
                  
                  {/* Key Metrics */}
                  <div className="grid grid-cols-4 gap-2 mb-3">
                    {Object.entries(snapshot.keyMetrics).map(([key, value]) => (
                      <div key={key} className="bg-slate-700/30 rounded p-2 text-center">
                        <p className="text-xs text-slate-400 capitalize">{key}</p>
                        <p className="text-sm font-medium text-white">{value}%</p>
                      </div>
                    ))}
                  </div>
                  
                  {/* Mood & Energy */}
                  <div className="flex items-center space-x-4 mb-3">
                    <div className="flex items-center space-x-1">
                      <span className="text-lg">{getMoodEmoji(snapshot.mood)}</span>
                      <span className="text-xs text-slate-400">Mood: {snapshot.mood}/10</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="w-3 h-3 text-emerald-400" />
                      <span className="text-xs text-slate-400">Energy: {snapshot.energy}/10</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="w-3 h-3 text-blue-400" />
                      <span className="text-xs text-slate-400">Satisfaction: {snapshot.satisfaction}/10</span>
                    </div>
                  </div>
                  
                  {/* Expandable Sections */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-xs text-emerald-400">
                      <Award className="w-3 h-3" />
                      <span>Achievements: {snapshot.achievements.length}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-amber-400">
                      <AlertCircle className="w-3 h-3" />
                      <span>Challenges: {snapshot.challenges.length}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-blue-400">
                      <TrendingUp className="w-3 h-3" />
                      <span>Insights: {snapshot.insights.length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className="mt-6 p-3 bg-purple-600/20 rounded-lg">
        <p className="text-sm text-purple-300">
          📸 Regular snapshots help you track your progress and identify patterns in your personal development.
        </p>
      </div>
    </motion.div>
  )
}