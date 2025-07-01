import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { allModules } from '../../data/modules';
export function useKeyboardShortcuts() {
    const navigate = useNavigate();
    useEffect(() => {
        const handleKeyDown = (e) => {
            // Don't trigger shortcuts when typing in input fields
            if (document.activeElement?.tagName === 'INPUT' ||
                document.activeElement?.tagName === 'TEXTAREA') {
                return;
            }
            // Alt + number shortcuts for dock items
            if (e.altKey && !isNaN(parseInt(e.key)) && parseInt(e.key) > 0) {
                // Get dock items from localStorage
                const savedItems = localStorage.getItem('dock-items');
                const dockItems = savedItems ? JSON.parse(savedItems) : [];
                const index = parseInt(e.key) - 1;
                if (index < dockItems.length) {
                    e.preventDefault();
                    navigate(dockItems[index].href);
                }
            }
            // Module-specific shortcuts
            allModules.forEach(module => {
                if (module.shortcut) {
                    const parts = module.shortcut.split('+');
                    const key = parts[parts.length - 1].toLowerCase();
                    const needsAlt = parts.includes('Alt');
                    const needsCtrl = parts.includes('Ctrl');
                    const needsShift = parts.includes('Shift');
                    if (e.key.toLowerCase() === key &&
                        e.altKey === needsAlt &&
                        e.ctrlKey === needsCtrl &&
                        e.shiftKey === needsShift) {
                        e.preventDefault();
                        if (module.href !== '#') {
                            navigate(module.href);
                        }
                    }
                }
            });
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [navigate]);
}
