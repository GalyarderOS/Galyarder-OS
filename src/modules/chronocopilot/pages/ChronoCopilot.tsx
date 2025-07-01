import { motion } from 'framer-motion'
import { TimeBlockPlanner } from '../components/TimeBlockPlanner'
import { RitualTracker } from '../components/RitualTracker'
import { JournalingSection } from '../components/JournalingSection'

export function ChronoCopilot() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Chrono Copilot
        </h1>
        <p className="text-slate-400 mt-2">
          Master your time with intelligent scheduling and ritual tracking
        </p>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2">
          <TimeBlockPlanner />
        </div>
        <div className="space-y-8">
          <RitualTracker />
          <JournalingSection />
        </div>
      </div>
    </div>
  )
}