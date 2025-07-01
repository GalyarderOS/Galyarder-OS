import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Clock, Heart, Book } from 'lucide-react';
import { PrayerSchedule } from '../components/PrayerSchedule';
import { SpiritualLog } from '../components/SpiritualLog';
import { TafsirReader } from '../components/TafsirReader';
import { CrudList } from '../../../components/shared/CrudList';
import { useSpiritualStore } from '../store/spiritualStore';
export function SpiritualForge() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const { prayers, activities, tafsirEntries, spiritualGoals, updatePrayer, completePrayer, addActivity, updateActivity, deleteActivity, addTafsirEntry, updateTafsirEntry, deleteTafsirEntry, addSpiritualGoal, updateSpiritualGoal, deleteSpiritualGoal } = useSpiritualStore();
    const prayerFields = [
        { name: 'name', label: 'Prayer Name', type: 'text', required: true, isListColumn: true },
        { name: 'arabicName', label: 'Arabic Name', type: 'text', isListColumn: true },
        { name: 'time', label: 'Time', type: 'text', required: true, isListColumn: true },
        { name: 'isCompleted', label: 'Completed', type: 'checkbox', isListColumn: true },
        { name: 'location', label: 'Location', type: 'text' },
        { name: 'notes', label: 'Notes', type: 'textarea' }
    ];
    const activityFields = [
        { name: 'title', label: 'Title', type: 'text', required: true, isListColumn: true },
        {
            name: 'type',
            label: 'Type',
            type: 'select',
            options: [
                { value: 'dhikr', label: 'Dhikr' },
                { value: 'quran', label: 'Quran' },
                { value: 'dua', label: 'Dua' },
                { value: 'reflection', label: 'Reflection' },
                { value: 'charity', label: 'Charity' },
                { value: 'other', label: 'Other' }
            ],
            required: true,
            isListColumn: true
        },
        { name: 'description', label: 'Description', type: 'textarea', required: true },
        { name: 'duration', label: 'Duration (min)', type: 'number', required: true, isListColumn: true },
        { name: 'notes', label: 'Notes', type: 'textarea' },
        { name: 'verses', label: 'Verses', type: 'tags' },
        { name: 'count', label: 'Count', type: 'number' }
    ];
    const tafsirFields = [
        { name: 'surah', label: 'Surah', type: 'number', required: true, isListColumn: true },
        { name: 'ayah', label: 'Ayah', type: 'number', required: true, isListColumn: true },
        { name: 'arabicText', label: 'Arabic Text', type: 'textarea', required: true },
        { name: 'translation', label: 'Translation', type: 'textarea', required: true },
        { name: 'tafsir', label: 'Tafsir', type: 'textarea', required: true },
        { name: 'reflection', label: 'Personal Reflection', type: 'textarea' },
        { name: 'tags', label: 'Tags', type: 'tags' },
        { name: 'bookmarked', label: 'Bookmarked', type: 'checkbox', isListColumn: true }
    ];
    const goalFields = [
        { name: 'title', label: 'Title', type: 'text', required: true, isListColumn: true },
        { name: 'description', label: 'Description', type: 'textarea', required: true },
        {
            name: 'type',
            label: 'Type',
            type: 'select',
            options: [
                { value: 'daily', label: 'Daily' },
                { value: 'weekly', label: 'Weekly' },
                { value: 'monthly', label: 'Monthly' },
                { value: 'yearly', label: 'Yearly' }
            ],
            required: true,
            isListColumn: true
        },
        { name: 'target', label: 'Target', type: 'number', required: true, isListColumn: true },
        { name: 'current', label: 'Current', type: 'number', required: true, isListColumn: true },
        { name: 'unit', label: 'Unit', type: 'text', required: true },
        { name: 'startDate', label: 'Start Date', type: 'date', required: true },
        { name: 'endDate', label: 'End Date', type: 'date', required: true },
        { name: 'isActive', label: 'Active', type: 'checkbox', isListColumn: true }
    ];
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "mb-8", children: [_jsx("h1", { className: "text-3xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent", children: "Spiritual Forge" }), _jsx("p", { className: "text-slate-400 mt-2", children: "Strengthen your spiritual practice and connection with Allah" })] }), _jsxs("div", { className: "flex space-x-2 mb-6", children: [_jsx("button", { onClick: () => setActiveTab('dashboard'), className: `px-4 py-2 rounded-lg transition-colors ${activeTab === 'dashboard'
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`, children: "Dashboard" }), _jsx("button", { onClick: () => setActiveTab('manage'), className: `px-4 py-2 rounded-lg transition-colors ${activeTab === 'manage'
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`, children: "Manage" })] }), activeTab === 'dashboard' ? (_jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-3 gap-8", children: [_jsx("div", { className: "xl:col-span-2", children: _jsx(TafsirReader, {}) }), _jsxs("div", { className: "space-y-8", children: [_jsx(PrayerSchedule, {}), _jsx(SpiritualLog, {})] })] })) : (_jsxs("div", { className: "space-y-8", children: [_jsx(CrudList, { title: "Prayers", items: prayers, fields: prayerFields, onAdd: (item) => updatePrayer(item.id, item), onUpdate: updatePrayer, onDelete: (id) => updatePrayer(id, { isCompleted: false }), icon: _jsx(Clock, { className: "w-5 h-5 text-emerald-400" }), color: "emerald" }), _jsx(CrudList, { title: "Spiritual Activities", items: activities, fields: activityFields, onAdd: addActivity, onUpdate: updateActivity, onDelete: deleteActivity, icon: _jsx(Heart, { className: "w-5 h-5 text-purple-400" }), color: "purple" }), _jsx(CrudList, { title: "Tafsir Entries", items: tafsirEntries, fields: tafsirFields, onAdd: addTafsirEntry, onUpdate: updateTafsirEntry, onDelete: deleteTafsirEntry, icon: _jsx(Book, { className: "w-5 h-5 text-emerald-400" }), color: "emerald" }), _jsx(CrudList, { title: "Spiritual Goals", items: spiritualGoals, fields: goalFields, onAdd: addSpiritualGoal, onUpdate: updateSpiritualGoal, onDelete: deleteSpiritualGoal, icon: _jsx(Heart, { className: "w-5 h-5 text-blue-400" }), color: "blue" })] }))] }));
}
