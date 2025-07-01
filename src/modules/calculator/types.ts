export interface CalculatorState {
  display: string
  previousValue: number | null
  operation: string | null
  waitingForOperand: boolean
  memory: number
  history: CalculationHistory[]
  mode: 'standard' | 'scientific'
  
  // Actions
  inputDigit: (digit: string) => void
  inputDecimal: () => void
  clear: () => void
  clearAll: () => void
  performOperation: (nextOperation: string) => void
  calculate: () => void
  
  // Memory operations
  memoryClear: () => void
  memoryRecall: () => void
  memoryAdd: () => void
  memorySubtract: () => void
  
  // Scientific operations
  performScientificOperation: (operation: string) => void
  
  // Utility
  setMode: (mode: 'standard' | 'scientific') => void
  copyToClipboard: () => void
  addToHistory: (calculation: string, result: string) => void
  clearHistory: () => void
}

export interface CalculationHistory {
  id: string
  calculation: string
  result: string
  timestamp: string
}

export interface UnitConversion {
  category: string
  from: string
  to: string
  value: number
  result: number
}