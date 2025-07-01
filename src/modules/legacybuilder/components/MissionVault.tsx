import { useState } from 'react'
import { motion } from 'framer-motion'
import { Gauge as Vault, Edit, Plus, Star } from 'lucide-react'

const missions = [
  {
    id: 1,
    title: 'Personal Mission',
    statement: 'To live authentically, continuously learn and grow, and positively impact the lives of those around me through kindness, mentorship, and meaningful relationships.',
    category: 'personal',
    lastUpdated: '2024-01-15'
  },
  {
    id: 2,
    title: 'Professional Mission',
    statement: 'To create innovative technology solutions that solve real-world problems while building and leading teams that foster creativity, inclusion, and professional growth.',
    category: 'professional',
    lastUpdated: '2024-01-20'
  },
  {
    id: 3,
    title: 'Life Purpose',
    statement: 'To bridge the gap between technology and human potential, empowering others to achieve their goals while leaving the world more connected and compassionate than I found it.',
    category: 'purpose',
    lastUpdated: '2024-02-01'
  }
]

const categoryColors = {
  personal: 'border-pink-400 bg-pink-400/10',
  professional: 'border-blue-400 bg-blue-400/10',
  purpose: 'border-amber-400 bg-amber-400/10'
}

export function MissionVault() {
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingMission, setEditingMission] = useState<number | null>(null)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="glass-card rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Vault className="w-5 h-5 text-amber-400" />
          <h3 className="text-xl font-semibold text-white">Mission Vault</h3>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2 px-3 py-1.5 bg-amber-600 hover:bg-amber-700 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4 text-white" />
          <span className="text-white text-sm">Add Mission</span>
        </button>
      </div>

      <div className="space-y-4">
        {missions.map((mission, index) => (
          <motion.div
            key={mission.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
            className={`p-4 border rounded-lg ${categoryColors[mission.category as keyof typeof categoryColors]}`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-amber-400" />
                <h4 className="text-sm font-medium text-white">{mission.title}</h4>
              </div>
              <button
                onClick={() => setEditingMission(mission.id)}
                className="p-1 hover:bg-slate-700 rounded transition-colors"
              >
                <Edit className="w-3 h-3 text-slate-400 hover:text-white" />
              </button>
            </div>
            
            <p className="text-sm text-slate-300 leading-relaxed mb-3">
              {mission.statement}
            </p>
            
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 capitalize">{mission.category}</span>
              <span className="text-xs text-slate-500">Updated: {mission.lastUpdated}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-slate-800/50 rounded-lg">
        <h4 className="text-sm font-medium text-white mb-2">Mission Alignment Check</h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-300">Personal-Professional Alignment</span>
            <span className="text-emerald-400">92%</span>
          </div>
          <div className="bg-slate-700 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '92%' }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-2 rounded-full"
            />
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-amber-600/20 rounded-lg">
        <p className="text-sm text-amber-300">
          🎯 Your missions are well-aligned! Consider reviewing them quarterly to ensure they evolve with your growth.
        </p>
      </div>

      {(showAddForm || editingMission) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => {
            setShowAddForm(false)
            setEditingMission(null)
          }}
        >
          <div 
            className="glass-card rounded-xl p-6 w-96 m-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h4 className="text-lg font-semibold text-white mb-4">
              {editingMission ? 'Edit Mission' : 'Add New Mission'}
            </h4>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Mission title"
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400"
              />
              
              <select className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white">
                <option value="">Select category</option>
                <option value="personal">Personal</option>
                <option value="professional">Professional</option>
                <option value="purpose">Life Purpose</option>
              </select>
              
              <textarea
                placeholder="Write your mission statement..."
                className="w-full h-32 p-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 resize-none"
              />
              
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false)
                    setEditingMission(null)
                  }}
                  className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-amber-600 hover:bg-amber-700 rounded-lg text-white transition-colors"
                >
                  {editingMission ? 'Update' : 'Save'} Mission
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}