import { LayoutDashboard, Bot, Clock, DollarSign, Heart, Target, Briefcase, Brain, Activity, Users, Trophy, Settings, Power, Folder, Calculator, Calendar, Mail, Camera, Music, BookOpen, Network, MessageSquare, Shield, Laptop, Moon, HelpingHand as PrayingHands, Database, Briefcase as BriefcaseIcon, UserPlus, Key, Globe, Grid, Search, Cog } from 'lucide-react';
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
};
// All available modules for the app
export const allModules = [
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
            { id: 'log-workout', label: 'Log Workout', icon: 'Activity', action: 'log-workout' },
            { id: 'track-meal', label: 'Track Meal', icon: 'Utensils', action: 'track-meal' }
        ],
        shortcut: 'Alt+5',
        usage: 82,
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
        shortcut: 'Alt+,',
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
        description: 'Configure how your OS behaves. Activate modes, modules, and meta-control your life systems.',
        usage: 55,
        tag: 'Advanced'
    }
];
