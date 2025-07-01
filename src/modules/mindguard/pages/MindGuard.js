import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { EmotionLog } from '../components/EmotionLog';
import { ReflectionPrompt } from '../components/ReflectionPrompt';
export function MindGuard() {
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "mb-8", children: [_jsx("h1", { className: "text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent", children: "Mind Guard" }), _jsx("p", { className: "text-slate-400 mt-2", children: "Protect and nurture your mental wellness with emotional intelligence" })] }), _jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-2 gap-8", children: [_jsx(EmotionLog, {}), _jsx(ReflectionPrompt, {})] })] }));
}
