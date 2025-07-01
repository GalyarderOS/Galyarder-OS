import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { Camera, Calendar, TrendingUp, Award, AlertCircle, CheckCircle } from 'lucide-react';
import { useMetaMemoryStore } from '../store/metaMemoryStore';
export function MemorySnapshot() {
    const { snapshots } = useMetaMemoryStore();
    const getSnapshotTypeColor = (type) => {
        switch (type) {
            case 'daily': return 'text-blue-400';
            case 'weekly': return 'text-purple-400';
            case 'monthly': return 'text-emerald-400';
            case 'milestone': return 'text-amber-400';
            default: return 'text-slate-400';
        }
    };
    const getSnapshotTypeIcon = (type) => {
        switch (type) {
            case 'daily': return Calendar;
            case 'weekly': return Calendar;
            case 'monthly': return Calendar;
            case 'milestone': return Award;
            default: return Calendar;
        }
    };
    const getMoodEmoji = (mood) => {
        if (mood >= 8)
            return '😄';
        if (mood >= 6)
            return '🙂';
        if (mood >= 4)
            return '😐';
        return '😔';
    };
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.1 }, className: "glass-card rounded-xl p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(Camera, { className: "w-5 h-5 text-purple-400" }), _jsx("h3", { className: "text-xl font-semibold text-white", children: "Memory Snapshots" })] }), _jsxs("button", { className: "flex items-center space-x-2 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors", children: [_jsx(Camera, { className: "w-4 h-4 text-white" }), _jsx("span", { className: "text-white text-sm", children: "Take Snapshot" })] })] }), _jsx("div", { className: "space-y-4", children: snapshots.map((snapshot, index) => {
                    const SnapshotIcon = getSnapshotTypeIcon(snapshot.type);
                    const typeColor = getSnapshotTypeColor(snapshot.type);
                    return (_jsx(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.1 + index * 0.1 }, className: "p-4 bg-slate-800/30 rounded-lg", children: _jsxs("div", { className: "flex items-start space-x-3", children: [_jsx("div", { className: "p-2 bg-slate-700/50 rounded-lg", children: _jsx(SnapshotIcon, { className: `w-4 h-4 ${typeColor}` }) }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("h4", { className: "text-sm font-medium text-white", children: snapshot.title }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { className: `text-xs px-2 py-1 rounded-full bg-slate-700 ${typeColor}`, children: snapshot.type }), _jsx("span", { className: "text-xs text-slate-400", children: new Date(snapshot.date).toLocaleDateString() })] })] }), _jsx("p", { className: "text-sm text-slate-300 mb-3", children: snapshot.summary }), _jsx("div", { className: "grid grid-cols-4 gap-2 mb-3", children: Object.entries(snapshot.keyMetrics).map(([key, value]) => (_jsxs("div", { className: "bg-slate-700/30 rounded p-2 text-center", children: [_jsx("p", { className: "text-xs text-slate-400 capitalize", children: key }), _jsxs("p", { className: "text-sm font-medium text-white", children: [value, "%"] })] }, key))) }), _jsxs("div", { className: "flex items-center space-x-4 mb-3", children: [_jsxs("div", { className: "flex items-center space-x-1", children: [_jsx("span", { className: "text-lg", children: getMoodEmoji(snapshot.mood) }), _jsxs("span", { className: "text-xs text-slate-400", children: ["Mood: ", snapshot.mood, "/10"] })] }), _jsxs("div", { className: "flex items-center space-x-1", children: [_jsx(TrendingUp, { className: "w-3 h-3 text-emerald-400" }), _jsxs("span", { className: "text-xs text-slate-400", children: ["Energy: ", snapshot.energy, "/10"] })] }), _jsxs("div", { className: "flex items-center space-x-1", children: [_jsx(CheckCircle, { className: "w-3 h-3 text-blue-400" }), _jsxs("span", { className: "text-xs text-slate-400", children: ["Satisfaction: ", snapshot.satisfaction, "/10"] })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center space-x-2 text-xs text-emerald-400", children: [_jsx(Award, { className: "w-3 h-3" }), _jsxs("span", { children: ["Achievements: ", snapshot.achievements.length] })] }), _jsxs("div", { className: "flex items-center space-x-2 text-xs text-amber-400", children: [_jsx(AlertCircle, { className: "w-3 h-3" }), _jsxs("span", { children: ["Challenges: ", snapshot.challenges.length] })] }), _jsxs("div", { className: "flex items-center space-x-2 text-xs text-blue-400", children: [_jsx(TrendingUp, { className: "w-3 h-3" }), _jsxs("span", { children: ["Insights: ", snapshot.insights.length] })] })] })] })] }) }, snapshot.id));
                }) }), _jsx("div", { className: "mt-6 p-3 bg-purple-600/20 rounded-lg", children: _jsx("p", { className: "text-sm text-purple-300", children: "\uD83D\uDCF8 Regular snapshots help you track your progress and identify patterns in your personal development." }) })] }));
}
