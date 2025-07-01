import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
  ArrowRight, 
  Smile, 
  Meh, 
  Frown, 
  Sparkles,
  CheckCircle
} from 'lucide-react'
import { useAppStore } from '../../../lib/store'
import { getInitials, getAvatarGradient } from '../../../lib/utils'
import { AIAssistantDialog } from '../../aiassistant/components/AIAssistantDialog'
import { allModules, iconMap } from '../../../data/modules'
import { useDockStore } from '../../../lib/stores/useDockStore'
import logo from '../../../assets/logo.png'

export function WelcomeScreen() {
  const navigate = useNavigate()
  const { user, setHasCompletedWelcome } = useAppStore()
  const { pinModule } = useDockStore()
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedModules, setSelectedModules] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const userInitials = getInitials(user?.name || 'User')
  const userGradient = getAvatarGradient(user?.name || 'User')

  const handleGetStarted = () => {
    // Pin any selected modules that aren't already pinned
    selectedModules.forEach(moduleId => {
      pinModule(moduleId)
    })
    
    setHasCompletedWelcome(true)
    navigate('/')
  }

  // Filter modules based on search and category
  const filteredModules = allModules.filter(module => {
    const matchesSearch = module.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || module.category === selectedCategory
    
    // Exclude Settings and Command Palette from the list
    const isSystemModule = module.id === 'settings' || module.id === 'command-palette'
    
    return matchesSearch && matchesCategory && !isSystemModule
  })

  // Categories for filtering
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'productivity', name: 'Productivity' },
    { id: 'health', name: 'Health & Wellness' },
    { id: 'finance', name: 'Finance' },
    { id: 'personal', name: 'Personal' },
    { id: 'system', name: 'System' }
  ]

  // Toggle module selection
  const toggleModuleSelection = (moduleId: string) => {
    setSelectedModules(prev => 
      prev.includes(moduleId)
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    )
  }

  const steps = [
    {
      title: "Welcome to GalyarderOS",
      content: (
        <div className="text-center space-y-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="w-32 h-32 mx-auto mb-6 flex items-center justify-center"
          >
            <img src={logo} alt="GalyarderOS Logo" className="w-full h-full" />
          </motion.div>
          
          <h2 className="text-3xl font-bold text-white mb-4">
            Hello, {user?.name || 'User'}!
          </h2>
          
          <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mx-auto">
            Welcome to your personal civilization system. GalyarderOS is designed to help you 
            optimize every aspect of your life through intelligent modules and AI-powered insights.
          </p>
        </div>
      )
    },
    {
      title: "Explore Your Modules",
      content: (
        <div className="space-y-6">
          <p className="text-slate-300 text-center mb-8">
            GalyarderOS now includes 27 integrated life systems to help you manage every dimension of your life with clarity, sovereignty, and AI assistance.
          </p>
          
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="relative w-full md:w-64">
              <input
                id="module-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search modules..."
                className="w-full pl-4 pr-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-[60vh] overflow-y-auto p-2">
            {filteredModules.map((module) => {
              const ModuleIcon = iconMap[module.icon as keyof typeof iconMap]
              const isSelected = selectedModules.includes(module.id)
              const isNew = ['environment-architect', 'sleep-architect', 'spiritual-forge', 'meta-memory', 'ops-center', 'family-matrix', 'digital-sovereignty', 'world-intelligence', 'system-kernel'].includes(module.id)
              const isCore = ['dashboard', 'ai-assistant', 'chrono-copilot', 'finance-hub', 'health-forge', 'productivity-matrix', 'mind-guard'].includes(module.id)
              
              return (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className={`p-4 rounded-xl cursor-pointer transition-all duration-200 border-2 ${
                    isSelected 
                      ? 'bg-blue-600/20 border-blue-500' 
                      : 'bg-slate-800/30 border-transparent hover:bg-slate-800/50 hover:border-slate-700'
                  }`}
                  onClick={() => toggleModuleSelection(module.id)}
                >
                  <div className="relative">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${module.color} mb-3 mx-auto`}>
                      {ModuleIcon && <ModuleIcon className="w-6 h-6 text-white" />}
                    </div>
                    
                    {/* Badges */}
                    <div className="absolute -top-2 -right-2 flex space-x-1">
                      {isNew && (
                        <span className="bg-purple-600 text-white text-xs px-2 py-0.5 rounded-full flex items-center">
                          <Sparkles className="w-3 h-3 mr-1" />
                          New
                        </span>
                      )}
                      {isCore && (
                        <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                          Core
                        </span>
                      )}
                      {module.tag && !isCore && !isNew && (
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          module.tag === 'Personal' ? 'bg-emerald-600/20 text-emerald-400' :
                          module.tag === 'Advanced' ? 'bg-purple-600/20 text-purple-400' :
                          'bg-blue-600/20 text-blue-400'
                        }`}>
                          {module.tag}
                        </span>
                      )}
                    </div>
                    
                    {/* Selection indicator */}
                    {isSelected && (
                      <div className="absolute -top-2 -left-2 bg-blue-500 rounded-full p-1">
                        <CheckCircle className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  
                  <div className="text-center">
                    <h3 className="text-sm font-medium text-white mb-1">{module.name}</h3>
                    <p className="text-xs text-slate-400 line-clamp-2">
                      {module.description || `${module.category.charAt(0).toUpperCase() + module.category.slice(1)} module`}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
          
          <div className="text-center text-sm text-slate-400">
            <p>Click on modules to add them to your dock for quick access</p>
            <p className="mt-1">Selected: {selectedModules.length} modules</p>
          </div>
        </div>
      )
    },
    {
      title: "Meet Your AI Assistant",
      content: (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <img src={logo} alt="GalyarderOS Logo" className="w-full h-full" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Galyarder AI Assistant</h3>
            <p className="text-slate-300">
              Your intelligent companion is ready to help you optimize your personal civilization. 
              Try asking a question below!
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <AIAssistantDialog />
          </div>
        </div>
      )
    },
    {
      title: "How are you feeling today?",
      content: (
        <div className="space-y-8 text-center">
          <p className="text-slate-300 text-lg">
            Let's personalize your experience. How are you feeling today?
          </p>
          
          <div className="flex justify-center space-x-8">
            {[
              { emoji: Smile, text: "Great", color: "bg-emerald-600" },
              { emoji: Meh, text: "Okay", color: "bg-amber-600" },
              { emoji: Frown, text: "Not Great", color: "bg-red-600" }
            ].map((mood, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`flex flex-col items-center space-y-3 p-4 rounded-xl ${mood.color} hover:opacity-90 transition-opacity`}
              >
                <mood.emoji className="w-12 h-12 text-white" />
                <span className="text-white font-medium">{mood.text}</span>
              </motion.button>
            ))}
          </div>
          
          <p className="text-slate-400 text-sm">
            This helps us tailor recommendations and insights to your current state
          </p>
        </div>
      )
    }
  ]

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-6xl">
        {/* Progress Indicator */}
        <div className="flex justify-center mb-12">
          <div className="flex space-x-4">
            {steps.map((_, index) => (
              <motion.div
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index <= currentStep ? 'bg-purple-500' : 'bg-slate-600'
                }`}
                animate={{ scale: index === currentStep ? 1.2 : 1 }}
              />
            ))}
          </div>
        </div>

        {/* Step Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-8">
            {steps[currentStep].title}
          </h1>
          
          <div className="mb-12">
            {steps[currentStep].content}
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-between items-center max-w-2xl mx-auto">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="px-6 py-3 text-slate-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>

          <div className="flex space-x-4">
            {currentStep < steps.length - 1 ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="flex items-center space-x-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-white transition-colors"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleGetStarted}
                className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg text-white transition-all duration-200 shadow-lg"
              >
                <CheckCircle className="w-5 h-5" />
                <span>Start Using GalyarderOS</span>
              </button>
            )}
          </div>
        </div>

        {/* Skip Option */}
        <div className="text-center mt-8">
          <button
            onClick={handleGetStarted}
            className="text-slate-400 hover:text-white text-sm transition-colors"
          >
            Skip introduction
          </button>
        </div>
      </div>
    </div>
  )
}