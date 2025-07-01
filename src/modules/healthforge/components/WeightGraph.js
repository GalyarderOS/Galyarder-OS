import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { TrendingDown, Target } from 'lucide-react';
const weightData = [
    { date: '2024-01-01', weight: 75.2 },
    { date: '2024-01-08', weight: 74.8 },
    { date: '2024-01-15', weight: 74.5 },
    { date: '2024-01-22', weight: 74.1 },
    { date: '2024-01-29', weight: 73.8 },
    { date: '2024-02-05', weight: 73.5 },
    { date: '2024-02-12', weight: 73.2 }
];
export function WeightGraph() {
    const currentWeight = weightData[weightData.length - 1].weight;
    const startWeight = weightData[0].weight;
    const weightLoss = startWeight - currentWeight;
    const targetWeight = 70;
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.2 }, className: "glass-card rounded-xl p-6", children: [_jsx("h3", { className: "text-xl font-semibold text-white mb-6", children: "Weight Progress" }), _jsxs("div", { className: "grid grid-cols-3 gap-4 mb-6", children: [_jsxs("div", { className: "bg-slate-800/50 rounded-lg p-4 text-center", children: [_jsx("div", { className: "w-5 h-5 bg-blue-400 rounded-full mx-auto mb-2" }), _jsxs("p", { className: "text-lg font-bold text-white", children: [currentWeight, " kg"] }), _jsx("p", { className: "text-xs text-slate-400", children: "Current" })] }), _jsxs("div", { className: "bg-slate-800/50 rounded-lg p-4 text-center", children: [_jsx(TrendingDown, { className: "w-5 h-5 text-emerald-400 mx-auto mb-2" }), _jsxs("p", { className: "text-lg font-bold text-emerald-400", children: ["-", weightLoss.toFixed(1), " kg"] }), _jsx("p", { className: "text-xs text-slate-400", children: "Lost" })] }), _jsxs("div", { className: "bg-slate-800/50 rounded-lg p-4 text-center", children: [_jsx(Target, { className: "w-5 h-5 text-purple-400 mx-auto mb-2" }), _jsxs("p", { className: "text-lg font-bold text-white", children: [targetWeight, " kg"] }), _jsx("p", { className: "text-xs text-slate-400", children: "Target" })] })] }), _jsx("div", { className: "h-64 mb-4", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(LineChart, { data: weightData, children: [_jsx(XAxis, { dataKey: "date", axisLine: false, tickLine: false, tick: { fill: '#94A3B8', fontSize: 12 }, tickFormatter: (value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) }), _jsx(YAxis, { hide: true, domain: ['dataMin - 1', 'dataMax + 1'] }), _jsx(Line, { type: "monotone", dataKey: "weight", stroke: "#10B981", strokeWidth: 3, dot: { fill: '#10B981', strokeWidth: 0, r: 4 }, activeDot: { r: 6, fill: '#10B981' } })] }) }) }), _jsxs("div", { className: "flex justify-between text-sm text-slate-400 mb-2", children: [_jsx("span", { children: "Progress to Goal" }), _jsxs("span", { children: [Math.round(((startWeight - currentWeight) / (startWeight - targetWeight)) * 100), "%"] })] }), _jsx("div", { className: "bg-slate-700 rounded-full h-2", children: _jsx(motion.div, { initial: { width: 0 }, animate: { width: `${Math.min(((startWeight - currentWeight) / (startWeight - targetWeight)) * 100, 100)}%` }, transition: { duration: 0.8 }, className: "bg-gradient-to-r from-emerald-500 to-emerald-400 h-2 rounded-full" }) })] }));
}
