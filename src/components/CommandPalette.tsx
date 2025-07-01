import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Search, X, ArrowRight, Command } from 'lucide-react'
import { allModules, iconMap } from '@/data/modules'

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  // Filter modules based on search query
  const filteredModules = allModules.filter(module => 
    module.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    module.id.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Reset selected index when filtered results change
  useEffect(() => {
    setSelectedIndex(0)
  }, [searchQuery])

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setSelectedIndex(prev => 
            prev < filteredModules.length - 1 ? prev + 1 : prev
          )
          break
        case 'ArrowUp':
          e.preventDefault()
          setSelectedIndex(prev => prev > 0 ? prev - 1 : 0)
          break
        case 'Enter':
          e.preventDefault()
          if (filteredModules[selectedIndex]) {
            navigate(filteredModules[selectedIndex].href)
            onClose()
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
  }, [isOpen, selectedIndex, filteredModules, navigate, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-[20vh]"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="w-full max-w-xl bg-slate-800 border border-slate-700 rounded-xl shadow-2xl overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Search Input */}
            <div className="relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search modules, actions, or type a command..."
                className="w-full pl-12 pr-10 py-4 bg-transparent border-b border-slate-700 text-white placeholder-slate-400 focus:outline-none"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2 text-slate-400">
                <span className="text-xs border border-slate-600 rounded px-1.5 py-0.5 flex items-center">
                  <Command className="w-3 h-3 mr-1" />
                  K
                </span>
                <button onClick={onClose}>
                  <X className="w-5 h-5 hover:text-white transition-colors" />
                </button>
              </div>
            </div>
            
            {/* Results */}
            <div className="max-h-[60vh] overflow-y-auto">
              {filteredModules.length > 0 ? (
                <div className="p-2">
                  {filteredModules.map((module, index) => {
                    const ModuleIcon = iconMap[module.icon as keyof typeof iconMap] || Search
                    
                    return (
                      <div
                        key={module.id}
                        className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer ${
                          index === selectedIndex ? 'bg-blue-600/20' : 'hover:bg-slate-700/50'
                        }`}
                        onClick={() => {
                          navigate(module.href)
                          onClose()
                        }}
                        onMouseEnter={() => setSelectedIndex(index)}
                      >
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br ${module.color}`}>
                          <ModuleIcon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="text-white font-medium">{module.name}</div>
                          {module.description && (
                            <div className="text-xs text-slate-400">{module.description}</div>
                          )}
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400" />
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <p className="text-slate-400">No results found</p>
                </div>
              )}
            </div>
            
            {/* Keyboard shortcuts help */}
            <div className="p-3 border-t border-slate-700 bg-slate-800/50">
              <div className="flex items-center justify-center space-x-4 text-xs text-slate-400">
                <div className="flex items-center space-x-1">
                  <span className="border border-slate-600 rounded px-1.5 py-0.5">↑</span>
                  <span className="border border-slate-600 rounded px-1.5 py-0.5">↓</span>
                  <span>to navigate</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="border border-slate-600 rounded px-1.5 py-0.5">Enter</span>
                  <span>to select</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="border border-slate-600 rounded px-1.5 py-0.5">Esc</span>
                  <span>to close</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}