import { useKnowledgeStore } from '../store/knowledgeStore'

export function useKnowledgeAI() {
  const { learningGoals, books, skills, studySessions } = useKnowledgeStore()

  const getAIContext = () => {
    return {
      learningGoals: learningGoals.map(goal => ({
        title: goal.title,
        category: goal.category,
        progress: goal.progress,
        priority: goal.priority,
        status: goal.status
      })),
      books: books.map(book => ({
        title: book.title,
        author: book.author,
        status: book.status,
        progress: book.progress,
        category: book.category
      })),
      skills: skills.map(skill => ({
        name: skill.name,
        category: skill.category,
        level: skill.level,
        targetLevel: skill.targetLevel,
        totalHours: skill.totalHours
      })),
      studySessions: studySessions.slice(-10).map(session => ({
        subject: session.subject,
        duration: session.duration,
        effectiveness: session.effectiveness,
        type: session.type
      }))
    }
  }

  const generateLearningInsights = () => {
    const context = getAIContext()
    
    // Mock AI insights based on data patterns
    const insights = []
    
    // Check for stagnant goals
    const stagnantGoals = learningGoals.filter(goal => 
      goal.status === 'active' && goal.progress < 20
    )
    if (stagnantGoals.length > 0) {
      insights.push({
        type: 'warning',
        message: `You have ${stagnantGoals.length} learning goals with low progress. Consider breaking them into smaller milestones.`
      })
    }

    // Check reading consistency
    const recentSessions = studySessions.filter(session => {
      const sessionDate = new Date(session.date)
      const oneWeekAgo = new Date()
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
      return sessionDate >= oneWeekAgo
    })
    
    if (recentSessions.length < 3) {
      insights.push({
        type: 'suggestion',
        message: 'Your study frequency has decreased. Try scheduling 30-minute daily learning blocks.'
      })
    }

    // Skill development recommendations
    const skillsNeedingAttention = skills.filter(skill => {
      const daysSinceLastPractice = Math.floor(
        (new Date().getTime() - new Date(skill.lastPracticed).getTime()) / (1000 * 60 * 60 * 24)
      )
      return daysSinceLastPractice > 7
    })
    
    if (skillsNeedingAttention.length > 0) {
      insights.push({
        type: 'reminder',
        message: `${skillsNeedingAttention.length} skills haven't been practiced recently. Consider dedicating time to maintain them.`
      })
    }

    return insights
  }

  return {
    getAIContext,
    generateLearningInsights
  }
}