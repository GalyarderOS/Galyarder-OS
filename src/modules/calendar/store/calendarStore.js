import { create } from 'zustand';
import { persist } from 'zustand/middleware';
const mockEvents = [
    {
        id: '1',
        title: 'Team Standup',
        description: 'Daily team synchronization meeting',
        startDate: '2024-02-12',
        endDate: '2024-02-12',
        startTime: '09:00',
        endTime: '09:30',
        location: 'Conference Room A',
        category: 'work',
        color: '#3B82F6',
        reminder: {
            enabled: true,
            minutes: 15
        },
        recurring: {
            type: 'daily',
            interval: 1,
            endDate: '2024-12-31'
        },
        attendees: ['john@company.com', 'sarah@company.com'],
        createdAt: '2024-02-01T10:00:00Z',
        updatedAt: '2024-02-01T10:00:00Z'
    },
    {
        id: '2',
        title: 'Gym Workout',
        description: 'Upper body strength training',
        startDate: '2024-02-12',
        endDate: '2024-02-12',
        startTime: '18:00',
        endTime: '19:30',
        location: 'Fitness Center',
        category: 'health',
        color: '#10B981',
        reminder: {
            enabled: true,
            minutes: 30
        },
        recurring: {
            type: 'weekly',
            interval: 1
        },
        createdAt: '2024-02-01T10:00:00Z',
        updatedAt: '2024-02-01T10:00:00Z'
    },
    {
        id: '3',
        title: 'Coffee with Sarah',
        description: 'Catch up and discuss project ideas',
        startDate: '2024-02-14',
        endDate: '2024-02-14',
        startTime: '15:00',
        endTime: '16:00',
        location: 'Downtown Coffee Shop',
        category: 'social',
        color: '#F59E0B',
        reminder: {
            enabled: true,
            minutes: 60
        },
        createdAt: '2024-02-01T10:00:00Z',
        updatedAt: '2024-02-01T10:00:00Z'
    }
];
export const useCalendarStore = create()(persist((set, get) => ({
    events: mockEvents,
    currentView: {
        type: 'month',
        date: new Date()
    },
    selectedDate: new Date(),
    addEvent: (event) => {
        const newEvent = {
            ...event,
            id: Math.random().toString(36).substr(2, 9),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        set((state) => ({
            events: [...state.events, newEvent]
        }));
    },
    updateEvent: (id, updates) => {
        set((state) => ({
            events: state.events.map(event => event.id === id
                ? { ...event, ...updates, updatedAt: new Date().toISOString() }
                : event)
        }));
    },
    deleteEvent: (id) => {
        set((state) => ({
            events: state.events.filter(event => event.id !== id)
        }));
    },
    setView: (view) => {
        set({ currentView: view });
    },
    setSelectedDate: (date) => {
        set({ selectedDate: date });
    },
    getEventsForDate: (date) => {
        const dateStr = date.toISOString().split('T')[0];
        return get().events.filter(event => event.startDate <= dateStr && event.endDate >= dateStr);
    },
    getEventsForWeek: (date) => {
        const startOfWeek = new Date(date);
        startOfWeek.setDate(date.getDate() - date.getDay());
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        const startStr = startOfWeek.toISOString().split('T')[0];
        const endStr = endOfWeek.toISOString().split('T')[0];
        return get().events.filter(event => event.startDate <= endStr && event.endDate >= startStr);
    },
    getEventsForMonth: (date) => {
        const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const startStr = startOfMonth.toISOString().split('T')[0];
        const endStr = endOfMonth.toISOString().split('T')[0];
        return get().events.filter(event => event.startDate <= endStr && event.endDate >= startStr);
    }
}), {
    name: 'calendar-storage'
}));
