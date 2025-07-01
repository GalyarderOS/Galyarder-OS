import { consciousnessDB, ConsciousnessMetric } from './supabase'
import { useAuthGuard } from './auth'
import { useAIConsciousness } from './ai'

// Consciousness Analytics Types
export interface ConsciousnessGrowthMetric {
  date: string
  module: string
  score: number
  change: number
  trend: 'up' | 'down' | 'stable'
}

export interface ConsciousnessInsight {
  type: 'strength' | 'opportunity' | 'pattern' | 'recommendation'
  title: string
  description: string
  impact: 'high' | 'medium' | 'low'
  actionable: boolean
  module?: string
}

export interface ConsciousnessReport {
  overallScore: number
  growth: number
  strengths: string[]
  opportunities: string[]
  insights: ConsciousnessInsight[]
  recommendations: string[]
  moduleScores: Record<string, number>
  trends: ConsciousnessGrowthMetric[]
}

// Consciousness Analytics Hook
export const useConsciousnessAnalytics = () => {
  const { userId } = useAuthGuard()
  const { getConsciousnessInsights } = useAIConsciousness('analytics')

  const trackMetric = async (
    module: string,
    metricName: string,
    metricValue: any,
    date?: string
  ): Promise<boolean> => {
    if (!userId) return false

    try {
      await consciousnessDB.create<ConsciousnessMetric>('consciousness_metrics', {
        user_id: userId,
        date: date || new Date().toISOString().split('T')[0],
        module,
        metric_name: metricName,
        metric_value: metricValue
      })
      return true
    } catch (error) {
      console.error('Consciousness metric tracking error:', error)
      return false
    }
  }

  const getConsciousnessScore = async (module?: string, days: number = 30): Promise<number> => {
    if (!userId) return 0

    try {
      const startDate = new Date()
      startDate.setDate(startDate.getDate() - days)
      
      const filters: any = {
        user_id: userId,
        // date: `gte.${startDate.toISOString().split('T')[0]}`
      }
      
      if (module) {
        filters.module = module
      }

      const metrics = await consciousnessDB.read<ConsciousnessMetric>('consciousness_metrics', filters)
      
      // Calculate consciousness score based on various factors
      return calculateConsciousnessScore(metrics, module)
    } catch (error) {
      console.error('Consciousness score calculation error:', error)
      return 0
    }
  }

  const getGrowthTrends = async (days: number = 30): Promise<ConsciousnessGrowthMetric[]> => {
    if (!userId) return []

    try {
      const startDate = new Date()
      startDate.setDate(startDate.getDate() - days)
      
      const metrics = await consciousnessDB.read<ConsciousnessMetric>('consciousness_metrics', {
        user_id: userId
      })

      return calculateGrowthTrends(metrics, days)
    } catch (error) {
      console.error('Growth trends calculation error:', error)
      return []
    }
  }

  const generateConsciousnessReport = async (days: number = 30): Promise<ConsciousnessReport> => {
    if (!userId) return createEmptyReport()

    try {
      // Gather all consciousness data
      const [overallScore, trends, moduleData] = await Promise.all([
        getConsciousnessScore(undefined, days),
        getGrowthTrends(days),
        getModuleAnalytics(days)
      ])

      // Generate AI insights
      const insights = await getConsciousnessInsights({
        overallScore,
        trends,
        moduleData,
        timeframe: days
      })

      return {
        overallScore,
        growth: calculateGrowthRate(trends),
        strengths: identifyStrengths(moduleData),
        opportunities: identifyOpportunities(moduleData),
        insights: await parseInsights(insights),
        recommendations: await generateRecommendations(moduleData),
        moduleScores: moduleData,
        trends
      }
    } catch (error) {
      console.error('Consciousness report generation error:', error)
      return createEmptyReport()
    }
  }

  const getModuleAnalytics = async (days: number = 30): Promise<Record<string, number>> => {
    if (!userId) return {}

    const modules = [
      'dashboard', 'chronocopilot', 'healthforge', 'mindguard', 'spiritualforge',
      'financehub', 'knowledgearsenal', 'relationshipsforge', 'familymatrix',
      'aiassistant', 'environmentarchitect', 'sleeparchitect', 'metamemory',
      'worldintelligence', 'networknexus', 'legacybuilder', 'careercommand',
      'opscenter', 'privacyvault', 'digitalsovereigntyvault', 'systemkernel',
      'systemlogs', 'productivitymatrix', 'communicationconsole', 'creativeLab',
      'calculator', 'calendar', 'files', 'appdrawer', 'settings'
    ]

    const moduleScores: Record<string, number> = {}

    for (const module of modules) {
      moduleScores[module] = await getConsciousnessScore(module, days)
    }

    return moduleScores
  }

  const getConsciousnessPatterns = async (timeframe: number = 7): Promise<ConsciousnessInsight[]> => {
    if (!userId) return []

    try {
      const moduleData = await getModuleAnalytics(timeframe)
      const trends = await getGrowthTrends(timeframe)
      
      return analyzeConsciousnessPatterns(moduleData, trends)
    } catch (error) {
      console.error('Consciousness insights error:', error)
      return []
    }
  }

  return {
    trackMetric,
    getConsciousnessScore,
    getGrowthTrends,
    generateConsciousnessReport,
    getModuleAnalytics,
    getConsciousnessPatterns
  }
}

