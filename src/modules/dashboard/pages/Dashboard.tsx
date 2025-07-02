import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAppStore } from '../../../lib/store'
import { getThemeClasses } from '../../../lib/theme'
import { useTranslation } from '../../../lib/i18n'
import { getInitials, getAvatarGradient } from '../../../lib/utils'
import { AIAssistantTerminal } from '../../aiassistant/components/AIAssistantTerminal'
import { LifeAnalyticsGrid } from '../components/LifeAnalyticsGrid'
import { MasterByDesignSection } from '../components/MasterByDesignSection'
import { ConsciousnessOverview } from '../components/ConsciousnessOverview'

export function Dashboard() {
  const { user } = useAppStore()
  const { colors, glass } = getThemeClasses()
  const { t } = useTranslation()
  const userInitials = getInitials(user?.name || 'User')
  const userGradient = getAvatarGradient(user?.name || 'User')

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  }

  return (
    <motion.div 
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="w-full max-w-7xl space-y-12">
        {/* Welcome Back Section */}
        <motion.div
          variants={itemVariants}
          className="text-center"
        >
          <motion.h1 
            className="text-4xl font-medium mb-8"
            style={{ color: colors.text.secondary }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            {t('dashboard.welcomeBack')}
          </motion.h1>
        </motion.div>

        {/* User Profile Section */}
        <motion.div
          variants={itemVariants}
          className="text-center space-y-6"
        >
          {/* User Avatar or Galyarder Logo */}
          <div className="flex justify-center mb-6">
            {user?.avatar ? (
              <motion.img
                src={user.avatar}
                alt={user.name}
                className="w-20 h-20 rounded-2xl object-cover shadow-2xl ring-4 ring-purple-500/30"
                whileHover={{ 
                  scale: 1.05,
                  rotate: 2
                }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              />
            ) : (
              <motion.div 
                className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl ring-4 ring-purple-500/30"
                whileHover={{ 
                  scale: 1.05,
                  rotate: 5
                }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <span className="text-white font-bold text-2xl">G</span>
              </motion.div>
            )}
          </div>

          {/* User Name */}
          <motion.h2 
            className="text-5xl font-light tracking-wide"
            style={{ color: colors.text.primary }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            {user?.name?.toLowerCase() || 'galyarder'}
          </motion.h2>
        </motion.div>

        {/* ULTIMATE CONSCIOUSNESS OVERVIEW - The Main Feature */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <ConsciousnessOverview />
        </motion.div>

        {/* AI Assistant Terminal */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <AIAssistantTerminal />
          </motion.div>
        </motion.div>

        {/* Master Life by Design Section */}
        <motion.div variants={itemVariants}>
          <MasterByDesignSection />
        </motion.div>

        {/* Life Analytics Grid */}
        <motion.div variants={itemVariants}>
          <LifeAnalyticsGrid />
        </motion.div>
      </div>
    </motion.div>
  )
}