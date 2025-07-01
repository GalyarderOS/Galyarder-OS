import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit, Save, RefreshCw, MessageSquare } from 'lucide-react'
import { useCommunicationStore } from '../store/communicationStore'

export function VoiceDraftEditor() {
  const { voiceDrafts, addVoiceVersion } = useCommunicationStore()
  const [selectedDraft, setSelectedDraft] = useState<string | null>(null)
  const [editingContent, setEditingContent] = useState('')

  const toneColors = {
    professional: 'text-blue-400',
    casual: 'text-emerald-400',
    authoritative: 'text-purple-400',
    friendly: 'text-amber-400',
    inspirational: 'text-pink-400'
  }

  const purposeIcons = {
    inform: '📚',
    persuade: '🎯',
    entertain: '🎭',
    educate: '🎓',
    inspire: '✨'
  }

  const handleRefineVoice = (draftId: string) => {
    // Mock AI voice refinement
    const draft = voiceDrafts.find(d => d.id === draftId)
    if (draft) {
      const refinedContent = `${draft.content}\n\n[AI Refined Version]\nThis refined version maintains your core message while enhancing clarity and impact...`
      
      addVoiceVersion(draftId, {
        content: refinedContent,
        tone: draft.tone,
        feedback: 'AI-refined for better clarity and engagement'
      })
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="glass-card rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <MessageSquare className="w-5 h-5 text-purple-400" />
          <h3 className="text-xl font-semibold text-white">Voice Draft Editor</h3>
        </div>
        <button className="flex items-center space-x-2 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors">
          <Plus className="w-4 h-4 text-white" />
          <span className="text-white text-sm">New Draft</span>
        </button>
      </div>

      {/* Voice Drafts List */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-white mb-4">Voice Drafts</h4>
        <div className="space-y-3">
          {voiceDrafts.map((draft, index) => (
            <motion.div
              key={draft.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              className={`p-4 border rounded-lg cursor-pointer transition-all ${
                selectedDraft === draft.id 
                  ? 'border-purple-400 bg-purple-400/10' 
                  : 'border-slate-700 bg-slate-800/30 hover:border-slate-600'
              }`}
              onClick={() => {
                setSelectedDraft(draft.id)
                setEditingContent(draft.content)
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-lg">{purposeIcons[draft.purpose]}</span>
                    <h5 className="text-sm font-medium text-white">{draft.title}</h5>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-xs text-slate-400 mb-2">
                    <span className={`${toneColors[draft.tone]} capitalize`}>{draft.tone}</span>
                    <span className="capitalize">{draft.purpose}</span>
                    <span className="capitalize">{draft.targetLength}</span>
                    <span>{draft.versions.length} versions</span>
                  </div>
                  
                  <p className="text-xs text-slate-300 line-clamp-2">
                    {draft.content.substring(0, 100)}...
                  </p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleRefineVoice(draft.id)
                    }}
                    className="p-2 hover:bg-purple-600/20 rounded-lg transition-colors"
                  >
                    <RefreshCw className="w-4 h-4 text-purple-400" />
                  </button>
                  <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
                    <Edit className="w-4 h-4 text-slate-400 hover:text-white" />
                  </button>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {draft.keywords.slice(0, 3).map(keyword => (
                  <span key={keyword} className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded">
                    {keyword}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Editor */}
      {selectedDraft && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border border-slate-700 rounded-lg p-4"
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-medium text-white">Edit Draft</h4>
            <button className="flex items-center space-x-2 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors">
              <Save className="w-4 h-4 text-white" />
              <span className="text-white text-sm">Save Version</span>
            </button>
          </div>
          
          <textarea
            value={editingContent}
            onChange={(e) => setEditingContent(e.target.value)}
            className="w-full h-40 p-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Edit your voice draft here..."
          />
          
          <div className="flex items-center justify-between mt-4 text-xs text-slate-400">
            <span>{editingContent.length} characters</span>
            <span>~{Math.ceil(editingContent.split(' ').length / 200)} min read</span>
          </div>
        </motion.div>
      )}

      {/* Voice Versions */}
      {selectedDraft && (
        <div className="mt-6">
          <h4 className="text-sm font-medium text-white mb-4">Version History</h4>
          <div className="space-y-2">
            {voiceDrafts
              .find(d => d.id === selectedDraft)
              ?.versions.slice(-3)
              .map((version, index) => (
                <motion.div
                  key={version.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  className="p-3 bg-slate-800/30 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs ${toneColors[version.tone as keyof typeof toneColors]} capitalize`}>
                        {version.tone}
                      </span>
                      <span className="text-xs text-slate-400">
                        {new Date(version.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <button
                      onClick={() => setEditingContent(version.content)}
                      className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Use this version
                    </button>
                  </div>
                  
                  <p className="text-xs text-slate-300 line-clamp-2">
                    {version.content.substring(0, 150)}...
                  </p>
                  
                  {version.feedback && (
                    <p className="text-xs text-purple-400 mt-2 italic">
                      {version.feedback}
                    </p>
                  )}
                </motion.div>
              ))}
          </div>
        </div>
      )}

      <div className="mt-6 p-3 bg-purple-600/20 rounded-lg">
        <p className="text-sm text-purple-300">
          🎨 Use AI refinement to enhance your voice and maintain consistency across all your content.
        </p>
      </div>
    </motion.div>
  )
}