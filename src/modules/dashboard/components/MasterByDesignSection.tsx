import { motion } from 'framer-motion'

export function MasterByDesignSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="text-center"
    >
      <p className="text-slate-400 text-lg font-light">
        Master life by design, powered by data
      </p>
    </motion.div>
  )
}