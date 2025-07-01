import { motion } from 'framer-motion'
import { CashflowTracker } from '../components/CashflowTracker'
import { InvestmentPortfolio } from '../components/InvestmentPortfolio'
import { DebtManagement } from '../components/DebtManagement'

export function FinanceHub() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
          Finance Hub
        </h1>
        <p className="text-slate-400 mt-2">
          Complete financial overview and wealth management
        </p>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <CashflowTracker />
        <InvestmentPortfolio />
      </div>
      
      <DebtManagement />
    </div>
  )
}