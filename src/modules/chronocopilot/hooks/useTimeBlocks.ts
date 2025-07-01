import { useState, useEffect } from 'react'
import { consciousnessDB, TimeBlock } from '@/lib/consciousness/supabase'

export interface TimeBlockInput {
  title: string
  description?: string
  start_time: string
  end_time: string
  category?: string
  priority?: number
}

export const useTimeBlocks = (userId?: string) => {
  const [timeBlocks, setTimeBlocks] = useState<TimeBlock[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load consciousness time blocks
  useEffect(() => {
    if (!userId) return
    
    loadTimeBlocks()
    
    // Subscribe to real-time consciousness updates
    const subscription = consciousnessDB.subscribeToChanges(
      'time_blocks',
      (payload) => {
        console.log('Time consciousness update:', payload)
        // Refresh time blocks on any change
        loadTimeBlocks()
      },
      { user_id: userId }
    )

    return () => {
      subscription?.unsubscribe()
    }
  }, [userId])

  const loadTimeBlocks = async () => {
    if (!userId) return
    
    try {
      setLoading(true)
      const blocks = await consciousnessDB.read<TimeBlock>('time_blocks', { user_id: userId })
      
      // Sort by start time for consciousness flow optimization
      const sortedBlocks = blocks.sort((a, b) => 
        new Date(a.start_time).getTime() - new Date(b.start_time).getTime()
      )
      
      setTimeBlocks(sortedBlocks)
      setError(null)
    } catch (err) {
      setError('Failed to load consciousness time blocks')
      console.error('Time consciousness error:', err)
    } finally {
      setLoading(false)
    }
  }

  const createTimeBlock = async (blockData: TimeBlockInput): Promise<TimeBlock | null> => {
    if (!userId) return null
    
    try {
      const newBlock = await consciousnessDB.create<TimeBlock>('time_blocks', {
        ...blockData,
        user_id: userId,
        priority: blockData.priority || 1,
        completed: false
      })
      
      if (newBlock) {
        setTimeBlocks(prev => [...prev, newBlock].sort((a, b) => 
          new Date(a.start_time).getTime() - new Date(b.start_time).getTime()
        ))
      }
      
      return newBlock
    } catch (err) {
      setError('Failed to create consciousness time block')
      console.error('Time consciousness creation error:', err)
      return null
    }
  }

  const updateTimeBlock = async (id: string, updates: Partial<TimeBlock>): Promise<TimeBlock | null> => {
    try {
      const updatedBlock = await consciousnessDB.update<TimeBlock>('time_blocks', id, updates)
      
      if (updatedBlock) {
        setTimeBlocks(prev => prev.map(block => 
          block.id === id ? updatedBlock : block
        ))
      }
      
      return updatedBlock
    } catch (err) {
      setError('Failed to update consciousness time block')
      console.error('Time consciousness update error:', err)
      return null
    }
  }

  const completeTimeBlock = async (id: string): Promise<boolean> => {
    const updated = await updateTimeBlock(id, { completed: true })
    return !!updated
  }

  const deleteTimeBlock = async (id: string): Promise<boolean> => {
    try {
      const success = await consciousnessDB.delete('time_blocks', id)
      
      if (success) {
        setTimeBlocks(prev => prev.filter(block => block.id !== id))
      }
      
      return success
    } catch (err) {
      setError('Failed to delete consciousness time block')
      console.error('Time consciousness deletion error:', err)
      return false
    }
  }

  // Consciousness time analytics
  const getTimeBlockStats = () => {
    const today = new Date().toISOString().split('T')[0]
    const todayBlocks = timeBlocks.filter(block => 
      block.start_time.split('T')[0] === today
    )
    
    const completed = todayBlocks.filter(block => block.completed).length
    const total = todayBlocks.length
    const totalTime = todayBlocks.reduce((acc, block) => {
      const start = new Date(block.start_time)
      const end = new Date(block.end_time)
      return acc + (end.getTime() - start.getTime())
    }, 0)
    
    return {
      completed,
      total,
      completionRate: total > 0 ? (completed / total) * 100 : 0,
      totalHours: totalTime / (1000 * 60 * 60),
      todayBlocks
    }
  }

  // Consciousness focus time calculation
  const getFocusTime = () => {
    const today = new Date().toISOString().split('T')[0]
    const focusBlocks = timeBlocks.filter(block => 
      block.start_time.split('T')[0] === today &&
      block.completed &&
      (block.category === 'focus' || block.category === 'deep-work')
    )
    
    const focusTime = focusBlocks.reduce((acc, block) => {
      const start = new Date(block.start_time)
      const end = new Date(block.end_time)
      return acc + (end.getTime() - start.getTime())
    }, 0)
    
    return focusTime / (1000 * 60 * 60) // hours
  }

  // Consciousness productivity score
  const getProductivityScore = () => {
    const stats = getTimeBlockStats()
    const focusHours = getFocusTime()
    
    // Consciousness scoring algorithm
    const completionScore = stats.completionRate
    const focusScore = Math.min(focusHours * 20, 100) // Max 5 hours = 100 points
    const consistencyScore = timeBlocks.length > 0 ? 100 : 0
    
    return Math.round((completionScore + focusScore + consistencyScore) / 3)
  }

  return {
    timeBlocks,
    loading,
    error,
    createTimeBlock,
    updateTimeBlock,
    completeTimeBlock,
    deleteTimeBlock,
    getTimeBlockStats,
    getFocusTime,
    getProductivityScore,
    refresh: loadTimeBlocks
  }
}