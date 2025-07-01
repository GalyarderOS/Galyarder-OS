import { motion } from 'framer-motion'
import { CreditCard, AlertTriangle, CheckCircle } from 'lucide-react'

const debts = [
  {
    id: 1,
    name: 'Credit Card',
    balance: 3200,
    minPayment: 120,
    interestRate: 18.5,
    dueDate: '2024-02-15'
  },
  {
    id: 2,
    name: 'Student Loan',
    balance: 15000,
    minPayment: 250,
    interestRate: 4.2,
    dueDate: '2024-02-20'
  },
  {
    id: 3,
    name: 'Car Loan',
    balance: 8500,
    minPayment: 320,
    interestRate: 6.8,
    dueDate: '2024-02-10'
  }
]

export function DebtManagement() {
  const totalDebt = debts.reduce((sum, debt) => sum + debt.balance, 0)
  const totalMinPayment = debts.reduce((sum, debt) => sum + debt.minPayment, 0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass-card rounded-xl p-6"
    >
      <div className="flex items-center space-x-3 mb-6">
        <CreditCard className="w-5 h-5 text-red-400" />
        <h3 className="text-xl font-semibold text-white">Debt Management</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-slate-800/50 rounded-lg p-4">
          <p className="text-sm text-slate-400 mb-1">Total Debt</p>
          <p className="text-2xl font-bold text-red-400">${totalDebt.toLocaleString()}</p>
        </div>
        
        <div className="bg-slate-800/50 rounded-lg p-4">
          <p className="text-sm text-slate-400 mb-1">Monthly Payments</p>
          <p className="text-2xl font-bold text-white">${totalMinPayment.toLocaleString()}</p>
        </div>
      </div>

      <div className="space-y-4">
        {debts.map((debt, index) => (
          <motion.div
            key={debt.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg"
          >
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h4 className="text-sm font-medium text-white">{debt.name}</h4>
                {debt.interestRate > 15 && (
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                )}
              </div>
              <p className="text-xs text-slate-400">
                {debt.interestRate}% APR • Due: {debt.dueDate}
              </p>
            </div>
            
            <div className="text-right">
              <p className="text-sm font-medium text-white">
                ${debt.balance.toLocaleString()}
              </p>
              <p className="text-xs text-slate-400">
                Min: ${debt.minPayment}
              </p>
            </div>
            
            <button className="ml-4 p-2 hover:bg-slate-700 rounded-lg transition-colors">
              <CheckCircle className="w-4 h-4 text-slate-400 hover:text-emerald-400" />
            </button>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-600/20 rounded-lg">
        <p className="text-sm text-blue-300">
          💡 Consider paying extra on your credit card to save on interest charges
        </p>
      </div>
    </motion.div>
  )
}