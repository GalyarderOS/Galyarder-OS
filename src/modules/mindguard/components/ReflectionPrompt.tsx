import { useState } from 'react'
import { motion } from 'framer-motion'
import { Lightbulb, RefreshCw, Save } from 'lucide-react'

const prompts = [
  "What am I most grateful for today, and why does it matter to me?",
  "What challenge did I face today, and what did I learn from it?",
  "How did I show kindness to myself or others today?",
  "What would I do differently if I could relive today?",
  "What small win can I celebrate from today?",
  "How am I feeling right now, and what might be causing these feelings?",
  "What is one thing I'm looking forward to tomorrow?",
  "How did I grow or improve today, even in a small way?"
]

export function ReflectionPrompt() {
  const [currentPrompt, setCurrentPrompt] = useState(prompts[0])
  const [reflection, setReflection] = useState('')

  const getNewPrompt = () => {
    const availablePrompts = prompts.filter(p => p !== currentPrompt)
    const randomPrompt = availablePrompts[Math.floor(Math.random() * availablePrompts.length)]
    setCurrentPrompt(randomPrompt)
    setReflection('')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="glass-card rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Lightbulb className="w-5 h-5 text-amber-400" />
          <h3 className="text-xl font-semibold text-white">Daily Reflection</h3>
        </div>
        <button
          onClick={getNewPrompt}
          className="flex items-center space-x-2 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
        >
          <RefreshCw className="w-4 h-4 text-white" />
          <span className="text-white text-sm">New Prompt</span>
        </button>
      </div>

      <div className="mb-6 p-4 bg-amber-600/20 rounded-lg border border-amber-600/30">
        <p className="text-amber-200 text-sm leading-relaxed">
          {currentPrompt}
        </p>
      </div>

      <textarea
        value={reflection}
        onChange={(e) => setReflection(e.target.value)}
        placeholder="Take a moment to reflect and write your thoughts..."
        className="w-full h-40 p-4 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-amber-500"
      />

      <div className="flex justify-between items-center mt-4">
        <span className="text-xs text-slate-400">
          {reflection.length} characters
        </span>
        <button className="flex items-center space-x-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 rounded-lg transition-colors">
          <Save className="w-4 h-4 text-white" />
          <span className="text-white text-sm">Save Reflection</span>
        </button>
      </div>

      <div className="mt-6 space-y-3">
        <h4 className="text-sm font-medium text-white">Recent Reflections</h4>
        <div className="space-y-2">
          {[
            { date: 'Yesterday', preview: 'I learned that taking breaks actually makes me more productive...' },
            { date: '2 days ago', preview: 'Grateful for the support from my team during the project...' },
            { date: '3 days ago', preview: 'Realized I need to be more patient with myself when learning...' }
          ].map((entry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="p-3 bg-slate-800/30 rounded-lg cursor-pointer hover:bg-slate-800/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-slate-400">{entry.date}</span>
              </div>
              <p className="text-sm text-slate-300 truncate">{entry.preview}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}