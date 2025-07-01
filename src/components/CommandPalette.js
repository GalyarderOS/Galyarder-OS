import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, Command } from 'lucide-react';
import { allModules, iconMap } from '@/data/modules';
export function CommandPalette({ isOpen, onClose }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef(null);
    const navigate = useNavigate();
    // Filter modules based on search query
    const filteredModules = allModules.filter(module => module.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        module.id.toLowerCase().includes(searchQuery.toLowerCase()));
    // Reset selected index when filtered results change
    useEffect(() => {
        setSelectedIndex(0);
    }, [searchQuery]);
    // Focus input when opened
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);
    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isOpen)
                return;
            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    setSelectedIndex(prev => prev < filteredModules.length - 1 ? prev + 1 : prev);
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    setSelectedIndex(prev => prev > 0 ? prev - 1 : 0);
                    break;
                case 'Enter':
                    e.preventDefault();
                    if (filteredModules[selectedIndex]) {
                        navigate(filteredModules[selectedIndex].href);
                        onClose();
                    }
                    break;
                case 'Escape':
                    e.preventDefault();
                    onClose();
                    break;
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, selectedIndex, filteredModules, navigate, onClose]);
    return (_jsx(AnimatePresence, { children: isOpen && (_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, className: "fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-[20vh]", onClick: onClose, children: _jsxs(motion.div, { initial: { y: -20, opacity: 0 }, animate: { y: 0, opacity: 1 }, exit: { y: -20, opacity: 0 }, transition: { type: 'spring', damping: 25, stiffness: 300 }, className: "w-full max-w-xl bg-slate-800 border border-slate-700 rounded-xl shadow-2xl overflow-hidden", onClick: e => e.stopPropagation(), children: [_jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400", children: _jsx(Search, { className: "w-5 h-5" }) }), _jsx("input", { ref: inputRef, type: "text", value: searchQuery, onChange: e => setSearchQuery(e.target.value), placeholder: "Search modules, actions, or type a command...", className: "w-full pl-12 pr-10 py-4 bg-transparent border-b border-slate-700 text-white placeholder-slate-400 focus:outline-none" }), _jsxs("div", { className: "absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2 text-slate-400", children: [_jsxs("span", { className: "text-xs border border-slate-600 rounded px-1.5 py-0.5 flex items-center", children: [_jsx(Command, { className: "w-3 h-3 mr-1" }), "K"] }), _jsx("button", { onClick: onClose, children: _jsx(X, { className: "w-5 h-5 hover:text-white transition-colors" }) })] })] }), _jsx("div", { className: "max-h-[60vh] overflow-y-auto", children: filteredModules.length > 0 ? (_jsx("div", { className: "p-2", children: filteredModules.map((module, index) => {
                                const ModuleIcon = iconMap[module.icon] || Search;
                                return (_jsxs("div", { className: `flex items-center space-x-3 p-3 rounded-lg cursor-pointer ${index === selectedIndex ? 'bg-blue-600/20' : 'hover:bg-slate-700/50'}`, onClick: () => {
                                        navigate(module.href);
                                        onClose();
                                    }, onMouseEnter: () => setSelectedIndex(index), children: [_jsx("div", { className: `w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br ${module.color}`, children: _jsx(ModuleIcon, { className: "w-5 h-5 text-white" }) }), _jsxs("div", { className: "flex-1", children: [_jsx("div", { className: "text-white font-medium", children: module.name }), module.description && (_jsx("div", { className: "text-xs text-slate-400", children: module.description }))] }), _jsx(ArrowRight, { className: "w-4 h-4 text-slate-400" })] }, module.id));
                            }) })) : (_jsx("div", { className: "p-8 text-center", children: _jsx("p", { className: "text-slate-400", children: "No results found" }) })) }), _jsx("div", { className: "p-3 border-t border-slate-700 bg-slate-800/50", children: _jsxs("div", { className: "flex items-center justify-center space-x-4 text-xs text-slate-400", children: [_jsxs("div", { className: "flex items-center space-x-1", children: [_jsx("span", { className: "border border-slate-600 rounded px-1.5 py-0.5", children: "\u2191" }), _jsx("span", { className: "border border-slate-600 rounded px-1.5 py-0.5", children: "\u2193" }), _jsx("span", { children: "to navigate" })] }), _jsxs("div", { className: "flex items-center space-x-1", children: [_jsx("span", { className: "border border-slate-600 rounded px-1.5 py-0.5", children: "Enter" }), _jsx("span", { children: "to select" })] }), _jsxs("div", { className: "flex items-center space-x-1", children: [_jsx("span", { className: "border border-slate-600 rounded px-1.5 py-0.5", children: "Esc" }), _jsx("span", { children: "to close" })] })] }) })] }) })) }));
}
