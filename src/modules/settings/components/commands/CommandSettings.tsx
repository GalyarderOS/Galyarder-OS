import { useState } from 'react'
import { motion } from 'framer-motion'
import { Command, Plus, Edit, Trash2, Check, X, Terminal, Zap, ArrowRight, Maximize, Search, Grid } from 'lucide-react'
import { useSettingsStore } from '../../../../lib/stores/useSettingsStore'
import { allModules, iconMap } from '../../../../data/modules'

export function CommandSettings() {
  const { commands, addCustomCommand, updateCustomCommand, deleteCustomCommand, toggleModuleInSearch } = useSettingsStore()
  const [showAddCommandModal, setShowAddCommandModal] = useState(false)
  const [editingCommandId, setEditingCommandId] = useState<string | null>(null)
  const [commandForm, setCommandForm] = useState({
    command: '',
    label: '',
    actionType: 'navigate' as 'navigate' | 'openModal' | 'triggerHook',
    path: '',
    modal: '',
    hook: ''
  })
  const [formError, setFormError] = useState('')

  const handleAddCommand = () => {
    setCommandForm({
      command: '',
      label: '',
      actionType: 'navigate',
      path: '',
      modal: '',
      hook: ''
    })
    setFormError('')
    setShowAddCommandModal(true)
    setEditingCommandId(null)
  }

  const handleEditCommand = (command: any) => {
    setCommandForm({
      command: command.command,
      label: command.label,
      actionType: command.actionType,
      path: command.actionType === 'navigate' ? command.payload?.path || '' : '',
      modal: command.actionType === 'openModal' ? command.payload?.modal || '' : '',
      hook: command.actionType === 'triggerHook' ? command.payload?.hook || '' : ''
    })
    setFormError('')
    setShowAddCommandModal(true)
    setEditingCommandId(command.id)
  }

  const handleSaveCommand = () => {
    // Validate form
    if (!commandForm.command.trim()) {
      setFormError('Command is required')
      return
    }
    
    if (!commandForm.label.trim()) {
      setFormError('Label is required')
      return
    }
    
    // Validate action type specific fields
    if (commandForm.actionType === 'navigate' && !commandForm.path.trim()) {
      setFormError('Path is required for navigation actions')
      return
    }
    
    if (commandForm.actionType === 'openModal' && !commandForm.modal.trim()) {
      setFormError('Modal name is required for modal actions')
      return
    }
    
    if (commandForm.actionType === 'triggerHook' && !commandForm.hook.trim()) {
      setFormError('Hook name is required for hook actions')
      return
    }
    
    // Create payload based on action type
    let payload: any = {}
    
    if (commandForm.actionType === 'navigate') {
      payload = { path: commandForm.path }
    } else if (commandForm.actionType === 'openModal') {
      payload = { modal: commandForm.modal }
    } else if (commandForm.actionType === 'triggerHook') {
      payload = { hook: commandForm.hook }
    }
    
    // Add or update command
    if (editingCommandId) {
      updateCustomCommand(editingCommandId, {
        command: commandForm.command,
        label: commandForm.label,
        actionType: commandForm.actionType,
        payload
      })
    } else {
      addCustomCommand({
        command: commandForm.command,
        label: commandForm.label,
        actionType: commandForm.actionType,
        payload
      })
    }
    
    // Close modal
    setShowAddCommandModal(false)
    setEditingCommandId(null)
  }

  const handleToggleModule = (moduleId: string, enabled: boolean) => {
    toggleModuleInSearch(moduleId, enabled)
  }

  return (
    <div className="space-y-6">
      {/* Custom Commands */}
      <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Command className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-medium text-white">Custom Commands</h3>
          </div>
          <button
            onClick={handleAddCommand}
            className="flex items-center space-x-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4 text-white" />
            <span className="text-white text-sm">Add Command</span>
          </button>
        </div>
        
        <div className="space-y-4">
          {commands.customCommands.length === 0 ? (
            <div className="text-center py-8">
              <Terminal className="w-12 h-12 text-slate-500 mx-auto mb-4" />
              <p className="text-slate-400 mb-2">No custom commands yet</p>
              <p className="text-sm text-slate-500 mb-4">Create commands to quickly access features</p>
              <button
                onClick={handleAddCommand}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors inline-flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Your First Command</span>
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {commands.customCommands.map((command) => (
                <div
                  key={command.id}
                  className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center">
                      {command.actionType === 'navigate' ? (
                        <ArrowRight className="w-5 h-5 text-blue-400" />
                      ) : command.actionType === 'openModal' ? (
                        <Maximize className="w-5 h-5 text-purple-400" />
                      ) : (
                        <Zap className="w-5 h-5 text-amber-400" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{command.label}</p>
                      <p className="text-xs font-mono bg-slate-800 px-1.5 py-0.5 rounded text-slate-300 inline-block">
                        {command.command}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEditCommand(command)}
                      className="p-2 hover:bg-slate-600 rounded-lg transition-colors"
                    >
                      <Edit className="w-4 h-4 text-slate-400 hover:text-white" />
                    </button>
                    <button
                      onClick={() => deleteCustomCommand(command.id)}
                      className="p-2 hover:bg-red-600/20 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-slate-400 hover:text-red-400" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Command Palette Settings */}
      <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-6">
        <h3 className="text-lg font-medium text-white mb-4 flex items-center space-x-2">
          <Search className="w-5 h-5 text-purple-400" />
          <span>Command Palette</span>
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white">Keyboard Shortcut</p>
              <p className="text-xs text-slate-400">Open command palette with keyboard</p>
            </div>
            <div className="flex items-center space-x-1">
              <span className="px-2 py-1 bg-slate-700 rounded text-xs text-white font-mono">Ctrl</span>
              <span className="text-slate-400">+</span>
              <span className="px-2 py-1 bg-slate-700 rounded text-xs text-white font-mono">K</span>
            </div>
          </div>
          
          <div>
            <p className="text-sm font-medium text-white mb-2">Modules in Search</p>
            <p className="text-xs text-slate-400 mb-3">Select which modules appear in command palette results</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 max-h-64 overflow-y-auto p-1">
              {allModules.map((module) => {
                const ModuleIcon = iconMap[module.icon as keyof typeof iconMap] || Grid
                const isEnabled = commands.enabledModules.includes(module.id)
                
                return (
                  <div
                    key={module.id}
                    className="flex items-center justify-between p-2 bg-slate-700/30 rounded-lg"
                  >
                    <div className="flex items-center space-x-2">
                      <ModuleIcon className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-white">{module.name}</span>
                    </div>
                    <button 
                      onClick={() => handleToggleModule(module.id, !isEnabled)}
                      className={`w-8 h-4 ${isEnabled ? 'bg-blue-600' : 'bg-slate-600'} rounded-full relative transition-colors`}
                    >
                      <div 
                        className={`w-3 h-3 bg-white rounded-full absolute top-0.5 transition-transform ${
                          isEnabled ? 'right-0.5' : 'left-0.5'
                        }`} 
                      />
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-6">
        <h3 className="text-lg font-medium text-white mb-4 flex items-center space-x-2">
          <Zap className="w-5 h-5 text-amber-400" />
          <span>Quick Actions</span>
        </h3>
        
        <div className="space-y-4">
          <p className="text-sm text-slate-300">
            Quick actions are available throughout the system for fast access to common tasks.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 bg-slate-700/30 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-white">Add Expense</p>
                <span className="text-xs bg-blue-600/20 text-blue-400 px-2 py-0.5 rounded">Finance</span>
              </div>
              <p className="text-xs text-slate-400 mb-2">Quickly log a new expense</p>
              <div className="flex items-center space-x-1 text-xs">
                <span className="px-1.5 py-0.5 bg-slate-700 rounded text-slate-300 font-mono">Alt</span>
                <span className="text-slate-400">+</span>
                <span className="px-1.5 py-0.5 bg-slate-700 rounded text-slate-300 font-mono">E</span>
              </div>
            </div>
            
            <div className="p-3 bg-slate-700/30 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-white">Start Focus Mode</p>
                <span className="text-xs bg-purple-600/20 text-purple-400 px-2 py-0.5 rounded">Productivity</span>
              </div>
              <p className="text-xs text-slate-400 mb-2">Begin a focused work session</p>
              <div className="flex items-center space-x-1 text-xs">
                <span className="px-1.5 py-0.5 bg-slate-700 rounded text-slate-300 font-mono">Alt</span>
                <span className="text-slate-400">+</span>
                <span className="px-1.5 py-0.5 bg-slate-700 rounded text-slate-300 font-mono">F</span>
              </div>
            </div>
            
            <div className="p-3 bg-slate-700/30 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-white">Log Workout</p>
                <span className="text-xs bg-red-600/20 text-red-400 px-2 py-0.5 rounded">Health</span>
              </div>
              <p className="text-xs text-slate-400 mb-2">Record a new workout session</p>
              <div className="flex items-center space-x-1 text-xs">
                <span className="px-1.5 py-0.5 bg-slate-700 rounded text-slate-300 font-mono">Alt</span>
                <span className="text-slate-400">+</span>
                <span className="px-1.5 py-0.5 bg-slate-700 rounded text-slate-300 font-mono">W</span>
              </div>
            </div>
            
            <div className="p-3 bg-slate-700/30 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-white">Add Time Block</p>
                <span className="text-xs bg-emerald-600/20 text-emerald-400 px-2 py-0.5 rounded">Time</span>
              </div>
              <p className="text-xs text-slate-400 mb-2">Schedule a new time block</p>
              <div className="flex items-center space-x-1 text-xs">
                <span className="px-1.5 py-0.5 bg-slate-700 rounded text-slate-300 font-mono">Alt</span>
                <span className="text-slate-400">+</span>
                <span className="px-1.5 py-0.5 bg-slate-700 rounded text-slate-300 font-mono">T</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add/Edit Command Modal */}
      {showAddCommandModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-800 border border-slate-700 rounded-xl p-6 w-full max-w-md mx-4"
          >
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
              <Command className="w-5 h-5 text-blue-400" />
              <span>{editingCommandId ? 'Edit Command' : 'Add Command'}</span>
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-300 mb-1">
                  Command
                </label>
                <input
                  type="text"
                  value={commandForm.command}
                  onChange={(e) => setCommandForm({ ...commandForm, command: e.target.value })}
                  placeholder="/command-name"
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 
                           rounded-lg text-white placeholder-slate-500 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-xs text-slate-400 mt-1">
                  Start with / for slash commands (e.g., /finance)
                </p>
              </div>
              
              <div>
                <label className="block text-sm text-slate-300 mb-1">
                  Label
                </label>
                <input
                  type="text"
                  value={commandForm.label}
                  onChange={(e) => setCommandForm({ ...commandForm, label: e.target.value })}
                  placeholder="Human-readable label"
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 
                           rounded-lg text-white placeholder-slate-500 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm text-slate-300 mb-1">
                  Action Type
                </label>
                <select
                  value={commandForm.actionType}
                  onChange={(e) => setCommandForm({ 
                    ...commandForm, 
                    actionType: e.target.value as any 
                  })}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 
                           rounded-lg text-white 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="navigate">Navigate to Page</option>
                  <option value="openModal">Open Modal</option>
                  <option value="triggerHook">Trigger Action</option>
                </select>
              </div>
              
              {/* Conditional fields based on action type */}
              {commandForm.actionType === 'navigate' && (
                <div>
                  <label className="block text-sm text-slate-300 mb-1">
                    Path
                  </label>
                  <input
                    type="text"
                    value={commandForm.path}
                    onChange={(e) => setCommandForm({ ...commandForm, path: e.target.value })}
                    placeholder="/app/dashboard"
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 
                             rounded-lg text-white placeholder-slate-500 
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              )}
              
              {commandForm.actionType === 'openModal' && (
                <div>
                  <label className="block text-sm text-slate-300 mb-1">
                    Modal Name
                  </label>
                  <input
                    type="text"
                    value={commandForm.modal}
                    onChange={(e) => setCommandForm({ ...commandForm, modal: e.target.value })}
                    placeholder="addExpense"
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 
                             rounded-lg text-white placeholder-slate-500 
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              )}
              
              {commandForm.actionType === 'triggerHook' && (
                <div>
                  <label className="block text-sm text-slate-300 mb-1">
                    Hook Name
                  </label>
                  <input
                    type="text"
                    value={commandForm.hook}
                    onChange={(e) => setCommandForm({ ...commandForm, hook: e.target.value })}
                    placeholder="startFocusMode"
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 
                             rounded-lg text-white placeholder-slate-500 
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              )}
              
              {formError && (
                <div className="text-red-400 text-sm">
                  {formError}
                </div>
              )}
              
              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddCommandModal(false)}
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveCommand}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center space-x-2"
                >
                  <Check className="w-4 h-4" />
                  <span>{editingCommandId ? 'Update' : 'Add'} Command</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}