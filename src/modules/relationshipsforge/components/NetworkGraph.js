import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { Users, Heart, Briefcase, GraduationCap, Plus } from 'lucide-react';
const connections = [
    {
        id: 1,
        name: 'Sarah Chen',
        relationship: 'Close Friend',
        category: 'personal',
        lastContact: '2 days ago',
        strength: 9,
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    },
    {
        id: 2,
        name: 'Marcus Johnson',
        relationship: 'Colleague',
        category: 'professional',
        lastContact: '1 week ago',
        strength: 7,
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    },
    {
        id: 3,
        name: 'Dr. Emily Rodriguez',
        relationship: 'Mentor',
        category: 'professional',
        lastContact: '3 days ago',
        strength: 8,
        avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    },
    {
        id: 4,
        name: 'Alex Kim',
        relationship: 'Study Partner',
        category: 'academic',
        lastContact: '5 days ago',
        strength: 6,
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    }
];
const categoryIcons = {
    personal: { icon: Heart, color: 'text-pink-400' },
    professional: { icon: Briefcase, color: 'text-blue-400' },
    academic: { icon: GraduationCap, color: 'text-purple-400' }
};
export function NetworkGraph() {
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "glass-card rounded-xl p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(Users, { className: "w-5 h-5 text-pink-400" }), _jsx("h3", { className: "text-xl font-semibold text-white", children: "Network Graph" })] }), _jsxs("button", { className: "flex items-center space-x-2 px-3 py-1.5 bg-pink-600 hover:bg-pink-700 rounded-lg transition-colors", children: [_jsx(Plus, { className: "w-4 h-4 text-white" }), _jsx("span", { className: "text-white text-sm", children: "Add Contact" })] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4 mb-6", children: [_jsxs("div", { className: "bg-slate-800/50 rounded-lg p-3 text-center", children: [_jsx("p", { className: "text-lg font-bold text-white", children: connections.length }), _jsx("p", { className: "text-xs text-slate-400", children: "Total Connections" })] }), _jsxs("div", { className: "bg-slate-800/50 rounded-lg p-3 text-center", children: [_jsx("p", { className: "text-lg font-bold text-white", children: Math.round(connections.reduce((sum, c) => sum + c.strength, 0) / connections.length) }), _jsx("p", { className: "text-xs text-slate-400", children: "Avg Strength" })] })] }), _jsx("div", { className: "space-y-4", children: connections.map((connection, index) => {
                    const CategoryIcon = categoryIcons[connection.category].icon;
                    const iconColor = categoryIcons[connection.category].color;
                    return (_jsxs(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.1 + index * 0.1 }, className: "flex items-center space-x-4 p-4 bg-slate-800/30 rounded-lg hover:bg-slate-800/50 transition-colors cursor-pointer", children: [_jsx("img", { src: connection.avatar, alt: connection.name, className: "w-12 h-12 rounded-full ring-2 ring-slate-600" }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center space-x-2 mb-1", children: [_jsx("h4", { className: "text-sm font-medium text-white", children: connection.name }), _jsx(CategoryIcon, { className: `w-3 h-3 ${iconColor}` })] }), _jsx("p", { className: "text-xs text-slate-400 mb-1", children: connection.relationship }), _jsxs("p", { className: "text-xs text-slate-500", children: ["Last contact: ", connection.lastContact] })] }), _jsxs("div", { className: "text-right", children: [_jsxs("div", { className: "flex items-center space-x-1 mb-1", children: [_jsx("span", { className: "text-xs text-slate-400", children: "Strength:" }), _jsxs("span", { className: "text-xs text-pink-400", children: [connection.strength, "/10"] })] }), _jsx("div", { className: "w-16 bg-slate-700 rounded-full h-1", children: _jsx(motion.div, { initial: { width: 0 }, animate: { width: `${connection.strength * 10}%` }, transition: { delay: 0.3 + index * 0.1, duration: 0.8 }, className: "bg-gradient-to-r from-pink-500 to-pink-400 h-1 rounded-full" }) })] })] }, connection.id));
                }) }), _jsx("div", { className: "mt-6 p-3 bg-pink-600/20 rounded-lg", children: _jsx("p", { className: "text-sm text-pink-300", children: "\uD83D\uDC9D Consider reaching out to Alex Kim - it's been 5 days since your last interaction" }) })] }));
}
