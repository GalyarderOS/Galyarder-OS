import { useState, useEffect } from 'react'
import { useAppStore } from '@/lib/store'
import { useAuthStore } from '@/lib/consciousness/auth'
import { getThemeClasses } from '@/lib/theme'
import { MobileOptimized, useMobileCapabilities } from '@/components/mobile/MobileOptimized'
import { PWAInstallBanner } from '@/components/pwa/PWAInstallBanner'
import { Header } from './Header'
import { Dock } from './Dock'
import { MobileDrawer } from '../nav/MobileDrawer'
import { CommandPalette } from '../CommandPalette'
import { AuthModal } from '../consciousness/AuthModal'
import { cn } from '@/lib/utils'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const { user: appUser } = useAppStore()
  const { user: consciousnessUser, signOut } = useAuthStore()
  
  const { colors, isDark } = getThemeClasses()
  const { isMobile, hasTouch, isStandalone } = useMobileCapabilities()

  // Check consciousness authentication status
  useEffect(() => {
    // If app user exists but no consciousness user, show auth modal
    if (appUser && !consciousnessUser) {
      setIsAuthModalOpen(true)
    }
  }, [appUser, consciousnessUser])

  // Listen for keyboard shortcut to open command palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Command palette shortcut (Ctrl+K or Cmd+K)
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setIsCommandPaletteOpen(true)
      }
      // Consciousness Auth shortcut (Ctrl+Shift+C)
      if (e.ctrlKey && e.shiftKey && e.key === 'C') {
        e.preventDefault()
        setIsAuthModalOpen(true)
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
        {/* Mobile Navigation Drawer */}
        <MobileDrawer />
        
        {/* Header */}
        <Header onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} />
        
        {/* Main Content */}
        <main className={cn(
          "flex-1 transition-all duration-300",
          isMobile ? "p-2 lg:p-4 pb-20" : "p-4 lg:p-8 pb-24"
        )}>
          <div className={cn(
            "mx-auto transition-all duration-300",
            isMobile ? "max-w-full" : "max-w-7xl"
          )}>
            {children}
          </div>
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

      {/* Consciousness Authentication Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
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