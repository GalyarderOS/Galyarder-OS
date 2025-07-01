import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Activity, Camera, Lightbulb } from 'lucide-react';
import { ActionLog } from '../components/ActionLog';
import { MemorySnapshot } from '../components/MemorySnapshot';
import { InsightTimeline } from '../components/InsightTimeline';
import { CrudList } from '../../../components/shared/CrudList';
import { useMetaMemoryStore } from '../store/metaMemoryStore';
export function MetaMemory() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const { actionLogs, snapshots, insights, addActionLog, deleteActionLog, addSnapshot, updateSnapshot, deleteSnapshot, addInsight, updateInsight, deleteInsight, toggleStarInsight } = useMetaMemoryStore();
    const actionLogFields = [
        { name: 'module', label: 'Module', type: 'text', required: true, isListColumn: true },
        { name: 'action', label: 'Action', type: 'text', required: true, isListColumn: true },
        { name: 'details', label: 'Details', type: 'textarea', required: true },
        {
            name: 'impact',
            label: 'Impact',
            type: 'select',
            options: [
                { value: 'low', label: 'Low' },
                { value: 'medium', label: 'Medium' },
                { value: 'high', label: 'High' }
            ],
            required: true,
            isListColumn: true
        },
        { name: 'tags', label: 'Tags', type: 'tags' }
    ];
    const snapshotFields = [
        { name: 'date', label: 'Date', type: 'date', required: true, isListColumn: true },
        { name: 'title', label: 'Title', type: 'text', required: true, isListColumn: true },
        {
            name: 'type',
            label: 'Type',
            type: 'select',
            options: [
                { value: 'daily', label: 'Daily' },
                { value: 'weekly', label: 'Weekly' },
                { value: 'monthly', label: 'Monthly' },
                { value: 'milestone', label: 'Milestone' }
            ],
            required: true,
            isListColumn: true
        },
        { name: 'summary', label: 'Summary', type: 'textarea', required: true },
        { name: 'insights', label: 'Insights', type: 'tags' },
        { name: 'achievements', label: 'Achievements', type: 'tags' },
        { name: 'challenges', label: 'Challenges', type: 'tags' },
        { name: 'nextActions', label: 'Next Actions', type: 'tags' },
        { name: 'mood', label: 'Mood (1-10)', type: 'number', required: true, isListColumn: true },
        { name: 'energy', label: 'Energy (1-10)', type: 'number', required: true },
        { name: 'satisfaction', label: 'Satisfaction (1-10)', type: 'number', required: true }
    ];
    const insightFields = [
        { name: 'title', label: 'Title', type: 'text', required: true, isListColumn: true },
        {
            name: 'type',
            label: 'Type',
            type: 'select',
            options: [
                { value: 'pattern', label: 'Pattern' },
                { value: 'correlation', label: 'Correlation' }
            ],
            required: true,
            isListColumn: true
        },
        { name: 'description', label: 'Description', type: 'textarea', required: true },
        { name: 'confidence', label: 'Confidence (%)', type: 'number', required: true, isListColumn: true },
        { name: 'actionable', label: 'Actionable', type: 'checkbox', isListColumn: true },
        { name: 'actions', label: 'Actions', type: 'tags' },
        { name: 'tags', label: 'Tags', type: 'tags' },
        { name: 'isStarred', label: 'Starred', type: 'checkbox', isListColumn: true }
    ];
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "mb-8", children: [_jsx("h1", { className: "text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent", children: "Meta Memory" }), _jsx("p", { className: "text-slate-400 mt-2", children: "System memory layer for action logs, insights, and personal evolution" })] }), _jsxs("div", { className: "flex space-x-2 mb-6", children: [_jsx("button", { onClick: () => setActiveTab('dashboard'), className: `px-4 py-2 rounded-lg transition-colors ${activeTab === 'dashboard'
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`, children: "Dashboard" }), _jsx("button", { onClick: () => setActiveTab('manage'), className: `px-4 py-2 rounded-lg transition-colors ${activeTab === 'manage'
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`, children: "Manage" })] }), activeTab === 'dashboard' ? (_jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-3 gap-8", children: [_jsx("div", { className: "xl:col-span-2", children: _jsx(ActionLog, {}) }), _jsxs("div", { className: "space-y-8", children: [_jsx(MemorySnapshot, {}), _jsx(InsightTimeline, {})] })] })) : (_jsxs("div", { className: "space-y-8", children: [_jsx(CrudList, { title: "Action Logs", items: actionLogs, fields: actionLogFields, onAdd: addActionLog, onUpdate: (id, item) => {
                            deleteActionLog(id);
                            addActionLog(item);
                        }, onDelete: deleteActionLog, icon: _jsx(Activity, { className: "w-5 h-5 text-blue-400" }), color: "blue" }), _jsx(CrudList, { title: "Memory Snapshots", items: snapshots, fields: snapshotFields, onAdd: addSnapshot, onUpdate: updateSnapshot, onDelete: deleteSnapshot, icon: _jsx(Camera, { className: "w-5 h-5 text-purple-400" }), color: "purple" }), _jsx(CrudList, { title: "Insights", items: insights, fields: insightFields, onAdd: addInsight, onUpdate: (id, item) => {
                            updateInsight(id, item);
                            if (item.isStarred !== insights.find(i => i.id === id)?.isStarred) {
                                toggleStarInsight(id);
                            }
                        }, onDelete: deleteInsight, icon: _jsx(Lightbulb, { className: "w-5 h-5 text-amber-400" }), color: "amber" })] }))] }));
}
