import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Clock, Edit, Trash2 } from 'lucide-react'

interface TimeBlock {
  id: string
  title: string
  startTime: string
  endTime: string
  category: 'work' | 'personal' | 'health' | 'learning'
  color: string
}

const mockTimeBlocks: TimeBlock[] = [
  {
    id: '1',
    title: 'Deep Work Session',
    startTime: '09:00',
    endTime: '11:00',
    category: 'work',
    color: 'bg-blue-500'
  },
  {
    id: '2',
    title: 'Workout',
    startTime: '11:30',
    endTime: '12:30',
    category: 'health',
    color: 'bg-emerald-500'
  },
  {
    id: '3',
    title: 'Learning Session',
    startTime: '14:00',
    endTime: '15:30',
    category: 'learning',
    color: 'bg-purple-500'
  }
]

export function TimeBlockPlanner() {
  const [timeBlocks, setTimeBlocks] = useState<TimeBlock[]>(mockTimeBlocks)
  const [showAddForm, setShowAddForm] = useState(false)

  const hours = Array.from({ length: 24 }, (_, i) => i)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">Today's Schedule</h3>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4 text-white" />
          <span className="text-white text-sm">Add Block</span>
        </button>
      </div>

      <div className="relative">
        {/* Time grid */}
        <div className="space-y-1">
          {hours.map((hour) => (
            <div key={hour} className="flex items-center h-12 border-b border-slate-700/30">
              <div className="w-16 text-xs text-slate-400">
                {hour.toString().padStart(2, '0')}:00
              </div>
              <div className="flex-1 relative">
                {/* Time blocks for this hour */}
                {timeBlocks
                  .filter(block => {
                    const startHour = parseInt(block.startTime.split(':')[0])
                    return startHour === hour
                  })
                  .map(block => (
                    <motion.div
                      key={block.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`absolute left-2 right-2 ${block.color} rounded-lg p-2 group cursor-pointer`}
                      style={{
                        height: `${(parseInt(block.endTime.split(':')[0]) - parseInt(block.startTime.split(':')[0])) * 48 - 4}px`
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white text-sm font-medium">{block.title}</p>
                          <p className="text-white/80 text-xs">
                            {block.startTime} - {block.endTime}
                          </p>
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                          <button className="p-1 hover:bg-white/20 rounded">
                            <Edit className="w-3 h-3 text-white" />
                          </button>
                          <button className="p-1 hover:bg-white/20 rounded">
                            <Trash2 className="w-3 h-3 text-white" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowAddForm(false)}
        >
          <div 
            className="glass-card rounded-xl p-6 w-96 m-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h4 className="text-lg font-semibold text-white mb-4">Add Time Block</h4>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Block title"
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="time"
                  className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                />
                <input
                  type="time"
                  className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                />
              </div>
              <select className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white">
                <option value="work">Work</option>
                <option value="personal">Personal</option>
                <option value="health">Health</option>
                <option value="learning">Learning</option>
              </select>
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors"
                >
                  Add Block
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}