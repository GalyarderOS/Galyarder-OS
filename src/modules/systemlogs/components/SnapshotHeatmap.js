import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { Calendar, TrendingUp } from 'lucide-react';
// Generate mock data for the last 12 weeks
const generateHeatmapData = () => {
    const data = [];
    const today = new Date();
    for (let week = 11; week >= 0; week--) {
        for (let day = 0; day < 7; day++) {
            const date = new Date(today);
            date.setDate(date.getDate() - (week * 7 + (6 - day)));
            const activity = Math.floor(Math.random() * 5); // 0-4 activity levels
            data.push({
                date: date.toISOString().split('T')[0],
                activity,
                day: date.getDay()
            });
        }
    }
    return data;
};
const heatmapData = generateHeatmapData();
const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const getActivityColor = (level) => {
    const colors = [
        'bg-slate-800', // 0 - no activity
        'bg-emerald-900/50', // 1 - low
        'bg-emerald-700/70', // 2 - medium
        'bg-emerald-500/80', // 3 - high
        'bg-emerald-400' // 4 - very high
    ];
    return colors[level] || colors[0];
};
export function SnapshotHeatmap() {
    const totalActiveDays = heatmapData.filter(d => d.activity > 0).length;
    const currentStreak = 7; // Mock current streak
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.1 }, className: "glass-card rounded-xl p-6", children: [_jsxs("div", { className: "flex items-center space-x-3 mb-6", children: [_jsx(Calendar, { className: "w-5 h-5 text-cyan-400" }), _jsx("h3", { className: "text-xl font-semibold text-white", children: "Activity Heatmap" })] }), _jsx("div", { className: "mb-6", children: _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "bg-slate-800/50 rounded-lg p-3 text-center", children: [_jsx(TrendingUp, { className: "w-4 h-4 text-emerald-400 mx-auto mb-1" }), _jsx("p", { className: "text-lg font-bold text-white", children: totalActiveDays }), _jsx("p", { className: "text-xs text-slate-400", children: "Active Days" })] }), _jsxs("div", { className: "bg-slate-800/50 rounded-lg p-3 text-center", children: [_jsx("div", { className: "w-4 h-4 bg-emerald-400 rounded mx-auto mb-1" }), _jsx("p", { className: "text-lg font-bold text-white", children: currentStreak }), _jsx("p", { className: "text-xs text-slate-400", children: "Day Streak" })] })] }) }), _jsxs("div", { className: "mb-4", children: [_jsx("div", { className: "grid grid-cols-7 gap-1 mb-2", children: weekdays.map(day => (_jsx("div", { className: "text-xs text-slate-400 text-center", children: day[0] }, day))) }), _jsx("div", { className: "grid grid-cols-7 gap-1", children: Array.from({ length: 12 }).map((_, weekIndex) => (weekdays.map((_, dayIndex) => {
                            const dataIndex = weekIndex * 7 + dayIndex;
                            const dayData = heatmapData[dataIndex];
                            return (_jsx(motion.div, { initial: { opacity: 0, scale: 0 }, animate: { opacity: 1, scale: 1 }, transition: { delay: (weekIndex * 7 + dayIndex) * 0.01 }, className: `w-3 h-3 rounded-sm ${getActivityColor(dayData?.activity || 0)} hover:ring-1 hover:ring-emerald-400 transition-all cursor-pointer`, title: `${dayData?.date}: ${dayData?.activity || 0} activities` }, `${weekIndex}-${dayIndex}`));
                        }))) })] }), _jsxs("div", { className: "flex items-center justify-between text-xs text-slate-400 mb-4", children: [_jsx("span", { children: "Less" }), _jsx("div", { className: "flex space-x-1", children: [0, 1, 2, 3, 4].map(level => (_jsx("div", { className: `w-2 h-2 rounded-sm ${getActivityColor(level)}` }, level))) }), _jsx("span", { children: "More" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("h4", { className: "text-sm font-medium text-white", children: "This Week" }), _jsx("div", { className: "space-y-1", children: [
                            { day: 'Monday', modules: 5, time: '3h 45m' },
                            { day: 'Tuesday', modules: 3, time: '2h 20m' },
                            { day: 'Today', modules: 4, time: '2h 55m' }
                        ].map((day, index) => (_jsxs(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.3 + index * 0.1 }, className: "flex items-center justify-between text-sm", children: [_jsx("span", { className: "text-slate-300", children: day.day }), _jsxs("div", { className: "text-right", children: [_jsxs("span", { className: "text-white", children: [day.modules, " modules"] }), _jsx("span", { className: "text-slate-400 ml-2", children: day.time })] })] }, day.day))) })] })] }));
}
