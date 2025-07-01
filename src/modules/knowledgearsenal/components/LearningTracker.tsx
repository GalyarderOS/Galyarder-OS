import { motion } from 'framer-motion'
import { Plus, Target, Clock, TrendingUp, BookOpen } from 'lucide-react'
import { useKnowledgeStore } from '../store/knowledgeStore'

export function LearningTracker() {
  const { learningGoals, studySessions } = useKnowledgeStore()

  const activeGoals = learningGoals.filter(goal => goal.status === 'active')
  const completedGoals = learningGoals.filter(goal => goal.status === 'completed')
  const totalStudyTime = studySessions.reduce((sum, session) => sum + session.duration, 0)
  const averageEffectiveness = studySessions.length > 0 
    ? studySessions.reduce((sum, session) => sum + session.effectiveness, 0) / studySessions.length 
    : 0

  const priorityColors = {
    high: 'border-red-400 bg-red-400/10',
    medium: 'border-amber-400 bg-amber-400/10',
    low: 'border-emerald-400 bg-emerald-400/10'
  }

  const categoryColors = {
    technical: 'text-blue-400',
    personal: 'text-emerald-400',
    professional: 'text-purple-400',
    creative: 'text-pink-400'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Target className="w-5 h-5 text-blue-400" />
          <h3 className="text-xl font-semibold text-white">Learning Tracker</h3>
        </div>
        <button className="flex items-center space-x-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
          <Plus className="w-4 h-4 text-white" />
          <span className="text-white text-sm">Add Goal</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <Target className="w-5 h-5 text-blue-400 mx-auto mb-2" />
          <p className="text-lg font-bold text-white">{activeGoals.length}</p>
          <p className="text-xs text-slate-400">Active Goals</p>
        </div>
        
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <TrendingUp className="w-5 h-5 text-emerald-400 mx-auto mb-2" />
          <p className="text-lg font-bold text-white">{completedGoals.length}</p>
          <p className="text-xs text-slate-400">Completed</p>
        </div>
        
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <Clock className="w-5 h-5 text-amber-400 mx-auto mb-2" />
          <p className="text-lg font-bold text-white">{Math.round(totalStudyTime / 60)}h</p>
          <p className="text-xs text-slate-400">Study Time</p>
        </div>
        
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <BookOpen className="w-5 h-5 text-purple-400 mx-auto mb-2" />
          <p className="text-lg font-bold text-white">{averageEffectiveness.toFixed(1)}/10</p>
          <p className="text-xs text-slate-400">Avg Effectiveness</p>
        </div>
      </div>

      {/* Active Goals */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-white">Active Learning Goals</h4>
        {activeGoals.map((goal, index) => (
          <motion.div
            key={goal.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
            className={`p-4 border rounded-lg ${priorityColors[goal.priority]}`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h5 className="text-sm font-medium text-white mb-1">{goal.title}</h5>
                <p className="text-xs text-slate-300 mb-2">{goal.description}</p>
                <div className="flex items-center space-x-4 text-xs text-slate-400">
                  <span className={`capitalize ${categoryColors[goal.category]}`}>
                    {goal.category}
                  </span>
                  <span>Due: {new Date(goal.targetDate).toLocaleDateString()}</span>
                  <span className="capitalize">{goal.priority} priority</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-white">{goal.progress}%</p>
              </div>
            </div>
            
            <div className="bg-slate-700 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${goal.progress}%` }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.8 }}
                className="bg-gradient-to-r from-blue-500 to-blue-400 h-2 rounded-full"
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Study Sessions */}
      <div className="mt-6">
        <h4 className="text-sm font-medium text-white mb-4">Recent Study Sessions</h4>
        <div className="space-y-2">
          {studySessions.slice(0, 3).map((session, index) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg"
            >
              <div>
                <p className="text-sm font-medium text-white">{session.subject}</p>
                <p className="text-xs text-slate-400">
                  {session.duration} min • {new Date(session.date).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-blue-400">{session.effectiveness}/10</p>
                <p className="text-xs text-slate-400 capitalize">{session.type}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-6 p-3 bg-blue-600/20 rounded-lg">
        <p className="text-sm text-blue-300">
          🎯 You're making great progress! Consider adding a new learning goal to expand your knowledge.
        </p>
      </div>
    </motion.div>
  )
}