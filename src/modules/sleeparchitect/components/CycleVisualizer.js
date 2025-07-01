import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { Clock, Plus, Power } from 'lucide-react';
import { useSleepStore } from '../store/sleepStore';
export function CycleVisualizer() {
    const { cycles, currentCycle, activateCycle } = useSleepStore();
    const formatTime = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    };
    const getCycleTypeColor = (type) => {
        switch (type) {
            case 'monophasic': return 'text-blue-400';
            case 'biphasic': return 'text-emerald-400';
            case 'polyphasic': return 'text-purple-400';
            default: return 'text-slate-400';
        }
    };
    const getBlockTypeIcon = (type) => {
        return type === 'core' ? '🛏️' : '💤';
    };
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.1 }, className: "glass-card rounded-xl p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(Clock, { className: "w-5 h-5 text-purple-400" }), _jsx("h3", { className: "text-xl font-semibold text-white", children: "Sleep Cycles" })] }), _jsxs("button", { className: "flex items-center space-x-2 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors", children: [_jsx(Plus, { className: "w-4 h-4 text-white" }), _jsx("span", { className: "text-white text-sm", children: "New Cycle" })] })] }), _jsx("div", { className: "space-y-4", children: cycles.map((cycle, index) => (_jsxs(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.1 + index * 0.1 }, className: `p-4 rounded-lg border-2 cursor-pointer transition-all ${cycle.id === currentCycle
                        ? 'border-purple-500 bg-purple-500/10'
                        : 'border-slate-700 hover:border-slate-600 bg-slate-800/30'}`, onClick: () => activateCycle(cycle.id), children: [_jsx("div", { className: "flex items-start justify-between mb-4", children: _jsxs("div", { children: [_jsxs("div", { className: "flex items-center space-x-2 mb-1", children: [_jsx("h4", { className: "text-sm font-medium text-white", children: cycle.name }), cycle.isActive && (_jsx(Power, { className: "w-4 h-4 text-emerald-400" }))] }), _jsxs("div", { className: "flex items-center space-x-4 text-xs text-slate-400", children: [_jsx("span", { className: `capitalize ${getCycleTypeColor(cycle.type)}`, children: cycle.type }), _jsxs("span", { children: ["Total: ", formatTime(cycle.totalSleep)] }), _jsxs("span", { children: [cycle.schedule.length, " blocks"] })] })] }) }), _jsx("div", { className: "space-y-2", children: cycle.schedule.map((block, blockIndex) => (_jsxs("div", { className: "flex items-center space-x-3 p-2 bg-slate-700/30 rounded", children: [_jsx("span", { className: "text-sm", children: getBlockTypeIcon(block.type) }), _jsxs("div", { className: "flex-1", children: [_jsx("p", { className: "text-sm font-medium text-white", children: block.name }), _jsxs("p", { className: "text-xs text-slate-400", children: [block.startTime, " \u2022 ", formatTime(block.duration)] })] }), _jsx("div", { className: `px-2 py-1 rounded text-xs ${block.type === 'core' ? 'bg-blue-600/20 text-blue-400' : 'bg-emerald-600/20 text-emerald-400'}`, children: block.type })] }, block.id))) })] }, cycle.id))) }), _jsx("div", { className: "mt-6 p-3 bg-purple-600/20 rounded-lg", children: _jsx("p", { className: "text-sm text-purple-300", children: "\u23F0 Polyphasic sleep cycles can increase productivity but require strict adherence to schedule." }) })] }));
}
