export interface WorldSignal {
  id: string
  title: string
  description: string
  source: string
  url?: string
  date: string
  category: 'economic' | 'geopolitical' | 'technological' | 'environmental' | 'social' | 'other'
  impact: 'low' | 'medium' | 'high' | 'critical'
  relevance: number
  regions: string[]
  tags: string[]
  notes?: string
  isVerified: boolean
  createdAt: string
}

export interface MacroTrend {
  id: string
  name: string
  description: string
  category: 'economic' | 'geopolitical' | 'technological' | 'environmental' | 'social' | 'other'
  timeframe: 'short-term' | 'mid-term' | 'long-term'
  impact: 'low' | 'medium' | 'high' | 'critical'
  direction: 'increasing' | 'decreasing' | 'stable' | 'volatile'
  confidence: number
  relatedSignals: string[]
  regions: string[]
  tags: string[]
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface StrategicImplication {
  id: string
  title: string
  description: string
  category: 'opportunity' | 'threat' | 'neutral'
  impact: 'low' | 'medium' | 'high' | 'critical'
  timeframe: 'immediate' | 'short-term' | 'mid-term' | 'long-term'
  relatedTrends: string[]
  actionItems: string[]
  status: 'identified' | 'analyzing' | 'actioning' | 'monitoring'
  createdAt: string
  updatedAt: string
}

export interface WorldIntelligenceState {
  signals: WorldSignal[]
  trends: MacroTrend[]
  implications: StrategicImplication[]
  
  // Signal actions
  addSignal: (signal: Omit<WorldSignal, 'id' | 'createdAt'>) => void
  updateSignal: (id: string, updates: Partial<WorldSignal>) => void
  deleteSignal: (id: string) => void
  verifySignal: (id: string) => void
  
  // Trend actions
  addTrend: (trend: Omit<MacroTrend, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateTrend: (id: string, updates: Partial<MacroTrend>) => void
  deleteTrend: (id: string) => void
  
  // Implication actions
  addImplication: (implication: Omit<StrategicImplication, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateImplication: (id: string, updates: Partial<StrategicImplication>) => void
  deleteImplication: (id: string) => void
  
  // Utility actions
  getSignalsByCategory: (category: WorldSignal['category']) => WorldSignal[]
  getTrendsByTimeframe: (timeframe: MacroTrend['timeframe']) => MacroTrend[]
  getImplicationsByImpact: (impact: StrategicImplication['impact']) => StrategicImplication[]
  getRecentSignals: (days: number) => WorldSignal[]
}