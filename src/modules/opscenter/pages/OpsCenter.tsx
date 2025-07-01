import { motion } from 'framer-motion'
import { useState } from 'react'
import { Briefcase, Users, ListChecks } from 'lucide-react'
import { ProjectBoard } from '../components/ProjectBoard'
import { ClientMatrix } from '../components/ClientMatrix'
import { ExecutionStack } from '../components/ExecutionStack'
import { CrudList } from '../../../components/shared/CrudList'
import { useOpsCenterStore } from '../store/opsCenterStore'

export function OpsCenter() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'manage'>('dashboard')
  const { 
    projects, 
    clients, 
    workflows,
    addProject,
    updateProject,
    deleteProject,
    addClient,
    updateClient,
    deleteClient,
    addWorkflow,
    updateWorkflow,
    deleteWorkflow
  } = useOpsCenterStore()

  const projectFields = [
    { name: 'name', label: 'Project Name', type: 'text' as const, required: true, isListColumn: true },
    { name: 'description', label: 'Description', type: 'textarea' as const, required: true },
    { 
      name: 'status', 
      label: 'Status', 
      type: 'select' as const, 
      options: [
        { value: 'planning', label: 'Planning' },
        { value: 'active', label: 'Active' },
        { value: 'paused', label: 'Paused' },
        { value: 'completed', label: 'Completed' },
        { value: 'archived', label: 'Archived' }
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
        { value: 'high', label: 'High' },
        { value: 'critical', label: 'Critical' }
      ],
      required: true,
      isListColumn: true
    },
    { name: 'startDate', label: 'Start Date', type: 'date' as const, required: true },
    { name: 'endDate', label: 'End Date', type: 'date' as const, required: true },
    { name: 'progress', label: 'Progress (%)', type: 'number' as const, required: true, isListColumn: true },
    { name: 'clients', label: 'Clients', type: 'tags' as const },
    { name: 'team', label: 'Team Members', type: 'tags' as const },
    { name: 'tags', label: 'Tags', type: 'tags' as const },
    { name: 'notes', label: 'Notes', type: 'textarea' as const }
  ]

  const clientFields = [
    { name: 'name', label: 'Client Name', type: 'text' as const, required: true, isListColumn: true },
    { name: 'company', label: 'Company', type: 'text' as const, required: true, isListColumn: true },
    { name: 'email', label: 'Email', type: 'text' as const, required: true, isListColumn: true },
    { name: 'phone', label: 'Phone', type: 'text' as const },
    { 
      name: 'status', 
      label: 'Status', 
      type: 'select' as const, 
      options: [
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
        { value: 'prospect', label: 'Prospect' }
      ],
      required: true,
      isListColumn: true
    },
    { name: 'projects', label: 'Projects', type: 'tags' as const },
    { name: 'notes', label: 'Notes', type: 'textarea' as const },
    { name: 'lastContact', label: 'Last Contact', type: 'date' as const, required: true },
    { name: 'nextContact', label: 'Next Contact', type: 'date' as const },
    { name: 'tags', label: 'Tags', type: 'tags' as const }
  ]

  const workflowFields = [
    { name: 'name', label: 'Workflow Name', type: 'text' as const, required: true, isListColumn: true },
    { name: 'description', label: 'Description', type: 'textarea' as const, required: true },
    { name: 'category', label: 'Category', type: 'text' as const, required: true, isListColumn: true },
    { name: 'isActive', label: 'Active', type: 'checkbox' as const, isListColumn: true }
  ]

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-amber-400 bg-clip-text text-transparent">
          Ops Center
        </h1>
        <p className="text-slate-400 mt-2">
          Execution hub for projects and campaigns with tactical workflows
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
            <ProjectBoard />
          </div>
          <div className="space-y-8">
            <ClientMatrix />
            <ExecutionStack />
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <CrudList
            title="Projects"
            items={projects}
            fields={projectFields}
            onAdd={addProject}
            onUpdate={updateProject}
            onDelete={deleteProject}
            icon={<Briefcase className="w-5 h-5 text-blue-400" />}
            color="blue"
          />
          
          <CrudList
            title="Clients"
            items={clients}
            fields={clientFields}
            onAdd={addClient}
            onUpdate={updateClient}
            onDelete={deleteClient}
            icon={<Users className="w-5 h-5 text-purple-400" />}
            color="purple"
          />
          
          <CrudList
            title="Workflows"
            items={workflows}
            fields={workflowFields}
            onAdd={addWorkflow}
            onUpdate={updateWorkflow}
            onDelete={deleteWorkflow}
            icon={<ListChecks className="w-5 h-5 text-amber-400" />}
            color="amber"
          />
        </div>
      )}
    </div>
  )
}