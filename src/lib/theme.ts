import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type ThemeMode = 'light' | 'dark' | 'auto'
export type AccentColor = 'purple' | 'blue' | 'emerald' | 'orange' | 'pink' | 'red'

interface ThemeColors {
  // Background colors
  bg: {
    primary: string
    secondary: string
    tertiary: string
    accent: string
    elevated: string
  }
  // Text colors
  text: {
    primary: string
    secondary: string
    tertiary: string
    accent: string
    inverse: string
  }
  // Border and divider colors
  border: {
    primary: string
    secondary: string
    accent: string
  }
  // Interactive colors
  interactive: {
    primary: string
    primaryHover: string
    secondary: string
    secondaryHover: string
    destructive: string
    destructiveHover: string
  }
  // Status colors
  status: {
    success: string
    warning: string
    error: string
    info: string
  }
  // Consciousness-specific colors
  consciousness: {
    primary: string
    secondary: string
    gradient: string
    glow: string
  }
}

interface ThemeState {
  mode: ThemeMode
  accentColor: AccentColor
  isSystemDark: boolean
  colors: ThemeColors
  
  // Actions
  setMode: (mode: ThemeMode) => void
  setAccentColor: (color: AccentColor) => void
  setSystemDark: (isDark: boolean) => void
  toggleMode: () => void
  getEffectiveTheme: () => 'light' | 'dark'
}

