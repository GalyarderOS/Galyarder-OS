import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { SleepState, SleepSession, SleepCycle, WakeProtocol } from '../types'

const mockSessions: SleepSession[] = [
  {
    id: '1',
    date: '2024-02-10',
    bedTime: '22:30',
    sleepTime: '23:00',
    wakeTime: '07:00',
    duration: 480,
    quality: 8.5,
    phases: [
      { type: 'light', startTime: '23:00', duration: 60 },
      { type: 'deep', startTime: '00:00', duration: 120 },
      { type: 'rem', startTime: '02:00', duration: 90 },
      { type: 'light', startTime: '03:30', duration: 90 },
      { type: 'deep', startTime: '05:00', duration: 60 },
      { type: 'light', startTime: '06:00', duration: 60 }
    ],
    notes: 'Good sleep quality, felt refreshed',
    environment: {
      temperature: 19,
      humidity: 45,
      noise: 25
    },
    recovery: {
      hrv: 45,
      restingHR: 52,
      bodyBattery: 85
    }
  },
  {
    id: '2',
    date: '2024-02-09',
    bedTime: '23:00',
    sleepTime: '23:30',
    wakeTime: '06:45',
    duration: 435,
    quality: 7.2,
    phases: [
      { type: 'light', startTime: '23:30', duration: 45 },
      { type: 'deep', startTime: '00:15', duration: 105 },
      { type: 'rem', startTime: '02:00', duration: 75 },
      { type: 'light', startTime: '03:15', duration: 120 },
      { type: 'rem', startTime: '05:15', duration: 90 }
    ],
    environment: {
      temperature: 20,
      humidity: 50,
      noise: 30
    },
    recovery: {
      hrv: 38,
      restingHR: 55,
      bodyBattery: 78
    }
  }
]

const mockCycles: SleepCycle[] = [
  {
    id: '1',
    name: 'Standard Monophasic',
    type: 'monophasic',
    schedule: [
      {
        id: '1',
        name: 'Core Sleep',
        startTime: '23:00',
        duration: 480,
        type: 'core'
      }
    ],
    totalSleep: 480,
    isActive: true,
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'Everyman 3',
    type: 'polyphasic',
    schedule: [
      {
        id: '1',
        name: 'Core Sleep',
        startTime: '01:00',
        duration: 210,
        type: 'core'
      },
      {
        id: '2',
        name: 'Nap 1',
        startTime: '09:00',
        duration: 20,
        type: 'nap'
      },
      {
        id: '3',
        name: 'Nap 2',
        startTime: '14:00',
        duration: 20,
        type: 'nap'
      },
      {
        id: '4',
        name: 'Nap 3',
        startTime: '21:00',
        duration: 20,
        type: 'nap'
      }
    ],
    totalSleep: 270,
    isActive: false,
    createdAt: '2024-01-20'
  }
]

const mockWakeProtocols: WakeProtocol[] = [
  {
    id: '1',
    name: 'Gentle Sunrise',
    steps: [
      {
        id: '1',
        name: 'Gradual Light',
        duration: 30,
        type: 'light',
        intensity: 50
      },
      {
        id: '2',
        name: 'Nature Sounds',
        duration: 10,
        type: 'sound',
        intensity: 30
      },
      {
        id: '3',
        name: 'Gentle Vibration',
        duration: 5,
        type: 'vibration',
        intensity: 20
      }
    ],
    duration: 45,
    isActive: true
  }
]

export const useSleepStore = create<SleepState>()(
  persist(
    (set, get) => ({
      sessions: mockSessions,
      cycles: mockCycles,
      wakeProtocols: mockWakeProtocols,
      currentCycle: '1',

      addSession: (session) => {
        const newSession: SleepSession = {
          ...session,
          id: Math.random().toString(36).substr(2, 9)
        }
        set((state) => ({
          sessions: [...state.sessions, newSession]
        }))
      },

      updateSession: (id, updates) => {
        set((state) => ({
          sessions: state.sessions.map(session =>
            session.id === id ? { ...session, ...updates } : session
          )
        }))
      },

      deleteSession: (id) => {
        set((state) => ({
          sessions: state.sessions.filter(session => session.id !== id)
        }))
      },

      addCycle: (cycle) => {
        const newCycle: SleepCycle = {
          ...cycle,
          id: Math.random().toString(36).substr(2, 9),
          createdAt: new Date().toISOString()
        }
        set((state) => ({
          cycles: [...state.cycles, newCycle]
        }))
      },

      updateCycle: (id, updates) => {
        set((state) => ({
          cycles: state.cycles.map(cycle =>
            cycle.id === id ? { ...cycle, ...updates } : cycle
          )
        }))
      },

      deleteCycle: (id) => {
        set((state) => ({
          cycles: state.cycles.filter(cycle => cycle.id !== id),
          currentCycle: state.currentCycle === id ? null : state.currentCycle
        }))
      },

      activateCycle: (id) => {
        set((state) => ({
          cycles: state.cycles.map(cycle => ({
            ...cycle,
            isActive: cycle.id === id
          })),
          currentCycle: id
        }))
      },

      addWakeProtocol: (protocol) => {
        const newProtocol: WakeProtocol = {
          ...protocol,
          id: Math.random().toString(36).substr(2, 9)
        }
        set((state) => ({
          wakeProtocols: [...state.wakeProtocols, newProtocol]
        }))
      },

      updateWakeProtocol: (id, updates) => {
        set((state) => ({
          wakeProtocols: state.wakeProtocols.map(protocol =>
            protocol.id === id ? { ...protocol, ...updates } : protocol
          )
        }))
      },

      deleteWakeProtocol: (id) => {
        set((state) => ({
          wakeProtocols: state.wakeProtocols.filter(protocol => protocol.id !== id)
        }))
      }
    }),
    {
      name: 'sleep-architect-storage'
    }
  )
)