import { motion } from 'framer-motion'
import { Plus, Calendar, Eye, Edit, Send } from 'lucide-react'
import { useCommunicationStore } from '../store/communicationStore'

export function ContentQueue() {
  const { contentQueue, publishContent } = useCommunicationStore()

  const statusColors = {
    draft: 'border-slate-400 bg-slate-400/10',
    review: 'border-amber-400 bg-amber-400/10',
    scheduled: 'border-blue-400 bg-blue-400/10',
    published: 'border-emerald-400 bg-emerald-400/10',
    archived: 'border-red-400 bg-red-400/10'
  }

  const platformIcons = {
    blog: '📝',
    linkedin: '💼',
    twitter: '🐦',
    youtube: '📺',
    medium: '📖',
    newsletter: '📧',
    website: '🌐'
  }

  const typeIcons = {
    article: '📄',
    post: '📱',
    video: '🎥',
    podcast: '🎙️',
    newsletter: '📧',
    presentation: '📊'
  }

  const draftContent = contentQueue.filter(c => c.status === 'draft')
  const scheduledContent = contentQueue.filter(c => c.status === 'scheduled')
  const publishedContent = contentQueue.filter(c => c.status === 'published')

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Edit className="w-5 h-5 text-blue-400" />
          <h3 className="text-xl font-semibold text-white">Content Queue</h3>
        </div>
        <button className="flex items-center space-x-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
          <Plus className="w-4 h-4 text-white" />
          <span className="text-white text-sm">New Content</span>
        </button>
      </div>

      {/* Content Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <Edit className="w-5 h-5 text-slate-400 mx-auto mb-2" />
          <p className="text-lg font-bold text-white">{draftContent.length}</p>
          <p className="text-xs text-slate-400">Drafts</p>
        </div>
        
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <Calendar className="w-5 h-5 text-blue-400 mx-auto mb-2" />
          <p className="text-lg font-bold text-white">{scheduledContent.length}</p>
          <p className="text-xs text-slate-400">Scheduled</p>
        </div>
        
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <Send className="w-5 h-5 text-emerald-400 mx-auto mb-2" />
          <p className="text-lg font-bold text-white">{publishedContent.length}</p>
          <p className="text-xs text-slate-400">Published</p>
        </div>
        
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <Eye className="w-5 h-5 text-purple-400 mx-auto mb-2" />
          <p className="text-lg font-bold text-white">
            {publishedContent.reduce((sum, c) => sum + (c.engagement?.views || 0), 0)}
          </p>
          <p className="text-xs text-slate-400">Total Views</p>
        </div>
      </div>

      {/* Draft Content */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-white mb-4">Draft Content</h4>
        <div className="space-y-3">
          {draftContent.map((content, index) => (
            <motion.div
              key={content.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              className={`p-4 border rounded-lg ${statusColors[content.status]}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-lg">{typeIcons[content.type]}</span>
                    <span className="text-lg">{platformIcons[content.platform]}</span>
                    <h5 className="text-sm font-medium text-white">{content.title}</h5>
                  </div>
                  
                  {content.excerpt && (
                    <p className="text-xs text-slate-300 mb-2">{content.excerpt}</p>
                  )}
                  
                  <div className="flex items-center space-x-4 text-xs text-slate-400">
                    <span>{content.wordCount} words</span>
                    <span>{content.estimatedReadTime} min read</span>
                    <span>Updated: {new Date(content.updatedAt).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
                    <Edit className="w-4 h-4 text-slate-400 hover:text-white" />
                  </button>
                  <button
                    onClick={() => publishContent(content.id)}
                    className="p-2 hover:bg-emerald-600/20 rounded-lg transition-colors"
                  >
                    <Send className="w-4 h-4 text-emerald-400" />
                  </button>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {content.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scheduled Content */}
      {scheduledContent.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-white mb-4">Scheduled Content</h4>
          <div className="space-y-3">
            {scheduledContent.map((content, index) => (
              <motion.div
                key={content.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
                className={`p-4 border rounded-lg ${statusColors[content.status]}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{typeIcons[content.type]}</span>
                    <span className="text-lg">{platformIcons[content.platform]}</span>
                    <div>
                      <p className="text-sm font-medium text-white">{content.title}</p>
                      <p className="text-xs text-slate-400">
                        Scheduled: {content.scheduledDate && new Date(content.scheduledDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Calendar className="w-4 h-4 text-blue-400" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Published */}
      <div>
        <h4 className="text-sm font-medium text-white mb-4">Recently Published</h4>
        <div className="space-y-2">
          {publishedContent.slice(0, 3).map((content, index) => (
            <motion.div
              key={content.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <span className="text-sm">{typeIcons[content.type]}</span>
                <span className="text-sm">{platformIcons[content.platform]}</span>
                <div>
                  <p className="text-sm font-medium text-white">{content.title}</p>
                  <p className="text-xs text-slate-400">
                    Published: {content.publishDate && new Date(content.publishDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              {content.engagement && (
                <div className="text-right">
                  <p className="text-sm text-emerald-400">{content.engagement.views} views</p>
                  <p className="text-xs text-slate-400">{content.engagement.likes} likes</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-6 p-3 bg-blue-600/20 rounded-lg">
        <p className="text-sm text-blue-300">
          ✍️ You have {draftContent.length} drafts ready for review. Keep your content pipeline flowing!
        </p>
      </div>
    </motion.div>
  )
}