import { useState, useEffect } from 'react'
import { useAppStore } from '@/lib/store'
import { useAuthStore } from '@/lib/consciousness/auth'
import { getThemeClasses } from '@/lib/theme'
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
  const { user: appUser } = useAppStore()
  const { user: consciousnessUser, signOut } = useAuthStore()
  
  const { colors, isDark } = getThemeClasses()

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
      <MobileDrawer />
      
      <div className="w-full">
        <Header onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} />
        
        <main className="p-4 lg:p-8 pb-24">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Dock (handles mobile/desktop rendering internally) */}
      <Dock />

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
    </div>
  )
}