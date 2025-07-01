import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { TrendingUp, PieChart } from 'lucide-react';
const investments = [
    { name: 'S&P 500 ETF', value: 25000, change: 8.5, allocation: 40 },
    { name: 'Tech Stocks', value: 18000, change: 12.3, allocation: 30 },
    { name: 'Bonds', value: 12000, change: 2.1, allocation: 20 },
    { name: 'Crypto', value: 6000, change: -5.2, allocation: 10 }
];
export function InvestmentPortfolio() {
    const totalValue = investments.reduce((sum, inv) => sum + inv.value, 0);
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.1 }, className: "glass-card rounded-xl p-6", children: [_jsxs("div", { className: "flex items-center space-x-3 mb-6", children: [_jsx(PieChart, { className: "w-5 h-5 text-blue-400" }), _jsx("h3", { className: "text-xl font-semibold text-white", children: "Investment Portfolio" })] }), _jsxs("div", { className: "mb-6", children: [_jsx("p", { className: "text-sm text-slate-400 mb-1", children: "Total Portfolio Value" }), _jsxs("p", { className: "text-2xl font-bold text-white", children: ["$", totalValue.toLocaleString()] }), _jsx("p", { className: "text-sm text-emerald-400", children: "+7.8% this month" })] }), _jsx("div", { className: "space-y-3", children: investments.map((investment, index) => (_jsxs(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.2 + index * 0.1 }, className: "flex items-center justify-between p-3 bg-slate-800/30 rounded-lg", children: [_jsxs("div", { className: "flex-1", children: [_jsx("p", { className: "text-sm font-medium text-white", children: investment.name }), _jsxs("p", { className: "text-xs text-slate-400", children: [investment.allocation, "% allocation"] })] }), _jsxs("div", { className: "text-right", children: [_jsxs("p", { className: "text-sm font-medium text-white", children: ["$", investment.value.toLocaleString()] }), _jsxs("div", { className: "flex items-center space-x-1", children: [_jsx(TrendingUp, { className: `w-3 h-3 ${investment.change >= 0 ? 'text-emerald-400' : 'text-red-400'}` }), _jsxs("span", { className: `text-xs ${investment.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`, children: [investment.change >= 0 ? '+' : '', investment.change, "%"] })] })] })] }, investment.name))) })] }));
}
