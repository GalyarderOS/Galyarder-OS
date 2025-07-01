import { create } from 'zustand';
import { persist } from 'zustand/middleware';
const mockActionLogs = [
    {
        id: '1',
        timestamp: '2024-02-10T09:30:00Z',
        module: 'FinanceHub',
        action: 'Added expense',
        details: 'Groceries - $85.50',
        context: {
            category: 'Food',
            payment: 'Credit Card',
            location: 'Whole Foods'
        },
        impact: 'low',
        tags: ['expense', 'food', 'weekly']
    },
    {
        id: '2',
        timestamp: '2024-02-10T10:15:00Z',
        module: 'HealthForge',
        action: 'Logged workout',
        details: 'Strength training - 45 minutes',
        context: {
            exercises: ['Squats', 'Bench Press', 'Deadlift'],
            intensity: 'high',
            energy: 8
        },
        impact: 'medium',
        tags: ['fitness', 'strength', 'health']
    },
    {
        id: '3',
        timestamp: '2024-02-10T14:20:00Z',
        module: 'ProductivityMatrix',
        action: 'Completed task',
        details: 'Project proposal draft',
        context: {
            project: 'Client X Redesign',
            priority: 'high',
            duration: 120
        },
        impact: 'high',
        tags: ['work', 'milestone', 'project']
    }
];
const mockSnapshots = [
    {
        id: '1',
        date: '2024-02-09',
        type: 'daily',
        title: 'Productive Friday',
        summary: 'Completed major project milestone and maintained health routines',
        keyMetrics: {
            productivity: 85,
            health: 90,
            finance: 75,
            relationships: 80
        },
        insights: [
            'Morning workout significantly improved focus throughout the day',
            'Deep work sessions were most effective between 9-11 AM'
        ],
        achievements: [
            'Completed project proposal ahead of schedule',
            'Maintained 5-day workout streak'
        ],
        challenges: [
            'Meeting interruptions reduced deep work time',
            'Evening energy levels were lower than usual'
        ],
        nextActions: [
            'Block calendar for deep work tomorrow morning',
            'Prepare for client presentation'
        ],
        mood: 8,
        energy: 7,
        satisfaction: 9
    },
    {
        id: '2',
        date: '2024-02-03',
        type: 'weekly',
        title: 'Week 5 Review',
        summary: 'Strong progress on key projects with good work-life balance',
        keyMetrics: {
            productivity: 82,
            health: 85,
            finance: 80,
            relationships: 75
        },
        insights: [
            'Batch processing emails saved approximately 5 hours this week',
            'New meal prep routine improved nutrition consistency'
        ],
        achievements: [
            'Completed two major client deliverables',
            'Reduced unnecessary meetings by 30%'
        ],
        challenges: [
            'Sleep quality declined mid-week',
            'Family time was below target'
        ],
        nextActions: [
            'Implement stricter sleep schedule',
            'Schedule family activity for next weekend'
        ],
        mood: 7,
        energy: 6,
        satisfaction: 8
    }
];
const mockInsights = [
    {
        id: '1',
        type: 'pattern',
        title: 'Productivity-Sleep Correlation',
        description: 'Your productivity scores are 35% higher on days following 7+ hours of quality sleep',
        source: {
            modules: ['ProductivityMatrix', 'HealthForge'],
            timeframe: 'Last 30 days'
        },
        confidence: 92,
        actionable: true,
        actions: [
            'Prioritize sleep hygiene',
            'Schedule high-value tasks for days after good sleep'
        ],
        createdAt: '2024-02-08',
        tags: ['productivity', 'sleep', 'optimization'],
        isStarred: true
    },
    {
        id: '2',
        type: 'correlation',
        title: 'Financial Decision Quality',
        description: 'Financial decisions made after 3 PM show 28% higher impulsivity and lower ROI',
        source: {
            modules: ['FinanceHub', 'ProductivityMatrix'],
            timeframe: 'Last 90 days'
        },
        confidence: 85,
        actionable: true,
        actions: [
            'Schedule financial decisions for morning hours',
            'Create pre-decision checklist for afternoon financial choices'
        ],
        createdAt: '2024-02-05',
        tags: ['finance', 'decision-making', 'timing'],
        isStarred: false
    }
];
export const useMetaMemoryStore = create()(persist((set, get) => ({
    actionLogs: mockActionLogs,
    snapshots: mockSnapshots,
    insights: mockInsights,
    addActionLog: (log) => {
        const newLog = {
            ...log,
            id: Math.random().toString(36).substr(2, 9),
            timestamp: new Date().toISOString()
        };
        set((state) => ({
            actionLogs: [...state.actionLogs, newLog]
        }));
    },
    deleteActionLog: (id) => {
        set((state) => ({
            actionLogs: state.actionLogs.filter(log => log.id !== id)
        }));
    },
    addSnapshot: (snapshot) => {
        const newSnapshot = {
            ...snapshot,
            id: Math.random().toString(36).substr(2, 9)
        };
        set((state) => ({
            snapshots: [...state.snapshots, newSnapshot]
        }));
    },
    updateSnapshot: (id, updates) => {
        set((state) => ({
            snapshots: state.snapshots.map(snapshot => snapshot.id === id ? { ...snapshot, ...updates } : snapshot)
        }));
    },
    deleteSnapshot: (id) => {
        set((state) => ({
            snapshots: state.snapshots.filter(snapshot => snapshot.id !== id)
        }));
    },
    addInsight: (insight) => {
        const newInsight = {
            ...insight,
            id: Math.random().toString(36).substr(2, 9),
            createdAt: new Date().toISOString()
        };
        set((state) => ({
            insights: [...state.insights, newInsight]
        }));
    },
    updateInsight: (id, updates) => {
        set((state) => ({
            insights: state.insights.map(insight => insight.id === id ? { ...insight, ...updates } : insight)
        }));
    },
    deleteInsight: (id) => {
        set((state) => ({
            insights: state.insights.filter(insight => insight.id !== id)
        }));
    },
    toggleStarInsight: (id) => {
        set((state) => ({
            insights: state.insights.map(insight => insight.id === id ? { ...insight, isStarred: !insight.isStarred } : insight)
        }));
    },
    getActionLogsByModule: (module) => {
        return get().actionLogs.filter(log => log.module === module);
    },
    getActionLogsByTimeframe: (startDate, endDate) => {
        const start = new Date(startDate).getTime();
        const end = new Date(endDate).getTime();
        return get().actionLogs.filter(log => {
            const logTime = new Date(log.timestamp).getTime();
            return logTime >= start && logTime <= end;
        });
    },
    getSnapshotsByType: (type) => {
        return get().snapshots.filter(snapshot => snapshot.type === type);
    },
    getInsightsByTags: (tags) => {
        return get().insights.filter(insight => tags.some(tag => insight.tags.includes(tag)));
    }
}), {
    name: 'meta-memory-storage'
}));
