import { motion } from 'framer-motion'
import { Plus, Clock, Target, Brain, DollarSign, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'

const actions = [
  {
    title: 'Add Time Block',
    description: 'Schedule focused work',
    icon: Clock,
    href: '/chrono-copilot',
    color: 'from-blue-500 to-blue-600'
  },
  {
    title: 'Set New Goal',
    description: 'Define your target',
    icon: Target,
    href: '/productivity-matrix',
    color: 'from-purple-500 to-purple-600'
  },
  {
    title: 'Log Expense',
    description: 'Track your spending',
    icon: DollarSign,
    href: '/finance-hub',
    color: 'from-emerald-500 to-emerald-600'
  },
  {
    title: 'Health Check',
    description: 'Update wellness data',
    icon: Heart,
    href: '/health-forge',
    color: 'from-red-500 to-red-600'
  },
  {
    title: 'AI Insight',
    description: 'Get personalized advice',
    icon: Brain,
    href: '/ai-assistant',
    color: 'from-amber-500 to-amber-600'
  }
]

export function QuickActions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="glass-card rounded-xl p-6"
    >
      <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
      
      <div className="space-y-3">
        {actions.map((action, index) => (
          <motion.div
            key={action.title}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
          >
            <Link
              to={action.href}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-800/30 transition-all duration-200 group"
            >
              <div className={`p-2 rounded-lg bg-gradient-to-r ${action.color} group-hover:scale-110 transition-transform`}>
                <action.icon className="w-4 h-4 text-white" />
              </div>
              
              <div className="flex-1">
                <p className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">
                  {action.title}
                </p>
                <p className="text-xs text-slate-400">
                  {action.description}
                </p>
              </div>
              
              <Plus className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}