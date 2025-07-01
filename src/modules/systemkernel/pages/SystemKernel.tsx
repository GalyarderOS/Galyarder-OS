import { motion } from 'framer-motion'
import { useState } from 'react'
import { Brain, Settings, Power, Zap, Shield, Layers, Activity, BarChart } from 'lucide-react'
import { useKernelStore } from '../store/useKernelStore'

export function SystemKernel() {
  const [activeTab, setActiveTab] = useState<'modes' | 'modules' | 'behavior'>('modes')
  const { 
    operatingModes, 
    activeMode, 
    setActiveMode,
    systemBehaviors,
    toggleBehavior,
    moduleStates,
    toggleModule
  } = useKernelStore()

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          System Kernel
        </h1>
        <p className="text-slate-400 mt-2">
          One of 27+ integrated modules designed to build your personal civilization.
        </p>
      </motion.div>

      {/* Tab Navigation */}
      <div className="flex space-x-2 mb-6">
        <button
          onClick={() => setActiveTab('modes')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'modes'
              ? 'bg-indigo-600 text-white'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          Operating Modes
        </button>
        <button
          onClick={() => setActiveTab('modules')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'modules'
              ? 'bg-indigo-600 text-white'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          Module Control
        </button>
        <button
          onClick={() => setActiveTab('behavior')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'behavior'
              ? 'bg-indigo-600 text-white'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          System Behavior
        </button>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'modes' && (
        <div className="space-y-6">
          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Power className="w-5 h-5 text-indigo-400" />
              <h3 className="text-xl font-semibold text-white">Operating Modes</h3>
            </div>
            
            <p className="text-slate-300 mb-6">
              Operating modes define how your system behaves across all modules. Activate a mode to instantly reconfigure your entire OS.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {operatingModes.map((mode) => (
                <motion.div
                  key={mode.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-xl cursor-pointer transition-all ${
                    mode.id === activeMode
                      ? 'bg-indigo-600/20 border-2 border-indigo-500'
                      : 'bg-slate-800/30 border border-slate-700 hover:border-slate-600'
                  }`}
                  onClick={() => setActiveMode(mode.id)}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${mode.color}`}>
                      {mode.icon === 'zap' && <Zap className="w-5 h-5 text-white" />}
                      {mode.icon === 'shield' && <Shield className="w-5 h-5 text-white" />}
                      {mode.icon === 'activity' && <Activity className="w-5 h-5 text-white" />}
                      {mode.icon === 'layers' && <Layers className="w-5 h-5 text-white" />}
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-white">{mode.name}</h4>
                      <p className="text-xs text-slate-400">{mode.description}</p>
                    </div>
                  </div>
                  
                  <div className="mt-3 space-y-2">
                    {mode.effects.map((effect, index) => (
                      <div key={index} className="flex items-center space-x-2 text-xs">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-400"></div>
                        <span className="text-slate-300">{effect}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <BarChart className="w-5 h-5 text-emerald-400" />
              <h3 className="text-xl font-semibold text-white">Mode Performance</h3>
            </div>
            
            <div className="p-4 bg-indigo-600/10 border border-indigo-600/20 rounded-lg">
              <p className="text-sm text-indigo-300">
                <span className="font-medium">Pro Tip:</span> Your current operating mode affects all modules. For example, "Focus Mode" will prioritize productivity modules and minimize distractions across your entire OS.
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'modules' && (
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Layers className="w-5 h-5 text-purple-400" />
            <h3 className="text-xl font-semibold text-white">Module Control</h3>
          </div>
          
          <p className="text-slate-300 mb-6">
            Control which modules are active in your system. Disabled modules won't appear in your dock or dashboard.
          </p>

          <div className="space-y-4">
            {moduleStates.map((module) => (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg hover:bg-slate-800/50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${module.color}`}>
                    {module.icon === 'brain' && <Brain className="w-4 h-4 text-white" />}
                    {module.icon === 'settings' && <Settings className="w-4 h-4 text-white" />}
                    {module.icon === 'activity' && <Activity className="w-4 h-4 text-white" />}
                    {module.icon === 'layers' && <Layers className="w-4 h-4 text-white" />}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-white">{module.name}</h4>
                    <p className="text-xs text-slate-400">{module.category}</p>
                  </div>
                </div>
                
                <button 
                  onClick={() => toggleModule(module.id)}
                  className={`w-12 h-6 ${module.active ? 'bg-purple-600' : 'bg-slate-600'} rounded-full relative transition-colors`}
                >
                  <div 
                    className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                      module.active ? 'right-0.5' : 'left-0.5'
                    }`} 
                  />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'behavior' && (
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Brain className="w-5 h-5 text-amber-400" />
            <h3 className="text-xl font-semibold text-white">System Behavior</h3>
          </div>
          
          <p className="text-slate-300 mb-6">
            Configure how your OS behaves at a system level. These settings affect all modules and interactions.
          </p>

          <div className="space-y-4">
            {systemBehaviors.map((behavior) => (
              <motion.div
                key={behavior.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg"
              >
                <div>
                  <h4 className="text-sm font-medium text-white">{behavior.name}</h4>
                  <p className="text-xs text-slate-400">{behavior.description}</p>
                </div>
                
                <button 
                  onClick={() => toggleBehavior(behavior.id)}
                  className={`w-12 h-6 ${behavior.enabled ? 'bg-amber-600' : 'bg-slate-600'} rounded-full relative transition-colors`}
                >
                  <div 
                    className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                      behavior.enabled ? 'right-0.5' : 'left-0.5'
                    }`} 
                  />
                </button>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-amber-600/10 border border-amber-600/20 rounded-lg">
            <p className="text-sm text-amber-300">
              <span className="font-medium">Note:</span> Some behaviors may require a system restart to take full effect. Changes to core behaviors will be applied immediately where possible.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}