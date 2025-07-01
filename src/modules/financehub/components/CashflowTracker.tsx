import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, DollarSign, Plus } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts'

const monthlyData = [
  { month: 'Jan', income: 5200, expenses: 3800 },
  { month: 'Feb', income: 5400, expenses: 4100 },
  { month: 'Mar', income: 5200, expenses: 3900 },
  { month: 'Apr', income: 5600, expenses: 4200 },
  { month: 'May', income: 5800, expenses: 4000 },
  { month: 'Jun', income: 5500, expenses: 4300 }
]

export function CashflowTracker() {
  const currentMonth = monthlyData[monthlyData.length - 1]
  const netCashflow = currentMonth.income - currentMonth.expenses

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">Cashflow Tracker</h3>
        <button className="flex items-center space-x-2 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors">
          <Plus className="w-4 h-4 text-white" />
          <span className="text-white text-sm">Add Transaction</span>
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-slate-800/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span className="text-sm text-slate-400">Income</span>
          </div>
          <p className="text-xl font-bold text-emerald-400">
            ${currentMonth.income.toLocaleString()}
          </p>
        </div>

        <div className="bg-slate-800/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingDown className="w-4 h-4 text-red-400" />
            <span className="text-sm text-slate-400">Expenses</span>
          </div>
          <p className="text-xl font-bold text-red-400">
            ${currentMonth.expenses.toLocaleString()}
          </p>
        </div>

        <div className="bg-slate-800/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <DollarSign className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-slate-400">Net</span>
          </div>
          <p className={`text-xl font-bold ${netCashflow >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            ${netCashflow.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthlyData}>
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94A3B8', fontSize: 12 }} 
            />
            <YAxis hide />
            <Bar dataKey="income" fill="#10B981" radius={[2, 2, 0, 0]} />
            <Bar dataKey="expenses" fill="#EF4444" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}