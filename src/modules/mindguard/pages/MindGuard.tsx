import { motion } from 'framer-motion'
import { EmotionLog } from '../components/EmotionLog'
import { ReflectionPrompt } from '../components/ReflectionPrompt'

export function MindGuard() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Mind Guard
        </h1>
        <p className="text-slate-400 mt-2">
          Protect and nurture your mental wellness with emotional intelligence
        </p>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <EmotionLog />
        <ReflectionPrompt />
      </div>
    </div>
  )
}