import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Grid, PinOff, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useDockStore } from '@/lib/stores/useDockStore';
import { allModules, iconMap } from '@/data/modules';
function DockItem({ module, index, hoveredIndex, onHover, isDragging, onDragStart, onDragOver, onDragEnd, onContextMenu }) {
    const location = useLocation();
    const isActive = location.pathname === module.href;
    const isHovered = hoveredIndex === index;
    const distance = hoveredIndex !== null ? Math.abs(index - hoveredIndex) : 0;
    const scale = hoveredIndex !== null ? Math.max(1, 1.1 - distance * 0.05) : 1;
    const [showTooltip, setShowTooltip] = useState(false);
    const [isLaunching, setIsLaunching] = useState(false);
    // Get the icon component from the icon map
    const IconComponent = iconMap[module.icon] || Grid;
    const handleClick = () => {
        setIsLaunching(true);
        setTimeout(() => setIsLaunching(false), 400);
    };
    const handleDragOver = (e) => {
        e.preventDefault();
        onDragOver(index);
    };
    return (_jsxs("div", { className: "relative", onDragOver: handleDragOver, children: [_jsx(motion.div, { className: "relative", animate: {
                    scale,
                    y: isHovered ? -5 : 0
                }, transition: {
                    type: "spring",
                    stiffness: 400,
                    damping: 25
                }, onMouseEnter: () => {
                    onHover(index);
                    setShowTooltip(true);
                }, onMouseLeave: () => {
                    onHover(null);
                    setShowTooltip(false);
                }, draggable: true, onDragStart: () => onDragStart(index), onDragEnd: onDragEnd, onContextMenu: (e) => onContextMenu(e, module, index), children: _jsx(Link, { to: module.href, onClick: handleClick, children: _jsxs(motion.div, { className: cn("relative w-14 h-14 rounded-2xl flex items-center justify-center cursor-pointer", "bg-gradient-to-br shadow-xl backdrop-blur-sm", "border border-white/10 hover:border-white/20 transition-all duration-200", `bg-gradient-to-br ${module.color}`, isDragging && "opacity-50"), animate: isLaunching ? {
                            scale: [1, 1.1, 0.95, 1],
                        } : {}, transition: { duration: 0.4 }, children: [_jsx(IconComponent, { className: "w-7 h-7 text-white drop-shadow-lg" }), isActive && (_jsx(motion.div, { className: "absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-lg", initial: { scale: 0 }, animate: { scale: 1 }, transition: { delay: 0.2 } }))] }) }) }), _jsx(AnimatePresence, { children: showTooltip && (_jsx(motion.div, { initial: { opacity: 0, y: 10, scale: 0.8 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: 10, scale: 0.8 }, transition: { duration: 0.2 }, className: "absolute bottom-20 left-1/2 transform -translate-x-1/2 z-50", children: _jsxs("div", { className: "bg-black/90 backdrop-blur-md text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap shadow-xl", children: [module.name, module.shortcut && (_jsx("span", { className: "ml-2 text-xs text-slate-400", children: module.shortcut })), _jsx("div", { className: "absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/90" })] }) })) })] }));
}
export function DesktopDock() {
    const location = useLocation();
    const { pinnedModules, pinModule, unpinModule, reorderModules, resetToDefault } = useDockStore();
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [draggedIndex, setDraggedIndex] = useState(null);
    const [dragOverIndex, setDragOverIndex] = useState(null);
    const [contextMenuPosition, setContextMenuPosition] = useState(null);
    const [contextMenuModule, setContextMenuModule] = useState(null);
    const [contextMenuIndex, setContextMenuIndex] = useState(null);
    const dockRef = useRef(null);
    const contextMenuRef = useRef(null);
    // Get the modules that are pinned to the dock
    const dockModules = pinnedModules
        .map(id => allModules.find(m => m.id === id))
        .filter((m) => m !== undefined);
    const handleDragStart = (index) => {
        setDraggedIndex(index);
    };
    const handleDragOver = (index) => {
        if (draggedIndex === null)
            return;
        if (dragOverIndex === index)
            return;
        setDragOverIndex(index);
    };
    const handleDragEnd = () => {
        if (draggedIndex !== null && dragOverIndex !== null && draggedIndex !== dragOverIndex) {
            // Reorder the modules
            const newOrder = [...pinnedModules];
            const [draggedItem] = newOrder.splice(draggedIndex, 1);
            newOrder.splice(dragOverIndex, 0, draggedItem);
            reorderModules(newOrder);
        }
        setDraggedIndex(null);
        setDragOverIndex(null);
    };
    const handleContextMenu = (e, module, index) => {
        e.preventDefault();
        setContextMenuPosition({ x: e.clientX, y: e.clientY });
        setContextMenuModule(module);
        setContextMenuIndex(index);
    };
    const handleUnpinModule = () => {
        if (contextMenuModule) {
            unpinModule(contextMenuModule.id);
            setContextMenuPosition(null);
            setContextMenuModule(null);
        }
    };
    const handleResetDock = () => {
        resetToDefault();
        setContextMenuPosition(null);
        setContextMenuModule(null);
    };
    // Handle keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e) => {
            // Command palette shortcut (Ctrl+K or Cmd+K)
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                console.log('Command palette shortcut pressed');
                // TODO: Open command palette
            }
            // Module shortcuts (Alt+number)
            if (e.altKey && !isNaN(parseInt(e.key)) && parseInt(e.key) > 0) {
                const index = parseInt(e.key) - 1;
                if (index < dockModules.length) {
                    e.preventDefault();
                    const module = dockModules[index];
                    window.location.href = module.href;
                }
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [dockModules]);
    // Close context menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (contextMenuRef.current && !contextMenuRef.current.contains(event.target)) {
                setContextMenuPosition(null);
                setContextMenuModule(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    return (_jsxs("div", { className: "hidden md:flex fixed inset-x-0 bottom-2 z-50 justify-center items-center", children: [_jsx(motion.div, { ref: dockRef, className: "relative", initial: { y: 100, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 30
                }, children: _jsx(motion.div, { className: "flex items-end justify-center space-x-1 px-4 py-2 rounded-2xl", style: {
                        background: 'rgba(255, 255, 255, 0.08)',
                        backdropFilter: 'blur(30px)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        boxShadow: '0 8px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                    }, onMouseLeave: () => setHoveredIndex(null), children: dockModules.map((module, index) => (_jsx(DockItem, { module: module, index: index, hoveredIndex: hoveredIndex, onHover: setHoveredIndex, isDragging: draggedIndex === index, onDragStart: handleDragStart, onDragOver: handleDragOver, onDragEnd: handleDragEnd, onContextMenu: handleContextMenu }, module.id))) }) }), _jsx(AnimatePresence, { children: contextMenuPosition && contextMenuModule && (_jsx(motion.div, { ref: contextMenuRef, initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.9 }, transition: { duration: 0.1 }, className: "fixed z-50 bg-slate-800 border border-slate-700 rounded-lg shadow-xl w-56", style: {
                        left: `${Math.min(contextMenuPosition.x, window.innerWidth - 224)}px`,
                        top: `${Math.min(contextMenuPosition.y, window.innerHeight - 300)}px`
                    }, children: _jsxs("div", { className: "p-2", children: [_jsx("div", { className: "px-3 py-2 text-sm font-medium text-white border-b border-slate-700 mb-1", children: contextMenuModule.name }), contextMenuModule.rightClickMenuItems?.map(item => {
                                const ItemIcon = iconMap[item.icon] || Grid;
                                return (_jsxs("button", { className: "w-full flex items-center space-x-2 px-3 py-2 text-left text-sm text-white hover:bg-slate-700 rounded-md", children: [_jsx(ItemIcon, { className: "w-4 h-4" }), _jsx("span", { children: item.label }), item.shortcut && (_jsx("span", { className: "ml-auto text-xs text-slate-400", children: item.shortcut }))] }, item.id));
                            }), _jsx("div", { className: "h-px bg-slate-700 my-1" }), _jsxs("button", { onClick: handleUnpinModule, className: "w-full flex items-center space-x-2 px-3 py-2 text-left text-sm text-white hover:bg-red-600/20 hover:text-red-400 rounded-md", children: [_jsx(PinOff, { className: "w-4 h-4" }), _jsx("span", { children: "Remove from Dock" })] }), _jsxs("button", { onClick: handleResetDock, className: "w-full flex items-center space-x-2 px-3 py-2 text-left text-sm text-white hover:bg-slate-700 rounded-md", children: [_jsx(RefreshCw, { className: "w-4 h-4" }), _jsx("span", { children: "Reset Dock to Default" })] }), _jsxs(Link, { to: "/app/app-drawer", className: "w-full flex items-center space-x-2 px-3 py-2 text-left text-sm text-white hover:bg-slate-700 rounded-md", onClick: () => setContextMenuPosition(null), children: [_jsx(Grid, { className: "w-4 h-4" }), _jsx("span", { children: "Open App Drawer" })] })] }) })) })] }));
}
