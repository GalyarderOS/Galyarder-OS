import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign, Plus } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
const monthlyData = [
    { month: 'Jan', income: 5200, expenses: 3800 },
    { month: 'Feb', income: 5400, expenses: 4100 },
    { month: 'Mar', income: 5200, expenses: 3900 },
    { month: 'Apr', income: 5600, expenses: 4200 },
    { month: 'May', income: 5800, expenses: 4000 },
    { month: 'Jun', income: 5500, expenses: 4300 }
];
export function CashflowTracker() {
    const currentMonth = monthlyData[monthlyData.length - 1];
    const netCashflow = currentMonth.income - currentMonth.expenses;
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "glass-card rounded-xl p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsx("h3", { className: "text-xl font-semibold text-white", children: "Cashflow Tracker" }), _jsxs("button", { className: "flex items-center space-x-2 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors", children: [_jsx(Plus, { className: "w-4 h-4 text-white" }), _jsx("span", { className: "text-white text-sm", children: "Add Transaction" })] })] }), _jsxs("div", { className: "grid grid-cols-3 gap-4 mb-6", children: [_jsxs("div", { className: "bg-slate-800/50 rounded-lg p-4", children: [_jsxs("div", { className: "flex items-center space-x-2 mb-2", children: [_jsx(TrendingUp, { className: "w-4 h-4 text-emerald-400" }), _jsx("span", { className: "text-sm text-slate-400", children: "Income" })] }), _jsxs("p", { className: "text-xl font-bold text-emerald-400", children: ["$", currentMonth.income.toLocaleString()] })] }), _jsxs("div", { className: "bg-slate-800/50 rounded-lg p-4", children: [_jsxs("div", { className: "flex items-center space-x-2 mb-2", children: [_jsx(TrendingDown, { className: "w-4 h-4 text-red-400" }), _jsx("span", { className: "text-sm text-slate-400", children: "Expenses" })] }), _jsxs("p", { className: "text-xl font-bold text-red-400", children: ["$", currentMonth.expenses.toLocaleString()] })] }), _jsxs("div", { className: "bg-slate-800/50 rounded-lg p-4", children: [_jsxs("div", { className: "flex items-center space-x-2 mb-2", children: [_jsx(DollarSign, { className: "w-4 h-4 text-blue-400" }), _jsx("span", { className: "text-sm text-slate-400", children: "Net" })] }), _jsxs("p", { className: `text-xl font-bold ${netCashflow >= 0 ? 'text-emerald-400' : 'text-red-400'}`, children: ["$", netCashflow.toLocaleString()] })] })] }), _jsx("div", { className: "h-64", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(BarChart, { data: monthlyData, children: [_jsx(XAxis, { dataKey: "month", axisLine: false, tickLine: false, tick: { fill: '#94A3B8', fontSize: 12 } }), _jsx(YAxis, { hide: true }), _jsx(Bar, { dataKey: "income", fill: "#10B981", radius: [2, 2, 0, 0] }), _jsx(Bar, { dataKey: "expenses", fill: "#EF4444", radius: [2, 2, 0, 0] })] }) }) })] }));
}
