import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { Activity, Tag, Search, Filter, Clock } from 'lucide-react';
import { useMetaMemoryStore } from '../store/metaMemoryStore';
export function ActionLog() {
    const { actionLogs } = useMetaMemoryStore();
    const getModuleColor = (module) => {
        const colors = {
            FinanceHub: 'text-emerald-400',
            HealthForge: 'text-red-400',
            ProductivityMatrix: 'text-purple-400',
            AIAssistant: 'text-blue-400',
            ChronoCopilot: 'text-amber-400',
            MindGuard: 'text-pink-400',
            CareerCommand: 'text-indigo-400',
            RelationshipsForge: 'text-violet-400'
        };
        return colors[module] || 'text-slate-400';
    };
    const getImpactColor = (impact) => {
        switch (impact) {
            case 'high': return 'bg-red-400/20 text-red-400';
            case 'medium': return 'bg-amber-400/20 text-amber-400';
            case 'low': return 'bg-emerald-400/20 text-emerald-400';
            default: return 'bg-slate-400/20 text-slate-400';
        }
    };
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "glass-card rounded-xl p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(Activity, { className: "w-5 h-5 text-blue-400" }), _jsx("h3", { className: "text-xl font-semibold text-white", children: "Action Log" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("button", { className: "p-2 hover:bg-slate-700 rounded-lg transition-colors", children: _jsx(Filter, { className: "w-4 h-4 text-slate-400 hover:text-white" }) }), _jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" }), _jsx("input", { type: "text", placeholder: "Search logs...", className: "w-48 pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500" })] })] })] }), _jsx("div", { className: "space-y-4", children: actionLogs.map((log, index) => (_jsx(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.1 + index * 0.1 }, className: "p-4 bg-slate-800/30 rounded-lg", children: _jsxs("div", { className: "flex items-start space-x-3", children: [_jsxs("div", { className: "relative", children: [_jsx("div", { className: "p-2 bg-slate-700/50 rounded-lg", children: _jsx(Activity, { className: `w-4 h-4 ${getModuleColor(log.module)}` }) }), index < actionLogs.length - 1 && (_jsx("div", { className: "absolute top-10 left-1/2 transform -translate-x-1/2 w-px h-8 bg-slate-600" }))] }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("h4", { className: "text-sm font-medium text-white", children: log.action }), _jsx("span", { className: `text-xs px-2 py-1 rounded ${getModuleColor(log.module)}`, children: log.module })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsxs("span", { className: `text-xs px-2 py-1 rounded ${getImpactColor(log.impact)}`, children: [log.impact, " impact"] }), _jsxs("span", { className: "text-xs text-slate-400", children: [_jsx(Clock, { className: "inline w-3 h-3 mr-1" }), new Date(log.timestamp).toLocaleTimeString()] })] })] }), _jsx("p", { className: "text-sm text-slate-300 mb-3", children: log.details }), _jsx("div", { className: "grid grid-cols-2 gap-2 mb-3", children: Object.entries(log.context).map(([key, value]) => (_jsxs("div", { className: "bg-slate-700/30 rounded p-2 text-xs", children: [_jsxs("span", { className: "text-slate-400", children: [key, ": "] }), _jsx("span", { className: "text-white", children: typeof value === 'object'
                                                        ? JSON.stringify(value)
                                                        : value.toString() })] }, key))) }), _jsx("div", { className: "flex flex-wrap gap-1", children: log.tags.map(tag => (_jsxs("span", { className: "text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded flex items-center space-x-1", children: [_jsx(Tag, { className: "w-2 h-2" }), _jsx("span", { children: tag })] }, tag))) })] })] }) }, log.id))) }), _jsx("div", { className: "mt-6 p-3 bg-blue-600/20 rounded-lg", children: _jsx("p", { className: "text-sm text-blue-300", children: "\uD83D\uDD0D Your action log provides a complete history of your system interactions for reflection and analysis." }) })] }));
}
