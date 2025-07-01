import { useState } from 'react'
import { useNetworkStore } from '../store/networkStore'

interface NetworkSuggestion {
  id: string
  type: 'contact' | 'opportunity' | 'insight'
  title: string
  description: string
  priority: 'low' | 'medium' | 'high'
  actionable: boolean
}

interface NetworkAnalysis {
  insights: string[]
  suggestions: NetworkSuggestion[]
  networkScore: number
  growthOpportunities: string[]
}

export function useNetworkAI() {
  const { contacts, interactions, followUps } = useNetworkStore()
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<NetworkAnalysis | null>(null)

  const getAIContext = () => {
    return {
      contacts: contacts.map(contact => ({
        name: contact.name,
        category: contact.category,
        relationship: contact.relationship,
        lastContact: contact.lastContact,
        tags: contact.tags
      })),
      interactions: interactions.slice(-20).map(interaction => ({
        type: interaction.type,
        outcome: interaction.outcome,
        date: interaction.date,
        followUpRequired: interaction.followUpRequired
      })),
      followUps: followUps.map(followUp => ({
        status: followUp.status,
        priority: followUp.priority,
        dueDate: followUp.dueDate,
        type: followUp.type
      }))
    }
  }

  const generateNetworkInsights = () => {
    const insights = []
    
    // Check for contacts needing attention
    const staleContacts = contacts.filter(contact => {
      const daysSinceContact = Math.floor(
        (new Date().getTime() - new Date(contact.lastContact).getTime()) / (1000 * 60 * 60 * 24)
      )
      return daysSinceContact > 30 && contact.relationship === 'strong'
    })
    
    if (staleContacts.length > 0) {
      insights.push({
        type: 'warning',
        message: `${staleContacts.length} strong relationships haven't been contacted in 30+ days. Consider reaching out.`
      })
    }

    // Check follow-up completion rate
    const overdueFollowUps = followUps.filter(f => 
      f.status === 'pending' && new Date(f.dueDate) < new Date()
    )
    
    if (overdueFollowUps.length > 0) {
      insights.push({
        type: 'urgent',
        message: `You have ${overdueFollowUps.length} overdue follow-ups. Complete them to maintain relationship momentum.`
      })
    }

    // Network diversity analysis
    const categories = [...new Set(contacts.map(c => c.category))]
    if (categories.length < 3) {
      insights.push({
        type: 'suggestion',
        message: 'Consider diversifying your network across different categories (professional, personal, mentors, etc.)'
      })
    }

    // Interaction frequency analysis
    const recentInteractions = interactions.filter(i => {
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      return new Date(i.date) >= weekAgo
    })
    
    if (recentInteractions.length < 3) {
      insights.push({
        type: 'suggestion',
        message: 'Your networking activity has decreased. Aim for 3-5 meaningful interactions per week.'
      })
    }

    return insights
  }

  const suggestFollowUps = () => {
    const suggestions: any[] = []
    
    // Suggest follow-ups for recent positive interactions
    const recentPositiveInteractions = interactions
      .filter(i => i.outcome === 'positive' && !i.followUpRequired)
      .slice(-5)
    
    recentPositiveInteractions.forEach(interaction => {
      const contact = contacts.find(c => c.id === interaction.contactId)
      if (contact) {
        suggestions.push({
          contactName: contact.name,
          suggestion: `Follow up on your recent ${interaction.type} about "${interaction.subject}"`,
          priority: 'medium',
          suggestedDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        })
      }
    })

    return suggestions
  }

  const analyzeNetwork = async (contacts: any[], interactions: any[]) => {
    setIsAnalyzing(true)
    
    try {
      // Simulate AI analysis
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const networkScore = Math.floor(Math.random() * 40) + 60 // 60-100
      
      const insights = [
        'Your network is strongest in the technology sector',
        'Consider connecting with more senior-level professionals',
        'Your interaction frequency has increased by 23% this month',
        'Identify 3 key connectors who could introduce you to new opportunities'
      ]
      
      const suggestions: NetworkSuggestion[] = [
        {
          id: '1',
          type: 'contact',
          title: 'Reach out to dormant connections',
          description: 'Reconnect with 5 contacts you haven\'t spoken to in 3+ months',
          priority: 'high',
          actionable: true
        },
        {
          id: '2',
          type: 'opportunity',
          title: 'Industry event networking',
          description: 'Upcoming tech conference in your area - 200+ attendees',
          priority: 'medium',
          actionable: true
        },
        {
          id: '3',
          type: 'insight',
          title: 'Network diversity analysis',
          description: 'Your network could benefit from more diverse industry representation',
          priority: 'medium',
          actionable: false
        }
      ]
      
      const growthOpportunities = [
        'Expand into healthcare and finance sectors',
        'Increase C-level executive connections',
        'Join industry-specific professional organizations',
        'Engage more actively on professional social platforms'
      ]
      
      const newAnalysis: NetworkAnalysis = {
        insights,
        suggestions,
        networkScore,
        growthOpportunities
      }
      
      setAnalysis(newAnalysis)
      return newAnalysis
    } catch (error) {
      console.error('Network analysis failed:', error)
      return null
    } finally {
      setIsAnalyzing(false)
    }
  }

  const generateFollowUpSuggestions = (contactId: string): string[] => {
    const suggestions: string[] = [
      'Send a personalized message referencing your last conversation',
      'Share a relevant article or resource that might interest them',
      'Invite them to a relevant industry event or webinar',
      'Suggest a coffee meeting or virtual catch-up',
      'Introduce them to someone valuable in your network'
    ]
    
    // Return 2-3 random suggestions
    const shuffled = suggestions.sort(() => 0.5 - Math.random())
    return shuffled.slice(0, Math.floor(Math.random() * 2) + 2)
  }

  const predictNetworkGrowth = (currentContacts: number): { prediction: number; confidence: number } => {
    // Simple growth prediction based on current network size
    const growthRate = Math.max(0.1, 0.3 - (currentContacts / 1000))
    const prediction = Math.floor(currentContacts * (1 + growthRate))
    const confidence = Math.max(0.6, 0.9 - (currentContacts / 500))
    
    return {
      prediction,
      confidence: Math.round(confidence * 100)
    }
  }

  return {
    getAIContext,
    generateNetworkInsights,
    suggestFollowUps,
    isAnalyzing,
    analysis,
    analyzeNetwork,
    generateFollowUpSuggestions,
    predictNetworkGrowth
  }
}