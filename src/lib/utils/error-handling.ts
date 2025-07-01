// Error types and interfaces
export interface AppError {
  code: string
  message: string
  details?: Record<string, any>
  timestamp: string
  stack?: string
}

export interface ErrorLogEntry {
  id: string
  error: AppError
  context: {
    route: string
    userId?: string
    userAgent: string
    module: string
    [key: string]: any
  }
  resolved: boolean
  createdAt: string
}

// Error categories
export enum ErrorCategory {
  NETWORK = 'NETWORK',
  VALIDATION = 'VALIDATION',
  AUTHENTICATION = 'AUTHENTICATION',
  PERMISSION = 'PERMISSION',
  STORAGE = 'STORAGE',
  UI = 'UI',
  PERFORMANCE = 'PERFORMANCE',
  SYSTEM = 'SYSTEM'
}

// Error codes
export const ErrorCodes = {
  // Network errors
  NETWORK_TIMEOUT: 'NETWORK_TIMEOUT',
  NETWORK_OFFLINE: 'NETWORK_OFFLINE',
  NETWORK_ERROR: 'NETWORK_ERROR',
  
  // Validation errors
  VALIDATION_REQUIRED: 'VALIDATION_REQUIRED',
  VALIDATION_INVALID: 'VALIDATION_INVALID',
  VALIDATION_FORMAT: 'VALIDATION_FORMAT',
  
  // Storage errors
  STORAGE_QUOTA_EXCEEDED: 'STORAGE_QUOTA_EXCEEDED',
  STORAGE_UNAVAILABLE: 'STORAGE_UNAVAILABLE',
  STORAGE_CORRUPTED: 'STORAGE_CORRUPTED',
  
  // UI errors
  UI_COMPONENT_ERROR: 'UI_COMPONENT_ERROR',
  UI_RENDER_ERROR: 'UI_RENDER_ERROR',
  
  // System errors
  SYSTEM_MEMORY: 'SYSTEM_MEMORY',
  SYSTEM_PERFORMANCE: 'SYSTEM_PERFORMANCE',
  SYSTEM_UNKNOWN: 'SYSTEM_UNKNOWN'
} as const

// Error handler class
export class ErrorHandler {
  private static instance: ErrorHandler
  private logs: ErrorLogEntry[] = []
  private maxLogs = 100

  static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler()
    }
    return ErrorHandler.instance
  }

  // Handle and log errors
  handleError(error: Error | AppError, context?: Partial<ErrorLogEntry['context']>): string {
    const errorId = this.generateErrorId()
    
    const appError: AppError = this.normalizeError(error)
    
    const logEntry: ErrorLogEntry = {
      id: errorId,
      error: appError,
      context: {
        route: window.location.pathname,
        userAgent: navigator.userAgent,
        module: context?.module || 'unknown',
        ...context
      },
      resolved: false,
      createdAt: new Date().toISOString()
    }

    this.addToLog(logEntry)
    this.notifyUser(appError)
    
    // In production, send to monitoring service
    if (import.meta.env.PROD) {
      this.sendToMonitoring(logEntry)
    }

    return errorId
  }

  // Normalize different error types
  private normalizeError(error: Error | AppError): AppError {
    if ('code' in error && 'timestamp' in error) {
      return error as AppError
    }

    return {
      code: this.categorizeError(error),
      message: error.message || 'An unexpected error occurred',
      details: {
        name: error.name,
        cause: error.cause
      },
      timestamp: new Date().toISOString(),
      stack: error.stack
    }
  }

  // Categorize errors based on type and message
  private categorizeError(error: Error): string {
    const message = error.message.toLowerCase()
    
    if (message.includes('network') || message.includes('fetch')) {
      return ErrorCodes.NETWORK_ERROR
    }
    if (message.includes('timeout')) {
      return ErrorCodes.NETWORK_TIMEOUT
    }
    if (message.includes('quota')) {
      return ErrorCodes.STORAGE_QUOTA_EXCEEDED
    }
    if (message.includes('validation') || message.includes('invalid')) {
      return ErrorCodes.VALIDATION_INVALID
    }
    
    return ErrorCodes.SYSTEM_UNKNOWN
  }

  // Add to error log
  private addToLog(entry: ErrorLogEntry): void {
    this.logs.unshift(entry)
    
    // Keep only recent logs
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(0, this.maxLogs)
    }

    // Store in localStorage for persistence
    try {
      localStorage.setItem('galyarder_error_logs', JSON.stringify(this.logs))
    } catch (e) {
      console.warn('Could not store error logs:', e)
    }
  }

  // Notify user based on error severity
  private notifyUser(error: AppError): void {
    const severity = this.getErrorSeverity(error.code)
    
    switch (severity) {
      case 'critical':
        this.showErrorModal(error)
        break
      case 'warning':
        this.showToast(error.message, 'warning')
        break
      case 'info':
        this.showToast(error.message, 'info')
        break
      default:
        console.error('Unhandled error:', error)
    }
  }

  // Determine error severity
  private getErrorSeverity(code: string): 'critical' | 'warning' | 'info' | 'silent' {
    if (code.includes('SYSTEM') || code.includes('STORAGE_CORRUPTED')) {
      return 'critical'
    }
    if (code.includes('NETWORK') || code.includes('VALIDATION')) {
      return 'warning'
    }
    if (code.includes('UI')) {
      return 'info'
    }
    return 'silent'
  }

  // Show error modal for critical errors
  private showErrorModal(error: AppError): void {
    // Implementation would create a modal component
    console.error('Critical Error:', error)
  }

  // Show toast notification
  private showToast(message: string, type: 'warning' | 'info'): void {
    // Implementation would show toast notification
    console.warn(`${type.toUpperCase()}: ${message}`)
  }

  // Send to monitoring service
  private sendToMonitoring(entry: ErrorLogEntry): void {
    // Implementation would send to external monitoring service
    console.log('Sending to monitoring:', entry)
  }

  // Generate unique error ID
  private generateErrorId(): string {
    return `err_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  // Public methods for accessing logs
  getLogs(): ErrorLogEntry[] {
    return [...this.logs]
  }

  getUnresolvedLogs(): ErrorLogEntry[] {
    return this.logs.filter(log => !log.resolved)
  }

  markAsResolved(errorId: string): void {
    const log = this.logs.find(l => l.id === errorId)
    if (log) {
      log.resolved = true
      this.addToLog(log) // Update storage
    }
  }

  clearLogs(): void {
    this.logs = []
    localStorage.removeItem('galyarder_error_logs')
  }
}

// Global error handler utilities
export const errorHandler = ErrorHandler.getInstance()

// React Error Boundary helper
export const handleComponentError = (error: Error, errorInfo: any, componentName: string) => {
  return errorHandler.handleError(error, {
    module: componentName,
    ...errorInfo
  })
}

// Async function wrapper with error handling
export const withErrorHandling = <T extends (...args: any[]) => Promise<any>>(
  fn: T,
  context?: string
): T => {
  return ((...args: Parameters<T>) => {
    try {
      const result = fn(...args)
      if (result instanceof Promise) {
        return result.catch(error => {
          errorHandler.handleError(error, { module: context })
          throw error
        })
      }
      return result
    } catch (error) {
      errorHandler.handleError(error as Error, { module: context })
      throw error
    }
  }) as T
}

// Storage error handler
export const handleStorageError = (error: Error, operation: string) => {
  return errorHandler.handleError(error, {
    module: 'storage',
    operation
  })
}

// Network error handler
export const handleNetworkError = (error: Error, endpoint: string) => {
  return errorHandler.handleError(error, {
    module: 'network',
    endpoint
  })
}