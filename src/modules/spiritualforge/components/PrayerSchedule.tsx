import { motion } from 'framer-motion'
import { Clock, MapPin, CheckCircle, Circle, Plus } from 'lucide-react'
import { useSpiritualStore } from '../store/spiritualStore'

export function PrayerSchedule() {
  const { prayers, completePrayer } = useSpiritualStore()

  const completedPrayers = prayers.filter(p => p.isCompleted).length
  const totalPrayers = prayers.length

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Clock className="w-5 h-5 text-emerald-400" />
          <h3 className="text-xl font-semibold text-white">Prayer Schedule</h3>
        </div>
        <div className="text-right">
          <p className="text-sm text-emerald-400 font-medium">
            {completedPrayers}/{totalPrayers} completed
          </p>
          <p className="text-xs text-slate-400">Today</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="bg-slate-700 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(completedPrayers / totalPrayers) * 100}%` }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-2 rounded-full"
          />
        </div>
      </div>

      {/* Prayer List */}
      <div className="space-y-3">
        {prayers.map((prayer, index) => (
          <motion.div
            key={prayer.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
            className={`p-4 rounded-lg border transition-all cursor-pointer ${
              prayer.isCompleted
                ? 'border-emerald-500/30 bg-emerald-500/10'
                : 'border-slate-700 bg-slate-800/30 hover:border-slate-600'
            }`}
            onClick={() => !prayer.isCompleted && completePrayer(prayer.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {prayer.isCompleted ? (
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-400" />
                )}
                
                <div>
                  <div className="flex items-center space-x-3">
                    <h4 className="text-sm font-medium text-white">{prayer.name}</h4>
                    <span className="text-sm text-slate-400 font-arabic">{prayer.arabicName}</span>
                  </div>
                  <p className="text-xs text-slate-400">{prayer.time}</p>
                </div>
              </div>
              
              <div className="text-right">
                {prayer.isCompleted && prayer.completedAt && (
                  <div className="text-xs text-emerald-400">
                    ✓ {new Date(prayer.completedAt).toLocaleTimeString()}
                  </div>
                )}
                {prayer.location && (
                  <div className="flex items-center space-x-1 text-xs text-slate-400">
                    <MapPin className="w-3 h-3" />
                    <span>{prayer.location}</span>
                  </div>
                )}
              </div>
            </div>
            
            {prayer.notes && (
              <p className="text-xs text-slate-400 mt-2 italic">"{prayer.notes}"</p>
            )}
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-6 flex space-x-3">
        <button className="flex-1 flex items-center justify-center space-x-2 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors">
          <Plus className="w-4 h-4 text-white" />
          <span className="text-white text-sm">Add Prayer Note</span>
        </button>
      </div>

      <div className="mt-6 p-3 bg-emerald-600/20 rounded-lg">
        <p className="text-sm text-emerald-300">
          🕌 May Allah accept your prayers. {completedPrayers > 0 ? 'Excellent consistency!' : 'Start with the next prayer time.'}
        </p>
      </div>
    </motion.div>
  )
}