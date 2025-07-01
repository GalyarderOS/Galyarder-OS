import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon } from 'lucide-react'
import { useCalendarStore } from '../store/calendarStore'

export function CalendarGrid() {
  const { 
    currentView, 
    selectedDate, 
    setSelectedDate, 
    setView, 
    getEventsForDate,
    getEventsForMonth 
  } = useCalendarStore()
  
  const [currentDate, setCurrentDate] = useState(new Date())

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }
    
    return days
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate)
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1)
    } else {
      newDate.setMonth(newDate.getMonth() + 1)
    }
    setCurrentDate(newDate)
  }

  const isToday = (date: Date | null) => {
    if (!date) return false
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const isSelected = (date: Date | null) => {
    if (!date) return false
    return date.toDateString() === selectedDate.toDateString()
  }

  const days = getDaysInMonth(currentDate)
  const monthEvents = getEventsForMonth(currentDate)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-xl p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <CalendarIcon className="w-5 h-5 text-blue-400" />
          <h3 className="text-xl font-semibold text-white">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h3>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigateMonth('prev')}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-slate-400 hover:text-white" />
          </button>
          
          <button
            onClick={() => setCurrentDate(new Date())}
            className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Today
          </button>
          
          <button
            onClick={() => navigateMonth('next')}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <ChevronRight className="w-4 h-4 text-slate-400 hover:text-white" />
          </button>
          
          <button className="flex items-center space-x-2 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors">
            <Plus className="w-4 h-4 text-white" />
            <span className="text-white text-sm">New Event</span>
          </button>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex items-center space-x-2 mb-6">
        {(['month', 'week', 'day'] as const).map((viewType) => (
          <button
            key={viewType}
            onClick={() => setView({ type: viewType, date: currentDate })}
            className={`px-3 py-1.5 text-sm rounded-lg transition-colors capitalize ${
              currentView.type === viewType
                ? 'bg-blue-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            {viewType}
          </button>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Day headers */}
        {dayNames.map((day) => (
          <div key={day} className="p-2 text-center text-sm font-medium text-slate-400">
            {day}
          </div>
        ))}
        
        {/* Calendar days */}
        {days.map((date, index) => {
          const dayEvents = date ? getEventsForDate(date) : []
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.01 }}
              className={`min-h-[80px] p-2 border border-slate-700/30 cursor-pointer transition-all ${
                date
                  ? isSelected(date)
                    ? 'bg-blue-600/20 border-blue-500'
                    : isToday(date)
                    ? 'bg-emerald-600/20 border-emerald-500'
                    : 'hover:bg-slate-800/50'
                  : 'opacity-30'
              }`}
              onClick={() => date && setSelectedDate(date)}
            >
              {date && (
                <>
                  <div className={`text-sm font-medium mb-1 ${
                    isToday(date) ? 'text-emerald-400' : 
                    isSelected(date) ? 'text-blue-400' : 'text-white'
                  }`}>
                    {date.getDate()}
                  </div>
                  
                  <div className="space-y-1">
                    {dayEvents.slice(0, 2).map((event) => (
                      <div
                        key={event.id}
                        className="text-xs p-1 rounded truncate"
                        style={{ backgroundColor: event.color + '20', color: event.color }}
                      >
                        {event.title}
                      </div>
                    ))}
                    
                    {dayEvents.length > 2 && (
                      <div className="text-xs text-slate-400">
                        +{dayEvents.length - 2} more
                      </div>
                    )}
                  </div>
                </>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Month Summary */}
      <div className="mt-6 p-4 bg-slate-800/30 rounded-lg">
        <h4 className="text-sm font-medium text-white mb-2">This Month</h4>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-slate-400">Total Events:</span>
            <span className="text-white ml-2">{monthEvents.length}</span>
          </div>
          <div>
            <span className="text-slate-400">Work Events:</span>
            <span className="text-white ml-2">
              {monthEvents.filter(e => e.category === 'work').length}
            </span>
          </div>
          <div>
            <span className="text-slate-400">Personal Events:</span>
            <span className="text-white ml-2">
              {monthEvents.filter(e => e.category === 'personal').length}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}