import { motion } from 'framer-motion'
import { useState } from 'react'
import { Users, CheckSquare, Heart } from 'lucide-react'
import { FamilyTreeView } from '../components/FamilyTreeView'
import { ResponsibilityTracker } from '../components/ResponsibilityTracker'
import { GratitudeLedger } from '../components/GratitudeLedger'
import { CrudList } from '../../../components/shared/CrudList'
import { useFamilyMatrixStore } from '../store/familyMatrixStore'

export function FamilyMatrix() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'manage'>('dashboard')
  const { 
    familyMembers, 
    responsibilities, 
    gratitudeEntries, 
    familyEvents,
    addFamilyMember,
    updateFamilyMember,
    deleteFamilyMember,
    addResponsibility,
    updateResponsibility,
    deleteResponsibility,
    addGratitudeEntry,
    updateGratitudeEntry,
    deleteGratitudeEntry,
    addFamilyEvent,
    updateFamilyEvent,
    deleteFamilyEvent
  } = useFamilyMatrixStore()

  const familyMemberFields = [
    { name: 'name', label: 'Name', type: 'text' as const, required: true, isListColumn: true },
    { name: 'relationship', label: 'Relationship', type: 'text' as const, required: true, isListColumn: true },
    { name: 'birthdate', label: 'Birthdate', type: 'date' as const },
    { name: 'contact.email', label: 'Email', type: 'text' as const },
    { name: 'contact.phone', label: 'Phone', type: 'text' as const },
    { name: 'contact.address', label: 'Address', type: 'text' as const },
    { name: 'notes', label: 'Notes', type: 'textarea' as const },
    { name: 'lastContact', label: 'Last Contact', type: 'date' as const, required: true, isListColumn: true },
    { name: 'nextContact', label: 'Next Contact', type: 'date' as const },
    { name: 'tags', label: 'Tags', type: 'tags' as const }
  ]

  const responsibilityFields = [
    { name: 'title', label: 'Title', type: 'text' as const, required: true, isListColumn: true },
    { name: 'description', label: 'Description', type: 'textarea' as const, required: true },
    { name: 'assignee', label: 'Assignee', type: 'text' as const, required: true, isListColumn: true },
    { name: 'dueDate', label: 'Due Date', type: 'date' as const },
    { name: 'recurring', label: 'Recurring', type: 'checkbox' as const, isListColumn: true },
    { name: 'recurrencePattern', label: 'Recurrence Pattern', type: 'text' as const },
    { 
      name: 'status', 
      label: 'Status', 
      type: 'select' as const, 
      options: [
        { value: 'pending', label: 'Pending' },
        { value: 'in-progress', label: 'In Progress' },
        { value: 'completed', label: 'Completed' },
        { value: 'overdue', label: 'Overdue' }
      ],
      required: true,
      isListColumn: true
    },
    { 
      name: 'priority', 
      label: 'Priority', 
      type: 'select' as const, 
      options: [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' }
      ],
      required: true,
      isListColumn: true
    },
    { name: 'category', label: 'Category', type: 'text' as const, required: true },
    { name: 'notes', label: 'Notes', type: 'textarea' as const }
  ]

  const gratitudeEntryFields = [
    { name: 'date', label: 'Date', type: 'date' as const, required: true, isListColumn: true },
    { name: 'recipient', label: 'Recipient', type: 'text' as const, required: true, isListColumn: true },
    { name: 'content', label: 'Content', type: 'textarea' as const, required: true },
    { name: 'category', label: 'Category', type: 'text' as const, required: true, isListColumn: true },
    { name: 'isShared', label: 'Shared', type: 'checkbox' as const, isListColumn: true },
    { name: 'tags', label: 'Tags', type: 'tags' as const }
  ]

  const eventFields = [
    { name: 'title', label: 'Title', type: 'text' as const, required: true, isListColumn: true },
    { name: 'description', label: 'Description', type: 'textarea' as const, required: true },
    { name: 'date', label: 'Date', type: 'date' as const, required: true, isListColumn: true },
    { name: 'location', label: 'Location', type: 'text' as const },
    { name: 'attendees', label: 'Attendees', type: 'tags' as const },
    { 
      name: 'status', 
      label: 'Status', 
      type: 'select' as const, 
      options: [
        { value: 'planned', label: 'Planned' },
        { value: 'confirmed', label: 'Confirmed' },
        { value: 'completed', label: 'Completed' },
        { value: 'cancelled', label: 'Cancelled' }
      ],
      required: true,
      isListColumn: true
    },
    { name: 'notes', label: 'Notes', type: 'textarea' as const }
  ]

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent">
          Family Matrix
        </h1>
        <p className="text-slate-400 mt-2">
          Manage family relationships, responsibilities, and express gratitude
        </p>
      </motion.div>

      {/* Tab Navigation */}
      <div className="flex space-x-2 mb-6">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'dashboard'
              ? 'bg-pink-600 text-white'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          Dashboard
        </button>
        <button
          onClick={() => setActiveTab('manage')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'manage'
              ? 'bg-pink-600 text-white'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          Manage
        </button>
      </div>

      {activeTab === 'dashboard' ? (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2">
            <FamilyTreeView />
          </div>
          <div className="space-y-8">
            <ResponsibilityTracker />
            <GratitudeLedger />
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <CrudList
            title="Family Members"
            items={familyMembers}
            fields={familyMemberFields}
            onAdd={addFamilyMember}
            onUpdate={updateFamilyMember}
            onDelete={deleteFamilyMember}
            icon={<Users className="w-5 h-5 text-blue-400" />}
            color="blue"
          />
          
          <CrudList
            title="Responsibilities"
            items={responsibilities}
            fields={responsibilityFields}
            onAdd={addResponsibility}
            onUpdate={updateResponsibility}
            onDelete={deleteResponsibility}
            icon={<CheckSquare className="w-5 h-5 text-emerald-400" />}
            color="emerald"
          />
          
          <CrudList
            title="Gratitude Entries"
            items={gratitudeEntries}
            fields={gratitudeEntryFields}
            onAdd={addGratitudeEntry}
            onUpdate={updateGratitudeEntry}
            onDelete={deleteGratitudeEntry}
            icon={<Heart className="w-5 h-5 text-pink-400" />}
            color="pink"
          />
          
          <CrudList
            title="Family Events"
            items={familyEvents}
            fields={eventFields}
            onAdd={addFamilyEvent}
            onUpdate={updateFamilyEvent}
            onDelete={deleteFamilyEvent}
            icon={<Users className="w-5 h-5 text-purple-400" />}
            color="purple"
          />
        </div>
      )}
    </div>
  )
}