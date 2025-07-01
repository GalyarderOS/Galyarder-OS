export interface Prayer {
  id: string
  name: string
  arabicName: string
  time: string
  isCompleted: boolean
  completedAt?: string
  location?: string
  notes?: string
}

export interface SpiritualActivity {
  id: string
  type: 'dhikr' | 'quran' | 'dua' | 'reflection' | 'charity' | 'other'
  title: string
  description: string
  duration: number
  completedAt: string
  notes?: string
  verses?: string[]
  count?: number
}

export interface TafsirEntry {
  id: string
  surah: number
  ayah: number
  arabicText: string
  translation: string
  tafsir: string
  reflection?: string
  tags: string[]
  bookmarked: boolean
  createdAt: string
}

export interface SpiritualGoal {
  id: string
  title: string
  description: string
  type: 'daily' | 'weekly' | 'monthly' | 'yearly'
  target: number
  current: number
  unit: string
  startDate: string
  endDate: string
  isActive: boolean
}

export interface SpiritualState {
  prayers: Prayer[]
  activities: SpiritualActivity[]
  tafsirEntries: TafsirEntry[]
  spiritualGoals: SpiritualGoal[]
  
  // Prayer actions
  updatePrayer: (id: string, updates: Partial<Prayer>) => void
  completePrayer: (id: string, location?: string, notes?: string) => void
  
  // Activity actions
  addActivity: (activity: Omit<SpiritualActivity, 'id' | 'completedAt'>) => void
  updateActivity: (id: string, updates: Partial<SpiritualActivity>) => void
  deleteActivity: (id: string) => void
  
  // Tafsir actions
  addTafsirEntry: (entry: Omit<TafsirEntry, 'id' | 'createdAt'>) => void
  updateTafsirEntry: (id: string, updates: Partial<TafsirEntry>) => void
  deleteTafsirEntry: (id: string) => void
  toggleBookmark: (id: string) => void
  
  // Goal actions
  addSpiritualGoal: (goal: Omit<SpiritualGoal, 'id'>) => void
  updateSpiritualGoal: (id: string, updates: Partial<SpiritualGoal>) => void
  deleteSpiritualGoal: (id: string) => void
}