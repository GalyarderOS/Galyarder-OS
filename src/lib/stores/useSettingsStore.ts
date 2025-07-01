import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface IntegrationSettings {
  notionToken: string
  openrouterKey: string
  openaiKey: string
  geminiKey: string
  claudeKey: string
  defaultLLM: 'openai' | 'gemini' | 'claude' | 'openrouter' | null
}

export interface CustomCommand {
  id: string
  command: string
  label: string
  actionType: 'navigate' | 'openModal' | 'triggerHook'
  payload?: any
}

export interface CommandSettings {
  customCommands: CustomCommand[]
  enabledModules: string[]
  quickActions: string[]
}

export interface SecuritySettings {
  twoFactorEnabled: boolean
  biometricEnabled: boolean
  autoLockTimeout: number
  passwordPolicy: {
    minLength: number
    requireSpecialChars: boolean
    requireNumbers: boolean
    requireUppercase: boolean
  }
  dataRetention: {
    logRetentionDays: number
    autoDeleteInactive: boolean
    inactiveThresholdDays: number
  }
}

export interface SettingsState {
  integrations: IntegrationSettings
  commands: CommandSettings
  security: SecuritySettings
  
  // Integration actions
  updateIntegration: (key: keyof IntegrationSettings, value: string | null) => void
  clearIntegration: (key: keyof IntegrationSettings) => void
  testIntegration: (key: keyof IntegrationSettings) => Promise<boolean>
  
  // Command actions
  addCustomCommand: (command: Omit<CustomCommand, 'id'>) => void
  updateCustomCommand: (id: string, updates: Partial<Omit<CustomCommand, 'id'>>) => void
  deleteCustomCommand: (id: string) => void
  toggleModuleInSearch: (moduleId: string, enabled: boolean) => void
  addQuickAction: (actionId: string) => void
  removeQuickAction: (actionId: string) => void
  
  // Security actions
  updateSecuritySetting: <K extends keyof SecuritySettings>(
    key: K, 
    value: SecuritySettings[K]
  ) => void
  updatePasswordPolicy: <K extends keyof SecuritySettings['passwordPolicy']>(
    key: K, 
    value: SecuritySettings['passwordPolicy'][K]
  ) => void
  updateDataRetention: <K extends keyof SecuritySettings['dataRetention']>(
    key: K, 
    value: SecuritySettings['dataRetention'][K]
  ) => void
}

// Default settings
const defaultIntegrations: IntegrationSettings = {
  notionToken: '',
  openrouterKey: '',
  openaiKey: '',
  geminiKey: '',
  claudeKey: '',
  defaultLLM: null
}

const defaultCommands: CommandSettings = {
  customCommands: [
    {
      id: '1',
      command: '/finance add',
      label: 'Add Expense',
      actionType: 'openModal',
      payload: { modal: 'addExpense' }
    },
    {
      id: '2',
      command: '/focus',
      label: 'Start Focus Mode',
      actionType: 'triggerHook',
      payload: { hook: 'startFocusMode' }
    },
    {
      id: '3',
      command: '/calendar',
      label: 'Open Calendar',
      actionType: 'navigate',
      payload: { path: '/app/calendar' }
    }
  ],
  enabledModules: [
    'dashboard',
    'ai-assistant',
    'chrono-copilot',
    'finance-hub',
    'health-forge',
    'productivity-matrix',
    'mind-guard',
    'system-logs',
    'calendar',
    'files'
  ],
  quickActions: [
    'addExpense',
    'startFocusMode',
    'logWorkout',
    'addTimeBlock'
  ]
}

const defaultSecurity: SecuritySettings = {
  twoFactorEnabled: false,
  biometricEnabled: false,
  autoLockTimeout: 15, // minutes
  passwordPolicy: {
    minLength: 8,
    requireSpecialChars: true,
    requireNumbers: true,
    requireUppercase: true
  },
  dataRetention: {
    logRetentionDays: 90,
    autoDeleteInactive: false,
    inactiveThresholdDays: 365
  }
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      integrations: defaultIntegrations,
      commands: defaultCommands,
      security: defaultSecurity,
      
      // Integration actions
      updateIntegration: (key, value) => {
        set((state) => ({
          integrations: {
            ...state.integrations,
            [key]: value
          }
        }))
      },
      
      clearIntegration: (key) => {
        set((state) => ({
          integrations: {
            ...state.integrations,
            [key]: ''
          }
        }))
      },
      
      testIntegration: async (key) => {
        const { integrations } = get()
        const token = integrations[key]
        
        if (!token) return false
        
        // Simulate API validation
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Simple validation based on key format
        let isValid = false
        
        switch (key) {
          case 'notionToken':
            isValid = token.startsWith('secret_')
            break
          case 'openaiKey':
            isValid = token.startsWith('sk-')
            break
          case 'geminiKey':
            isValid = token.length > 20
            break
          case 'claudeKey':
            isValid = token.startsWith('sk-ant-')
            break
          case 'openrouterKey':
            isValid = token.startsWith('sk-or-')
            break
          default:
            isValid = token.length > 10
        }
        
        return isValid
      },
      
      // Command actions
      addCustomCommand: (command) => {
        const newCommand: CustomCommand = {
          ...command,
          id: Math.random().toString(36).substr(2, 9)
        }
        
        set((state) => ({
          commands: {
            ...state.commands,
            customCommands: [...state.commands.customCommands, newCommand]
          }
        }))
      },
      
      updateCustomCommand: (id, updates) => {
        set((state) => ({
          commands: {
            ...state.commands,
            customCommands: state.commands.customCommands.map(cmd =>
              cmd.id === id ? { ...cmd, ...updates } : cmd
            )
          }
        }))
      },
      
      deleteCustomCommand: (id) => {
        set((state) => ({
          commands: {
            ...state.commands,
            customCommands: state.commands.customCommands.filter(cmd => cmd.id !== id)
          }
        }))
      },
      
      toggleModuleInSearch: (moduleId, enabled) => {
        set((state) => ({
          commands: {
            ...state.commands,
            enabledModules: enabled
              ? [...state.commands.enabledModules, moduleId]
              : state.commands.enabledModules.filter(id => id !== moduleId)
          }
        }))
      },
      
      addQuickAction: (actionId) => {
        set((state) => ({
          commands: {
            ...state.commands,
            quickActions: [...state.commands.quickActions, actionId]
          }
        }))
      },
      
      removeQuickAction: (actionId) => {
        set((state) => ({
          commands: {
            ...state.commands,
            quickActions: state.commands.quickActions.filter(id => id !== actionId)
          }
        }))
      },
      
      // Security actions
      updateSecuritySetting: (key, value) => {
        set((state) => ({
          security: {
            ...state.security,
            [key]: value
          }
        }))
      },
      
      updatePasswordPolicy: (key, value) => {
        set((state) => ({
          security: {
            ...state.security,
            passwordPolicy: {
              ...state.security.passwordPolicy,
              [key]: value
            }
          }
        }))
      },
      
      updateDataRetention: (key, value) => {
        set((state) => ({
          security: {
            ...state.security,
            dataRetention: {
              ...state.security.dataRetention,
              [key]: value
            }
          }
        }))
      }
    }),
    {
      name: 'galyarderos-settings',
      partialize: (state) => ({
        integrations: {
          ...state.integrations,
          // Don't persist API keys to localStorage for security
          // Instead, store them in a more secure way in a real app
          notionToken: '',
          openrouterKey: '',
          openaiKey: '',
          geminiKey: '',
          claudeKey: '',
          defaultLLM: state.integrations.defaultLLM
        },
        commands: state.commands,
        security: state.security
      })
    }
  )
)