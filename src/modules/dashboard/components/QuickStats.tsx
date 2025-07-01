import React from 'react'
import { Activity, Target, Zap, Clock } from 'lucide-react'

interface QuickStatItem {
  label: string
  value: string | number
  progress?: number
  icon: React.ReactNode
  color: string
}

export const QuickStats: React.FC = () => {
  const stats: QuickStatItem[] = [
    {
      label: 'Tasks Today',
      value: '7/12',
      progress: 58,
      icon: <Target className="w-5 h-5" />,
      color: 'text-blue-500'
    },
    {
      label: 'Focus Time',
      value: '4.2h',
      progress: 70,
      icon: <Clock className="w-5 h-5" />,
      color: 'text-emerald-500'
    },
    {
      label: 'Energy Level',
      value: '85%',
      progress: 85,
      icon: <Zap className="w-5 h-5" />,
      color: 'text-amber-500'
    },
    {
      label: 'Daily Score',
      value: '92',
      progress: 92,
      icon: <Activity className="w-5 h-5" />,
      color: 'text-purple-500'
    }
  ]

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Quick Stats
      </h3>
      
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className={stat.color}>
                  {stat.icon}
                </div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  {stat.label}
                </span>
              </div>
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                {stat.value}
              </span>
            </div>
            
            {stat.progress !== undefined && (
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${stat.progress}%` }}
                  role="progressbar"
                  aria-valuenow={stat.progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500 dark:text-gray-400">
            Overall Progress
          </span>
          <span className="font-semibold text-emerald-600 dark:text-emerald-400">
            +12% from yesterday
          </span>
        </div>
      </div>
    </div>
  )
}