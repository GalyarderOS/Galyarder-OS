import { motion } from 'framer-motion'
import { Users, Mail, Phone, Calendar, Plus } from 'lucide-react'
import { useOpsCenterStore } from '../store/opsCenterStore'

export function ClientMatrix() {
  const { clients, projects } = useOpsCenterStore()

  const getClientStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-emerald-400'
      case 'inactive': return 'text-slate-400'
      case 'prospect': return 'text-amber-400'
      default: return 'text-slate-400'
    }
  }

  const getClientProjects = (clientId: string) => {
    return projects.filter(project => project.clients.includes(clientId))
  }

  const getDaysSinceContact = (lastContact: string) => {
    const lastDate = new Date(lastContact)
    const today = new Date()
    const diffTime = Math.abs(today.getTime() - lastDate.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
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
          <Users className="w-5 h-5 text-purple-400" />
          <h3 className="text-xl font-semibold text-white">Client Matrix</h3>
        </div>
        <button className="flex items-center space-x-2 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors">
          <Plus className="w-4 h-4 text-white" />
          <span className="text-white text-sm">Add Client</span>
        </button>
      </div>

      {/* Client Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <p className="text-lg font-bold text-white">
            {clients.filter(c => c.status === 'active').length}
          </p>
          <p className="text-xs text-slate-400">Active Clients</p>
        </div>
        
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <p className="text-lg font-bold text-white">
            {clients.filter(c => c.status === 'prospect').length}
          </p>
          <p className="text-xs text-slate-400">Prospects</p>
        </div>
        
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <p className="text-lg font-bold text-white">
            {clients.reduce((sum, client) => sum + getClientProjects(client.id).length, 0)}
          </p>
          <p className="text-xs text-slate-400">Total Projects</p>
        </div>
      </div>

      {/* Client List */}
      <div className="space-y-4">
        {clients.map((client, index) => {
          const clientProjects = getClientProjects(client.id)
          const daysSinceContact = getDaysSinceContact(client.lastContact)
          
          return (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              className="p-4 bg-slate-800/30 rounded-lg hover:bg-slate-800/50 transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="text-sm font-medium text-white">{client.name}</h4>
                    <span className={`text-xs ${getClientStatusColor(client.status)}`}>
                      {client.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{client.company}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2 text-xs text-slate-400">
                    <Calendar className="w-3 h-3" />
                    <span>
                      Last contact: {daysSinceContact} days ago
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="flex items-center space-x-2 text-xs">
                  <Mail className="w-3 h-3 text-blue-400" />
                  <span className="text-slate-300">{client.email}</span>
                </div>
                {client.phone && (
                  <div className="flex items-center space-x-2 text-xs">
                    <Phone className="w-3 h-3 text-emerald-400" />
                    <span className="text-slate-300">{client.phone}</span>
                  </div>
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs text-slate-400">
                  <span>{clientProjects.length} projects</span>
                  {client.nextContact && (
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3 text-amber-400" />
                      <span>Next contact: {new Date(client.nextContact).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {client.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className="mt-6 p-3 bg-purple-600/20 rounded-lg">
        <p className="text-sm text-purple-300">
          🤝 2 clients need follow-up this week. Schedule time for relationship maintenance.
        </p>
      </div>
    </motion.div>
  )
}