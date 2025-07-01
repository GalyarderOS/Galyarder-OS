import { memo, ComponentType, lazy } from 'react'

/**
 * Enhanced memo wrapper with debugging capabilities
 */
export function optimizedMemo<T extends ComponentType<any>>(
  Component: T,
  displayName?: string,
  customCompare?: (prevProps: any, nextProps: any) => boolean
): ComponentType<any> {
  const MemoizedComponent = memo(Component, customCompare)
  
  if (displayName) {
    MemoizedComponent.displayName = `Memo(${displayName})`
  }
  
  return MemoizedComponent
}

/**
 * Debounce function for expensive operations
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate = false
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return function executedFunction(...args: Parameters<T>) {
    const later = function () {
      timeout = null
      if (!immediate) func(...args)
    }

    const callNow = immediate && !timeout
    
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    
    if (callNow) func(...args)
  }
}

/**
 * Simple throttle function for high-frequency events
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  
  return function (...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

/**
 * Lazy load component with error boundary
 */
export function createLazyComponent<T extends ComponentType<any>>(
  factory: () => Promise<{ default: T } | { [key: string]: T }>,
  exportName?: string
) {
  return lazy(() => {
    return factory().then((module) => {
      if (exportName && exportName in module) {
        return { default: (module as any)[exportName] }
      }
      return module as { default: T }
    })
  })
}

/**
 * Performance measurement utilities
 */
export const performance = {
  mark: (name: string) => {
    if (typeof window !== 'undefined' && window.performance) {
      window.performance.mark(name)
    }
  },
  
  measure: (name: string, startMark: string, endMark?: string) => {
    if (typeof window !== 'undefined' && window.performance) {
      try {
        if (endMark) {
          window.performance.measure(name, startMark, endMark)
        } else {
          window.performance.measure(name, startMark)
        }
        
        const measure = window.performance.getEntriesByName(name, 'measure')[0]
        return measure ? measure.duration : 0
      } catch (error) {
        console.warn('Performance measurement failed:', error)
        return 0
      }
    }
    return 0
  },
  
  clearMarks: (name?: string) => {
    if (typeof window !== 'undefined' && window.performance) {
      if (name) {
        window.performance.clearMarks(name)
      } else {
        window.performance.clearMarks()
      }
    }
  }
}

/**
 * Virtual scrolling utilities for large lists
 */
export function calculateVisibleItems(
  containerHeight: number,
  itemHeight: number,
  scrollTop: number,
  totalItems: number,
  overscan = 5
) {
  const visibleCount = Math.ceil(containerHeight / itemHeight)
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan)
  const endIndex = Math.min(totalItems - 1, startIndex + visibleCount + overscan * 2)
  
  return { startIndex, endIndex, visibleCount }
}

// Memory usage monitoring (development only)
export const memoryMonitor = {
  check: () => {
    if (typeof window !== 'undefined' && 'memory' in (window.performance as any)) {
      const memory = (window.performance as any).memory
      return {
        used: memory.usedJSHeapSize,
        total: memory.totalJSHeapSize,
        limit: memory.jsHeapSizeLimit,
        percentage: (memory.usedJSHeapSize / memory.totalJSHeapSize) * 100
      }
    }
    return null
  },
  
  log: () => {
    const memory = memoryMonitor.check()
    if (memory && process.env.NODE_ENV === 'development') {
      console.log('Memory Usage:', {
        used: `${(memory.used / 1048576).toFixed(2)} MB`,
        total: `${(memory.total / 1048576).toFixed(2)} MB`,
        percentage: `${memory.percentage.toFixed(2)}%`
      })
    }
  }
}