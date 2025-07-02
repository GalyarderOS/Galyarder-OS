import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Sun, 
  Moon, 
  Monitor, 
  Palette, 
  Check,
  Settings
} from 'lucide-react'
import { useThemeStore, type ThemeMode, type AccentColor, getThemeClasses } from '@/lib/theme'
import { cn } from '@/lib/utils'

interface ThemeSwitcherProps {
  className?: string
  showLabel?: boolean
  variant?: 'compact' | 'full'
}

export function ThemeSwitcher({ 
  className, 
  showLabel = false, 
  variant = 'compact' 
}: ThemeSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { mode, accentColor, setMode, setAccentColor, getEffectiveTheme } = useThemeStore()
  const { colors, glass, card } = getThemeClasses()
  const effectiveTheme = getEffectiveTheme()

  const themeOptions: { mode: ThemeMode; icon: any; label: string }[] = [
    { mode: 'light', icon: Sun, label: 'Light' },
    { mode: 'dark', icon: Moon, label: 'Dark' },
    { mode: 'auto', icon: Monitor, label: 'Auto' },
  ]

  const accentOptions: { color: AccentColor; label: string; preview: string }[] = [
    { color: 'purple', label: 'Purple', preview: 'bg-purple-500' },
    { color: 'blue', label: 'Blue', preview: 'bg-blue-500' },
    { color: 'emerald', label: 'Emerald', preview: 'bg-emerald-500' },
    { color: 'orange', label: 'Orange', preview: 'bg-orange-500' },
    { color: 'pink', label: 'Pink', preview: 'bg-pink-500' },
    { color: 'red', label: 'Red', preview: 'bg-red-500' },
  ]

  const currentThemeOption = themeOptions.find(option => option.mode === mode)
  const CurrentIcon = currentThemeOption?.icon || Monitor

  if (variant === 'compact') {
    return (
      <div className={cn("relative", className)}>
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200",
            glass,
            "hover:shadow-lg hover:shadow-black/10",
            "focus:outline-none focus:ring-2 focus:ring-offset-2",
            "dark:focus:ring-offset-slate-900"
          )}
          style={{ 
            color: colors.text.secondary 
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <CurrentIcon className="w-4 h-4" />
          {showLabel && (
            <span className="text-sm font-medium">
              {currentThemeOption?.label}
            </span>
          )}
          <Settings 
            className={cn(
              "w-3 h-3 transition-transform duration-200",
              isOpen && "rotate-90"
            )} 
          />
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40"
                onClick={() => setIsOpen(false)}
              />
              
              {/* Theme Panel */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ type: "spring", duration: 0.2 }}
                className={cn(
                  "absolute top-full mt-2 right-0 z-50",
                  "w-64 p-4 rounded-2xl",
                  card,
                  "shadow-2xl border backdrop-blur-xl"
                )}
                style={{ 
                  backgroundColor: colors.bg.elevated,
                  borderColor: colors.border.primary 
                }}
              >
                {/* Theme Mode Section */}
                <div className="space-y-3">
                  <h3 
                    className="text-sm font-semibold flex items-center gap-2"
                    style={{ color: colors.text.primary }}
                  >
                    <Sun className="w-4 h-4" />
                    Theme Mode
                  </h3>
                  
                  <div className="grid grid-cols-3 gap-2">
                    {themeOptions.map((option) => {
                      const Icon = option.icon
                      const isActive = mode === option.mode
                      
                      return (
                        <motion.button
                          key={option.mode}
                          onClick={() => setMode(option.mode)}
                          className={cn(
                            "relative flex flex-col items-center gap-1 p-3 rounded-xl",
                            "transition-all duration-200",
                            "hover:shadow-md border"
                          )}
                          style={{
                            backgroundColor: isActive ? colors.consciousness.primary : colors.bg.secondary,
                            borderColor: isActive ? colors.consciousness.primary : colors.border.primary,
                            color: isActive ? colors.text.inverse : colors.text.secondary
                          }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Icon className="w-4 h-4" />
                          <span className="text-xs font-medium">{option.label}</span>
                          
                          {isActive && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
                              style={{ backgroundColor: colors.status.success }}
                            >
                              <Check className="w-3 h-3 text-white" />
                            </motion.div>
                          )}
                        </motion.button>
                      )
                    })}
                  </div>
                </div>

                {/* Accent Color Section */}
                <div className="space-y-3 mt-6">
                  <h3 
                    className="text-sm font-semibold flex items-center gap-2"
                    style={{ color: colors.text.primary }}
                  >
                    <Palette className="w-4 h-4" />
                    Accent Color
                  </h3>
                  
                  <div className="grid grid-cols-6 gap-2">
                    {accentOptions.map((option) => {
                      const isActive = accentColor === option.color
                      
                      return (
                        <motion.button
                          key={option.color}
                          onClick={() => setAccentColor(option.color)}
                          className={cn(
                            "relative w-10 h-10 rounded-full",
                            option.preview,
                            "transition-all duration-200",
                            "hover:scale-110 hover:shadow-lg",
                            "ring-2 ring-offset-2",
                            effectiveTheme === 'dark' ? 'ring-offset-slate-800' : 'ring-offset-white'
                          )}
                                                     style={{
                             borderColor: isActive ? colors.consciousness.primary : 'transparent'
                           }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          title={option.label}
                        >
                          {isActive && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute inset-0 flex items-center justify-center"
                            >
                              <Check className="w-4 h-4 text-white drop-shadow-lg" />
                            </motion.div>
                          )}
                        </motion.button>
                      )
                    })}
                  </div>
                </div>

                {/* Current Theme Info */}
                <div 
                  className="mt-6 pt-4 border-t"
                  style={{ borderColor: colors.border.primary }}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span style={{ color: colors.text.tertiary }}>
                      Current: {effectiveTheme === 'dark' ? 'Dark' : 'Light'} Mode
                    </span>
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: colors.consciousness.primary }}
                    />
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    )
  }

  // Full variant for settings page
  return (
    <div className={cn("space-y-6", className)}>
      {/* Theme Mode */}
      <div className="space-y-4">
        <h3 
          className="text-lg font-semibold"
          style={{ color: colors.text.primary }}
        >
          Theme Mode
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {themeOptions.map((option) => {
            const Icon = option.icon
            const isActive = mode === option.mode
            
            return (
              <motion.button
                key={option.mode}
                onClick={() => setMode(option.mode)}
                className={cn(
                  "flex items-center gap-4 p-4 rounded-2xl",
                  "transition-all duration-200 border",
                  "hover:shadow-lg"
                )}
                style={{
                  backgroundColor: isActive ? colors.consciousness.primary : colors.bg.secondary,
                  borderColor: isActive ? colors.consciousness.primary : colors.border.primary,
                  color: isActive ? colors.text.inverse : colors.text.primary
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon className="w-6 h-6" />
                <div className="text-left">
                  <div className="font-medium">{option.label}</div>
                  <div 
                    className="text-sm opacity-70"
                    style={{ 
                      color: isActive ? colors.text.inverse : colors.text.secondary 
                    }}
                  >
                    {option.mode === 'auto' && 'Follows system'}
                    {option.mode === 'light' && 'Always light'}
                    {option.mode === 'dark' && 'Always dark'}
                  </div>
                </div>
                
                {isActive && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="ml-auto"
                  >
                    <Check className="w-5 h-5" />
                  </motion.div>
                )}
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Accent Colors */}
      <div className="space-y-4">
        <h3 
          className="text-lg font-semibold"
          style={{ color: colors.text.primary }}
        >
          Accent Color
        </h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {accentOptions.map((option) => {
            const isActive = accentColor === option.color
            
            return (
              <motion.button
                key={option.color}
                onClick={() => setAccentColor(option.color)}
                className={cn(
                  "flex items-center gap-3 p-4 rounded-2xl",
                  "transition-all duration-200 border",
                  "hover:shadow-lg"
                )}
                style={{
                  backgroundColor: isActive ? colors.consciousness.primary : colors.bg.secondary,
                  borderColor: isActive ? colors.consciousness.primary : colors.border.primary
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={cn("w-6 h-6 rounded-full", option.preview)} />
                <span 
                  className="font-medium"
                  style={{ 
                    color: isActive ? colors.text.inverse : colors.text.primary 
                  }}
                >
                  {option.label}
                </span>
                
                {isActive && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="ml-auto"
                  >
                    <Check 
                      className="w-4 h-4" 
                      style={{ color: colors.text.inverse }}
                    />
                  </motion.div>
                )}
              </motion.button>
            )
          })}
        </div>
      </div>
    </div>
  )
}