import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { 
  LayoutDashboard, 
  Bot, 
  Clock, 
  DollarSign, 
  Heart, 
  Target, 
  Briefcase, 
  Brain, 
  Activity, 
  Users, 
  Trophy
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'AI Assistant', href: '/ai-assistant', icon: Bot },
  { name: 'Chrono Copilot', href: '/chrono-copilot', icon: Clock },
  { name: 'Finance Hub', href: '/finance-hub', icon: DollarSign },
  { name: 'Health Forge', href: '/health-forge', icon: Heart },
  { name: 'Productivity Matrix', href: '/productivity-matrix', icon: Target },
  { name: 'Career Command', href: '/career-command', icon: Briefcase },
  { name: 'Mind Guard', href: '/mind-guard', icon: Brain },
  { name: 'System Logs', href: '/system-logs', icon: Activity },
  { name: 'Relationships Forge', href: '/relationships-forge', icon: Users },
  { name: 'Legacy Builder', href: '/legacy-builder', icon: Trophy },
]

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 z-50 p-2 bg-slate-900 rounded-lg text-white"
      >
        <Menu className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-64 bg-slate-900 z-50 flex flex-col"
            >
              <div className="flex h-16 items-center justify-between px-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">G</span>
                  </div>
                  <span className="text-white font-semibold">GalyarderOS</span>
                </div>
                
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              <nav className="flex-1 px-2 py-4 space-y-1">
                {navigation.map((item) => {
                  const isActive = location.pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                        isActive
                          ? "bg-blue-600 text-white"
                          : "text-slate-300 hover:bg-slate-800 hover:text-white"
                      )}
                    >
                      <item.icon className="flex-shrink-0 w-5 h-5 mr-3" />
                      {item.name}
                    </Link>
                  )
                })}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}