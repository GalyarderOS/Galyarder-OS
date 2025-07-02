import { consciousnessDB, ConsciousnessUser } from './supabase'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  user: ConsciousnessUser | null
  session: any | null
  loading: boolean
  isAuthenticated: boolean
  
  // Actions
  signUp: (email: string, password: string, name?: string) => Promise<{ success: boolean; error?: string }>
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signOut: () => Promise<void>
  updateProfile: (updates: Partial<ConsciousnessUser>) => Promise<boolean>
  checkAuth: () => Promise<void>
  setUser: (user: ConsciousnessUser | null) => void
  setSession: (session: any) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      session: null,
      loading: true,
      isAuthenticated: false,

      signUp: async (email: string, password: string, name?: string) => {
        try {
          const { data, error } = await consciousnessDB.signUp(email, password, { name })
          
          if (error) {
            return { success: false, error: error.message }
          }

          if (data.user) {
            // Create consciousness profile
            await consciousnessDB.create('consciousness_profiles', {
              user_id: data.user.id,
              goals: [],
              preferences: {},
              metrics: {},
              achievements: []
            })
          }

          return { success: true }
        } catch (error) {
          return { success: false, error: 'Sign up failed' }
        }
      },

      signIn: async (email: string, password: string) => {
        try {
          set({ loading: true })
          const { data, error } = await consciousnessDB.signIn(email, password)
          
          if (error) {
            set({ loading: false })
            return { success: false, error: error.message }
          }

          if (data.session && data.user) {
            set({ 
              session: data.session, 
              user: { ...data.user, consciousness_level: 1 } as ConsciousnessUser, 
              isAuthenticated: true,
              loading: false 
            })
            return { success: true }
          }

          set({ loading: false })
          return { success: false, error: 'Authentication failed' }
        } catch (error) {
          set({ loading: false })
          return { success: false, error: 'Sign in failed' }
        }
      },

      signOut: async () => {
        try {
          await consciousnessDB.signOut()
          set({ 
            user: null, 
            session: null, 
            isAuthenticated: false,
            loading: false 
          })
        } catch (error) {
          console.error('Sign out error:', error)
        }
      },

      updateProfile: async (updates: Partial<ConsciousnessUser>) => {
        const { user } = get()
        if (!user) return false

        try {
          const updatedUser = await consciousnessDB.update<ConsciousnessUser>('users', user.id, updates)
          if (updatedUser) {
            set({ user: updatedUser })
            return true
          }
          return false
        } catch (error) {
          console.error('Profile update error:', error)
          return false
        }
      },

      checkAuth: async () => {
        try {
          set({ loading: true })
          const { data } = await consciousnessDB.getCurrentUser()
          
          if (data.user) {
            set({ 
              user: { ...data.user, consciousness_level: 1 } as ConsciousnessUser, 
              isAuthenticated: true,
              loading: false 
            })
          } else {
            set({ 
              user: null, 
              isAuthenticated: false,
              loading: false 
            })
          }
        } catch (error) {
          set({ 
            user: null, 
            isAuthenticated: false,
            loading: false 
          })
        }
      },

      setUser: (user: ConsciousnessUser | null) => {
        set({ user, isAuthenticated: !!user })
      },

      setSession: (session: any) => {
        set({ session })
      }
    }),
    {
      name: 'consciousness-auth',
      partialize: (state) => ({ 
        user: state.user, 
        session: state.session,
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
)

// Initialize consciousness authentication
export const initializeAuth = () => {
  const { checkAuth, setUser, setSession } = useAuthStore.getState()
  
  // Check current auth state
  checkAuth()
  
  // Listen for auth changes
  consciousnessDB.onAuthStateChange((event, session) => {
    console.log('Consciousness auth event:', event)
    
    if (event === 'SIGNED_IN' && session) {
      setSession(session)
      setUser(session.user as ConsciousnessUser)
    } else if (event === 'SIGNED_OUT') {
      setUser(null)
      setSession(null)
    }
  })
}

// Consciousness authentication guard
export const useAuthGuard = () => {
  const { isAuthenticated, user, loading } = useAuthStore()
  
  return {
    isAuthenticated,
    user,
    loading,
    userId: user?.id,
    userEmail: user?.email,
    userName: user?.name,
    consciousnessLevel: user?.consciousness_level || 1
  }
}