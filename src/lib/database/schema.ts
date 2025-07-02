// Database Schema Definitions for Backend Integration

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  consciousness_level: number
  preferences: UserPreferences
  created_at: string
  updated_at: string
  last_active: string
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto'
  language: 'en' | 'id'
  accent_color: string
  notifications: boolean
  ai_personality: string
  privacy_level: 'public' | 'private' | 'friends'
}

export interface ChatSession {
  id: string
  user_id: string
  title: string
  messages: ChatMessage[]
  context: Record<string, any>
  created_at: string
  updated_at: string
  archived: boolean
}

export interface ChatMessage {
  id: string
  session_id: string
  content: string
  role: 'user' | 'assistant' | 'system'
  metadata: {
    consciousness_level?: number
    response_time?: number
    tokens_used?: number
    model_used?: string
    user_context?: Record<string, any>
  }
  timestamp: string
}

export interface ConsciousnessMetrics {
  id: string
  user_id: string
  level: number
  growth_rate: number
  insights: string[]
  recommendations: string[]
  modules_data: Record<string, any>
  calculated_at: string
}

export interface ActivityLog {
  id: string
  user_id: string
  action: string
  details: Record<string, any>
  timestamp: string
  session_id?: string
}

export interface UserStats {
  id: string
  user_id: string
  total_sessions: number
  total_messages: number
  avg_consciousness_level: number
  most_active_time: string
  preferred_ai_topics: string[]
  growth_metrics: Record<string, any>
  updated_at: string
}

// Database operations interface for backend
export interface DatabaseOperations {
  // User operations
  createUser(user: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<User>
  getUserById(id: string): Promise<User | null>
  getUserByEmail(email: string): Promise<User | null>
  updateUser(id: string, updates: Partial<User>): Promise<User>
  updateUserPreferences(id: string, preferences: Partial<UserPreferences>): Promise<User>
  
  // Chat operations
  createChatSession(session: Omit<ChatSession, 'id' | 'created_at' | 'updated_at'>): Promise<ChatSession>
  getChatSessions(userId: string, limit?: number): Promise<ChatSession[]>
  getChatSession(id: string): Promise<ChatSession | null>
  addChatMessage(message: Omit<ChatMessage, 'id' | 'timestamp'>): Promise<ChatMessage>
  updateChatSession(id: string, updates: Partial<ChatSession>): Promise<ChatSession>
  archiveChatSession(id: string): Promise<void>
  
  // Consciousness operations
  saveConsciousnessMetrics(metrics: Omit<ConsciousnessMetrics, 'id' | 'calculated_at'>): Promise<ConsciousnessMetrics>
  getLatestConsciousness(userId: string): Promise<ConsciousnessMetrics | null>
  getConsciousnessHistory(userId: string, days?: number): Promise<ConsciousnessMetrics[]>
  
  // Analytics operations
  logActivity(activity: Omit<ActivityLog, 'id' | 'timestamp'>): Promise<ActivityLog>
  getUserStats(userId: string): Promise<UserStats | null>
  updateUserStats(userId: string, stats: Partial<UserStats>): Promise<UserStats>
  
  // Utility operations
  cleanupOldData(days: number): Promise<void>
  healthCheck(): Promise<{ status: 'healthy' | 'degraded'; details: Record<string, any> }>
}

// Local storage keys for offline support
export const STORAGE_KEYS = {
  USER: 'galyarderos_user',
  CHAT_SESSIONS: 'galyarderos_chat_sessions',
  CONSCIOUSNESS: 'galyarderos_consciousness',
  PREFERENCES: 'galyarderos_preferences',
  PENDING_SYNC: 'galyarderos_pending_sync'
} as const

// Data validation schemas
export const ValidationRules = {
  user: {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    name: { minLength: 2, maxLength: 50 },
    consciousness_level: { min: 0, max: 100 }
  },
  chatMessage: {
    content: { minLength: 1, maxLength: 4000 },
    role: ['user', 'assistant', 'system']
  },
  preferences: {
    theme: ['light', 'dark', 'auto'],
    language: ['en', 'id'],
    privacy_level: ['public', 'private', 'friends']
  }
} as const

// Utility functions for data operations
export function validateUser(user: Partial<User>): boolean {
  if (user.email && !ValidationRules.user.email.test(user.email)) return false
  if (user.name && (user.name.length < ValidationRules.user.name.minLength || user.name.length > ValidationRules.user.name.maxLength)) return false
  if (user.consciousness_level !== undefined && (user.consciousness_level < ValidationRules.user.consciousness_level.min || user.consciousness_level > ValidationRules.user.consciousness_level.max)) return false
  return true
}

export function validateChatMessage(message: Partial<ChatMessage>): boolean {
  if (!message.content || message.content.length < ValidationRules.chatMessage.content.minLength || message.content.length > ValidationRules.chatMessage.content.maxLength) return false
  if (!message.role || !ValidationRules.chatMessage.role.includes(message.role)) return false
  return true
}

export function sanitizeUserInput(input: string): string {
  return input.trim().replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

export function createTimestamp(): string {
  return new Date().toISOString()
}