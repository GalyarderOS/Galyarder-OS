import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, Plus } from 'lucide-react';
const incomeStreams = [
    {
        id: 1,
        name: 'Primary Job',
        amount: 8500,
        type: 'salary',
        growth: 12,
        stability: 'high'
    },
    {
        id: 2,
        name: 'Freelance Projects',
        amount: 2200,
        type: 'contract',
        growth: 25,
        stability: 'medium'
    },
    {
        id: 3,
        name: 'Investment Returns',
        amount: 850,
        type: 'passive',
        growth: 8,
        stability: 'medium'
    },
    {
        id: 4,
        name: 'Online Course',
        amount: 450,
        type: 'passive',
        growth: 35,
        stability: 'low'
    }
];
const typeColors = {
    salary: 'text-blue-400',
    contract: 'text-emerald-400',
    passive: 'text-purple-400'
};
const stabilityColors = {
    high: 'text-emerald-400',
    medium: 'text-amber-400',
    low: 'text-red-400'
};
export function IncomeStreamTracker() {
    const totalIncome = incomeStreams.reduce((sum, stream) => sum + stream.amount, 0);
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.1 }, className: "glass-card rounded-xl p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(DollarSign, { className: "w-5 h-5 text-emerald-400" }), _jsx("h3", { className: "text-xl font-semibold text-white", children: "Income Streams" })] }), _jsxs("button", { className: "flex items-center space-x-2 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors", children: [_jsx(Plus, { className: "w-4 h-4 text-white" }), _jsx("span", { className: "text-white text-sm", children: "Add Stream" })] })] }), _jsxs("div", { className: "mb-6 p-4 bg-slate-800/50 rounded-lg", children: [_jsx("p", { className: "text-sm text-slate-400 mb-1", children: "Total Monthly Income" }), _jsxs("p", { className: "text-2xl font-bold text-emerald-400", children: ["$", totalIncome.toLocaleString()] }), _jsx("p", { className: "text-sm text-emerald-400", children: "+15.2% from last month" })] }), _jsx("div", { className: "space-y-4", children: incomeStreams.map((stream, index) => (_jsxs(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.2 + index * 0.1 }, className: "p-4 bg-slate-800/30 rounded-lg", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsxs("div", { children: [_jsx("h4", { className: "text-sm font-medium text-white", children: stream.name }), _jsxs("div", { className: "flex items-center space-x-2 mt-1", children: [_jsx("span", { className: `text-xs capitalize ${typeColors[stream.type]}`, children: stream.type }), _jsx("span", { className: "text-xs text-slate-500", children: "\u2022" }), _jsxs("span", { className: `text-xs capitalize ${stabilityColors[stream.stability]}`, children: [stream.stability, " stability"] })] })] }), _jsxs("div", { className: "text-right", children: [_jsxs("p", { className: "text-sm font-medium text-white", children: ["$", stream.amount.toLocaleString()] }), _jsxs("div", { className: "flex items-center space-x-1", children: [_jsx(TrendingUp, { className: "w-3 h-3 text-emerald-400" }), _jsxs("span", { className: "text-xs text-emerald-400", children: ["+", stream.growth, "%"] })] })] })] }), _jsx("div", { className: "bg-slate-700 rounded-full h-2", children: _jsx(motion.div, { initial: { width: 0 }, animate: { width: `${(stream.amount / totalIncome) * 100}%` }, transition: { delay: 0.4 + index * 0.1, duration: 0.8 }, className: "bg-gradient-to-r from-emerald-500 to-emerald-400 h-2 rounded-full" }) }), _jsxs("p", { className: "text-xs text-slate-400 mt-2", children: [Math.round((stream.amount / totalIncome) * 100), "% of total income"] })] }, stream.id))) }), _jsx("div", { className: "mt-6 p-3 bg-emerald-600/20 rounded-lg", children: _jsx("p", { className: "text-sm text-emerald-300", children: "\uD83D\uDCA1 Consider diversifying with 1-2 more passive income streams" }) })] }));
}
