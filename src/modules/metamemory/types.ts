export interface ActionLog {
  id: string
  timestamp: string
  module: string
  action: string
  details: string
  context: Record<string, any>
  impact: 'low' | 'medium' | 'high'
  tags: string[]
}

export interface MemorySnapshot {
  id: string
  date: string
  type: 'daily' | 'weekly' | 'monthly' | 'milestone'
  title: string
  summary: string
  keyMetrics: Record<string, number>
  insights: string[]
  achievements: string[]
  challenges: string[]
  nextActions: string[]
  mood: number
  energy: number
  satisfaction: number
}

export interface Insight {
  id: string
  type: 'pattern' | 'correlation'
  title: string
  description: string
  source: {
    modules: string[]
    timeframe: string
  }
  confidence: number
  actionable: boolean
  actions?: string[]
  createdAt: string
  tags: string[]
  isStarred: boolean
}

export interface MetaMemoryState {
  actionLogs: ActionLog[]
  snapshots: MemorySnapshot[]
  insights: Insight[]
  
  // Action log actions
  addActionLog: (log: Omit<ActionLog, 'id' | 'timestamp'>) => void
  deleteActionLog: (id: string) => void
  
  // Snapshot actions
  addSnapshot: (snapshot: Omit<MemorySnapshot, 'id'>) => void
  updateSnapshot: (id: string, updates: Partial<MemorySnapshot>) => void
  deleteSnapshot: (id: string) => void
  
  // Insight actions
  addInsight: (insight: Omit<Insight, 'id' | 'createdAt'>) => void
  updateInsight: (id: string, updates: Partial<Insight>) => void
  deleteInsight: (id: string) => void
  toggleStarInsight: (id: string) => void
  
  // Query actions
  getActionLogsByModule: (module: string) => ActionLog[]
  getActionLogsByTimeframe: (startDate: string, endDate: string) => ActionLog[]
  getSnapshotsByType: (type: MemorySnapshot['type']) => MemorySnapshot[]
  getInsightsByTags: (tags: string[]) => Insight[]
}