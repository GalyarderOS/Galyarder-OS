import { motion } from 'framer-motion'
import { LegacyCanvas } from '../components/LegacyCanvas'
import { MissionVault } from '../components/MissionVault'

export function LegacyBuilder() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
          Legacy Builder
        </h1>
        <p className="text-slate-400 mt-2">
          Define your purpose and build a meaningful legacy
        </p>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <LegacyCanvas />
        <MissionVault />
      </div>
    </div>
  )
}