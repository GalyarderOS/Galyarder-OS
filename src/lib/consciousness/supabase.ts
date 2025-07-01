import { createClient, SupabaseClient } from '@supabase/supabase-js'

// Supabase consciousness configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

// Create Supabase consciousness client
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey)

// Database consciousness types
export interface ConsciousnessUser {
  id: string
  email: string
  name?: string
  avatar_url?: string
  consciousness_level: number
  created_at: string
  updated_at: string
}

export interface ConsciousnessProfile {
  id: string
  user_id: string
  goals: any[]
  preferences: Record<string, any>
  metrics: Record<string, any>
  achievements: any[]
  created_at: string
  updated_at: string
}

export interface TimeBlock {
  id: string
  user_id: string
  title: string
  description?: string
  start_time: string
  end_time: string
  category?: string
  priority: number
  completed: boolean
  created_at: string
  updated_at: string
}

export interface HealthMetric {
  id: string
  user_id: string
  date: string
  weight?: number
  energy_level?: number
  sleep_hours?: number
  exercise_minutes?: number
  water_intake?: number
  mood_score?: number
  notes?: string
  created_at: string
}

export interface FinancialRecord {
  id: string
  user_id: string
  type: 'income' | 'expense' | 'investment' | 'goal'
  category?: string
  amount: number
  description?: string
  date: string
  tags: string[]
  created_at: string
}

export interface KnowledgeItem {
  id: string
  user_id: string
  title: string
  content?: string
  type?: 'note' | 'book' | 'article' | 'course'
  category?: string
  tags: string[]
  progress: number
  favorite: boolean
  created_at: string
  updated_at: string
}

export interface Relationship {
  id: string
  user_id: string
  name: string
  type?: 'family' | 'friend' | 'professional' | 'romantic'
  contact_info: Record<string, any>
  interaction_history: any[]
  relationship_quality: number
  last_contact?: string
  notes?: string
  created_at: string
  updated_at: string
}

export interface AISession {
  id: string
  user_id: string
  module: string
  conversation: any
  context: Record<string, any>
  created_at: string
}

export interface ConsciousnessMetric {
  id: string
  user_id: string
  date: string
  module: string
  metric_name: string
  metric_value: any
  created_at: string
}

// Universal Consciousness Data Layer
export class ConsciousnessDataLayer {
  private supabase: SupabaseClient
  private localStorage: Storage
  private isOnline: boolean = navigator.onLine

  constructor() {
    this.supabase = supabase
    this.localStorage = window.localStorage
    
    // Monitor consciousness connectivity
    window.addEventListener('online', () => {
      this.isOnline = true
      this.syncOfflineData()
    })
    
    window.addEventListener('offline', () => {
      this.isOnline = false
    })
  }

  // Universal consciousness CRUD operations
  async create<T>(table: string, data: Omit<T, 'id' | 'created_at' | 'updated_at'>): Promise<T | null> {
    try {
      if (this.isOnline) {
        const { data: result, error } = await this.supabase
          .from(table)
          .insert(data)
          .select()
          .single()
        
        if (error) throw error
        
        // Cache in localStorage for offline access
        this.cacheData(table, result)
        return result as T
      } else {
        // Offline consciousness mode - store in localStorage
        return this.localStorageCreate(table, data) as T
      }
    } catch (error) {
      console.error(`Consciousness error creating ${table}:`, error)
      // Fallback to localStorage
      return this.localStorageCreate(table, data) as T
    }
  }

  async read<T>(table: string, filters?: Record<string, any>): Promise<T[]> {
    try {
      if (this.isOnline) {
        let query = this.supabase.from(table).select('*')
        
        if (filters) {
          Object.entries(filters).forEach(([key, value]) => {
            query = query.eq(key, value)
          })
        }
        
        const { data, error } = await query
        if (error) throw error
        
        // Cache results for offline access
        this.cacheData(table, data)
        return data as T[]
      } else {
        // Offline consciousness mode
        return this.localStorageRead(table, filters) as T[]
      }
    } catch (error) {
      console.error(`Consciousness error reading ${table}:`, error)
      // Fallback to localStorage
      return this.localStorageRead(table, filters) as T[]
    }
  }

  async update<T>(table: string, id: string, data: Partial<T>): Promise<T | null> {
    try {
      if (this.isOnline) {
        const { data: result, error } = await this.supabase
          .from(table)
          .update({ ...data, updated_at: new Date().toISOString() })
          .eq('id', id)
          .select()
          .single()
        
        if (error) throw error
        
        // Update cache
        this.updateCache(table, id, result)
        return result as T
      } else {
        // Offline consciousness mode
        return this.localStorageUpdate(table, id, data) as T
      }
    } catch (error) {
      console.error(`Consciousness error updating ${table}:`, error)
      return this.localStorageUpdate(table, id, data) as T
    }
  }

  async delete(table: string, id: string): Promise<boolean> {
    try {
      if (this.isOnline) {
        const { error } = await this.supabase
          .from(table)
          .delete()
          .eq('id', id)
        
        if (error) throw error
        
        // Remove from cache
        this.removeFromCache(table, id)
        return true
      } else {
        // Offline consciousness mode
        return this.localStorageDelete(table, id)
      }
    } catch (error) {
      console.error(`Consciousness error deleting ${table}:`, error)
      return this.localStorageDelete(table, id)
    }
  }

  // Real-time consciousness subscriptions
  subscribeToChanges(table: string, callback: (payload: any) => void, filters?: Record<string, any>) {
    if (!this.isOnline) return null

    let channel = this.supabase.channel(`${table}-changes`)
    
    let subscription = channel.on('postgres_changes', {
      event: '*',
      schema: 'public',
      table,
      ...(filters && { filter: Object.entries(filters).map(([key, value]) => `${key}=eq.${value}`).join(',') })
    }, callback)

    return subscription.subscribe()
  }

