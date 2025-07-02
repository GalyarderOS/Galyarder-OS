import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, X, Smartphone, Monitor, Zap } from 'lucide-react'
import { getThemeClasses } from '@/lib/theme'
import { useTranslation } from '@/lib/i18n'
import { usePWAInstall, useMobileCapabilities } from '@/components/mobile/MobileOptimized'
import { cn } from '@/lib/utils'

interface PWAInstallBannerProps {
  className?: string
  autoShow?: boolean
  showDelay?: number
  position?: 'top' | 'bottom' | 'floating'
}

export function PWAInstallBanner({ 
  className,
  autoShow = true,
  showDelay = 3000,
  position = 'bottom'
}: PWAInstallBannerProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const { canInstall, isInstalled, installPWA } = usePWAInstall()
  const { isMobile, isStandalone } = useMobileCapabilities()
  const { colors, glass } = getThemeClasses()
  const { t } = useTranslation()

  // Check if banner should be shown
  useEffect(() => {
    if (!canInstall || isInstalled || isStandalone || isDismissed) {
      setIsVisible(false)
      return
    }

    // Check if user has dismissed before
    const dismissed = localStorage.getItem('pwa-install-dismissed')
    if (dismissed) {
      const dismissedTime = parseInt(dismissed)
      const daysSinceDismissed = (Date.now() - dismissedTime) / (1000 * 60 * 60 * 24)
      
      // Show again after 7 days
      if (daysSinceDismissed < 7) {
        setIsDismissed(true)
        return
      }
    }

    if (autoShow) {
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, showDelay)

      return () => clearTimeout(timer)
    }
  }, [canInstall, isInstalled, isStandalone, isDismissed, autoShow, showDelay])

  const handleInstall = async () => {
    const success = await installPWA()
    if (success) {
      setIsVisible(false)
    }
  }

  const handleDismiss = () => {
    setIsVisible(false)
    setIsDismissed(true)
    localStorage.setItem('pwa-install-dismissed', Date.now().toString())
  }

  const getPositionClasses = () => {
    switch (position) {
      case 'top':
        return 'top-4 left-4 right-4'
      case 'bottom':
        return 'bottom-4 left-4 right-4'
      case 'floating':
        return 'bottom-20 left-4 right-4'
      default:
        return 'bottom-4 left-4 right-4'
    }
  }

  const getAnimationProps = () => {
    switch (position) {
      case 'top':
        return {
          initial: { opacity: 0, y: -100, scale: 0.9 },
          animate: { opacity: 1, y: 0, scale: 1 },
          exit: { opacity: 0, y: -100, scale: 0.9 }
        }
      case 'bottom':
      case 'floating':
        return {
          initial: { opacity: 0, y: 100, scale: 0.9 },
          animate: { opacity: 1, y: 0, scale: 1 },
          exit: { opacity: 0, y: 100, scale: 0.9 }
        }
      default:
        return {
          initial: { opacity: 0, scale: 0.9 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 0.9 }
        }
    }
  }

  if (!canInstall || isInstalled || isStandalone) {
    return null
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={cn(
            "fixed z-50 max-w-sm mx-auto",
            getPositionClasses(),
            className
          )}
          {...getAnimationProps()}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div
            className={cn(
              "p-4 rounded-2xl shadow-2xl border backdrop-blur-xl",
              glass,
              "relative overflow-hidden"
            )}
            style={{
              backgroundColor: colors.bg.elevated,
              borderColor: colors.border.primary
            }}
          >
            {/* Background gradient */}
            <div 
              className="absolute inset-0 opacity-10"
              style={{
                background: `linear-gradient(135deg, ${colors.consciousness.primary}, ${colors.consciousness.secondary})`
              }}
            />

            {/* Close button */}
            <motion.button
              onClick={handleDismiss}
              className={cn(
                "absolute top-2 right-2 p-1 rounded-full transition-colors",
                "hover:bg-black/10 dark:hover:bg-white/10"
              )}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-4 h-4" style={{ color: colors.text.tertiary }} />
            </motion.button>

            <div className="relative">
              {/* Icon */}
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: colors.consciousness.primary }}
                >
                  {isMobile ? (
                    <Smartphone className="w-6 h-6 text-white" />
                  ) : (
                    <Monitor className="w-6 h-6 text-white" />
                  )}
                </div>
                
                <div>
                  <h3 
                    className="font-semibold text-sm"
                    style={{ color: colors.text.primary }}
                  >
                    Install GalyarderOS
                  </h3>
                  <p 
                    className="text-xs opacity-80"
                    style={{ color: colors.text.secondary }}
                  >
                    {isMobile ? 'Add to home screen' : 'Install as desktop app'}
                  </p>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-xs">
                  <Zap className="w-3 h-3" style={{ color: colors.consciousness.primary }} />
                  <span style={{ color: colors.text.secondary }}>
                    {isMobile ? 'Faster & offline access' : 'Native app experience'}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <Zap className="w-3 h-3" style={{ color: colors.consciousness.primary }} />
                  <span style={{ color: colors.text.secondary }}>
                    {isMobile ? 'No browser UI' : 'Always accessible'}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <Zap className="w-3 h-3" style={{ color: colors.consciousness.primary }} />
                  <span style={{ color: colors.text.secondary }}>
                    Push notifications & updates
                  </span>
                </div>
              </div>

              {/* Install button */}
              <motion.button
                onClick={handleInstall}
                className={cn(
                  "w-full py-2.5 px-4 rounded-xl font-medium text-sm",
                  "flex items-center justify-center gap-2",
                  "transition-all duration-200"
                )}
                style={{
                  backgroundColor: colors.consciousness.primary,
                  color: colors.text.inverse
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download className="w-4 h-4" />
                Install Now
              </motion.button>

              {/* Dismiss link */}
              <motion.button
                onClick={handleDismiss}
                className="w-full mt-2 py-1 text-xs opacity-60 hover:opacity-80 transition-opacity"
                style={{ color: colors.text.tertiary }}
              >
                Maybe later
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// PWA Status indicator component
export function PWAStatus() {
  const { isInstalled, isStandalone } = useMobileCapabilities()
  const { colors } = getThemeClasses()

  if (!isInstalled && !isStandalone) return null

  return (
    <div className="flex items-center gap-2 px-2 py-1 rounded-full text-xs"
         style={{ 
           backgroundColor: `${colors.status.success}20`,
           color: colors.status.success
         }}>
      <div className="w-2 h-2 rounded-full bg-current" />
      PWA Installed
    </div>
  )
}

// Enhanced notification system for PWA
export function usePWANotifications() {
  const [permission, setPermission] = useState<NotificationPermission>('default')
  const [isSupported, setIsSupported] = useState(false)

  useEffect(() => {
    if ('Notification' in window) {
      setIsSupported(true)
      setPermission(Notification.permission)
    }
  }, [])

  const requestPermission = async () => {
    if (!isSupported) return false

    try {
      const result = await Notification.requestPermission()
      setPermission(result)
      return result === 'granted'
    } catch (error) {
      console.error('Notification permission error:', error)
      return false
    }
  }

  const sendNotification = (title: string, options?: NotificationOptions) => {
    if (!isSupported || permission !== 'granted') return null

    const notification = new Notification(title, {
      icon: '/pwa-192x192.png',
      badge: '/pwa-192x192.png',
      ...options
    })

    return notification
  }

  return {
    isSupported,
    permission,
    requestPermission,
    sendNotification,
    canSend: permission === 'granted'
  }
}