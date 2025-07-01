import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { Heart, Plus, Book, Sparkles, Users, Gift } from 'lucide-react';
import { useSpiritualStore } from '../store/spiritualStore';
export function SpiritualLog() {
    const { activities } = useSpiritualStore();
    const getActivityIcon = (type) => {
        const icons = {
            dhikr: Sparkles,
            quran: Book,
            dua: Heart,
            reflection: Heart,
            charity: Gift,
            other: Users
        };
        return icons[type] || Users;
    };
    const getActivityColor = (type) => {
        const colors = {
            dhikr: 'text-amber-400',
            quran: 'text-emerald-400',
            dua: 'text-purple-400',
            reflection: 'text-blue-400',
            charity: 'text-pink-400',
            other: 'text-slate-400'
        };
        return colors[type] || 'text-slate-400';
    };
    const todayActivities = activities.filter(activity => {
        const activityDate = new Date(activity.completedAt).toDateString();
        const today = new Date().toDateString();
        return activityDate === today;
    });
    const totalDuration = todayActivities.reduce((sum, activity) => sum + activity.duration, 0);
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.1 }, className: "glass-card rounded-xl p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(Heart, { className: "w-5 h-5 text-purple-400" }), _jsx("h3", { className: "text-xl font-semibold text-white", children: "Spiritual Log" })] }), _jsxs("button", { className: "flex items-center space-x-2 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors", children: [_jsx(Plus, { className: "w-4 h-4 text-white" }), _jsx("span", { className: "text-white text-sm", children: "Log Activity" })] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4 mb-6", children: [_jsxs("div", { className: "bg-slate-800/50 rounded-lg p-4 text-center", children: [_jsx("p", { className: "text-lg font-bold text-white", children: todayActivities.length }), _jsx("p", { className: "text-xs text-slate-400", children: "Activities Today" })] }), _jsxs("div", { className: "bg-slate-800/50 rounded-lg p-4 text-center", children: [_jsxs("p", { className: "text-lg font-bold text-white", children: [totalDuration, "m"] }), _jsx("p", { className: "text-xs text-slate-400", children: "Time Spent" })] })] }), _jsxs("div", { className: "space-y-4", children: [_jsx("h4", { className: "text-sm font-medium text-white", children: "Recent Activities" }), activities.slice(0, 5).map((activity, index) => {
                        const ActivityIcon = getActivityIcon(activity.type);
                        const iconColor = getActivityColor(activity.type);
                        return (_jsx(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.1 + index * 0.1 }, className: "p-4 bg-slate-800/30 rounded-lg", children: _jsxs("div", { className: "flex items-start space-x-3", children: [_jsx("div", { className: "p-2 bg-slate-700/50 rounded-lg", children: _jsx(ActivityIcon, { className: `w-4 h-4 ${iconColor}` }) }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("h5", { className: "text-sm font-medium text-white", children: activity.title }), _jsx("span", { className: "text-xs text-slate-400", children: new Date(activity.completedAt).toLocaleDateString() })] }), _jsx("p", { className: "text-sm text-slate-300 mb-2", children: activity.description }), _jsxs("div", { className: "flex items-center space-x-4 text-xs text-slate-400", children: [_jsxs("span", { children: [activity.duration, " minutes"] }), _jsx("span", { className: "capitalize", children: activity.type }), activity.count && (_jsxs("span", { children: [activity.count, " repetitions"] })), activity.verses && (_jsx("span", { children: activity.verses.join(', ') }))] }), activity.notes && (_jsxs("p", { className: "text-xs text-slate-400 mt-2 italic", children: ["\"", activity.notes, "\""] }))] })] }) }, activity.id));
                    })] }), _jsxs("div", { className: "mt-6", children: [_jsx("h4", { className: "text-sm font-medium text-white mb-3", children: "Activity Types" }), _jsx("div", { className: "grid grid-cols-2 gap-2", children: ['dhikr', 'quran', 'dua', 'reflection', 'charity', 'other'].map(type => {
                            const count = activities.filter(a => a.type === type).length;
                            const Icon = getActivityIcon(type);
                            const color = getActivityColor(type);
                            return (_jsxs("div", { className: "flex items-center justify-between p-2 bg-slate-800/30 rounded-lg", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Icon, { className: `w-3 h-3 ${color}` }), _jsx("span", { className: "text-xs text-slate-300 capitalize", children: type })] }), _jsx("span", { className: "text-xs text-white font-medium", children: count })] }, type));
                        }) })] }), _jsx("div", { className: "mt-6 p-3 bg-purple-600/20 rounded-lg", children: _jsx("p", { className: "text-sm text-purple-300", children: "\u2728 Your spiritual practice is strengthening. May Allah increase you in faith and righteousness." }) })] }));
}
