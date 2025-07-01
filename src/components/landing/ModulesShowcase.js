import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { allModules, iconMap } from '@/data/modules';
export function ModulesShowcase() {
    const [activeCategory, setActiveCategory] = useState('all');
    // Filter modules based on category
    const filteredModules = activeCategory === 'all'
        ? allModules
        : allModules.filter(module => module.tag?.toLowerCase() === activeCategory.toLowerCase());
    // Sort modules alphabetically within each group
    const sortedModules = [...filteredModules].sort((a, b) => {
        // First sort by tag (Core, Personal, Advanced)
        const tagOrder = { 'Core': 1, 'Personal': 2, 'Advanced': 3 };
        const aTagOrder = a.tag ? tagOrder[a.tag] || 4 : 4;
        const bTagOrder = b.tag ? tagOrder[b.tag] || 4 : 4;
        if (aTagOrder !== bTagOrder) {
            return aTagOrder - bTagOrder;
        }
        // Then sort alphabetically by name
        return a.name.localeCompare(b.name);
    });
    // Get tag color based on category
    const getTagColor = (tag) => {
        if (!tag)
            return "bg-slate-700 text-slate-300";
        switch (tag.toLowerCase()) {
            case 'core':
                return "bg-blue-600/20 text-blue-400";
            case 'personal':
                return "bg-emerald-600/20 text-emerald-400";
            case 'advanced':
                return "bg-purple-600/20 text-purple-400";
            default:
                return "bg-slate-700 text-slate-300";
        }
    };
    return (_jsxs("section", { id: "features", className: "py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden", children: [_jsxs("div", { className: "absolute inset-0 z-0", children: [_jsx("div", { className: "absolute inset-0 bg-slate-950 opacity-90" }), _jsx("div", { className: "absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" }), _jsx("div", { className: "absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" }), _jsx("div", { className: "absolute inset-0", children: _jsx("div", { className: "h-full w-full bg-[radial-gradient(#3b82f6_1px,transparent_1px),linear-gradient(to_right,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:16px_16px] opacity-[0.15]" }) })] }), _jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [_jsxs("div", { className: "text-center mb-16", children: [_jsxs(motion.h2, { className: "text-4xl md:text-5xl font-bold text-white mb-6", initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.8 }, children: ["Everything You Need to", ' ', _jsx("span", { className: "bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent", children: "Build Your Personal Civilization" })] }), _jsx(motion.p, { className: "text-xl text-slate-300 max-w-3xl mx-auto", initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.8, delay: 0.2 }, children: "27+ integrated life modules to master productivity, finance, health, relationships, and legacy." }), _jsx(motion.div, { className: "flex flex-wrap justify-center gap-3 mt-8", initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.8, delay: 0.3 }, children: ['all', 'core', 'personal', 'advanced'].map((category) => (_jsxs("button", { onClick: () => setActiveCategory(category), className: `px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === category
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`, children: [category.charAt(0).toUpperCase() + category.slice(1), " Modules"] }, category))) })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: sortedModules.map((module, index) => {
                            // Skip command-palette as it's a system module
                            if (module.id === 'command-palette')
                                return null;
                            const ModuleIcon = iconMap[module.icon];
                            return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5, delay: index * 0.05 }, whileHover: {
                                    y: -5,
                                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)"
                                }, className: "bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-all duration-300", children: [_jsxs("div", { className: "flex items-start space-x-4", children: [_jsx("div", { className: `p-3 rounded-xl bg-gradient-to-br ${module.color}`, children: ModuleIcon && _jsx(ModuleIcon, { className: "w-6 h-6 text-white" }) }), _jsxs("div", { children: [_jsxs("div", { className: "flex items-center mb-2", children: [_jsx("h3", { className: "text-xl font-semibold text-white", children: module.name }), module.tag && (_jsx("span", { className: `ml-2 text-xs px-2 py-0.5 rounded-full ${getTagColor(module.tag)}`, children: module.tag }))] }), _jsx("p", { className: "text-slate-300", children: module.description }), module.shortcut && (_jsxs("p", { className: "text-xs text-slate-400 mt-1", children: ["Shortcut: ", module.shortcut] }))] })] }), _jsx("div", { className: "mt-4 pl-14", children: _jsx("div", { className: "space-y-2", children: Array.from({ length: 3 }).map((_, i) => (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { className: "w-1 h-1 rounded-full bg-blue-400" }), _jsx("div", { className: "h-2 bg-slate-700 rounded w-full" })] }, i))) }) })] }, module.id));
                        }) }), _jsx(motion.div, { className: "text-center mt-12", initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.8, delay: 0.5 }, children: _jsxs(Link, { to: "/register", className: "inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-200 shadow-lg shadow-blue-600/20", children: [_jsx("span", { children: "Explore All Modules" }), _jsx(ChevronRight, { className: "w-5 h-5" })] }) })] })] }));
}
