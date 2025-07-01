import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { ContentQueue } from '../components/ContentQueue';
import { VoiceDraftEditor } from '../components/VoiceDraftEditor';
import { ImpactGraph } from '../components/ImpactGraph';
export function CommunicationConsole() {
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "mb-8", children: [_jsx("h1", { className: "text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent", children: "Communication Console" }), _jsx("p", { className: "text-slate-400 mt-2", children: "Craft your voice, manage content, and track your communication impact" })] }), _jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-3 gap-8", children: [_jsxs("div", { className: "xl:col-span-2 space-y-8", children: [_jsx(ContentQueue, {}), _jsx(VoiceDraftEditor, {})] }), _jsx("div", { children: _jsx(ImpactGraph, {}) })] })] }));
}
