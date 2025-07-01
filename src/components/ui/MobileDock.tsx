import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { Home, Grid, Settings } from 'lucide-react'
import { useDockStore } from '@/lib/stores/useDockStore'

export function MobileDock() {
  const location = useLocation()
  const { scrollY } = useScroll()
  const [visible, setVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  // Handle scroll behavior to show/hide dock
  useMotionValueEvent(scrollY, "change", (latest) => {
    const currentScrollY = latest
    // Show when scrolling up, hide when scrolling down
    if (currentScrollY < lastScrollY || currentScrollY < 10) {
      setVisible(true)
    } else if (currentScrollY > 100 && currentScrollY > lastScrollY) {
      setVisible(false)
    }
    setLastScrollY(currentScrollY)
  })

  const dockItems = [
    { id: 'dashboard', name: 'Home', icon: Home, href: '/app/dashboard' },
    { id: 'app-drawer', name: 'Apps', icon: Grid, href: '/app/app-drawer' },
    { id: 'settings', name: 'Settings', icon: Settings, href: '/app/settings' }
  ]

  return (
    <motion.div 
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 px-4 py-2 bg-slate-900/80 backdrop-blur-md border-t border-slate-700/30 flex justify-around items-center gap-6 text-sm"
      initial={{ y: 0 }}
      animate={{ y: visible ? 0 : 100 }}
      transition={{ duration: 0.3 }}
      style={{ paddingBottom: 'calc(0.5rem + env(safe-area-inset-bottom))' }}
    >
      {dockItems.map((item) => {
        const isActive = location.pathname === item.href
        
        return (
          <Link
            key={item.id}
            to={item.href}
            className="flex flex-col items-center justify-center"
          >
            <div className={`p-2 rounded-full ${isActive ? 'bg-blue-600/20' : 'hover:bg-slate-800/50'} transition-colors`}>
              <item.icon className={`w-5 h-5 ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
            </div>
            <span className={`text-xs mt-1 ${isActive ? 'text-blue-400' : 'text-slate-400'}`}>
              {item.name}
            </span>
          </Link>
        )
      })}
    </motion.div>
  )
}