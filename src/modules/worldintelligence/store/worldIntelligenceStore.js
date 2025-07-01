import { create } from 'zustand';
import { persist } from 'zustand/middleware';
const mockSignals = [
    {
        id: '1',
        title: 'Central Bank Digital Currency Adoption Accelerating',
        description: 'Major central banks announce plans to launch CBDCs within 24 months',
        source: 'Financial Times',
        url: 'https://ft.com/cbdc-adoption',
        date: '2024-02-05',
        category: 'economic',
        impact: 'high',
        relevance: 85,
        regions: ['Global', 'Europe', 'Asia'],
        tags: ['finance', 'digital-currency', 'regulation'],
        notes: 'Could significantly impact cryptocurrency markets and financial privacy',
        isVerified: true,
        createdAt: '2024-02-06'
    },
    {
        id: '2',
        title: 'Breakthrough in Quantum Computing Error Correction',
        description: 'Research team achieves 100x improvement in quantum error correction',
        source: 'Nature',
        url: 'https://nature.com/quantum-computing',
        date: '2024-01-28',
        category: 'technological',
        impact: 'medium',
        relevance: 75,
        regions: ['Global', 'North America'],
        tags: ['quantum', 'computing', 'research'],
        notes: 'May accelerate timeline for practical quantum computing applications',
        isVerified: true,
        createdAt: '2024-01-30'
    },
    {
        id: '3',
        title: 'Severe Drought Affecting Agricultural Output',
        description: 'Multiple regions reporting 30%+ reduction in crop yields',
        source: 'Reuters',
        url: 'https://reuters.com/climate-agriculture',
        date: '2024-02-08',
        category: 'environmental',
        impact: 'high',
        relevance: 80,
        regions: ['South America', 'Africa', 'Australia'],
        tags: ['climate', 'agriculture', 'food-security'],
        isVerified: false,
        createdAt: '2024-02-09'
    }
];
const mockTrends = [
    {
        id: '1',
        name: 'De-dollarization Acceleration',
        description: 'Increasing shift away from USD as reserve currency by multiple nations',
        category: 'economic',
        timeframe: 'mid-term',
        impact: 'high',
        direction: 'increasing',
        confidence: 75,
        relatedSignals: ['1'],
        regions: ['Global', 'Asia', 'Middle East'],
        tags: ['currency', 'geopolitics', 'trade'],
        notes: 'Monitor for portfolio diversification implications',
        createdAt: '2024-01-15',
        updatedAt: '2024-02-01'
    },
    {
        id: '2',
        name: 'AI Regulation Framework Development',
        description: 'Major jurisdictions developing comprehensive AI regulatory frameworks',
        category: 'technological',
        timeframe: 'short-term',
        impact: 'medium',
        direction: 'increasing',
        confidence: 85,
        relatedSignals: [],
        regions: ['North America', 'Europe', 'Asia'],
        tags: ['ai', 'regulation', 'policy'],
        notes: 'May create compliance requirements for AI projects',
        createdAt: '2024-01-20',
        updatedAt: '2024-01-20'
    }
];
const mockImplications = [
    {
        id: '1',
        title: 'Digital Asset Diversification Strategy',
        description: 'Develop strategy for diversifying digital assets across jurisdictions and asset classes',
        category: 'opportunity',
        impact: 'high',
        timeframe: 'short-term',
        relatedTrends: ['1'],
        actionItems: [
            'Research jurisdictional diversification options',
            'Evaluate non-USD stablecoins',
            'Consider physical precious metals allocation'
        ],
        status: 'analyzing',
        createdAt: '2024-02-01',
        updatedAt: '2024-02-01'
    },
    {
        id: '2',
        title: 'Food Security Contingency Planning',
        description: 'Develop food security contingencies in response to climate disruptions',
        category: 'threat',
        impact: 'medium',
        timeframe: 'mid-term',
        relatedTrends: [],
        actionItems: [
            'Increase stored food reserves',
            'Research local food production options',
            'Identify reliable local food sources'
        ],
        status: 'identified',
        createdAt: '2024-02-10',
        updatedAt: '2024-02-10'
    }
];
export const useWorldIntelligenceStore = create()(persist((set, get) => ({
    signals: mockSignals,
    trends: mockTrends,
    implications: mockImplications,
    addSignal: (signal) => {
        const newSignal = {
            ...signal,
            id: Math.random().toString(36).substr(2, 9),
            createdAt: new Date().toISOString()
        };
        set((state) => ({
            signals: [...state.signals, newSignal]
        }));
    },
    updateSignal: (id, updates) => {
        set((state) => ({
            signals: state.signals.map(signal => signal.id === id ? { ...signal, ...updates } : signal)
        }));
    },
    deleteSignal: (id) => {
        set((state) => ({
            signals: state.signals.filter(signal => signal.id !== id)
        }));
    },
    verifySignal: (id) => {
        set((state) => ({
            signals: state.signals.map(signal => signal.id === id ? { ...signal, isVerified: true } : signal)
        }));
    },
    addTrend: (trend) => {
        const newTrend = {
            ...trend,
            id: Math.random().toString(36).substr(2, 9),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        set((state) => ({
            trends: [...state.trends, newTrend]
        }));
    },
    updateTrend: (id, updates) => {
        set((state) => ({
            trends: state.trends.map(trend => trend.id === id
                ? { ...trend, ...updates, updatedAt: new Date().toISOString() }
                : trend)
        }));
    },
    deleteTrend: (id) => {
        set((state) => ({
            trends: state.trends.filter(trend => trend.id !== id)
        }));
    },
    addImplication: (implication) => {
        const newImplication = {
            ...implication,
            id: Math.random().toString(36).substr(2, 9),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        set((state) => ({
            implications: [...state.implications, newImplication]
        }));
    },
    updateImplication: (id, updates) => {
        set((state) => ({
            implications: state.implications.map(implication => implication.id === id
                ? { ...implication, ...updates, updatedAt: new Date().toISOString() }
                : implication)
        }));
    },
    deleteImplication: (id) => {
        set((state) => ({
            implications: state.implications.filter(implication => implication.id !== id)
        }));
    },
    getSignalsByCategory: (category) => {
        return get().signals.filter(signal => signal.category === category);
    },
    getTrendsByTimeframe: (timeframe) => {
        return get().trends.filter(trend => trend.timeframe === timeframe);
    },
    getImplicationsByImpact: (impact) => {
        return get().implications.filter(implication => implication.impact === impact);
    },
    getRecentSignals: (days) => {
        const today = new Date();
        const pastDate = new Date(today);
        pastDate.setDate(today.getDate() - days);
        return get().signals.filter(signal => {
            const signalDate = new Date(signal.date);
            return signalDate >= pastDate;
        });
    }
}), {
    name: 'world-intelligence-storage'
}));
