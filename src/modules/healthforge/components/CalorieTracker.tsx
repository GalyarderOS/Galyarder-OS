import { motion } from 'framer-motion'
import { Plus, Target, Flame } from 'lucide-react'

const todaysMeals = [
  { name: 'Breakfast', calories: 420, time: '8:00 AM' },
  { name: 'Lunch', calories: 650, time: '12:30 PM' },
  { name: 'Snack', calories: 180, time: '3:00 PM' },
  { name: 'Dinner', calories: 580, time: '7:00 PM' }
]

export function CalorieTracker() {
  const totalCalories = todaysMeals.reduce((sum, meal) => sum + meal.calories, 0)
  const targetCalories = 2200
  const remainingCalories = targetCalories - totalCalories

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">Calorie Tracker</h3>
        <button className="flex items-center space-x-2 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors">
          <Plus className="w-4 h-4 text-white" />
          <span className="text-white text-sm">Add Meal</span>
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <Flame className="w-5 h-5 text-orange-400 mx-auto mb-2" />
          <p className="text-lg font-bold text-white">{totalCalories}</p>
          <p className="text-xs text-slate-400">Consumed</p>
        </div>
        
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <Target className="w-5 h-5 text-blue-400 mx-auto mb-2" />
          <p className="text-lg font-bold text-white">{targetCalories}</p>
          <p className="text-xs text-slate-400">Target</p>
        </div>
        
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <div className="w-5 h-5 bg-emerald-400 rounded-full mx-auto mb-2" />
          <p className={`text-lg font-bold ${remainingCalories >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            {Math.abs(remainingCalories)}
          </p>
          <p className="text-xs text-slate-400">
            {remainingCalories >= 0 ? 'Remaining' : 'Over'}
          </p>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm text-slate-400 mb-2">
          <span>Daily Progress</span>
          <span>{Math.round((totalCalories / targetCalories) * 100)}%</span>
        </div>
        <div className="bg-slate-700 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min((totalCalories / targetCalories) * 100, 100)}%` }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-2 rounded-full"
          />
        </div>
      </div>

      <div className="space-y-3">
        {todaysMeals.map((meal, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
            className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg"
          >
            <div>
              <p className="text-sm font-medium text-white">{meal.name}</p>
              <p className="text-xs text-slate-400">{meal.time}</p>
            </div>
            <p className="text-sm font-medium text-emerald-400">{meal.calories} cal</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}