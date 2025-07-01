import { motion } from 'framer-motion'
import { Clock, AlertTriangle, CheckCircle, Plus } from 'lucide-react'
import { useNetworkStore } from '../store/networkStore'

export function FollowUpPlanner() {
  const { followUps, contacts, completeFollowUp } = useNetworkStore()

  const getContactName = (contactId: string) => {
    const contact = contacts.find(c => c.id === contactId)
    return contact?.name || 'Unknown Contact'
  }

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date()
  }

  const isDueSoon = (dueDate: string) => {
    const due = new Date(dueDate)
    const threeDaysFromNow = new Date()
    threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3)
    return due <= threeDaysFromNow && due >= new Date()
  }

  const pendingFollowUps = followUps.filter(f => f.status === 'pending')
  const overdueFollowUps = pendingFollowUps.filter(f => isOverdue(f.dueDate))
  const dueSoonFollowUps = pendingFollowUps.filter(f => isDueSoon(f.dueDate) && !isOverdue(f.dueDate))
  const upcomingFollowUps = pendingFollowUps.filter(f => !isOverdue(f.dueDate) && !isDueSoon(f.dueDate))

  const priorityColors = {
    high: 'border-red-400 bg-red-400/10',
    medium: 'border-amber-400 bg-amber-400/10',
    low: 'border-emerald-400 bg-emerald-400/10'
  }

  const typeIcons = {
    email: '📧',
    call: '📞',
    meeting: '🤝',
    message: '💬',
    other: '📝'
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
          <Clock className="w-5 h-5 text-amber-400" />
          <h3 className="text-xl font-semibold text-white">Follow-Up Planner</h3>
        </div>
        <button className="flex items-center space-x-2 px-3 py-1.5 bg-amber-600 hover:bg-amber-700 rounded-lg transition-colors">
          <Plus className="w-4 h-4 text-white" />
          <span className="text-white text-sm">Add Follow-Up</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <AlertTriangle className="w-5 h-5 text-red-400 mx-auto mb-2" />
          <p className="text-lg font-bold text-white">{overdueFollowUps.length}</p>
          <p className="text-xs text-slate-400">Overdue</p>
        </div>
        
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <Clock className="w-5 h-5 text-amber-400 mx-auto mb-2" />
          <p className="text-lg font-bold text-white">{dueSoonFollowUps.length}</p>
          <p className="text-xs text-slate-400">Due Soon</p>
        </div>
        
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <CheckCircle className="w-5 h-5 text-emerald-400 mx-auto mb-2" />
          <p className="text-lg font-bold text-white">
            {followUps.filter(f => f.status === 'completed').length}
          </p>
          <p className="text-xs text-slate-400">Completed</p>
        </div>
      </div>

      {/* Overdue Follow-ups */}
      {overdueFollowUps.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-red-400 mb-4 flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4" />
            <span>Overdue Follow-ups</span>
          </h4>
          <div className="space-y-3">
            {overdueFollowUps.map((followUp, index) => (
              <motion.div
                key={followUp.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
                className={`p-4 border rounded-lg ${priorityColors[followUp.priority]} border-red-400`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-lg">{typeIcons[followUp.type]}</span>
                      <h5 className="text-sm font-medium text-white">{followUp.title}</h5>
                    </div>
                    <p className="text-xs text-slate-300 mb-2">{followUp.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-slate-400">
                      <span>with {getContactName(followUp.contactId)}</span>
                      <span className="text-red-400">
                        Due: {new Date(followUp.dueDate).toLocaleDateString()}
                      </span>
                      <span className="capitalize">{followUp.priority} priority</span>
                    </div>
                  </div>
                  <button
                    onClick={() => completeFollowUp(followUp.id)}
                    className="ml-4 p-2 hover:bg-emerald-600/20 rounded-lg transition-colors"
                  >
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Due Soon Follow-ups */}
      {dueSoonFollowUps.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-amber-400 mb-4 flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <span>Due Soon</span>
          </h4>
          <div className="space-y-3">
            {dueSoonFollowUps.map((followUp, index) => (
              <motion.div
                key={followUp.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
                className={`p-4 border rounded-lg ${priorityColors[followUp.priority]}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-lg">{typeIcons[followUp.type]}</span>
                      <h5 className="text-sm font-medium text-white">{followUp.title}</h5>
                    </div>
                    <p className="text-xs text-slate-300 mb-2">{followUp.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-slate-400">
                      <span>with {getContactName(followUp.contactId)}</span>
                      <span>Due: {new Date(followUp.dueDate).toLocaleDateString()}</span>
                      <span className="capitalize">{followUp.priority} priority</span>
                    </div>
                  </div>
                  <button
                    onClick={() => completeFollowUp(followUp.id)}
                    className="ml-4 p-2 hover:bg-emerald-600/20 rounded-lg transition-colors"
                  >
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Follow-ups */}
      {upcomingFollowUps.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-white mb-4">Upcoming Follow-ups</h4>
          <div className="space-y-2">
            {upcomingFollowUps.slice(0, 5).map((followUp, index) => (
              <motion.div
                key={followUp.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
                className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-sm">{typeIcons[followUp.type]}</span>
                  <div>
                    <p className="text-sm font-medium text-white">{followUp.title}</p>
                    <p className="text-xs text-slate-400">
                      {getContactName(followUp.contactId)} • {new Date(followUp.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => completeFollowUp(followUp.id)}
                  className="p-1 hover:bg-emerald-600/20 rounded transition-colors"
                >
                  <CheckCircle className="w-3 h-3 text-emerald-400" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {pendingFollowUps.length === 0 && (
        <div className="text-center py-8">
          <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
          <p className="text-slate-400">All caught up! No pending follow-ups.</p>
        </div>
      )}

      <div className="mt-6 p-3 bg-amber-600/20 rounded-lg">
        <p className="text-sm text-amber-300">
          ⏰ Stay on top of your network by completing follow-ups on time. Consistency builds stronger relationships!
        </p>
      </div>
    </motion.div>
  )
}