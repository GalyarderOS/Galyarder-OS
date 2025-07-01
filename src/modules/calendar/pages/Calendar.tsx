import { motion } from 'framer-motion'
import { CalendarGrid } from '../components/CalendarGrid'
import { EventList } from '../components/EventList'

export function Calendar() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Calendar
        </h1>
        <p className="text-slate-400 mt-2">
          Manage your schedule and never miss an important event
        </p>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2">
          <CalendarGrid />
        </div>
        <div>
          <EventList />
        </div>
      </div>
    </div>
  )
}