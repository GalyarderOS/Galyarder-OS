import React from 'react'
import { motion } from 'framer-motion'
import { 
  BarChart3, Zap, Target, Clock, Brain, 
  TrendingUp, Calendar, MessageSquare 
} from 'lucide-react'
import { useAppStore } from '../../lib/store'
import { getThemeClasses } from '../../lib/theme'
import { AIChat } from '../../components/ai/AIChat'

export function Dashboard() {
  const { user } = useAppStore()
  const { colors } = getThemeClasses()

  const stats = [
    {
      label: 'Consciousness Level',
      value: '7.2',
      change: '+0.3',
      icon: <Brain className="w-5 h-5" />,
      color: colors.consciousness.primary
    },
    {
      label: 'Weekly Progress',
      value: '85%',
      change: '+12%',
      icon: <TrendingUp className="w-5 h-5" />,
      color: colors.status.success
    },
    {
      label: 'Tasks Completed',
      value: '47',
      change: '+8',
      icon: <Target className="w-5 h-5" />,
      color: colors.consciousness.secondary
    },
    {
      label: 'Focus Time',
      value: '5.2h',
      change: '+1.2h',
      icon: <Clock className="w-5 h-5" />,
      color: colors.status.warning
    }
  ]

  const quickActions = [
    { label: 'Add Task', action: () => {}, color: colors.consciousness.primary },
    { label: 'Log Entry', action: () => {}, color: colors.status.success },
    { label: 'Start Focus', action: () => {}, color: colors.consciousness.secondary },
    { label: 'Review Goals', action: () => {}, color: colors.status.warning }
  ]

  return (
    <div className="p-6 space-y-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 
          className="text-3xl font-bold mb-2"
          style={{ color: colors.text.primary }}
        >
          Welcome back, {user?.name || 'User'}!
        </h1>
        <p 
          className="text-lg opacity-80"
          style={{ color: colors.text.secondary }}
        >
          Here's your personal civilization overview
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="p-6 rounded-xl border"
            style={{
              backgroundColor: colors.bg.elevated,
              borderColor: colors.border.primary
            }}
            whileHover={{ scale: 1.02 }}
            transition={{ delay: index * 0.05 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div 
                className="p-2 rounded-lg"
                style={{ backgroundColor: `${stat.color}20`, color: stat.color }}
              >
                {stat.icon}
              </div>
              <span 
                className="text-sm font-medium"
                style={{ color: colors.status.success }}
              >
                {stat.change}
              </span>
            </div>
            <div>
              <div 
                className="text-2xl font-bold mb-1"
                style={{ color: colors.text.primary }}
              >
                {stat.value}
              </div>
              <div 
                className="text-sm"
                style={{ color: colors.text.secondary }}
              >
                {stat.label}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* AI Assistant */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <h2 
            className="text-xl font-semibold"
            style={{ color: colors.text.primary }}
          >
            AI Assistant
          </h2>
          <AIChat maxHeight="400px" />
        </motion.div>

        {/* Quick Actions & Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          {/* Quick Actions */}
          <div>
            <h2 
              className="text-xl font-semibold mb-4"
              style={{ color: colors.text.primary }}
            >
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action, index) => (
                <motion.button
                  key={action.label}
                  className="p-4 rounded-lg text-left transition-all duration-200"
                  style={{
                    backgroundColor: `${action.color}15`,
                    borderColor: `${action.color}30`,
                    color: action.color
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={action.action}
                >
                  <div className="font-medium">{action.label}</div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h2 
              className="text-xl font-semibold mb-4"
              style={{ color: colors.text.primary }}
            >
              Recent Activity
            </h2>
            <div 
              className="p-6 rounded-xl border"
              style={{
                backgroundColor: colors.bg.elevated,
                borderColor: colors.border.primary
              }}
            >
              <div className="space-y-4">
                {[
                  { time: '2h ago', action: 'Completed morning routine', type: 'success' },
                  { time: '4h ago', action: 'Logged consciousness entry', type: 'info' },
                  { time: '6h ago', action: 'Started focus session', type: 'warning' },
                  { time: '1d ago', action: 'Set weekly goals', type: 'info' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div 
                      className="w-2 h-2 rounded-full"
                      style={{ 
                        backgroundColor: activity.type === 'success' ? colors.status.success :
                                       activity.type === 'warning' ? colors.status.warning :
                                       colors.consciousness.primary
                      }}
                    />
                    <div className="flex-1">
                      <div 
                        className="text-sm"
                        style={{ color: colors.text.primary }}
                      >
                        {activity.action}
                      </div>
                      <div 
                        className="text-xs"
                        style={{ color: colors.text.tertiary }}
                      >
                        {activity.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}