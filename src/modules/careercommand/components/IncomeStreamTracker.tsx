import { motion } from 'framer-motion'
import { DollarSign, TrendingUp, Plus } from 'lucide-react'

const incomeStreams = [
  {
    id: 1,
    name: 'Primary Job',
    amount: 8500,
    type: 'salary',
    growth: 12,
    stability: 'high'
  },
  {
    id: 2,
    name: 'Freelance Projects',
    amount: 2200,
    type: 'contract',
    growth: 25,
    stability: 'medium'
  },
  {
    id: 3,
    name: 'Investment Returns',
    amount: 850,
    type: 'passive',
    growth: 8,
    stability: 'medium'
  },
  {
    id: 4,
    name: 'Online Course',
    amount: 450,
    type: 'passive',
    growth: 35,
    stability: 'low'
  }
]

const typeColors = {
  salary: 'text-blue-400',
  contract: 'text-emerald-400',
  passive: 'text-purple-400'
}

const stabilityColors = {
  high: 'text-emerald-400',
  medium: 'text-amber-400',
  low: 'text-red-400'
}

export function IncomeStreamTracker() {
  const totalIncome = incomeStreams.reduce((sum, stream) => sum + stream.amount, 0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="glass-card rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <DollarSign className="w-5 h-5 text-emerald-400" />
          <h3 className="text-xl font-semibold text-white">Income Streams</h3>
        </div>
        <button className="flex items-center space-x-2 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors">
          <Plus className="w-4 h-4 text-white" />
          <span className="text-white text-sm">Add Stream</span>
        </button>
      </div>

      <div className="mb-6 p-4 bg-slate-800/50 rounded-lg">
        <p className="text-sm text-slate-400 mb-1">Total Monthly Income</p>
        <p className="text-2xl font-bold text-emerald-400">${totalIncome.toLocaleString()}</p>
        <p className="text-sm text-emerald-400">+15.2% from last month</p>
      </div>

      <div className="space-y-4">
        {incomeStreams.map((stream, index) => (
          <motion.div
            key={stream.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className="p-4 bg-slate-800/30 rounded-lg"
          >
            <div className="flex items-center justify-between mb-2">
              <div>
                <h4 className="text-sm font-medium text-white">{stream.name}</h4>
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`text-xs capitalize ${typeColors[stream.type as keyof typeof typeColors]}`}>
                    {stream.type}
                  </span>
                  <span className="text-xs text-slate-500">•</span>
                  <span className={`text-xs capitalize ${stabilityColors[stream.stability as keyof typeof stabilityColors]}`}>
                    {stream.stability} stability
                  </span>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-sm font-medium text-white">
                  ${stream.amount.toLocaleString()}
                </p>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-3 h-3 text-emerald-400" />
                  <span className="text-xs text-emerald-400">+{stream.growth}%</span>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-700 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(stream.amount / totalIncome) * 100}%` }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.8 }}
                className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-2 rounded-full"
              />
            </div>
            
            <p className="text-xs text-slate-400 mt-2">
              {Math.round((stream.amount / totalIncome) * 100)}% of total income
            </p>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 p-3 bg-emerald-600/20 rounded-lg">
        <p className="text-sm text-emerald-300">
          💡 Consider diversifying with 1-2 more passive income streams
        </p>
      </div>
    </motion.div>
  )
}