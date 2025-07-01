import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { AnimatedElement } from '../components/AnimatedElement';
export function AnimationDemo() {
    return (_jsx("div", { className: "min-h-screen bg-slate-950 flex items-center justify-center", children: _jsx("div", { className: "w-full max-w-4xl mx-auto", children: _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8 }, className: "text-center", children: [_jsx("h1", { className: "text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-8", children: "Interactive Animation Demo" }), _jsx(AnimatedElement, {})] }) }) }));
}
