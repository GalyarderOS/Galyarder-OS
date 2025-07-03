import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import { 
  Home, Target, Brain, MessageSquare, BarChart3, Settings 
} from 'lucide-react'
import { getThemeClasses } from '@/lib/theme'
import { useAppStore } from '@/lib/store'
import { cn } from '@/lib/utils'

interface DockItem {
  id: string
  label: string
  icon: React.ReactNode
  href: string
  color: string
}

export function Dock() {
  const { colors, glass } = getThemeClasses()
  const { user } = useAppStore()
  const navigate = useNavigate()
  const location = useLocation()

  // Essential dock items for GalyarderOS
  const dockItems: DockItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <Home className="w-5 h-5" />,
      href: '/app/dashboard',
      color: colors.consciousness.primary
    },
    {
      id: 'productivity',
      label: 'Productivity',
      icon: <Target className="w-5 h-5" />,
      href: '/app/productivity',
      color: colors.status.success
    },
    {
      id: 'consciousness',
      label: 'Consciousness',
      icon: <Brain className="w-5 h-5" />,
      href: '/app/consciousness',
      color: colors.consciousness.secondary
    },
    {
      id: 'ai-assistant',
      label: 'AI Assistant',
      icon: <MessageSquare className="w-5 h-5" />,
      href: '/app/ai-assistant',
      color: colors.status.info
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: <BarChart3 className="w-5 h-5" />,
      href: '/app/analytics',
      color: colors.status.warning
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings className="w-5 h-5" />,
      href: '/app/settings',
      color: colors.text.tertiary
    }
  ]

  if (!user) return null

  return (
    <>
      {/* Mobile Dock */}
      <div className="md:hidden">
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-0 left-0 right-0 z-40 safe-area-bottom"
        >
          <div
            className={cn(
              "mx-4 mb-4 p-2 rounded-2xl border backdrop-blur-xl",
              glass
            )}
            style={{
              backgroundColor: colors.bg.elevated,
              borderColor: colors.border.primary
            }}
          >
            <div className="flex items-center justify-around">
              {dockItems.slice(0, 4).map((item) => (
                <DockItemButton 
                  key={item.id} 
                  item={item} 
                  isActive={location.pathname === item.href}
                  onClick={() => navigate(item.href)}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Desktop Dock */}
      <div className="hidden md:block">
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40"
        >
          <div
            className={cn(
              "px-4 py-3 rounded-2xl border backdrop-blur-xl",
              glass
            )}
            style={{
              backgroundColor: colors.bg.elevated,
              borderColor: colors.border.primary
            }}
          >
            <div className="flex items-center space-x-2">
              {dockItems.map((item) => (
                <DockItemButton 
                  key={item.id} 
                  item={item} 
                  isActive={location.pathname === item.href}
                  onClick={() => navigate(item.href)}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  )
}

function DockItemButton({ 
  item, 
  isActive, 
  onClick 
}: { 
  item: DockItem
  isActive: boolean
  onClick: () => void
}) {
  const { colors } = getThemeClasses()

  return (
    <motion.button
      onClick={onClick}
      className="relative p-3 rounded-xl transition-all duration-200 group"
      style={{
        backgroundColor: isActive ? `${item.color}20` : 'transparent'
      }}
      whileHover={{ 
        scale: 1.05,
        backgroundColor: `${item.color}15`
      }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Icon */}
      <div
        className="transition-colors duration-200"
        style={{
          color: isActive ? item.color : colors.text.secondary
        }}
      >
        {item.icon}
      </div>

      {/* Active indicator */}
      {isActive && (
        <motion.div
          layoutId="activeTab"
          className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full"
          style={{ backgroundColor: item.color }}
          initial={false}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}

      {/* Tooltip */}
      <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        <div
          className="px-2 py-1 text-xs rounded whitespace-nowrap"
          style={{
            backgroundColor: colors.bg.elevated,
            color: colors.text.primary,
            border: `1px solid ${colors.border.primary}`
          }}
        >
          {item.label}
        </div>
      </div>
    </motion.button>
  )
}