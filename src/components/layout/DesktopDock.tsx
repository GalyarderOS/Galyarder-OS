import { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Edit, Grid, Plus, Pin, PinOff, ArrowLeft, ArrowRight, Settings, RefreshCw } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useDockStore } from '@/lib/stores/useDockStore'
import { allModules, iconMap, ModuleMetadata, MenuItem } from '@/data/modules'

interface DockItemProps {
  module: ModuleMetadata
  index: number
  hoveredIndex: number | null
  onHover: (index: number | null) => void
  isDragging: boolean
  onDragStart: (index: number) => void
  onDragOver: (index: number) => void
  onDragEnd: () => void
  onContextMenu: (e: React.MouseEvent, module: ModuleMetadata, index: number) => void
}

function DockItem({ 
  module, 
  index, 
  hoveredIndex, 
  onHover, 
  isDragging,
  onDragStart,
  onDragOver,
  onDragEnd,
  onContextMenu
}: DockItemProps) {
  const location = useLocation()
  const isActive = location.pathname === module.href
  const isHovered = hoveredIndex === index
  const distance = hoveredIndex !== null ? Math.abs(index - hoveredIndex) : 0
  const scale = hoveredIndex !== null ? Math.max(1, 1.1 - distance * 0.05) : 1
  const [showTooltip, setShowTooltip] = useState(false)
  const [isLaunching, setIsLaunching] = useState(false)

  // Get the icon component from the icon map
  const IconComponent = iconMap[module.icon as keyof typeof iconMap] || Grid

  const handleClick = () => {
    setIsLaunching(true)
    setTimeout(() => setIsLaunching(false), 400)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    onDragOver(index)
  }

  return (
    <div 
      className="relative"
      onDragOver={handleDragOver}
    >
      <motion.div
        className="relative"
        animate={{ 
          scale,
          y: isHovered ? -5 : 0
        }}
        transition={{ 
          type: "spring", 
          stiffness: 400, 
          damping: 25 
        }}
        onMouseEnter={() => {
          onHover(index)
          setShowTooltip(true)
        }}
        onMouseLeave={() => {
          onHover(null)
          setShowTooltip(false)
        }}
        draggable
        onDragStart={() => onDragStart(index)}
        onDragEnd={onDragEnd}
        onContextMenu={(e) => onContextMenu(e, module, index)}
      >
        <Link to={module.href} onClick={handleClick}>
          <motion.div
            className={cn(
              "relative w-14 h-14 rounded-2xl flex items-center justify-center cursor-pointer",
              "bg-gradient-to-br shadow-xl backdrop-blur-sm",
              "border border-white/10 hover:border-white/20 transition-all duration-200",
              `bg-gradient-to-br ${module.color}`,
              isDragging && "opacity-50"
            )}
            animate={isLaunching ? {
              scale: [1, 1.1, 0.95, 1],
            } : {}}
            transition={{ duration: 0.4 }}
          >
            <IconComponent className="w-7 h-7 text-white drop-shadow-lg" />
            
            {/* Active indicator dot */}
            {isActive && (
              <motion.div
                className="absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-lg"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              />
            )}
          </motion.div>
        </Link>
      </motion.div>

      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className="bg-black/90 backdrop-blur-md text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap shadow-xl">
              {module.name}
              {module.shortcut && (
                <span className="ml-2 text-xs text-slate-400">{module.shortcut}</span>
              )}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/90" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function DesktopDock() {
  const location = useLocation()
  const { pinnedModules, pinModule, unpinModule, reorderModules, resetToDefault } = useDockStore()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)
  const [contextMenuPosition, setContextMenuPosition] = useState<{ x: number, y: number } | null>(null)
  const [contextMenuModule, setContextMenuModule] = useState<ModuleMetadata | null>(null)
  const [contextMenuIndex, setContextMenuIndex] = useState<number | null>(null)
  const dockRef = useRef<HTMLDivElement>(null)
  const contextMenuRef = useRef<HTMLDivElement>(null)

  // Get the modules that are pinned to the dock
  const dockModules = pinnedModules
    .map(id => allModules.find(m => m.id === id))
    .filter((m): m is ModuleMetadata => m !== undefined)

  const handleDragStart = (index: number) => {
    setDraggedIndex(index)
  }

  const handleDragOver = (index: number) => {
    if (draggedIndex === null) return
    if (dragOverIndex === index) return
    
    setDragOverIndex(index)
  }

  const handleDragEnd = () => {
    if (draggedIndex !== null && dragOverIndex !== null && draggedIndex !== dragOverIndex) {
      // Reorder the modules
      const newOrder = [...pinnedModules]
      const [draggedItem] = newOrder.splice(draggedIndex, 1)
      newOrder.splice(dragOverIndex, 0, draggedItem)
      reorderModules(newOrder)
    }
    
    setDraggedIndex(null)
    setDragOverIndex(null)
  }

  const handleContextMenu = (e: React.MouseEvent, module: ModuleMetadata, index: number) => {
    e.preventDefault()
    setContextMenuPosition({ x: e.clientX, y: e.clientY })
    setContextMenuModule(module)
    setContextMenuIndex(index)
  }

  const handleUnpinModule = () => {
    if (contextMenuModule) {
      unpinModule(contextMenuModule.id)
      setContextMenuPosition(null)
      setContextMenuModule(null)
    }
  }

  const handleResetDock = () => {
    resetToDefault()
    setContextMenuPosition(null)
    setContextMenuModule(null)
  }

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Command palette shortcut (Ctrl+K or Cmd+K)
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        console.log('Command palette shortcut pressed')
        // TODO: Open command palette
      }
      
      // Module shortcuts (Alt+number)
      if (e.altKey && !isNaN(parseInt(e.key)) && parseInt(e.key) > 0) {
        const index = parseInt(e.key) - 1
        if (index < dockModules.length) {
          e.preventDefault()
          const module = dockModules[index]
          window.location.href = module.href
        }
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [dockModules])

  // Close context menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (contextMenuRef.current && !contextMenuRef.current.contains(event.target as Node)) {
        setContextMenuPosition(null)
        setContextMenuModule(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="hidden md:flex fixed inset-x-0 bottom-2 z-50 justify-center items-center">
      <motion.div
        ref={dockRef}
        className="relative"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 30 
        }}
      >
        <motion.div
          className="flex items-end justify-center space-x-1 px-4 py-2 rounded-2xl"
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(30px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '0 8px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          }}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {dockModules.map((module, index) => (
            <DockItem
              key={module.id}
              module={module}
              index={index}
              hoveredIndex={hoveredIndex}
              onHover={setHoveredIndex}
              isDragging={draggedIndex === index}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDragEnd={handleDragEnd}
              onContextMenu={handleContextMenu}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Context Menu */}
      <AnimatePresence>
        {contextMenuPosition && contextMenuModule && (
          <motion.div
            ref={contextMenuRef}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.1 }}
            className="fixed z-50 bg-slate-800 border border-slate-700 rounded-lg shadow-xl w-56"
            style={{
              left: `${Math.min(contextMenuPosition.x, window.innerWidth - 224)}px`,
              top: `${Math.min(contextMenuPosition.y, window.innerHeight - 300)}px`
            }}
          >
            <div className="p-2">
              {/* Module name header */}
              <div className="px-3 py-2 text-sm font-medium text-white border-b border-slate-700 mb-1">
                {contextMenuModule.name}
              </div>
              
              {/* Module-specific actions */}
              {contextMenuModule.rightClickMenuItems?.map(item => {
                const ItemIcon = iconMap[item.icon as keyof typeof iconMap] || Grid
                
                return (
                  <button
                    key={item.id}
                    className="w-full flex items-center space-x-2 px-3 py-2 text-left text-sm text-white hover:bg-slate-700 rounded-md"
                  >
                    <ItemIcon className="w-4 h-4" />
                    <span>{item.label}</span>
                    {item.shortcut && (
                      <span className="ml-auto text-xs text-slate-400">{item.shortcut}</span>
                    )}
                  </button>
                )
              })}
              
              {/* Divider */}
              <div className="h-px bg-slate-700 my-1"></div>
              
              {/* Dock management actions */}
              <button
                onClick={handleUnpinModule}
                className="w-full flex items-center space-x-2 px-3 py-2 text-left text-sm text-white hover:bg-red-600/20 hover:text-red-400 rounded-md"
              >
                <PinOff className="w-4 h-4" />
                <span>Remove from Dock</span>
              </button>
              
              <button
                onClick={handleResetDock}
                className="w-full flex items-center space-x-2 px-3 py-2 text-left text-sm text-white hover:bg-slate-700 rounded-md"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reset Dock to Default</span>
              </button>
              
              <Link
                to="/app/app-drawer"
                className="w-full flex items-center space-x-2 px-3 py-2 text-left text-sm text-white hover:bg-slate-700 rounded-md"
                onClick={() => setContextMenuPosition(null)}
              >
                <Grid className="w-4 h-4" />
                <span>Open App Drawer</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}