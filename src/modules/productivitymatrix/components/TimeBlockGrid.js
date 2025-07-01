import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { Calendar, Plus } from 'lucide-react';
const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'
];
const scheduledBlocks = [
    { time: '09:00', duration: 2, title: 'Deep Work', type: 'work' },
    { time: '11:00', duration: 1, title: 'Meetings', type: 'meeting' },
    { time: '14:00', duration: 2, title: 'Creative Work', type: 'creative' },
    { time: '16:00', duration: 1, title: 'Admin Tasks', type: 'admin' }
];
const blockTypes = {
    work: 'bg-blue-500',
    meeting: 'bg-purple-500',
    creative: 'bg-emerald-500',
    admin: 'bg-amber-500'
};
export function TimeBlockGrid() {
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.1 }, className: "glass-card rounded-xl p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(Calendar, { className: "w-5 h-5 text-blue-400" }), _jsx("h3", { className: "text-xl font-semibold text-white", children: "Time Block Grid" })] }), _jsxs("button", { className: "flex items-center space-x-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors", children: [_jsx(Plus, { className: "w-4 h-4 text-white" }), _jsx("span", { className: "text-white text-sm", children: "Add Block" })] })] }), _jsx("div", { className: "space-y-2", children: timeSlots.map((time, index) => {
                    const block = scheduledBlocks.find(b => b.time === time);
                    return (_jsxs(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.1 + index * 0.05 }, className: "flex items-center space-x-3", children: [_jsx("div", { className: "w-16 text-sm text-slate-400", children: time }), _jsxs("div", { className: "flex-1 h-12 bg-slate-800/30 rounded-lg relative overflow-hidden", children: [block && (_jsxs(motion.div, { initial: { width: 0 }, animate: { width: '100%' }, transition: { delay: 0.3 + index * 0.1, duration: 0.5 }, className: `h-full ${blockTypes[block.type]} rounded-lg flex items-center px-3`, children: [_jsx("span", { className: "text-white text-sm font-medium", children: block.title }), _jsxs("span", { className: "ml-auto text-white/80 text-xs", children: [block.duration, "h"] })] })), !block && (_jsx("button", { className: "w-full h-full flex items-center justify-center text-slate-500 hover:text-slate-400 hover:bg-slate-800/50 transition-colors rounded-lg", children: _jsx(Plus, { className: "w-4 h-4" }) }))] })] }, time));
                }) }), _jsx("div", { className: "mt-6 flex flex-wrap gap-2", children: Object.entries(blockTypes).map(([type, color]) => (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { className: `w-3 h-3 rounded ${color}` }), _jsx("span", { className: "text-xs text-slate-400 capitalize", children: type })] }, type))) })] }));
}
