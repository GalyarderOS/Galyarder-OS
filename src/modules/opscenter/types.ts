export interface Project {
  id: string
  name: string
  description: string
  status: 'planning' | 'active' | 'paused' | 'completed' | 'archived'
  priority: 'low' | 'medium' | 'high' | 'critical'
  startDate: string
  endDate: string
  progress: number
  tasks: string[]
  clients: string[]
  team: string[]
  tags: string[]
  notes: string
  createdAt: string
  updatedAt: string
}

export interface Task {
  id: string
  projectId: string
  title: string
  description: string
  status: 'todo' | 'in-progress' | 'review' | 'done'
  priority: 'low' | 'medium' | 'high' | 'critical'
  assignee?: string
  dueDate: string
  estimatedHours: number
  actualHours: number
  dependencies: string[]
  tags: string[]
  createdAt: string
  updatedAt: string
}

export interface Client {
  id: string
  name: string
  company: string
  email: string
  phone?: string
  status: 'active' | 'inactive' | 'prospect'
  projects: string[]
  notes: string
  lastContact: string
  nextContact?: string
  tags: string[]
  createdAt: string
}

export interface Workflow {
  id: string
  name: string
  description: string
  steps: WorkflowStep[]
  isActive: boolean
  category: string
  createdAt: string
  updatedAt: string
}

export interface WorkflowStep {
  id: string
  name: string
  description: string
  order: number
  estimatedDuration: number
  assignee?: string
  checklistItems: {
    id: string
    text: string
    isCompleted: boolean
  }[]
}

export interface OpsCenterState {
  projects: Project[]
  tasks: Task[]
  clients: Client[]
  workflows: Workflow[]
  
  // Project actions
  addProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'tasks'>) => void
  updateProject: (id: string, updates: Partial<Project>) => void
  deleteProject: (id: string) => void
  
  // Task actions
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateTask: (id: string, updates: Partial<Task>) => void
  deleteTask: (id: string) => void
  
  // Client actions
  addClient: (client: Omit<Client, 'id' | 'createdAt'>) => void
  updateClient: (id: string, updates: Partial<Client>) => void
  deleteClient: (id: string) => void
  
  // Workflow actions
  addWorkflow: (workflow: Omit<Workflow, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateWorkflow: (id: string, updates: Partial<Workflow>) => void
  deleteWorkflow: (id: string) => void
  
  // Utility actions
  getProjectsByStatus: (status: Project['status']) => Project[]
  getTasksByStatus: (status: Task['status']) => Task[]
  getClientsByStatus: (status: Client['status']) => Client[]
}