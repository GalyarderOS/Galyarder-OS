import { motion } from 'framer-motion'
import { Users, Star, TrendingUp, Plus } from 'lucide-react'
import { useNetworkStore } from '../store/networkStore'

export function StrategicContactMap() {
  const { contacts, interactions } = useNetworkStore()

  const getContactInteractionCount = (contactId: string) => {
    return interactions.filter(i => i.contactId === contactId).length
  }

  const getLastInteractionDate = (contactId: string) => {
    const contactInteractions = interactions
      .filter(i => i.contactId === contactId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    
    return contactInteractions.length > 0 ? contactInteractions[0].date : null
  }

  const getDaysSinceLastContact = (contactId: string) => {
    const lastDate = getLastInteractionDate(contactId)
    if (!lastDate) return Infinity
    
    const daysDiff = Math.floor(
      (new Date().getTime() - new Date(lastDate).getTime()) / (1000 * 60 * 60 * 24)
    )
    return daysDiff
  }

  const categoryColors = {
    professional: 'text-blue-400',
    personal: 'text-emerald-400',
    mentor: 'text-purple-400',
    client: 'text-amber-400',
    vendor: 'text-pink-400'
  }

  const relationshipColors = {
    strong: 'border-emerald-400 bg-emerald-400/10',
    medium: 'border-amber-400 bg-amber-400/10',
    weak: 'border-slate-400 bg-slate-400/10'
  }

  const strongContacts = contacts.filter(c => c.relationship === 'strong')
  const needsAttention = contacts.filter(c => getDaysSinceLastContact(c.id) > 30)
  const recentlyContacted = contacts.filter(c => getDaysSinceLastContact(c.id) <= 7)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass-card rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Users className="w-5 h-5 text-purple-400" />
          <h3 className="text-xl font-semibold text-white">Strategic Contact Map</h3>
        </div>
        <button className="flex items-center space-x-2 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors">
          <Plus className="w-4 h-4 text-white" />
          <span className="text-white text-sm">Add Contact</span>
        </button>
      </div>

      {/* Network Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <Users className="w-5 h-5 text-blue-400 mx-auto mb-2" />
          <p className="text-lg font-bold text-white">{contacts.length}</p>
          <p className="text-xs text-slate-400">Total Contacts</p>
        </div>
        
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <Star className="w-5 h-5 text-emerald-400 mx-auto mb-2" />
          <p className="text-lg font-bold text-white">{strongContacts.length}</p>
          <p className="text-xs text-slate-400">Strong Relationships</p>
        </div>
        
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <TrendingUp className="w-5 h-5 text-amber-400 mx-auto mb-2" />
          <p className="text-lg font-bold text-white">{recentlyContacted.length}</p>
          <p className="text-xs text-slate-400">Recent Contact</p>
        </div>
        
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <div className="w-5 h-5 bg-red-400 rounded-full mx-auto mb-2" />
          <p className="text-lg font-bold text-white">{needsAttention.length}</p>
          <p className="text-xs text-slate-400">Needs Attention</p>
        </div>
      </div>

      {/* Key Contacts */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-white mb-4">Key Contacts</h4>
        <div className="space-y-3">
          {strongContacts.slice(0, 5).map((contact, index) => (
            <motion.div
              key={contact.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              className={`p-4 border rounded-lg ${relationshipColors[contact.relationship]}`}
            >
              <div className="flex items-center space-x-4">
                {contact.avatar ? (
                  <img
                    src={contact.avatar}
                    alt={contact.name}
                    className="w-12 h-12 rounded-full ring-2 ring-slate-600"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {contact.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                )}
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h5 className="text-sm font-medium text-white">{contact.name}</h5>
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs ${categoryColors[contact.category]}`}>
                        {contact.category}
                      </span>
                      <span className="text-xs text-slate-400">
                        {getContactInteractionCount(contact.id)} interactions
                      </span>
                    </div>
                  </div>
                  
                  {contact.position && contact.company && (
                    <p className="text-xs text-slate-400 mb-1">
                      {contact.position} at {contact.company}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-slate-400">
                      Last contact: {getDaysSinceLastContact(contact.id) === Infinity 
                        ? 'Never' 
                        : `${getDaysSinceLastContact(contact.id)} days ago`}
                    </p>
                    <div className="flex items-center space-x-1">
                      {contact.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Contacts Needing Attention */}
      {needsAttention.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-red-400 mb-4">Contacts Needing Attention</h4>
          <div className="space-y-2">
            {needsAttention.slice(0, 3).map((contact, index) => (
              <motion.div
                key={contact.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
                className="flex items-center justify-between p-3 bg-red-600/10 border border-red-600/20 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  {contact.avatar ? (
                    <img
                      src={contact.avatar}
                      alt={contact.name}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xs">
                        {contact.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium text-white">{contact.name}</p>
                    <p className="text-xs text-slate-400">
                      {getDaysSinceLastContact(contact.id)} days since last contact
                    </p>
                  </div>
                </div>
                <button className="text-xs text-red-400 hover:text-red-300 transition-colors">
                  Reach out
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Network Categories */}
      <div>
        <h4 className="text-sm font-medium text-white mb-4">Network Breakdown</h4>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(categoryColors).map(([category, color]) => {
            const count = contacts.filter(c => c.category === category).length
            return (
              <div key={category} className="flex items-center justify-between p-2 bg-slate-800/30 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full bg-current ${color}`} />
                  <span className="text-xs text-slate-300 capitalize">{category}</span>
                </div>
                <span className="text-xs text-white font-medium">{count}</span>
              </div>
            )
          })}
        </div>
      </div>

      <div className="mt-6 p-3 bg-purple-600/20 rounded-lg">
        <p className="text-sm text-purple-300">
          🎯 Focus on strengthening relationships with contacts you haven't reached out to in 30+ days.
        </p>
      </div>
    </motion.div>
  )
}