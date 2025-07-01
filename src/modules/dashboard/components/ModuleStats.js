import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { allModules, iconMap } from '@/data/modules';
export function ModuleStats() {
    // Get top modules by usage
    const topModules = [...allModules]
        .filter(module => module.usage !== undefined)
        .sort((a, b) => (b.usage || 0) - (a.usage || 0))
        .slice(0, 6);
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.3 }, className: "mt-12", children: [_jsx("h2", { className: "text-2xl font-semibold text-white mb-6", children: "Your Modules" }), _jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4", children: topModules.map((module, index) => {
                    const ModuleIcon = iconMap[module.icon];
                    return (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.4 + index * 0.1 }, children: _jsxs(Link, { to: module.href, className: "flex flex-col items-center p-4 bg-slate-800/30 hover:bg-slate-800/50 rounded-xl border border-slate-700 hover:border-slate-600 transition-all duration-200 h-full", children: [_jsx("div", { className: `w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${module.color} mb-3`, children: ModuleIcon && _jsx(ModuleIcon, { className: "w-6 h-6 text-white" }) }), _jsx("span", { className: "text-sm text-white text-center", children: module.name }), _jsx("div", { className: "mt-2 w-full bg-slate-700 h-1 rounded-full overflow-hidden", children: _jsx(motion.div, { initial: { width: 0 }, animate: { width: `${module.usage || 0}%` }, transition: { delay: 0.6 + index * 0.1, duration: 0.8 }, className: `h-full bg-gradient-to-r ${module.color}` }) }), _jsxs("span", { className: "text-xs text-slate-400 mt-1", children: [module.usage || 0, "% usage"] })] }) }, module.id));
                }) }), _jsx("div", { className: "mt-4 text-center", children: _jsx(Link, { to: "/app/app-drawer", className: "inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors text-sm", children: _jsx("span", { children: "View all modules" }) }) })] }));
}
