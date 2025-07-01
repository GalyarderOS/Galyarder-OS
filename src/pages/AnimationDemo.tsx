import { motion } from 'framer-motion'
import { AnimatedElement } from '../components/AnimatedElement'

export function AnimationDemo() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="w-full max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-8">
            Interactive Animation Demo
          </h1>
          
          <AnimatedElement />
        </motion.div>
      </div>
    </div>
  )
}