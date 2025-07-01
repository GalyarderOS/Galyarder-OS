import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { Clock, CheckCircle, Target, TrendingUp } from 'lucide-react';
const activities = [
    {
        id: 1,
        type: 'habit',
        title: 'Morning Meditation',
        description: 'Completed 20-minute session',
        time: '2 hours ago',
        icon: CheckCircle,
        color: 'text-emerald-400'
    },
    {
        id: 2,
        type: 'goal',
        title: 'Fitness Goal Update',
        description: 'Reached 75% of monthly target',
        time: '4 hours ago',
        icon: Target,
        color: 'text-blue-400'
    },
    {
        id: 3,
        type: 'achievement',
        title: 'Productivity Streak',
        description: '7-day high-focus work streak',
        time: '1 day ago',
        icon: TrendingUp,
        color: 'text-purple-400'
    },
    {
        id: 4,
        type: 'schedule',
        title: 'Time Block Completed',
        description: 'Deep work session finished',
        time: '2 days ago',
        icon: Clock,
        color: 'text-amber-400'
    }
];
export function RecentActivity() {
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.5 }, className: "glass-card rounded-xl p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-white mb-4", children: "Recent Activity" }), _jsx("div", { className: "space-y-4", children: activities.map((activity, index) => (_jsxs(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.6 + index * 0.1 }, className: "flex items-start space-x-3 p-3 rounded-lg hover:bg-slate-800/30 transition-colors", children: [_jsx("div", { className: `p-2 rounded-lg bg-slate-800/50`, children: _jsx(activity.icon, { className: `w-4 h-4 ${activity.color}` }) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("p", { className: "text-sm font-medium text-white truncate", children: activity.title }), _jsx("p", { className: "text-xs text-slate-400 mt-1", children: activity.description }), _jsx("p", { className: "text-xs text-slate-500 mt-1", children: activity.time })] })] }, activity.id))) })] }));
}
