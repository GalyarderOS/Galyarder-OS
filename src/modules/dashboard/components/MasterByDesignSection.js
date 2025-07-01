import { jsx as _jsx } from "react/jsx-runtime";
import { motion } from 'framer-motion';
export function MasterByDesignSection() {
    return (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.6 }, className: "text-center", children: _jsx("p", { className: "text-slate-400 text-lg font-light", children: "Master life by design, powered by data" }) }));
}
