import { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, Calendar, Plus, Heart } from 'lucide-react'

const interactions = [
  {
    id: 1,
    person: 'Sarah Chen',
    type: 'Coffee Chat',
    date: '2024-02-10',
    notes: 'Discussed her new job opportunity and provided career advice. She seemed excited about the role.',
    mood: 'positive',
    duration: '2 hours'
  },
  {
    id: 2,
    person: 'Marcus Johnson',
    type: 'Team Meeting',
    date: '2024-02-08',
    notes: 'Collaborated on the Q1 project roadmap. Good synergy and productive discussion.',
    mood: 'neutral',
    duration: '1 hour'
  },
  {
    id: 3,
    person: 'Dr. Emily Rodriguez',
    type: 'Mentorship Call',
    date: '2024-02-07',
    notes: 'Received valuable feedback on my presentation skills and leadership development.',
    mood: 'positive',
    duration: '45 minutes'
  }
]

const moodColors = {
  positive: 'border-emerald-400 bg-emerald-400/10',
  neutral: 'border-slate-400 bg-slate-400/10',
  negative: 'border-red-400 bg-red-400/10'
}

export function InteractionJournal() {
  const [showAddForm, setShowAddForm] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="glass-card rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <MessageCircle className="w-5 h-5 text-blue-400" />
          <h3 className="text-xl font-semibold text-white">Interaction Journal</h3>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4 text-white" />
          <span className="text-white text-sm">Log Interaction</span>
        </button>
      </div>

      <div className="space-y-4">
        {interactions.map((interaction, index) => (
          <motion.div
            key={interaction.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
            className={`p-4 border rounded-lg ${moodColors[interaction.mood as keyof typeof moodColors]}`}
          >
            <div className="flex items-center justify-between mb-2">
              <div>
                <h4 className="text-sm font-medium text-white">{interaction.person}</h4>
                <p className="text-xs text-slate-400">{interaction.type}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-1 text-xs text-slate-400">
                  <Calendar className="w-3 h-3" />
                  <span>{interaction.date}</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">{interaction.duration}</p>
              </div>
            </div>
            
            <p className="text-sm text-slate-300 leading-relaxed">
              {interaction.notes}
            </p>
            
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center space-x-1">
                <Heart className={`w-3 h-3 ${
                  interaction.mood === 'positive' ? 'text-emerald-400' :
                  interaction.mood === 'neutral' ? 'text-slate-400' : 'text-red-400'
                }`} />
                <span className="text-xs text-slate-400 capitalize">{interaction.mood}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 p-3 bg-blue-600/20 rounded-lg">
        <p className="text-sm text-blue-300">
          📝 You've logged {interactions.length} meaningful interactions this week
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
            <h4 className="text-lg font-semibold text-white mb-4">Log Interaction</h4>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Person's name"
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400"
              />
              
              <input
                type="text"
                placeholder="Interaction type (e.g., Coffee, Call, Meeting)"
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400"
              />
              
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="date"
                  className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                />
                <input
                  type="text"
                  placeholder="Duration"
                  className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400"
                />
              </div>
              
              <select className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white">
                <option value="">Select mood</option>
                <option value="positive">Positive</option>
                <option value="neutral">Neutral</option>
                <option value="negative">Negative</option>
              </select>
              
              <textarea
                placeholder="Notes about the interaction..."
                className="w-full h-24 p-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 resize-none"
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
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors"
                >
                  Log Interaction
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}