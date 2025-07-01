export interface EnvironmentMode {
  id: string
  name: string
  description: string
  settings: {
    lighting: number
    temperature: number
    humidity: number
    noise: number
    airQuality: number
  }
  devices: string[]
  isActive: boolean
  createdAt: string
}

export interface Device {
  id: string
  name: string
  type: 'lighting' | 'climate' | 'audio' | 'display' | 'security' | 'other'
  status: 'online' | 'offline' | 'error'
  location: string
  settings: Record<string, any>
  lastUpdated: string
}

export interface AmbientProfile {
  id: string
  name: string
  soundscape: string
  lighting: {
    brightness: number
    temperature: number
    color: string
  }
  scent?: string
  duration: number
  triggers: string[]
}

export interface EnvironmentState {
  modes: EnvironmentMode[]
  devices: Device[]
  ambientProfiles: AmbientProfile[]
  currentMode: string | null
  
  // Actions
  addMode: (mode: Omit<EnvironmentMode, 'id' | 'createdAt'>) => void
  updateMode: (id: string, updates: Partial<EnvironmentMode>) => void
  deleteMode: (id: string) => void
  activateMode: (id: string) => void
  
  addDevice: (device: Omit<Device, 'id' | 'lastUpdated'>) => void
  updateDevice: (id: string, updates: Partial<Device>) => void
  deleteDevice: (id: string) => void
  
  addAmbientProfile: (profile: Omit<AmbientProfile, 'id'>) => void
  updateAmbientProfile: (id: string, updates: Partial<AmbientProfile>) => void
  deleteAmbientProfile: (id: string) => void
}