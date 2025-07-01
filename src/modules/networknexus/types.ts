export interface Contact {
  id: string
  name: string
  email?: string
  phone?: string
  company?: string
  position?: string
  category: 'professional' | 'personal' | 'mentor' | 'client' | 'vendor'
  relationship: 'strong' | 'medium' | 'weak'
  lastContact: string
  nextFollowUp?: string
  notes: string
  tags: string[]
  socialLinks: {
    linkedin?: string
    twitter?: string
    website?: string
  }
  avatar?: string
  createdAt: string
}

export interface Interaction {
  id: string
  contactId: string
  type: 'meeting' | 'call' | 'email' | 'message' | 'event' | 'other'
  subject: string
  description: string
  date: string
  duration?: number
  outcome: 'positive' | 'neutral' | 'negative'
  followUpRequired: boolean
  followUpDate?: string
  location?: string
  createdAt: string
}

export interface FollowUp {
  id: string
  contactId: string
  title: string
  description: string
  dueDate: string
  priority: 'low' | 'medium' | 'high'
  status: 'pending' | 'completed' | 'overdue'
  type: 'email' | 'call' | 'meeting' | 'message' | 'other'
  createdAt: string
  completedAt?: string
}

export interface NetworkGoal {
  id: string
  title: string
  description: string
  targetDate: string
  category: 'expand' | 'strengthen' | 'maintain' | 'reconnect'
  targetNumber?: number
  currentProgress: number
  status: 'active' | 'completed' | 'paused'
  createdAt: string
}

export interface NetworkState {
  contacts: Contact[]
  interactions: Interaction[]
  followUps: FollowUp[]
  networkGoals: NetworkGoal[]
  
  // Contact actions
  addContact: (contact: Omit<Contact, 'id' | 'createdAt'>) => void
  updateContact: (id: string, updates: Partial<Contact>) => void
  deleteContact: (id: string) => void
  
  // Interaction actions
  addInteraction: (interaction: Omit<Interaction, 'id' | 'createdAt'>) => void
  updateInteraction: (id: string, updates: Partial<Interaction>) => void
  deleteInteraction: (id: string) => void
  
  // Follow-up actions
  addFollowUp: (followUp: Omit<FollowUp, 'id' | 'createdAt'>) => void
  updateFollowUp: (id: string, updates: Partial<FollowUp>) => void
  deleteFollowUp: (id: string) => void
  completeFollowUp: (id: string) => void
  
  // Network goal actions
  addNetworkGoal: (goal: Omit<NetworkGoal, 'id' | 'createdAt'>) => void
  updateNetworkGoal: (id: string, updates: Partial<NetworkGoal>) => void
  deleteNetworkGoal: (id: string) => void
}