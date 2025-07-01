import { motion } from 'framer-motion'
import { Moon, Plus, TrendingUp, Heart, Zap } from 'lucide-react'
import { useSleepStore } from '../store/sleepStore'

export function SleepLog() {
  const { sessions } = useSleepStore()

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  const getQualityColor = (quality: number) => {
    if (quality >= 8) return 'text-emerald-400'
    if (quality >= 6) return 'text-amber-400'
    return 'text-red-400'
  }

  const averageQuality = sessions.reduce((sum, s) => sum + s.quality, 0) / sessions.length
  const averageDuration = sessions.reduce((sum, s) => sum + s.duration, 0) / sessions.length
  const averageRecovery = sessions.reduce((sum, s) => sum + s.recovery.bodyBattery, 0) / sessions.length

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Moon className="w-5 h-5 text-blue-400" />
          <h3 className="text-xl font-semibold text-white">Sleep Log</h3>
        </div>
        <button className="flex items-center space-x-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
          <Plus className="w-4 h-4 text-white" />
          <span className="text-white text-sm">Log Sleep</span>
        </button>
      </div>

      {/* Sleep Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <TrendingUp className="w-5 h-5 text-emerald-400 mx-auto mb-2" />
          <p className="text-lg font-bold text-white">{averageQuality.toFixed(1)}</p>
          <p className="text-xs text-slate-400">Avg Quality</p>
        </div>
        
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <Moon className="w-5 h-5 text-blue-400 mx-auto mb-2" />
          <p className="text-lg font-bold text-white">{formatDuration(averageDuration)}</p>
          <p className="text-xs text-slate-400">Avg Duration</p>
        </div>
        
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <Zap className="w-5 h-5 text-amber-400 mx-auto mb-2" />
          <p className="text-lg font-bold text-white">{Math.round(averageRecovery)}%</p>
          <p className="text-xs text-slate-400">Recovery</p>
        </div>
      </div>

      {/* Recent Sleep Sessions */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-white">Recent Sessions</h4>
        {sessions.slice(0, 5).map((session, index) => (
          <motion.div
            key={session.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
            className="p-4 bg-slate-800/30 rounded-lg"
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm font-medium text-white">
                  {new Date(session.date).toLocaleDateString()}
                </p>
                <p className="text-xs text-slate-400">
                  {session.bedTime} - {session.wakeTime}
                </p>
              </div>
              <div className="text-right">
                <p className={`text-sm font-medium ${getQualityColor(session.quality)}`}>
                  {session.quality}/10
                </p>
                <p className="text-xs text-slate-400">{formatDuration(session.duration)}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div className="flex items-center space-x-2">
                <Heart className="w-3 h-3 text-red-400" />
                <span className="text-slate-300">{session.recovery.restingHR} bpm</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-3 h-3 text-emerald-400" />
                <span className="text-slate-300">HRV {session.recovery.hrv}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-3 h-3 text-amber-400" />
                <span className="text-slate-300">{session.recovery.bodyBattery}%</span>
              </div>
            </div>
            
            {session.notes && (
              <p className="text-xs text-slate-400 mt-2 italic">"{session.notes}"</p>
            )}
          </motion.div>
        ))}
      </div>

      <div className="mt-6 p-3 bg-blue-600/20 rounded-lg">
        <p className="text-sm text-blue-300">
          😴 Your sleep quality has improved 15% this month. Keep up the consistent schedule!
        </p>
      </div>
    </motion.div>
  )
}