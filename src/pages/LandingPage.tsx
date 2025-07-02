import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Zap, Brain, Target, Smartphone, Globe, Shield, 
  CheckCircle, ArrowRight, Github, Twitter, Mail,
  Sparkles, Bot, BarChart3, Settings
} from 'lucide-react'
import { useAppStore } from '../lib/store'
import { getThemeClasses } from '../lib/theme'
import { useTranslation } from '../lib/i18n'
import { ThemeSwitcher } from '../components/ui/ThemeSwitcher'
import { LanguageSwitcher } from '../components/ui/LanguageSwitcher'

export function LandingPage() {
  const [isSigningIn, setIsSigningIn] = useState(false)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  
  const { setUser, setHasCompletedWelcome } = useAppStore()
  const { colors, glass } = getThemeClasses()
  const { t } = useTranslation()

  const handleGetStarted = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !name.trim()) return

    setIsSigningIn(true)

    // Simulate user creation
    setTimeout(() => {
      const newUser = {
        id: `user_${Date.now()}`,
        email: email.trim(),
        name: name.trim(),
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=8b5cf6&color=fff&size=150`
      }

      setUser(newUser)
      setHasCompletedWelcome(true)
      setIsSigningIn(false)
    }, 2000)
  }

  const features = [
    {
      icon: <Bot className="w-6 h-6" />,
      title: 'AI Assistant',
      description: 'N8N-powered intelligent assistant for personalized guidance'
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: 'Consciousness Tracking',
      description: 'Monitor and improve your personal development journey'
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: 'PWA Mobile',
      description: 'Native app experience across all devices'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Privacy First',
      description: 'Your data stays secure with offline-first architecture'
    }
  ]

  const benefits = [
    'AI-powered personal development insights',
    'Real-time consciousness level tracking',
    'Cross-device synchronization',
    'Offline-first PWA architecture',
    'N8N webhook integration ready',
    'Complete customization freedom'
  ]

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{ backgroundColor: colors.bg.primary }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ backgroundColor: colors.consciousness.primary }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ backgroundColor: colors.consciousness.secondary }}
        />
      </div>

      {/* Header */}
      <header className="relative z-10 p-4 flex justify-between items-center">
        <motion.div 
          className="flex items-center space-x-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: colors.consciousness.primary }}
          >
            <Zap className="w-6 h-6 text-white" />
          </div>
          <span 
            className="text-xl font-bold"
            style={{ color: colors.text.primary }}
          >
            GalyarderOS
          </span>
        </motion.div>
        
        <motion.div 
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <LanguageSwitcher variant="compact" />
          <ThemeSwitcher variant="compact" />
        </motion.div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.h1 
            className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r bg-clip-text text-transparent"
            style={{ 
              backgroundImage: `linear-gradient(45deg, ${colors.consciousness.primary}, ${colors.consciousness.secondary})`
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Personal
            <br />
            Civilization
            <br />
            System
          </motion.h1>
          
          <motion.p 
            className="text-xl lg:text-2xl mb-8 max-w-3xl mx-auto"
            style={{ color: colors.text.secondary }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Transform your life with AI-powered insights, consciousness tracking, 
            and personalized development guidance. Ready for your N8N backend integration.
          </motion.p>

          {/* Sign Up Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="max-w-md mx-auto"
          >
            <form onSubmit={handleGetStarted} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border text-lg transition-all duration-200 focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: colors.bg.elevated,
                    borderColor: colors.border.primary,
                    color: colors.text.primary,
                    '--tw-ring-color': colors.consciousness.primary
                  } as React.CSSProperties}
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border text-lg transition-all duration-200 focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: colors.bg.elevated,
                    borderColor: colors.border.primary,
                    color: colors.text.primary,
                    '--tw-ring-color': colors.consciousness.primary
                  } as React.CSSProperties}
                  required
                />
              </div>
              <motion.button
                type="submit"
                disabled={isSigningIn || !email.trim() || !name.trim()}
                className="w-full py-3 px-6 rounded-xl font-semibold text-lg transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
                style={{
                  backgroundColor: colors.consciousness.primary,
                  color: colors.text.inverse
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSigningIn ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating your account...
                  </>
                ) : (
                  <>
                    Get Started Free
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className={`p-6 rounded-2xl border ${glass}`}
              style={{
                backgroundColor: colors.bg.elevated,
                borderColor: colors.border.primary
              }}
              whileHover={{ scale: 1.05 }}
              transition={{ delay: index * 0.1 }}
            >
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ 
                  backgroundColor: `${colors.consciousness.primary}20`,
                  color: colors.consciousness.primary 
                }}
              >
                {feature.icon}
              </div>
              <h3 
                className="font-semibold mb-2"
                style={{ color: colors.text.primary }}
              >
                {feature.title}
              </h3>
              <p 
                className="text-sm"
                style={{ color: colors.text.secondary }}
              >
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Benefits Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <h2 
            className="text-3xl lg:text-4xl font-bold mb-8"
            style={{ color: colors.text.primary }}
          >
            Everything You Need
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit}
                className="flex items-center gap-3 text-left"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 + index * 0.1 }}
              >
                <CheckCircle 
                  className="w-5 h-5 flex-shrink-0"
                  style={{ color: colors.status.success }}
                />
                <span style={{ color: colors.text.secondary }}>
                  {benefit}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.footer 
          className="text-center pt-8 border-t"
          style={{ borderColor: colors.border.primary }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          <p 
            className="text-sm mb-4"
            style={{ color: colors.text.tertiary }}
          >
            Ready for your database backend & N8N AI integration
          </p>
          <div className="flex justify-center gap-6">
            <a 
              href="#" 
              className="hover:opacity-80 transition-opacity"
              style={{ color: colors.text.secondary }}
            >
              <Github className="w-5 h-5" />
            </a>
            <a 
              href="#" 
              className="hover:opacity-80 transition-opacity"
              style={{ color: colors.text.secondary }}
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a 
              href="#" 
              className="hover:opacity-80 transition-opacity"
              style={{ color: colors.text.secondary }}
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </motion.footer>
      </main>
    </div>
  )
}
