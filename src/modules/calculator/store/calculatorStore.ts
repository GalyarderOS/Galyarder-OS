import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CalculatorState, CalculationHistory } from '../types'

export const useCalculatorStore = create<CalculatorState>()(
  persist(
    (set, get) => ({
      display: '0',
      previousValue: null,
      operation: null,
      waitingForOperand: false,
      memory: 0,
      history: [],
      mode: 'standard',

      inputDigit: (digit) => {
        const { display, waitingForOperand } = get()
        
        if (waitingForOperand) {
          set({
            display: digit,
            waitingForOperand: false
          })
        } else {
          set({
            display: display === '0' ? digit : display + digit
          })
        }
      },

      inputDecimal: () => {
        const { display, waitingForOperand } = get()
        
        if (waitingForOperand) {
          set({
            display: '0.',
            waitingForOperand: false
          })
        } else if (display.indexOf('.') === -1) {
          set({
            display: display + '.'
          })
        }
      },

      clear: () => {
        set({
          display: '0',
          waitingForOperand: false
        })
      },

      clearAll: () => {
        set({
          display: '0',
          previousValue: null,
          operation: null,
          waitingForOperand: false
        })
      },

      performOperation: (nextOperation) => {
        const { display, previousValue, operation } = get()
        const inputValue = parseFloat(display)

        if (previousValue === null) {
          set({
            previousValue: inputValue,
            operation: nextOperation,
            waitingForOperand: true
          })
        } else if (operation) {
          const currentValue = previousValue || 0
          let result = 0

          switch (operation) {
            case '+':
              result = currentValue + inputValue
              break
            case '-':
              result = currentValue - inputValue
              break
            case '×':
              result = currentValue * inputValue
              break
            case '÷':
              result = inputValue !== 0 ? currentValue / inputValue : 0
              break
            case '=':
              result = inputValue
              break
            default:
              return
          }

          const calculation = `${currentValue} ${operation} ${inputValue}`
          get().addToHistory(calculation, result.toString())

          set({
            display: String(result),
            previousValue: result,
            operation: nextOperation,
            waitingForOperand: true
          })
        }
      },

      calculate: () => {
        const { display, previousValue, operation } = get()
        const inputValue = parseFloat(display)

        if (previousValue !== null && operation) {
          let result = 0

          switch (operation) {
            case '+':
              result = previousValue + inputValue
              break
            case '-':
              result = previousValue - inputValue
              break
            case '×':
              result = previousValue * inputValue
              break
            case '÷':
              result = inputValue !== 0 ? previousValue / inputValue : 0
              break
            default:
              return
          }

          const calculation = `${previousValue} ${operation} ${inputValue}`
          get().addToHistory(calculation, result.toString())

          set({
            display: String(result),
            previousValue: null,
            operation: null,
            waitingForOperand: true
          })
        }
      },

      memoryClear: () => {
        set({ memory: 0 })
      },

      memoryRecall: () => {
        const { memory } = get()
        set({
          display: String(memory),
          waitingForOperand: true
        })
      },

      memoryAdd: () => {
        const { display, memory } = get()
        const value = parseFloat(display)
        set({ memory: memory + value })
      },

      memorySubtract: () => {
        const { display, memory } = get()
        const value = parseFloat(display)
        set({ memory: memory - value })
      },

      performScientificOperation: (operation) => {
        const { display } = get()
        const value = parseFloat(display)
        let result = 0

        switch (operation) {
          case 'sin':
            result = Math.sin(value * Math.PI / 180)
            break
          case 'cos':
            result = Math.cos(value * Math.PI / 180)
            break
          case 'tan':
            result = Math.tan(value * Math.PI / 180)
            break
          case 'log':
            result = Math.log10(value)
            break
          case 'ln':
            result = Math.log(value)
            break
          case 'sqrt':
            result = Math.sqrt(value)
            break
          case 'x²':
            result = value * value
            break
          case 'x³':
            result = value * value * value
            break
          case '1/x':
            result = value !== 0 ? 1 / value : 0
            break
          case 'π':
            result = Math.PI
            break
          case 'e':
            result = Math.E
            break
          case '%':
            result = value / 100
            break
          default:
            return
        }

        const calculation = `${operation}(${value})`
        get().addToHistory(calculation, result.toString())

        set({
          display: String(result),
          waitingForOperand: true
        })
      },

      setMode: (mode) => {
        set({ mode })
      },

      copyToClipboard: () => {
        const { display } = get()
        navigator.clipboard.writeText(display)
      },

      addToHistory: (calculation, result) => {
        const newEntry: CalculationHistory = {
          id: Math.random().toString(36).substr(2, 9),
          calculation,
          result,
          timestamp: new Date().toISOString()
        }

        set((state) => ({
          history: [newEntry, ...state.history].slice(0, 50) // Keep last 50 calculations
        }))
      },

      clearHistory: () => {
        set({ history: [] })
      }
    }),
    {
      name: 'calculator-storage',
      partialize: (state) => ({
        memory: state.memory,
        history: state.history,
        mode: state.mode
      })
    }
  )
)