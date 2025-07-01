import { motion } from 'framer-motion'
import { Calendar, TrendingUp } from 'lucide-react'

// Generate mock data for the last 12 weeks
const generateHeatmapData = () => {
  const data = []
  const today = new Date()
  
  for (let week = 11; week >= 0; week--) {
    for (let day = 0; day < 7; day++) {
      const date = new Date(today)
      date.setDate(date.getDate() - (week * 7 + (6 - day)))
      
      const activity = Math.floor(Math.random() * 5) // 0-4 activity levels
      data.push({
        date: date.toISOString().split('T')[0],
        activity,
        day: date.getDay()
      })
    }
  }
  
  return data
}

const heatmapData = generateHeatmapData()
const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const getActivityColor = (level: number) => {
  const colors = [
    'bg-slate-800', // 0 - no activity
    'bg-emerald-900/50', // 1 - low
    'bg-emerald-700/70', // 2 - medium
    'bg-emerald-500/80', // 3 - high
    'bg-emerald-400' // 4 - very high
  ]
  return colors[level] || colors[0]
}

export function SnapshotHeatmap() {
  const totalActiveDays = heatmapData.filter(d => d.activity > 0).length
  const currentStreak = 7 // Mock current streak

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="glass-card rounded-xl p-6"
    >
      <div className="flex items-center space-x-3 mb-6">
        <Calendar className="w-5 h-5 text-cyan-400" />
        <h3 className="text-xl font-semibold text-white">Activity Heatmap</h3>
      </div>

      <div className="mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-800/50 rounded-lg p-3 text-center">
            <TrendingUp className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
            <p className="text-lg font-bold text-white">{totalActiveDays}</p>
            <p className="text-xs text-slate-400">Active Days</p>
          </div>
          
          <div className="bg-slate-800/50 rounded-lg p-3 text-center">
            <div className="w-4 h-4 bg-emerald-400 rounded mx-auto mb-1" />
            <p className="text-lg font-bold text-white">{currentStreak}</p>
            <p className="text-xs text-slate-400">Day Streak</p>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekdays.map(day => (
            <div key={day} className="text-xs text-slate-400 text-center">
              {day[0]}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: 12 }).map((_, weekIndex) => (
            weekdays.map((_, dayIndex) => {
              const dataIndex = weekIndex * 7 + dayIndex
              const dayData = heatmapData[dataIndex]
              
              return (
                <motion.div
                  key={`${weekIndex}-${dayIndex}`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: (weekIndex * 7 + dayIndex) * 0.01 }}
                  className={`w-3 h-3 rounded-sm ${getActivityColor(dayData?.activity || 0)} hover:ring-1 hover:ring-emerald-400 transition-all cursor-pointer`}
                  title={`${dayData?.date}: ${dayData?.activity || 0} activities`}
                />
              )
            })
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
        <span>Less</span>
        <div className="flex space-x-1">
          {[0, 1, 2, 3, 4].map(level => (
            <div
              key={level}
              className={`w-2 h-2 rounded-sm ${getActivityColor(level)}`}
            />
          ))}
        </div>
        <span>More</span>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium text-white">This Week</h4>
        <div className="space-y-1">
          {[
            { day: 'Monday', modules: 5, time: '3h 45m' },
            { day: 'Tuesday', modules: 3, time: '2h 20m' },
            { day: 'Today', modules: 4, time: '2h 55m' }
          ].map((day, index) => (
            <motion.div
              key={day.day}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="flex items-center justify-between text-sm"
            >
              <span className="text-slate-300">{day.day}</span>
              <div className="text-right">
                <span className="text-white">{day.modules} modules</span>
                <span className="text-slate-400 ml-2">{day.time}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}