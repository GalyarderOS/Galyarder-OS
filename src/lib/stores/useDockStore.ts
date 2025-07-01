import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { allModules } from '../../data/modules'

// Default modules that should be pinned to the dock
const defaultPinnedModules = [
  'dashboard',
  'ai-assistant',
  'chrono-copilot',
  'finance-hub',
  'knowledge-arsenal',
  'spiritual-forge',
  'app-drawer',
  'health-forge',
  'productivity-matrix',
  'mind-guard',
  'system-logs',
  'system-kernel',
  'settings'
]

interface DockState {
  // Array of module IDs that are pinned to the dock
  pinnedModules: string[]
  
  // Actions
  pinModule: (moduleId: string) => void
  unpinModule: (moduleId: string) => void
  reorderModules: (newOrder: string[]) => void
  isPinned: (moduleId: string) => boolean
  resetToDefault: () => void
}

export const useDockStore = create<DockState>()(
  persist(
    (set, get) => ({
      pinnedModules: defaultPinnedModules,
      
      pinModule: (moduleId) => {
        const { pinnedModules, isPinned } = get()
        
        // Don't add if already pinned
        if (isPinned(moduleId)) return
        
        // Find the module to make sure it exists
        const moduleExists = allModules.some(m => m.id === moduleId)
        if (!moduleExists) return
        
        set({ pinnedModules: [...pinnedModules, moduleId] })
      },
      
      unpinModule: (moduleId) => {
        const { pinnedModules } = get()
        
        // Don't allow unpinning if it would leave the dock empty
        if (pinnedModules.length <= 1) return
        
        set({ 
          pinnedModules: pinnedModules.filter(id => id !== moduleId) 
        })
      },
      
      reorderModules: (newOrder) => {
        // Validate that newOrder contains the same items as pinnedModules
        const { pinnedModules } = get()
        const isValid = 
          newOrder.length === pinnedModules.length && 
          newOrder.every(id => pinnedModules.includes(id))
        
        if (isValid) {
          set({ pinnedModules: newOrder })
        }
      },
      
      isPinned: (moduleId) => {
        return get().pinnedModules.includes(moduleId)
      },
      
      resetToDefault: () => {
        set({ pinnedModules: defaultPinnedModules })
      }
    }),
    {
      name: 'dock-storage'
    }
  )
)