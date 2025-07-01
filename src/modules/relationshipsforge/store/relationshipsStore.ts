import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Relationship {
  id: string
  name: string
  type: string
  notes?: string
  lastContact: string
  contactFrequency: number
}

interface Interaction {
  id: string
  relationshipId: string
  date: string
  type: string
  notes?: string
  sentiment: 'positive' | 'neutral' | 'negative'
}

interface RelationshipsState {
  relationships: Relationship[]
  interactions: Interaction[]
  
  addRelationship: (relationship: Omit<Relationship, 'id'>) => void
  updateRelationship: (id: string, updates: Partial<Relationship>) => void
  deleteRelationship: (id: string) => void
  
  addInteraction: (interaction: Omit<Interaction, 'id'>) => void
  updateInteraction: (id: string, updates: Partial<Interaction>) => void
  deleteInteraction: (id: string) => void
}

const mockRelationships: Relationship[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    type: 'Friend',
    notes: 'College roommate, now works at Tech Co.',
    lastContact: '2024-02-05',
    contactFrequency: 14
  },
  {
    id: '2',
    name: 'David Kim',
    type: 'Colleague',
    notes: 'Project manager at work',
    lastContact: '2024-02-09',
    contactFrequency: 7
  }
]

const mockInteractions: Interaction[] = [
  {
    id: '1',
    relationshipId: '1',
    date: '2024-02-05',
    type: 'Coffee',
    notes: 'Caught up on life updates, discussed travel plans',
    sentiment: 'positive'
  },
  {
    id: '2',
    relationshipId: '2',
    date: '2024-02-09',
    type: 'Meeting',
    notes: 'Project status update',
    sentiment: 'neutral'
  }
]

export const useRelationshipsStore = create<RelationshipsState>()(
  persist(
    (set) => ({
      relationships: mockRelationships,
      interactions: mockInteractions,
      
      addRelationship: (relationship) => {
        const newRelationship = {
          ...relationship,
          id: Math.random().toString(36).substr(2, 9)
        }
        set((state) => ({
          relationships: [...state.relationships, newRelationship]
        }))
      },
      
      updateRelationship: (id, updates) => {
        set((state) => ({
          relationships: state.relationships.map(relationship =>
            relationship.id === id ? { ...relationship, ...updates } : relationship
          )
        }))
      },
      
      deleteRelationship: (id) => {
        set((state) => ({
          relationships: state.relationships.filter(relationship => relationship.id !== id),
          interactions: state.interactions.filter(interaction => interaction.relationshipId !== id)
        }))
      },
      
      addInteraction: (interaction) => {
        const newInteraction = {
          ...interaction,
          id: Math.random().toString(36).substr(2, 9)
        }
        set((state) => ({
          interactions: [...state.interactions, newInteraction]
        }))
      },
      
      updateInteraction: (id, updates) => {
        set((state) => ({
          interactions: state.interactions.map(interaction =>
            interaction.id === id ? { ...interaction, ...updates } : interaction
          )
        }))
      },
      
      deleteInteraction: (id) => {
        set((state) => ({
          interactions: state.interactions.filter(interaction => interaction.id !== id)
        }))
      }
    }),
    {
      name: 'relationships-forge-storage'
    }
  )
)