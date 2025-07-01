import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { Settings, Power, Plus, Edit } from 'lucide-react';
import { useEnvironmentStore } from '../store/environmentStore';
export function EnvironmentModeSelector() {
    const { modes, currentMode, activateMode } = useEnvironmentStore();
    const getModeIcon = (name) => {
        if (name.includes('Focus'))
            return '🎯';
        if (name.includes('Creative'))
            return '🎨';
        if (name.includes('Relax'))
            return '🧘';
        if (name.includes('Sleep'))
            return '😴';
        return '⚙️';
    };
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "glass-card rounded-xl p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(Settings, { className: "w-5 h-5 text-blue-400" }), _jsx("h3", { className: "text-xl font-semibold text-white", children: "Environment Modes" })] }), _jsxs("button", { className: "flex items-center space-x-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors", children: [_jsx(Plus, { className: "w-4 h-4 text-white" }), _jsx("span", { className: "text-white text-sm", children: "New Mode" })] })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: modes.map((mode, index) => (_jsxs(motion.div, { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, transition: { delay: index * 0.1 }, className: `p-4 rounded-lg border-2 cursor-pointer transition-all ${mode.id === currentMode
                        ? 'border-blue-500 bg-blue-500/10'
                        : 'border-slate-700 hover:border-slate-600 bg-slate-800/30'}`, onClick: () => activateMode(mode.id), children: [_jsxs("div", { className: "flex items-start justify-between mb-3", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("span", { className: "text-2xl", children: getModeIcon(mode.name) }), _jsxs("div", { children: [_jsx("h4", { className: "text-sm font-medium text-white", children: mode.name }), _jsx("p", { className: "text-xs text-slate-400", children: mode.description })] })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [mode.isActive && (_jsx(Power, { className: "w-4 h-4 text-emerald-400" })), _jsx("button", { className: "p-1 hover:bg-slate-700 rounded transition-colors", children: _jsx(Edit, { className: "w-3 h-3 text-slate-400 hover:text-white" }) })] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-3 text-xs", children: [_jsxs("div", { className: "bg-slate-700/30 rounded p-2", children: [_jsx("span", { className: "text-slate-400", children: "Lighting:" }), _jsxs("span", { className: "text-white ml-1", children: [mode.settings.lighting, "%"] })] }), _jsxs("div", { className: "bg-slate-700/30 rounded p-2", children: [_jsx("span", { className: "text-slate-400", children: "Temp:" }), _jsxs("span", { className: "text-white ml-1", children: [mode.settings.temperature, "\u00B0C"] })] }), _jsxs("div", { className: "bg-slate-700/30 rounded p-2", children: [_jsx("span", { className: "text-slate-400", children: "Humidity:" }), _jsxs("span", { className: "text-white ml-1", children: [mode.settings.humidity, "%"] })] }), _jsxs("div", { className: "bg-slate-700/30 rounded p-2", children: [_jsx("span", { className: "text-slate-400", children: "Noise:" }), _jsxs("span", { className: "text-white ml-1", children: [mode.settings.noise, "dB"] })] })] })] }, mode.id))) }), _jsx("div", { className: "mt-6 p-3 bg-blue-600/20 rounded-lg", children: _jsx("p", { className: "text-sm text-blue-300", children: "\uD83C\uDFE0 Environment automatically adjusts based on your selected mode and connected devices." }) })] }));
}
