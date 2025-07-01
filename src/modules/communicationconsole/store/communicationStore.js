import { create } from 'zustand';
import { persist } from 'zustand/middleware';
const mockContentQueue = [
    {
        id: '1',
        title: 'The Future of AI in Personal Productivity',
        type: 'article',
        platform: 'blog',
        status: 'draft',
        content: 'Artificial Intelligence is revolutionizing how we approach personal productivity...',
        excerpt: 'Exploring how AI tools are transforming personal productivity workflows',
        tags: ['AI', 'productivity', 'technology', 'future'],
        targetAudience: 'Tech professionals and productivity enthusiasts',
        wordCount: 1200,
        estimatedReadTime: 5,
        createdAt: '2024-02-01',
        updatedAt: '2024-02-05'
    },
    {
        id: '2',
        title: 'Building Better Habits with Data',
        type: 'post',
        platform: 'linkedin',
        status: 'scheduled',
        content: 'Data-driven habit formation is the key to sustainable personal growth...',
        excerpt: 'How tracking and analyzing your habits can lead to better outcomes',
        tags: ['habits', 'data', 'self-improvement'],
        targetAudience: 'Professionals interested in self-development',
        scheduledDate: '2024-02-15',
        wordCount: 500,
        estimatedReadTime: 2,
        createdAt: '2024-02-03',
        updatedAt: '2024-02-08'
    }
];
const mockVoiceDrafts = [
    {
        id: '1',
        title: 'Thought Leadership on Remote Work',
        content: 'Remote work has fundamentally changed how we think about productivity and collaboration...',
        tone: 'professional',
        purpose: 'inform',
        targetLength: 'medium',
        keywords: ['remote work', 'productivity', 'collaboration', 'future of work'],
        status: 'draft',
        versions: [
            {
                id: '1',
                content: 'Remote work has fundamentally changed how we think about productivity...',
                tone: 'professional',
                createdAt: '2024-02-01'
            }
        ],
        createdAt: '2024-02-01',
        updatedAt: '2024-02-01'
    }
];
const mockBrandMetrics = [
    {
        id: '1',
        period: '2024-01',
        totalReach: 15000,
        engagement: 1200,
        followerGrowth: 150,
        contentPerformance: {
            topPerforming: ['The Future of AI in Personal Productivity', 'Building Better Habits with Data'],
            averageEngagement: 85,
            bestPerformingType: 'article'
        },
        brandMentions: 25,
        sentimentScore: 8.2
    }
];
const mockPublicationGoals = [
    {
        id: '1',
        title: 'Publish 12 Articles This Year',
        description: 'Establish thought leadership by publishing one high-quality article per month',
        targetDate: '2024-12-31',
        targetMetric: 'publications',
        targetValue: 12,
        currentValue: 3,
        status: 'active',
        createdAt: '2024-01-01'
    },
    {
        id: '2',
        title: 'Reach 10K LinkedIn Followers',
        description: 'Grow professional network and increase content reach',
        targetDate: '2024-06-30',
        targetMetric: 'followers',
        targetValue: 10000,
        currentValue: 7500,
        status: 'active',
        createdAt: '2024-01-01'
    }
];
export const useCommunicationStore = create()(persist((set, get) => ({
    contentQueue: mockContentQueue,
    voiceDrafts: mockVoiceDrafts,
    brandMetrics: mockBrandMetrics,
    publicationGoals: mockPublicationGoals,
    addContent: (content) => {
        const newContent = {
            ...content,
            id: Math.random().toString(36).substr(2, 9),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        set((state) => ({
            contentQueue: [...state.contentQueue, newContent]
        }));
    },
    updateContent: (id, updates) => {
        set((state) => ({
            contentQueue: state.contentQueue.map(content => content.id === id
                ? { ...content, ...updates, updatedAt: new Date().toISOString() }
                : content)
        }));
    },
    deleteContent: (id) => {
        set((state) => ({
            contentQueue: state.contentQueue.filter(content => content.id !== id)
        }));
    },
    publishContent: (id) => {
        set((state) => ({
            contentQueue: state.contentQueue.map(content => content.id === id
                ? {
                    ...content,
                    status: 'published',
                    publishDate: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                }
                : content)
        }));
    },
    addVoiceDraft: (draft) => {
        const newDraft = {
            ...draft,
            id: Math.random().toString(36).substr(2, 9),
            versions: [{
                    id: '1',
                    content: draft.content,
                    tone: draft.tone,
                    createdAt: new Date().toISOString()
                }],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        set((state) => ({
            voiceDrafts: [...state.voiceDrafts, newDraft]
        }));
    },
    updateVoiceDraft: (id, updates) => {
        set((state) => ({
            voiceDrafts: state.voiceDrafts.map(draft => draft.id === id
                ? { ...draft, ...updates, updatedAt: new Date().toISOString() }
                : draft)
        }));
    },
    deleteVoiceDraft: (id) => {
        set((state) => ({
            voiceDrafts: state.voiceDrafts.filter(draft => draft.id !== id)
        }));
    },
    addVoiceVersion: (draftId, version) => {
        const newVersion = {
            ...version,
            id: Math.random().toString(36).substr(2, 9),
            createdAt: new Date().toISOString()
        };
        set((state) => ({
            voiceDrafts: state.voiceDrafts.map(draft => draft.id === draftId
                ? {
                    ...draft,
                    versions: [...draft.versions, newVersion],
                    updatedAt: new Date().toISOString()
                }
                : draft)
        }));
    },
    addPublicationGoal: (goal) => {
        const newGoal = {
            ...goal,
            id: Math.random().toString(36).substr(2, 9),
            createdAt: new Date().toISOString()
        };
        set((state) => ({
            publicationGoals: [...state.publicationGoals, newGoal]
        }));
    },
    updatePublicationGoal: (id, updates) => {
        set((state) => ({
            publicationGoals: state.publicationGoals.map(goal => goal.id === id ? { ...goal, ...updates } : goal)
        }));
    },
    deletePublicationGoal: (id) => {
        set((state) => ({
            publicationGoals: state.publicationGoals.filter(goal => goal.id !== id)
        }));
    }
}), {
    name: 'communication-console-storage'
}));
