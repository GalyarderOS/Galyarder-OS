import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { FileExplorer } from '../components/FileExplorer';
export function Files() {
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "mb-8", children: [_jsx("h1", { className: "text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent", children: "Files" }), _jsx("p", { className: "text-slate-400 mt-2", children: "Organize, share, and manage your files with ease" })] }), _jsx(FileExplorer, {})] }));
}
