import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { LogOut, X, AlertTriangle } from 'lucide-react'

interface LogoutConfirmationProps {
  isOpen: boolean
  onConfirm: () => void
  onCancel: () => void
}

export function LogoutConfirmation({ isOpen, onConfirm, onCancel }: LogoutConfirmationProps) {
  if (!isOpen) return null

  const modalContent = (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={onCancel}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative w-[90vw] max-w-md
                     bg-slate-800/95 backdrop-blur-2xl 
                     border border-slate-700/60 
                     rounded-2xl p-6 
                     shadow-2xl shadow-black/50
                     ring-1 ring-white/5"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Confirm Logout</h3>
            </div>
            <button
              onClick={onCancel}
              className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors group"
              aria-label="Close logout confirmation"
            >
              <X className="w-4 h-4 text-slate-400 group-hover:text-white" />
            </button>
          </div>

          {/* Content */}
          <div className="mb-8">
            <p className="text-slate-300 leading-relaxed">
              Are you sure you want to logout? This will end your current session and you'll need to sign in again to access your personal civilization system.
            </p>
            
            <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
              <div className="flex items-start space-x-2">
                <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-amber-200">
                  <p className="font-medium mb-1">Security Notice</p>
                  <p>Your session data will be cleared and you'll be redirected to the home page.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-3">
            <button
              onClick={onCancel}
              className="flex-1 px-4 py-3 bg-slate-700/50 hover:bg-slate-600/50 
                       rounded-lg text-white transition-all duration-200 
                       flex items-center justify-center space-x-2
                       border border-slate-600/30 hover:border-slate-500/50"
            >
              <span>Cancel</span>
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 
                       rounded-lg text-white transition-all duration-200 
                       flex items-center justify-center space-x-2
                       shadow-lg shadow-red-600/25 hover:shadow-red-600/40"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>

          {/* Additional Info */}
          <div className="mt-4 pt-4 border-t border-slate-700/50">
            <p className="text-xs text-slate-400 text-center">
              Your data will be preserved and available when you sign back in
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )

  return createPortal(modalContent, document.body)
}