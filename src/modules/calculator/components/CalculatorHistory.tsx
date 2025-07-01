import { motion } from 'framer-motion'
import { Trash2, Copy } from 'lucide-react'
import { useCalculatorStore } from '../store/calculatorStore'

export function CalculatorHistory() {
  const { history, clearHistory } = useCalculatorStore()

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="glass-card rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">History</h3>
        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="flex items-center space-x-2 px-3 py-1.5 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4 text-white" />
            <span className="text-white text-sm">Clear</span>
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🧮</span>
          </div>
          <p className="text-slate-400 mb-2">No calculations yet</p>
          <p className="text-sm text-slate-500">Your calculation history will appear here</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {history.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-3 bg-slate-800/30 rounded-lg hover:bg-slate-800/50 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm text-slate-300 font-mono">{entry.calculation}</p>
                  <p className="text-lg text-white font-mono">= {entry.result}</p>
                  <p className="text-xs text-slate-500">
                    {new Date(entry.timestamp).toLocaleString()}
                  </p>
                </div>
                
                <button
                  onClick={() => copyToClipboard(entry.result)}
                  className="p-2 opacity-0 group-hover:opacity-100 hover:bg-slate-700 rounded-lg transition-all"
                  title="Copy result"
                >
                  <Copy className="w-4 h-4 text-slate-400 hover:text-white" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Quick Stats */}
      {history.length > 0 && (
        <div className="mt-6 p-4 bg-slate-800/30 rounded-lg">
          <h4 className="text-sm font-medium text-white mb-2">Statistics</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-slate-400">Total Calculations:</span>
              <span className="text-white ml-2">{history.length}</span>
            </div>
            <div>
              <span className="text-slate-400">Today:</span>
              <span className="text-white ml-2">
                {history.filter(h => 
                  new Date(h.timestamp).toDateString() === new Date().toDateString()
                ).length}
              </span>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}