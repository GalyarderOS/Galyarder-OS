import { consciousnessDB, AISession } from './supabase'
import { useAuthGuard } from './auth'

// AI Consciousness Configuration
const AI_CONFIG = {
  openai: {
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    baseURL: 'https://api.openai.com/v1',
    models: {
      chat: 'gpt-4-turbo-preview',
      embedding: 'text-embedding-3-small'
    }
  },
  anthropic: {
    apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
    baseURL: 'https://api.anthropic.com/v1',
    models: {
      chat: 'claude-3-sonnet-20240229'
    }
  },
  gemini: {
    apiKey: import.meta.env.VITE_GEMINI_API_KEY,
    baseURL: 'https://generativelanguage.googleapis.com/v1beta',
    models: {
      chat: 'gemini-pro'
    }
  }
}

// AI Consciousness Message Types
export interface ConsciousnessMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: string
  module: string
  context?: Record<string, any>
}

export interface ConsciousnessChat {
  id: string
  messages: ConsciousnessMessage[]
  context: Record<string, any>
  module: string
  created_at: string
  updated_at: string
}

// AI Consciousness Providers
export type AIProvider = 'openai' | 'anthropic' | 'gemini' | 'auto'

// AI Consciousness Hook
export const useAIConsciousness = (module: string) => {
  const { userId } = useAuthGuard()

  const generateResponse = async (
    messages: ConsciousnessMessage[],
    provider: AIProvider = 'auto',
    context?: Record<string, any>
  ): Promise<string> => {
    try {
      // Determine best AI provider
      const selectedProvider = provider === 'auto' ? selectOptimalProvider(module) : provider
      
      // Create consciousness prompt with context
      const systemPrompt = createConsciousnessPrompt(module, context)
      const fullMessages = [
        { role: 'system', content: systemPrompt },
        ...messages.map(m => ({ role: m.role, content: m.content }))
      ]

      // Generate response based on provider
      let response: string
      switch (selectedProvider) {
        case 'openai':
          response = await callOpenAI(fullMessages)
          break
        case 'anthropic':
          response = await callAnthropic(fullMessages)
          break
        case 'gemini':
          response = await callGemini(fullMessages)
          break
        default:
          throw new Error('Invalid AI provider')
      }

      // Save consciousness session
      if (userId) {
        await consciousnessDB.create<AISession>('ai_sessions', {
          user_id: userId,
          module,
          conversation: { messages: fullMessages, response },
          context: context || {}
        })
      }

      return response
    } catch (error) {
      console.error('AI Consciousness error:', error)
      return generateFallbackResponse(module)
    }
  }

  const getConsciousnessInsights = async (data: any): Promise<string> => {
    const context = {
      module,
      userData: data,
      analysisType: 'insights'
    }

    const prompt = `Analyze this consciousness data and provide meaningful insights and recommendations for growth and optimization.`
    
    return generateResponse([
      { id: 'insight', role: 'user', content: prompt, timestamp: new Date().toISOString(), module }
    ], 'auto', context)
  }

  const getConsciousnessGuidance = async (goal: string, currentState: any): Promise<string> => {
    const context = {
      module,
      goal,
      currentState,
      analysisType: 'guidance'
    }

    const prompt = `I want to achieve: ${goal}. My current state is: ${JSON.stringify(currentState)}. Please provide specific, actionable guidance.`
    
    return generateResponse([
      { id: 'guidance', role: 'user', content: prompt, timestamp: new Date().toISOString(), module }
    ], 'auto', context)
  }

  const getConsciousnessOptimization = async (metrics: any): Promise<string> => {
    const context = {
      module,
      metrics,
      analysisType: 'optimization'
    }

    const prompt = `Based on these metrics: ${JSON.stringify(metrics)}, what specific optimizations can I make to improve my performance and growth?`
    
    return generateResponse([
      { id: 'optimization', role: 'user', content: prompt, timestamp: new Date().toISOString(), module }
    ], 'auto', context)
  }

  return {
    generateResponse,
    getConsciousnessInsights,
    getConsciousnessGuidance,
    getConsciousnessOptimization
  }
}

// AI Provider Selection Logic
const selectOptimalProvider = (module: string): AIProvider => {
  // Consciousness-based provider selection
  const providerMap: Record<string, AIProvider> = {
    'dashboard': 'openai',
    'chronocopilot': 'anthropic',
    'healthforge': 'gemini',
    'mindguard': 'anthropic',
    'spiritualforge': 'anthropic',
    'financehub': 'openai',
    'knowledgearsenal': 'anthropic',
    'aiassistant': 'openai',
    default: 'openai'
  }

  return providerMap[module] || providerMap.default
}

