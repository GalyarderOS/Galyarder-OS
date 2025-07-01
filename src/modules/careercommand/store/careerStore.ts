import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Skill {
  id: string
  name: string
  level: number
  targetLevel: number
  category: string
  notes?: string
}

interface Income {
  id: string
  source: string
  amount: number
  frequency: 'weekly' | 'biweekly' | 'monthly' | 'yearly'
  type: 'salary' | 'freelance' | 'passive' | 'other'
  notes?: string
}

interface CareerState {
  skills: Skill[]
  incomes: Income[]
  
  addSkill: (skill: Omit<Skill, 'id'>) => void
  updateSkill: (id: string, updates: Partial<Skill>) => void
  deleteSkill: (id: string) => void
  
  addIncome: (income: Omit<Income, 'id'>) => void
  updateIncome: (id: string, updates: Partial<Income>) => void
  deleteIncome: (id: string) => void
}

const mockSkills: Skill[] = [
  {
    id: '1',
    name: 'React/TypeScript',
    level: 85,
    targetLevel: 95,
    category: 'Technical',
    notes: 'Focus on advanced patterns'
  },
  {
    id: '2',
    name: 'Leadership',
    level: 70,
    targetLevel: 85,
    category: 'Soft Skills',
    notes: 'Working on delegation and team motivation'
  }
]

const mockIncomes: Income[] = [
  {
    id: '1',
    source: 'Primary Job',
    amount: 5000,
    frequency: 'monthly',
    type: 'salary',
    notes: 'Software Engineer position'
  },
  {
    id: '2',
    source: 'Freelance Projects',
    amount: 1500,
    frequency: 'monthly',
    type: 'freelance',
    notes: 'Web development projects'
  }
]

export const useCareerStore = create<CareerState>()(
  persist(
    (set) => ({
      skills: mockSkills,
      incomes: mockIncomes,
      
      addSkill: (skill) => {
        const newSkill = {
          ...skill,
          id: Math.random().toString(36).substr(2, 9)
        }
        set((state) => ({
          skills: [...state.skills, newSkill]
        }))
      },
      
      updateSkill: (id, updates) => {
        set((state) => ({
          skills: state.skills.map(skill =>
            skill.id === id ? { ...skill, ...updates } : skill
          )
        }))
      },
      
      deleteSkill: (id) => {
        set((state) => ({
          skills: state.skills.filter(skill => skill.id !== id)
        }))
      },
      
      addIncome: (income) => {
        const newIncome = {
          ...income,
          id: Math.random().toString(36).substr(2, 9)
        }
        set((state) => ({
          incomes: [...state.incomes, newIncome]
        }))
      },
      
      updateIncome: (id, updates) => {
        set((state) => ({
          incomes: state.incomes.map(income =>
            income.id === id ? { ...income, ...updates } : income
          )
        }))
      },
      
      deleteIncome: (id) => {
        set((state) => ({
          incomes: state.incomes.filter(income => income.id !== id)
        }))
      }
    }),
    {
      name: 'career-command-storage'
    }
  )
)