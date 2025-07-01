import { create } from 'zustand';
import { persist } from 'zustand/middleware';
const mockPrayers = [
    {
        id: '1',
        name: 'Fajr',
        arabicName: 'الفجر',
        time: '05:30',
        isCompleted: true,
        completedAt: '2024-02-10T05:35:00Z',
        location: 'Home',
        notes: 'Peaceful morning prayer'
    },
    {
        id: '2',
        name: 'Dhuhr',
        arabicName: 'الظهر',
        time: '12:45',
        isCompleted: true,
        completedAt: '2024-02-10T12:50:00Z',
        location: 'Office'
    },
    {
        id: '3',
        name: 'Asr',
        arabicName: 'العصر',
        time: '15:30',
        isCompleted: false
    },
    {
        id: '4',
        name: 'Maghrib',
        arabicName: 'المغرب',
        time: '18:15',
        isCompleted: false
    },
    {
        id: '5',
        name: 'Isha',
        arabicName: 'العشاء',
        time: '19:45',
        isCompleted: false
    }
];
const mockActivities = [
    {
        id: '1',
        type: 'dhikr',
        title: 'Morning Dhikr',
        description: 'Subhan Allah, Alhamdulillah, Allahu Akbar',
        duration: 15,
        completedAt: '2024-02-10T06:00:00Z',
        count: 100,
        notes: 'Felt peaceful and centered'
    },
    {
        id: '2',
        type: 'quran',
        title: 'Quran Recitation',
        description: 'Surah Al-Baqarah verses 1-20',
        duration: 30,
        completedAt: '2024-02-10T07:30:00Z',
        verses: ['2:1-20']
    },
    {
        id: '3',
        type: 'reflection',
        title: 'Evening Reflection',
        description: 'Reflecting on the day and seeking forgiveness',
        duration: 10,
        completedAt: '2024-02-09T21:00:00Z',
        notes: 'Grateful for the blessings of today'
    }
];
const mockTafsirEntries = [
    {
        id: '1',
        surah: 2,
        ayah: 255,
        arabicText: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ',
        translation: 'Allah - there is no deity except Him, the Ever-Living, the Sustainer of existence.',
        tafsir: 'This is Ayat al-Kursi, one of the most powerful verses in the Quran. It speaks of Allah\'s absolute sovereignty and eternal nature.',
        reflection: 'This verse reminds me of Allah\'s complete authority over all creation and brings peace to my heart.',
        tags: ['tawhid', 'power', 'peace'],
        bookmarked: true,
        createdAt: '2024-02-08'
    },
    {
        id: '2',
        surah: 94,
        ayah: 5,
        arabicText: 'فَإِنَّ مَعَ الْعُسْرِ يُسْرًا',
        translation: 'For indeed, with hardship [will be] ease.',
        tafsir: 'This verse provides comfort during difficult times, reminding us that Allah always provides relief after hardship.',
        reflection: 'During challenging moments, this verse gives me hope and patience.',
        tags: ['hope', 'patience', 'comfort'],
        bookmarked: true,
        createdAt: '2024-02-07'
    }
];
const mockSpiritualGoals = [
    {
        id: '1',
        title: 'Complete Quran Reading',
        description: 'Read the entire Quran with reflection',
        type: 'yearly',
        target: 114,
        current: 25,
        unit: 'surahs',
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        isActive: true
    },
    {
        id: '2',
        title: 'Daily Dhikr',
        description: 'Maintain consistent daily dhikr practice',
        type: 'daily',
        target: 100,
        current: 85,
        unit: 'repetitions',
        startDate: '2024-02-01',
        endDate: '2024-02-29',
        isActive: true
    }
];
export const useSpiritualStore = create()(persist((set, get) => ({
    prayers: mockPrayers,
    activities: mockActivities,
    tafsirEntries: mockTafsirEntries,
    spiritualGoals: mockSpiritualGoals,
    updatePrayer: (id, updates) => {
        set((state) => ({
            prayers: state.prayers.map(prayer => prayer.id === id ? { ...prayer, ...updates } : prayer)
        }));
    },
    completePrayer: (id, location, notes) => {
        set((state) => ({
            prayers: state.prayers.map(prayer => prayer.id === id
                ? {
                    ...prayer,
                    isCompleted: true,
                    completedAt: new Date().toISOString(),
                    location,
                    notes
                }
                : prayer)
        }));
    },
    addActivity: (activity) => {
        const newActivity = {
            ...activity,
            id: Math.random().toString(36).substr(2, 9),
            completedAt: new Date().toISOString()
        };
        set((state) => ({
            activities: [...state.activities, newActivity]
        }));
    },
    updateActivity: (id, updates) => {
        set((state) => ({
            activities: state.activities.map(activity => activity.id === id ? { ...activity, ...updates } : activity)
        }));
    },
    deleteActivity: (id) => {
        set((state) => ({
            activities: state.activities.filter(activity => activity.id !== id)
        }));
    },
    addTafsirEntry: (entry) => {
        const newEntry = {
            ...entry,
            id: Math.random().toString(36).substr(2, 9),
            createdAt: new Date().toISOString()
        };
        set((state) => ({
            tafsirEntries: [...state.tafsirEntries, newEntry]
        }));
    },
    updateTafsirEntry: (id, updates) => {
        set((state) => ({
            tafsirEntries: state.tafsirEntries.map(entry => entry.id === id ? { ...entry, ...updates } : entry)
        }));
    },
    deleteTafsirEntry: (id) => {
        set((state) => ({
            tafsirEntries: state.tafsirEntries.filter(entry => entry.id !== id)
        }));
    },
    toggleBookmark: (id) => {
        set((state) => ({
            tafsirEntries: state.tafsirEntries.map(entry => entry.id === id ? { ...entry, bookmarked: !entry.bookmarked } : entry)
        }));
    },
    addSpiritualGoal: (goal) => {
        const newGoal = {
            ...goal,
            id: Math.random().toString(36).substr(2, 9)
        };
        set((state) => ({
            spiritualGoals: [...state.spiritualGoals, newGoal]
        }));
    },
    updateSpiritualGoal: (id, updates) => {
        set((state) => ({
            spiritualGoals: state.spiritualGoals.map(goal => goal.id === id ? { ...goal, ...updates } : goal)
        }));
    },
    deleteSpiritualGoal: (id) => {
        set((state) => ({
            spiritualGoals: state.spiritualGoals.filter(goal => goal.id !== id)
        }));
    }
}), {
    name: 'spiritual-forge-storage'
}));
