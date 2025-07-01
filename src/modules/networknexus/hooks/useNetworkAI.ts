import { useNetworkStore } from '../store/networkStore'

export function useNetworkAI() {
  const { contacts, interactions, followUps } = useNetworkStore()

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
    const suggestions = []
    
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

  return {
    getAIContext,
    generateNetworkInsights,
    suggestFollowUps
  }
}