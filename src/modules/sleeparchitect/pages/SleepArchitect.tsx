import { motion } from 'framer-motion'
import { useState } from 'react'
import { Moon, Clock, Sunrise } from 'lucide-react'
import { SleepLog } from '../components/SleepLog'
import { CycleVisualizer } from '../components/CycleVisualizer'
import { WakeProtocol } from '../components/WakeProtocol'
import { CrudList } from '../../../components/shared/CrudList'
import { useSleepStore } from '../store/sleepStore'

export function SleepArchitect() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'manage'>('dashboard')
  const { 
    sessions, 
    cycles, 
    wakeProtocols,
    addSession,
    updateSession,
    deleteSession,
    addCycle,
    updateCycle,
    deleteCycle,
    addWakeProtocol,
    updateWakeProtocol,
    deleteWakeProtocol
  } = useSleepStore()

  const sessionFields = [
    { name: 'date', label: 'Date', type: 'date' as const, required: true, isListColumn: true },
    { name: 'bedTime', label: 'Bed Time', type: 'text' as const, required: true, isListColumn: true },
    { name: 'sleepTime', label: 'Sleep Time', type: 'text' as const, required: true },
    { name: 'wakeTime', label: 'Wake Time', type: 'text' as const, required: true, isListColumn: true },
    { name: 'duration', label: 'Duration (min)', type: 'number' as const, required: true },
    { name: 'quality', label: 'Quality (1-10)', type: 'number' as const, required: true, isListColumn: true },
    { name: 'notes', label: 'Notes', type: 'textarea' as const },
    { name: 'environment.temperature', label: 'Temperature (°C)', type: 'number' as const },
    { name: 'environment.humidity', label: 'Humidity (%)', type: 'number' as const },
    { name: 'environment.noise', label: 'Noise (dB)', type: 'number' as const },
    { name: 'recovery.hrv', label: 'HRV', type: 'number' as const },
    { name: 'recovery.restingHR', label: 'Resting Heart Rate', type: 'number' as const },
    { name: 'recovery.bodyBattery', label: 'Body Battery (%)', type: 'number' as const }
  ]

  const cycleFields = [
    { name: 'name', label: 'Cycle Name', type: 'text' as const, required: true, isListColumn: true },
    { 
      name: 'type', 
      label: 'Type', 
      type: 'select' as const, 
      options: [
        { value: 'monophasic', label: 'Monophasic' },
        { value: 'biphasic', label: 'Biphasic' },
        { value: 'polyphasic', label: 'Polyphasic' }
      ],
      required: true,
      isListColumn: true
    },
    { name: 'totalSleep', label: 'Total Sleep (min)', type: 'number' as const, required: true, isListColumn: true },
    { name: 'isActive', label: 'Active', type: 'checkbox' as const, isListColumn: true }
  ]

  const wakeProtocolFields = [
    { name: 'name', label: 'Protocol Name', type: 'text' as const, required: true, isListColumn: true },
    { name: 'duration', label: 'Duration (min)', type: 'number' as const, required: true, isListColumn: true },
    { name: 'isActive', label: 'Active', type: 'checkbox' as const, isListColumn: true }
  ]

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Sleep Architect
        </h1>
        <p className="text-slate-400 mt-2">
          Optimize your sleep cycles and recovery for peak performance
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
            <SleepLog />
          </div>
          <div className="space-y-8">
            <CycleVisualizer />
            <WakeProtocol />
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <CrudList
            title="Sleep Sessions"
            items={sessions}
            fields={sessionFields}
            onAdd={addSession}
            onUpdate={updateSession}
            onDelete={deleteSession}
            icon={<Moon className="w-5 h-5 text-blue-400" />}
            color="blue"
          />
          
          <CrudList
            title="Sleep Cycles"
            items={cycles}
            fields={cycleFields}
            onAdd={addCycle}
            onUpdate={updateCycle}
            onDelete={deleteCycle}
            icon={<Clock className="w-5 h-5 text-purple-400" />}
            color="purple"
          />
          
          <CrudList
            title="Wake Protocols"
            items={wakeProtocols}
            fields={wakeProtocolFields}
            onAdd={addWakeProtocol}
            onUpdate={updateWakeProtocol}
            onDelete={deleteWakeProtocol}
            icon={<Sunrise className="w-5 h-5 text-amber-400" />}
            color="amber"
          />
        </div>
      )}
    </div>
  )
}