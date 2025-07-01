import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAppStore } from '../../../lib/store'
import { getInitials, getAvatarGradient } from '../../../lib/utils'
import { AIAssistantTerminal } from '../../aiassistant/components/AIAssistantTerminal'
import { LifeAnalyticsGrid } from '../components/LifeAnalyticsGrid'
import { MasterByDesignSection } from '../components/MasterByDesignSection'

export function Dashboard() {
  const { user } = useAppStore()
  const userInitials = getInitials(user?.name || 'User')
  const userGradient = getAvatarGradient(user?.name || 'User')

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-7xl space-y-12">
        {/* Welcome Back Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl font-medium text-slate-300 mb-8">
            Welcome Back
          </h1>
        </motion.div>

        {/* User Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center space-y-6"
        >
          {/* User Avatar or Galyarder Logo */}
          <div className="flex justify-center mb-6">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-20 h-20 rounded-2xl object-cover shadow-2xl ring-4 ring-purple-500/30"
              />
            ) : (
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl">
                <span className="text-white font-bold text-2xl">G</span>
              </div>
            )}
          </div>

          {/* User Name */}
          <h2 className="text-5xl font-light text-white tracking-wide">
            {user?.name?.toLowerCase() || 'galyarder'}
          </h2>
        </motion.div>

        {/* AI Assistant Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center"
        >
          <AIAssistantTerminal />
        </motion.div>

        {/* Master Life by Design Section - Moved here */}
        <MasterByDesignSection />

        {/* Life Analytics Grid */}
        <LifeAnalyticsGrid />
      </div>
    </div>
  )
}