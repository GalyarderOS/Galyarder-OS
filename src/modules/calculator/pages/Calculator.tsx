import { motion } from 'framer-motion'
import { CalculatorDisplay } from '../components/CalculatorDisplay'
import { CalculatorKeypad } from '../components/CalculatorKeypad'
import { CalculatorHistory } from '../components/CalculatorHistory'

export function Calculator() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
          Calculator
        </h1>
        <p className="text-slate-400 mt-2">
          Powerful calculator with scientific functions and unit conversion
        </p>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-xl p-6"
          >
            <CalculatorDisplay />
            <CalculatorKeypad />
          </motion.div>
        </div>
        <div>
          <CalculatorHistory />
        </div>
      </div>
    </div>
  )
}