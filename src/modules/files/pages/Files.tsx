import { motion } from 'framer-motion'
import { FileExplorer } from '../components/FileExplorer'

export function Files() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          Files
        </h1>
        <p className="text-slate-400 mt-2">
          Organize, share, and manage your files with ease
        </p>
      </motion.div>

      <FileExplorer />
    </div>
  )
}