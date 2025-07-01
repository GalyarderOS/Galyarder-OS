import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LayoutDashboard, Bot, Search, Grid, Cog, BriefcaseIcon, Pin, PinOff } from 'lucide-react';
import { useDockStore } from '@/lib/stores/useDockStore';
import { cn } from '@/lib/utils';
import logo from '../../assets/logo.png';
export function MobileDrawer() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const { pinnedModules, pinModule, unpinModule } = useDockStore();
    // Close drawer when location changes
    useEffect(() => {
        setIsOpen(false);
    }, [location]);
    // Prevent body scroll when drawer is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        }
        else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);
    const coreModules = [
        { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard, href: '/app/dashboard' },
        { id: 'ai-assistant', name: 'AI Assistant', icon: Bot, href: '/app/ai-assistant' },
        { id: 'command-palette', name: 'Command Palette', icon: Search, href: '#', action: () => console.log('Open command palette') },
        { id: 'app-drawer', name: 'App Drawer', icon: Grid, href: '/app/app-drawer' },
        { id: 'system-kernel', name: 'System Kernel', icon: Cog, href: '/app/system-kernel' },
        { id: 'settings', name: 'Settings', icon: Cog, href: '/app/settings' },
        { id: 'ops-center', name: 'Ops Center', icon: BriefcaseIcon, href: '/app/ops-center' }
    ];
    const togglePin = (e, moduleId) => {
        e.preventDefault();
        e.stopPropagation();
        if (pinnedModules.includes(moduleId)) {
            unpinModule(moduleId);
        }
        else {
            pinModule(moduleId);
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx("button", { onClick: () => setIsOpen(true), className: "md:hidden fixed top-4 left-4 z-50 p-2 bg-slate-900/90 rounded-lg text-white", "aria-label": "Open menu", children: _jsx(Menu, { className: "w-6 h-6" }) }), _jsx(AnimatePresence, { children: isOpen && (_jsxs(_Fragment, { children: [_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, className: "fixed inset-0 bg-black/50 z-40 md:hidden", onClick: () => setIsOpen(false) }), _jsxs(motion.div, { initial: { x: '-100%' }, animate: { x: 0 }, exit: { x: '-100%' }, transition: { type: 'spring', damping: 25, stiffness: 200 }, className: "fixed inset-y-0 left-0 w-64 bg-slate-900 z-50 flex flex-col md:hidden", children: [_jsxs("div", { className: "flex h-16 items-center justify-between px-4 border-b border-slate-800", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("img", { src: logo, alt: "GalyarderOS Logo", className: "w-8 h-8" }), _jsx("span", { className: "text-white font-semibold", children: "GalyarderOS" })] }), _jsx("button", { onClick: () => setIsOpen(false), className: "p-1.5 rounded-lg hover:bg-slate-800 transition-colors", "aria-label": "Close menu", children: _jsx(X, { className: "w-5 h-5 text-slate-400" }) })] }), _jsxs("div", { className: "px-2 py-4", children: [_jsx("h3", { className: "text-sm font-medium text-slate-400 px-3 mb-2", children: "Core Modules" }), _jsx("nav", { className: "space-y-1", children: coreModules.map((module) => {
                                                const isActive = location.pathname === module.href;
                                                const isPinned = pinnedModules.includes(module.id);
                                                return (_jsxs(Link, { to: module.href, onClick: (e) => module.action ? (e.preventDefault(), module.action()) : null, className: cn("group flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200", isActive
                                                        ? "bg-blue-600 text-white"
                                                        : "text-slate-300 hover:bg-slate-800 hover:text-white"), children: [_jsxs("div", { className: "flex items-center", children: [_jsx(module.icon, { className: "flex-shrink-0 w-5 h-5 mr-3" }), module.name] }), _jsx("button", { onClick: (e) => togglePin(e, module.id), className: `p-1 rounded-full ${isPinned
                                                                ? 'text-blue-400 hover:bg-blue-600/20'
                                                                : 'text-slate-400 hover:bg-slate-700'} opacity-0 group-hover:opacity-100 transition-opacity`, "aria-label": isPinned ? "Remove from dock" : "Add to dock", children: isPinned ? _jsx(PinOff, { className: "w-3.5 h-3.5" }) : _jsx(Pin, { className: "w-3.5 h-3.5" }) })] }, module.id));
                                            }) })] })] })] })) })] }));
}
