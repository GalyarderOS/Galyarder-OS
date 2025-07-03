import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Plus, Clock, CheckCircle, Circle, Calendar, 
  BarChart3, Timer, Target, Zap 
} from 'lucide-react'
import { getThemeClasses } from '../../lib/theme'

interface Task {
  id: string
  title: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
  dueDate?: Date
}

export function Productivity() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Review morning goals', completed: true, priority: 'high' },
    { id: '2', title: 'Complete project proposal', completed: false, priority: 'high' },
    { id: '3', title: 'Daily consciousness log', completed: false, priority: 'medium' },
    { id: '4', title: 'Exercise routine', completed: false, priority: 'medium' },
    { id: '5', title: 'Read 30 minutes', completed: false, priority: 'low' }
  ])
  
  const [newTask, setNewTask] = useState('')
  const [focusTimer, setFocusTimer] = useState(25) // Pomodoro timer
  const [isTimerRunning, setIsTimerRunning] = useState(false)

  const { colors } = getThemeClasses()

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, {
        id: Date.now().toString(),
        title: newTask,
        completed: false,
        priority: 'medium'
      }])
      setNewTask('')
    }
  }

  const completedTasks = tasks.filter(t => t.completed).length
  const totalTasks = tasks.length
  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0

  const priorityColors = {
    high: colors.status.error,
    medium: colors.status.warning,
    low: colors.status.success
  }

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
          Productivity Matrix
        </h1>
        <p 
          className="text-lg opacity-80"
          style={{ color: colors.text.secondary }}
        >
          Master your tasks and time with focused execution
        </p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div 
          className="p-6 rounded-xl border"
          style={{
            backgroundColor: colors.bg.elevated,
            borderColor: colors.border.primary
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <Target className="w-5 h-5" style={{ color: colors.consciousness.primary }} />
            <span className="text-2xl font-bold" style={{ color: colors.text.primary }}>
              {completedTasks}/{totalTasks}
            </span>
          </div>
          <div className="text-sm" style={{ color: colors.text.secondary }}>
            Tasks Completed
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
            <BarChart3 className="w-5 h-5" style={{ color: colors.status.success }} />
            <span className="text-2xl font-bold" style={{ color: colors.text.primary }}>
              {Math.round(completionRate)}%
            </span>
          </div>
          <div className="text-sm" style={{ color: colors.text.secondary }}>
            Completion Rate
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
              4.2h
            </span>
          </div>
          <div className="text-sm" style={{ color: colors.text.secondary }}>
            Focus Time Today
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
            <Zap className="w-5 h-5" style={{ color: colors.consciousness.secondary }} />
            <span className="text-2xl font-bold" style={{ color: colors.text.primary }}>
              92
            </span>
          </div>
          <div className="text-sm" style={{ color: colors.text.secondary }}>
            Productivity Score
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Task Management */}
        <motion.div 
          className="lg:col-span-2 space-y-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div>
            <h2 
              className="text-xl font-semibold mb-4"
              style={{ color: colors.text.primary }}
            >
              Task Management
            </h2>
            
            {/* Add Task Input */}
            <div className="flex gap-2 mb-6">
              <input
                type="text"
                placeholder="Add a new task..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTask()}
                className="flex-1 px-4 py-2 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: colors.bg.elevated,
                  borderColor: colors.border.primary,
                  color: colors.text.primary,
                  '--tw-ring-color': colors.consciousness.primary
                } as React.CSSProperties}
              />
              <motion.button
                onClick={addTask}
                className="px-4 py-2 rounded-lg flex items-center gap-2"
                style={{
                  backgroundColor: colors.consciousness.primary,
                  color: colors.text.inverse
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Plus className="w-4 h-4" />
                Add
              </motion.button>
            </div>

            {/* Task List */}
            <div className="space-y-3">
              {tasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  className="flex items-center gap-3 p-4 rounded-lg border"
                  style={{
                    backgroundColor: colors.bg.elevated,
                    borderColor: colors.border.primary
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <button
                    onClick={() => toggleTask(task.id)}
                    className="flex-shrink-0"
                  >
                    {task.completed ? (
                      <CheckCircle 
                        className="w-5 h-5" 
                        style={{ color: colors.status.success }} 
                      />
                    ) : (
                      <Circle 
                        className="w-5 h-5" 
                        style={{ color: colors.text.tertiary }} 
                      />
                    )}
                  </button>
                  
                  <div className="flex-1">
                    <div 
                      className={`${task.completed ? 'line-through opacity-60' : ''}`}
                      style={{ color: colors.text.primary }}
                    >
                      {task.title}
                    </div>
                  </div>
                  
                  <div 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: priorityColors[task.priority] }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Focus Timer & Tools */}
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* Pomodoro Timer */}
          <div 
            className="p-6 rounded-xl border"
            style={{
              backgroundColor: colors.bg.elevated,
              borderColor: colors.border.primary
            }}
          >
            <h3 
              className="text-lg font-semibold mb-4"
              style={{ color: colors.text.primary }}
            >
              Focus Timer
            </h3>
            
            <div className="text-center mb-6">
              <div 
                className="text-4xl font-mono font-bold mb-2"
                style={{ color: colors.consciousness.primary }}
              >
                {Math.floor(focusTimer / 60).toString().padStart(2, '0')}:
                {(focusTimer % 60).toString().padStart(2, '0')}
              </div>
              <div 
                className="text-sm"
                style={{ color: colors.text.secondary }}
              >
                Pomodoro Session
              </div>
            </div>

            <div className="space-y-3">
              <motion.button
                className="w-full py-2 px-4 rounded-lg font-medium"
                style={{
                  backgroundColor: isTimerRunning 
                    ? colors.status.error 
                    : colors.consciousness.primary,
                  color: colors.text.inverse
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsTimerRunning(!isTimerRunning)}
              >
                {isTimerRunning ? 'Stop' : 'Start'} Focus
              </motion.button>
              
              <button
                className="w-full py-2 px-4 rounded-lg border font-medium"
                style={{
                  backgroundColor: colors.bg.primary,
                  borderColor: colors.border.primary,
                  color: colors.text.secondary
                }}
                onClick={() => {
                  setFocusTimer(25)
                  setIsTimerRunning(false)
                }}
              >
                Reset (25min)
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div 
            className="p-6 rounded-xl border"
            style={{
              backgroundColor: colors.bg.elevated,
              borderColor: colors.border.primary
            }}
          >
            <h3 
              className="text-lg font-semibold mb-4"
              style={{ color: colors.text.primary }}
            >
              Today's Progress
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span style={{ color: colors.text.secondary }}>Focus Sessions</span>
                <span style={{ color: colors.text.primary }}>8</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: colors.text.secondary }}>Deep Work</span>
                <span style={{ color: colors.text.primary }}>3.2h</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: colors.text.secondary }}>Breaks Taken</span>
                <span style={{ color: colors.text.primary }}>7</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: colors.text.secondary }}>Productivity Score</span>
                <span style={{ color: colors.consciousness.primary }}>92/100</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}