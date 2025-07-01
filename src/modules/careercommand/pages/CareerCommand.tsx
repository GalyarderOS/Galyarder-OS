import { motion } from 'framer-motion'
import { SkillMapBoard } from '../components/SkillMapBoard'
import { IncomeStreamTracker } from '../components/IncomeStreamTracker'

export function CareerCommand() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Career Command
        </h1>
        <p className="text-slate-400 mt-2">
          Advance your career with skill development and income optimization
        </p>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <SkillMapBoard />
        <IncomeStreamTracker />
      </div>
    </div>
  )
}