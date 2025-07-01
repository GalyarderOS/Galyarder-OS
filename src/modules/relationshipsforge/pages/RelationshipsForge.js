import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { NetworkGraph } from '../components/NetworkGraph';
import { InteractionJournal } from '../components/InteractionJournal';
export function RelationshipsForge() {
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "mb-8", children: [_jsx("h1", { className: "text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent", children: "Relationships Forge" }), _jsx("p", { className: "text-slate-400 mt-2", children: "Nurture meaningful connections and build your social network" })] }), _jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-2 gap-8", children: [_jsx(NetworkGraph, {}), _jsx(InteractionJournal, {})] })] }));
}
