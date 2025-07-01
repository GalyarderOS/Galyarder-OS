import { useState } from 'react'
import { motion } from 'framer-motion'
import { Bot, Key, Check, X, RefreshCw, AlertTriangle, ExternalLink, Eye, EyeOff, Trash2 } from 'lucide-react'
import { useSettingsStore } from '../../../../lib/stores/useSettingsStore'

export function IntegrationSettings() {
  const { integrations, updateIntegration, clearIntegration, testIntegration } = useSettingsStore()
  const [testResults, setTestResults] = useState<Record<string, boolean | null>>({})
  const [testingKey, setTestingKey] = useState<string | null>(null)
  const [showTokens, setShowTokens] = useState<Record<string, boolean>>({})

  const handleUpdateIntegration = (key: keyof typeof integrations, value: string) => {
    updateIntegration(key, value)
    // Clear test result when value changes
    setTestResults(prev => ({ ...prev, [key]: null }))
  }

  const handleTestIntegration = async (key: keyof typeof integrations) => {
    setTestingKey(key)
    setTestResults(prev => ({ ...prev, [key]: null }))
    
    try {
      const result = await testIntegration(key)
      setTestResults(prev => ({ ...prev, [key]: result }))
    } catch (error) {
      setTestResults(prev => ({ ...prev, [key]: false }))
    } finally {
      setTestingKey(null)
    }
  }

  const toggleShowToken = (key: string) => {
    setShowTokens(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="space-y-6">
      {/* AI Integrations */}
      <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-6">
        <h3 className="text-lg font-medium text-white mb-4 flex items-center space-x-2">
          <Bot className="w-5 h-5 text-purple-400" />
          <span>AI Integrations</span>
        </h3>
        
        {/* Security Disclaimer */}
        <div className="p-4 bg-amber-600/10 border border-amber-600/20 rounded-lg mb-6">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-medium text-amber-400 mb-1">Security Notice</h4>
              <p className="text-xs text-amber-200">
                Your API keys are stored locally and never shared. For extra security, consider using encrypted cloud sync or connecting via secure backend in the future.
              </p>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          {/* OpenAI */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">AI</span>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white">OpenAI</h4>
                  <p className="text-xs text-slate-400">Connect to GPT models</p>
                </div>
              </div>
              <a 
                href="https://platform.openai.com/api-keys" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-blue-400 hover:text-blue-300 transition-colors flex items-center space-x-1"
              >
                <span>Get API Key</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <input
                  type={showTokens.openaiKey ? 'text' : 'password'}
                  value={integrations.openaiKey}
                  onChange={(e) => handleUpdateIntegration('openaiKey', e.target.value)}
                  placeholder="sk-..."
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 
                           rounded-lg text-white placeholder-slate-500 
                           focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <button
                  onClick={() => toggleShowToken('openaiKey')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showTokens.openaiKey ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              </div>
              
              <button
                onClick={() => handleTestIntegration('openaiKey')}
                disabled={!integrations.openaiKey || testingKey === 'openaiKey'}
                className="px-3 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed rounded-lg text-white transition-colors flex items-center space-x-2"
              >
                {testingKey === 'openaiKey' ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : testResults.openaiKey === true ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : testResults.openaiKey === false ? (
                  <X className="w-4 h-4 text-red-400" />
                ) : (
                  <span>Test</span>
                )}
              </button>
              
              {integrations.openaiKey && (
                <button
                  onClick={() => clearIntegration('openaiKey')}
                  className="px-3 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
            
            {testResults.openaiKey === false && (
              <p className="text-xs text-red-400">
                Invalid API key format or connection failed. Please check your key and try again.
              </p>
            )}
          </div>
          
          {/* Anthropic Claude */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">C</span>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white">Anthropic Claude</h4>
                  <p className="text-xs text-slate-400">Connect to Claude models</p>
                </div>
              </div>
              <a 
                href="https://console.anthropic.com/settings/keys" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-blue-400 hover:text-blue-300 transition-colors flex items-center space-x-1"
              >
                <span>Get API Key</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <input
                  type={showTokens.claudeKey ? 'text' : 'password'}
                  value={integrations.claudeKey}
                  onChange={(e) => handleUpdateIntegration('claudeKey', e.target.value)}
                  placeholder="sk-ant-..."
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 
                           rounded-lg text-white placeholder-slate-500 
                           focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <button
                  onClick={() => toggleShowToken('claudeKey')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showTokens.claudeKey ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              </div>
              
              <button
                onClick={() => handleTestIntegration('claudeKey')}
                disabled={!integrations.claudeKey || testingKey === 'claudeKey'}
                className="px-3 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed rounded-lg text-white transition-colors flex items-center space-x-2"
              >
                {testingKey === 'claudeKey' ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : testResults.claudeKey === true ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : testResults.claudeKey === false ? (
                  <X className="w-4 h-4 text-red-400" />
                ) : (
                  <span>Test</span>
                )}
              </button>
              
              {integrations.claudeKey && (
                <button
                  onClick={() => clearIntegration('claudeKey')}
                  className="px-3 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
            
            {testResults.claudeKey === false && (
              <p className="text-xs text-red-400">
                Invalid API key format or connection failed. Please check your key and try again.
              </p>
            )}
          </div>
          
          {/* Google Gemini */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">G</span>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white">Google Gemini</h4>
                  <p className="text-xs text-slate-400">Connect to Gemini models</p>
                </div>
              </div>
              <a 
                href="https://ai.google.dev/tutorials/setup" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-blue-400 hover:text-blue-300 transition-colors flex items-center space-x-1"
              >
                <span>Get API Key</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <input
                  type={showTokens.geminiKey ? 'text' : 'password'}
                  value={integrations.geminiKey}
                  onChange={(e) => handleUpdateIntegration('geminiKey', e.target.value)}
                  placeholder="AIza..."
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 
                           rounded-lg text-white placeholder-slate-500 
                           focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <button
                  onClick={() => toggleShowToken('geminiKey')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showTokens.geminiKey ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              </div>
              
              <button
                onClick={() => handleTestIntegration('geminiKey')}
                disabled={!integrations.geminiKey || testingKey === 'geminiKey'}
                className="px-3 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed rounded-lg text-white transition-colors flex items-center space-x-2"
              >
                {testingKey === 'geminiKey' ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : testResults.geminiKey === true ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : testResults.geminiKey === false ? (
                  <X className="w-4 h-4 text-red-400" />
                ) : (
                  <span>Test</span>
                )}
              </button>
              
              {integrations.geminiKey && (
                <button
                  onClick={() => clearIntegration('geminiKey')}
                  className="px-3 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
            
            {testResults.geminiKey === false && (
              <p className="text-xs text-red-400">
                Invalid API key format or connection failed. Please check your key and try again.
              </p>
            )}
          </div>
          
          {/* OpenRouter */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">OR</span>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white">OpenRouter</h4>
                  <p className="text-xs text-slate-400">Connect to multiple AI models</p>
                </div>
              </div>
              <a 
                href="https://openrouter.ai/keys" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-blue-400 hover:text-blue-300 transition-colors flex items-center space-x-1"
              >
                <span>Get API Key</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <input
                  type={showTokens.openrouterKey ? 'text' : 'password'}
                  value={integrations.openrouterKey}
                  onChange={(e) => handleUpdateIntegration('openrouterKey', e.target.value)}
                  placeholder="sk-or-..."
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 
                           rounded-lg text-white placeholder-slate-500 
                           focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <button
                  onClick={() => toggleShowToken('openrouterKey')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showTokens.openrouterKey ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              </div>
              
              <button
                onClick={() => handleTestIntegration('openrouterKey')}
                disabled={!integrations.openrouterKey || testingKey === 'openrouterKey'}
                className="px-3 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed rounded-lg text-white transition-colors flex items-center space-x-2"
              >
                {testingKey === 'openrouterKey' ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : testResults.openrouterKey === true ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : testResults.openrouterKey === false ? (
                  <X className="w-4 h-4 text-red-400" />
                ) : (
                  <span>Test</span>
                )}
              </button>
              
              {integrations.openrouterKey && (
                <button
                  onClick={() => clearIntegration('openrouterKey')}
                  className="px-3 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
            
            {testResults.openrouterKey === false && (
              <p className="text-xs text-red-400">
                Invalid API key format or connection failed. Please check your key and try again.
              </p>
            )}
          </div>
          
          {/* Default LLM Selection */}
          <div className="pt-2">
            <h4 className="text-sm font-medium text-white mb-3">Default AI Provider</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { id: 'openai', name: 'OpenAI', available: !!integrations.openaiKey },
                { id: 'claude', name: 'Claude', available: !!integrations.claudeKey },
                { id: 'gemini', name: 'Gemini', available: !!integrations.geminiKey },
                { id: 'openrouter', name: 'OpenRouter', available: !!integrations.openrouterKey }
              ].map(provider => (
                <button
                  key={provider.id}
                  onClick={() => updateIntegration('defaultLLM', provider.id as any)}
                  disabled={!provider.available}
                  className={`p-3 rounded-lg text-center transition-all ${
                    integrations.defaultLLM === provider.id
                      ? 'bg-purple-600/20 border border-purple-600/30 text-purple-400'
                      : provider.available
                        ? 'bg-slate-700/50 hover:bg-slate-700 text-slate-300 border border-transparent'
                        : 'bg-slate-800/50 text-slate-500 cursor-not-allowed border border-transparent'
                  }`}
                >
                  <span className="text-sm">{provider.name}</span>
                  {!provider.available && (
                    <p className="text-xs text-slate-500 mt-1">Not connected</p>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Other Integrations */}
      <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-6">
        <h3 className="text-lg font-medium text-white mb-4 flex items-center space-x-2">
          <Key className="w-5 h-5 text-emerald-400" />
          <span>Other Integrations</span>
        </h3>
        
        <div className="space-y-6">
          {/* Notion */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">N</span>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white">Notion</h4>
                  <p className="text-xs text-slate-400">Connect to your Notion workspace</p>
                </div>
              </div>
              <a 
                href="https://www.notion.so/my-integrations" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-blue-400 hover:text-blue-300 transition-colors flex items-center space-x-1"
              >
                <span>Get Integration Token</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <input
                  type={showTokens.notionToken ? 'text' : 'password'}
                  value={integrations.notionToken}
                  onChange={(e) => handleUpdateIntegration('notionToken', e.target.value)}
                  placeholder="secret_..."
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 
                           rounded-lg text-white placeholder-slate-500 
                           focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
                <button
                  onClick={() => toggleShowToken('notionToken')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showTokens.notionToken ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              </div>
              
              <button
                onClick={() => handleTestIntegration('notionToken')}
                disabled={!integrations.notionToken || testingKey === 'notionToken'}
                className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed rounded-lg text-white transition-colors flex items-center space-x-2"
              >
                {testingKey === 'notionToken' ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : testResults.notionToken === true ? (
                  <Check className="w-4 h-4 text-white" />
                ) : testResults.notionToken === false ? (
                  <X className="w-4 h-4 text-white" />
                ) : (
                  <span>Test</span>
                )}
              </button>
              
              {integrations.notionToken && (
                <button
                  onClick={() => clearIntegration('notionToken')}
                  className="px-3 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
            
            {testResults.notionToken === false && (
              <p className="text-xs text-red-400">
                Invalid integration token or connection failed. Please check your token and try again.
              </p>
            )}
          </div>
          
          {/* Coming Soon Integrations */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-white">Coming Soon</h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center space-x-3 p-3 bg-slate-700/30 rounded-lg opacity-70">
                <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">G</span>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white">Google Calendar</h4>
                  <p className="text-xs text-slate-400">Coming soon</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-slate-700/30 rounded-lg opacity-70">
                <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">T</span>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white">Todoist</h4>
                  <p className="text-xs text-slate-400">Coming soon</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-slate-700/30 rounded-lg opacity-70">
                <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">S</span>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white">Spotify</h4>
                  <p className="text-xs text-slate-400">Coming soon</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-slate-700/30 rounded-lg opacity-70">
                <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">F</span>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white">Fitbit</h4>
                  <p className="text-xs text-slate-400">Coming soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* API Usage */}
      <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-6">
        <h3 className="text-lg font-medium text-white mb-4">API Usage</h3>
        
        <div className="space-y-4">
          <div className="p-4 bg-slate-700/30 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-white">OpenAI</h4>
              <span className="text-xs text-emerald-400">Active</span>
            </div>
            
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>Monthly Usage</span>
                  <span>$3.42 / $5.00</span>
                </div>
                <div className="bg-slate-600 rounded-full h-2">
                  <div className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-2 rounded-full" style={{ width: '68%' }} />
                </div>
              </div>
              
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Requests this month:</span>
                <span className="text-white">142</span>
              </div>
              
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Tokens used:</span>
                <span className="text-white">28,450</span>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-slate-700/30 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-white">Claude</h4>
              <span className="text-xs text-slate-400">Not connected</span>
            </div>
            
            <div className="text-center py-2">
              <p className="text-xs text-slate-400">Connect your Claude API key to see usage statistics</p>
            </div>
          </div>
          
          <div className="p-4 bg-slate-700/30 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-white">Gemini</h4>
              <span className="text-xs text-slate-400">Not connected</span>
            </div>
            
            <div className="text-center py-2">
              <p className="text-xs text-slate-400">Connect your Gemini API key to see usage statistics</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}