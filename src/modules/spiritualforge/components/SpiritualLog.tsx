import { motion } from 'framer-motion'
import { Heart, Plus, Book, Sparkles, Users, Gift } from 'lucide-react'
import { useSpiritualStore } from '../store/spiritualStore'

export function SpiritualLog() {
  const { activities } = useSpiritualStore()

  const getActivityIcon = (type: string) => {
    const icons = {
      dhikr: Sparkles,
      quran: Book,
      dua: Heart,
      reflection: Heart,
      charity: Gift,
      other: Users
    }
    return icons[type as keyof typeof icons] || Users
  }

  const getActivityColor = (type: string) => {
    const colors = {
      dhikr: 'text-amber-400',
      quran: 'text-emerald-400',
      dua: 'text-purple-400',
      reflection: 'text-blue-400',
      charity: 'text-pink-400',
      other: 'text-slate-400'
    }
    return colors[type as keyof typeof colors] || 'text-slate-400'
  }

  const todayActivities = activities.filter(activity => {
    const activityDate = new Date(activity.completedAt).toDateString()
    const today = new Date().toDateString()
    return activityDate === today
  })

  const totalDuration = todayActivities.reduce((sum, activity) => sum + activity.duration, 0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="glass-card rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Heart className="w-5 h-5 text-purple-400" />
          <h3 className="text-xl font-semibold text-white">Spiritual Log</h3>
        </div>
        <button className="flex items-center space-x-2 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors">
          <Plus className="w-4 h-4 text-white" />
          <span className="text-white text-sm">Log Activity</span>
        </button>
      </div>

      {/* Today's Summary */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <p className="text-lg font-bold text-white">{todayActivities.length}</p>
          <p className="text-xs text-slate-400">Activities Today</p>
        </div>
        
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <p className="text-lg font-bold text-white">{totalDuration}m</p>
          <p className="text-xs text-slate-400">Time Spent</p>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-white">Recent Activities</h4>
        {activities.slice(0, 5).map((activity, index) => {
          const ActivityIcon = getActivityIcon(activity.type)
          const iconColor = getActivityColor(activity.type)
          
          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              className="p-4 bg-slate-800/30 rounded-lg"
            >
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-slate-700/50 rounded-lg">
                  <ActivityIcon className={`w-4 h-4 ${iconColor}`} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="text-sm font-medium text-white">{activity.title}</h5>
                    <span className="text-xs text-slate-400">
                      {new Date(activity.completedAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <p className="text-sm text-slate-300 mb-2">{activity.description}</p>
                  
                  <div className="flex items-center space-x-4 text-xs text-slate-400">
                    <span>{activity.duration} minutes</span>
                    <span className="capitalize">{activity.type}</span>
                    {activity.count && (
                      <span>{activity.count} repetitions</span>
                    )}
                    {activity.verses && (
                      <span>{activity.verses.join(', ')}</span>
                    )}
                  </div>
                  
                  {activity.notes && (
                    <p className="text-xs text-slate-400 mt-2 italic">"{activity.notes}"</p>
                  )}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Activity Types */}
      <div className="mt-6">
        <h4 className="text-sm font-medium text-white mb-3">Activity Types</h4>
        <div className="grid grid-cols-2 gap-2">
          {['dhikr', 'quran', 'dua', 'reflection', 'charity', 'other'].map(type => {
            const count = activities.filter(a => a.type === type).length
            const Icon = getActivityIcon(type)
            const color = getActivityColor(type)
            
            return (
              <div key={type} className="flex items-center justify-between p-2 bg-slate-800/30 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Icon className={`w-3 h-3 ${color}`} />
                  <span className="text-xs text-slate-300 capitalize">{type}</span>
                </div>
                <span className="text-xs text-white font-medium">{count}</span>
              </div>
            )
          })}
        </div>
      </div>

      <div className="mt-6 p-3 bg-purple-600/20 rounded-lg">
        <p className="text-sm text-purple-300">
          ✨ Your spiritual practice is strengthening. May Allah increase you in faith and righteousness.
        </p>
      </div>
    </motion.div>
  )
}