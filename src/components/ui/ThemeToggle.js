import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
export function ThemeToggle() {
    const [theme, setTheme] = useState('dark');
    // Initialize theme from localStorage or system preference
    useEffect(() => {
        const savedTheme = localStorage.getItem('galyarderos-theme');
        if (savedTheme) {
            setTheme(savedTheme);
        }
        else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme('dark');
        }
        else {
            setTheme('light');
        }
    }, []);
    // Apply theme changes to document
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        }
        else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('galyarderos-theme', theme);
    }, [theme]);
    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
    };
    return (_jsxs("button", { onClick: toggleTheme, className: "flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-slate-800/50 transition-colors", "aria-label": theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode', children: [_jsx(motion.div, { initial: { rotate: 0 }, animate: { rotate: theme === 'dark' ? 0 : 180 }, transition: { duration: 0.5, type: 'spring' }, className: "relative w-5 h-5", children: theme === 'dark' ? (_jsx(Moon, { className: "w-5 h-5 text-slate-300 absolute inset-0" })) : (_jsx(Sun, { className: "w-5 h-5 text-slate-300 absolute inset-0" })) }), _jsx("span", { className: "text-slate-300 text-sm hidden sm:inline", children: theme === 'dark' ? 'Dark' : 'Light' })] }));
}
