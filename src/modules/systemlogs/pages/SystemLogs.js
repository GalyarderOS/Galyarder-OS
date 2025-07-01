import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { ActivityTimeline } from '../components/ActivityTimeline';
import { SnapshotHeatmap } from '../components/SnapshotHeatmap';
export function SystemLogs() {
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "mb-8", children: [_jsx("h1", { className: "text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent", children: "System Logs" }), _jsx("p", { className: "text-slate-400 mt-2", children: "Track your digital footprint and activity patterns" })] }), _jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-3 gap-8", children: [_jsx("div", { className: "xl:col-span-2", children: _jsx(ActivityTimeline, {}) }), _jsx("div", { children: _jsx(SnapshotHeatmap, {}) })] })] }));
}
