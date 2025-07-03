import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Brain, TrendingUp, Calendar, Clock, 
  Star, Activity, Zap, Target 
} from 'lucide-react'
import { getThemeClasses } from '../../lib/theme'

interface ConsciousnessEntry {
  id: string
  date: Date
  level: number
  mood: 'excellent' | 'good' | 'neutral' | 'low'
  energy: number
  focus: number
  notes: string
}

export function Consciousness() {
  const [entries] = useState<ConsciousnessEntry[]>([
    {
      id: '1',
      date: new Date(),
      level: 7.2,
      mood: 'good',
      energy: 8,
      focus: 7,
      notes: 'Felt clear and productive today'
    },
    {
      id: '2',
      date: new Date(Date.now() - 86400000),
      level: 6.8,
      mood: 'good',
      energy: 7,
      focus: 6,
      notes: 'Good morning routine, slight afternoon dip'
    },
    {
      id: '3',
      date: new Date(Date.now() - 172800000),
      level: 6.5,
      mood: 'neutral',
      energy: 6,
      focus: 7,
      notes: 'Balanced day with steady focus'
    }
  ])

  const [currentLevel, setCurrentLevel] = useState(7.2)
  const [quickMood, setQuickMood] = useState<'excellent' | 'good' | 'neutral' | 'low'>('good')

  const { colors } = getThemeClasses()

  const moodColors = {
    excellent: colors.status.success,
    good: colors.consciousness.primary,
    neutral: colors.status.warning,
    low: colors.status.error
  }

  const weeklyAverage = entries.reduce((sum, entry) => sum + entry.level, 0) / entries.length
  const trend = entries.length > 1 ? entries[0].level - entries[1].level : 0

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 
          className="text-3xl font-bold mb-2"
          style={{ color: colors.text.primary }}
        >
          Consciousness Tracking
        </h1>
        <p 
          className="text-lg opacity-80"
          style={{ color: colors.text.secondary }}
        >
          Monitor and elevate your awareness levels
        </p>
      </motion.div>

      {/* Current Level Card */}
      <motion.div 
        className="p-8 rounded-2xl border"
        style={{
          backgroundColor: colors.bg.elevated,
          borderColor: colors.border.primary
        }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-4">
            <div 
              className="p-4 rounded-full"
              style={{ backgroundColor: `${colors.consciousness.primary}20` }}
            >
              <Brain 
                className="w-8 h-8" 
                style={{ color: colors.consciousness.primary }} 
              />
            </div>
          </div>
          
          <div 
            className="text-6xl font-bold mb-2"
            style={{ color: colors.consciousness.primary }}
          >
            {currentLevel.toFixed(1)}
          </div>
          
          <div 
            className="text-lg font-medium mb-4"
            style={{ color: colors.text.primary }}
          >
            Current Consciousness Level
          </div>

          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <TrendingUp 
                className="w-4 h-4" 
                style={{ color: trend >= 0 ? colors.status.success : colors.status.error }} 
              />
              <span 
                className="text-sm font-medium"
                style={{ color: trend >= 0 ? colors.status.success : colors.status.error }}
              >
                {trend >= 0 ? '+' : ''}{trend.toFixed(1)} from yesterday
              </span>
            </div>
          </div>
        </div>

        {/* Quick Log */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label 
              className="block text-sm font-medium mb-2"
              style={{ color: colors.text.secondary }}
            >
              Current Mood
            </label>
            <select
              value={quickMood}
              onChange={(e) => setQuickMood(e.target.value as any)}
              className="w-full p-2 rounded-lg border"
              style={{
                backgroundColor: colors.bg.primary,
                borderColor: colors.border.primary,
                color: colors.text.primary
              }}
            >
              <option value="excellent">🌟 Excellent</option>
              <option value="good">😊 Good</option>
              <option value="neutral">😐 Neutral</option>
              <option value="low">😔 Low</option>
            </select>
          </div>

          <div>
            <label 
              className="block text-sm font-medium mb-2"
              style={{ color: colors.text.secondary }}
            >
              Energy Level
            </label>
            <input
              type="range"
              min="1"
              max="10"
              defaultValue="8"
              className="w-full"
              style={{ accentColor: colors.consciousness.primary }}
            />
          </div>

          <div>
            <label 
              className="block text-sm font-medium mb-2"
              style={{ color: colors.text.secondary }}
            >
              Focus Level
            </label>
            <input
              type="range"
              min="1"
              max="10"
              defaultValue="7"
              className="w-full"
              style={{ accentColor: colors.consciousness.secondary }}
            />
          </div>

          <div className="flex items-end">
            <motion.button
              className="w-full py-2 px-4 rounded-lg font-medium"
              style={{
                backgroundColor: colors.consciousness.primary,
                color: colors.text.inverse
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Log Entry
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div 
          className="p-6 rounded-xl border"
          style={{
            backgroundColor: colors.bg.elevated,
            borderColor: colors.border.primary
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <Activity className="w-5 h-5" style={{ color: colors.consciousness.primary }} />
            <span className="text-2xl font-bold" style={{ color: colors.text.primary }}>
              {weeklyAverage.toFixed(1)}
            </span>
          </div>
          <div className="text-sm" style={{ color: colors.text.secondary }}>
            Weekly Average
          </div>
        </div>

        <div 
          className="p-6 rounded-xl border"
          style={{
            backgroundColor: colors.bg.elevated,
            borderColor: colors.border.primary
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <Star className="w-5 h-5" style={{ color: colors.status.success }} />
            <span className="text-2xl font-bold" style={{ color: colors.text.primary }}>
              8.1
            </span>
          </div>
          <div className="text-sm" style={{ color: colors.text.secondary }}>
            Peak Level
          </div>
        </div>

        <div 
          className="p-6 rounded-xl border"
          style={{
            backgroundColor: colors.bg.elevated,
            borderColor: colors.border.primary
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <Clock className="w-5 h-5" style={{ color: colors.status.warning }} />
            <span className="text-2xl font-bold" style={{ color: colors.text.primary }}>
              12
            </span>
          </div>
          <div className="text-sm" style={{ color: colors.text.secondary }}>
            Days Tracked
          </div>
        </div>

        <div 
          className="p-6 rounded-xl border"
          style={{
            backgroundColor: colors.bg.elevated,
            borderColor: colors.border.primary
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <Target className="w-5 h-5" style={{ color: colors.consciousness.secondary }} />
            <span className="text-2xl font-bold" style={{ color: colors.text.primary }}>
              85%
            </span>
          </div>
          <div className="text-sm" style={{ color: colors.text.secondary }}>
            Goal Progress
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Entries */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 
            className="text-xl font-semibold mb-4"
            style={{ color: colors.text.primary }}
          >
            Recent Entries
          </h2>
          
          <div className="space-y-4">
            {entries.map((entry, index) => (
              <motion.div
                key={entry.id}
                className="p-4 rounded-lg border"
                style={{
                  backgroundColor: colors.bg.elevated,
                  borderColor: colors.border.primary
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div 
                    className="text-2xl font-bold"
                    style={{ color: colors.consciousness.primary }}
                  >
                    {entry.level.toFixed(1)}
                  </div>
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: moodColors[entry.mood] }}
                    />
                    <span 
                      className="text-xs capitalize"
                      style={{ color: colors.text.secondary }}
                    >
                      {entry.mood}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 mb-2 text-sm">
                  <span style={{ color: colors.text.secondary }}>
                    Energy: {entry.energy}/10
                  </span>
                  <span style={{ color: colors.text.secondary }}>
                    Focus: {entry.focus}/10
                  </span>
                </div>
                
                <p 
                  className="text-sm mb-2"
                  style={{ color: colors.text.primary }}
                >
                  {entry.notes}
                </p>
                
                <div 
                  className="text-xs"
                  style={{ color: colors.text.tertiary }}
                >
                  {entry.date.toLocaleDateString()}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Insights & Tips */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 
            className="text-xl font-semibold mb-4"
            style={{ color: colors.text.primary }}
          >
            Insights & Recommendations
          </h2>
          
          <div className="space-y-4">
            <div 
              className="p-4 rounded-lg border"
              style={{
                backgroundColor: colors.bg.elevated,
                borderColor: colors.border.primary
              }}
            >
              <div className="flex items-center gap-3 mb-2">
                <Zap 
                  className="w-5 h-5" 
                  style={{ color: colors.status.success }} 
                />
                <h3 
                  className="font-medium"
                  style={{ color: colors.text.primary }}
                >
                  Positive Trend
                </h3>
              </div>
              <p 
                className="text-sm"
                style={{ color: colors.text.secondary }}
              >
                Your consciousness levels have improved by 15% this week. Keep up the great work!
              </p>
            </div>

            <div 
              className="p-4 rounded-lg border"
              style={{
                backgroundColor: colors.bg.elevated,
                borderColor: colors.border.primary
              }}
            >
              <div className="flex items-center gap-3 mb-2">
                <Brain 
                  className="w-5 h-5" 
                  style={{ color: colors.consciousness.primary }} 
                />
                <h3 
                  className="font-medium"
                  style={{ color: colors.text.primary }}
                >
                  Morning Advantage
                </h3>
              </div>
              <p 
                className="text-sm"
                style={{ color: colors.text.secondary }}
              >
                Your highest levels consistently occur in the morning. Consider scheduling important tasks then.
              </p>
            </div>

            <div 
              className="p-4 rounded-lg border"
              style={{
                backgroundColor: colors.bg.elevated,
                borderColor: colors.border.primary
              }}
            >
              <div className="flex items-center gap-3 mb-2">
                <Target 
                  className="w-5 h-5" 
                  style={{ color: colors.status.warning }} 
                />
                <h3 
                  className="font-medium"
                  style={{ color: colors.text.primary }}
                >
                  Goal Suggestion
                </h3>
              </div>
              <p 
                className="text-sm"
                style={{ color: colors.text.secondary }}
              >
                Aim for a consistent 7.5+ level to reach your next consciousness milestone.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}