import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Header } from './Header';
import { Dock } from './Dock';
import { MobileDrawer } from '../nav/MobileDrawer';
import { CommandPalette } from '../CommandPalette';
export function Layout({ children }) {
    const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
    // Listen for keyboard shortcut to open command palette
    useEffect(() => {
        const handleKeyDown = (e) => {
            // Command palette shortcut (Ctrl+K or Cmd+K)
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                setIsCommandPaletteOpen(true);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);
    return (_jsxs("div", { className: "min-h-screen bg-slate-950", children: [_jsx(MobileDrawer, {}), _jsxs("div", { className: "w-full", children: [_jsx(Header, { onOpenCommandPalette: () => setIsCommandPaletteOpen(true) }), _jsx("main", { className: "p-4 lg:p-8 pb-24", children: _jsx("div", { className: "max-w-7xl mx-auto", children: children }) })] }), _jsx(Dock, {}), _jsx(CommandPalette, { isOpen: isCommandPaletteOpen, onClose: () => setIsCommandPaletteOpen(false) })] }));
}
