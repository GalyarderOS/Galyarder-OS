import { motion } from 'framer-motion'
import { AIAssistantDialog } from '../components/AIAssistantDialog'
import { NotionAssistantPage } from '../components/NotionAssistantPage'

export function AIAssistant() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          AI Assistant
        </h1>
        <p className="text-slate-400 mt-2">
          Your intelligent companion for personal optimization and insights
        </p>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2">
          <AIAssistantDialog />
        </div>
        <div>
          <NotionAssistantPage />
        </div>
      </div>
    </div>
  )
}