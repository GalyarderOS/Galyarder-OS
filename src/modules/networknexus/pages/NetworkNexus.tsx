import { motion } from 'framer-motion'
import { InteractionLog } from '../components/InteractionLog'
import { FollowUpPlanner } from '../components/FollowUpPlanner'
import { StrategicContactMap } from '../components/StrategicContactMap'

export function NetworkNexus() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Network Nexus
        </h1>
        <p className="text-slate-400 mt-2">
          Strategic relationship management and networking intelligence
        </p>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8">
          <InteractionLog />
          <FollowUpPlanner />
        </div>
        <div>
          <StrategicContactMap />
        </div>
      </div>
    </div>
  )
}