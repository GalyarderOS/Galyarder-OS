import { motion } from 'framer-motion'
import { Clock, CheckCircle, Target, Brain, DollarSign, Heart } from 'lucide-react'

const activities = [
  {
    id: 1,
    type: 'habit',
    title: 'Completed morning meditation',
    module: 'ChronoCopilot',
    time: '2 hours ago',
    icon: CheckCircle,
    color: 'text-emerald-400'
  },
  {
    id: 2,
    type: 'goal',
    title: 'Updated fitness goal progress',
    module: 'HealthForge',
    time: '3 hours ago',
    icon: Target,
    color: 'text-blue-400'
  },
  {
    id: 3,
    type: 'finance',
    title: 'Logged expense: Groceries $85',
    module: 'FinanceHub',
    time: '5 hours ago',
    icon: DollarSign,
    color: 'text-emerald-400'
  },
  {
    id: 4,
    type: 'ai',
    title: 'AI insight: Optimize morning routine',
    module: 'AIAssistant',
    time: '6 hours ago',
    icon: Brain,
    color: 'text-purple-400'
  },
  {
    id: 5,
    type: 'health',
    title: 'Calorie tracking: 1,850/2,200',
    module: 'HealthForge',
    time: '8 hours ago',
    icon: Heart,
    color: 'text-red-400'
  },
  {
    id: 6,
    type: 'productivity',
    title: 'Completed deep work session',
    module: 'ProductivityMatrix',
    time: '10 hours ago',
    icon: Clock,
    color: 'text-amber-400'
  }
]

export function ActivityTimeline() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-xl p-6"
    >
      <h3 className="text-xl font-semibold text-white mb-6">Activity Timeline</h3>
      
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
            className="flex items-start space-x-4 p-4 bg-slate-800/30 rounded-lg hover:bg-slate-800/50 transition-colors"
          >
            <div className="relative">
              <div className={`p-2 rounded-lg bg-slate-700/50`}>
                <activity.icon className={`w-4 h-4 ${activity.color}`} />
              </div>
              {index < activities.length - 1 && (
                <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-px h-8 bg-slate-600" />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium text-white truncate">
                  {activity.title}
                </p>
                <span className="text-xs text-slate-400 whitespace-nowrap ml-2">
                  {activity.time}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {activity.module}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 p-3 bg-cyan-600/20 rounded-lg">
        <p className="text-sm text-cyan-300">
          📊 You've been most active in health and productivity modules today
        </p>
      </div>
    </motion.div>
  )
}