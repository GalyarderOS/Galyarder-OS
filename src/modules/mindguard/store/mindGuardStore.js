import { create } from 'zustand';
import { persist } from 'zustand/middleware';
const mockEmotions = [
    {
        id: '1',
        type: 'joy',
        intensity: 8,
        date: '2024-02-10T09:30:00Z',
        trigger: 'Completed morning workout',
        notes: 'Feeling energized and accomplished'
    },
    {
        id: '2',
        type: 'stress',
        intensity: 6,
        date: '2024-02-10T11:45:00Z',
        trigger: 'Difficult client meeting',
        notes: 'Breathing exercises helped manage the stress'
    }
];
const mockReflections = [
    {
        id: '1',
        date: '2024-02-09',
        content: 'Today was productive. I made progress on the project and had a good conversation with my team. I need to focus more on time management tomorrow.',
        mood: 8,
        tags: ['work', 'productivity', 'team']
    }
];
export const useMindGuardStore = create()(persist((set) => ({
    emotions: mockEmotions,
    reflections: mockReflections,
    addEmotion: (emotion) => {
        const newEmotion = {
            ...emotion,
            id: Math.random().toString(36).substr(2, 9)
        };
        set((state) => ({
            emotions: [...state.emotions, newEmotion]
        }));
    },
    updateEmotion: (id, updates) => {
        set((state) => ({
            emotions: state.emotions.map(emotion => emotion.id === id ? { ...emotion, ...updates } : emotion)
        }));
    },
    deleteEmotion: (id) => {
        set((state) => ({
            emotions: state.emotions.filter(emotion => emotion.id !== id)
        }));
    },
    addReflection: (reflection) => {
        const newReflection = {
            ...reflection,
            id: Math.random().toString(36).substr(2, 9)
        };
        set((state) => ({
            reflections: [...state.reflections, newReflection]
        }));
    },
    updateReflection: (id, updates) => {
        set((state) => ({
            reflections: state.reflections.map(reflection => reflection.id === id ? { ...reflection, ...updates } : reflection)
        }));
    },
    deleteReflection: (id) => {
        set((state) => ({
            reflections: state.reflections.filter(reflection => reflection.id !== id)
        }));
    }
}), {
    name: 'mind-guard-storage'
}));
