import { motion } from 'framer-motion'
import { TrendingUp, Eye, Heart, Share, MessageCircle } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { useCommunicationStore } from '../store/communicationStore'

export function ImpactGraph() {
  const { brandMetrics, publicationGoals } = useCommunicationStore()

  // Mock engagement data over time
  const engagementData = [
    { month: 'Jan', reach: 12000, engagement: 950, followers: 7200 },
    { month: 'Feb', reach: 15000, engagement: 1200, followers: 7500 },
    { month: 'Mar', reach: 18000, engagement: 1450, followers: 7800 },
    { month: 'Apr', reach: 22000, engagement: 1800, followers: 8200 },
    { month: 'May', reach: 25000, engagement: 2100, followers: 8600 },
    { month: 'Jun', reach: 28000, engagement: 2400, followers: 9000 }
  ]

  // Mock content performance data
  const contentPerformanceData = [
    { type: 'Articles', views: 15000, engagement: 1200 },
    { type: 'Posts', views: 8500, engagement: 950 },
    { type: 'Videos', views: 12000, engagement: 1800 },
    { type: 'Newsletters', views: 5500, engagement: 650 }
  ]

  const currentMetrics = brandMetrics[brandMetrics.length - 1]
  const activeGoals = publicationGoals.filter(g => g.status === 'active')

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass-card rounded-xl p-6"
    >
      <div className="flex items-center space-x-3 mb-6">
        <TrendingUp className="w-5 h-5 text-emerald-400" />
        <h3 className="text-xl font-semibold text-white">Impact Graph</h3>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <Eye className="w-5 h-5 text-blue-400 mx-auto mb-2" />
          <p className="text-lg font-bold text-white">
            {currentMetrics?.totalReach.toLocaleString() || '0'}
          </p>
          <p className="text-xs text-slate-400">Total Reach</p>
        </div>
        
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <Heart className="w-5 h-5 text-red-400 mx-auto mb-2" />
          <p className="text-lg font-bold text-white">
            {currentMetrics?.engagement.toLocaleString() || '0'}
          </p>
          <p className="text-xs text-slate-400">Engagement</p>
        </div>
        
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <TrendingUp className="w-5 h-5 text-emerald-400 mx-auto mb-2" />
          <p className="text-lg font-bold text-white">
            +{currentMetrics?.followerGrowth || 0}
          </p>
          <p className="text-xs text-slate-400">New Followers</p>
        </div>
        
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <MessageCircle className="w-5 h-5 text-purple-400 mx-auto mb-2" />
          <p className="text-lg font-bold text-white">
            {currentMetrics?.brandMentions || 0}
          </p>
          <p className="text-xs text-slate-400">Brand Mentions</p>
        </div>
      </div>

      {/* Engagement Trend */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-white mb-4">Engagement Trend</h4>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={engagementData}>
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#94A3B8', fontSize: 12 }} 
              />
              <YAxis hide />
              <Line 
                type="monotone" 
                dataKey="reach" 
                stroke="#3B82F6" 
                strokeWidth={2}
                dot={{ fill: '#3B82F6', strokeWidth: 0, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="engagement" 
                stroke="#10B981" 
                strokeWidth={2}
                dot={{ fill: '#10B981', strokeWidth: 0, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-center space-x-6 mt-2">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full" />
            <span className="text-xs text-slate-400">Reach</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-emerald-500 rounded-full" />
            <span className="text-xs text-slate-400">Engagement</span>
          </div>
        </div>
      </div>

      {/* Content Performance */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-white mb-4">Content Performance</h4>
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={contentPerformanceData}>
              <XAxis 
                dataKey="type" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#94A3B8', fontSize: 12 }} 
              />
              <YAxis hide />
              <Bar dataKey="views" fill="#8B5CF6" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Publication Goals Progress */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-white mb-4">Publication Goals</h4>
        <div className="space-y-3">
          {activeGoals.map((goal, index) => (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              className="p-3 bg-slate-800/30 rounded-lg"
            >
              <div className="flex items-center justify-between mb-2">
                <h5 className="text-sm font-medium text-white">{goal.title}</h5>
                <span className="text-sm text-slate-400">
                  {goal.currentValue}/{goal.targetValue}
                </span>
              </div>
              
              <div className="bg-slate-700 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(goal.currentValue / goal.targetValue) * 100}%` }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.8 }}
                  className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-2 rounded-full"
                />
              </div>
              
              <div className="flex items-center justify-between mt-2 text-xs text-slate-400">
                <span>{Math.round((goal.currentValue / goal.targetValue) * 100)}% complete</span>
                <span>Due: {new Date(goal.targetDate).toLocaleDateString()}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Top Performing Content */}
      <div>
        <h4 className="text-sm font-medium text-white mb-4">Top Performing Content</h4>
        <div className="space-y-2">
          {currentMetrics?.contentPerformance.topPerforming.map((title, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-gradient-to-r from-emerald-500 to-emerald-400 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{index + 1}</span>
                </div>
                <span className="text-sm text-white">{title}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Eye className="w-3 h-3 text-blue-400" />
                <span className="text-xs text-slate-400">
                  {Math.floor(Math.random() * 5000 + 1000)} views
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-6 p-3 bg-emerald-600/20 rounded-lg">
        <p className="text-sm text-emerald-300">
          📈 Your content reach has grown 85% this quarter. Keep up the great momentum!
        </p>
      </div>
    </motion.div>
  )
}