import { motion } from 'framer-motion'
import { Volume2, Lightbulb, Wind, Play, Pause } from 'lucide-react'
import { useEnvironmentStore } from '../store/environmentStore'

export function AmbientController() {
  const { ambientProfiles } = useEnvironmentStore()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="glass-card rounded-xl p-6"
    >
      <div className="flex items-center space-x-3 mb-6">
        <Volume2 className="w-5 h-5 text-purple-400" />
        <h3 className="text-xl font-semibold text-white">Ambient Controller</h3>
      </div>

      <div className="space-y-4">
        {ambientProfiles.map((profile, index) => (
          <motion.div
            key={profile.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
            className="p-4 bg-slate-800/30 rounded-lg"
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="text-sm font-medium text-white">{profile.name}</h4>
                <p className="text-xs text-slate-400">{profile.duration} minutes</p>
              </div>
              <button className="p-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors">
                <Play className="w-4 h-4 text-white" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-3">
              <div className="flex items-center space-x-2">
                <Volume2 className="w-3 h-3 text-blue-400" />
                <span className="text-xs text-slate-300">{profile.soundscape}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Lightbulb className="w-3 h-3 text-amber-400" />
                <span className="text-xs text-slate-300">{profile.lighting.brightness}%</span>
              </div>
              {profile.scent && (
                <div className="flex items-center space-x-2">
                  <Wind className="w-3 h-3 text-emerald-400" />
                  <span className="text-xs text-slate-300">{profile.scent}</span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-1">
              {profile.triggers.map(trigger => (
                <span key={trigger} className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded">
                  {trigger}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <Volume2 className="w-5 h-5 text-blue-400 mx-auto mb-2" />
          <p className="text-sm font-medium text-white">Audio</p>
          <p className="text-xs text-slate-400">Active</p>
        </div>
        
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <Lightbulb className="w-5 h-5 text-amber-400 mx-auto mb-2" />
          <p className="text-sm font-medium text-white">Lighting</p>
          <p className="text-xs text-slate-400">Synced</p>
        </div>
        
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <Wind className="w-5 h-5 text-emerald-400 mx-auto mb-2" />
          <p className="text-sm font-medium text-white">Climate</p>
          <p className="text-xs text-slate-400">Optimal</p>
        </div>
      </div>
    </motion.div>
  )
}