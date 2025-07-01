import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Mission {
  id: string
  title: string
  statement: string
  category: string
  lastUpdated: string
}

interface LegacyGoal {
  id: string
  title: string
  description: string
  timeframe: 'short-term' | 'mid-term' | 'long-term'
  progress: number
  category: string
}

interface LegacyState {
  missions: Mission[]
  goals: LegacyGoal[]
  
  addMission: (mission: Omit<Mission, 'id'>) => void
  updateMission: (id: string, updates: Partial<Mission>) => void
  deleteMission: (id: string) => void
  
  addGoal: (goal: Omit<LegacyGoal, 'id'>) => void
  updateGoal: (id: string, updates: Partial<LegacyGoal>) => void
  deleteGoal: (id: string) => void
}

const mockMissions: Mission[] = [
  {
    id: '1',
    title: 'Personal Mission',
    statement: 'To live authentically, continuously learn and grow, and positively impact the lives of those around me through kindness, mentorship, and meaningful relationships.',
    category: 'personal',
    lastUpdated: '2024-01-15'
  },
  {
    id: '2',
    title: 'Professional Mission',
    statement: 'To create innovative technology solutions that solve real-world problems while building and leading teams that foster creativity, inclusion, and professional growth.',
    category: 'professional',
    lastUpdated: '2024-01-20'
  }
]

const mockGoals: LegacyGoal[] = [
  {
    id: '1',
    title: 'Build Educational Platform',
    description: 'Create a platform that helps underprivileged students access quality education resources',
    timeframe: 'long-term',
    progress: 25,
    category: 'impact'
  },
  {
    id: '2',
    title: 'Mentor 10 Junior Developers',
    description: 'Provide guidance and support to help them advance their careers',
    timeframe: 'mid-term',
    progress: 40,
    category: 'professional'
  }
]

export const useLegacyStore = create<LegacyState>()(
  persist(
    (set) => ({
      missions: mockMissions,
      goals: mockGoals,
      
      addMission: (mission) => {
        const newMission = {
          ...mission,
          id: Math.random().toString(36).substr(2, 9)
        }
        set((state) => ({
          missions: [...state.missions, newMission]
        }))
      },
      
      updateMission: (id, updates) => {
        set((state) => ({
          missions: state.missions.map(mission =>
            mission.id === id ? { ...mission, ...updates } : mission
          )
        }))
      },
      
      deleteMission: (id) => {
        set((state) => ({
          missions: state.missions.filter(mission => mission.id !== id)
        }))
      },
      
      addGoal: (goal) => {
        const newGoal = {
          ...goal,
          id: Math.random().toString(36).substr(2, 9)
        }
        set((state) => ({
          goals: [...state.goals, newGoal]
        }))
      },
      
      updateGoal: (id, updates) => {
        set((state) => ({
          goals: state.goals.map(goal =>
            goal.id === id ? { ...goal, ...updates } : goal
          )
        }))
      },
      
      deleteGoal: (id) => {
        set((state) => ({
          goals: state.goals.filter(goal => goal.id !== id)
        }))
      }
    }),
    {
      name: 'legacy-builder-storage'
    }
  )
)