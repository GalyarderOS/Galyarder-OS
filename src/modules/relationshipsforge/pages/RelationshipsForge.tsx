import { motion } from 'framer-motion'
import { NetworkGraph } from '../components/NetworkGraph'
import { InteractionJournal } from '../components/InteractionJournal'

export function RelationshipsForge() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
          Relationships Forge
        </h1>
        <p className="text-slate-400 mt-2">
          Nurture meaningful connections and build your social network
        </p>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <NetworkGraph />
        <InteractionJournal />
      </div>
    </div>
  )
}