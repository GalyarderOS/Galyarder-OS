import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calculator, Activity } from 'lucide-react'

export function TDEECalculator() {
  const [formData, setFormData] = useState({
    age: 28,
    weight: 70,
    height: 175,
    gender: 'male',
    activity: 'moderate'
  })

  const calculateBMR = () => {
    if (formData.gender === 'male') {
      return 88.362 + (13.397 * formData.weight) + (4.799 * formData.height) - (5.677 * formData.age)
    } else {
      return 447.593 + (9.247 * formData.weight) + (3.098 * formData.height) - (4.330 * formData.age)
    }
  }

  const calculateTDEE = () => {
    const bmr = calculateBMR()
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9
    }
    return bmr * activityMultipliers[formData.activity as keyof typeof activityMultipliers]
  }

  const bmr = Math.round(calculateBMR())
  const tdee = Math.round(calculateTDEE())

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="glass-card rounded-xl p-6"
    >
      <div className="flex items-center space-x-3 mb-6">
        <Calculator className="w-5 h-5 text-blue-400" />
        <h3 className="text-xl font-semibold text-white">TDEE Calculator</h3>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm text-slate-400 mb-2">Age</label>
          <input
            type="number"
            value={formData.age}
            onChange={(e) => setFormData({...formData, age: parseInt(e.target.value)})}
            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
          />
        </div>
        
        <div>
          <label className="block text-sm text-slate-400 mb-2">Weight (kg)</label>
          <input
            type="number"
            value={formData.weight}
            onChange={(e) => setFormData({...formData, weight: parseInt(e.target.value)})}
            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
          />
        </div>
        
        <div>
          <label className="block text-sm text-slate-400 mb-2">Height (cm)</label>
          <input
            type="number"
            value={formData.height}
            onChange={(e) => setFormData({...formData, height: parseInt(e.target.value)})}
            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
          />
        </div>
        
        <div>
          <label className="block text-sm text-slate-400 mb-2">Gender</label>
          <select
            value={formData.gender}
            onChange={(e) => setFormData({...formData, gender: e.target.value})}
            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm text-slate-400 mb-2">Activity Level</label>
        <select
          value={formData.activity}
          onChange={(e) => setFormData({...formData, activity: e.target.value})}
          className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
        >
          <option value="sedentary">Sedentary (little/no exercise)</option>
          <option value="light">Light (light exercise 1-3 days/week)</option>
          <option value="moderate">Moderate (moderate exercise 3-5 days/week)</option>
          <option value="active">Active (hard exercise 6-7 days/week)</option>
          <option value="very_active">Very Active (very hard exercise, physical job)</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <Activity className="w-5 h-5 text-purple-400 mx-auto mb-2" />
          <p className="text-lg font-bold text-white">{bmr}</p>
          <p className="text-xs text-slate-400">BMR (calories/day)</p>
        </div>
        
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <div className="w-5 h-5 bg-emerald-400 rounded-full mx-auto mb-2" />
          <p className="text-lg font-bold text-emerald-400">{tdee}</p>
          <p className="text-xs text-slate-400">TDEE (calories/day)</p>
        </div>
      </div>

      <div className="mt-4 p-3 bg-blue-600/20 rounded-lg">
        <p className="text-sm text-blue-300">
          💡 Your TDEE is the total calories you burn per day including exercise
        </p>
      </div>
    </motion.div>
  )
}