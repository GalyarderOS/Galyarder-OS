import { motion } from 'framer-motion'
import { Briefcase, Plus, Clock, Users, Tag, CheckCircle } from 'lucide-react'
import { useOpsCenterStore } from '../store/opsCenterStore'

export function ProjectBoard() {
  const { projects } = useOpsCenterStore()

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning': return 'bg-blue-400/20 text-blue-400'
      case 'active': return 'bg-emerald-400/20 text-emerald-400'
      case 'paused': return 'bg-amber-400/20 text-amber-400'
      case 'completed': return 'bg-purple-400/20 text-purple-400'
      case 'archived': return 'bg-slate-400/20 text-slate-400'
      default: return 'bg-slate-400/20 text-slate-400'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-400/20 text-red-400'
      case 'high': return 'bg-amber-400/20 text-amber-400'
      case 'medium': return 'bg-blue-400/20 text-blue-400'
      case 'low': return 'bg-emerald-400/20 text-emerald-400'
      default: return 'bg-slate-400/20 text-slate-400'
    }
  }

  const activeProjects = projects.filter(p => p.status === 'active')
  const planningProjects = projects.filter(p => p.status === 'planning')
  const completedProjects = projects.filter(p => p.status === 'completed')

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Briefcase className="w-5 h-5 text-blue-400" />
          <h3 className="text-xl font-semibold text-white">Project Board</h3>
        </div>
        <button className="flex items-center space-x-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
          <Plus className="w-4 h-4 text-white" />
          <span className="text-white text-sm">New Project</span>
        </button>
      </div>

      {/* Project Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <p className="text-lg font-bold text-white">{activeProjects.length}</p>
          <p className="text-xs text-slate-400">Active Projects</p>
        </div>
        
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <p className="text-lg font-bold text-white">{planningProjects.length}</p>
          <p className="text-xs text-slate-400">Planning</p>
        </div>
        
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <p className="text-lg font-bold text-white">{completedProjects.length}</p>
          <p className="text-xs text-slate-400">Completed</p>
        </div>
      </div>

      {/* Project List */}
      <div className="space-y-4">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
            className="p-4 bg-slate-800/30 rounded-lg hover:bg-slate-800/50 transition-colors cursor-pointer"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="text-sm font-medium text-white">{project.name}</h4>
                  <span className={`text-xs px-2 py-1 rounded ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded ${getPriorityColor(project.priority)}`}>
                    {project.priority}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mb-2">{project.description}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-2 text-xs text-slate-400">
                  <Clock className="w-3 h-3" />
                  <span>
                    {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mb-3">
              <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>Progress</span>
                <span>{project.progress}%</span>
              </div>
              <div className="bg-slate-700 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${project.progress}%` }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.8 }}
                  className="bg-gradient-to-r from-blue-500 to-blue-400 h-2 rounded-full"
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-xs text-slate-400">
                <div className="flex items-center space-x-1">
                  <CheckCircle className="w-3 h-3 text-emerald-400" />
                  <span>{project.tasks.length} tasks</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-3 h-3 text-blue-400" />
                  <span>{project.team.length} team members</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {project.tags.slice(0, 2).map(tag => (
                  <span key={tag} className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded flex items-center space-x-1">
                    <Tag className="w-2 h-2" />
                    <span>{tag}</span>
                  </span>
                ))}
                {project.tags.length > 2 && (
                  <span className="text-xs text-slate-400">+{project.tags.length - 2}</span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 p-3 bg-blue-600/20 rounded-lg">
        <p className="text-sm text-blue-300">
          📊 Project health is good. Focus on Website Redesign to maintain timeline.
        </p>
      </div>
    </motion.div>
  )
}