const createThemeColors = (isDark: boolean, accent: AccentColor): ThemeColors => {
  const accentColors = {
    purple: {
      primary: isDark ? '#8b5cf6' : '#7c3aed',
      secondary: isDark ? '#a78bfa' : '#8b5cf6',
      gradient: isDark ? 'from-purple-500 to-blue-600' : 'from-purple-600 to-blue-700',
    },
    blue: {
      primary: isDark ? '#3b82f6' : '#2563eb',
      secondary: isDark ? '#60a5fa' : '#3b82f6',
      gradient: isDark ? 'from-blue-500 to-cyan-600' : 'from-blue-600 to-cyan-700',
    },
    emerald: {
      primary: isDark ? '#10b981' : '#059669',
      secondary: isDark ? '#34d399' : '#10b981',
      gradient: isDark ? 'from-emerald-500 to-teal-600' : 'from-emerald-600 to-teal-700',
    },
    orange: {
      primary: isDark ? '#f97316' : '#ea580c',
      secondary: isDark ? '#fb923c' : '#f97316',
      gradient: isDark ? 'from-orange-500 to-red-600' : 'from-orange-600 to-red-700',
    },
    pink: {
      primary: isDark ? '#ec4899' : '#db2777',
      secondary: isDark ? '#f472b6' : '#ec4899',
      gradient: isDark ? 'from-pink-500 to-rose-600' : 'from-pink-600 to-rose-700',
    },
    red: {
      primary: isDark ? '#ef4444' : '#dc2626',
      secondary: isDark ? '#f87171' : '#ef4444',
      gradient: isDark ? 'from-red-500 to-pink-600' : 'from-red-600 to-pink-700',
    },
  }

  const currentAccent = accentColors[accent]

  if (isDark) {
    return {
      bg: {
        primary: '#0f172a',      // slate-900
        secondary: '#1e293b',    // slate-800
        tertiary: '#334155',     // slate-700
        accent: '#475569',       // slate-600
        elevated: '#1e293b',     // slate-800 with backdrop blur
      },
      text: {
        primary: '#f8fafc',      // slate-50
        secondary: '#cbd5e1',    // slate-300
        tertiary: '#94a3b8',     // slate-400
        accent: currentAccent.primary,
        inverse: '#0f172a',      // slate-900
      },
      border: {
        primary: '#334155',      // slate-700
        secondary: '#475569',    // slate-600
        accent: currentAccent.primary,
      },
      interactive: {
        primary: currentAccent.primary,
        primaryHover: currentAccent.secondary,
        secondary: '#374151',    // gray-700
        secondaryHover: '#4b5563', // gray-600
        destructive: '#ef4444',  // red-500
        destructiveHover: '#f87171', // red-400
      },
      status: {
        success: '#10b981',      // emerald-500
        warning: '#f59e0b',      // amber-500
        error: '#ef4444',        // red-500
        info: '#3b82f6',         // blue-500
      },
      consciousness: {
        primary: currentAccent.primary,
        secondary: currentAccent.secondary,
        gradient: currentAccent.gradient,
        glow: `${currentAccent.primary}40`, // 25% opacity
      },
    }
  } else {
    return {
      bg: {
        primary: '#ffffff',      // white
        secondary: '#f8fafc',    // slate-50
        tertiary: '#f1f5f9',     // slate-100
        accent: '#e2e8f0',       // slate-200
        elevated: '#ffffff',     // white with shadow
      },
      text: {
        primary: '#0f172a',      // slate-900
        secondary: '#475569',    // slate-600
        tertiary: '#64748b',     // slate-500
        accent: currentAccent.primary,
        inverse: '#ffffff',      // white
      },
      border: {
        primary: '#e2e8f0',      // slate-200
        secondary: '#cbd5e1',    // slate-300
        accent: currentAccent.primary,
      },
      interactive: {
        primary: currentAccent.primary,
        primaryHover: currentAccent.secondary,
        secondary: '#f1f5f9',    // slate-100
        secondaryHover: '#e2e8f0', // slate-200
        destructive: '#dc2626',  // red-600
        destructiveHover: '#ef4444', // red-500
      },
      status: {
        success: '#059669',      // emerald-600
        warning: '#d97706',      // amber-600
        error: '#dc2626',        // red-600
        info: '#2563eb',         // blue-600
      },
      consciousness: {
        primary: currentAccent.primary,
        secondary: currentAccent.secondary,
        gradient: currentAccent.gradient,
        glow: `${currentAccent.primary}20`, // 12.5% opacity
      },
    }
  }
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      mode: 'auto',
      accentColor: 'purple',
      isSystemDark: false,
      colors: createThemeColors(false, 'purple'),

      setMode: (mode: ThemeMode) => {
        const { isSystemDark, accentColor } = get()
        const effectiveDark = mode === 'auto' ? isSystemDark : mode === 'dark'
        
        set({ 
          mode,
          colors: createThemeColors(effectiveDark, accentColor)
        })
        
        // Apply to document
        document.documentElement.classList.toggle('dark', effectiveDark)
      },

      setAccentColor: (color: AccentColor) => {
        const effectiveDark = get().getEffectiveTheme() === 'dark'
        
        set({ 
          accentColor: color,
          colors: createThemeColors(effectiveDark, color)
        })
      },

      setSystemDark: (isDark: boolean) => {
        const { mode, accentColor } = get()
        const effectiveDark = mode === 'auto' ? isDark : mode === 'dark'
        
        set({ 
          isSystemDark: isDark,
          colors: createThemeColors(effectiveDark, accentColor)
        })
        
        // Apply to document if in auto mode
        if (mode === 'auto') {
          document.documentElement.classList.toggle('dark', isDark)
        }
      },

      toggleMode: () => {
        const { mode } = get()
        const newMode: ThemeMode = mode === 'light' ? 'dark' : mode === 'dark' ? 'auto' : 'light'
        get().setMode(newMode)
      },

      getEffectiveTheme: () => {
        const { mode, isSystemDark } = get()
        return mode === 'auto' ? (isSystemDark ? 'dark' : 'light') : mode
      },
    }),
    {
      name: 'galyarderos-theme',
      partialize: (state) => ({
        mode: state.mode,
        accentColor: state.accentColor,
      }),
    }
  )
)

// Initialize theme system
export const initializeTheme = () => {
  const { setSystemDark, setMode, mode } = useThemeStore.getState()
  
  // Check system preference
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  setSystemDark(mediaQuery.matches)
  
  // Listen for system theme changes
  mediaQuery.addEventListener('change', (e) => {
    setSystemDark(e.matches)
  })
  
  // Apply initial theme
  setMode(mode)
}

// Theme utilities
export const getThemeClasses = () => {
  const { colors, getEffectiveTheme } = useThemeStore.getState()
  const isDark = getEffectiveTheme() === 'dark'
  
  return {
    isDark,
    colors,
    glass: isDark 
      ? 'bg-slate-800/40 backdrop-blur-xl border border-slate-700/50' 
      : 'bg-white/40 backdrop-blur-xl border border-slate-200/50',
    card: isDark
      ? 'bg-slate-800/60 border border-slate-700/50'
      : 'bg-white/60 border border-slate-200/50',
    elevated: isDark
      ? 'bg-slate-800 shadow-2xl shadow-black/25'
      : 'bg-white shadow-2xl shadow-slate-900/10',
  }
}

export default useThemeStore