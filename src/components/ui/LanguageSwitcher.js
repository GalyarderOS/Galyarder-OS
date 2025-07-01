import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Check } from 'lucide-react';
const languages = [
    { code: 'en', name: 'English' },
    { code: 'id', name: 'Bahasa Indonesia' },
    { code: 'zh', name: 'Mandarin', nativeName: '中文' },
    { code: 'nl', name: 'Dutch' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' }
];
export function LanguageSwitcher() {
    const [isOpen, setIsOpen] = useState(false);
    const [currentLanguage, setCurrentLanguage] = useState(languages[0]);
    const handleLanguageChange = (language) => {
        setCurrentLanguage(language);
        setIsOpen(false);
        // Here you would trigger your i18n locale switch
        // i18n.changeLanguage(language.code)
        localStorage.setItem('galyarderos-language', language.code);
    };
    return (_jsxs("div", { className: "relative", children: [_jsxs("button", { onClick: () => setIsOpen(!isOpen), className: "flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-slate-800/50 transition-colors", "aria-label": "Select language", children: [_jsx(Globe, { className: "w-4 h-4 text-slate-300" }), _jsx("span", { className: "text-slate-300 text-sm", children: currentLanguage.nativeName || currentLanguage.name }), _jsx("span", { className: "text-slate-400", children: "\u25BE" })] }), _jsx(AnimatePresence, { children: isOpen && (_jsxs(_Fragment, { children: [_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, className: "fixed inset-0 z-40", onClick: () => setIsOpen(false) }), _jsx(motion.div, { initial: { opacity: 0, y: -10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 }, transition: { duration: 0.2 }, className: "absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50", children: _jsx("div", { className: "py-1", children: languages.map((language) => (_jsxs("button", { onClick: () => handleLanguageChange(language), className: "flex items-center justify-between w-full px-4 py-2 text-left text-sm text-white hover:bg-slate-700 transition-colors", children: [_jsx("span", { children: language.nativeName ? `${language.name} (${language.nativeName})` : language.name }), currentLanguage.code === language.code && (_jsx(Check, { className: "w-4 h-4 text-blue-400" }))] }, language.code))) }) })] })) })] }));
}
