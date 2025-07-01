import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { TimeBlockPlanner } from '../components/TimeBlockPlanner';
import { RitualTracker } from '../components/RitualTracker';
import { JournalingSection } from '../components/JournalingSection';
export function ChronoCopilot() {
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "mb-8", children: [_jsx("h1", { className: "text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent", children: "Chrono Copilot" }), _jsx("p", { className: "text-slate-400 mt-2", children: "Master your time with intelligent scheduling and ritual tracking" })] }), _jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-3 gap-8", children: [_jsx("div", { className: "xl:col-span-2", children: _jsx(TimeBlockPlanner, {}) }), _jsxs("div", { className: "space-y-8", children: [_jsx(RitualTracker, {}), _jsx(JournalingSection, {})] })] })] }));
}
