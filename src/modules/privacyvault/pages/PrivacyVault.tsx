import { motion } from 'framer-motion'
import { VaultDashboard } from '../components/VaultDashboard'
import { KeyTracker } from '../components/KeyTracker'
import { AccessLogs } from '../components/AccessLogs'

export function PrivacyVault() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          Privacy Vault
        </h1>
        <p className="text-slate-400 mt-2">
          Secure your digital life with encrypted storage and access monitoring
        </p>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8">
          <VaultDashboard />
          <AccessLogs />
        </div>
        <div>
          <KeyTracker />
        </div>
      </div>
    </div>
  )
}