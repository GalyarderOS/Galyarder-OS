import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Bot, User, Settings, RefreshCw } from 'lucide-react'
import { getThemeClasses } from '@/lib/theme'
import { useWebhookConfig, ChatMessage } from '@/lib/api/webhook'
import { useAppStore } from '@/lib/store'
import { generateId, createTimestamp, sanitizeUserInput } from '@/lib/database/schema'
import { cn } from '@/lib/utils'

interface AIChatProps {
  className?: string
  placeholder?: string
  maxHeight?: string
}

export function AIChat({ 
  className,
  placeholder = "Ask me anything about your personal development...",
  maxHeight = "600px"
}: AIChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isConfiguring, setIsConfiguring] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  
  const { colors, glass } = getThemeClasses()
  const { user } = useAppStore()
  const { service: webhookService, getConfig, testConnection } = useWebhookConfig()

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    // Add welcome message if no config
    if (!getConfig().baseUrl && messages.length === 0) {
      setMessages([{
        id: generateId(),
        content: "Welcome to GalyarderOS AI Assistant! To get started, please configure your n8n webhook URL in the settings.",
        role: 'system',
        timestamp: Date.now()
      }])
    }
  }, [getConfig, messages.length])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || isLoading) return

    const sanitizedInput = sanitizeUserInput(inputValue.trim())
    const userMessage: ChatMessage = {
      id: generateId(),
      content: sanitizedInput,
      role: 'user',
      timestamp: Date.now()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    try {
      // Check if webhook is configured
      const config = getConfig()
      if (!config.baseUrl) {
        const errorMessage: ChatMessage = {
          id: generateId(),
          content: "Please configure your n8n webhook URL first. Click the settings button to get started.",
          role: 'system',
          timestamp: Date.now()
        }
        setMessages(prev => [...prev, errorMessage])
        setIsLoading(false)
        return
      }

             // Send to webhook
       const response = await webhookService.sendChatMessage(userMessage, {
         userId: user?.id,
         consciousnessLevel: 0, // Will be calculated by backend
         preferences: {} // Will be populated when user sets preferences
       })

      if (response.success && response.data) {
        const assistantMessage: ChatMessage = {
          id: generateId(),
          content: response.data.response,
          role: 'assistant',
          timestamp: Date.now(),
          metadata: {
            response_time: Date.now() - userMessage.timestamp,
            suggestions: response.data.suggestions
          }
        }
        setMessages(prev => [...prev, assistantMessage])
      } else {
        const errorMessage: ChatMessage = {
          id: generateId(),
          content: `Sorry, I encountered an error: ${response.error || 'Unknown error'}. Please check your webhook configuration.`,
          role: 'system',
          timestamp: Date.now()
        }
        setMessages(prev => [...prev, errorMessage])
      }
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: generateId(),
        content: `Connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        role: 'system',
        timestamp: Date.now()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getMessageIcon = (role: ChatMessage['role']) => {
    switch (role) {
      case 'user': return <User className="w-4 h-4" />
      case 'assistant': return <Bot className="w-4 h-4" />
      case 'system': return <Settings className="w-4 h-4" />
    }
  }

  const getMessageStyle = (role: ChatMessage['role']) => {
    switch (role) {
      case 'user':
        return {
          backgroundColor: colors.consciousness.primary,
          color: colors.text.inverse,
          alignSelf: 'flex-end',
          marginLeft: '20%'
        }
      case 'assistant':
        return {
          backgroundColor: colors.bg.elevated,
          color: colors.text.primary,
          alignSelf: 'flex-start',
          marginRight: '20%'
        }
      case 'system':
        return {
          backgroundColor: `${colors.status.warning}20`,
          color: colors.status.warning,
          alignSelf: 'center',
          marginLeft: '10%',
          marginRight: '10%'
        }
    }
  }

  return (
    <div 
      className={cn(
        "flex flex-col border rounded-xl overflow-hidden",
        glass,
        className
      )}
      style={{
        backgroundColor: colors.bg.primary,
        borderColor: colors.border.primary,
        maxHeight
      }}
    >
      {/* Header */}
      <div 
        className="p-4 border-b flex items-center justify-between"
        style={{ borderColor: colors.border.primary }}
      >
        <div className="flex items-center gap-3">
          <div 
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: colors.consciousness.primary }}
          >
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 
              className="font-semibold"
              style={{ color: colors.text.primary }}
            >
              AI Assistant
            </h3>
            <p 
              className="text-xs"
              style={{ color: colors.text.tertiary }}
            >
              {getConfig().baseUrl ? 'Connected' : 'Not configured'}
            </p>
          </div>
        </div>
        
        <motion.button
          onClick={() => setIsConfiguring(!isConfiguring)}
          className="p-2 rounded-lg transition-colors"
          style={{
            color: colors.text.secondary,
            backgroundColor: 'transparent'
          }}
          whileHover={{ 
            backgroundColor: colors.bg.secondary,
            scale: 1.05 
          }}
          whileTap={{ scale: 0.95 }}
        >
          <Settings className="w-4 h-4" />
        </motion.button>
      </div>

      {/* Configuration Panel */}
      <AnimatePresence>
        {isConfiguring && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="p-4 border-b"
            style={{ 
              borderColor: colors.border.primary,
              backgroundColor: colors.bg.secondary 
            }}
          >
            <WebhookConfigForm onClose={() => setIsConfiguring(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Messages */}
      <div 
        className="flex-1 p-4 overflow-y-auto space-y-4"
        style={{ maxHeight: 'calc(100% - 140px)' }}
      >
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col"
              style={getMessageStyle(message.role)}
            >
              <div className="p-3 rounded-lg max-w-full">
                <div className="flex items-start gap-2 mb-2">
                  {getMessageIcon(message.role)}
                  <span className="text-xs opacity-70">
                    {formatTimestamp(message.timestamp)}
                  </span>
                </div>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {message.content}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-sm"
            style={{ color: colors.text.tertiary }}
          >
            <RefreshCw className="w-4 h-4 animate-spin" />
            AI is thinking...
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t" style={{ borderColor: colors.border.primary }}>
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={placeholder}
            disabled={isLoading}
            className="flex-1 px-4 py-2 border rounded-lg text-sm transition-colors focus:outline-none focus:ring-2"
            style={{
              backgroundColor: colors.bg.secondary,
              borderColor: colors.border.primary,
              color: colors.text.primary,
              '--tw-ring-color': colors.consciousness.primary
            } as React.CSSProperties}
          />
          <motion.button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className="px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 disabled:opacity-50"
            style={{
              backgroundColor: colors.consciousness.primary,
              color: colors.text.inverse
            }}
            whileHover={{ scale: inputValue.trim() ? 1.05 : 1 }}
            whileTap={{ scale: inputValue.trim() ? 0.95 : 1 }}
          >
            <Send className="w-4 h-4" />
          </motion.button>
        </div>
      </form>
    </div>
  )
}

// Webhook configuration form component
function WebhookConfigForm({ onClose }: { onClose: () => void }) {
  const [config, setConfig] = useState('')
  const [testing, setTesting] = useState(false)
  const [testResult, setTestResult] = useState<string | null>(null)
  
  const { colors } = getThemeClasses()
  const { setConfig: setWebhookConfig, getConfig, testConnection } = useWebhookConfig()

  useEffect(() => {
    setConfig(getConfig().baseUrl)
  }, [getConfig])

  const handleTest = async () => {
    if (!config.trim()) return
    
    setTesting(true)
    setTestResult(null)
    
    // Temporarily set config for testing
    setWebhookConfig({ baseUrl: config.trim() })
    
    const isConnected = await testConnection()
    setTestResult(isConnected ? 'Connected successfully!' : 'Connection failed. Please check your URL.')
    setTesting(false)
  }

  const handleSave = () => {
    setWebhookConfig({ baseUrl: config.trim() })
    setTestResult('Configuration saved!')
    setTimeout(onClose, 1000)
  }

  return (
    <div className="space-y-4">
      <div>
        <label 
          className="block text-sm font-medium mb-2"
          style={{ color: colors.text.primary }}
        >
          N8N Webhook Base URL
        </label>
        <input
          type="url"
          value={config}
          onChange={(e) => setConfig(e.target.value)}
          placeholder="https://your-n8n-instance.com"
          className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2"
          style={{
            backgroundColor: colors.bg.primary,
            borderColor: colors.border.primary,
            color: colors.text.primary,
            '--tw-ring-color': colors.consciousness.primary
          } as React.CSSProperties}
        />
      </div>
      
      {testResult && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm p-2 rounded"
          style={{
            backgroundColor: testResult.includes('success') ? `${colors.status.success}20` : `${colors.status.error}20`,
            color: testResult.includes('success') ? colors.status.success : colors.status.error
          }}
        >
          {testResult}
        </motion.div>
      )}
      
      <div className="flex gap-2">
        <motion.button
          type="button"
          onClick={handleTest}
          disabled={!config.trim() || testing}
          className="px-4 py-2 border rounded-lg text-sm transition-colors disabled:opacity-50"
          style={{
            borderColor: colors.border.primary,
            color: colors.text.secondary,
            backgroundColor: 'transparent'
          }}
          whileHover={{ backgroundColor: colors.bg.secondary }}
        >
          {testing ? 'Testing...' : 'Test Connection'}
        </motion.button>
        
        <motion.button
          type="button"
          onClick={handleSave}
          className="px-4 py-2 rounded-lg text-sm font-medium"
          style={{
            backgroundColor: colors.consciousness.primary,
            color: colors.text.inverse
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Save
        </motion.button>
      </div>
    </div>
  )
}