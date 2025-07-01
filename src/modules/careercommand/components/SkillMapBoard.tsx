import { motion } from 'framer-motion'
import { TrendingUp, Star, Target } from 'lucide-react'

const skills = [
  { name: 'React/TypeScript', level: 85, target: 95, category: 'Technical' },
  { name: 'System Design', level: 70, target: 85, category: 'Technical' },
  { name: 'Leadership', level: 60, target: 80, category: 'Soft Skills' },
  { name: 'Product Strategy', level: 55, target: 75, category: 'Business' },
  { name: 'Data Analysis', level: 45, target: 70, category: 'Technical' },
  { name: 'Public Speaking', level: 40, target: 65, category: 'Soft Skills' }
]

const categoryColors = {
  'Technical': 'text-blue-400',
  'Soft Skills': 'text-emerald-400',
  'Business': 'text-purple-400'
}

export function SkillMapBoard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-xl p-6"
    >
      <div className="flex items-center space-x-3 mb-6">
        <Star className="w-5 h-5 text-amber-400" />
        <h3 className="text-xl font-semibold text-white">Skill Map Board</h3>
      </div>

      <div className="space-y-4">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
            className="p-4 bg-slate-800/30 rounded-lg"
          >
            <div className="flex items-center justify-between mb-2">
              <div>
                <h4 className="text-sm font-medium text-white">{skill.name}</h4>
                <p className={`text-xs ${categoryColors[skill.category as keyof typeof categoryColors]}`}>
                  {skill.category}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-white">{skill.level}%</p>
                <p className="text-xs text-slate-400">Target: {skill.target}%</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="bg-slate-700 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.8 }}
                  className="bg-gradient-to-r from-blue-500 to-blue-400 h-2 rounded-full"
                />
              </div>
              
              <div className="bg-slate-700/50 rounded-full h-1">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.target}%` }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                  className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-1 rounded-full"
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-slate-400">
                Gap: {skill.target - skill.level} points
              </span>
              <TrendingUp className="w-3 h-3 text-emerald-400" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 p-3 bg-amber-600/20 rounded-lg">
        <p className="text-sm text-amber-300">
          🎯 Focus on Leadership and Public Speaking for maximum career impact
        </p>
      </div>
    </motion.div>
  )
}