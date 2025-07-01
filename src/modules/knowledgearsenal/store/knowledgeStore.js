import { create } from 'zustand';
import { persist } from 'zustand/middleware';
const mockLearningGoals = [
    {
        id: '1',
        title: 'Master React Advanced Patterns',
        description: 'Learn advanced React patterns including render props, HOCs, and compound components',
        category: 'technical',
        targetDate: '2024-06-01',
        progress: 65,
        status: 'active',
        priority: 'high',
        createdAt: '2024-01-15'
    },
    {
        id: '2',
        title: 'Learn Spanish Conversational Level',
        description: 'Achieve B2 level Spanish proficiency for travel and business',
        category: 'personal',
        targetDate: '2024-12-31',
        progress: 30,
        status: 'active',
        priority: 'medium',
        createdAt: '2024-01-20'
    }
];
const mockBooks = [
    {
        id: '1',
        title: 'Clean Code',
        author: 'Robert C. Martin',
        category: 'Programming',
        status: 'reading',
        progress: 45,
        rating: 5,
        notes: 'Excellent insights on writing maintainable code',
        startDate: '2024-01-10',
        totalPages: 464,
        currentPage: 209
    },
    {
        id: '2',
        title: 'Atomic Habits',
        author: 'James Clear',
        category: 'Self-Development',
        status: 'completed',
        progress: 100,
        rating: 5,
        notes: 'Life-changing approach to habit formation',
        startDate: '2023-12-01',
        completedDate: '2024-01-05',
        totalPages: 320,
        currentPage: 320
    }
];
const mockSkills = [
    {
        id: '1',
        name: 'TypeScript',
        category: 'Programming',
        level: 7,
        targetLevel: 9,
        lastPracticed: '2024-02-10',
        totalHours: 120,
        resources: ['TypeScript Handbook', 'Advanced TypeScript Course'],
        milestones: [
            {
                id: '1',
                title: 'Basic Types Mastery',
                description: 'Understand all basic TypeScript types',
                completed: true,
                completedDate: '2023-11-15'
            },
            {
                id: '2',
                title: 'Advanced Generics',
                description: 'Master complex generic patterns',
                completed: false
            }
        ]
    },
    {
        id: '2',
        name: 'Public Speaking',
        category: 'Communication',
        level: 4,
        targetLevel: 8,
        lastPracticed: '2024-02-05',
        totalHours: 25,
        resources: ['Toastmasters', 'TED Talk Masterclass'],
        milestones: [
            {
                id: '1',
                title: 'First Public Speech',
                description: 'Deliver first 5-minute speech',
                completed: true,
                completedDate: '2024-01-20'
            }
        ]
    }
];
const mockStudySessions = [
    {
        id: '1',
        subject: 'React Advanced Patterns',
        duration: 90,
        date: '2024-02-10',
        notes: 'Studied render props pattern and implemented examples',
        effectiveness: 8,
        type: 'practice'
    },
    {
        id: '2',
        subject: 'Spanish Grammar',
        duration: 45,
        date: '2024-02-09',
        notes: 'Practiced subjunctive mood conjugations',
        effectiveness: 7,
        type: 'course'
    }
];
export const useKnowledgeStore = create()(persist((set, get) => ({
    learningGoals: mockLearningGoals,
    books: mockBooks,
    skills: mockSkills,
    studySessions: mockStudySessions,
    addLearningGoal: (goal) => {
        const newGoal = {
            ...goal,
            id: Math.random().toString(36).substr(2, 9),
            createdAt: new Date().toISOString()
        };
        set((state) => ({
            learningGoals: [...state.learningGoals, newGoal]
        }));
    },
    updateLearningGoal: (id, updates) => {
        set((state) => ({
            learningGoals: state.learningGoals.map(goal => goal.id === id ? { ...goal, ...updates } : goal)
        }));
    },
    deleteLearningGoal: (id) => {
        set((state) => ({
            learningGoals: state.learningGoals.filter(goal => goal.id !== id)
        }));
    },
    addBook: (book) => {
        const newBook = {
            ...book,
            id: Math.random().toString(36).substr(2, 9)
        };
        set((state) => ({
            books: [...state.books, newBook]
        }));
    },
    updateBook: (id, updates) => {
        set((state) => ({
            books: state.books.map(book => book.id === id ? { ...book, ...updates } : book)
        }));
    },
    deleteBook: (id) => {
        set((state) => ({
            books: state.books.filter(book => book.id !== id)
        }));
    },
    addSkill: (skill) => {
        const newSkill = {
            ...skill,
            id: Math.random().toString(36).substr(2, 9)
        };
        set((state) => ({
            skills: [...state.skills, newSkill]
        }));
    },
    updateSkill: (id, updates) => {
        set((state) => ({
            skills: state.skills.map(skill => skill.id === id ? { ...skill, ...updates } : skill)
        }));
    },
    deleteSkill: (id) => {
        set((state) => ({
            skills: state.skills.filter(skill => skill.id !== id)
        }));
    },
    addStudySession: (session) => {
        const newSession = {
            ...session,
            id: Math.random().toString(36).substr(2, 9)
        };
        set((state) => ({
            studySessions: [...state.studySessions, newSession]
        }));
    },
    updateStudySession: (id, updates) => {
        set((state) => ({
            studySessions: state.studySessions.map(session => session.id === id ? { ...session, ...updates } : session)
        }));
    },
    deleteStudySession: (id) => {
        set((state) => ({
            studySessions: state.studySessions.filter(session => session.id !== id)
        }));
    }
}), {
    name: 'knowledge-arsenal-storage'
}));
