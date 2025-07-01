import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Smile, Meh, Frown, Plus } from 'lucide-react'

const emotions = [
  { id: 1, type: 'joy', intensity: 8, time: '09:30', trigger: 'Completed morning workout' },
  { id: 2, type: 'stress', intensity: 6, time: '11:45', trigger: 'Difficult client meeting' },
  { id: 3, type: 'gratitude', intensity: 9, time: '14:20', trigger: 'Team appreciation message' },
  { id: 4, type: 'anxiety', intensity: 4, time: '16:15', trigger: 'Upcoming presentation' }
]

const emotionIcons = {
  joy: { icon: Smile, color: 'text-emerald-400' },
  stress: { icon: Frown, color: 'text-red-400' },
  gratitude: { icon: Heart, color: 'text-pink-400' },
  anxiety: { icon: Meh, color: 'text-amber-400' }
}

export function EmotionLog() {
  const [showAddForm, setShowAddForm] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">Emotion Log</h3>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4 text-white" />
          <span className="text-white text-sm">Log Emotion</span>
        </button>
      </div>

      <div className="space-y-4">
        {emotions.map((emotion, index) => {
          const EmotionIcon = emotionIcons[emotion.type as keyof typeof emotionIcons].icon
          const iconColor = emotionIcons[emotion.type as keyof typeof emotionIcons].color
          
          return (
            <motion.div
              key={emotion.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              className="p-4 bg-slate-800/30 rounded-lg"
            >
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-slate-700/50 rounded-lg">
                  <EmotionIcon className={`w-4 h-4 ${iconColor}`} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-white capitalize">{emotion.type}</h4>
                    <span className="text-xs text-slate-400">{emotion.time}</span>
                  </div>
                  
                  <p className="text-sm text-slate-300 mb-2">{emotion.trigger}</p>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-slate-400">Intensity:</span>
                    <div className="flex space-x-1">
                      {[...Array(10)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            i < emotion.intensity ? 'bg-purple-400' : 'bg-slate-600'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-purple-400">{emotion.intensity}/10</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className="mt-6 p-3 bg-purple-600/20 rounded-lg">
        <p className="text-sm text-purple-300">
          🧠 Your emotional patterns show high resilience and self-awareness
        </p>
      </div>

      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowAddForm(false)}
        >
          <div 
            className="glass-card rounded-xl p-6 w-96 m-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h4 className="text-lg font-semibold text-white mb-4">Log Emotion</h4>
            <form className="space-y-4">
              <select className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white">
                <option value="">Select emotion type</option>
                <option value="joy">Joy</option>
                <option value="stress">Stress</option>
                <option value="gratitude">Gratitude</option>
                <option value="anxiety">Anxiety</option>
                <option value="excitement">Excitement</option>
                <option value="sadness">Sadness</option>
              </select>
              
              <div>
                <label className="block text-sm text-slate-400 mb-2">Intensity (1-10)</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  className="w-full"
                />
              </div>
              
              <textarea
                placeholder="What triggered this emotion?"
                className="w-full h-20 p-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 resize-none"
              />
              
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white transition-colors"
                >
                  Log Emotion
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}