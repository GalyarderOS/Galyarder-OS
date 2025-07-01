import { motion } from 'framer-motion'
import { ActivityTimeline } from '../components/ActivityTimeline'
import { SnapshotHeatmap } from '../components/SnapshotHeatmap'

export function SystemLogs() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          System Logs
        </h1>
        <p className="text-slate-400 mt-2">
          Track your digital footprint and activity patterns
        </p>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2">
          <ActivityTimeline />
        </div>
        <div>
          <SnapshotHeatmap />
        </div>
      </div>
    </div>
  )
}