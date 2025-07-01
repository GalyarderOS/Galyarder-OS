import { motion } from 'framer-motion'
import { Compass, Target, Heart, Star } from 'lucide-react'

const legacyAreas = [
  {
    title: 'Personal Impact',
    description: 'How I want to be remembered by family and friends',
    icon: Heart,
    color: 'text-pink-400',
    progress: 75,
    goals: [
      'Be a supportive mentor to younger developers',
      'Maintain strong relationships with family',
      'Practice kindness and empathy daily'
    ]
  },
  {
    title: 'Professional Legacy',
    description: 'The mark I want to leave in my career',
    icon: Target,
    color: 'text-blue-400',
    progress: 60,
    goals: [
      'Build products that improve people\'s lives',
      'Mentor and develop other professionals',
      'Contribute to open source community'
    ]
  },
  {
    title: 'Community Contribution',
    description: 'How I want to give back to society',
    icon: Star,
    color: 'text-amber-400',
    progress: 45,
    goals: [
      'Volunteer for education initiatives',
      'Support environmental causes',
      'Help bridge the digital divide'
    ]
  },
  {
    title: 'Knowledge Sharing',
    description: 'The wisdom and skills I want to pass on',
    icon: Compass,
    color: 'text-purple-400',
    progress: 80,
    goals: [
      'Write technical articles and tutorials',
      'Speak at conferences and meetups',
      'Create educational content'
    ]
  }
]

export function LegacyCanvas() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-xl p-6"
    >
      <div className="flex items-center space-x-3 mb-6">
        <Compass className="w-5 h-5 text-amber-400" />
        <h3 className="text-xl font-semibold text-white">Legacy Canvas</h3>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {legacyAreas.map((area, index) => (
          <motion.div
            key={area.title}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
            className="p-4 bg-slate-800/30 rounded-lg"
          >
            <div className="flex items-start space-x-3 mb-3">
              <div className="p-2 bg-slate-700/50 rounded-lg">
                <area.icon className={`w-4 h-4 ${area.color}`} />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-white mb-1">{area.title}</h4>
                <p className="text-xs text-slate-400 mb-3">{area.description}</p>
                
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>Progress</span>
                    <span>{area.progress}%</span>
                  </div>
                  <div className="bg-slate-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${area.progress}%` }}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.8 }}
                      className={`h-2 rounded-full bg-gradient-to-r ${
                        area.color.includes('pink') ? 'from-pink-500 to-pink-400' :
                        area.color.includes('blue') ? 'from-blue-500 to-blue-400' :
                        area.color.includes('amber') ? 'from-amber-500 to-amber-400' :
                        'from-purple-500 to-purple-400'
                      }`}
                    />
                  </div>
                </div>
                
                <div className="space-y-1">
                  {area.goals.map((goal, goalIndex) => (
                    <div key={goalIndex} className="flex items-start space-x-2">
                      <span className={`text-xs mt-0.5 ${area.color}`}>•</span>
                      <span className="text-xs text-slate-300">{goal}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-amber-600/20 rounded-lg">
        <p className="text-sm text-amber-300 mb-2">
          🌟 Your Legacy Score: 65/100
        </p>
        <p className="text-xs text-amber-200">
          Focus on community contribution to strengthen your overall legacy impact
        </p>
      </div>
    </motion.div>
  )
}