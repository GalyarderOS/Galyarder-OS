import { motion } from 'framer-motion'
import { Brain, TrendingUp, Target, Clock, Heart } from 'lucide-react'

const insights = [
  {
    title: 'Productivity Peak',
    description: 'Your most productive hours are 9-11 AM',
    icon: TrendingUp,
    color: 'text-emerald-400'
  },
  {
    title: 'Goal Alignment',
    description: 'Health goals need more attention this week',
    icon: Target,
    color: 'text-blue-400'
  },
  {
    title: 'Time Optimization',
    description: 'Consider batching similar tasks together',
    icon: Clock,
    color: 'text-purple-400'
  },
  {
    title: 'Wellness Check',
    description: 'Stress levels elevated - schedule downtime',
    icon: Heart,
    color: 'text-red-400'
  }
]

const suggestions = [
  'Review your weekly goals and adjust priorities',
  'Schedule a 30-minute break between intense work sessions',
  'Consider adding a mindfulness practice to your routine',
  'Update your financial tracking for better insights',
  'Plan your meals for the week to support health goals'
]

export function NotionAssistantPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="space-y-6"
    >
      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Brain className="w-5 h-5 text-purple-400" />
          <h3 className="text-lg font-semibold text-white">AI Insights</h3>
        </div>
        
        <div className="space-y-3">
          {insights.map((insight, index) => (
            <motion.div
              key={insight.title}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="flex items-start space-x-3 p-3 bg-slate-800/30 rounded-lg"
            >
              <insight.icon className={`w-4 h-4 mt-0.5 ${insight.color}`} />
              <div>
                <p className="text-sm font-medium text-white">{insight.title}</p>
                <p className="text-xs text-slate-400 mt-1">{insight.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="glass-card rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Suggestions</h3>
        
        <div className="space-y-2">
          {suggestions.map((suggestion, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="flex items-start space-x-2 text-sm text-slate-300"
            >
              <span className="text-blue-400 mt-1">•</span>
              <span>{suggestion}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}