import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { Heart, Plus, Calendar, Share2, Tag } from 'lucide-react';
import { useFamilyMatrixStore } from '../store/familyMatrixStore';
export function GratitudeLedger() {
    const { gratitudeEntries, familyMembers } = useFamilyMatrixStore();
    const getRecipientName = (recipientId) => {
        const member = familyMembers.find(m => m.id === recipientId);
        return member ? member.name : recipientId;
    };
    const getCategoryColor = (category) => {
        const colors = {
            'support': 'text-emerald-400',
            'achievement': 'text-blue-400',
            'kindness': 'text-pink-400',
            'growth': 'text-purple-400',
            'presence': 'text-amber-400'
        };
        return colors[category] || 'text-slate-400';
    };
    const todayEntries = gratitudeEntries.filter(entry => {
        const entryDate = new Date(entry.date).toDateString();
        const today = new Date().toDateString();
        return entryDate === today;
    });
    const weeklyEntries = gratitudeEntries.filter(entry => {
        const entryDate = new Date(entry.date);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return entryDate >= weekAgo;
    });
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.2 }, className: "glass-card rounded-xl p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(Heart, { className: "w-5 h-5 text-pink-400" }), _jsx("h3", { className: "text-xl font-semibold text-white", children: "Gratitude Ledger" })] }), _jsxs("button", { className: "flex items-center space-x-2 px-3 py-1.5 bg-pink-600 hover:bg-pink-700 rounded-lg transition-colors", children: [_jsx(Plus, { className: "w-4 h-4 text-white" }), _jsx("span", { className: "text-white text-sm", children: "Express Gratitude" })] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4 mb-6", children: [_jsxs("div", { className: "bg-slate-800/50 rounded-lg p-4 text-center", children: [_jsx("p", { className: "text-lg font-bold text-white", children: todayEntries.length }), _jsx("p", { className: "text-xs text-slate-400", children: "Today" })] }), _jsxs("div", { className: "bg-slate-800/50 rounded-lg p-4 text-center", children: [_jsx("p", { className: "text-lg font-bold text-white", children: weeklyEntries.length }), _jsx("p", { className: "text-xs text-slate-400", children: "This Week" })] })] }), _jsx("div", { className: "space-y-4", children: gratitudeEntries.map((entry, index) => (_jsxs(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.1 + index * 0.1 }, className: "p-4 bg-slate-800/30 rounded-lg", children: [_jsx("div", { className: "flex items-start justify-between mb-3", children: _jsxs("div", { children: [_jsxs("div", { className: "flex items-center space-x-2 mb-1", children: [_jsxs("h4", { className: "text-sm font-medium text-white", children: ["To: ", getRecipientName(entry.recipient)] }), entry.isShared && (_jsx(Share2, { className: "w-3 h-3 text-blue-400" }))] }), _jsxs("div", { className: "flex items-center space-x-2 text-xs text-slate-400", children: [_jsx(Calendar, { className: "w-3 h-3" }), _jsx("span", { children: new Date(entry.date).toLocaleDateString() }), _jsx("span", { className: `${getCategoryColor(entry.category)}`, children: entry.category })] })] }) }), _jsx("div", { className: "p-3 bg-pink-600/10 border-l-2 border-pink-500 rounded mb-3", children: _jsxs("p", { className: "text-sm text-pink-200 italic", children: ["\"", entry.content, "\""] }) }), _jsx("div", { className: "flex flex-wrap gap-1", children: entry.tags.map(tag => (_jsxs("span", { className: "text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded flex items-center space-x-1", children: [_jsx(Tag, { className: "w-2 h-2" }), _jsx("span", { children: tag })] }, tag))) })] }, entry.id))) }), _jsx("div", { className: "mt-6 p-3 bg-pink-600/20 rounded-lg", children: _jsx("p", { className: "text-sm text-pink-300", children: "\u2764\uFE0F Expressing gratitude strengthens family bonds and increases overall happiness." }) })] }));
}
