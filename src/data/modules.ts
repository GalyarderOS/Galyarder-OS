import { LayoutDashboard, Bot, Clock, DollarSign, Heart, Target, Briefcase, Brain, Activity, Users, Trophy, Settings, Power, Folder, Calculator, Calendar, Mail, Camera, Music, BookOpen, Network, MessageSquare, Shield, Laptop, Moon, HelpingHand as PrayingHands, Database, Briefcase as BriefcaseIcon, UserPlus, Key, Globe, Grid, Search, Cog } from 'lucide-react'

// Icon mapping for serialization/deserialization
export const iconMap = {
  'LayoutDashboard': LayoutDashboard,
  'Bot': Bot,
  'Clock': Clock,
  'DollarSign': DollarSign,
  'Heart': Heart,
  'Target': Target,
  'Briefcase': Briefcase,
  'Brain': Brain,
  'Activity': Activity,
  'Users': Users,
  'Trophy': Trophy,
  'Settings': Settings,
  'Power': Power,
  'Folder': Folder,
  'Calculator': Calculator,
  'Calendar': Calendar,
  'Mail': Mail,
  'Camera': Camera,
  'Music': Music,
  'BookOpen': BookOpen,
  'Network': Network,
  'MessageSquare': MessageSquare,
  'Shield': Shield,
  'Laptop': Laptop,
  'Moon': Moon,
  'PrayingHands': PrayingHands,
  'Database': Database,
  'BriefcaseIcon': BriefcaseIcon,
  'UserPlus': UserPlus,
  'Key': Key,
  'Globe': Globe,
  'Grid': Grid,
  'Search': Search,
  'Cog': Cog
}

// Module metadata schema
export interface ModuleMetadata {
  id: string
  name: string
  href: string
  icon: string
  color: string
  category: 'productivity' | 'health' | 'finance' | 'personal' | 'system'
  defaultPinned: boolean
  allowQuickActions: boolean
  rightClickMenuItems?: MenuItem[]
  description?: string
  shortcut?: string
  usage?: number // Added usage property for tracking module usage
  tag?: string // Added tag property for categorization
}

export interface MenuItem {
  id: string
  label: string
  icon: string
  action: string
  shortcut?: string
}

