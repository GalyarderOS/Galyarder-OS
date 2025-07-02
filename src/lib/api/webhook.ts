// N8N Webhook Integration for AI Assistant
import { getThemeClasses } from '../theme'

export interface WebhookConfig {
  baseUrl: string
  endpoints: {
    chat: string
    consciousness: string
    analytics: string
    userSync: string
  }
  timeout: number
}

export interface ChatMessage {
  id?: string
  content: string
  role: 'user' | 'assistant' | 'system'
  timestamp: number
  metadata?: Record<string, any>
}

export interface ConsciousnessData {
  userId: string
  level: number
  modules: Record<string, any>
  insights: string[]
  recommendations: string[]
}

export interface WebhookResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  timestamp: number
}

// Default webhook configuration - will be filled by user
const defaultConfig: WebhookConfig = {
  baseUrl: '', // User will set this to their n8n instance
  endpoints: {
    chat: '/webhook/ai-chat',
    consciousness: '/webhook/consciousness-sync',
    analytics: '/webhook/analytics',
    userSync: '/webhook/user-sync'
  },
  timeout: 30000 // 30 seconds
}

class WebhookService {
  private config: WebhookConfig = defaultConfig
  private retryAttempts = 3
  private retryDelay = 1000

  setConfig(config: Partial<WebhookConfig>) {
    this.config = { ...this.config, ...config }
  }

  getConfig(): WebhookConfig {
    return this.config
  }

  private async makeRequest<T>(
    endpoint: string, 
    data: any, 
    options: RequestInit = {}
  ): Promise<WebhookResponse<T>> {
    const url = `${this.config.baseUrl}${endpoint}`
    
    if (!this.config.baseUrl) {
      return {
        success: false,
        error: 'Webhook base URL not configured',
        timestamp: Date.now()
      }
    }

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), this.config.timeout)

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        body: JSON.stringify({
          ...data,
          timestamp: Date.now(),
          source: 'galyarderos-pwa'
        }),
        signal: controller.signal,
        ...options
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const result = await response.json()
      
      return {
        success: true,
        data: result,
        timestamp: Date.now()
      }
    } catch (error) {
      clearTimeout(timeoutId)
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: Date.now()
      }
    }
  }

  private async retryRequest<T>(
    endpoint: string,
    data: any,
    options: RequestInit = {}
  ): Promise<WebhookResponse<T>> {
    let lastError: string = ''

    for (let attempt = 1; attempt <= this.retryAttempts; attempt++) {
      const result = await this.makeRequest<T>(endpoint, data, options)
      
      if (result.success) {
        return result
      }
      
      lastError = result.error || 'Unknown error'
      
      if (attempt < this.retryAttempts) {
        await new Promise(resolve => setTimeout(resolve, this.retryDelay * attempt))
      }
    }

    return {
      success: false,
      error: `Failed after ${this.retryAttempts} attempts: ${lastError}`,
      timestamp: Date.now()
    }
  }

  // AI Chat Integration
  async sendChatMessage(
    message: ChatMessage,
    context?: {
      userId?: string
      sessionId?: string
      consciousnessLevel?: number
      preferences?: Record<string, any>
    }
  ): Promise<WebhookResponse<{ response: string; suggestions?: string[] }>> {
    return this.retryRequest(this.config.endpoints.chat, {
      message,
      context: {
        ...context,
        theme: getThemeClasses(),
        userAgent: navigator.userAgent,
        language: navigator.language
      }
    })
  }

  // Consciousness Data Sync
  async syncConsciousness(data: ConsciousnessData): Promise<WebhookResponse<ConsciousnessData>> {
    return this.retryRequest(this.config.endpoints.consciousness, {
      consciousnessData: data,
      deviceInfo: {
        userAgent: navigator.userAgent,
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      }
    })
  }

  // Analytics Integration
  async sendAnalytics(
    event: string,
    data: Record<string, any>
  ): Promise<WebhookResponse<{ received: boolean }>> {
    return this.retryRequest(this.config.endpoints.analytics, {
      event,
      data,
      metadata: {
        url: window.location.href,
        referrer: document.referrer,
        timestamp: Date.now()
      }
    })
  }

  // User Data Sync
  async syncUserData(
    userData: Record<string, any>
  ): Promise<WebhookResponse<{ synced: boolean }>> {
    return this.retryRequest(this.config.endpoints.userSync, {
      userData,
      device: {
        userAgent: navigator.userAgent,
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      }
    })
  }

  // Health Check
  async healthCheck(): Promise<WebhookResponse<{ status: string; version?: string }>> {
    return this.makeRequest('/webhook/health', {
      source: 'galyarderos-pwa',
      timestamp: Date.now()
    })
  }

  // Test Connection
  async testConnection(): Promise<boolean> {
    if (!this.config.baseUrl) return false
    
    try {
      const result = await this.healthCheck()
      return result.success
    } catch {
      return false
    }
  }
}

// Singleton instance
export const webhookService = new WebhookService()

// Hook for React components
export function useWebhookConfig() {
  const setConfig = (config: Partial<WebhookConfig>) => {
    webhookService.setConfig(config)
  }

  const getConfig = () => webhookService.getConfig()
  
  const testConnection = () => webhookService.testConnection()

  return {
    setConfig,
    getConfig,
    testConnection,
    service: webhookService
  }
}