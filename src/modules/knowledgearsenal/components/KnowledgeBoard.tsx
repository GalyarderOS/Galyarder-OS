import { motion } from 'framer-motion'
import { BookOpen, Star, Clock, TrendingUp } from 'lucide-react'
import { useKnowledgeStore } from '../store/knowledgeStore'

export function KnowledgeBoard() {
  const { books } = useKnowledgeStore()

  const currentlyReading = books.filter(book => book.status === 'reading')
  const completedBooks = books.filter(book => book.status === 'completed')
  const wishlistBooks = books.filter(book => book.status === 'wishlist')

  const statusColors = {
    reading: 'border-blue-400 bg-blue-400/10',
    completed: 'border-emerald-400 bg-emerald-400/10',
    wishlist: 'border-amber-400 bg-amber-400/10',
    abandoned: 'border-red-400 bg-red-400/10'
  }

  const getReadingStreak = () => {
    const today = new Date()
    const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
    return completedBooks.filter(book => 
      book.completedDate && new Date(book.completedDate) >= oneWeekAgo
    ).length
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="glass-card rounded-xl p-6"
    >
      <div className="flex items-center space-x-3 mb-6">
        <BookOpen className="w-5 h-5 text-emerald-400" />
        <h3 className="text-xl font-semibold text-white">Knowledge Board</h3>
      </div>

      {/* Reading Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <BookOpen className="w-5 h-5 text-blue-400 mx-auto mb-2" />
          <p className="text-lg font-bold text-white">{currentlyReading.length}</p>
          <p className="text-xs text-slate-400">Currently Reading</p>
        </div>
        
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <TrendingUp className="w-5 h-5 text-emerald-400 mx-auto mb-2" />
          <p className="text-lg font-bold text-white">{completedBooks.length}</p>
          <p className="text-xs text-slate-400">Books Completed</p>
        </div>
        
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <Clock className="w-5 h-5 text-amber-400 mx-auto mb-2" />
          <p className="text-lg font-bold text-white">{getReadingStreak()}</p>
          <p className="text-xs text-slate-400">This Week</p>
        </div>
      </div>

      {/* Currently Reading */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-white mb-4">Currently Reading</h4>
        <div className="space-y-3">
          {currentlyReading.map((book, index) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              className={`p-4 border rounded-lg ${statusColors[book.status]}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h5 className="text-sm font-medium text-white">{book.title}</h5>
                  <p className="text-xs text-slate-400 mb-1">by {book.author}</p>
                  <p className="text-xs text-slate-400">{book.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-white">{book.progress}%</p>
                  {book.currentPage && book.totalPages && (
                    <p className="text-xs text-slate-400">
                      {book.currentPage}/{book.totalPages} pages
                    </p>
                  )}
                </div>
              </div>
              
              <div className="bg-slate-700 rounded-full h-2 mb-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${book.progress}%` }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.8 }}
                  className="bg-gradient-to-r from-blue-500 to-blue-400 h-2 rounded-full"
                />
              </div>
              
              {book.notes && (
                <p className="text-xs text-slate-300 italic">"{book.notes}"</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recently Completed */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-white mb-4">Recently Completed</h4>
        <div className="space-y-3">
          {completedBooks.slice(0, 3).map((book, index) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg"
            >
              <div>
                <p className="text-sm font-medium text-white">{book.title}</p>
                <p className="text-xs text-slate-400">by {book.author}</p>
              </div>
              <div className="flex items-center space-x-2">
                {book.rating && (
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="text-xs text-yellow-400">{book.rating}</span>
                  </div>
                )}
                <span className="text-xs text-slate-400">
                  {book.completedDate && new Date(book.completedDate).toLocaleDateString()}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Reading Goal */}
      <div className="p-3 bg-emerald-600/20 rounded-lg">
        <p className="text-sm text-emerald-300">
          📚 Reading Goal: {completedBooks.length}/12 books this year ({Math.round((completedBooks.length / 12) * 100)}% complete)
        </p>
      </div>
    </motion.div>
  )
}