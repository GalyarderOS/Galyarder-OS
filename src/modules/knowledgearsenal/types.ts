export interface LearningGoal {
  id: string
  title: string
  description: string
  category: 'technical' | 'personal' | 'professional' | 'creative'
  targetDate: string
  progress: number
  status: 'active' | 'completed' | 'paused'
  priority: 'low' | 'medium' | 'high'
  createdAt: string
}

export interface Book {
  id: string
  title: string
  author: string
  category: string
  status: 'reading' | 'completed' | 'wishlist' | 'abandoned'
  progress: number
  rating?: number
  notes: string
  startDate?: string
  completedDate?: string
  totalPages?: number
  currentPage?: number
}

export interface Skill {
  id: string
  name: string
  category: string
  level: number
  targetLevel: number
  lastPracticed: string
  totalHours: number
  resources: string[]
  milestones: SkillMilestone[]
}

export interface SkillMilestone {
  id: string
  title: string
  description: string
  completed: boolean
  completedDate?: string
}

export interface StudySession {
  id: string
  subject: string
  duration: number
  date: string
  notes: string
  effectiveness: number
  type: 'reading' | 'practice' | 'video' | 'course' | 'other'
}

export interface KnowledgeState {
  learningGoals: LearningGoal[]
  books: Book[]
  skills: Skill[]
  studySessions: StudySession[]
  
  // Actions
  addLearningGoal: (goal: Omit<LearningGoal, 'id' | 'createdAt'>) => void
  updateLearningGoal: (id: string, updates: Partial<LearningGoal>) => void
  deleteLearningGoal: (id: string) => void
  
  addBook: (book: Omit<Book, 'id'>) => void
  updateBook: (id: string, updates: Partial<Book>) => void
  deleteBook: (id: string) => void
  
  addSkill: (skill: Omit<Skill, 'id'>) => void
  updateSkill: (id: string, updates: Partial<Skill>) => void
  deleteSkill: (id: string) => void
  
  addStudySession: (session: Omit<StudySession, 'id'>) => void
  updateStudySession: (id: string, updates: Partial<StudySession>) => void
  deleteStudySession: (id: string) => void
}