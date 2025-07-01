import { motion } from 'framer-motion'
import { Clock, Plus, Power } from 'lucide-react'
import { useSleepStore } from '../store/sleepStore'

export function CycleVisualizer() {
  const { cycles, currentCycle, activateCycle } = useSleepStore()

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  const getCycleTypeColor = (type: string) => {
    switch (type) {
      case 'monophasic': return 'text-blue-400'
      case 'biphasic': return 'text-emerald-400'
      case 'polyphasic': return 'text-purple-400'
      default: return 'text-slate-400'
    }
  }

  const getBlockTypeIcon = (type: string) => {
    return type === 'core' ? '🛏️' : '💤'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="glass-card rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Clock className="w-5 h-5 text-purple-400" />
          <h3 className="text-xl font-semibold text-white">Sleep Cycles</h3>
        </div>
        <button className="flex items-center space-x-2 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors">
          <Plus className="w-4 h-4 text-white" />
          <span className="text-white text-sm">New Cycle</span>
        </button>
      </div>

      <div className="space-y-4">
        {cycles.map((cycle, index) => (
          <motion.div
            key={cycle.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
              cycle.id === currentCycle
                ? 'border-purple-500 bg-purple-500/10'
                : 'border-slate-700 hover:border-slate-600 bg-slate-800/30'
            }`}
            onClick={() => activateCycle(cycle.id)}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="text-sm font-medium text-white">{cycle.name}</h4>
                  {cycle.isActive && (
                    <Power className="w-4 h-4 text-emerald-400" />
                  )}
                </div>
                <div className="flex items-center space-x-4 text-xs text-slate-400">
                  <span className={`capitalize ${getCycleTypeColor(cycle.type)}`}>
                    {cycle.type}
                  </span>
                  <span>Total: {formatTime(cycle.totalSleep)}</span>
                  <span>{cycle.schedule.length} blocks</span>
                </div>
              </div>
            </div>

            {/* Sleep Schedule Visualization */}
            <div className="space-y-2">
              {cycle.schedule.map((block, blockIndex) => (
                <div key={block.id} className="flex items-center space-x-3 p-2 bg-slate-700/30 rounded">
                  <span className="text-sm">{getBlockTypeIcon(block.type)}</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">{block.name}</p>
                    <p className="text-xs text-slate-400">
                      {block.startTime} • {formatTime(block.duration)}
                    </p>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs ${
                    block.type === 'core' ? 'bg-blue-600/20 text-blue-400' : 'bg-emerald-600/20 text-emerald-400'
                  }`}>
                    {block.type}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 p-3 bg-purple-600/20 rounded-lg">
        <p className="text-sm text-purple-300">
          ⏰ Polyphasic sleep cycles can increase productivity but require strict adherence to schedule.
        </p>
      </div>
    </motion.div>
  )
}