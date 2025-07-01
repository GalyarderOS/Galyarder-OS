import { motion } from 'framer-motion'
import { Plus, MessageCircle, Phone, Mail, Calendar, MapPin } from 'lucide-react'
import { useNetworkStore } from '../store/networkStore'

export function InteractionLog() {
  const { interactions, contacts } = useNetworkStore()

  const getContactName = (contactId: string) => {
    const contact = contacts.find(c => c.id === contactId)
    return contact?.name || 'Unknown Contact'
  }

  const typeIcons = {
    meeting: Calendar,
    call: Phone,
    email: Mail,
    message: MessageCircle,
    event: Calendar,
    other: MessageCircle
  }

  const outcomeColors = {
    positive: 'text-emerald-400',
    neutral: 'text-slate-400',
    negative: 'text-red-400'
  }

  const recentInteractions = interactions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <MessageCircle className="w-5 h-5 text-blue-400" />
          <h3 className="text-xl font-semibold text-white">Interaction Log</h3>
        </div>
        <button className="flex items-center space-x-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
          <Plus className="w-4 h-4 text-white" />
          <span className="text-white text-sm">Log Interaction</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <p className="text-lg font-bold text-white">{interactions.length}</p>
          <p className="text-xs text-slate-400">Total Interactions</p>
        </div>
        
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <p className="text-lg font-bold text-white">
            {interactions.filter(i => {
              const weekAgo = new Date()
              weekAgo.setDate(weekAgo.getDate() - 7)
              return new Date(i.date) >= weekAgo
            }).length}
          </p>
          <p className="text-xs text-slate-400">This Week</p>
        </div>
        
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <p className="text-lg font-bold text-white">
            {Math.round((interactions.filter(i => i.outcome === 'positive').length / interactions.length) * 100)}%
          </p>
          <p className="text-xs text-slate-400">Positive</p>
        </div>
      </div>

      {/* Recent Interactions */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-white">Recent Interactions</h4>
        {recentInteractions.map((interaction, index) => {
          const TypeIcon = typeIcons[interaction.type]
          
          return (
            <motion.div
              key={interaction.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              className="p-4 bg-slate-800/30 rounded-lg hover:bg-slate-800/50 transition-colors"
            >
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-slate-700/50 rounded-lg">
                  <TypeIcon className="w-4 h-4 text-blue-400" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="text-sm font-medium text-white">{interaction.subject}</h5>
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs ${outcomeColors[interaction.outcome]}`}>
                        {interaction.outcome}
                      </span>
                      <span className="text-xs text-slate-400">
                        {new Date(interaction.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-xs text-slate-400 mb-2">
                    with {getContactName(interaction.contactId)}
                  </p>
                  
                  <p className="text-sm text-slate-300 mb-2">{interaction.description}</p>
                  
                  <div className="flex items-center space-x-4 text-xs text-slate-400">
                    <span className="capitalize">{interaction.type}</span>
                    {interaction.duration && (
                      <span>{interaction.duration} min</span>
                    )}
                    {interaction.location && (
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{interaction.location}</span>
                      </div>
                    )}
                    {interaction.followUpRequired && (
                      <span className="text-amber-400">Follow-up required</span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Interaction Types Breakdown */}
      <div className="mt-6">
        <h4 className="text-sm font-medium text-white mb-4">Interaction Types</h4>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(typeIcons).map(([type, Icon]) => {
            const count = interactions.filter(i => i.type === type).length
            return (
              <div key={type} className="flex items-center justify-between p-2 bg-slate-800/30 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Icon className="w-3 h-3 text-blue-400" />
                  <span className="text-xs text-slate-300 capitalize">{type}</span>
                </div>
                <span className="text-xs text-white font-medium">{count}</span>
              </div>
            )
          })}
        </div>
      </div>

      <div className="mt-6 p-3 bg-blue-600/20 rounded-lg">
        <p className="text-sm text-blue-300">
          📊 You're averaging {Math.round(interactions.length / 4)} interactions per week. Great networking momentum!
        </p>
      </div>
    </motion.div>
  )
}