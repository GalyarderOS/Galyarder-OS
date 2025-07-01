export interface FamilyMember {
  id: string
  name: string
  relationship: string
  birthdate?: string
  avatar?: string
  contact: {
    email?: string
    phone?: string
    address?: string
  }
  notes: string
  lastContact: string
  nextContact?: string
  importantDates: {
    id: string
    title: string
    date: string
    recurring: boolean
    type: 'birthday' | 'anniversary' | 'other'
  }[]
  tags: string[]
}

export interface Responsibility {
  id: string
  title: string
  description: string
  assignee: string
  dueDate?: string
  recurring: boolean
  recurrencePattern?: string
  status: 'pending' | 'in-progress' | 'completed' | 'overdue'
  priority: 'low' | 'medium' | 'high'
  category: string
  notes: string
  createdAt: string
  updatedAt: string
}

export interface GratitudeEntry {
  id: string
  date: string
  recipient: string
  content: string
  category: string
  isShared: boolean
  tags: string[]
  createdAt: string
}

export interface FamilyEvent {
  id: string
  title: string
  description: string
  date: string
  location?: string
  attendees: string[]
  status: 'planned' | 'confirmed' | 'completed' | 'cancelled'
  notes: string
  createdAt: string
  updatedAt: string
}

export interface FamilyMatrixState {
  familyMembers: FamilyMember[]
  responsibilities: Responsibility[]
  gratitudeEntries: GratitudeEntry[]
  familyEvents: FamilyEvent[]
  
  // Family member actions
  addFamilyMember: (member: Omit<FamilyMember, 'id'>) => void
  updateFamilyMember: (id: string, updates: Partial<FamilyMember>) => void
  deleteFamilyMember: (id: string) => void
  
  // Responsibility actions
  addResponsibility: (responsibility: Omit<Responsibility, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateResponsibility: (id: string, updates: Partial<Responsibility>) => void
  deleteResponsibility: (id: string) => void
  completeResponsibility: (id: string) => void
  
  // Gratitude actions
  addGratitudeEntry: (entry: Omit<GratitudeEntry, 'id' | 'createdAt'>) => void
  updateGratitudeEntry: (id: string, updates: Partial<GratitudeEntry>) => void
  deleteGratitudeEntry: (id: string) => void
  
  // Event actions
  addFamilyEvent: (event: Omit<FamilyEvent, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateFamilyEvent: (id: string, updates: Partial<FamilyEvent>) => void
  deleteFamilyEvent: (id: string) => void
  
  // Utility actions
  getUpcomingEvents: (days: number) => FamilyEvent[]
  getUpcomingBirthdays: (days: number) => { member: FamilyMember, date: string }[]
  getPendingResponsibilities: () => Responsibility[]
}