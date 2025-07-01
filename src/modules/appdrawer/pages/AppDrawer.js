import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Pin, PinOff, Grid, Settings, RefreshCw } from 'lucide-react';
import { allModules, iconMap } from '../../../data/modules';
import { useDockStore } from '../../../lib/stores/useDockStore';
export function AppDrawer() {
    const { pinnedModules, pinModule, unpinModule, resetToDefault } = useDockStore();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [showResetConfirm, setShowResetConfirm] = useState(false);
    // Categories for filtering
    const categories = [
        { id: 'all', name: 'All' },
        { id: 'productivity', name: 'Productivity' },
        { id: 'health', name: 'Health & Wellness' },
        { id: 'finance', name: 'Finance' },
        { id: 'personal', name: 'Personal' },
        { id: 'system', name: 'System' }
    ];
    // Filter modules based on search and category
    const filteredModules = allModules.filter(module => {
        const matchesSearch = module.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || module.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });
    // Handle keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e) => {
            // Focus search input when / is pressed
            if (e.key === '/' && document.activeElement?.tagName !== 'INPUT') {
                e.preventDefault();
                const searchInput = document.getElementById('module-search');
                if (searchInput) {
                    searchInput.focus();
                }
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);
    // Function to toggle pin status
    const togglePin = (moduleId) => {
        if (pinnedModules.includes(moduleId)) {
            unpinModule(moduleId);
        }
        else {
            pinModule(moduleId);
        }
    };
    // Function to handle reset confirmation
    const handleResetDock = () => {
        resetToDefault();
        setShowResetConfirm(false);
    };
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "mb-8", children: [_jsx("h1", { className: "text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent", children: "App Drawer" }), _jsx("p", { className: "text-slate-400 mt-2", children: "All your modules in one place" })] }), _jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8", children: [_jsxs("div", { className: "relative w-full md:w-64", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" }), _jsx("input", { id: "module-search", type: "text", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), placeholder: "Search modules... (Press '/' to focus)", className: "w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500" })] }), _jsx("div", { className: "flex flex-wrap gap-2", children: categories.map(category => (_jsx("button", { onClick: () => setSelectedCategory(category.id), className: `px-3 py-1.5 rounded-lg text-sm transition-colors ${selectedCategory === category.id
                                ? 'bg-blue-600 text-white'
                                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`, children: category.name }, category.id))) })] }), _jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4", children: filteredModules.map((module) => {
                    const ModuleIcon = iconMap[module.icon] || Grid;
                    const isPinned = pinnedModules.includes(module.id);
                    return (_jsxs(motion.div, { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.2 }, className: "relative group", children: [_jsxs(Link, { to: module.href, className: "flex flex-col items-center p-4 bg-slate-800/30 hover:bg-slate-800/50 rounded-xl border border-slate-700 hover:border-slate-600 transition-all", children: [_jsx("div", { className: `w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br ${module.color} mb-3`, children: _jsx(ModuleIcon, { className: "w-8 h-8 text-white" }) }), _jsx("span", { className: "text-sm text-white text-center", children: module.name }), module.shortcut && (_jsx("span", { className: "text-xs text-slate-400 mt-1", children: module.shortcut }))] }), _jsx("button", { onClick: () => togglePin(module.id), className: `absolute top-2 right-2 p-1.5 rounded-full transition-all ${isPinned
                                    ? 'bg-blue-600 text-white opacity-100'
                                    : 'bg-slate-700/80 hover:bg-blue-600 text-white opacity-0 group-hover:opacity-100'}`, title: isPinned ? "Remove from Dock" : "Add to Dock", children: isPinned ? (_jsx(PinOff, { className: "w-3.5 h-3.5" })) : (_jsx(Pin, { className: "w-3.5 h-3.5" })) })] }, module.id));
                }) }), filteredModules.length === 0 && (_jsxs("div", { className: "text-center py-12", children: [_jsx(Grid, { className: "w-16 h-16 text-slate-500 mx-auto mb-4" }), _jsx("h3", { className: "text-xl font-medium text-white mb-2", children: "No modules found" }), _jsx("p", { className: "text-slate-400", children: "Try adjusting your search or filter criteria" })] })), _jsxs("div", { className: "mt-12 p-6 bg-slate-800/30 rounded-xl border border-slate-700", children: [_jsx("h2", { className: "text-xl font-semibold text-white mb-4", children: "Dock Management" }), _jsx("p", { className: "text-slate-400 mb-6", children: "Customize your dock by pinning modules you use frequently. You can also drag modules in the dock to reorder them." }), _jsxs("div", { className: "flex flex-wrap gap-4", children: [_jsxs("div", { className: "flex-1 min-w-[250px]", children: [_jsx("h3", { className: "text-white font-medium mb-3", children: "Currently Pinned" }), _jsx("div", { className: "bg-slate-800/50 rounded-lg p-4", children: _jsx("div", { className: "flex flex-wrap gap-2", children: pinnedModules.map(id => {
                                                const module = allModules.find(m => m.id === id);
                                                if (!module)
                                                    return null;
                                                const ModuleIcon = iconMap[module.icon] || Grid;
                                                return (_jsxs("div", { className: "flex items-center space-x-2 bg-slate-700/50 rounded-lg px-3 py-2", children: [_jsx(ModuleIcon, { className: "w-4 h-4 text-white" }), _jsx("span", { className: "text-sm text-white", children: module.name }), _jsx("button", { onClick: () => unpinModule(module.id), className: "text-slate-400 hover:text-red-400", children: _jsx(PinOff, { className: "w-3.5 h-3.5" }) })] }, module.id));
                                            }) }) })] }), _jsxs("div", { className: "flex-1 min-w-[250px]", children: [_jsx("h3", { className: "text-white font-medium mb-3", children: "Dock Controls" }), _jsxs("div", { className: "bg-slate-800/50 rounded-lg p-4 space-y-4", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center", children: _jsx(Grid, { className: "w-5 h-5 text-blue-400" }) }), _jsxs("div", { children: [_jsx("h4", { className: "text-white font-medium", children: "App Drawer" }), _jsx("p", { className: "text-sm text-slate-400", children: "Access all your modules" })] })] }), _jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "w-10 h-10 rounded-full bg-purple-600/20 flex items-center justify-center", children: _jsx(Settings, { className: "w-5 h-5 text-purple-400" }) }), _jsxs("div", { children: [_jsx("h4", { className: "text-white font-medium", children: "Dock Customization" }), _jsx("p", { className: "text-sm text-slate-400", children: "Drag icons to reorder, right-click for options" })] })] }), _jsxs("button", { onClick: () => setShowResetConfirm(true), className: "w-full flex items-center justify-center space-x-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors", children: [_jsx(RefreshCw, { className: "w-4 h-4" }), _jsx("span", { children: "Reset Dock to Default" })] })] })] })] })] }), _jsx(AnimatePresence, { children: showResetConfirm && (_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50", onClick: () => setShowResetConfirm(false), children: _jsxs(motion.div, { initial: { scale: 0.9, y: 20 }, animate: { scale: 1, y: 0 }, exit: { scale: 0.9, y: 20 }, className: "bg-slate-800 border border-slate-700 rounded-xl p-6 w-full max-w-md mx-4", onClick: e => e.stopPropagation(), children: [_jsx("h3", { className: "text-xl font-semibold text-white mb-4", children: "Reset Dock to Default?" }), _jsx("p", { className: "text-slate-300 mb-6", children: "This will restore the default dock configuration and remove any customizations you've made." }), _jsxs("div", { className: "flex justify-end space-x-3", children: [_jsx("button", { onClick: () => setShowResetConfirm(false), className: "px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg", children: "Cancel" }), _jsx("button", { onClick: handleResetDock, className: "px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg", children: "Reset Dock" })] })] }) })) })] }));
}
