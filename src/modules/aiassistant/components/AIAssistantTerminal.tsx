import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Sparkles, Terminal, Shield, Settings, Activity, Bot, User } from 'lucide-react'
import { useAppStore } from '../../../lib/store'
import { getInitials, getAvatarGradient } from '../../../lib/utils'
import logo from '../../../assets/logo.png'

export function AIAssistantTerminal() {
  const { user } = useAppStore()
  const [message, setMessage] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [messages, setMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      setIsProcessing(true)
      
      // Add user message
      const userMessage = { role: 'user' as const, content: message }
      setMessages(prev => [...prev, userMessage])
      
      console.log('Processing system command:', message)
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Add AI response
      const responses = [
        "System status: All modules operational. Performance optimal.",
        "Module manager accessed. 12 modules available for configuration.",
        "Security scan completed. No threats detected. System secure.",
        "Terminal access granted. Ready for advanced commands.",
        "I can help you manage your personal civilization system. What would you like to optimize today?"
      ]
      
      const aiResponse = { 
        role: 'assistant' as const, 
        content: responses[Math.floor(Math.random() * responses.length)]
      }
      setMessages(prev => [...prev, aiResponse])
      
      setMessage('')
      setIsProcessing(false)
    }
  }

  const quickCommands = [
    { label: 'System Status', command: 'show system status', icon: Activity },
    { label: 'Module Manager', command: 'open module manager', icon: Settings },
    { label: 'Security Check', command: 'run security scan', icon: Shield },
    { label: 'Terminal', command: 'open terminal', icon: Terminal }
  ]

  // Generate user avatar
  const userInitials = getInitials(user?.name || 'User')
  const userGradient = getAvatarGradient(user?.name || 'User')

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Galyarder Architect Intelligent Section */}
      <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-6 shadow-2xl">
        <div className="flex items-center space-x-3 mb-4">
          <img src={logo} alt="GalyarderOS Logo" className="w-8 h-8" />
          <h3 className="text-xl font-medium text-white">Galyarder Architect Intelligent</h3>
        </div>

        <div className="mb-6 p-4 bg-slate-700/40 rounded-lg border border-slate-600/30">
          <p className="text-slate-300 leading-relaxed">
            👋 Hello! I am Galyarder, your AI Assistant. Ready to help with anything 
            on your OS—just type your question or request!
          </p>
        </div>

        {/* Chat Messages */}
        <div className="mb-6 max-h-64 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="text-center py-8">
              <Sparkles className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-400">Start a conversation with your AI assistant</p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-start space-x-3 ${
                    msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}
                >
                  <div className={`p-2 rounded-lg ${
                    msg.role === 'user' 
                      ? 'bg-blue-600' 
                      : 'bg-slate-700'
                  }`}>
                    {msg.role === 'user' ? (
                      user?.avatar ? (
                        <img src={user.avatar} alt="User" className="w-4 h-4 rounded-full object-cover" />
                      ) : (
                        <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${userGradient} flex items-center justify-center`}>
                          <span className="text-white text-xs font-bold">{userInitials}</span>
                        </div>
                      )
                    ) : (
                      <Bot className="w-4 h-4 text-white" />
                    )}
                  </div>
                  
                  <div className={`flex-1 p-3 rounded-lg ${
                    msg.role === 'user'
                      ? 'bg-blue-600/20 text-blue-100'
                      : 'bg-slate-800/50 text-slate-200'
                  }`}>
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </motion.div>
              ))}
              
              {isProcessing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-start space-x-3"
                >
                  <div className="p-2 bg-slate-700 rounded-lg">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 p-3 bg-slate-800/50 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </div>

        {/* Quick Command Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {quickCommands.map((cmd, index) => (
            <motion.button
              key={cmd.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              onClick={() => setMessage(cmd.command)}
              className="flex items-center space-x-2 p-3 bg-slate-700/30 hover:bg-slate-600/40 border border-slate-600/30 rounded-lg transition-all duration-200 group"
            >
              <cmd.icon className="w-4 h-4 text-slate-400 group-hover:text-white" />
              <span className="text-sm text-slate-300 group-hover:text-white">{cmd.label}</span>
            </motion.button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your question or ask for help..."
              className="w-full px-4 py-3 bg-slate-800/60 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              disabled={isProcessing}
            />
            <button
              type="submit"
              disabled={!message.trim() || isProcessing}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1.5 bg-purple-600 hover:bg-purple-500 disabled:bg-slate-700 disabled:cursor-not-allowed rounded-md transition-colors"
            >
              {isProcessing ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Send className="w-4 h-4 text-white" />
              )}
            </button>
          </div>
          
          <div className="flex items-center justify-between text-xs">
            <p className="text-slate-500">
              Galyarder can answer questions, provide tips, or control OS modules!
            </p>
            {isProcessing && (
              <span className="text-purple-400 animate-pulse">Processing...</span>
            )}
          </div>
        </form>

        {/* System Capabilities */}
        <div className="mt-6 pt-6 border-t border-slate-600/30">
          <h4 className="text-sm font-medium text-slate-300 mb-3">System Capabilities</h4>
          <div className="grid grid-cols-2 gap-2 text-xs text-slate-400">
            <div className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
              <span>System Management</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
              <span>Module Control</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
              <span>Security Operations</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-amber-400 rounded-full"></div>
              <span>Performance Monitoring</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}