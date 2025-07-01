import { create } from 'zustand';
import { persist } from 'zustand/middleware';
const mockContacts = [
    {
        id: '1',
        name: 'Sarah Chen',
        email: 'sarah.chen@techcorp.com',
        phone: '+1-555-0123',
        company: 'TechCorp',
        position: 'Senior Product Manager',
        category: 'professional',
        relationship: 'strong',
        lastContact: '2024-02-08',
        nextFollowUp: '2024-02-22',
        notes: 'Great insights on product strategy. Interested in collaboration opportunities.',
        tags: ['product', 'strategy', 'collaboration'],
        socialLinks: {
            linkedin: 'https://linkedin.com/in/sarahchen',
            twitter: '@sarahchen'
        },
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        createdAt: '2024-01-15'
    },
    {
        id: '2',
        name: 'Marcus Johnson',
        email: 'marcus@startup.io',
        company: 'StartupIO',
        position: 'Founder & CEO',
        category: 'professional',
        relationship: 'medium',
        lastContact: '2024-01-25',
        nextFollowUp: '2024-02-15',
        notes: 'Potential mentor. Building an interesting AI platform.',
        tags: ['startup', 'ai', 'mentor'],
        socialLinks: {
            linkedin: 'https://linkedin.com/in/marcusjohnson',
            website: 'https://startup.io'
        },
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        createdAt: '2024-01-10'
    }
];
const mockInteractions = [
    {
        id: '1',
        contactId: '1',
        type: 'meeting',
        subject: 'Product Strategy Discussion',
        description: 'Discussed market trends and potential collaboration opportunities',
        date: '2024-02-08',
        duration: 60,
        outcome: 'positive',
        followUpRequired: true,
        followUpDate: '2024-02-22',
        location: 'Coffee Shop Downtown',
        createdAt: '2024-02-08'
    },
    {
        id: '2',
        contactId: '2',
        type: 'call',
        subject: 'Startup Advice Call',
        description: 'Shared insights about scaling engineering teams',
        date: '2024-01-25',
        duration: 45,
        outcome: 'positive',
        followUpRequired: true,
        followUpDate: '2024-02-15',
        createdAt: '2024-01-25'
    }
];
const mockFollowUps = [
    {
        id: '1',
        contactId: '1',
        title: 'Send product roadmap document',
        description: 'Share our Q2 product roadmap as discussed',
        dueDate: '2024-02-22',
        priority: 'high',
        status: 'pending',
        type: 'email',
        createdAt: '2024-02-08'
    },
    {
        id: '2',
        contactId: '2',
        title: 'Introduction to design lead',
        description: 'Connect Marcus with our design team lead',
        dueDate: '2024-02-15',
        priority: 'medium',
        status: 'pending',
        type: 'email',
        createdAt: '2024-01-25'
    }
];
const mockNetworkGoals = [
    {
        id: '1',
        title: 'Expand Professional Network',
        description: 'Connect with 20 new professionals in the tech industry',
        targetDate: '2024-06-30',
        category: 'expand',
        targetNumber: 20,
        currentProgress: 8,
        status: 'active',
        createdAt: '2024-01-01'
    },
    {
        id: '2',
        title: 'Strengthen Key Relationships',
        description: 'Have monthly check-ins with top 10 professional contacts',
        targetDate: '2024-12-31',
        category: 'strengthen',
        targetNumber: 10,
        currentProgress: 6,
        status: 'active',
        createdAt: '2024-01-01'
    }
];
export const useNetworkStore = create()(persist((set, get) => ({
    contacts: mockContacts,
    interactions: mockInteractions,
    followUps: mockFollowUps,
    networkGoals: mockNetworkGoals,
    addContact: (contact) => {
        const newContact = {
            ...contact,
            id: Math.random().toString(36).substr(2, 9),
            createdAt: new Date().toISOString()
        };
        set((state) => ({
            contacts: [...state.contacts, newContact]
        }));
    },
    updateContact: (id, updates) => {
        set((state) => ({
            contacts: state.contacts.map(contact => contact.id === id ? { ...contact, ...updates } : contact)
        }));
    },
    deleteContact: (id) => {
        set((state) => ({
            contacts: state.contacts.filter(contact => contact.id !== id),
            interactions: state.interactions.filter(interaction => interaction.contactId !== id),
            followUps: state.followUps.filter(followUp => followUp.contactId !== id)
        }));
    },
    addInteraction: (interaction) => {
        const newInteraction = {
            ...interaction,
            id: Math.random().toString(36).substr(2, 9),
            createdAt: new Date().toISOString()
        };
        set((state) => ({
            interactions: [...state.interactions, newInteraction]
        }));
        // Update last contact date for the contact
        get().updateContact(interaction.contactId, {
            lastContact: interaction.date
        });
    },
    updateInteraction: (id, updates) => {
        set((state) => ({
            interactions: state.interactions.map(interaction => interaction.id === id ? { ...interaction, ...updates } : interaction)
        }));
    },
    deleteInteraction: (id) => {
        set((state) => ({
            interactions: state.interactions.filter(interaction => interaction.id !== id)
        }));
    },
    addFollowUp: (followUp) => {
        const newFollowUp = {
            ...followUp,
            id: Math.random().toString(36).substr(2, 9),
            createdAt: new Date().toISOString()
        };
        set((state) => ({
            followUps: [...state.followUps, newFollowUp]
        }));
    },
    updateFollowUp: (id, updates) => {
        set((state) => ({
            followUps: state.followUps.map(followUp => followUp.id === id ? { ...followUp, ...updates } : followUp)
        }));
    },
    deleteFollowUp: (id) => {
        set((state) => ({
            followUps: state.followUps.filter(followUp => followUp.id !== id)
        }));
    },
    completeFollowUp: (id) => {
        set((state) => ({
            followUps: state.followUps.map(followUp => followUp.id === id
                ? { ...followUp, status: 'completed', completedAt: new Date().toISOString() }
                : followUp)
        }));
    },
    addNetworkGoal: (goal) => {
        const newGoal = {
            ...goal,
            id: Math.random().toString(36).substr(2, 9),
            createdAt: new Date().toISOString()
        };
        set((state) => ({
            networkGoals: [...state.networkGoals, newGoal]
        }));
    },
    updateNetworkGoal: (id, updates) => {
        set((state) => ({
            networkGoals: state.networkGoals.map(goal => goal.id === id ? { ...goal, ...updates } : goal)
        }));
    },
    deleteNetworkGoal: (id) => {
        set((state) => ({
            networkGoals: state.networkGoals.filter(goal => goal.id !== id)
        }));
    }
}), {
    name: 'network-nexus-storage'
}));
