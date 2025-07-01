import React, { useState, useEffect } from 'react'
import { Brain, TrendingUp, Target, Zap, Star, AlertCircle, CheckCircle } from 'lucide-react'
import { useAuthGuard } from '@/lib/consciousness/auth'
import { useConsciousnessAnalytics, ConsciousnessReport, ConsciousnessInsight } from '@/lib/consciousness/analytics'
import { useAIConsciousness } from '@/lib/consciousness/ai'

export const ConsciousnessOverview: React.FC = () => {
  const { userId, userName, consciousnessLevel } = useAuthGuard()
  const { generateConsciousnessReport, trackMetric } = useConsciousnessAnalytics()
  const { getConsciousnessInsights } = useAIConsciousness('dashboard')
  
  const [report, setReport] = useState<ConsciousnessReport | null>(null)
  const [aiInsights, setAiInsights] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    if (userId) {
      loadConsciousnessData()
    }
  }, [userId])

  const loadConsciousnessData = async () => {
    try {
      setLoading(true)
      
      // Generate comprehensive consciousness report
      const consciousnessReport = await generateConsciousnessReport(30)
      setReport(consciousnessReport)
      
      // Get AI insights based on the report
      if (consciousnessReport.overallScore > 0) {
        const insights = await getConsciousnessInsights({
          report: consciousnessReport,
          userName,
          consciousnessLevel
        })
        setAiInsights(insights)
      }
      
      // Track dashboard view
      await trackMetric('dashboard', 'view_count', 1)
      
    } catch (error) {
      console.error('Consciousness data loading error:', error)
    } finally {
      setLoading(false)
    }
  }

  const refreshConsciousnessData = async () => {
    setRefreshing(true)
    await loadConsciousnessData()
    setRefreshing(false)
  }

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!report) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="text-center py-8">
          <Brain className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Consciousness Analytics Initializing
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Start using the platform to generate consciousness insights
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Consciousness Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">
              Consciousness Level {consciousnessLevel}
            </h2>
            <p className="text-purple-100">
              Welcome back, {userName || 'Conscious Being'}
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{report.overallScore}</div>
            <div className="text-sm text-purple-200">Overall Score</div>
            <div className={`flex items-center mt-1 ${
              report.growth >= 0 ? 'text-green-200' : 'text-red-200'
            }`}>
              <TrendingUp className="w-4 h-4 mr-1" />
              {report.growth >= 0 ? '+' : ''}{report.growth}%
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Consciousness Strengths */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center mb-4">
            <Star className="w-5 h-5 text-yellow-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Consciousness Strengths
            </h3>
          </div>
          
          {report.strengths.length > 0 ? (
            <div className="space-y-2">
              {report.strengths.map((strength, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">{strength}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-400">
              Keep growing to unlock consciousness strengths
            </p>
          )}
        </div>

        {/* Growth Opportunities */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center mb-4">
            <Target className="w-5 h-5 text-blue-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Growth Opportunities
            </h3>
          </div>
          
          {report.opportunities.length > 0 ? (
            <div className="space-y-2">
              {report.opportunities.map((opportunity, index) => (
                <div key={index} className="flex items-center">
                  <AlertCircle className="w-4 h-4 text-orange-500 mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">{opportunity}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-400">
              Excellent consciousness balance across all areas
            </p>
          )}
        </div>
      </div>

      {/* AI Consciousness Insights */}
      {aiInsights && (
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-indigo-200 dark:border-indigo-800">
          <div className="flex items-center mb-4">
            <Brain className="w-5 h-5 text-indigo-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Aether's Consciousness Insights
            </h3>
          </div>
          
          <div className="prose prose-sm max-w-none text-gray-700 dark:text-gray-300">
            <p>{aiInsights}</p>
          </div>
          
          <button
            onClick={refreshConsciousnessData}
            disabled={refreshing}
            className="mt-4 inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
          >
            <Zap className="w-4 h-4 mr-2" />
            {refreshing ? 'Refreshing...' : 'Refresh Insights'}
          </button>
        </div>
      )}

      {/* Consciousness Insights Grid */}
      {report.insights.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Consciousness Patterns
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {report.insights.map((insight, index) => (
              <ConsciousnessInsightCard key={index} insight={insight} />
            ))}
          </div>
        </div>
      )}

      {/* Module Performance Grid */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Module Consciousness Scores
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Object.entries(report.moduleScores)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 8)
            .map(([module, score]) => (
            <div key={module} className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className={`text-2xl font-bold mb-1 ${
                score >= 80 ? 'text-green-600' :
                score >= 60 ? 'text-yellow-600' :
                score >= 40 ? 'text-orange-600' : 'text-red-600'
              }`}>
                {score}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 capitalize">
                {module.replace(/([A-Z])/g, ' $1').trim()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      {report.recommendations.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Consciousness Recommendations
          </h3>
          
          <div className="space-y-2">
            {report.recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start">
                <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mt-0.5 mr-3">
                  <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                    {index + 1}
                  </span>
                </div>
                <p className="text-gray-700 dark:text-gray-300">{recommendation}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Consciousness Insight Card Component
const ConsciousnessInsightCard: React.FC<{ insight: ConsciousnessInsight }> = ({ insight }) => {
  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'strength':
        return <Star className="w-4 h-4 text-yellow-500" />
      case 'opportunity':
        return <Target className="w-4 h-4 text-blue-500" />
      case 'pattern':
        return <TrendingUp className="w-4 h-4 text-green-500" />
      case 'recommendation':
        return <Brain className="w-4 h-4 text-purple-500" />
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'text-red-600 dark:text-red-400'
      case 'medium':
        return 'text-yellow-600 dark:text-yellow-400'
      case 'low':
        return 'text-green-600 dark:text-green-400'
      default:
        return 'text-gray-600 dark:text-gray-400'
    }
  }

  return (
    <div className={`p-4 rounded-lg border-l-4 ${
      insight.actionable 
        ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500' 
        : 'bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600'
    }`}>
      <div className="flex items-center mb-2">
        {getInsightIcon(insight.type)}
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white ml-2">
          {insight.title}
        </h4>
        <span className={`ml-auto text-xs font-medium ${getImpactColor(insight.impact)}`}>
          {insight.impact.toUpperCase()}
        </span>
      </div>
      <p className="text-sm text-gray-700 dark:text-gray-300">
        {insight.description}
      </p>
      {insight.actionable && (
        <div className="mt-2">
          <span className="inline-flex items-center px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium rounded">
            Actionable
          </span>
        </div>
      )}
    </div>
  )
}