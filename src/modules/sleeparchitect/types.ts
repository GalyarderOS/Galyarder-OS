export interface SleepSession {
  id: string
  date: string
  bedTime: string
  sleepTime: string
  wakeTime: string
  duration: number
  quality: number
  phases: SleepPhase[]
  notes?: string
  environment: {
    temperature: number
    humidity: number
    noise: number
  }
  recovery: {
    hrv: number
    restingHR: number
    bodyBattery: number
  }
}

export interface SleepPhase {
  type: 'awake' | 'light' | 'deep' | 'rem'
  startTime: string
  duration: number
}

export interface SleepCycle {
  id: string
  name: string
  type: 'monophasic' | 'biphasic' | 'polyphasic'
  schedule: SleepBlock[]
  totalSleep: number
  isActive: boolean
  createdAt: string
}

export interface SleepBlock {
  id: string
  name: string
  startTime: string
  duration: number
  type: 'core' | 'nap'
}

export interface WakeProtocol {
  id: string
  name: string
  steps: WakeStep[]
  duration: number
  isActive: boolean
}

export interface WakeStep {
  id: string
  name: string
  duration: number
  type: 'light' | 'sound' | 'vibration' | 'temperature'
  intensity: number
}

export interface SleepState {
  sessions: SleepSession[]
  cycles: SleepCycle[]
  wakeProtocols: WakeProtocol[]
  currentCycle: string | null
  
  // Actions
  addSession: (session: Omit<SleepSession, 'id'>) => void
  updateSession: (id: string, updates: Partial<SleepSession>) => void
  deleteSession: (id: string) => void
  
  addCycle: (cycle: Omit<SleepCycle, 'id' | 'createdAt'>) => void
  updateCycle: (id: string, updates: Partial<SleepCycle>) => void
  deleteCycle: (id: string) => void
  activateCycle: (id: string) => void
  
  addWakeProtocol: (protocol: Omit<WakeProtocol, 'id'>) => void
  updateWakeProtocol: (id: string, updates: Partial<WakeProtocol>) => void
  deleteWakeProtocol: (id: string) => void
}