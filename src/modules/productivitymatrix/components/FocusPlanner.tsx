import { useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, Target, Zap, Brain, Calendar, Plus, X } from 'lucide-react'

interface FocusSession {
  id: string
  title: string
  duration: number
  priority: 'high' | 'medium' | 'low'
  category: string
  scheduledTime?: string
  completed: boolean
}

export function FocusPlanner() {
  const [sessions, setSessions] = useState<FocusSession[]>([
    {
      id: '1',
      title: 'Deep work on project proposal',
      duration: 120,
      priority: 'high',
      category: 'Work',
      scheduledTime: '09:00',
      completed: false
    },
    {
      id: '2',
      title: 'Review quarterly goals',
      duration: 60,
      priority: 'medium',
      category: 'Planning',
      scheduledTime: '14:00',
      completed: false
    }
  ])

  const [newSession, setNewSession] = useState<{
    title: string
    duration: number
    priority: FocusSession['priority']
    category: string
  }>({
    title: '',
    duration: 60,
    priority: 'medium',
    category: 'Work'
  })

  const [showAddForm, setShowAddForm] = useState(false)

  const priorityColors: Record<string, string> = {
    high: 'bg-red-500/20 border-red-500/30 text-red-300',
    medium: 'bg-yellow-500/20 border-yellow-500/30 text-yellow-300',
    low: 'bg-green-500/20 border-green-500/30 text-green-300'
  }

  const addSession = () => {
    if (!newSession.title) return

    const session: FocusSession = {
      ...newSession,
      id: Date.now().toString(),
      completed: false
    }

    setSessions([...sessions, session])
    setNewSession({ title: '', duration: 60, priority: 'medium', category: 'Work' })
    setShowAddForm(false)
  }

  const toggleCompletion = (id: string) => {
    setSessions(sessions.map(session =>
      session.id === id ? { ...session, completed: !session.completed } : session
    ))
  }

  const removeSession = (id: string) => {
    setSessions(sessions.filter(session => session.id !== id))
  }

  const totalPlannedTime = sessions.reduce((total, session) => total + session.duration, 0)
  const completedTime = sessions.filter(s => s.completed).reduce((total, session) => total + session.duration, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Focus Planner</h2>
          <p className="text-slate-400">Plan and track your deep focus sessions</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Session
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
          <div className="flex items-center gap-3">
            <Clock className="w-8 h-8 text-blue-400" />
            <div>
              <p className="text-sm text-slate-400">Total Planned</p>
              <p className="text-xl font-semibold text-white">{Math.floor(totalPlannedTime / 60)}h {totalPlannedTime % 60}m</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
          <div className="flex items-center gap-3">
            <Target className="w-8 h-8 text-green-400" />
            <div>
              <p className="text-sm text-slate-400">Completed</p>
              <p className="text-xl font-semibold text-white">{Math.floor(completedTime / 60)}h {completedTime % 60}m</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
          <div className="flex items-center gap-3">
            <Zap className="w-8 h-8 text-yellow-400" />
            <div>
              <p className="text-sm text-slate-400">Focus Score</p>
              <p className="text-xl font-semibold text-white">{totalPlannedTime > 0 ? Math.round((completedTime / totalPlannedTime) * 100) : 0}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Session List */}
      <div className="space-y-4">
        {sessions.map((session) => (
          <motion.div
            key={session.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 border rounded-lg ${priorityColors[session.priority]} ${
              session.completed ? 'opacity-50' : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={session.completed}
                  onChange={() => toggleCompletion(session.id)}
                  className="w-5 h-5 rounded border-slate-600 bg-slate-700 text-blue-500 focus:ring-blue-500"
                />
                <div>
                  <h3 className={`font-medium ${session.completed ? 'line-through' : ''}`}>
                    {session.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm opacity-75">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {session.duration}min
                    </span>
                    <span>{session.category}</span>
                    {session.scheduledTime && (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {session.scheduledTime}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <button
                onClick={() => removeSession(session.id)}
                className="p-1 hover:bg-slate-700 rounded text-slate-400 hover:text-red-400 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}

        {sessions.length === 0 && (
          <div className="text-center py-12 text-slate-400">
            <Brain className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No focus sessions planned yet.</p>
            <p className="text-sm">Add your first session to get started!</p>
          </div>
        )}
      </div>

      {/* Add Session Form */}
      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 space-y-4"
        >
          <h3 className="text-lg font-semibold text-white">Add Focus Session</h3>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Session Title
            </label>
            <input
              type="text"
              value={newSession.title}
              onChange={(e) => setNewSession({ ...newSession, title: e.target.value })}
              placeholder="What will you focus on?"
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Duration (minutes)
              </label>
              <input
                type="number"
                value={newSession.duration}
                onChange={(e) => setNewSession({ ...newSession, duration: parseInt(e.target.value) })}
                min="15"
                max="240"
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Priority
              </label>
              <select
                value={newSession.priority}
                                 onChange={(e) => setNewSession({ ...newSession, priority: e.target.value as FocusSession['priority'] })}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Category
              </label>
              <input
                type="text"
                value={newSession.category}
                onChange={(e) => setNewSession({ ...newSession, category: e.target.value })}
                placeholder="Work, Learning, etc."
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={addSession}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Add Session
            </button>
          </div>
        </motion.div>
      )}
    </div>
  )
}