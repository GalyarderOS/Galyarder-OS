import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Gauge as Vault, Edit, Plus, Star } from 'lucide-react';
const missions = [
    {
        id: 1,
        title: 'Personal Mission',
        statement: 'To live authentically, continuously learn and grow, and positively impact the lives of those around me through kindness, mentorship, and meaningful relationships.',
        category: 'personal',
        lastUpdated: '2024-01-15'
    },
    {
        id: 2,
        title: 'Professional Mission',
        statement: 'To create innovative technology solutions that solve real-world problems while building and leading teams that foster creativity, inclusion, and professional growth.',
        category: 'professional',
        lastUpdated: '2024-01-20'
    },
    {
        id: 3,
        title: 'Life Purpose',
        statement: 'To bridge the gap between technology and human potential, empowering others to achieve their goals while leaving the world more connected and compassionate than I found it.',
        category: 'purpose',
        lastUpdated: '2024-02-01'
    }
];
const categoryColors = {
    personal: 'border-pink-400 bg-pink-400/10',
    professional: 'border-blue-400 bg-blue-400/10',
    purpose: 'border-amber-400 bg-amber-400/10'
};
export function MissionVault() {
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingMission, setEditingMission] = useState(null);
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.1 }, className: "glass-card rounded-xl p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(Vault, { className: "w-5 h-5 text-amber-400" }), _jsx("h3", { className: "text-xl font-semibold text-white", children: "Mission Vault" })] }), _jsxs("button", { onClick: () => setShowAddForm(true), className: "flex items-center space-x-2 px-3 py-1.5 bg-amber-600 hover:bg-amber-700 rounded-lg transition-colors", children: [_jsx(Plus, { className: "w-4 h-4 text-white" }), _jsx("span", { className: "text-white text-sm", children: "Add Mission" })] })] }), _jsx("div", { className: "space-y-4", children: missions.map((mission, index) => (_jsxs(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.1 + index * 0.1 }, className: `p-4 border rounded-lg ${categoryColors[mission.category]}`, children: [_jsxs("div", { className: "flex items-start justify-between mb-3", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Star, { className: "w-4 h-4 text-amber-400" }), _jsx("h4", { className: "text-sm font-medium text-white", children: mission.title })] }), _jsx("button", { onClick: () => setEditingMission(mission.id), className: "p-1 hover:bg-slate-700 rounded transition-colors", children: _jsx(Edit, { className: "w-3 h-3 text-slate-400 hover:text-white" }) })] }), _jsx("p", { className: "text-sm text-slate-300 leading-relaxed mb-3", children: mission.statement }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-xs text-slate-400 capitalize", children: mission.category }), _jsxs("span", { className: "text-xs text-slate-500", children: ["Updated: ", mission.lastUpdated] })] })] }, mission.id))) }), _jsxs("div", { className: "mt-6 p-4 bg-slate-800/50 rounded-lg", children: [_jsx("h4", { className: "text-sm font-medium text-white mb-2", children: "Mission Alignment Check" }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center justify-between text-sm", children: [_jsx("span", { className: "text-slate-300", children: "Personal-Professional Alignment" }), _jsx("span", { className: "text-emerald-400", children: "92%" })] }), _jsx("div", { className: "bg-slate-700 rounded-full h-2", children: _jsx(motion.div, { initial: { width: 0 }, animate: { width: '92%' }, transition: { delay: 0.5, duration: 0.8 }, className: "bg-gradient-to-r from-emerald-500 to-emerald-400 h-2 rounded-full" }) })] })] }), _jsx("div", { className: "mt-4 p-3 bg-amber-600/20 rounded-lg", children: _jsx("p", { className: "text-sm text-amber-300", children: "\uD83C\uDFAF Your missions are well-aligned! Consider reviewing them quarterly to ensure they evolve with your growth." }) }), (showAddForm || editingMission) && (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50", onClick: () => {
                    setShowAddForm(false);
                    setEditingMission(null);
                }, children: _jsxs("div", { className: "glass-card rounded-xl p-6 w-96 m-4", onClick: (e) => e.stopPropagation(), children: [_jsx("h4", { className: "text-lg font-semibold text-white mb-4", children: editingMission ? 'Edit Mission' : 'Add New Mission' }), _jsxs("form", { className: "space-y-4", children: [_jsx("input", { type: "text", placeholder: "Mission title", className: "w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400" }), _jsxs("select", { className: "w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white", children: [_jsx("option", { value: "", children: "Select category" }), _jsx("option", { value: "personal", children: "Personal" }), _jsx("option", { value: "professional", children: "Professional" }), _jsx("option", { value: "purpose", children: "Life Purpose" })] }), _jsx("textarea", { placeholder: "Write your mission statement...", className: "w-full h-32 p-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 resize-none" }), _jsxs("div", { className: "flex space-x-3", children: [_jsx("button", { type: "button", onClick: () => {
                                                setShowAddForm(false);
                                                setEditingMission(null);
                                            }, className: "flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors", children: "Cancel" }), _jsxs("button", { type: "submit", className: "flex-1 px-4 py-2 bg-amber-600 hover:bg-amber-700 rounded-lg text-white transition-colors", children: [editingMission ? 'Update' : 'Save', " Mission"] })] })] })] }) }))] }));
}
