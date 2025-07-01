import { motion } from 'framer-motion'
import { Sunrise, Play, Settings, Plus } from 'lucide-react'
import { useSleepStore } from '../store/sleepStore'

export function WakeProtocol() {
  const { wakeProtocols } = useSleepStore()

  const getStepIcon = (type: string) => {
    const icons = {
      light: '💡',
      sound: '🔊',
      vibration: '📳',
      temperature: '🌡️'
    }
    return icons[type as keyof typeof icons] || '⚙️'
  }

  const getIntensityColor = (intensity: number) => {
    if (intensity >= 70) return 'text-red-400'
    if (intensity >= 40) return 'text-amber-400'
    return 'text-emerald-400'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass-card rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Sunrise className="w-5 h-5 text-amber-400" />
          <h3 className="text-xl font-semibold text-white">Wake Protocols</h3>
        </div>
        <button className="flex items-center space-x-2 px-3 py-1.5 bg-amber-600 hover:bg-amber-700 rounded-lg transition-colors">
          <Plus className="w-4 h-4 text-white" />
          <span className="text-white text-sm">New Protocol</span>
        </button>
      </div>

      <div className="space-y-4">
        {wakeProtocols.map((protocol, index) => (
          <motion.div
            key={protocol.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
            className={`p-4 rounded-lg ${
              protocol.isActive 
                ? 'border-2 border-amber-500 bg-amber-500/10' 
                : 'bg-slate-800/30'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-sm font-medium text-white">{protocol.name}</h4>
                <p className="text-xs text-slate-400">{protocol.duration} minutes total</p>
              </div>
              <div className="flex items-center space-x-2">
                {protocol.isActive && (
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                )}
                <button className="p-2 bg-amber-600 hover:bg-amber-700 rounded-lg transition-colors">
                  <Play className="w-3 h-3 text-white" />
                </button>
                <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
                  <Settings className="w-3 h-3 text-slate-400 hover:text-white" />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              {protocol.steps.map((step, stepIndex) => (
                <div key={step.id} className="flex items-center space-x-3 p-2 bg-slate-700/30 rounded">
                  <span className="text-sm">{getStepIcon(step.type)}</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">{step.name}</p>
                    <p className="text-xs text-slate-400">{step.duration} min</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-medium ${getIntensityColor(step.intensity)}`}>
                      {step.intensity}%
                    </p>
                    <p className="text-xs text-slate-400 capitalize">{step.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 p-3 bg-amber-600/20 rounded-lg">
        <p className="text-sm text-amber-300">
          🌅 Gradual wake protocols improve morning alertness and reduce sleep inertia.
        </p>
      </div>
    </motion.div>
  )
}