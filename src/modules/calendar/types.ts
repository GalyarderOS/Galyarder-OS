export interface CalendarEvent {
  id: string
  title: string
  description?: string
  startDate: string
  endDate: string
  startTime: string
  endTime: string
  location?: string
  category: 'work' | 'personal' | 'health' | 'social' | 'other'
  color: string
  reminder?: {
    enabled: boolean
    minutes: number
  }
  recurring?: {
    type: 'none' | 'daily' | 'weekly' | 'monthly' | 'yearly'
    interval: number
    endDate?: string
  }
  attendees?: string[]
  createdAt: string
  updatedAt: string
}

export interface CalendarView {
  type: 'month' | 'week' | 'day'
  date: Date
}

export interface CalendarState {
  events: CalendarEvent[]
  currentView: CalendarView
  selectedDate: Date
  
  // Event actions
  addEvent: (event: Omit<CalendarEvent, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateEvent: (id: string, updates: Partial<CalendarEvent>) => void
  deleteEvent: (id: string) => void
  
  // View actions
  setView: (view: CalendarView) => void
  setSelectedDate: (date: Date) => void
  
  // Utility actions
  getEventsForDate: (date: Date) => CalendarEvent[]
  getEventsForWeek: (date: Date) => CalendarEvent[]
  getEventsForMonth: (date: Date) => CalendarEvent[]
}