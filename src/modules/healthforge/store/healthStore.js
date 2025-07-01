import { create } from 'zustand';
import { persist } from 'zustand/middleware';
const mockMetrics = [
    {
        id: '1',
        date: '2024-02-10',
        weight: 75.5,
        bodyFat: 18.2,
        heartRate: 65,
        bloodPressure: {
            systolic: 120,
            diastolic: 80
        },
        steps: 8500,
        sleepHours: 7.5,
        notes: 'Feeling good today'
    },
    {
        id: '2',
        date: '2024-02-09',
        weight: 75.7,
        bodyFat: 18.3,
        heartRate: 68,
        bloodPressure: {
            systolic: 122,
            diastolic: 82
        },
        steps: 7200,
        sleepHours: 7,
        notes: 'Slightly tired'
    }
];
const mockWorkouts = [
    {
        id: '1',
        date: '2024-02-10',
        type: 'Strength',
        duration: 45,
        calories: 320,
        exercises: [
            { name: 'Squats', sets: 3, reps: 10, weight: 70 },
            { name: 'Bench Press', sets: 3, reps: 8, weight: 60 },
            { name: 'Deadlift', sets: 3, reps: 5, weight: 100 }
        ],
        notes: 'Good session, increased weight on squats'
    }
];
export const useHealthStore = create()(persist((set) => ({
    metrics: mockMetrics,
    workouts: mockWorkouts,
    addMetric: (metric) => {
        const newMetric = {
            ...metric,
            id: Math.random().toString(36).substr(2, 9)
        };
        set((state) => ({
            metrics: [...state.metrics, newMetric]
        }));
    },
    updateMetric: (id, updates) => {
        set((state) => ({
            metrics: state.metrics.map(metric => metric.id === id ? { ...metric, ...updates } : metric)
        }));
    },
    deleteMetric: (id) => {
        set((state) => ({
            metrics: state.metrics.filter(metric => metric.id !== id)
        }));
    },
    addWorkout: (workout) => {
        const newWorkout = {
            ...workout,
            id: Math.random().toString(36).substr(2, 9)
        };
        set((state) => ({
            workouts: [...state.workouts, newWorkout]
        }));
    },
    updateWorkout: (id, updates) => {
        set((state) => ({
            workouts: state.workouts.map(workout => workout.id === id ? { ...workout, ...updates } : workout)
        }));
    },
    deleteWorkout: (id) => {
        set((state) => ({
            workouts: state.workouts.filter(workout => workout.id !== id)
        }));
    }
}), {
    name: 'health-forge-storage'
}));
