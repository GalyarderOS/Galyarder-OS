import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { Copy, History } from 'lucide-react';
import { useCalculatorStore } from '../store/calculatorStore';
export function CalculatorDisplay() {
    const { display, memory, copyToClipboard } = useCalculatorStore();
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "bg-slate-800/50 rounded-xl p-6 mb-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("div", { className: "flex items-center space-x-2", children: memory !== 0 && (_jsxs("span", { className: "text-xs bg-amber-600/20 text-amber-400 px-2 py-1 rounded", children: ["M: ", memory] })) }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("button", { onClick: copyToClipboard, className: "p-2 hover:bg-slate-700 rounded-lg transition-colors", title: "Copy to clipboard", children: _jsx(Copy, { className: "w-4 h-4 text-slate-400 hover:text-white" }) }), _jsx("button", { className: "p-2 hover:bg-slate-700 rounded-lg transition-colors", title: "View history", children: _jsx(History, { className: "w-4 h-4 text-slate-400 hover:text-white" }) })] })] }), _jsx("div", { className: "text-right", children: _jsx(motion.div, { initial: { scale: 1.05 }, animate: { scale: 1 }, className: "text-4xl font-mono text-white break-all", children: display }, display) })] }));
}
