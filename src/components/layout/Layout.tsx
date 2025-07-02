import { useState, useEffect } from 'react'
import { useAppStore } from '@/lib/store'
import { getThemeClasses } from '@/lib/theme'
import { MobileOptimized, useMobileCapabilities } from '@/components/mobile/MobileOptimized'
import { PWAInstallBanner } from '@/components/pwa/PWAInstallBanner'
import { Header } from './Header'
import { Dock } from './Dock'
import { CommandPalette } from '../CommandPalette'
import { cn } from '@/lib/utils'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const { user } = useAppStore()
  
  const { colors, isDark } = getThemeClasses()
  const { isMobile, hasTouch, isStandalone } = useMobileCapabilities()

  // Listen for keyboard shortcut to open command palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Command palette shortcut (Ctrl+K or Cmd+K)
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setIsCommandPaletteOpen(true)
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Pull to refresh handler
  const handleRefresh = async () => {
    setRefreshing(true)
    
    try {
      // Simulate refresh action - you can replace with actual refresh logic
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Trigger page refresh or data reload
      window.location.reload()
    } catch (error) {
      console.error('Refresh failed:', error)
    } finally {
      setRefreshing(false)
    }
  }

  return (
    <div
      className="min-h-screen transition-all duration-300"
      style={{ 
        backgroundColor: colors.bg.primary,
        backgroundImage: isDark 
          ? 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)'
          : 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%)'
      }}
    >
      <MobileOptimized
        enablePullToRefresh={isMobile && !isStandalone}
        onRefresh={handleRefresh}
      >
        <div className="flex flex-col min-h-screen">
          {/* Header */}
          <Header onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} />
          
          {/* Main Content */}
          <main className={cn(
            "flex-1 transition-all duration-300",
            isMobile ? "pb-20" : "pb-24"
          )}>
            {children}
          </main>

          {/* Mobile-optimized Dock */}
          <Dock />
        </div>

        {/* PWA Install Banner */}
        <PWAInstallBanner position={isMobile ? "bottom" : "floating"} />

        {/* Command Palette */}
        <CommandPalette 
          isOpen={isCommandPaletteOpen} 
          onClose={() => setIsCommandPaletteOpen(false)} 
        />

        {/* Mobile-specific styles */}
        {isMobile && (
          <style>{`
            /* Mobile viewport handling */
            html, body {
              height: 100%;
              overflow-x: hidden;
            }

            /* Smooth scrolling for mobile */
            * {
              -webkit-overflow-scrolling: touch;
            }

            /* iOS specific adjustments */
            @supports (-webkit-touch-callout: none) {
              .min-h-screen {
                min-height: -webkit-fill-available;
              }
            }

            /* Android specific adjustments */
            @media screen and (max-width: 768px) and (orientation: portrait) {
              .min-h-screen {
                min-height: calc(100vh - env(keyboard-inset-height, 0px));
              }
            }

            /* PWA standalone mode adjustments */
            @media (display-mode: standalone) {
              body {
                user-select: none;
                -webkit-user-select: none;
              }

              input, textarea, [contenteditable] {
                user-select: auto;
                -webkit-user-select: auto;
              }
            }

            /* Touch optimization */
            button, [role="button"], .clickable {
              touch-action: manipulation;
              -webkit-touch-callout: none;
            }

            /* Prevent text selection on UI elements */
            .ui-element {
              -webkit-user-select: none;
              -moz-user-select: none;
              -ms-user-select: none;
              user-select: none;
            }

            /* Improve focus visibility on mobile */
            @media (max-width: 768px) {
              :focus-visible {
                outline: 2px solid ${colors.consciousness.primary};
                outline-offset: 2px;
              }
            }
          `}</style>
        )}
      </MobileOptimized>
    </div>
  )
}