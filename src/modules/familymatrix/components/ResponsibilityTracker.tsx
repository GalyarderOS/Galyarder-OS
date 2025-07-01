import { motion } from 'framer-motion'
import { CheckSquare, Plus, Clock, AlertCircle, CheckCircle, Circle } from 'lucide-react'
import { useFamilyMatrixStore } from '../store/familyMatrixStore'

export function ResponsibilityTracker() {
  const { responsibilities, familyMembers, completeResponsibility } = useFamilyMatrixStore()

  const getAssigneeName = (assigneeId: string) => {
    if (assigneeId === 'self') return 'Me'
    const member = familyMembers.find(m => m.id === assigneeId)
    return member ? member.name : 'Unknown'
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400'
      case 'medium': return 'text-amber-400'
      case 'low': return 'text-emerald-400'
      default: return 'text-slate-400'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-emerald-400'
      case 'in-progress': return 'text-blue-400'
      case 'overdue': return 'text-red-400'
      default: return 'text-slate-400'
    }
  }

  const pendingResponsibilities = responsibilities.filter(r => r.status !== 'completed')
  const completedResponsibilities = responsibilities.filter(r => r.status === 'completed')

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="glass-card rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <CheckSquare className="w-5 h-5 text-emerald-400" />
          <h3 className="text-xl font-semibold text-white">Responsibility Tracker</h3>
        </div>
        <button className="flex items-center space-x-2 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors">
          <Plus className="w-4 h-4 text-white" />
          <span className="text-white text-sm">Add Responsibility</span>
        </button>
      </div>

      {/* Responsibility Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <p className="text-lg font-bold text-white">{pendingResponsibilities.length}</p>
          <p className="text-xs text-slate-400">Pending</p>
        </div>
        
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <p className="text-lg font-bold text-white">
            {responsibilities.filter(r => r.status === 'overdue').length}
          </p>
          <p className="text-xs text-slate-400">Overdue</p>
        </div>
        
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <p className="text-lg font-bold text-white">{completedResponsibilities.length}</p>
          <p className="text-xs text-slate-400">Completed</p>
        </div>
      </div>

      {/* Pending Responsibilities */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-white">Pending Responsibilities</h4>
        {pendingResponsibilities.map((responsibility, index) => (
          <motion.div
            key={responsibility.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
            className={`p-4 rounded-lg border ${
              responsibility.status === 'overdue' 
                ? 'border-red-500/30 bg-red-500/10' 
                : 'border-slate-700 bg-slate-800/30'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start space-x-3">
                <button
                  onClick={() => completeResponsibility(responsibility.id)}
                  className="mt-0.5"
                >
                  {responsibility.status === 'completed' ? (
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-400 hover:text-emerald-400 transition-colors" />
                  )}
                </button>
                
                <div>
                  <h4 className="text-sm font-medium text-white">{responsibility.title}</h4>
                  <p className="text-xs text-slate-400">{responsibility.description}</p>
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center space-x-2">
                  <span className={`text-xs ${getPriorityColor(responsibility.priority)}`}>
                    {responsibility.priority}
                  </span>
                  <span className={`text-xs ${getStatusColor(responsibility.status)}`}>
                    {responsibility.status}
                  </span>
                </div>
                
                {responsibility.dueDate && (
                  <div className="flex items-center space-x-1 text-xs text-slate-400 mt-1">
                    <Clock className="w-3 h-3" />
                    <span>{new Date(responsibility.dueDate).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs text-slate-400">
                <span>Assignee: {getAssigneeName(responsibility.assignee)}</span>
                {responsibility.recurring && (
                  <span className="flex items-center space-x-1">
                    <AlertCircle className="w-3 h-3 text-amber-400" />
                    <span>Recurring</span>
                  </span>
                )}
              </div>
              
              <span className="text-xs px-2 py-1 rounded bg-slate-700 text-slate-300">
                {responsibility.category}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recently Completed */}
      <div className="mt-6">
        <h4 className="text-sm font-medium text-white mb-3">Recently Completed</h4>
        <div className="space-y-2">
          {completedResponsibilities.slice(0, 3).map((responsibility, index) => (
            <motion.div
              key={responsibility.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <div>
                  <p className="text-sm font-medium text-white">{responsibility.title}</p>
                  <p className="text-xs text-slate-400">
                    {getAssigneeName(responsibility.assignee)}
                  </p>
                </div>
              </div>
              <span className="text-xs text-slate-400">
                {new Date(responsibility.updatedAt).toLocaleDateString()}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-6 p-3 bg-emerald-600/20 rounded-lg">
        <p className="text-sm text-emerald-300">
          ✅ Family responsibilities are 75% on track. 2 items need attention this week.
        </p>
      </div>
    </motion.div>
  )
}