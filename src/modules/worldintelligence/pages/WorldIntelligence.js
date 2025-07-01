import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Globe, TrendingUp, Search } from 'lucide-react';
import { WorldMapSignals } from '../components/WorldMapSignals';
import { MacroPulse } from '../components/MacroPulse';
import { SignalScanner } from '../components/SignalScanner';
import { CrudList } from '../../../components/shared/CrudList';
import { useWorldIntelligenceStore } from '../store/worldIntelligenceStore';
export function WorldIntelligence() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const { signals, trends, implications, addSignal, updateSignal, deleteSignal, addTrend, updateTrend, deleteTrend, addImplication, updateImplication, deleteImplication } = useWorldIntelligenceStore();
    const signalFields = [
        { name: 'title', label: 'Title', type: 'text', required: true, isListColumn: true },
        { name: 'description', label: 'Description', type: 'textarea', required: true },
        { name: 'source', label: 'Source', type: 'text', required: true, isListColumn: true },
        { name: 'url', label: 'URL', type: 'text' },
        { name: 'date', label: 'Date', type: 'date', required: true, isListColumn: true },
        {
            name: 'category',
            label: 'Category',
            type: 'select',
            options: [
                { value: 'economic', label: 'Economic' },
                { value: 'geopolitical', label: 'Geopolitical' },
                { value: 'technological', label: 'Technological' },
                { value: 'environmental', label: 'Environmental' },
                { value: 'social', label: 'Social' },
                { value: 'other', label: 'Other' }
            ],
            required: true,
            isListColumn: true
        },
        {
            name: 'impact',
            label: 'Impact',
            type: 'select',
            options: [
                { value: 'low', label: 'Low' },
                { value: 'medium', label: 'Medium' },
                { value: 'high', label: 'High' },
                { value: 'critical', label: 'Critical' }
            ],
            required: true,
            isListColumn: true
        },
        { name: 'relevance', label: 'Relevance (1-100)', type: 'number', required: true },
        { name: 'regions', label: 'Regions', type: 'tags' },
        { name: 'tags', label: 'Tags', type: 'tags' },
        { name: 'notes', label: 'Notes', type: 'textarea' },
        { name: 'isVerified', label: 'Verified', type: 'checkbox', isListColumn: true }
    ];
    const trendFields = [
        { name: 'name', label: 'Trend Name', type: 'text', required: true, isListColumn: true },
        { name: 'description', label: 'Description', type: 'textarea', required: true },
        {
            name: 'category',
            label: 'Category',
            type: 'select',
            options: [
                { value: 'economic', label: 'Economic' },
                { value: 'geopolitical', label: 'Geopolitical' },
                { value: 'technological', label: 'Technological' },
                { value: 'environmental', label: 'Environmental' },
                { value: 'social', label: 'Social' },
                { value: 'other', label: 'Other' }
            ],
            required: true,
            isListColumn: true
        },
        {
            name: 'timeframe',
            label: 'Timeframe',
            type: 'select',
            options: [
                { value: 'short-term', label: 'Short-term' },
                { value: 'mid-term', label: 'Mid-term' },
                { value: 'long-term', label: 'Long-term' }
            ],
            required: true,
            isListColumn: true
        },
        {
            name: 'impact',
            label: 'Impact',
            type: 'select',
            options: [
                { value: 'low', label: 'Low' },
                { value: 'medium', label: 'Medium' },
                { value: 'high', label: 'High' },
                { value: 'critical', label: 'Critical' }
            ],
            required: true,
            isListColumn: true
        },
        {
            name: 'direction',
            label: 'Direction',
            type: 'select',
            options: [
                { value: 'increasing', label: 'Increasing' },
                { value: 'decreasing', label: 'Decreasing' },
                { value: 'stable', label: 'Stable' },
                { value: 'volatile', label: 'Volatile' }
            ],
            required: true,
            isListColumn: true
        },
        { name: 'confidence', label: 'Confidence (1-100)', type: 'number', required: true },
        { name: 'relatedSignals', label: 'Related Signals', type: 'tags' },
        { name: 'regions', label: 'Regions', type: 'tags' },
        { name: 'tags', label: 'Tags', type: 'tags' },
        { name: 'notes', label: 'Notes', type: 'textarea' }
    ];
    const implicationFields = [
        { name: 'title', label: 'Title', type: 'text', required: true, isListColumn: true },
        { name: 'description', label: 'Description', type: 'textarea', required: true },
        {
            name: 'category',
            label: 'Category',
            type: 'select',
            options: [
                { value: 'opportunity', label: 'Opportunity' },
                { value: 'threat', label: 'Threat' },
                { value: 'neutral', label: 'Neutral' }
            ],
            required: true,
            isListColumn: true
        },
        {
            name: 'impact',
            label: 'Impact',
            type: 'select',
            options: [
                { value: 'low', label: 'Low' },
                { value: 'medium', label: 'Medium' },
                { value: 'high', label: 'High' },
                { value: 'critical', label: 'Critical' }
            ],
            required: true,
            isListColumn: true
        },
        {
            name: 'timeframe',
            label: 'Timeframe',
            type: 'select',
            options: [
                { value: 'immediate', label: 'Immediate' },
                { value: 'short-term', label: 'Short-term' },
                { value: 'mid-term', label: 'Mid-term' },
                { value: 'long-term', label: 'Long-term' }
            ],
            required: true,
            isListColumn: true
        },
        { name: 'relatedTrends', label: 'Related Trends', type: 'tags' },
        { name: 'actionItems', label: 'Action Items', type: 'tags' },
        {
            name: 'status',
            label: 'Status',
            type: 'select',
            options: [
                { value: 'identified', label: 'Identified' },
                { value: 'analyzing', label: 'Analyzing' },
                { value: 'actioning', label: 'Actioning' },
                { value: 'monitoring', label: 'Monitoring' }
            ],
            required: true,
            isListColumn: true
        }
    ];
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "mb-8", children: [_jsx("h1", { className: "text-3xl font-bold bg-gradient-to-r from-blue-400 to-amber-400 bg-clip-text text-transparent", children: "World Intelligence" }), _jsx("p", { className: "text-slate-400 mt-2", children: "Global macro and trend scanner for strategic awareness" })] }), _jsxs("div", { className: "flex space-x-2 mb-6", children: [_jsx("button", { onClick: () => setActiveTab('dashboard'), className: `px-4 py-2 rounded-lg transition-colors ${activeTab === 'dashboard'
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`, children: "Dashboard" }), _jsx("button", { onClick: () => setActiveTab('manage'), className: `px-4 py-2 rounded-lg transition-colors ${activeTab === 'manage'
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`, children: "Manage" })] }), activeTab === 'dashboard' ? (_jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-3 gap-8", children: [_jsx("div", { className: "xl:col-span-2", children: _jsx(WorldMapSignals, {}) }), _jsxs("div", { className: "space-y-8", children: [_jsx(MacroPulse, {}), _jsx(SignalScanner, {})] })] })) : (_jsxs("div", { className: "space-y-8", children: [_jsx(CrudList, { title: "World Signals", items: signals, fields: signalFields, onAdd: addSignal, onUpdate: updateSignal, onDelete: deleteSignal, icon: _jsx(Globe, { className: "w-5 h-5 text-blue-400" }), color: "blue" }), _jsx(CrudList, { title: "Macro Trends", items: trends, fields: trendFields, onAdd: addTrend, onUpdate: updateTrend, onDelete: deleteTrend, icon: _jsx(TrendingUp, { className: "w-5 h-5 text-purple-400" }), color: "purple" }), _jsx(CrudList, { title: "Strategic Implications", items: implications, fields: implicationFields, onAdd: addImplication, onUpdate: updateImplication, onDelete: deleteImplication, icon: _jsx(Search, { className: "w-5 h-5 text-amber-400" }), color: "amber" })] }))] }));
}
