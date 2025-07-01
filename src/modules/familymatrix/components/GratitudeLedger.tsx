import { motion } from 'framer-motion'
import { Heart, Plus, Calendar, Share2, Tag } from 'lucide-react'
import { useFamilyMatrixStore } from '../store/familyMatrixStore'

export function GratitudeLedger() {
  const { gratitudeEntries, familyMembers } = useFamilyMatrixStore()

  const getRecipientName = (recipientId: string) => {
    const member = familyMembers.find(m => m.id === recipientId)
    return member ? member.name : recipientId
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      'support': 'text-emerald-400',
      'achievement': 'text-blue-400',
      'kindness': 'text-pink-400',
      'growth': 'text-purple-400',
      'presence': 'text-amber-400'
    }
    return colors[category as keyof typeof colors] || 'text-slate-400'
  }

  const todayEntries = gratitudeEntries.filter(entry => {
    const entryDate = new Date(entry.date).toDateString()
    const today = new Date().toDateString()
    return entryDate === today
  })

  const weeklyEntries = gratitudeEntries.filter(entry => {
    const entryDate = new Date(entry.date)
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)
    return entryDate >= weekAgo
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass-card rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Heart className="w-5 h-5 text-pink-400" />
          <h3 className="text-xl font-semibold text-white">Gratitude Ledger</h3>
        </div>
        <button className="flex items-center space-x-2 px-3 py-1.5 bg-pink-600 hover:bg-pink-700 rounded-lg transition-colors">
          <Plus className="w-4 h-4 text-white" />
          <span className="text-white text-sm">Express Gratitude</span>
        </button>
      </div>

      {/* Gratitude Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <p className="text-lg font-bold text-white">{todayEntries.length}</p>
          <p className="text-xs text-slate-400">Today</p>
        </div>
        
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <p className="text-lg font-bold text-white">{weeklyEntries.length}</p>
          <p className="text-xs text-slate-400">This Week</p>
        </div>
      </div>

      {/* Gratitude Entries */}
      <div className="space-y-4">
        {gratitudeEntries.map((entry, index) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
            className="p-4 bg-slate-800/30 rounded-lg"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="text-sm font-medium text-white">
                    To: {getRecipientName(entry.recipient)}
                  </h4>
                  {entry.isShared && (
                    <Share2 className="w-3 h-3 text-blue-400" />
                  )}
                </div>
                <div className="flex items-center space-x-2 text-xs text-slate-400">
                  <Calendar className="w-3 h-3" />
                  <span>{new Date(entry.date).toLocaleDateString()}</span>
                  <span className={`${getCategoryColor(entry.category)}`}>
                    {entry.category}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="p-3 bg-pink-600/10 border-l-2 border-pink-500 rounded mb-3">
              <p className="text-sm text-pink-200 italic">"{entry.content}"</p>
            </div>
            
            <div className="flex flex-wrap gap-1">
              {entry.tags.map(tag => (
                <span key={tag} className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded flex items-center space-x-1">
                  <Tag className="w-2 h-2" />
                  <span>{tag}</span>
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 p-3 bg-pink-600/20 rounded-lg">
        <p className="text-sm text-pink-300">
          ❤️ Expressing gratitude strengthens family bonds and increases overall happiness.
        </p>
      </div>
    </motion.div>
  )
}