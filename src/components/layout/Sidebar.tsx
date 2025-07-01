import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
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
  Trophy,
  Menu,
  X
} from 'lucide-react'
import { useAppStore } from '@/lib/store'
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

export function Sidebar() {
  const location = useLocation()
  const { sidebarOpen, setSidebarOpen } = useAppStore()

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.div
        initial={false}
        animate={{ width: sidebarOpen ? 256 : 64 }}
        className="fixed inset-y-0 left-0 z-50 hidden lg:flex lg:flex-col bg-slate-900/95 backdrop-blur-sm border-r border-slate-700/50"
      >
        <div className="flex h-16 items-center justify-between px-4">
          <motion.div
            initial={false}
            animate={{ opacity: sidebarOpen ? 1 : 0 }}
            className="flex items-center space-x-2"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">G</span>
            </div>
            {sidebarOpen && (
              <span className="text-white font-semibold">GalyarderOS</span>
            )}
          </motion.div>
          
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
          >
            {sidebarOpen ? (
              <X className="w-5 h-5 text-slate-400" />
            ) : (
              <Menu className="w-5 h-5 text-slate-400" />
            )}
          </button>
        </div>

        <nav className="flex-1 px-2 py-4 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                )}
              >
                <item.icon className={cn(
                  "flex-shrink-0 w-5 h-5",
                  sidebarOpen ? "mr-3" : "mx-auto"
                )} />
                {sidebarOpen && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    {item.name}
                  </motion.span>
                )}
              </Link>
            )
          })}
        </nav>
      </motion.div>
    </>
  )
}