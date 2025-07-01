import { motion } from 'framer-motion'
import { TrendingUp, PieChart } from 'lucide-react'

const investments = [
  { name: 'S&P 500 ETF', value: 25000, change: 8.5, allocation: 40 },
  { name: 'Tech Stocks', value: 18000, change: 12.3, allocation: 30 },
  { name: 'Bonds', value: 12000, change: 2.1, allocation: 20 },
  { name: 'Crypto', value: 6000, change: -5.2, allocation: 10 }
]

export function InvestmentPortfolio() {
  const totalValue = investments.reduce((sum, inv) => sum + inv.value, 0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="glass-card rounded-xl p-6"
    >
      <div className="flex items-center space-x-3 mb-6">
        <PieChart className="w-5 h-5 text-blue-400" />
        <h3 className="text-xl font-semibold text-white">Investment Portfolio</h3>
      </div>

      <div className="mb-6">
        <p className="text-sm text-slate-400 mb-1">Total Portfolio Value</p>
        <p className="text-2xl font-bold text-white">${totalValue.toLocaleString()}</p>
        <p className="text-sm text-emerald-400">+7.8% this month</p>
      </div>

      <div className="space-y-3">
        {investments.map((investment, index) => (
          <motion.div
            key={investment.name}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg"
          >
            <div className="flex-1">
              <p className="text-sm font-medium text-white">{investment.name}</p>
              <p className="text-xs text-slate-400">{investment.allocation}% allocation</p>
            </div>
            
            <div className="text-right">
              <p className="text-sm font-medium text-white">
                ${investment.value.toLocaleString()}
              </p>
              <div className="flex items-center space-x-1">
                <TrendingUp className={`w-3 h-3 ${investment.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`} />
                <span className={`text-xs ${investment.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {investment.change >= 0 ? '+' : ''}{investment.change}%
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}