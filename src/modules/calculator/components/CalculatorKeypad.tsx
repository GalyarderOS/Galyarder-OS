import { motion } from 'framer-motion'
import { useCalculatorStore } from '../store/calculatorStore'

export function CalculatorKeypad() {
  const {
    mode,
    inputDigit,
    inputDecimal,
    clear,
    clearAll,
    performOperation,
    calculate,
    memoryClear,
    memoryRecall,
    memoryAdd,
    memorySubtract,
    performScientificOperation,
    setMode
  } = useCalculatorStore()

  const standardButtons = [
    [
      { label: 'MC', action: () => memoryClear(), type: 'memory' },
      { label: 'MR', action: () => memoryRecall(), type: 'memory' },
      { label: 'M+', action: () => memoryAdd(), type: 'memory' },
      { label: 'M-', action: () => memorySubtract(), type: 'memory' }
    ],
    [
      { label: 'C', action: () => clear(), type: 'clear' },
      { label: 'CE', action: () => clearAll(), type: 'clear' },
      { label: '⌫', action: () => {}, type: 'clear' },
      { label: '÷', action: () => performOperation('÷'), type: 'operator' }
    ],
    [
      { label: '7', action: () => inputDigit('7'), type: 'number' },
      { label: '8', action: () => inputDigit('8'), type: 'number' },
      { label: '9', action: () => inputDigit('9'), type: 'number' },
      { label: '×', action: () => performOperation('×'), type: 'operator' }
    ],
    [
      { label: '4', action: () => inputDigit('4'), type: 'number' },
      { label: '5', action: () => inputDigit('5'), type: 'number' },
      { label: '6', action: () => inputDigit('6'), type: 'number' },
      { label: '-', action: () => performOperation('-'), type: 'operator' }
    ],
    [
      { label: '1', action: () => inputDigit('1'), type: 'number' },
      { label: '2', action: () => inputDigit('2'), type: 'number' },
      { label: '3', action: () => inputDigit('3'), type: 'number' },
      { label: '+', action: () => performOperation('+'), type: 'operator' }
    ],
    [
      { label: '±', action: () => {}, type: 'function' },
      { label: '0', action: () => inputDigit('0'), type: 'number' },
      { label: '.', action: () => inputDecimal(), type: 'number' },
      { label: '=', action: () => calculate(), type: 'equals' }
    ]
  ]

  const scientificButtons = [
    [
      { label: 'sin', action: () => performScientificOperation('sin'), type: 'function' },
      { label: 'cos', action: () => performScientificOperation('cos'), type: 'function' },
      { label: 'tan', action: () => performScientificOperation('tan'), type: 'function' },
      { label: 'log', action: () => performScientificOperation('log'), type: 'function' }
    ],
    [
      { label: 'ln', action: () => performScientificOperation('ln'), type: 'function' },
      { label: 'x²', action: () => performScientificOperation('x²'), type: 'function' },
      { label: 'x³', action: () => performScientificOperation('x³'), type: 'function' },
      { label: '√', action: () => performScientificOperation('sqrt'), type: 'function' }
    ],
    [
      { label: '1/x', action: () => performScientificOperation('1/x'), type: 'function' },
      { label: 'π', action: () => performScientificOperation('π'), type: 'function' },
      { label: 'e', action: () => performScientificOperation('e'), type: 'function' },
      { label: '%', action: () => performScientificOperation('%'), type: 'function' }
    ]
  ]

  const getButtonStyle = (type: string) => {
    switch (type) {
      case 'number':
        return 'bg-slate-700 hover:bg-slate-600 text-white'
      case 'operator':
        return 'bg-blue-600 hover:bg-blue-700 text-white'
      case 'equals':
        return 'bg-emerald-600 hover:bg-emerald-700 text-white'
      case 'clear':
        return 'bg-red-600 hover:bg-red-700 text-white'
      case 'memory':
        return 'bg-amber-600 hover:bg-amber-700 text-white'
      case 'function':
        return 'bg-purple-600 hover:bg-purple-700 text-white'
      default:
        return 'bg-slate-600 hover:bg-slate-500 text-white'
    }
  }

  return (
    <div className="space-y-4">
      {/* Mode Toggle */}
      <div className="flex items-center space-x-2 mb-4">
        <button
          onClick={() => setMode('standard')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            mode === 'standard'
              ? 'bg-blue-600 text-white'
              : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
          }`}
        >
          Standard
        </button>
        <button
          onClick={() => setMode('scientific')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            mode === 'scientific'
              ? 'bg-blue-600 text-white'
              : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
          }`}
        >
          Scientific
        </button>
      </div>

      {/* Scientific Functions (if in scientific mode) */}
      {mode === 'scientific' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="space-y-2"
        >
          {scientificButtons.map((row, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-4 gap-2">
              {row.map((button, buttonIndex) => (
                <motion.button
                  key={button.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: (rowIndex * 4 + buttonIndex) * 0.02 }}
                  onClick={button.action}
                  className={`h-12 rounded-lg font-medium transition-all duration-200 hover:scale-105 ${getButtonStyle(button.type)}`}
                >
                  {button.label}
                </motion.button>
              ))}
            </div>
          ))}
        </motion.div>
      )}

      {/* Standard Keypad */}
      <div className="space-y-2">
        {standardButtons.map((row, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-4 gap-2">
            {row.map((button, buttonIndex) => (
              <motion.button
                key={button.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: (rowIndex * 4 + buttonIndex) * 0.02 }}
                onClick={button.action}
                className={`h-14 rounded-lg font-medium transition-all duration-200 hover:scale-105 ${getButtonStyle(button.type)}`}
              >
                {button.label}
              </motion.button>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}