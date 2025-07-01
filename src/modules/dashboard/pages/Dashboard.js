import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { useAppStore } from '../../../lib/store';
import { getInitials, getAvatarGradient } from '../../../lib/utils';
import { AIAssistantTerminal } from '../../aiassistant/components/AIAssistantTerminal';
import { LifeAnalyticsGrid } from '../components/LifeAnalyticsGrid';
import { MasterByDesignSection } from '../components/MasterByDesignSection';
export function Dashboard() {
    const { user } = useAppStore();
    const userInitials = getInitials(user?.name || 'User');
    const userGradient = getAvatarGradient(user?.name || 'User');
    return (_jsx("div", { className: "min-h-screen flex flex-col items-center justify-center px-4 py-8", children: _jsxs("div", { className: "w-full max-w-7xl space-y-12", children: [_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "text-center", children: _jsx("h1", { className: "text-4xl font-medium text-slate-300 mb-8", children: "Welcome Back" }) }), _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.2 }, className: "text-center space-y-6", children: [_jsx("div", { className: "flex justify-center mb-6", children: user?.avatar ? (_jsx("img", { src: user.avatar, alt: user.name, className: "w-20 h-20 rounded-2xl object-cover shadow-2xl ring-4 ring-purple-500/30" })) : (_jsx("div", { className: "w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl", children: _jsx("span", { className: "text-white font-bold text-2xl", children: "G" }) })) }), _jsx("h2", { className: "text-5xl font-light text-white tracking-wide", children: user?.name?.toLowerCase() || 'galyarder' })] }), _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.4 }, className: "flex justify-center", children: _jsx(AIAssistantTerminal, {}) }), _jsx(MasterByDesignSection, {}), _jsx(LifeAnalyticsGrid, {})] }) }));
}
