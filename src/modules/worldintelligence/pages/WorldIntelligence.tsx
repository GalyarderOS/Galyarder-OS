import { motion } from 'framer-motion'
import { useState } from 'react'
import { Globe, TrendingUp, Search } from 'lucide-react'
import { WorldMapSignals } from '../components/WorldMapSignals'
import { MacroPulse } from '../components/MacroPulse'
import { SignalScanner } from '../components/SignalScanner'
import { CrudList } from '../../../components/shared/CrudList'
import { useWorldIntelligenceStore } from '../store/worldIntelligenceStore'

export function WorldIntelligence() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'manage'>('dashboard')
  const { 
    signals, 
    trends, 
    implications,
    addSignal,
    updateSignal,
    deleteSignal,
    addTrend,
    updateTrend,
    deleteTrend,
    addImplication,
    updateImplication,
    deleteImplication
  } = useWorldIntelligenceStore()

  const signalFields = [
    { name: 'title', label: 'Title', type: 'text' as const, required: true, isListColumn: true },
    { name: 'description', label: 'Description', type: 'textarea' as const, required: true },
    { name: 'source', label: 'Source', type: 'text' as const, required: true, isListColumn: true },
    { name: 'url', label: 'URL', type: 'text' as const },
    { name: 'date', label: 'Date', type: 'date' as const, required: true, isListColumn: true },
    { 
      name: 'category', 
      label: 'Category', 
      type: 'select' as const, 
      options: [
        { value: 'economic', label: 'Economic' },
        { value: 'geopolitical', label: 'Geopolitical' },
        { value: 'technological', label: 'Technological' },
        { value: 'environmental', label: 'Environmental' },
        { value: 'social', label: 'Social' },
        { value: 'other', label: 'Other' }
      ],
      required: true,
      isListColumn: true
    },
    { 
      name: 'impact', 
      label: 'Impact', 
      type: 'select' as const, 
      options: [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' },
        { value: 'critical', label: 'Critical' }
      ],
      required: true,
      isListColumn: true
    },
    { name: 'relevance', label: 'Relevance (1-100)', type: 'number' as const, required: true },
    { name: 'regions', label: 'Regions', type: 'tags' as const },
    { name: 'tags', label: 'Tags', type: 'tags' as const },
    { name: 'notes', label: 'Notes', type: 'textarea' as const },
    { name: 'isVerified', label: 'Verified', type: 'checkbox' as const, isListColumn: true }
  ]

  const trendFields = [
    { name: 'name', label: 'Trend Name', type: 'text' as const, required: true, isListColumn: true },
    { name: 'description', label: 'Description', type: 'textarea' as const, required: true },
    { 
      name: 'category', 
      label: 'Category', 
      type: 'select' as const, 
      options: [
        { value: 'economic', label: 'Economic' },
        { value: 'geopolitical', label: 'Geopolitical' },
        { value: 'technological', label: 'Technological' },
        { value: 'environmental', label: 'Environmental' },
        { value: 'social', label: 'Social' },
        { value: 'other', label: 'Other' }
      ],
      required: true,
      isListColumn: true
    },
    { 
      name: 'timeframe', 
      label: 'Timeframe', 
      type: 'select' as const, 
      options: [
        { value: 'short-term', label: 'Short-term' },
        { value: 'mid-term', label: 'Mid-term' },
        { value: 'long-term', label: 'Long-term' }
      ],
      required: true,
      isListColumn: true
    },
    { 
      name: 'impact', 
      label: 'Impact', 
      type: 'select' as const, 
      options: [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' },
        { value: 'critical', label: 'Critical' }
      ],
      required: true,
      isListColumn: true
    },
    { 
      name: 'direction', 
      label: 'Direction', 
      type: 'select' as const, 
      options: [
        { value: 'increasing', label: 'Increasing' },
        { value: 'decreasing', label: 'Decreasing' },
        { value: 'stable', label: 'Stable' },
        { value: 'volatile', label: 'Volatile' }
      ],
      required: true,
      isListColumn: true
    },
    { name: 'confidence', label: 'Confidence (1-100)', type: 'number' as const, required: true },
    { name: 'relatedSignals', label: 'Related Signals', type: 'tags' as const },
    { name: 'regions', label: 'Regions', type: 'tags' as const },
    { name: 'tags', label: 'Tags', type: 'tags' as const },
    { name: 'notes', label: 'Notes', type: 'textarea' as const }
  ]

  const implicationFields = [
    { name: 'title', label: 'Title', type: 'text' as const, required: true, isListColumn: true },
    { name: 'description', label: 'Description', type: 'textarea' as const, required: true },
    { 
      name: 'category', 
      label: 'Category', 
      type: 'select' as const, 
      options: [
        { value: 'opportunity', label: 'Opportunity' },
        { value: 'threat', label: 'Threat' },
        { value: 'neutral', label: 'Neutral' }
      ],
      required: true,
      isListColumn: true
    },
    { 
      name: 'impact', 
      label: 'Impact', 
      type: 'select' as const, 
      options: [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' },
        { value: 'critical', label: 'Critical' }
      ],
      required: true,
      isListColumn: true
    },
    { 
      name: 'timeframe', 
      label: 'Timeframe', 
      type: 'select' as const, 
      options: [
        { value: 'immediate', label: 'Immediate' },
        { value: 'short-term', label: 'Short-term' },
        { value: 'mid-term', label: 'Mid-term' },
        { value: 'long-term', label: 'Long-term' }
      ],
      required: true,
      isListColumn: true
    },
    { name: 'relatedTrends', label: 'Related Trends', type: 'tags' as const },
    { name: 'actionItems', label: 'Action Items', type: 'tags' as const },
    { 
      name: 'status', 
      label: 'Status', 
      type: 'select' as const, 
      options: [
        { value: 'identified', label: 'Identified' },
        { value: 'analyzing', label: 'Analyzing' },
        { value: 'actioning', label: 'Actioning' },
        { value: 'monitoring', label: 'Monitoring' }
      ],
      required: true,
      isListColumn: true
    }
  ]

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-amber-400 bg-clip-text text-transparent">
          World Intelligence
        </h1>
        <p className="text-slate-400 mt-2">
          Global macro and trend scanner for strategic awareness
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
            <WorldMapSignals />
          </div>
          <div className="space-y-8">
            <MacroPulse />
            <SignalScanner />
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <CrudList
            title="World Signals"
            items={signals}
            fields={signalFields}
            onAdd={addSignal}
            onUpdate={updateSignal}
            onDelete={deleteSignal}
            icon={<Globe className="w-5 h-5 text-blue-400" />}
            color="blue"
          />
          
          <CrudList
            title="Macro Trends"
            items={trends}
            fields={trendFields}
            onAdd={addTrend}
            onUpdate={updateTrend}
            onDelete={deleteTrend}
            icon={<TrendingUp className="w-5 h-5 text-purple-400" />}
            color="purple"
          />
          
          <CrudList
            title="Strategic Implications"
            items={implications}
            fields={implicationFields}
            onAdd={addImplication}
            onUpdate={updateImplication}
            onDelete={deleteImplication}
            icon={<Search className="w-5 h-5 text-amber-400" />}
            color="amber"
          />
        </div>
      )}
    </div>
  )
}