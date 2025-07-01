import { motion } from 'framer-motion'
import { Settings, Power, Plus, Edit } from 'lucide-react'
import { useEnvironmentStore } from '../store/environmentStore'

export function EnvironmentModeSelector() {
  const { modes, currentMode, activateMode } = useEnvironmentStore()

  const getModeIcon = (name: string) => {
    if (name.includes('Focus')) return '🎯'
    if (name.includes('Creative')) return '🎨'
    if (name.includes('Relax')) return '🧘'
    if (name.includes('Sleep')) return '😴'
    return '⚙️'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Settings className="w-5 h-5 text-blue-400" />
          <h3 className="text-xl font-semibold text-white">Environment Modes</h3>
        </div>
        <button className="flex items-center space-x-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
          <Plus className="w-4 h-4 text-white" />
          <span className="text-white text-sm">New Mode</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {modes.map((mode, index) => (
          <motion.div
            key={mode.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
              mode.id === currentMode
                ? 'border-blue-500 bg-blue-500/10'
                : 'border-slate-700 hover:border-slate-600 bg-slate-800/30'
            }`}
            onClick={() => activateMode(mode.id)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{getModeIcon(mode.name)}</span>
                <div>
                  <h4 className="text-sm font-medium text-white">{mode.name}</h4>
                  <p className="text-xs text-slate-400">{mode.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {mode.isActive && (
                  <Power className="w-4 h-4 text-emerald-400" />
                )}
                <button className="p-1 hover:bg-slate-700 rounded transition-colors">
                  <Edit className="w-3 h-3 text-slate-400 hover:text-white" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-700/30 rounded p-2">
                <span className="text-slate-400">Lighting:</span>
                <span className="text-white ml-1">{mode.settings.lighting}%</span>
              </div>
              <div className="bg-slate-700/30 rounded p-2">
                <span className="text-slate-400">Temp:</span>
                <span className="text-white ml-1">{mode.settings.temperature}°C</span>
              </div>
              <div className="bg-slate-700/30 rounded p-2">
                <span className="text-slate-400">Humidity:</span>
                <span className="text-white ml-1">{mode.settings.humidity}%</span>
              </div>
              <div className="bg-slate-700/30 rounded p-2">
                <span className="text-slate-400">Noise:</span>
                <span className="text-white ml-1">{mode.settings.noise}dB</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 p-3 bg-blue-600/20 rounded-lg">
        <p className="text-sm text-blue-300">
          🏠 Environment automatically adjusts based on your selected mode and connected devices.
        </p>
      </div>
    </motion.div>
  )
}