// Consciousness Calculation Functions
const calculateConsciousnessScore = (metrics: ConsciousnessMetric[], module?: string): number => {
  if (metrics.length === 0) return 0

  // Filter by module if specified
  const relevantMetrics = module 
    ? metrics.filter(m => m.module === module)
    : metrics

  if (relevantMetrics.length === 0) return 0

  // Weight different types of metrics
  const metricWeights: Record<string, number> = {
    'completion_rate': 0.3,
    'focus_time': 0.25,
    'productivity_score': 0.2,
    'consistency': 0.15,
    'growth_rate': 0.1
  }

  let totalScore = 0
  let totalWeight = 0

  relevantMetrics.forEach(metric => {
    const weight = metricWeights[metric.metric_name] || 0.1
    const value = normalizeMetricValue(metric.metric_value, metric.metric_name)
    
    totalScore += value * weight
    totalWeight += weight
  })

  return totalWeight > 0 ? Math.round((totalScore / totalWeight) * 100) : 0
}

const normalizeMetricValue = (value: any, metricName: string): number => {
  // Normalize different metric types to 0-1 scale
  switch (metricName) {
    case 'completion_rate':
      return Math.min(value / 100, 1)
    case 'focus_time':
      return Math.min(value / 8, 1) // 8 hours max
    case 'productivity_score':
      return Math.min(value / 100, 1)
    case 'consistency':
      return Math.min(value / 100, 1)
    case 'growth_rate':
      return Math.min((value + 100) / 200, 1) // -100% to +100%
    default:
      return typeof value === 'number' ? Math.min(value / 100, 1) : 0
  }
}

const calculateGrowthTrends = (metrics: ConsciousnessMetric[], days: number): ConsciousnessGrowthMetric[] => {
  const moduleGroups = metrics.reduce((acc, metric) => {
    if (!acc[metric.module]) acc[metric.module] = []
    acc[metric.module].push(metric)
    return acc
  }, {} as Record<string, ConsciousnessMetric[]>)

  const trends: ConsciousnessGrowthMetric[] = []

  Object.entries(moduleGroups).forEach(([module, moduleMetrics]) => {
    const sortedMetrics = moduleMetrics.sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    )

    if (sortedMetrics.length >= 2) {
      const latest = sortedMetrics[sortedMetrics.length - 1]
      const previous = sortedMetrics[sortedMetrics.length - 2]
      
      const latestScore = calculateConsciousnessScore([latest])
      const previousScore = calculateConsciousnessScore([previous])
      
      const change = latestScore - previousScore
      let trend: 'up' | 'down' | 'stable' = 'stable'
      
      if (change > 5) trend = 'up'
      else if (change < -5) trend = 'down'

      trends.push({
        date: latest.date,
        module,
        score: latestScore,
        change,
        trend
      })
    }
  })

  return trends
}

const calculateGrowthRate = (trends: ConsciousnessGrowthMetric[]): number => {
  if (trends.length === 0) return 0
  
  const totalChange = trends.reduce((sum, trend) => sum + trend.change, 0)
  return Math.round(totalChange / trends.length)
}

