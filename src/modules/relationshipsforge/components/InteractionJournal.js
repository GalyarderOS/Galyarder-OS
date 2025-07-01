import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Calendar, Plus, Heart } from 'lucide-react';
const interactions = [
    {
        id: 1,
        person: 'Sarah Chen',
        type: 'Coffee Chat',
        date: '2024-02-10',
        notes: 'Discussed her new job opportunity and provided career advice. She seemed excited about the role.',
        mood: 'positive',
        duration: '2 hours'
    },
    {
        id: 2,
        person: 'Marcus Johnson',
        type: 'Team Meeting',
        date: '2024-02-08',
        notes: 'Collaborated on the Q1 project roadmap. Good synergy and productive discussion.',
        mood: 'neutral',
        duration: '1 hour'
    },
    {
        id: 3,
        person: 'Dr. Emily Rodriguez',
        type: 'Mentorship Call',
        date: '2024-02-07',
        notes: 'Received valuable feedback on my presentation skills and leadership development.',
        mood: 'positive',
        duration: '45 minutes'
    }
];
const moodColors = {
    positive: 'border-emerald-400 bg-emerald-400/10',
    neutral: 'border-slate-400 bg-slate-400/10',
    negative: 'border-red-400 bg-red-400/10'
};
export function InteractionJournal() {
    const [showAddForm, setShowAddForm] = useState(false);
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.1 }, className: "glass-card rounded-xl p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(MessageCircle, { className: "w-5 h-5 text-blue-400" }), _jsx("h3", { className: "text-xl font-semibold text-white", children: "Interaction Journal" })] }), _jsxs("button", { onClick: () => setShowAddForm(true), className: "flex items-center space-x-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors", children: [_jsx(Plus, { className: "w-4 h-4 text-white" }), _jsx("span", { className: "text-white text-sm", children: "Log Interaction" })] })] }), _jsx("div", { className: "space-y-4", children: interactions.map((interaction, index) => (_jsxs(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.1 + index * 0.1 }, className: `p-4 border rounded-lg ${moodColors[interaction.mood]}`, children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsxs("div", { children: [_jsx("h4", { className: "text-sm font-medium text-white", children: interaction.person }), _jsx("p", { className: "text-xs text-slate-400", children: interaction.type })] }), _jsxs("div", { className: "text-right", children: [_jsxs("div", { className: "flex items-center space-x-1 text-xs text-slate-400", children: [_jsx(Calendar, { className: "w-3 h-3" }), _jsx("span", { children: interaction.date })] }), _jsx("p", { className: "text-xs text-slate-400 mt-1", children: interaction.duration })] })] }), _jsx("p", { className: "text-sm text-slate-300 leading-relaxed", children: interaction.notes }), _jsx("div", { className: "flex items-center justify-between mt-3", children: _jsxs("div", { className: "flex items-center space-x-1", children: [_jsx(Heart, { className: `w-3 h-3 ${interaction.mood === 'positive' ? 'text-emerald-400' :
                                            interaction.mood === 'neutral' ? 'text-slate-400' : 'text-red-400'}` }), _jsx("span", { className: "text-xs text-slate-400 capitalize", children: interaction.mood })] }) })] }, interaction.id))) }), _jsx("div", { className: "mt-6 p-3 bg-blue-600/20 rounded-lg", children: _jsxs("p", { className: "text-sm text-blue-300", children: ["\uD83D\uDCDD You've logged ", interactions.length, " meaningful interactions this week"] }) }), showAddForm && (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50", onClick: () => setShowAddForm(false), children: _jsxs("div", { className: "glass-card rounded-xl p-6 w-96 m-4", onClick: (e) => e.stopPropagation(), children: [_jsx("h4", { className: "text-lg font-semibold text-white mb-4", children: "Log Interaction" }), _jsxs("form", { className: "space-y-4", children: [_jsx("input", { type: "text", placeholder: "Person's name", className: "w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400" }), _jsx("input", { type: "text", placeholder: "Interaction type (e.g., Coffee, Call, Meeting)", className: "w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400" }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsx("input", { type: "date", className: "px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white" }), _jsx("input", { type: "text", placeholder: "Duration", className: "px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400" })] }), _jsxs("select", { className: "w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white", children: [_jsx("option", { value: "", children: "Select mood" }), _jsx("option", { value: "positive", children: "Positive" }), _jsx("option", { value: "neutral", children: "Neutral" }), _jsx("option", { value: "negative", children: "Negative" })] }), _jsx("textarea", { placeholder: "Notes about the interaction...", className: "w-full h-24 p-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 resize-none" }), _jsxs("div", { className: "flex space-x-3", children: [_jsx("button", { type: "button", onClick: () => setShowAddForm(false), className: "flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors", children: "Cancel" }), _jsx("button", { type: "submit", className: "flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors", children: "Log Interaction" })] })] })] }) }))] }));
}
