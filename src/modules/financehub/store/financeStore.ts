import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Transaction {
  id: string
  date: string
  amount: number
  category: string
  description: string
  type: 'income' | 'expense'
}

interface Budget {
  id: string
  category: string
  limit: number
  spent: number
  period: 'weekly' | 'monthly' | 'yearly'
}

interface FinanceState {
  transactions: Transaction[]
  budgets: Budget[]
  
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void
  updateTransaction: (id: string, updates: Partial<Transaction>) => void
  deleteTransaction: (id: string) => void
  
  addBudget: (budget: Omit<Budget, 'id'>) => void
  updateBudget: (id: string, updates: Partial<Budget>) => void
  deleteBudget: (id: string) => void
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: '2024-02-10',
    amount: 85.50,
    category: 'Groceries',
    description: 'Weekly grocery shopping',
    type: 'expense'
  },
  {
    id: '2',
    date: '2024-02-08',
    amount: 1200,
    category: 'Salary',
    description: 'Bi-weekly paycheck',
    type: 'income'
  }
]

const mockBudgets: Budget[] = [
  {
    id: '1',
    category: 'Groceries',
    limit: 400,
    spent: 250,
    period: 'monthly'
  },
  {
    id: '2',
    category: 'Entertainment',
    limit: 200,
    spent: 150,
    period: 'monthly'
  }
]

export const useFinanceStore = create<FinanceState>()(
  persist(
    (set) => ({
      transactions: mockTransactions,
      budgets: mockBudgets,
      
      addTransaction: (transaction) => {
        const newTransaction = {
          ...transaction,
          id: Math.random().toString(36).substr(2, 9)
        }
        set((state) => ({
          transactions: [...state.transactions, newTransaction]
        }))
      },
      
      updateTransaction: (id, updates) => {
        set((state) => ({
          transactions: state.transactions.map(transaction =>
            transaction.id === id ? { ...transaction, ...updates } : transaction
          )
        }))
      },
      
      deleteTransaction: (id) => {
        set((state) => ({
          transactions: state.transactions.filter(transaction => transaction.id !== id)
        }))
      },
      
      addBudget: (budget) => {
        const newBudget = {
          ...budget,
          id: Math.random().toString(36).substr(2, 9)
        }
        set((state) => ({
          budgets: [...state.budgets, newBudget]
        }))
      },
      
      updateBudget: (id, updates) => {
        set((state) => ({
          budgets: state.budgets.map(budget =>
            budget.id === id ? { ...budget, ...updates } : budget
          )
        }))
      },
      
      deleteBudget: (id) => {
        set((state) => ({
          budgets: state.budgets.filter(budget => budget.id !== id)
        }))
      }
    }),
    {
      name: 'finance-hub-storage'
    }
  )
)