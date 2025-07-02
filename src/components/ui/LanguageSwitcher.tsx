import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, Check, ChevronDown } from 'lucide-react'
import { useTranslation, supportedLanguages, type SupportedLanguage } from '@/lib/i18n'
import { getThemeClasses } from '@/lib/theme'
import { cn } from '@/lib/utils'

interface LanguageSwitcherProps {
  className?: string
  variant?: 'compact' | 'full'
  showLabel?: boolean
}

export function LanguageSwitcher({ 
  className, 
  variant = 'compact', 
  showLabel = false 
}: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { t, currentLanguage, setLanguage, getCurrentLanguage } = useTranslation()
  const { colors, glass, card } = getThemeClasses()
  
  const currentLang = getCurrentLanguage()

  const handleLanguageChange = (langCode: SupportedLanguage) => {
    setLanguage(langCode)
    setIsOpen(false)
  }

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
          aria-label={t('common.language', 'Select language')}
        >
          <Globe className="w-4 h-4" />
          <span className="text-sm font-medium">
            {currentLang.flag}
          </span>
          {showLabel && (
            <span className="text-sm hidden sm:block">
              {currentLang.nativeName}
            </span>
          )}
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-3 h-3" />
          </motion.div>
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

              {/* Language Dropdown */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ type: "spring", duration: 0.2 }}
                className={cn(
                  "absolute top-full mt-2 right-0 z-50",
                  "w-56 p-2 rounded-2xl",
                  card,
                  "shadow-2xl border backdrop-blur-xl"
                )}
                style={{ 
                  backgroundColor: colors.bg.elevated,
                  borderColor: colors.border.primary 
                }}
              >
                <div className="space-y-1">
                  {supportedLanguages.map((language) => {
                    const isActive = currentLanguage === language.code
                    
                    return (
                      <motion.button
                        key={language.code}
                        onClick={() => handleLanguageChange(language.code)}
                        className={cn(
                          "w-full flex items-center gap-3 p-3 rounded-xl",
                          "transition-all duration-200",
                          "hover:shadow-md border",
                          "text-left"
                        )}
                        style={{
                          backgroundColor: isActive ? colors.consciousness.primary : colors.bg.secondary,
                          borderColor: isActive ? colors.consciousness.primary : colors.border.primary,
                          color: isActive ? colors.text.inverse : colors.text.primary
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="text-lg">{language.flag}</span>
                        <div className="flex-1">
                          <div className="font-medium text-sm">
                            {language.nativeName}
                          </div>
                          <div 
                            className="text-xs opacity-70"
                            style={{ 
                              color: isActive ? colors.text.inverse : colors.text.secondary 
                            }}
                          >
                            {language.name}
                          </div>
                        </div>
                        
                        {isActive && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500 }}
                          >
                            <Check className="w-4 h-4" />
                          </motion.div>
                        )}
                      </motion.button>
                    )
                  })}
                </div>

                {/* Footer */}
                <div 
                  className="mt-3 pt-3 border-t"
                  style={{ borderColor: colors.border.primary }}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span style={{ color: colors.text.tertiary }}>
                      {t('common.language')}
                    </span>
                    <div className="flex items-center gap-1">
                      <Globe className="w-3 h-3" style={{ color: colors.text.tertiary }} />
                      <span style={{ color: colors.text.tertiary }}>
                        {supportedLanguages.length}
                      </span>
                    </div>
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
    <div className={cn("space-y-4", className)}>
      <h3 
        className="text-lg font-semibold"
        style={{ color: colors.text.primary }}
      >
        {t('common.language')}
      </h3>
      
      <div className="grid gap-3">
        {supportedLanguages.map((language) => {
          const isActive = currentLanguage === language.code
          
          return (
            <motion.button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={cn(
                "flex items-center gap-4 p-4 rounded-2xl",
                "transition-all duration-200 border",
                "hover:shadow-lg text-left"
              )}
              style={{
                backgroundColor: isActive ? colors.consciousness.primary : colors.bg.secondary,
                borderColor: isActive ? colors.consciousness.primary : colors.border.primary
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-2xl">{language.flag}</span>
              <div className="flex-1">
                <div 
                  className="font-semibold"
                  style={{ 
                    color: isActive ? colors.text.inverse : colors.text.primary 
                  }}
                >
                  {language.nativeName}
                </div>
                <div 
                  className="text-sm opacity-80"
                  style={{ 
                    color: isActive ? colors.text.inverse : colors.text.secondary 
                  }}
                >
                  {language.name}
                </div>
              </div>
              
              {isActive && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="ml-auto"
                >
                  <Check 
                    className="w-5 h-5" 
                    style={{ color: colors.text.inverse }}
                  />
                </motion.div>
              )}
            </motion.button>
          )
        })}
      </div>

      {/* Language Stats */}
      <div 
        className="p-4 rounded-xl border"
        style={{ 
          backgroundColor: colors.bg.secondary,
          borderColor: colors.border.primary 
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h4 
              className="font-medium"
              style={{ color: colors.text.primary }}
            >
              Current Language
            </h4>
            <p 
              className="text-sm"
              style={{ color: colors.text.secondary }}
            >
              {currentLang.nativeName} ({currentLang.name})
            </p>
          </div>
          <div className="text-right">
            <div 
              className="text-2xl"
              style={{ color: colors.consciousness.primary }}
            >
              {currentLang.flag}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}