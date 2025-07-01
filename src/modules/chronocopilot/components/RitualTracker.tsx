import { motion } from 'framer-motion'
import { CheckCircle, Circle, Flame } from 'lucide-react'

const rituals = [
  { id: 1, name: 'Morning Meditation', completed: true, streak: 12 },
  { id: 2, name: 'Evening Journal', completed: true, streak: 8 },
  { id: 3, name: 'Exercise', completed: false, streak: 5 },
  { id: 4, name: 'Reading', completed: true, streak: 15 },
  { id: 5, name: 'Gratitude Practice', completed: false, streak: 3 }
]

export function RitualTracker() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass-card rounded-xl p-6"
    >
      <h3 className="text-lg font-semibold text-white mb-4">Daily Rituals</h3>
      
      <div className="space-y-3">
        {rituals.map((ritual, index) => (
          <motion.div
            key={ritual.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg hover:bg-slate-800/50 transition-colors cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              {ritual.completed ? (
                <CheckCircle className="w-5 h-5 text-emerald-400" />
              ) : (
                <Circle className="w-5 h-5 text-slate-400" />
              )}
              <span className={`text-sm ${ritual.completed ? 'text-white' : 'text-slate-300'}`}>
                {ritual.name}
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Flame className="w-4 h-4 text-orange-400" />
              <span className="text-xs text-slate-400">{ritual.streak}</span>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-blue-600/20 rounded-lg">
        <p className="text-sm text-blue-300">
          Complete 3 more rituals to maintain your streak!
        </p>
      </div>
    </motion.div>
  )
}