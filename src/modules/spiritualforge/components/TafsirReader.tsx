import { motion } from 'framer-motion'
import { Book, Bookmark, Plus, Star, Tag } from 'lucide-react'
import { useSpiritualStore } from '../store/spiritualStore'

export function TafsirReader() {
  const { tafsirEntries, toggleBookmark } = useSpiritualStore()

  const bookmarkedEntries = tafsirEntries.filter(entry => entry.bookmarked)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass-card rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Book className="w-5 h-5 text-emerald-400" />
          <h3 className="text-xl font-semibold text-white">Tafsir Reader</h3>
        </div>
        <button className="flex items-center space-x-2 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors">
          <Plus className="w-4 h-4 text-white" />
          <span className="text-white text-sm">Add Entry</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <Book className="w-5 h-5 text-emerald-400 mx-auto mb-2" />
          <p className="text-lg font-bold text-white">{tafsirEntries.length}</p>
          <p className="text-xs text-slate-400">Total Entries</p>
        </div>
        
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <Bookmark className="w-5 h-5 text-amber-400 mx-auto mb-2" />
          <p className="text-lg font-bold text-white">{bookmarkedEntries.length}</p>
          <p className="text-xs text-slate-400">Bookmarked</p>
        </div>
      </div>

      {/* Tafsir Entries */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-white">Recent Reflections</h4>
        {tafsirEntries.map((entry, index) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
            className="p-4 bg-slate-800/30 rounded-lg"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h5 className="text-sm font-medium text-white">
                    Surah {entry.surah}:{entry.ayah}
                  </h5>
                  <button
                    onClick={() => toggleBookmark(entry.id)}
                    className="p-1 hover:bg-slate-700 rounded transition-colors"
                  >
                    {entry.bookmarked ? (
                      <Bookmark className="w-4 h-4 text-amber-400 fill-current" />
                    ) : (
                      <Bookmark className="w-4 h-4 text-slate-400" />
                    )}
                  </button>
                </div>
                
                {/* Arabic Text */}
                <div className="mb-3 p-3 bg-slate-700/30 rounded-lg">
                  <p className="text-right text-lg text-emerald-300 font-arabic leading-relaxed">
                    {entry.arabicText}
                  </p>
                </div>
                
                {/* Translation */}
                <div className="mb-3">
                  <p className="text-sm text-slate-300 italic">"{entry.translation}"</p>
                </div>
                
                {/* Tafsir */}
                <div className="mb-3">
                  <h6 className="text-xs font-medium text-slate-400 mb-1">Tafsir:</h6>
                  <p className="text-sm text-slate-300">{entry.tafsir}</p>
                </div>
                
                {/* Personal Reflection */}
                {entry.reflection && (
                  <div className="mb-3 p-3 bg-blue-600/10 border-l-2 border-blue-500 rounded">
                    <h6 className="text-xs font-medium text-blue-400 mb-1">Personal Reflection:</h6>
                    <p className="text-sm text-blue-200">{entry.reflection}</p>
                  </div>
                )}
                
                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {entry.tags.map(tag => (
                    <span key={tag} className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded flex items-center space-x-1">
                      <Tag className="w-2 h-2" />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="text-xs text-slate-500 text-right">
              Added: {new Date(entry.createdAt).toLocaleDateString()}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 p-3 bg-emerald-600/20 rounded-lg">
        <p className="text-sm text-emerald-300">
          📖 "And We have certainly made the Qur'an easy for remembrance, so is there any who will remember?" (54:17)
        </p>
      </div>
    </motion.div>
  )
}