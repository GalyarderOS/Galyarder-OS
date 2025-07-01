import { motion } from 'framer-motion'
import { useState } from 'react'
import { Clock, Heart, Book } from 'lucide-react'
import { PrayerSchedule } from '../components/PrayerSchedule'
import { SpiritualLog } from '../components/SpiritualLog'
import { TafsirReader } from '../components/TafsirReader'
import { CrudList } from '../../../components/shared/CrudList'
import { useSpiritualStore } from '../store/spiritualStore'

export function SpiritualForge() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'manage'>('dashboard')
  const { 
    prayers, 
    activities, 
    tafsirEntries, 
    spiritualGoals,
    updatePrayer,
    completePrayer,
    addActivity,
    updateActivity,
    deleteActivity,
    addTafsirEntry,
    updateTafsirEntry,
    deleteTafsirEntry,
    addSpiritualGoal,
    updateSpiritualGoal,
    deleteSpiritualGoal
  } = useSpiritualStore()

  const prayerFields = [
    { name: 'name', label: 'Prayer Name', type: 'text' as const, required: true, isListColumn: true },
    { name: 'arabicName', label: 'Arabic Name', type: 'text' as const, isListColumn: true },
    { name: 'time', label: 'Time', type: 'text' as const, required: true, isListColumn: true },
    { name: 'isCompleted', label: 'Completed', type: 'checkbox' as const, isListColumn: true },
    { name: 'location', label: 'Location', type: 'text' as const },
    { name: 'notes', label: 'Notes', type: 'textarea' as const }
  ]

  const activityFields = [
    { name: 'title', label: 'Title', type: 'text' as const, required: true, isListColumn: true },
    { 
      name: 'type', 
      label: 'Type', 
      type: 'select' as const, 
      options: [
        { value: 'dhikr', label: 'Dhikr' },
        { value: 'quran', label: 'Quran' },
        { value: 'dua', label: 'Dua' },
        { value: 'reflection', label: 'Reflection' },
        { value: 'charity', label: 'Charity' },
        { value: 'other', label: 'Other' }
      ],
      required: true,
      isListColumn: true
    },
    { name: 'description', label: 'Description', type: 'textarea' as const, required: true },
    { name: 'duration', label: 'Duration (min)', type: 'number' as const, required: true, isListColumn: true },
    { name: 'notes', label: 'Notes', type: 'textarea' as const },
    { name: 'verses', label: 'Verses', type: 'tags' as const },
    { name: 'count', label: 'Count', type: 'number' as const }
  ]

  const tafsirFields = [
    { name: 'surah', label: 'Surah', type: 'number' as const, required: true, isListColumn: true },
    { name: 'ayah', label: 'Ayah', type: 'number' as const, required: true, isListColumn: true },
    { name: 'arabicText', label: 'Arabic Text', type: 'textarea' as const, required: true },
    { name: 'translation', label: 'Translation', type: 'textarea' as const, required: true },
    { name: 'tafsir', label: 'Tafsir', type: 'textarea' as const, required: true },
    { name: 'reflection', label: 'Personal Reflection', type: 'textarea' as const },
    { name: 'tags', label: 'Tags', type: 'tags' as const },
    { name: 'bookmarked', label: 'Bookmarked', type: 'checkbox' as const, isListColumn: true }
  ]

  const goalFields = [
    { name: 'title', label: 'Title', type: 'text' as const, required: true, isListColumn: true },
    { name: 'description', label: 'Description', type: 'textarea' as const, required: true },
    { 
      name: 'type', 
      label: 'Type', 
      type: 'select' as const, 
      options: [
        { value: 'daily', label: 'Daily' },
        { value: 'weekly', label: 'Weekly' },
        { value: 'monthly', label: 'Monthly' },
        { value: 'yearly', label: 'Yearly' }
      ],
      required: true,
      isListColumn: true
    },
    { name: 'target', label: 'Target', type: 'number' as const, required: true, isListColumn: true },
    { name: 'current', label: 'Current', type: 'number' as const, required: true, isListColumn: true },
    { name: 'unit', label: 'Unit', type: 'text' as const, required: true },
    { name: 'startDate', label: 'Start Date', type: 'date' as const, required: true },
    { name: 'endDate', label: 'End Date', type: 'date' as const, required: true },
    { name: 'isActive', label: 'Active', type: 'checkbox' as const, isListColumn: true }
  ]

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
          Spiritual Forge
        </h1>
        <p className="text-slate-400 mt-2">
          Strengthen your spiritual practice and connection with Allah
        </p>
      </motion.div>

      {/* Tab Navigation */}
      <div className="flex space-x-2 mb-6">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'dashboard'
              ? 'bg-emerald-600 text-white'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          Dashboard
        </button>
        <button
          onClick={() => setActiveTab('manage')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'manage'
              ? 'bg-emerald-600 text-white'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          Manage
        </button>
      </div>

      {activeTab === 'dashboard' ? (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2">
            <TafsirReader />
          </div>
          <div className="space-y-8">
            <PrayerSchedule />
            <SpiritualLog />
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <CrudList
            title="Prayers"
            items={prayers}
            fields={prayerFields}
            onAdd={(item) => updatePrayer(item.id, item)}
            onUpdate={updatePrayer}
            onDelete={(id) => updatePrayer(id, { isCompleted: false })}
            icon={<Clock className="w-5 h-5 text-emerald-400" />}
            color="emerald"
          />
          
          <CrudList
            title="Spiritual Activities"
            items={activities}
            fields={activityFields}
            onAdd={addActivity}
            onUpdate={updateActivity}
            onDelete={deleteActivity}
            icon={<Heart className="w-5 h-5 text-purple-400" />}
            color="purple"
          />
          
          <CrudList
            title="Tafsir Entries"
            items={tafsirEntries}
            fields={tafsirFields}
            onAdd={addTafsirEntry}
            onUpdate={updateTafsirEntry}
            onDelete={deleteTafsirEntry}
            icon={<Book className="w-5 h-5 text-emerald-400" />}
            color="emerald"
          />
          
          <CrudList
            title="Spiritual Goals"
            items={spiritualGoals}
            fields={goalFields}
            onAdd={addSpiritualGoal}
            onUpdate={updateSpiritualGoal}
            onDelete={deleteSpiritualGoal}
            icon={<Heart className="w-5 h-5 text-blue-400" />}
            color="blue"
          />
        </div>
      )}
    </div>
  )
}