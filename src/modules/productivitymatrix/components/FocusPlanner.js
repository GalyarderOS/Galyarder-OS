import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { Target, Clock, Zap, CheckCircle } from 'lucide-react';
const focusSessions = [
    {
        id: 1,
        task: 'Complete project proposal',
        duration: 90,
        priority: 'high',
        completed: true,
        startTime: '09:00'
    },
    {
        id: 2,
        task: 'Review team feedback',
        duration: 45,
        priority: 'medium',
        completed: true,
        startTime: '11:00'
    },
    {
        id: 3,
        task: 'Design system updates',
        duration: 120,
        priority: 'high',
        completed: false,
        startTime: '14:00'
    },
    {
        id: 4,
        task: 'Email responses',
        duration: 30,
        priority: 'low',
        completed: false,
        startTime: '16:30'
    }
];
const priorityColors = {
    high: 'border-red-400 bg-red-400/10',
    medium: 'border-amber-400 bg-amber-400/10',
    low: 'border-emerald-400 bg-emerald-400/10'
};
export function FocusPlanner() {
    const completedSessions = focusSessions.filter(s => s.completed).length;
    const totalFocusTime = focusSessions
        .filter(s => s.completed)
        .reduce((sum, s) => sum + s.duration, 0);
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "glass-card rounded-xl p-6", children: [_jsxs("div", { className: "flex items-center space-x-3 mb-6", children: [_jsx(Target, { className: "w-5 h-5 text-purple-400" }), _jsx("h3", { className: "text-xl font-semibold text-white", children: "Focus Planner" })] }), _jsxs("div", { className: "grid grid-cols-3 gap-4 mb-6", children: [_jsxs("div", { className: "bg-slate-800/50 rounded-lg p-3 text-center", children: [_jsx(CheckCircle, { className: "w-4 h-4 text-emerald-400 mx-auto mb-1" }), _jsx("p", { className: "text-lg font-bold text-white", children: completedSessions }), _jsx("p", { className: "text-xs text-slate-400", children: "Completed" })] }), _jsxs("div", { className: "bg-slate-800/50 rounded-lg p-3 text-center", children: [_jsx(Clock, { className: "w-4 h-4 text-blue-400 mx-auto mb-1" }), _jsxs("p", { className: "text-lg font-bold text-white", children: [totalFocusTime, "m"] }), _jsx("p", { className: "text-xs text-slate-400", children: "Focus Time" })] }), _jsxs("div", { className: "bg-slate-800/50 rounded-lg p-3 text-center", children: [_jsx(Zap, { className: "w-4 h-4 text-amber-400 mx-auto mb-1" }), _jsx("p", { className: "text-lg font-bold text-white", children: "85%" }), _jsx("p", { className: "text-xs text-slate-400", children: "Efficiency" })] })] }), _jsx("div", { className: "space-y-3", children: focusSessions.map((session, index) => (_jsxs(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.1 + index * 0.1 }, className: `p-4 border rounded-lg ${priorityColors[session.priority]} ${session.completed ? 'opacity-60' : ''}`, children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("h4", { className: `text-sm font-medium ${session.completed ? 'line-through text-slate-400' : 'text-white'}`, children: session.task }), session.completed && (_jsx(CheckCircle, { className: "w-4 h-4 text-emerald-400" }))] }), _jsxs("div", { className: "flex items-center justify-between text-xs text-slate-400", children: [_jsxs("span", { children: [session.startTime, " \u2022 ", session.duration, " minutes"] }), _jsxs("span", { className: "capitalize", children: [session.priority, " priority"] })] })] }, session.id))) }), _jsx("div", { className: "mt-6 p-3 bg-purple-600/20 rounded-lg", children: _jsx("p", { className: "text-sm text-purple-300", children: "\uD83C\uDFAF You're on track! 2 more sessions to complete today's goals" }) })] }));
}
