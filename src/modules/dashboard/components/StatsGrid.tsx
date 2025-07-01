import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'

const weeklyData = [
  { day: 'Mon', productivity: 85, energy: 78, mood: 82 },
  { day: 'Tue', productivity: 92, energy: 85, mood: 88 },
  { day: 'Wed', productivity: 78, energy: 72, mood: 75 },
  { day: 'Thu', productivity: 88, energy: 90, mood: 85 },
  { day: 'Fri', productivity: 95, energy: 88, mood: 92 },
  { day: 'Sat', productivity: 70, energy: 95, mood: 90 },
  { day: 'Sun', productivity: 65, energy: 85, mood: 88 }
]

const goalData = [
  { name: 'Health', value: 85, color: '#10B981' },
  { name: 'Career', value: 78, color: '#3B82F6' },
  { name: 'Finance', value: 92, color: '#8B5CF6' },
  { name: 'Learning', value: 73, color: '#F59E0B' }
]

export function StatsGrid() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-4">Weekly Trends</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={weeklyData}>
            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 12 }} />
            <YAxis hide />
            <Line 
              type="monotone" 
              dataKey="productivity" 
              stroke="#3B82F6" 
              strokeWidth={2}
              dot={{ fill: '#3B82F6', strokeWidth: 0, r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="energy" 
              stroke="#10B981" 
              strokeWidth={2}
              dot={{ fill: '#10B981', strokeWidth: 0, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-4">Goal Progress</h3>
        <div className="flex items-center justify-center">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={goalData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {goalData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-4">
          {goalData.map((goal) => (
            <div key={goal.name} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: goal.color }}
              />
              <span className="text-sm text-slate-300">{goal.name}</span>
              <span className="text-sm text-slate-400">{goal.value}%</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}