const identifyStrengths = (moduleData: Record<string, number>): string[] => {
  const sorted = Object.entries(moduleData)
    .filter(([_, score]) => score > 70)
    .sort(([_, a], [__, b]) => b - a)
    .slice(0, 3)
    .map(([module, _]) => formatModuleName(module))

  return sorted
}

const identifyOpportunities = (moduleData: Record<string, number>): string[] => {
  const sorted = Object.entries(moduleData)
    .filter(([_, score]) => score < 50)
    .sort(([_, a], [__, b]) => a - b)
    .slice(0, 3)
    .map(([module, _]) => formatModuleName(module))

  return sorted
}

const formatModuleName = (module: string): string => {
  const nameMap: Record<string, string> = {
    'chronocopilot': 'Time Management',
    'healthforge': 'Health & Wellness',
    'mindguard': 'Mental Wellness',
    'spiritualforge': 'Spiritual Growth',
    'financehub': 'Financial Management',
    'knowledgearsenal': 'Knowledge Management',
    'relationshipsforge': 'Relationships',
    'familymatrix': 'Family Dynamics',
    'environmentarchitect': 'Environment Design',
    'sleeparchitect': 'Sleep Optimization'
  }

  return nameMap[module] || module.charAt(0).toUpperCase() + module.slice(1)
}

const analyzeConsciousnessPatterns = (
  moduleData: Record<string, number>,
  trends: ConsciousnessGrowthMetric[]
): ConsciousnessInsight[] => {
  const insights: ConsciousnessInsight[] = []

  // Identify high-performing areas
  const strengths = Object.entries(moduleData).filter(([_, score]) => score > 80)
  if (strengths.length > 0) {
    insights.push({
      type: 'strength',
      title: 'High Consciousness Areas',
      description: `Excellent performance in ${strengths.map(([module, _]) => formatModuleName(module)).join(', ')}`,
      impact: 'high',
      actionable: false
    })
  }

  // Identify improvement opportunities
  const opportunities = Object.entries(moduleData).filter(([_, score]) => score < 40)
  if (opportunities.length > 0) {
    insights.push({
      type: 'opportunity',
      title: 'Growth Opportunities',
      description: `Focus needed in ${opportunities.map(([module, _]) => formatModuleName(module)).join(', ')}`,
      impact: 'high',
      actionable: true
    })
  }

  // Identify patterns
  const upwardTrends = trends.filter(t => t.trend === 'up').length
  const downwardTrends = trends.filter(t => t.trend === 'down').length

  if (upwardTrends > downwardTrends) {
    insights.push({
      type: 'pattern',
      title: 'Positive Growth Momentum',
      description: `${upwardTrends} areas showing improvement vs ${downwardTrends} declining`,
      impact: 'medium',
      actionable: false
    })
  }

  return insights
}

const parseInsights = async (aiInsights: string): Promise<ConsciousnessInsight[]> => {
  // Parse AI-generated insights into structured format
  // This would normally parse the AI response, for now return basic structure
  return [
    {
      type: 'recommendation',
      title: 'AI Consciousness Guidance',
      description: aiInsights.slice(0, 200) + '...',
      impact: 'high',
      actionable: true
    }
  ]
}

const generateRecommendations = async (moduleData: Record<string, number>): Promise<string[]> => {
  const recommendations: string[] = []

  // Add specific recommendations based on module performance
  const lowPerforming = Object.entries(moduleData)
    .filter(([_, score]) => score < 50)
    .sort(([_, a], [__, b]) => a - b)
    .slice(0, 2)

  lowPerforming.forEach(([module, score]) => {
    recommendations.push(`Focus on improving ${formatModuleName(module)} (current score: ${score})`)
  })

  return recommendations
}

const createEmptyReport = (): ConsciousnessReport => ({
  overallScore: 0,
  growth: 0,
  strengths: [],
  opportunities: [],
  insights: [],
  recommendations: [],
  moduleScores: {},
  trends: []
})

// Export analytics utilities
export {
  calculateConsciousnessScore,
  calculateGrowthTrends,
  identifyStrengths,
  identifyOpportunities,
  formatModuleName
}