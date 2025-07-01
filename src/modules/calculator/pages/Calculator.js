import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { CalculatorDisplay } from '../components/CalculatorDisplay';
import { CalculatorKeypad } from '../components/CalculatorKeypad';
import { CalculatorHistory } from '../components/CalculatorHistory';
export function Calculator() {
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "mb-8", children: [_jsx("h1", { className: "text-3xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent", children: "Calculator" }), _jsx("p", { className: "text-slate-400 mt-2", children: "Powerful calculator with scientific functions and unit conversion" })] }), _jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-3 gap-8", children: [_jsx("div", { className: "xl:col-span-2", children: _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "glass-card rounded-xl p-6", children: [_jsx(CalculatorDisplay, {}), _jsx(CalculatorKeypad, {})] }) }), _jsx("div", { children: _jsx(CalculatorHistory, {}) })] })] }));
}
