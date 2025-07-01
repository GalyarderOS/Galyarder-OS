import { motion } from 'framer-motion'
import { Target, Clock, Zap, CheckCircle } from 'lucide-react'

const focusSessions = [
  {
    id: 1,
    task: 'Complete project proposal',
    duration: 90,
    priority: 'high',
    completed: true,
    startTime: '09:00'
  },
  {
    id: 2,
    task: 'Review team feedback',
    duration: 45,
    priority: 'medium',
    completed: true,
    startTime: '11:00'
  },
  {
    id: 3,
    task: 'Design system updates',
    duration: 120,
    priority: 'high',
    completed: false,
    startTime: '14:00'
  },
  {
    id: 4,
    task: 'Email responses',
    duration: 30,
    priority: 'low',
    completed: false,
    startTime: '16:30'
  }
]

const priorityColors = {
  high: 'border-red-400 bg-red-400/10',
  medium: 'border-amber-400 bg-amber-400/10',
  low: 'border-emerald-400 bg-emerald-400/10'
}

export function FocusPlanner() {
  const completedSessions = focusSessions.filter(s => s.completed).length
  const totalFocusTime = focusSessions
    .filter(s => s.completed)
    .reduce((sum, s) => sum + s.duration, 0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-xl p-6"
    >
      <div className="flex items-center space-x-3 mb-6">
        <Target className="w-5 h-5 text-purple-400" />
        <h3 className="text-xl font-semibold text-white">Focus Planner</h3>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-slate-800/50 rounded-lg p-3 text-center">
          <CheckCircle className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
          <p className="text-lg font-bold text-white">{completedSessions}</p>
          <p className="text-xs text-slate-400">Completed</p>
        </div>
        
        <div className="bg-slate-800/50 rounded-lg p-3 text-center">
          <Clock className="w-4 h-4 text-blue-400 mx-auto mb-1" />
          <p className="text-lg font-bold text-white">{totalFocusTime}m</p>
          <p className="text-xs text-slate-400">Focus Time</p>
        </div>
        
        <div className="bg-slate-800/50 rounded-lg p-3 text-center">
          <Zap className="w-4 h-4 text-amber-400 mx-auto mb-1" />
          <p className="text-lg font-bold text-white">85%</p>
          <p className="text-xs text-slate-400">Efficiency</p>
        </div>
      </div>

      <div className="space-y-3">
        {focusSessions.map((session, index) => (
          <motion.div
            key={session.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
            className={`p-4 border rounded-lg ${priorityColors[session.priority]} ${
              session.completed ? 'opacity-60' : ''
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className={`text-sm font-medium ${session.completed ? 'line-through text-slate-400' : 'text-white'}`}>
                {session.task}
              </h4>
              {session.completed && (
                <CheckCircle className="w-4 h-4 text-emerald-400" />
              )}
            </div>
            
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>{session.startTime} • {session.duration} minutes</span>
              <span className="capitalize">{session.priority} priority</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 p-3 bg-purple-600/20 rounded-lg">
        <p className="text-sm text-purple-300">
          🎯 You're on track! 2 more sessions to complete today's goals
        </p>
      </div>
    </motion.div>
  )
}