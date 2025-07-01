import { motion } from 'framer-motion'
import { Clock, MapPin, Users, Bell, Edit, Trash2 } from 'lucide-react'
import { useCalendarStore } from '../store/calendarStore'

export function EventList() {
  const { selectedDate, getEventsForDate, deleteEvent } = useCalendarStore()
  
  const events = getEventsForDate(selectedDate)
  const sortedEvents = events.sort((a, b) => a.startTime.localeCompare(b.startTime))

  const categoryIcons = {
    work: '💼',
    personal: '🏠',
    health: '💪',
    social: '👥',
    other: '📅'
  }

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="glass-card rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">
          Events for {selectedDate.toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric' 
          })}
        </h3>
        <span className="text-sm text-slate-400">
          {events.length} event{events.length !== 1 ? 's' : ''}
        </span>
      </div>

      {events.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="w-8 h-8 text-slate-400" />
          </div>
          <p className="text-slate-400 mb-2">No events scheduled</p>
          <p className="text-sm text-slate-500">Click the + button to add an event</p>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              className="p-4 border border-slate-700/50 rounded-lg hover:border-slate-600/50 transition-colors group"
              style={{ borderLeftColor: event.color, borderLeftWidth: '4px' }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{categoryIcons[event.category]}</span>
                  <div>
                    <h4 className="text-sm font-medium text-white">{event.title}</h4>
                    {event.description && (
                      <p className="text-xs text-slate-400 mt-1">{event.description}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1 hover:bg-slate-700 rounded transition-colors">
                    <Edit className="w-3 h-3 text-slate-400 hover:text-white" />
                  </button>
                  <button 
                    onClick={() => deleteEvent(event.id)}
                    className="p-1 hover:bg-red-600/20 rounded transition-colors"
                  >
                    <Trash2 className="w-3 h-3 text-slate-400 hover:text-red-400" />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-xs text-slate-400">
                <div className="flex items-center space-x-2">
                  <Clock className="w-3 h-3" />
                  <span>
                    {formatTime(event.startTime)} - {formatTime(event.endTime)}
                  </span>
                </div>
                
                {event.location && (
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-3 h-3" />
                    <span className="truncate">{event.location}</span>
                  </div>
                )}
                
                {event.attendees && event.attendees.length > 0 && (
                  <div className="flex items-center space-x-2">
                    <Users className="w-3 h-3" />
                    <span>{event.attendees.length} attendee{event.attendees.length !== 1 ? 's' : ''}</span>
                  </div>
                )}
                
                {event.reminder?.enabled && (
                  <div className="flex items-center space-x-2">
                    <Bell className="w-3 h-3" />
                    <span>{event.reminder.minutes}m reminder</span>
                  </div>
                )}
              </div>
              
              {event.recurring?.type !== 'none' && (
                <div className="mt-2 text-xs text-purple-400">
                  🔄 Repeats {event.recurring?.type}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* Quick Stats */}
      <div className="mt-6 p-4 bg-slate-800/30 rounded-lg">
        <h4 className="text-sm font-medium text-white mb-3">Today's Schedule</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-slate-400">Busy Time:</span>
            <span className="text-white ml-2">
              {events.length > 0 ? `${events.length * 1.5}h` : '0h'}
            </span>
          </div>
          <div>
            <span className="text-slate-400">Free Time:</span>
            <span className="text-white ml-2">
              {events.length > 0 ? `${8 - events.length * 1.5}h` : '8h'}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}