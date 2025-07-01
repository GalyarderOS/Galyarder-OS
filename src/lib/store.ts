import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

interface AppState {
  user: User | null
  sidebarOpen: boolean
  theme: 'light' | 'dark'
  hasCompletedWelcome: boolean
  notifications: Array<{
    id: string
    title: string
    message: string
    type: 'info' | 'success' | 'warning' | 'error'
    timestamp: Date
  }>
  
  // Actions
  setUser: (user: User | null) => void
  setSidebarOpen: (open: boolean) => void
  setTheme: (theme: 'light' | 'dark') => void
  setHasCompletedWelcome: (status: boolean) => void
  addNotification: (notification: Omit<AppState['notifications'][0], 'id' | 'timestamp'>) => void
  removeNotification: (id: string) => void
  updateUserProfile: (updates: Partial<User>) => void
}

// Function to extract Gmail username and generate default avatar
const getGmailDefaults = (email: string) => {
  if (email.includes('@gmail.com')) {
    const username = email.split('@')[0]
    return {
      name: username,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=4285f4&color=fff&size=150`
    }
  }
  return {
    name: email.split('@')[0],
    avatar: undefined
  }
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: null, // Start with no user for landing page flow
      sidebarOpen: true,
      theme: 'dark',
      hasCompletedWelcome: false, // Start with false for new users
      notifications: [],

      setUser: (user) => {
        // If setting a new user with Gmail, apply defaults
        if (user && user.email.includes('@gmail.com') && (!user.name || user.name === user.email.split('@')[0])) {
          const gmailDefaults = getGmailDefaults(user.email)
          user = {
            ...user,
            name: user.name || gmailDefaults.name,
            avatar: user.avatar || gmailDefaults.avatar
          }
        }
        set({ user })
      },
      
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      setTheme: (theme) => set({ theme }),
      setHasCompletedWelcome: (status) => set({ hasCompletedWelcome: status }),
      
      addNotification: (notification) => {
        const id = Math.random().toString(36).substr(2, 9)
        const newNotification = {
          ...notification,
          id,
          timestamp: new Date(),
        }
        set((state) => ({
          notifications: [newNotification, ...state.notifications].slice(0, 10)
        }))
      },
      
      removeNotification: (id) => {
        set((state) => ({
          notifications: state.notifications.filter(n => n.id !== id)
        }))
      },

      updateUserProfile: (updates) => {
        const currentUser = get().user
        if (currentUser) {
          const updatedUser = { ...currentUser, ...updates }
          
          // If email changed to Gmail, offer to use Gmail defaults
          if (updates.email && updates.email.includes('@gmail.com') && updates.email !== currentUser.email) {
            const gmailDefaults = getGmailDefaults(updates.email)
            // Only apply defaults if name/avatar weren't explicitly changed
            if (!updates.name && !updates.avatar) {
              updatedUser.name = gmailDefaults.name
              updatedUser.avatar = gmailDefaults.avatar
            }
          }
          
          set({ user: updatedUser })
        }
      },
    }),
    {
      name: 'galyarderos-storage',
      partialize: (state) => ({
        user: state.user,
        theme: state.theme,
        sidebarOpen: state.sidebarOpen,
        hasCompletedWelcome: state.hasCompletedWelcome,
      }),
    }
  )
)