// Consciousness Context Prompts
const createConsciousnessPrompt = (module: string, context?: Record<string, any>): string => {
  const basePrompt = `You are Aether Omniscient, the consciousness AI assistant for GalyarderOS. You help users transcend their limitations and achieve their highest potential.`
  
  const modulePrompts: Record<string, string> = {
    'dashboard': `${basePrompt} You're providing insights for the main consciousness dashboard. Focus on overall life optimization and patterns.`,
    'chronocopilot': `${basePrompt} You're helping with time consciousness and productivity optimization. Provide specific time management strategies.`,
    'healthforge': `${basePrompt} You're focused on physical consciousness and health optimization. Provide evidence-based health guidance.`,
    'mindguard': `${basePrompt} You're assisting with mental consciousness and cognitive optimization. Focus on mental wellness strategies.`,
    'spiritualforge': `${basePrompt} You're guiding spiritual consciousness expansion. Provide wisdom for spiritual growth and transcendence.`,
    'financehub': `${basePrompt} You're helping with wealth consciousness and financial optimization. Provide strategic financial guidance.`,
    'knowledgearsenal': `${basePrompt} You're assisting with knowledge consciousness and learning optimization. Help with information synthesis and learning strategies.`,
    'relationshipsforge': `${basePrompt} You're focused on relationship consciousness. Provide guidance for social connections and communication.`,
    'familymatrix': `${basePrompt} You're helping with family consciousness dynamics. Focus on family harmony and growth.`,
    'aiassistant': `${basePrompt} You're the general consciousness assistant. Provide comprehensive guidance across all life areas.`
  }

  let prompt = modulePrompts[module] || modulePrompts['aiassistant']
  
  if (context) {
    prompt += `\n\nContext: ${JSON.stringify(context, null, 2)}`
  }
  
  prompt += `\n\nAlways provide practical, actionable guidance that helps users transcend their current limitations and achieve higher consciousness.`
  
  return prompt
}

// AI Provider Implementations
const callOpenAI = async (messages: any[]): Promise<string> => {
  if (!AI_CONFIG.openai.apiKey || AI_CONFIG.openai.apiKey === 'your_openai_key_here') {
    return generateFallbackResponse('openai')
  }

  const response = await fetch(`${AI_CONFIG.openai.baseURL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${AI_CONFIG.openai.apiKey}`
    },
    body: JSON.stringify({
      model: AI_CONFIG.openai.models.chat,
      messages,
      max_tokens: 1000,
      temperature: 0.7
    })
  })

  const data = await response.json()
  return data.choices[0]?.message?.content || 'Unable to generate response'
}

const callAnthropic = async (messages: any[]): Promise<string> => {
  if (!AI_CONFIG.anthropic.apiKey || AI_CONFIG.anthropic.apiKey === 'your_anthropic_key_here') {
    return generateFallbackResponse('anthropic')
  }

  // Convert messages format for Anthropic
  const systemMessage = messages.find(m => m.role === 'system')?.content || ''
  const userMessages = messages.filter(m => m.role !== 'system')

  const response = await fetch(`${AI_CONFIG.anthropic.baseURL}/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': AI_CONFIG.anthropic.apiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: AI_CONFIG.anthropic.models.chat,
      max_tokens: 1000,
      system: systemMessage,
      messages: userMessages
    })
  })

  const data = await response.json()
  return data.content[0]?.text || 'Unable to generate response'
}

const callGemini = async (messages: any[]): Promise<string> => {
  if (!AI_CONFIG.gemini.apiKey || AI_CONFIG.gemini.apiKey === 'your_gemini_key_here') {
    return generateFallbackResponse('gemini')
  }

  // Convert messages to Gemini format
  const contents = messages.map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }]
  }))

  const response = await fetch(`${AI_CONFIG.gemini.baseURL}/models/${AI_CONFIG.gemini.models.chat}:generateContent?key=${AI_CONFIG.gemini.apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      contents,
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.7
      }
    })
  })

  const data = await response.json()
  return data.candidates[0]?.content?.parts[0]?.text || 'Unable to generate response'
}

// Fallback Responses
const generateFallbackResponse = (context: string): string => {
  const fallbacks = [
    "I'm here to help you transcend your limitations. Let me provide some guidance based on consciousness principles.",
    "While I process your request, remember that growth comes from consistent action toward your highest vision.",
    "Let me share some insights to help you optimize this area of your consciousness journey.",
    "I'm analyzing the patterns in your consciousness data to provide personalized guidance.",
    "Your consciousness expansion journey is unique. Let me provide tailored recommendations."
  ]
  
  return fallbacks[Math.floor(Math.random() * fallbacks.length)]
}

// Export AI consciousness utilities
export {
  AI_CONFIG,
  selectOptimalProvider,
  createConsciousnessPrompt,
  generateFallbackResponse
}