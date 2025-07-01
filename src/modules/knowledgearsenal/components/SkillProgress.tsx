import { motion } from 'framer-motion'
import { TrendingUp, Target, Clock, Award } from 'lucide-react'
import { useKnowledgeStore } from '../store/knowledgeStore'

export function SkillProgress() {
  const { skills } = useKnowledgeStore()

  const getSkillGap = (skill: any) => skill.targetLevel - skill.level
  const getRecentlyPracticed = () => {
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
    return skills.filter(skill => new Date(skill.lastPracticed) >= oneWeekAgo)
  }

  const categoryColors = {
    Programming: 'text-blue-400',
    Communication: 'text-emerald-400',
    Design: 'text-purple-400',
    Business: 'text-amber-400',
    Creative: 'text-pink-400'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass-card rounded-xl p-6"
    >
      <div className="flex items-center space-x-3 mb-6">
        <TrendingUp className="w-5 h-5 text-purple-400" />
        <h3 className="text-xl font-semibold text-white">Skill Progress</h3>
      </div>

      {/* Skill Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <Target className="w-5 h-5 text-blue-400 mx-auto mb-2" />
          <p className="text-lg font-bold text-white">{skills.length}</p>
          <p className="text-xs text-slate-400">Total Skills</p>
        </div>
        
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <Award className="w-5 h-5 text-emerald-400 mx-auto mb-2" />
          <p className="text-lg font-bold text-white">
            {skills.filter(s => s.level >= s.targetLevel).length}
          </p>
          <p className="text-xs text-slate-400">Mastered</p>
        </div>
        
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <Clock className="w-5 h-5 text-amber-400 mx-auto mb-2" />
          <p className="text-lg font-bold text-white">{getRecentlyPracticed().length}</p>
          <p className="text-xs text-slate-400">Practiced This Week</p>
        </div>
        
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <TrendingUp className="w-5 h-5 text-purple-400 mx-auto mb-2" />
          <p className="text-lg font-bold text-white">
            {Math.round(skills.reduce((sum, s) => sum + s.totalHours, 0))}h
          </p>
          <p className="text-xs text-slate-400">Total Practice</p>
        </div>
      </div>

      {/* Skills List */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-white">Active Skills</h4>
        {skills.map((skill, index) => (
          <motion.div
            key={skill.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
            className="p-4 bg-slate-800/30 rounded-lg"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h5 className="text-sm font-medium text-white mb-1">{skill.name}</h5>
                <p className={`text-xs ${categoryColors[skill.category as keyof typeof categoryColors] || 'text-slate-400'} mb-2`}>
                  {skill.category}
                </p>
                <div className="flex items-center space-x-4 text-xs text-slate-400">
                  <span>Last practiced: {new Date(skill.lastPracticed).toLocaleDateString()}</span>
                  <span>{skill.totalHours}h total</span>
                  <span>Gap: {getSkillGap(skill)} levels</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-white">
                  Level {skill.level}/{skill.targetLevel}
                </p>
              </div>
            </div>
            
            {/* Current Level Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Current Level</span>
                <span>{skill.level}/10</span>
              </div>
              <div className="bg-slate-700 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(skill.level / 10) * 100}%` }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.8 }}
                  className="bg-gradient-to-r from-purple-500 to-purple-400 h-2 rounded-full"
                />
              </div>
              
              {/* Target Level */}
              <div className="flex justify-between text-xs text-slate-400">
                <span>Target Level</span>
                <span>{skill.targetLevel}/10</span>
              </div>
              <div className="bg-slate-700/50 rounded-full h-1">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(skill.targetLevel / 10) * 100}%` }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                  className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-1 rounded-full"
                />
              </div>
            </div>

            {/* Milestones */}
            {skill.milestones.length > 0 && (
              <div className="mt-3">
                <p className="text-xs text-slate-400 mb-2">Milestones:</p>
                <div className="space-y-1">
                  {skill.milestones.slice(0, 2).map((milestone) => (
                    <div key={milestone.id} className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${
                        milestone.completed ? 'bg-emerald-400' : 'bg-slate-600'
                      }`} />
                      <span className={`text-xs ${
                        milestone.completed ? 'text-emerald-400' : 'text-slate-400'
                      }`}>
                        {milestone.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="mt-6 p-3 bg-purple-600/20 rounded-lg">
        <p className="text-sm text-purple-300">
          🚀 Focus on skills with the largest gaps to maximize your growth potential.
        </p>
      </div>
    </motion.div>
  )
}