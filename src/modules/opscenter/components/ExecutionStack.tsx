import { motion } from 'framer-motion'
import { ListChecks, Plus, CheckSquare, Clock, AlertCircle } from 'lucide-react'
import { useOpsCenterStore } from '../store/opsCenterStore'

export function ExecutionStack() {
  const { workflows } = useOpsCenterStore()

  const getCompletionPercentage = (workflow: any) => {
    const totalItems = workflow.steps.reduce(
      (sum: number, step: any) => sum + step.checklistItems.length, 
      0
    )
    
    const completedItems = workflow.steps.reduce(
      (sum: number, step: any) => sum + step.checklistItems.filter((item: any) => item.isCompleted).length, 
      0
    )
    
    return totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass-card rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <ListChecks className="w-5 h-5 text-amber-400" />
          <h3 className="text-xl font-semibold text-white">Execution Stack</h3>
        </div>
        <button className="flex items-center space-x-2 px-3 py-1.5 bg-amber-600 hover:bg-amber-700 rounded-lg transition-colors">
          <Plus className="w-4 h-4 text-white" />
          <span className="text-white text-sm">New Workflow</span>
        </button>
      </div>

      {/* Active Workflows */}
      <div className="space-y-4">
        {workflows.filter(w => w.isActive).map((workflow, index) => {
          const completionPercentage = getCompletionPercentage(workflow)
          
          return (
            <motion.div
              key={workflow.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              className="p-4 bg-slate-800/30 rounded-lg"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-sm font-medium text-white">{workflow.name}</h4>
                  <p className="text-xs text-slate-400">{workflow.description}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs px-2 py-1 rounded bg-amber-600/20 text-amber-400">
                    {workflow.category}
                  </span>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mb-3">
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>Completion</span>
                  <span>{completionPercentage}%</span>
                </div>
                <div className="bg-slate-700 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${completionPercentage}%` }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.8 }}
                    className="bg-gradient-to-r from-amber-500 to-amber-400 h-2 rounded-full"
                  />
                </div>
              </div>
              
              {/* Workflow Steps */}
              <div className="space-y-2">
                {workflow.steps.slice(0, 3).map((step, stepIndex) => {
                  const completedItems = step.checklistItems.filter(item => item.isCompleted).length
                  const totalItems = step.checklistItems.length
                  
                  return (
                    <div key={step.id} className="flex items-center justify-between p-2 bg-slate-700/30 rounded">
                      <div className="flex items-center space-x-2">
                        <span className="w-5 h-5 rounded-full bg-slate-600 flex items-center justify-center text-xs text-white">
                          {step.order}
                        </span>
                        <span className="text-sm text-white">{step.name}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1 text-xs text-slate-400">
                          <CheckSquare className="w-3 h-3 text-emerald-400" />
                          <span>{completedItems}/{totalItems}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-xs text-slate-400">
                          <Clock className="w-3 h-3" />
                          <span>{step.estimatedDuration}m</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
                
                {workflow.steps.length > 3 && (
                  <div className="text-center text-xs text-slate-400">
                    +{workflow.steps.length - 3} more steps
                  </div>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Workflow Templates */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-white">Workflow Templates</h4>
          <button className="text-xs text-amber-400 hover:text-amber-300 transition-colors">
            View All
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {[
            { name: 'Project Kickoff', steps: 5, category: 'project' },
            { name: 'Content Creation', steps: 8, category: 'marketing' },
            { name: 'Client Offboarding', steps: 6, category: 'client' },
            { name: 'Website Launch', steps: 12, category: 'development' }
          ].map((template, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="p-3 bg-slate-800/30 rounded-lg cursor-pointer hover:bg-slate-800/50 transition-colors"
            >
              <h5 className="text-sm font-medium text-white mb-1">{template.name}</h5>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">{template.steps} steps</span>
                <span className="px-2 py-1 rounded bg-slate-700 text-amber-400">
                  {template.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-6 p-3 bg-amber-600/20 rounded-lg">
        <p className="text-sm text-amber-300">
          ⚡ Standardized workflows increase execution efficiency by 35% and reduce errors.
        </p>
      </div>
    </motion.div>
  )
}