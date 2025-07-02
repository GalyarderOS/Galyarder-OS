import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Zap, Settings, User, LogOut } from 'lucide-react'
import { getThemeClasses } from '@/lib/theme'
import { useAppStore } from '@/lib/store'
import { cn } from '@/lib/utils'

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
}

interface Command {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  action: () => void
  category: 'navigation' | 'action' | 'setting'
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const { colors, glass } = getThemeClasses()
  const { user, setUser, setHasCompletedWelcome } = useAppStore()

  // Essential commands only
  const commands: Command[] = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      description: 'Go to main dashboard',
      icon: <Zap className="w-4 h-4" />,
      action: () => {
        window.location.href = '/app/dashboard'
        onClose()
      },
      category: 'navigation'
    },
    {
      id: 'profile',
      title: 'Profile Settings',
      description: 'Manage your account settings',
      icon: <User className="w-4 h-4" />,
      action: () => {
        // Future: Open profile modal
        console.log('Profile settings')
        onClose()
      },
      category: 'setting'
    },
    {
      id: 'logout',
      title: 'Sign Out',
      description: 'Sign out of your account',
      icon: <LogOut className="w-4 h-4" />,
      action: () => {
        setUser(null)
        setHasCompletedWelcome(false)
        localStorage.removeItem('galyarderos-storage')
        window.location.href = '/'
        onClose()
      },
      category: 'action'
    }
  ]

  const filteredCommands = commands.filter(command =>
    command.title.toLowerCase().includes(query.toLowerCase()) ||
    command.description.toLowerCase().includes(query.toLowerCase())
  )

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setSelectedIndex(prev => 
            prev < filteredCommands.length - 1 ? prev + 1 : 0
          )
          break
        case 'ArrowUp':
          e.preventDefault()
          setSelectedIndex(prev => 
            prev > 0 ? prev - 1 : filteredCommands.length - 1
          )
          break
        case 'Enter':
          e.preventDefault()
          if (filteredCommands[selectedIndex]) {
            filteredCommands[selectedIndex].action()
          }
          break
        case 'Escape':
          e.preventDefault()
          onClose()
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, selectedIndex, filteredCommands, onClose])

  const getCategoryColor = (category: Command['category']) => {
    switch (category) {
      case 'navigation': return colors.consciousness.primary
      case 'action': return colors.status.warning
      case 'setting': return colors.status.info
      default: return colors.text.tertiary
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />

          {/* Command Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-lg mx-4"
          >
            <div
              className={cn(
                "border rounded-xl overflow-hidden shadow-2xl",
                glass
              )}
              style={{
                backgroundColor: colors.bg.elevated,
                borderColor: colors.border.primary
              }}
            >
              {/* Search Input */}
              <div className="flex items-center px-4 py-3 border-b" style={{ borderColor: colors.border.primary }}>
                <Search className="w-5 h-5 mr-3" style={{ color: colors.text.tertiary }} />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search commands..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-base"
                  style={{ color: colors.text.primary }}
                />
              </div>

              {/* Commands List */}
              <div className="max-h-96 overflow-y-auto">
                {filteredCommands.length > 0 ? (
                  filteredCommands.map((command, index) => (
                    <motion.div
                      key={command.id}
                      className={cn(
                        "flex items-center px-4 py-3 cursor-pointer transition-colors",
                        index === selectedIndex && "bg-opacity-50"
                      )}
                      style={{
                        backgroundColor: index === selectedIndex ? `${colors.consciousness.primary}20` : 'transparent'
                      }}
                      onClick={command.action}
                      whileHover={{ backgroundColor: `${colors.consciousness.primary}10` }}
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center mr-3"
                        style={{
                          backgroundColor: `${getCategoryColor(command.category)}20`,
                          color: getCategoryColor(command.category)
                        }}
                      >
                        {command.icon}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium" style={{ color: colors.text.primary }}>
                          {command.title}
                        </div>
                        <div className="text-sm" style={{ color: colors.text.secondary }}>
                          {command.description}
                        </div>
                      </div>
                      <div
                        className="text-xs px-2 py-1 rounded"
                        style={{
                          backgroundColor: `${getCategoryColor(command.category)}20`,
                          color: getCategoryColor(command.category)
                        }}
                      >
                        {command.category}
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="px-4 py-8 text-center">
                    <div className="text-lg mb-2" style={{ color: colors.text.secondary }}>
                      No commands found
                    </div>
                    <div className="text-sm" style={{ color: colors.text.tertiary }}>
                      Try searching with different keywords
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div
                className="px-4 py-2 border-t text-xs flex items-center justify-between"
                style={{ 
                  borderColor: colors.border.primary,
                  color: colors.text.tertiary 
                }}
              >
                <div>Use ↑↓ to navigate</div>
                <div>Enter to select, Esc to close</div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}