import { useEffect, useState } from 'react'
import { motion, PanInfo, useMotionValue, useTransform } from 'framer-motion'
import { getThemeClasses } from '@/lib/theme'
import { cn } from '@/lib/utils'

interface MobileOptimizedProps {
  children: React.ReactNode
  className?: string
  enablePullToRefresh?: boolean
  onRefresh?: () => Promise<void>
  enableSwipeGestures?: boolean
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
}

export function MobileOptimized({
  children,
  className,
  enablePullToRefresh = false,
  onRefresh,
  enableSwipeGestures = false,
  onSwipeLeft,
  onSwipeRight
}: MobileOptimizedProps) {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [viewportHeight, setViewportHeight] = useState('100vh')
  const { colors } = getThemeClasses()
  
  const y = useMotionValue(0)
  const opacity = useTransform(y, [0, 100], [0, 1])
  const scale = useTransform(y, [0, 100], [0.8, 1])

  // Mobile detection and viewport handling
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      const isTouchDevice = 'ontouchstart' in window
      const isSmallScreen = window.innerWidth <= 768
      
      setIsMobile(isMobileDevice || isTouchDevice || isSmallScreen)
    }

    const handleResize = () => {
      checkMobile()
      
      // Handle mobile viewport height (address bar hiding)
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
      setViewportHeight(`${window.innerHeight}px`)
    }

    const handleOrientationChange = () => {
      setTimeout(() => {
        handleResize()
      }, 100)
    }

    checkMobile()
    handleResize()

    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleOrientationChange)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleOrientationChange)
    }
  }, [])

  // Pull to refresh handler
  const handlePanEnd = async (event: any, info: PanInfo) => {
    if (!enablePullToRefresh || !onRefresh) return

    if (info.offset.y > 100 && info.velocity.y > 0) {
      setIsRefreshing(true)
      try {
        await onRefresh()
      } finally {
        setIsRefreshing(false)
        y.set(0)
      }
    } else {
      y.set(0)
    }
  }

  // Swipe gesture handler
  const handleSwipe = (event: any, info: PanInfo) => {
    if (!enableSwipeGestures) return

    const threshold = 100
    const velocity = Math.abs(info.velocity.x)

    if (velocity > 500) {
      if (info.offset.x > threshold && onSwipeRight) {
        onSwipeRight()
      } else if (info.offset.x < -threshold && onSwipeLeft) {
        onSwipeLeft()
      }
    }
  }

  // Prevent zoom on double tap (iOS Safari)
  useEffect(() => {
    if (!isMobile) return

    let lastTouchEnd = 0
    const handleTouchEnd = (event: TouchEvent) => {
      const now = Date.now()
      if (now - lastTouchEnd <= 300) {
        event.preventDefault()
      }
      lastTouchEnd = now
    }

    document.addEventListener('touchend', handleTouchEnd, { passive: false })
    return () => document.removeEventListener('touchend', handleTouchEnd)
  }, [isMobile])

  return (
    <motion.div
      className={cn(
        "relative overflow-hidden",
        isMobile && "touch-pan-y overscroll-none",
        className
      )}
      style={{
        height: viewportHeight,
        // Mobile safe areas
        paddingTop: isMobile ? 'env(safe-area-inset-top)' : 0,
        paddingBottom: isMobile ? 'env(safe-area-inset-bottom)' : 0,
        paddingLeft: isMobile ? 'env(safe-area-inset-left)' : 0,
        paddingRight: isMobile ? 'env(safe-area-inset-right)' : 0,
      }}
      drag={enablePullToRefresh || enableSwipeGestures ? "x" : false}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.3}
             onPanEnd={enablePullToRefresh ? handlePanEnd : enableSwipeGestures ? handleSwipe : undefined}
    >
      {/* Pull to refresh indicator */}
      {enablePullToRefresh && (
        <motion.div
          className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full z-50"
          style={{ 
            opacity: enablePullToRefresh ? opacity : 0,
            scale: enablePullToRefresh ? scale : 1
          }}
        >
          <div 
            className="px-4 py-2 rounded-full backdrop-blur-md border"
            style={{
              backgroundColor: colors.bg.elevated,
              borderColor: colors.border.primary
            }}
          >
            <div className="flex items-center gap-2">
              {isRefreshing ? (
                <>
                  <div className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin"
                       style={{ borderColor: colors.consciousness.primary }} />
                  <span className="text-xs font-medium" style={{ color: colors.text.primary }}>
                    Refreshing...
                  </span>
                </>
              ) : (
                <>
                  <div className="w-4 h-4 rounded-full" 
                       style={{ backgroundColor: colors.consciousness.primary }} />
                  <span className="text-xs font-medium" style={{ color: colors.text.primary }}>
                    Pull to refresh
                  </span>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Main content */}
      <div className={cn(
        "h-full overflow-auto",
        isMobile && "scroll-smooth overscroll-contain"
      )}>
        {children}
      </div>

      {/* Mobile-specific features */}
      {isMobile && (
        <>
          {/* Haptic feedback on touch (Visual indicator) */}
                     <style>{`
            * {
              -webkit-tap-highlight-color: transparent;
              -webkit-touch-callout: none;
              -webkit-user-select: none;
              user-select: none;
            }
            
            input, textarea, [contenteditable] {
              -webkit-user-select: auto;
              user-select: auto;
            }
            
            /* Smooth scrolling for iOS */
            .scroll-smooth {
              -webkit-overflow-scrolling: touch;
            }
            
            /* Hide scrollbars on mobile */
            @media (max-width: 768px) {
              ::-webkit-scrollbar {
                display: none;
              }
              
              * {
                -ms-overflow-style: none;
                scrollbar-width: none;
              }
            }
            
            /* Prevent zoom on input focus */
            @media (max-width: 768px) {
              input[type="text"],
              input[type="email"],
              input[type="password"],
              textarea,
              select {
                font-size: 16px !important;
              }
            }
          `}</style>
        </>
      )}
    </motion.div>
  )
}

// Mobile-aware hook for device capabilities
export function useMobileCapabilities() {
  const [capabilities, setCapabilities] = useState({
    isMobile: false,
    hasTouch: false,
    isStandalone: false,
    isInstalled: false,
    supportsVibration: false,
    supportsShare: false,
    supportsNotifications: false,
    connectionType: 'unknown',
    batteryLevel: null as number | null,
    isCharging: false
  })

  useEffect(() => {
    const updateCapabilities = async () => {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      const hasTouch = 'ontouchstart' in window
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches
      const isInstalled = isStandalone || (navigator as any).standalone
      const supportsVibration = 'vibrate' in navigator
      const supportsShare = 'share' in navigator
      const supportsNotifications = 'Notification' in window

      // Network information
      const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection
      const connectionType = connection ? connection.effectiveType || 'unknown' : 'unknown'

      // Battery information
      let batteryLevel = null
      let isCharging = false
      try {
        const battery = await (navigator as any).getBattery?.()
        if (battery) {
          batteryLevel = Math.round(battery.level * 100)
          isCharging = battery.charging
        }
      } catch (error) {
        // Battery API not supported
      }

      setCapabilities({
        isMobile,
        hasTouch,
        isStandalone,
        isInstalled,
        supportsVibration,
        supportsShare,
        supportsNotifications,
        connectionType,
        batteryLevel,
        isCharging
      })
    }

    updateCapabilities()
  }, [])

  return capabilities
}

// PWA Installation prompt hook
export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [canInstall, setCanInstall] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    // Check if already installed
    const checkInstalled = () => {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches
      const isIOSStandalone = (navigator as any).standalone
      setIsInstalled(isStandalone || isIOSStandalone)
    }

    // Listen for install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setCanInstall(true)
    }

    // Listen for app installed
    const handleAppInstalled = () => {
      setIsInstalled(true)
      setCanInstall(false)
      setDeferredPrompt(null)
    }

    checkInstalled()
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  const installPWA = async () => {
    if (!deferredPrompt) return false

    try {
      deferredPrompt.prompt()
      const result = await deferredPrompt.userChoice
      
      if (result.outcome === 'accepted') {
        setIsInstalled(true)
        setCanInstall(false)
        setDeferredPrompt(null)
        return true
      }
    } catch (error) {
      console.error('PWA installation failed:', error)
    }
    
    return false
  }

  return { canInstall, isInstalled, installPWA }
}