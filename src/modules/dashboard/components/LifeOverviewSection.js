import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { TrendingUp, Target, Calendar, Zap } from 'lucide-react';
const metrics = [
    {
        label: 'Life Score',
        value: 87,
        change: '+5%',
        trend: 'up',
        icon: TrendingUp,
        color: 'text-emerald-400'
    },
    {
        label: 'Goals Progress',
        value: 73,
        change: '+12%',
        trend: 'up',
        icon: Target,
        color: 'text-blue-400'
    },
    {
        label: 'Habits Streak',
        value: 28,
        change: '+3 days',
        trend: 'up',
        icon: Calendar,
        color: 'text-purple-400'
    },
    {
        label: 'Energy Level',
        value: 92,
        change: '+8%',
        trend: 'up',
        icon: Zap,
        color: 'text-amber-400'
    }
];
export function LifeOverviewSection() {
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.1 }, className: "glass-card rounded-xl p-6", children: [_jsx("h2", { className: "text-xl font-semibold text-white mb-6", children: "Life Overview" }), _jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: metrics.map((metric, index) => (_jsxs(motion.div, { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, transition: { delay: 0.2 + index * 0.1 }, className: "bg-slate-800/50 rounded-lg p-4 hover:bg-slate-800/70 transition-colors", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx(metric.icon, { className: `w-5 h-5 ${metric.color}` }), _jsx("span", { className: "text-xs text-emerald-400 font-medium", children: metric.change })] }), _jsxs("div", { className: "text-2xl font-bold text-white mb-1", children: [metric.value, metric.label.includes('Score') || metric.label.includes('Progress') || metric.label.includes('Energy') ? '%' : ''] }), _jsx("div", { className: "text-sm text-slate-400", children: metric.label }), _jsx("div", { className: "mt-3 bg-slate-700 rounded-full h-2", children: _jsx(motion.div, { initial: { width: 0 }, animate: { width: `${metric.value}%` }, transition: { delay: 0.5 + index * 0.1, duration: 0.8 }, className: `h-2 rounded-full bg-gradient-to-r ${metric.color.includes('emerald') ? 'from-emerald-500 to-emerald-400' :
                                    metric.color.includes('blue') ? 'from-blue-500 to-blue-400' :
                                        metric.color.includes('purple') ? 'from-purple-500 to-purple-400' :
                                            'from-amber-500 to-amber-400'}` }) })] }, metric.label))) })] }));
}
