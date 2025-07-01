import { motion } from 'framer-motion'
import { useState } from 'react'
import { Activity, Camera, Lightbulb } from 'lucide-react'
import { ActionLog } from '../components/ActionLog'
import { MemorySnapshot } from '../components/MemorySnapshot'
import { InsightTimeline } from '../components/InsightTimeline'
import { CrudList } from '../../../components/shared/CrudList'
import { useMetaMemoryStore } from '../store/metaMemoryStore'

export function MetaMemory() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'manage'>('dashboard')
  const { 
    actionLogs, 
    snapshots, 
    insights,
    addActionLog,
    deleteActionLog,
    addSnapshot,
    updateSnapshot,
    deleteSnapshot,
    addInsight,
    updateInsight,
    deleteInsight,
    toggleStarInsight
  } = useMetaMemoryStore()

  const actionLogFields = [
    { name: 'module', label: 'Module', type: 'text' as const, required: true, isListColumn: true },
    { name: 'action', label: 'Action', type: 'text' as const, required: true, isListColumn: true },
    { name: 'details', label: 'Details', type: 'textarea' as const, required: true },
    { 
      name: 'impact', 
      label: 'Impact', 
      type: 'select' as const, 
      options: [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' }
      ],
      required: true,
      isListColumn: true
    },
    { name: 'tags', label: 'Tags', type: 'tags' as const }
  ]

  const snapshotFields = [
    { name: 'date', label: 'Date', type: 'date' as const, required: true, isListColumn: true },
    { name: 'title', label: 'Title', type: 'text' as const, required: true, isListColumn: true },
    { 
      name: 'type', 
      label: 'Type', 
      type: 'select' as const, 
      options: [
        { value: 'daily', label: 'Daily' },
        { value: 'weekly', label: 'Weekly' },
        { value: 'monthly', label: 'Monthly' },
        { value: 'milestone', label: 'Milestone' }
      ],
      required: true,
      isListColumn: true
    },
    { name: 'summary', label: 'Summary', type: 'textarea' as const, required: true },
    { name: 'insights', label: 'Insights', type: 'tags' as const },
    { name: 'achievements', label: 'Achievements', type: 'tags' as const },
    { name: 'challenges', label: 'Challenges', type: 'tags' as const },
    { name: 'nextActions', label: 'Next Actions', type: 'tags' as const },
    { name: 'mood', label: 'Mood (1-10)', type: 'number' as const, required: true, isListColumn: true },
    { name: 'energy', label: 'Energy (1-10)', type: 'number' as const, required: true },
    { name: 'satisfaction', label: 'Satisfaction (1-10)', type: 'number' as const, required: true }
  ]

  const insightFields = [
    { name: 'title', label: 'Title', type: 'text' as const, required: true, isListColumn: true },
    { 
      name: 'type', 
      label: 'Type', 
      type: 'select' as const, 
      options: [
        { value: 'pattern', label: 'Pattern' },
        { value: 'correlation', label: 'Correlation' }
      ],
      required: true,
      isListColumn: true
    },
    { name: 'description', label: 'Description', type: 'textarea' as const, required: true },
    { name: 'confidence', label: 'Confidence (%)', type: 'number' as const, required: true, isListColumn: true },
    { name: 'actionable', label: 'Actionable', type: 'checkbox' as const, isListColumn: true },
    { name: 'actions', label: 'Actions', type: 'tags' as const },
    { name: 'tags', label: 'Tags', type: 'tags' as const },
    { name: 'isStarred', label: 'Starred', type: 'checkbox' as const, isListColumn: true }
  ]

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Meta Memory
        </h1>
        <p className="text-slate-400 mt-2">
          System memory layer for action logs, insights, and personal evolution
        </p>
      </motion.div>

      {/* Tab Navigation */}
      <div className="flex space-x-2 mb-6">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'dashboard'
              ? 'bg-blue-600 text-white'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          Dashboard
        </button>
        <button
          onClick={() => setActiveTab('manage')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'manage'
              ? 'bg-blue-600 text-white'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          Manage
        </button>
      </div>

      {activeTab === 'dashboard' ? (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2">
            <ActionLog />
          </div>
          <div className="space-y-8">
            <MemorySnapshot />
            <InsightTimeline />
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <CrudList
            title="Action Logs"
            items={actionLogs}
            fields={actionLogFields}
            onAdd={addActionLog}
            onUpdate={(id, item) => {
              deleteActionLog(id);
              addActionLog(item);
            }}
            onDelete={deleteActionLog}
            icon={<Activity className="w-5 h-5 text-blue-400" />}
            color="blue"
          />
          
          <CrudList
            title="Memory Snapshots"
            items={snapshots}
            fields={snapshotFields}
            onAdd={addSnapshot}
            onUpdate={updateSnapshot}
            onDelete={deleteSnapshot}
            icon={<Camera className="w-5 h-5 text-purple-400" />}
            color="purple"
          />
          
          <CrudList
            title="Insights"
            items={insights}
            fields={insightFields}
            onAdd={addInsight}
            onUpdate={(id, item) => {
              updateInsight(id, item);
              if (item.isStarred !== insights.find(i => i.id === id)?.isStarred) {
                toggleStarInsight(id);
              }
            }}
            onDelete={deleteInsight}
            icon={<Lightbulb className="w-5 h-5 text-amber-400" />}
            color="amber"
          />
        </div>
      )}
    </div>
  )
}