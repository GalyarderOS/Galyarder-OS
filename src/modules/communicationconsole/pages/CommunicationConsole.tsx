import { motion } from 'framer-motion'
import { ContentQueue } from '../components/ContentQueue'
import { VoiceDraftEditor } from '../components/VoiceDraftEditor'
import { ImpactGraph } from '../components/ImpactGraph'

export function CommunicationConsole() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Communication Console
        </h1>
        <p className="text-slate-400 mt-2">
          Craft your voice, manage content, and track your communication impact
        </p>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8">
          <ContentQueue />
          <VoiceDraftEditor />
        </div>
        <div>
          <ImpactGraph />
        </div>
      </div>
    </div>
  )
}