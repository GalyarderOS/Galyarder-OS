import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ActivityLog {
  id: string
  timestamp: string
  module: string
  action: string
  details: string
}

interface SystemLogsState {
  activityLogs: ActivityLog[]
  
  addActivityLog: (log: Omit<ActivityLog, 'id' | 'timestamp'>) => void
  clearActivityLogs: () => void
}

const mockActivityLogs: ActivityLog[] = [
  {
    id: '1',
    timestamp: '2024-02-10T09:30:00Z',
    module: 'FinanceHub',
    action: 'Added expense',
    details: 'Groceries - $85.50'
  },
  {
    id: '2',
    timestamp: '2024-02-10T10:15:00Z',
    module: 'HealthForge',
    action: 'Logged workout',
    details: 'Strength training - 45 minutes'
  }
]

export const useSystemLogsStore = create<SystemLogsState>()(
  persist(
    (set) => ({
      activityLogs: mockActivityLogs,
      
      addActivityLog: (log) => {
        const newLog = {
          ...log,
          id: Math.random().toString(36).substr(2, 9),
          timestamp: new Date().toISOString()
        }
        set((state) => ({
          activityLogs: [newLog, ...state.activityLogs]
        }))
      },
      
      clearActivityLogs: () => {
        set({ activityLogs: [] })
      }
    }),
    {
      name: 'system-logs-storage'
    }
  )
)