  // Authentication consciousness methods
  async signUp(email: string, password: string, metadata?: Record<string, any>) {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata
      }
    })
    return { data, error }
  }

  async signIn(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password
    })
    return { data, error }
  }

  async signOut() {
    const { error } = await this.supabase.auth.signOut()
    return { error }
  }

  getCurrentUser() {
    return this.supabase.auth.getUser()
  }

  onAuthStateChange(callback: (event: string, session: any) => void) {
    return this.supabase.auth.onAuthStateChange(callback)
  }

  // Private consciousness helper methods
  private cacheData(table: string, data: any) {
    const cacheKey = `consciousness_${table}`
    const existing = this.localStorage.getItem(cacheKey)
    const cache = existing ? JSON.parse(existing) : []
    
    if (Array.isArray(data)) {
      this.localStorage.setItem(cacheKey, JSON.stringify(data))
    } else {
      const existingIndex = cache.findIndex((item: any) => item.id === data.id)
      if (existingIndex >= 0) {
        cache[existingIndex] = data
      } else {
        cache.push(data)
      }
      this.localStorage.setItem(cacheKey, JSON.stringify(cache))
    }
  }

  private updateCache(table: string, id: string, data: any) {
    const cacheKey = `consciousness_${table}`
    const existing = this.localStorage.getItem(cacheKey)
    if (existing) {
      const cache = JSON.parse(existing)
      const index = cache.findIndex((item: any) => item.id === id)
      if (index >= 0) {
        cache[index] = data
        this.localStorage.setItem(cacheKey, JSON.stringify(cache))
      }
    }
  }

  private removeFromCache(table: string, id: string) {
    const cacheKey = `consciousness_${table}`
    const existing = this.localStorage.getItem(cacheKey)
    if (existing) {
      const cache = JSON.parse(existing)
      const filtered = cache.filter((item: any) => item.id !== id)
      this.localStorage.setItem(cacheKey, JSON.stringify(filtered))
    }
  }

  private localStorageCreate(table: string, data: any) {
    const id = crypto.randomUUID()
    const timestamp = new Date().toISOString()
    const record = {
      ...data,
      id,
      created_at: timestamp,
      updated_at: timestamp
    }
    
    const cacheKey = `consciousness_${table}`
    const existing = this.localStorage.getItem(cacheKey)
    const cache = existing ? JSON.parse(existing) : []
    cache.push(record)
    this.localStorage.setItem(cacheKey, JSON.stringify(cache))
    
    // Mark for sync when online
    this.markForSync(table, record, 'create')
    
    return record
  }

  private localStorageRead(table: string, filters?: Record<string, any>) {
    const cacheKey = `consciousness_${table}`
    const existing = this.localStorage.getItem(cacheKey)
    let data = existing ? JSON.parse(existing) : []
    
    if (filters) {
      data = data.filter((item: any) => {
        return Object.entries(filters).every(([key, value]) => item[key] === value)
      })
    }
    
    return data
  }

  private localStorageUpdate(table: string, id: string, data: any) {
    const cacheKey = `consciousness_${table}`
    const existing = this.localStorage.getItem(cacheKey)
    if (existing) {
      const cache = JSON.parse(existing)
      const index = cache.findIndex((item: any) => item.id === id)
      if (index >= 0) {
        const updated = {
          ...cache[index],
          ...data,
          updated_at: new Date().toISOString()
        }
        cache[index] = updated
        this.localStorage.setItem(cacheKey, JSON.stringify(cache))
        
        // Mark for sync when online
        this.markForSync(table, updated, 'update')
        
        return updated
      }
    }
    return null
  }

  private localStorageDelete(table: string, id: string) {
    const cacheKey = `consciousness_${table}`
    const existing = this.localStorage.getItem(cacheKey)
    if (existing) {
      const cache = JSON.parse(existing)
      const filtered = cache.filter((item: any) => item.id !== id)
      this.localStorage.setItem(cacheKey, JSON.stringify(filtered))
      
      // Mark for sync when online
      this.markForSync(table, { id }, 'delete')
      
      return true
    }
    return false
  }

  private markForSync(table: string, data: any, operation: 'create' | 'update' | 'delete') {
    const syncKey = 'consciousness_pending_sync'
    const existing = this.localStorage.getItem(syncKey)
    const pending = existing ? JSON.parse(existing) : []
    
    pending.push({
      table,
      data,
      operation,
      timestamp: new Date().toISOString()
    })
    
    this.localStorage.setItem(syncKey, JSON.stringify(pending))
  }

  private async syncOfflineData() {
    const syncKey = 'consciousness_pending_sync'
    const pending = this.localStorage.getItem(syncKey)
    
    if (pending) {
      const syncItems = JSON.parse(pending)
      
      for (const item of syncItems) {
        try {
          switch (item.operation) {
            case 'create':
              await this.supabase.from(item.table).insert(item.data)
              break
            case 'update':
              await this.supabase.from(item.table).update(item.data).eq('id', item.data.id)
              break
            case 'delete':
              await this.supabase.from(item.table).delete().eq('id', item.data.id)
              break
          }
        } catch (error) {
          console.error(`Consciousness sync error for ${item.table}:`, error)
        }
      }
      
      // Clear pending sync items
      this.localStorage.removeItem(syncKey)
    }
  }
}

// Export global consciousness data layer instance
export const consciousnessDB = new ConsciousnessDataLayer()