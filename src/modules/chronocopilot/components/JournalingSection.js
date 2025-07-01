import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { PenTool, Save } from 'lucide-react';
export function JournalingSection() {
    const [entry, setEntry] = useState('');
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.4 }, className: "glass-card rounded-xl p-6", children: [_jsxs("div", { className: "flex items-center space-x-3 mb-4", children: [_jsx(PenTool, { className: "w-5 h-5 text-purple-400" }), _jsx("h3", { className: "text-lg font-semibold text-white", children: "Daily Journal" })] }), _jsx("textarea", { value: entry, onChange: (e) => setEntry(e.target.value), placeholder: "How was your day? What did you learn? What are you grateful for?", className: "w-full h-32 p-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500" }), _jsxs("div", { className: "flex justify-between items-center mt-4", children: [_jsxs("span", { className: "text-xs text-slate-400", children: [entry.length, " characters"] }), _jsxs("button", { className: "flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors", children: [_jsx(Save, { className: "w-4 h-4 text-white" }), _jsx("span", { className: "text-white text-sm", children: "Save Entry" })] })] })] }));
}
