import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { OpsCenterState, Project, Task, Client, Workflow } from '../types'

const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Website Redesign',
    description: 'Complete overhaul of client website with new branding and features',
    status: 'active',
    priority: 'high',
    startDate: '2024-02-01',
    endDate: '2024-03-15',
    progress: 35,
    tasks: [],
    clients: ['client1'],
    team: ['John Doe', 'Sarah Smith'],
    tags: ['design', 'development', 'branding'],
    notes: 'Client has requested additional focus on mobile responsiveness',
    createdAt: '2024-01-25',
    updatedAt: '2024-02-10'
  },
  {
    id: '2',
    name: 'Marketing Campaign',
    description: 'Q1 marketing campaign for product launch',
    status: 'planning',
    priority: 'medium',
    startDate: '2024-02-15',
    endDate: '2024-04-30',
    progress: 10,
    tasks: [],
    clients: ['client2'],
    team: ['Emily Johnson', 'Michael Brown'],
    tags: ['marketing', 'social-media', 'content'],
    notes: 'Budget approved, waiting for final creative direction',
    createdAt: '2024-01-30',
    updatedAt: '2024-02-08'
  }
]

const mockTasks: Task[] = [
  {
    id: '1',
    projectId: '1',
    title: 'Design Homepage Mockup',
    description: 'Create high-fidelity mockup for the new homepage',
    status: 'in-progress',
    priority: 'high',
    assignee: 'Sarah Smith',
    dueDate: '2024-02-15',
    estimatedHours: 8,
    actualHours: 6,
    dependencies: [],
    tags: ['design', 'ui'],
    createdAt: '2024-02-01',
    updatedAt: '2024-02-10'
  },
  {
    id: '2',
    projectId: '1',
    title: 'Develop Navigation Component',
    description: 'Implement responsive navigation with dropdown menus',
    status: 'todo',
    priority: 'medium',
    assignee: 'John Doe',
    dueDate: '2024-02-20',
    estimatedHours: 6,
    actualHours: 0,
    dependencies: ['1'],
    tags: ['development', 'frontend'],
    createdAt: '2024-02-01',
    updatedAt: '2024-02-01'
  }
]

const mockClients: Client[] = [
  {
    id: 'client1',
    name: 'Acme Corporation',
    company: 'Acme Inc.',
    email: 'contact@acme.com',
    phone: '+1-555-123-4567',
    status: 'active',
    projects: ['1'],
    notes: 'Long-term client, very responsive to communications',
    lastContact: '2024-02-08',
    nextContact: '2024-02-15',
    tags: ['enterprise', 'tech'],
    createdAt: '2023-06-15'
  },
  {
    id: 'client2',
    name: 'Globex Industries',
    company: 'Globex',
    email: 'info@globex.com',
    status: 'active',
    projects: ['2'],
    notes: 'New client, first major project',
    lastContact: '2024-02-05',
    nextContact: '2024-02-12',
    tags: ['startup', 'marketing'],
    createdAt: '2024-01-20'
  }
]

const mockWorkflows: Workflow[] = [
  {
    id: '1',
    name: 'Client Onboarding',
    description: 'Standard process for bringing on new clients',
    steps: [
      {
        id: '1',
        name: 'Initial Consultation',
        description: 'Understand client needs and project scope',
        order: 1,
        estimatedDuration: 120,
        checklistItems: [
          { id: '1', text: 'Send pre-meeting questionnaire', isCompleted: false },
          { id: '2', text: 'Schedule video call', isCompleted: false },
          { id: '3', text: 'Prepare project examples', isCompleted: false }
        ]
      },
      {
        id: '2',
        name: 'Proposal Development',
        description: 'Create and present project proposal',
        order: 2,
        estimatedDuration: 240,
        checklistItems: [
          { id: '1', text: 'Draft scope of work', isCompleted: false },
          { id: '2', text: 'Develop timeline', isCompleted: false },
          { id: '3', text: 'Create budget', isCompleted: false },
          { id: '4', text: 'Present to client', isCompleted: false }
        ]
      }
    ],
    isActive: true,
    category: 'client',
    createdAt: '2024-01-15',
    updatedAt: '2024-02-01'
  }
]

