import { motion } from 'framer-motion'
import { LearningTracker } from '../components/LearningTracker'
import { KnowledgeBoard } from '../components/KnowledgeBoard'
import { SkillProgress } from '../components/SkillProgress'

export function KnowledgeArsenal() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Knowledge Arsenal
        </h1>
        <p className="text-slate-400 mt-2">
          Track your learning journey, books, and skill development
        </p>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2">
          <LearningTracker />
        </div>
        <div className="space-y-8">
          <KnowledgeBoard />
          <SkillProgress />
        </div>
      </div>
    </div>
  )
}