// All available modules for the app
export const allModules: ModuleMetadata[] = [
  { 
    id: 'dashboard',
    name: 'Dashboard', 
    href: '/app/dashboard', 
    icon: 'LayoutDashboard',
    color: 'from-blue-500 to-blue-600',
    category: 'system',
    defaultPinned: true,
    allowQuickActions: true,
    rightClickMenuItems: [
      { id: 'refresh', label: 'Refresh Dashboard', icon: 'RefreshCw', action: 'refresh' },
      { id: 'customize', label: 'Customize Widgets', icon: 'Settings', action: 'customize' }
    ],
    shortcut: 'Alt+1',
    description: 'Central command center for a high-level overview of your entire life operating system.',
    usage: 95,
    tag: 'Core'
  },
  { 
    id: 'ai-assistant',
    name: 'AI Assistant', 
    href: '/app/ai-assistant', 
    icon: 'Bot',
    color: 'from-purple-500 to-purple-600',
    category: 'productivity',
    defaultPinned: true,
    allowQuickActions: true,
    rightClickMenuItems: [
      { id: 'new-prompt', label: 'New Prompt', icon: 'MessageSquare', action: 'new-prompt' },
      { id: 'view-history', label: 'View History', icon: 'Clock', action: 'view-history' }
    ],
    shortcut: 'Alt+2',
    description: 'Your personal AI to augment thinking, automate tasks, and unlock creative potential.',
    usage: 88,
    tag: 'Core'
  },
  { 
    id: 'chrono-copilot',
    name: 'Chrono Copilot', 
    href: '/app/chrono-copilot', 
    icon: 'Clock',
    color: 'from-emerald-500 to-emerald-600',
    category: 'productivity',
    defaultPinned: true,
    allowQuickActions: true,
    rightClickMenuItems: [
      { id: 'add-time-block', label: 'Add Time Block', icon: 'Plus', action: 'add-time-block' },
      { id: 'start-timer', label: 'Start Timer', icon: 'Play', action: 'start-timer' }
    ],
    shortcut: 'Alt+3',
    description: 'Master your time with intelligent scheduling, focus timers, and productivity analytics.',
    usage: 92,
    tag: 'Core'
  },
  { 
    id: 'finance-hub',
    name: 'Finance Hub', 
    href: '/app/finance-hub', 
    icon: 'DollarSign',
    color: 'from-green-500 to-green-600',
    category: 'finance',
    defaultPinned: true,
    allowQuickActions: true,
    rightClickMenuItems: [
      { id: 'add-expense', label: 'Add Expense', icon: 'TrendingDown', action: 'add-expense' },
      { id: 'add-income', label: 'Add Income', icon: 'TrendingUp', action: 'add-income' }
    ],
    shortcut: 'Alt+4',
    description: 'Achieve financial clarity with comprehensive budgeting, expense tracking, and investment monitoring.',
    usage: 75,
    tag: 'Core'
  },
  { 
    id: 'health-forge',
    name: 'Health Forge', 
    href: '/app/health-forge', 
    icon: 'Heart',
    color: 'from-red-500 to-red-600',
    category: 'health',
    defaultPinned: true,
    allowQuickActions: true,
    rightClickMenuItems: [
      { id: 'log-workout', label: 'Log Workout', icon: 'Zap', action: 'log-workout' },
      { id: 'log-meal', label: 'Log Meal', icon: 'Plus', action: 'log-meal' }
    ],
    shortcut: 'Alt+5',
    description: 'Engineer your well-being by tracking fitness, nutrition, sleep, and key health metrics.',
    usage: 85,
    tag: 'Core'
  },
  { 
    id: 'productivity-matrix',
    name: 'Productivity Matrix', 
    href: '/app/productivity-matrix', 
    icon: 'Target',
    color: 'from-amber-500 to-amber-600',
    category: 'productivity',
    defaultPinned: true,
    allowQuickActions: true,
    rightClickMenuItems: [
      { id: 'add-task', label: 'Add Task', icon: 'Plus', action: 'add-task' },
      { id: 'focus-mode', label: 'Focus Mode', icon: 'Zap', action: 'focus-mode' }
    ],
    shortcut: 'Alt+6',
    description: 'Define, track, and conquer your ambitions with structured goal setting and progress monitoring.',
    usage: 78,
    tag: 'Core'
  },
  { 
    id: 'career-command',
    name: 'Career Command', 
    href: '/app/career-command', 
    icon: 'Briefcase',
    color: 'from-indigo-500 to-indigo-600',
    category: 'personal',
    defaultPinned: false,
    allowQuickActions: true,
    rightClickMenuItems: [
      { id: 'add-skill', label: 'Add Skill', icon: 'Plus', action: 'add-skill' },
      { id: 'log-achievement', label: 'Log Achievement', icon: 'Award', action: 'log-achievement' }
    ],
    shortcut: 'Alt+7',
    description: 'Strategically manage your professional growth, skills, and career trajectory.',
    usage: 65,
    tag: 'Personal'
  },
  { 
    id: 'mind-guard',
    name: 'Mind Guard', 
    href: '/app/mind-guard', 
    icon: 'Brain',
    color: 'from-pink-500 to-pink-600',
    category: 'health',
    defaultPinned: true,
    allowQuickActions: true,
    rightClickMenuItems: [
      { id: 'log-emotion', label: 'Log Emotion', icon: 'Heart', action: 'log-emotion' },
      { id: 'add-journal', label: 'Add Journal Entry', icon: 'Edit', action: 'add-journal' }
    ],
    shortcut: 'Alt+8',
    description: 'Strengthen your mental well-being with tools for journaling, meditation, and mood tracking.',
    usage: 70,
    tag: 'Core'
  },
  { 
    id: 'system-logs',
    name: 'System Logs', 
    href: '/app/system-logs', 
    icon: 'Activity',
    color: 'from-cyan-500 to-cyan-600',
    category: 'system',
    defaultPinned: true,
    allowQuickActions: false,
    rightClickMenuItems: [
      { id: 'view-activity', label: 'View Activity', icon: 'Eye', action: 'view-activity' },
      { id: 'export-logs', label: 'Export Logs', icon: 'Download', action: 'export-logs' }
    ],
    shortcut: 'Alt+9',
    description: 'Review and analyze your life\'s data with a comprehensive, searchable log of all activities.',
    usage: 60,
    tag: 'Core'
  },
  { 
    id: 'relationships-forge',
    name: 'Relationships Forge', 
    href: '/app/relationships-forge', 
    icon: 'Users',
    color: 'from-violet-500 to-violet-600',
    category: 'personal',
    defaultPinned: false,
    allowQuickActions: true,
    rightClickMenuItems: [
      { id: 'add-contact', label: 'Add Contact', icon: 'UserPlus', action: 'add-contact' },
      { id: 'log-interaction', label: 'Log Interaction', icon: 'MessageSquare', action: 'log-interaction' }
    ],
    description: 'Nurture and manage your personal and professional relationships with intention.',
    usage: 55,
    tag: 'Personal'
  },
  { 
    id: 'legacy-builder',
    name: 'Legacy Builder', 
    href: '/app/legacy-builder', 
    icon: 'Trophy',
    color: 'from-yellow-500 to-yellow-600',
    category: 'personal',
    defaultPinned: false,
    allowQuickActions: true,
    rightClickMenuItems: [
      { id: 'add-goal', label: 'Add Goal', icon: 'Plus', action: 'add-goal' },
      { id: 'view-progress', label: 'View Progress', icon: 'TrendingUp', action: 'view-progress' }
    ],
    description: 'Curate your long-term vision, values, and life\'s work to build a lasting legacy.',
    usage: 45,
    tag: 'Personal'
  },
  { 
    id: 'knowledge-arsenal',
    name: 'Knowledge Arsenal', 
    href: '/app/knowledge-arsenal', 
    icon: 'BookOpen',
    color: 'from-blue-500 to-purple-600',
    category: 'productivity',
    defaultPinned: true,
    allowQuickActions: true,
    rightClickMenuItems: [
      { id: 'add-book', label: 'Add Book', icon: 'Plus', action: 'add-book' },
      { id: 'log-study', label: 'Log Study Session', icon: 'Clock', action: 'log-study' }
    ],
    description: 'Build your personal library of wisdom by capturing and organizing what you learn.',
    usage: 72,
    tag: 'Personal'
  },
  { 
    id: 'network-nexus',
    name: 'Network Nexus', 
    href: '/app/network-nexus', 
    icon: 'Network',
    color: 'from-purple-500 to-pink-600',
    category: 'personal',
    defaultPinned: false,
    allowQuickActions: true,
    rightClickMenuItems: [
      { id: 'add-connection', label: 'Add Connection', icon: 'UserPlus', action: 'add-connection' },
      { id: 'schedule-followup', label: 'Schedule Follow-up', icon: 'Calendar', action: 'schedule-followup' }
    ],
    description: 'Intelligently manage and nurture your professional and personal networks.',
    usage: 58,
    tag: 'Personal'
  },
  { 
    id: 'communication-console',
    name: 'Communication Console', 
    href: '/app/communication-console', 
    icon: 'MessageSquare',
    color: 'from-blue-500 to-cyan-600',
    category: 'productivity',
    defaultPinned: false,
    allowQuickActions: true,
    rightClickMenuItems: [
      { id: 'compose', label: 'Compose Message', icon: 'Edit', action: 'compose' },
      { id: 'check-inbox', label: 'Check Inbox', icon: 'Mail', action: 'check-inbox' }
    ],
    description: 'Streamline your communications across multiple channels from a single, unified inbox.',
    usage: 62,
    tag: 'Personal'
  },
  { 
    id: 'privacy-vault',
    name: 'Privacy Vault', 
    href: '/app/privacy-vault', 
    icon: 'Shield',
    color: 'from-slate-500 to-blue-600',
    category: 'system',
    defaultPinned: false,
    allowQuickActions: false,
    rightClickMenuItems: [
      { id: 'add-credential', label: 'Add Credential', icon: 'Plus', action: 'add-credential' },
      { id: 'security-check', label: 'Security Check', icon: 'Lock', action: 'security-check' }
    ],
    description: 'Protect your most sensitive information with end-to-end encrypted data storage.',
    usage: 68,
    tag: 'Personal'
  },
  { 
    id: 'calendar',
    name: 'Calendar', 
    href: '/app/calendar', 
    icon: 'Calendar',
    color: 'from-red-500 to-red-600',
    category: 'productivity',
    defaultPinned: false,
    allowQuickActions: true,
    rightClickMenuItems: [
      { id: 'add-event', label: 'Add Event', icon: 'Plus', action: 'add-event' },
      { id: 'view-today', label: 'View Today', icon: 'Calendar', action: 'view-today' }
    ],
    description: 'Organize your schedule, events, and appointments in a smart, integrated calendar.',
    usage: 85,
    tag: 'Core'
  },
  { 
    id: 'files',
    name: 'Files', 
    href: '/app/files', 
    icon: 'Folder',
    color: 'from-blue-500 to-blue-600',
    category: 'system',
    defaultPinned: false,
    allowQuickActions: true,
    rightClickMenuItems: [
      { id: 'upload-file', label: 'Upload File', icon: 'Upload', action: 'upload-file' },
      { id: 'new-folder', label: 'New Folder', icon: 'FolderPlus', action: 'new-folder' }
    ],
    description: 'Manage your digital files and documents with a powerful and intuitive file explorer.',
    usage: 70,
    tag: 'Core'
  },
  { 
    id: 'calculator',
    name: 'Calculator', 
    href: '/app/calculator', 
    icon: 'Calculator',
    color: 'from-gray-500 to-gray-600',
    category: 'productivity',
    defaultPinned: false,
    allowQuickActions: false,
    rightClickMenuItems: [
      { id: 'standard-mode', label: 'Standard Mode', icon: 'Calculator', action: 'standard-mode' },
      { id: 'scientific-mode', label: 'Scientific Mode', icon: 'Calculator', action: 'scientific-mode' }
    ],
    description: 'Perform calculations from simple arithmetic to complex scientific equations with a calculator that supports variables, functions, and unit conversions.',
    usage: 40,
    tag: 'Core'
  },
  { 
    id: 'environment-architect',
    name: 'Environment Architect', 
    href: '/app/environment-architect', 
    icon: 'Laptop',
    color: 'from-blue-500 to-emerald-600',
    category: 'health',
    defaultPinned: false,
    allowQuickActions: true,
    rightClickMenuItems: [
      { id: 'add-device', label: 'Add Device', icon: 'Plus', action: 'add-device' },
      { id: 'activate-mode', label: 'Activate Mode', icon: 'Power', action: 'activate-mode' }
    ],
    description: 'Design and optimize your physical and digital environments for peak performance.',
    usage: 35,
    tag: 'Advanced'
  },
  { 
    id: 'sleep-architect',
    name: 'Sleep Architect', 
    href: '/app/sleep-architect', 
    icon: 'Moon',
    color: 'from-blue-500 to-purple-600',
    category: 'health',
    defaultPinned: false,
    allowQuickActions: true,
    rightClickMenuItems: [
      { id: 'log-sleep', label: 'Log Sleep', icon: 'Moon', action: 'log-sleep' },
      { id: 'view-cycles', label: 'View Cycles', icon: 'Activity', action: 'view-cycles' }
    ],
    description: 'Improve your sleep quality with advanced tracking, analysis, and personalized recommendations.',
    usage: 48,
    tag: 'Advanced'
  },
  { 
    id: 'spiritual-forge',
    name: 'Spiritual Forge', 
    href: '/app/spiritual-forge', 
    icon: 'PrayingHands',
    color: 'from-emerald-500 to-blue-600',
    category: 'personal',
    defaultPinned: true,
    allowQuickActions: true,
    rightClickMenuItems: [
      { id: 'add-prayer', label: 'Add Prayer', icon: 'Plus', action: 'add-prayer' },
      { id: 'log-reflection', label: 'Log Reflection', icon: 'Edit', action: 'log-reflection' }
    ],
    description: 'Cultivate inner peace and personal growth through guided practices and reflective exercises.',
    usage: 52,
    tag: 'Personal'
  },
  { 
    id: 'meta-memory',
    name: 'Meta Memory', 
    href: '/app/meta-memory', 
    icon: 'Database',
    color: 'from-blue-500 to-purple-600',
    category: 'system',
    defaultPinned: false,
    allowQuickActions: false,
    rightClickMenuItems: [
      { id: 'take-snapshot', label: 'Take Snapshot', icon: 'Camera', action: 'take-snapshot' },
      { id: 'view-insights', label: 'View Insights', icon: 'Lightbulb', action: 'view-insights' }
    ],
    description: 'Access a comprehensive, searchable archive of your digital interactions and personal data.',
    usage: 38,
    tag: 'Advanced'
  },
  { 
    id: 'ops-center',
    name: 'Ops Center', 
    href: '/app/ops-center', 
    icon: 'BriefcaseIcon',
    color: 'from-blue-500 to-amber-600',
    category: 'productivity',
    defaultPinned: false,
    allowQuickActions: true,
    rightClickMenuItems: [
      { id: 'add-project', label: 'Add Project', icon: 'Plus', action: 'add-project' },
      { id: 'view-workflow', label: 'View Workflow', icon: 'List', action: 'view-workflow' }
    ],
    description: 'Centralized hub for managing projects, workflows, and operational tasks.',
    usage: 42,
    tag: 'Advanced'
  },
  { 
    id: 'family-matrix',
    name: 'Family Matrix', 
    href: '/app/family-matrix', 
    icon: 'UserPlus',
    color: 'from-blue-500 to-pink-600',
    category: 'personal',
    defaultPinned: false,
    allowQuickActions: true,
    rightClickMenuItems: [
      { id: 'add-member', label: 'Add Family Member', icon: 'UserPlus', action: 'add-member' },
      { id: 'add-event', label: 'Add Family Event', icon: 'Calendar', action: 'add-event' }
    ],
    description: 'Organize and track family relationships, events, and shared responsibilities.',
    usage: 30,
    tag: 'Personal'
  },
  { 
    id: 'digital-sovereignty',
    name: 'Digital Sovereignty', 
    href: '/app/digital-sovereignty', 
    icon: 'Key',
    color: 'from-blue-500 to-purple-600',
    category: 'system',
    defaultPinned: false,
    allowQuickActions: false,
    rightClickMenuItems: [
      { id: 'add-key', label: 'Add Key', icon: 'Plus', action: 'add-key' },
      { id: 'security-audit', label: 'Security Audit', icon: 'Shield', action: 'security-audit' }
    ],
    description: 'Empower yourself with tools to control and secure your digital identity and data.',
    usage: 25,
    tag: 'Advanced'
  },
  { 
    id: 'world-intelligence',
    name: 'World Intelligence', 
    href: '/app/world-intelligence', 
    icon: 'Globe',
    color: 'from-blue-500 to-amber-600',
    category: 'productivity',
    defaultPinned: false,
    allowQuickActions: true,
    rightClickMenuItems: [
      { id: 'add-signal', label: 'Add Signal', icon: 'Plus', action: 'add-signal' },
      { id: 'view-trends', label: 'View Trends', icon: 'TrendingUp', action: 'view-trends' }
    ],
    description: 'Stay informed and gain insights into global trends, news, and geopolitical developments.',
    usage: 32,
    tag: 'Advanced'
  },
  { 
    id: 'app-drawer',
    name: 'App Drawer', 
    href: '/app/app-drawer', 
    icon: 'Grid',
    color: 'from-gray-500 to-gray-600',
    category: 'system',
    defaultPinned: true,
    allowQuickActions: false,
    rightClickMenuItems: [
      { id: 'view-all', label: 'View All Apps', icon: 'Grid', action: 'view-all' },
      { id: 'customize-dock', label: 'Customize Dock', icon: 'Settings', action: 'customize-dock' }
    ],
    shortcut: 'Alt+A',
    description: 'Access and manage all your installed modules and applications.',
    usage: 50,
    tag: 'Core'
  },
  { 
    id: 'settings',
    name: 'Settings', 
    href: '/app/settings', 
    icon: 'Settings',
    color: 'from-slate-500 to-slate-600',
    category: 'system',
    defaultPinned: true,
    allowQuickActions: false,
    rightClickMenuItems: [
      { id: 'account-settings', label: 'Account Settings', icon: 'User', action: 'account-settings' },
      { id: 'appearance', label: 'Appearance', icon: 'Palette', action: 'appearance' }
    ],
    shortcut: 'Alt+S',
    description: 'Customize your GalyarderOS experience, manage account preferences, and configure system behavior.',
    usage: 45,
    tag: 'Core'
  },
  { 
    id: 'command-palette',
    name: 'Command Palette', 
    href: '#', 
    icon: 'Search',
    color: 'from-slate-500 to-slate-600',
    category: 'system',
    defaultPinned: false,
    allowQuickActions: false,
    rightClickMenuItems: [],
    shortcut: 'Ctrl+K',
    description: 'Quickly access commands, modules, and actions across your entire system.',
    usage: 65,
    tag: 'Core'
  },
  { 
    id: 'system-kernel',
    name: 'System Kernel', 
    href: '/app/system-kernel', 
    icon: 'Cog',
    color: 'from-indigo-500 to-purple-600',
    category: 'system',
    defaultPinned: true,
    allowQuickActions: false,
    rightClickMenuItems: [
      { id: 'operating-modes', label: 'Operating Modes', icon: 'Power', action: 'operating-modes' },
      { id: 'module-control', label: 'Module Control', icon: 'Layers', action: 'module-control' },
      { id: 'system-behavior', label: 'System Behavior', icon: 'Brain', action: 'system-behavior' }
    ],
    shortcut: 'Alt+K',
    description: 'One of 27+ integrated modules designed to build your personal civilization.',
    usage: 55,
    tag: 'Advanced'
  }
]
