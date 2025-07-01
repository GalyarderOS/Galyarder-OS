import { create } from 'zustand';
import { persist } from 'zustand/middleware';
const defaultOperatingModes = [
    {
        id: 'balanced',
        name: 'Balanced Mode',
        description: 'Optimal balance of all system functions',
        icon: 'layers',
        color: 'from-blue-500 to-blue-600',
        effects: [
            'All modules active with equal priority',
            'Standard notification frequency',
            'Balanced resource allocation',
            'Default AI assistance level'
        ],
        isDefault: true
    },
    {
        id: 'focus',
        name: 'Focus Mode',
        description: 'Minimize distractions, maximize productivity',
        icon: 'zap',
        color: 'from-amber-500 to-amber-600',
        effects: [
            'Productivity modules prioritized',
            'Notifications minimized',
            'Deep work sessions enabled',
            'Time tracking enhanced'
        ]
    },
    {
        id: 'wellness',
        name: 'Wellness Mode',
        description: 'Prioritize health and mental wellbeing',
        icon: 'activity',
        color: 'from-emerald-500 to-emerald-600',
        effects: [
            'Health modules prioritized',
            'Wellness reminders increased',
            'Stress monitoring active',
            'Work modules deprioritized'
        ]
    },
    {
        id: 'security',
        name: 'Security Mode',
        description: 'Maximum privacy and data protection',
        icon: 'shield',
        color: 'from-red-500 to-red-600',
        effects: [
            'Enhanced encryption active',
            'Privacy modules prioritized',
            'External connections limited',
            'Security monitoring increased'
        ]
    }
];
const defaultModuleStates = [
    {
        id: 'dashboard',
        name: 'Dashboard',
        category: 'Core',
        icon: 'layers',
        color: 'from-blue-500 to-blue-600',
        active: true,
        isCore: true
    },
    {
        id: 'ai-assistant',
        name: 'AI Assistant',
        category: 'Core',
        icon: 'brain',
        color: 'from-purple-500 to-purple-600',
        active: true,
        isCore: true
    },
    {
        id: 'chrono-copilot',
        name: 'Chrono Copilot',
        category: 'Core',
        icon: 'activity',
        color: 'from-emerald-500 to-emerald-600',
        active: true
    },
    {
        id: 'finance-hub',
        name: 'Finance Hub',
        category: 'Core',
        icon: 'activity',
        color: 'from-green-500 to-green-600',
        active: true
    },
    {
        id: 'health-forge',
        name: 'Health Forge',
        category: 'Core',
        icon: 'activity',
        color: 'from-red-500 to-red-600',
        active: true
    },
    {
        id: 'productivity-matrix',
        name: 'Productivity Matrix',
        category: 'Core',
        icon: 'activity',
        color: 'from-amber-500 to-amber-600',
        active: true
    },
    {
        id: 'mind-guard',
        name: 'Mind Guard',
        category: 'Core',
        icon: 'brain',
        color: 'from-pink-500 to-pink-600',
        active: true
    },
    {
        id: 'system-logs',
        name: 'System Logs',
        category: 'System',
        icon: 'activity',
        color: 'from-cyan-500 to-cyan-600',
        active: true
    },
    {
        id: 'relationships-forge',
        name: 'Relationships Forge',
        category: 'Personal',
        icon: 'activity',
        color: 'from-violet-500 to-violet-600',
        active: true
    },
    {
        id: 'legacy-builder',
        name: 'Legacy Builder',
        category: 'Personal',
        icon: 'activity',
        color: 'from-yellow-500 to-yellow-600',
        active: true
    },
    {
        id: 'environment-architect',
        name: 'Environment Architect',
        category: 'Advanced',
        icon: 'settings',
        color: 'from-blue-500 to-emerald-600',
        active: true
    },
    {
        id: 'sleep-architect',
        name: 'Sleep Architect',
        category: 'Advanced',
        icon: 'activity',
        color: 'from-blue-500 to-purple-600',
        active: true
    },
    {
        id: 'spiritual-forge',
        name: 'Spiritual Forge',
        category: 'Advanced',
        icon: 'activity',
        color: 'from-emerald-500 to-blue-600',
        active: true
    },
    {
        id: 'meta-memory',
        name: 'Meta Memory',
        category: 'Advanced',
        icon: 'brain',
        color: 'from-blue-500 to-purple-600',
        active: true
    },
    {
        id: 'digital-sovereignty',
        name: 'Digital Sovereignty',
        category: 'Advanced',
        icon: 'shield',
        color: 'from-blue-500 to-purple-600',
        active: true
    },
    {
        id: 'world-intelligence',
        name: 'World Intelligence',
        category: 'Advanced',
        icon: 'activity',
        color: 'from-blue-500 to-amber-600',
        active: true
    }
];
const defaultSystemBehaviors = [
    {
        id: 'ai-insights',
        name: 'AI Insights Generation',
        description: 'Allow AI to analyze your data and generate insights',
        enabled: true,
        isCore: true
    },
    {
        id: 'auto-sync',
        name: 'Automatic Data Synchronization',
        description: 'Sync data between modules automatically',
        enabled: true,
        isCore: true
    },
    {
        id: 'background-processing',
        name: 'Background Processing',
        description: 'Allow system to process data in the background',
        enabled: true
    },
    {
        id: 'adaptive-interface',
        name: 'Adaptive Interface',
        description: 'Automatically adjust interface based on usage patterns',
        enabled: true
    },
    {
        id: 'proactive-notifications',
        name: 'Proactive Notifications',
        description: 'Receive notifications before they become urgent',
        enabled: true
    },
    {
        id: 'cross-module-learning',
        name: 'Cross-Module Learning',
        description: 'Allow modules to learn from each other',
        enabled: true
    },
    {
        id: 'data-collection',
        name: 'Advanced Data Collection',
        description: 'Collect detailed usage data for better insights',
        enabled: true
    },
    {
        id: 'auto-optimization',
        name: 'Automatic System Optimization',
        description: 'Automatically optimize system performance',
        enabled: true
    }
];
export const useKernelStore = create()(persist((set, get) => ({
    operatingModes: defaultOperatingModes,
    activeMode: defaultOperatingModes.find(mode => mode.isDefault)?.id || defaultOperatingModes[0].id,
    moduleStates: defaultModuleStates,
    systemBehaviors: defaultSystemBehaviors,
    setActiveMode: (modeId) => {
        set({ activeMode: modeId });
    },
    toggleModule: (moduleId) => {
        set((state) => ({
            moduleStates: state.moduleStates.map(module => module.id === moduleId ? { ...module, active: !module.active } : module)
        }));
    },
    toggleBehavior: (behaviorId) => {
        set((state) => ({
            systemBehaviors: state.systemBehaviors.map(behavior => behavior.id === behaviorId ? { ...behavior, enabled: !behavior.enabled } : behavior)
        }));
    },
    addOperatingMode: (mode) => {
        const newMode = {
            ...mode,
            id: Math.random().toString(36).substr(2, 9)
        };
        set((state) => ({
            operatingModes: [...state.operatingModes, newMode]
        }));
    },
    updateOperatingMode: (id, updates) => {
        set((state) => ({
            operatingModes: state.operatingModes.map(mode => mode.id === id ? { ...mode, ...updates } : mode)
        }));
    },
    deleteOperatingMode: (id) => {
        const { activeMode, operatingModes } = get();
        const defaultMode = operatingModes.find(mode => mode.isDefault)?.id || operatingModes[0].id;
        set((state) => ({
            operatingModes: state.operatingModes.filter(mode => mode.id !== id),
            // If deleting the active mode, switch to default
            activeMode: activeMode === id ? defaultMode : activeMode
        }));
    }
}), {
    name: 'kernel-store'
}));
