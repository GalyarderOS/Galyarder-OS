import { create } from 'zustand';
import { persist } from 'zustand/middleware';
const mockTasks = [
    {
        id: '1',
        title: 'Complete project proposal',
        description: 'Finish the draft and send for review',
        status: 'in-progress',
        priority: 'high',
        dueDate: '2024-02-15',
        tags: ['work', 'project'],
        estimatedTime: 120
    },
    {
        id: '2',
        title: 'Weekly review',
        description: 'Review goals and plan next week',
        status: 'todo',
        priority: 'medium',
        dueDate: '2024-02-12',
        tags: ['planning', 'review'],
        estimatedTime: 60
    }
];
const mockFocusSessions = [
    {
        id: '1',
        date: '2024-02-10',
        duration: 90,
        task: '1',
        productivity: 85,
        notes: 'Good focus, minimal distractions'
    },
    {
        id: '2',
        date: '2024-02-09',
        duration: 60,
        task: '2',
        productivity: 75,
        notes: 'Some interruptions'
    }
];
export const useProductivityStore = create()(persist((set) => ({
    tasks: mockTasks,
    focusSessions: mockFocusSessions,
    addTask: (task) => {
        const newTask = {
            ...task,
            id: Math.random().toString(36).substr(2, 9)
        };
        set((state) => ({
            tasks: [...state.tasks, newTask]
        }));
    },
    updateTask: (id, updates) => {
        set((state) => ({
            tasks: state.tasks.map(task => task.id === id ? { ...task, ...updates } : task)
        }));
    },
    deleteTask: (id) => {
        set((state) => ({
            tasks: state.tasks.filter(task => task.id !== id)
        }));
    },
    addFocusSession: (session) => {
        const newSession = {
            ...session,
            id: Math.random().toString(36).substr(2, 9)
        };
        set((state) => ({
            focusSessions: [...state.focusSessions, newSession]
        }));
    },
    updateFocusSession: (id, updates) => {
        set((state) => ({
            focusSessions: state.focusSessions.map(session => session.id === id ? { ...session, ...updates } : session)
        }));
    },
    deleteFocusSession: (id) => {
        set((state) => ({
            focusSessions: state.focusSessions.filter(session => session.id !== id)
        }));
    }
}), {
    name: 'productivity-matrix-storage'
}));
