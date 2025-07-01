import { create } from 'zustand';
import { persist } from 'zustand/middleware';
const mockFamilyMembers = [
    {
        id: '1',
        name: 'Sarah Johnson',
        relationship: 'Wife',
        birthdate: '1985-06-15',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        contact: {
            email: 'sarah@example.com',
            phone: '+1-555-123-4567'
        },
        notes: 'Loves gardening and mystery novels',
        lastContact: '2024-02-10',
        importantDates: [
            {
                id: '1',
                title: 'Birthday',
                date: '1985-06-15',
                recurring: true,
                type: 'birthday'
            },
            {
                id: '2',
                title: 'Anniversary',
                date: '2015-09-22',
                recurring: true,
                type: 'anniversary'
            }
        ],
        tags: ['immediate', 'priority']
    },
    {
        id: '2',
        name: 'Michael Johnson',
        relationship: 'Son',
        birthdate: '2010-03-10',
        contact: {},
        notes: 'Soccer practice on Tuesdays and Thursdays',
        lastContact: '2024-02-10',
        importantDates: [
            {
                id: '1',
                title: 'Birthday',
                date: '2010-03-10',
                recurring: true,
                type: 'birthday'
            }
        ],
        tags: ['immediate', 'children']
    },
    {
        id: '3',
        name: 'Robert Chen',
        relationship: 'Father',
        birthdate: '1955-11-28',
        contact: {
            phone: '+1-555-987-6543',
            address: '123 Maple St, Springfield'
        },
        notes: 'Retired last year, loves fishing and woodworking',
        lastContact: '2024-01-25',
        nextContact: '2024-02-15',
        importantDates: [
            {
                id: '1',
                title: 'Birthday',
                date: '1955-11-28',
                recurring: true,
                type: 'birthday'
            },
            {
                id: '2',
                title: 'Retirement Anniversary',
                date: '2023-01-15',
                recurring: true,
                type: 'other'
            }
        ],
        tags: ['extended', 'parents']
    }
];
const mockResponsibilities = [
    {
        id: '1',
        title: 'School Pickup',
        description: 'Pick up Michael from school',
        assignee: '1', // Sarah
        recurring: true,
        recurrencePattern: 'FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR',
        status: 'pending',
        priority: 'high',
        category: 'children',
        notes: 'School ends at 3:30 PM',
        createdAt: '2024-01-15',
        updatedAt: '2024-01-15'
    },
    {
        id: '2',
        title: 'Weekly Call with Dad',
        description: 'Sunday evening call with Dad',
        assignee: 'self',
        recurring: true,
        recurrencePattern: 'FREQ=WEEKLY;BYDAY=SU',
        status: 'pending',
        priority: 'medium',
        category: 'parents',
        notes: 'Usually around 7 PM',
        createdAt: '2024-01-20',
        updatedAt: '2024-01-20'
    }
];
const mockGratitudeEntries = [
    {
        id: '1',
        date: '2024-02-10',
        recipient: '1', // Sarah
        content: 'Grateful for preparing a wonderful dinner and supporting my late work hours this week',
        category: 'support',
        isShared: true,
        tags: ['appreciation', 'support'],
        createdAt: '2024-02-10'
    },
    {
        id: '2',
        date: '2024-02-08',
        recipient: '2', // Michael
        content: 'Proud of his excellent performance on the math test and his dedication to studying',
        category: 'achievement',
        isShared: false,
        tags: ['proud', 'education'],
        createdAt: '2024-02-08'
    }
];
const mockFamilyEvents = [
    {
        id: '1',
        title: 'Family Dinner',
        description: 'Weekly family dinner with extended family',
        date: '2024-02-15T18:00:00Z',
        location: 'Our house',
        attendees: ['1', '2', '3'],
        status: 'confirmed',
        notes: 'Sarah is preparing lasagna',
        createdAt: '2024-02-01',
        updatedAt: '2024-02-05'
    },
    {
        id: '2',
        title: 'Michael\'s Soccer Game',
        description: 'Season opener game',
        date: '2024-02-18T14:00:00Z',
        location: 'Springfield Community Park',
        attendees: ['1', '2'],
        status: 'planned',
        notes: 'Bring chairs and water bottles',
        createdAt: '2024-02-05',
        updatedAt: '2024-02-05'
    }
];
export const useFamilyMatrixStore = create()(persist((set, get) => ({
    familyMembers: mockFamilyMembers,
    responsibilities: mockResponsibilities,
    gratitudeEntries: mockGratitudeEntries,
    familyEvents: mockFamilyEvents,
    addFamilyMember: (member) => {
        const newMember = {
            ...member,
            id: Math.random().toString(36).substr(2, 9)
        };
        set((state) => ({
            familyMembers: [...state.familyMembers, newMember]
        }));
    },
    updateFamilyMember: (id, updates) => {
        set((state) => ({
            familyMembers: state.familyMembers.map(member => member.id === id ? { ...member, ...updates } : member)
        }));
    },
    deleteFamilyMember: (id) => {
        set((state) => ({
            familyMembers: state.familyMembers.filter(member => member.id !== id)
        }));
    },
    addResponsibility: (responsibility) => {
        const newResponsibility = {
            ...responsibility,
            id: Math.random().toString(36).substr(2, 9),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        set((state) => ({
            responsibilities: [...state.responsibilities, newResponsibility]
        }));
    },
    updateResponsibility: (id, updates) => {
        set((state) => ({
            responsibilities: state.responsibilities.map(responsibility => responsibility.id === id
                ? { ...responsibility, ...updates, updatedAt: new Date().toISOString() }
                : responsibility)
        }));
    },
    deleteResponsibility: (id) => {
        set((state) => ({
            responsibilities: state.responsibilities.filter(responsibility => responsibility.id !== id)
        }));
    },
    completeResponsibility: (id) => {
        set((state) => ({
            responsibilities: state.responsibilities.map(responsibility => responsibility.id === id
                ? {
                    ...responsibility,
                    status: 'completed',
                    updatedAt: new Date().toISOString()
                }
                : responsibility)
        }));
    },
    addGratitudeEntry: (entry) => {
        const newEntry = {
            ...entry,
            id: Math.random().toString(36).substr(2, 9),
            createdAt: new Date().toISOString()
        };
        set((state) => ({
            gratitudeEntries: [...state.gratitudeEntries, newEntry]
        }));
    },
    updateGratitudeEntry: (id, updates) => {
        set((state) => ({
            gratitudeEntries: state.gratitudeEntries.map(entry => entry.id === id ? { ...entry, ...updates } : entry)
        }));
    },
    deleteGratitudeEntry: (id) => {
        set((state) => ({
            gratitudeEntries: state.gratitudeEntries.filter(entry => entry.id !== id)
        }));
    },
    addFamilyEvent: (event) => {
        const newEvent = {
            ...event,
            id: Math.random().toString(36).substr(2, 9),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        set((state) => ({
            familyEvents: [...state.familyEvents, newEvent]
        }));
    },
    updateFamilyEvent: (id, updates) => {
        set((state) => ({
            familyEvents: state.familyEvents.map(event => event.id === id
                ? { ...event, ...updates, updatedAt: new Date().toISOString() }
                : event)
        }));
    },
    deleteFamilyEvent: (id) => {
        set((state) => ({
            familyEvents: state.familyEvents.filter(event => event.id !== id)
        }));
    },
    getUpcomingEvents: (days) => {
        const today = new Date();
        const futureDate = new Date(today);
        futureDate.setDate(today.getDate() + days);
        return get().familyEvents.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate >= today && eventDate <= futureDate;
        });
    },
    getUpcomingBirthdays: (days) => {
        const today = new Date();
        const futureDate = new Date(today);
        futureDate.setDate(today.getDate() + days);
        const result = [];
        for (const member of get().familyMembers) {
            if (member.birthdate) {
                const birthdate = new Date(member.birthdate);
                const birthdayThisYear = new Date(today.getFullYear(), birthdate.getMonth(), birthdate.getDate());
                // If birthday already passed this year, check for next year
                if (birthdayThisYear < today) {
                    birthdayThisYear.setFullYear(birthdayThisYear.getFullYear() + 1);
                }
                if (birthdayThisYear <= futureDate) {
                    result.push({
                        member,
                        date: birthdayThisYear.toISOString()
                    });
                }
            }
        }
        return result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    },
    getPendingResponsibilities: () => {
        return get().responsibilities.filter(r => r.status === 'pending' || r.status === 'in-progress' || r.status === 'overdue');
    }
}), {
    name: 'family-matrix-storage'
}));
