import { useState } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export function useAIAssistant() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = async (content: string) => {
    const userMessage: Message = {
      role: 'user',
      content,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)

    try {
      // Mock AI response - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const responses = [
        "Based on your recent activity patterns, I notice you're most productive in the morning hours. Consider scheduling your most important tasks between 9-11 AM.",
        "Your health metrics show great progress! You've maintained a consistent exercise routine for 3 weeks. To optimize further, try adding 10 minutes of stretching after workouts.",
        "I see you've been working on financial goals. Your spending patterns suggest you could save an additional $200/month by optimizing subscription services.",
        "Your stress levels seem elevated this week. I recommend scheduling 15-minute meditation breaks between work sessions and ensuring 7+ hours of sleep.",
        "Great question! Looking at your goal progress, you're 78% towards your quarterly targets. Focus on the health and learning categories to maintain balance."
      ]
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error sending message:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    messages,
    sendMessage,
    isLoading
  }
}