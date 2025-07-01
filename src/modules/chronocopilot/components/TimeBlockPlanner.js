import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2 } from 'lucide-react';
const mockTimeBlocks = [
    {
        id: '1',
        title: 'Deep Work Session',
        startTime: '09:00',
        endTime: '11:00',
        category: 'work',
        color: 'bg-blue-500'
    },
    {
        id: '2',
        title: 'Workout',
        startTime: '11:30',
        endTime: '12:30',
        category: 'health',
        color: 'bg-emerald-500'
    },
    {
        id: '3',
        title: 'Learning Session',
        startTime: '14:00',
        endTime: '15:30',
        category: 'learning',
        color: 'bg-purple-500'
    }
];
export function TimeBlockPlanner() {
    const [timeBlocks, setTimeBlocks] = useState(mockTimeBlocks);
    const [showAddForm, setShowAddForm] = useState(false);
    const hours = Array.from({ length: 24 }, (_, i) => i);
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "glass-card rounded-xl p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsx("h3", { className: "text-xl font-semibold text-white", children: "Today's Schedule" }), _jsxs("button", { onClick: () => setShowAddForm(true), className: "flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors", children: [_jsx(Plus, { className: "w-4 h-4 text-white" }), _jsx("span", { className: "text-white text-sm", children: "Add Block" })] })] }), _jsx("div", { className: "relative", children: _jsx("div", { className: "space-y-1", children: hours.map((hour) => (_jsxs("div", { className: "flex items-center h-12 border-b border-slate-700/30", children: [_jsxs("div", { className: "w-16 text-xs text-slate-400", children: [hour.toString().padStart(2, '0'), ":00"] }), _jsx("div", { className: "flex-1 relative", children: timeBlocks
                                    .filter(block => {
                                    const startHour = parseInt(block.startTime.split(':')[0]);
                                    return startHour === hour;
                                })
                                    .map(block => (_jsx(motion.div, { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, className: `absolute left-2 right-2 ${block.color} rounded-lg p-2 group cursor-pointer`, style: {
                                        height: `${(parseInt(block.endTime.split(':')[0]) - parseInt(block.startTime.split(':')[0])) * 48 - 4}px`
                                    }, children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-white text-sm font-medium", children: block.title }), _jsxs("p", { className: "text-white/80 text-xs", children: [block.startTime, " - ", block.endTime] })] }), _jsxs("div", { className: "opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1", children: [_jsx("button", { className: "p-1 hover:bg-white/20 rounded", children: _jsx(Edit, { className: "w-3 h-3 text-white" }) }), _jsx("button", { className: "p-1 hover:bg-white/20 rounded", children: _jsx(Trash2, { className: "w-3 h-3 text-white" }) })] })] }) }, block.id))) })] }, hour))) }) }), showAddForm && (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50", onClick: () => setShowAddForm(false), children: _jsxs("div", { className: "glass-card rounded-xl p-6 w-96 m-4", onClick: (e) => e.stopPropagation(), children: [_jsx("h4", { className: "text-lg font-semibold text-white mb-4", children: "Add Time Block" }), _jsxs("form", { className: "space-y-4", children: [_jsx("input", { type: "text", placeholder: "Block title", className: "w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400" }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsx("input", { type: "time", className: "px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white" }), _jsx("input", { type: "time", className: "px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white" })] }), _jsxs("select", { className: "w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white", children: [_jsx("option", { value: "work", children: "Work" }), _jsx("option", { value: "personal", children: "Personal" }), _jsx("option", { value: "health", children: "Health" }), _jsx("option", { value: "learning", children: "Learning" })] }), _jsxs("div", { className: "flex space-x-3", children: [_jsx("button", { type: "button", onClick: () => setShowAddForm(false), className: "flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors", children: "Cancel" }), _jsx("button", { type: "submit", className: "flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors", children: "Add Block" })] })] })] }) }))] }));
}
