import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { InteractionLog } from '../components/InteractionLog';
import { FollowUpPlanner } from '../components/FollowUpPlanner';
import { StrategicContactMap } from '../components/StrategicContactMap';
export function NetworkNexus() {
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "mb-8", children: [_jsx("h1", { className: "text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent", children: "Network Nexus" }), _jsx("p", { className: "text-slate-400 mt-2", children: "Strategic relationship management and networking intelligence" })] }), _jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-3 gap-8", children: [_jsxs("div", { className: "xl:col-span-2 space-y-8", children: [_jsx(InteractionLog, {}), _jsx(FollowUpPlanner, {})] }), _jsx("div", { children: _jsx(StrategicContactMap, {}) })] })] }));
}