// Add tasks to projects
mockProjects[0].tasks = mockTasks.filter(task => task.projectId === '1').map(task => task.id)
mockProjects[1].tasks = mockTasks.filter(task => task.projectId === '2').map(task => task.id)

export const useOpsCenterStore = create<OpsCenterState>()(
  persist(
    (set, get) => ({
      projects: mockProjects,
      clients: mockClients,
      workflows: mockWorkflows,

      addProject: (project) => {
        const newProject: Project = {
          ...project,
          id: Math.random().toString(36).substr(2, 9),
          tasks: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
        set((state) => ({
          projects: [...state.projects, newProject]
        }))
      },

      updateProject: (id, updates) => {
        set((state) => ({
          projects: state.projects.map(project =>
            project.id === id 
              ? { ...project, ...updates, updatedAt: new Date().toISOString() }
              : project
          )
        }))
      },

      deleteProject: (id) => {
        set((state) => ({
          projects: state.projects.filter(project => project.id !== id),
          tasks: state.tasks.filter(task => task.projectId !== id)
        }))
      },

      addTask: (task) => {
        const newTask: Task = {
          ...task,
          id: Math.random().toString(36).substr(2, 9),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
        
        set((state) => ({
          tasks: [...state.tasks, newTask],
          projects: state.projects.map(project =>
            project.id === task.projectId
              ? { ...project, tasks: [...project.tasks, newTask.id] }
              : project
          )
        }))
      },

      updateTask: (id, updates) => {
        set((state) => ({
          tasks: state.tasks.map(task =>
            task.id === id 
              ? { ...task, ...updates, updatedAt: new Date().toISOString() }
              : task
          )
        }))
      },

      deleteTask: (id) => {
        const taskToDelete = get().tasks.find(task => task.id === id)
        
        if (taskToDelete) {
          set((state) => ({
            tasks: state.tasks.filter(task => task.id !== id),
            projects: state.projects.map(project =>
              project.id === taskToDelete.projectId
                ? { ...project, tasks: project.tasks.filter(taskId => taskId !== id) }
                : project
            )
          }))
        }
      },

      addClient: (client) => {
        const newClient: Client = {
          ...client,
          id: Math.random().toString(36).substr(2, 9),
          createdAt: new Date().toISOString()
        }
        set((state) => ({
          clients: [...state.clients, newClient]
        }))
      },

      updateClient: (id, updates) => {
        set((state) => ({
          clients: state.clients.map(client =>
            client.id === id ? { ...client, ...updates } : client
          )
        }))
      },

      deleteClient: (id) => {
        set((state) => ({
          clients: state.clients.filter(client => client.id !== id)
        }))
      },

      addWorkflow: (workflow) => {
        const newWorkflow: Workflow = {
          ...workflow,
          id: Math.random().toString(36).substr(2, 9),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
        set((state) => ({
          workflows: [...state.workflows, newWorkflow]
        }))
      },

      updateWorkflow: (id, updates) => {
        set((state) => ({
          workflows: state.workflows.map(workflow =>
            workflow.id === id 
              ? { ...workflow, ...updates, updatedAt: new Date().toISOString() }
              : workflow
          )
        }))
      },

      deleteWorkflow: (id) => {
        set((state) => ({
          workflows: state.workflows.filter(workflow => workflow.id !== id)
        }))
      },

      getProjectsByStatus: (status) => {
        return get().projects.filter(project => project.status === status)
      },

      getTasksByStatus: (status) => {
        return get().tasks.filter(task => task.status === status)
      },

      getClientsByStatus: (status) => {
        return get().clients.filter(client => client.status === status)
      }
    }),
    {
      name: 'ops-center-storage'
    }
  )
)