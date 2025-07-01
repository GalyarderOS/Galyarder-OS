import { motion } from 'framer-motion'
import { Copy, History } from 'lucide-react'
import { useCalculatorStore } from '../store/calculatorStore'

export function CalculatorDisplay() {
  const { display, memory, copyToClipboard } = useCalculatorStore()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-800/50 rounded-xl p-6 mb-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          {memory !== 0 && (
            <span className="text-xs bg-amber-600/20 text-amber-400 px-2 py-1 rounded">
              M: {memory}
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={copyToClipboard}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
            title="Copy to clipboard"
          >
            <Copy className="w-4 h-4 text-slate-400 hover:text-white" />
          </button>
          
          <button
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
            title="View history"
          >
            <History className="w-4 h-4 text-slate-400 hover:text-white" />
          </button>
        </div>
      </div>
      
      <div className="text-right">
        <motion.div
          key={display}
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          className="text-4xl font-mono text-white break-all"
        >
          {display}
        </motion.div>
      </div>
    </motion.div>
  )
}