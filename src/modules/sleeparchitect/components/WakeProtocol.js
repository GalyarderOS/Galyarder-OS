import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { Sunrise, Play, Settings, Plus } from 'lucide-react';
import { useSleepStore } from '../store/sleepStore';
export function WakeProtocol() {
    const { wakeProtocols } = useSleepStore();
    const getStepIcon = (type) => {
        const icons = {
            light: '💡',
            sound: '🔊',
            vibration: '📳',
            temperature: '🌡️'
        };
        return icons[type] || '⚙️';
    };
    const getIntensityColor = (intensity) => {
        if (intensity >= 70)
            return 'text-red-400';
        if (intensity >= 40)
            return 'text-amber-400';
        return 'text-emerald-400';
    };
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.2 }, className: "glass-card rounded-xl p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(Sunrise, { className: "w-5 h-5 text-amber-400" }), _jsx("h3", { className: "text-xl font-semibold text-white", children: "Wake Protocols" })] }), _jsxs("button", { className: "flex items-center space-x-2 px-3 py-1.5 bg-amber-600 hover:bg-amber-700 rounded-lg transition-colors", children: [_jsx(Plus, { className: "w-4 h-4 text-white" }), _jsx("span", { className: "text-white text-sm", children: "New Protocol" })] })] }), _jsx("div", { className: "space-y-4", children: wakeProtocols.map((protocol, index) => (_jsxs(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.1 + index * 0.1 }, className: `p-4 rounded-lg ${protocol.isActive
                        ? 'border-2 border-amber-500 bg-amber-500/10'
                        : 'bg-slate-800/30'}`, children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs("div", { children: [_jsx("h4", { className: "text-sm font-medium text-white", children: protocol.name }), _jsxs("p", { className: "text-xs text-slate-400", children: [protocol.duration, " minutes total"] })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [protocol.isActive && (_jsx("div", { className: "w-2 h-2 bg-emerald-400 rounded-full animate-pulse" })), _jsx("button", { className: "p-2 bg-amber-600 hover:bg-amber-700 rounded-lg transition-colors", children: _jsx(Play, { className: "w-3 h-3 text-white" }) }), _jsx("button", { className: "p-2 hover:bg-slate-700 rounded-lg transition-colors", children: _jsx(Settings, { className: "w-3 h-3 text-slate-400 hover:text-white" }) })] })] }), _jsx("div", { className: "space-y-2", children: protocol.steps.map((step, stepIndex) => (_jsxs("div", { className: "flex items-center space-x-3 p-2 bg-slate-700/30 rounded", children: [_jsx("span", { className: "text-sm", children: getStepIcon(step.type) }), _jsxs("div", { className: "flex-1", children: [_jsx("p", { className: "text-sm font-medium text-white", children: step.name }), _jsxs("p", { className: "text-xs text-slate-400", children: [step.duration, " min"] })] }), _jsxs("div", { className: "text-right", children: [_jsxs("p", { className: `text-sm font-medium ${getIntensityColor(step.intensity)}`, children: [step.intensity, "%"] }), _jsx("p", { className: "text-xs text-slate-400 capitalize", children: step.type })] })] }, step.id))) })] }, protocol.id))) }), _jsx("div", { className: "mt-6 p-3 bg-amber-600/20 rounded-lg", children: _jsx("p", { className: "text-sm text-amber-300", children: "\uD83C\uDF05 Gradual wake protocols improve morning alertness and reduce sleep inertia." }) })] }));
}
