import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { Plus, MessageCircle, Phone, Mail, Calendar, MapPin } from 'lucide-react';
import { useNetworkStore } from '../store/networkStore';
export function InteractionLog() {
    const { interactions, contacts } = useNetworkStore();
    const getContactName = (contactId) => {
        const contact = contacts.find(c => c.id === contactId);
        return contact?.name || 'Unknown Contact';
    };
    const typeIcons = {
        meeting: Calendar,
        call: Phone,
        email: Mail,
        message: MessageCircle,
        event: Calendar,
        other: MessageCircle
    };
    const outcomeColors = {
        positive: 'text-emerald-400',
        neutral: 'text-slate-400',
        negative: 'text-red-400'
    };
    const recentInteractions = interactions
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 10);
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "glass-card rounded-xl p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(MessageCircle, { className: "w-5 h-5 text-blue-400" }), _jsx("h3", { className: "text-xl font-semibold text-white", children: "Interaction Log" })] }), _jsxs("button", { className: "flex items-center space-x-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors", children: [_jsx(Plus, { className: "w-4 h-4 text-white" }), _jsx("span", { className: "text-white text-sm", children: "Log Interaction" })] })] }), _jsxs("div", { className: "grid grid-cols-3 gap-4 mb-6", children: [_jsxs("div", { className: "bg-slate-800/50 rounded-lg p-4 text-center", children: [_jsx("p", { className: "text-lg font-bold text-white", children: interactions.length }), _jsx("p", { className: "text-xs text-slate-400", children: "Total Interactions" })] }), _jsxs("div", { className: "bg-slate-800/50 rounded-lg p-4 text-center", children: [_jsx("p", { className: "text-lg font-bold text-white", children: interactions.filter(i => {
                                    const weekAgo = new Date();
                                    weekAgo.setDate(weekAgo.getDate() - 7);
                                    return new Date(i.date) >= weekAgo;
                                }).length }), _jsx("p", { className: "text-xs text-slate-400", children: "This Week" })] }), _jsxs("div", { className: "bg-slate-800/50 rounded-lg p-4 text-center", children: [_jsxs("p", { className: "text-lg font-bold text-white", children: [Math.round((interactions.filter(i => i.outcome === 'positive').length / interactions.length) * 100), "%"] }), _jsx("p", { className: "text-xs text-slate-400", children: "Positive" })] })] }), _jsxs("div", { className: "space-y-4", children: [_jsx("h4", { className: "text-sm font-medium text-white", children: "Recent Interactions" }), recentInteractions.map((interaction, index) => {
                        const TypeIcon = typeIcons[interaction.type];
                        return (_jsx(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.1 + index * 0.1 }, className: "p-4 bg-slate-800/30 rounded-lg hover:bg-slate-800/50 transition-colors", children: _jsxs("div", { className: "flex items-start space-x-3", children: [_jsx("div", { className: "p-2 bg-slate-700/50 rounded-lg", children: _jsx(TypeIcon, { className: "w-4 h-4 text-blue-400" }) }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("h5", { className: "text-sm font-medium text-white", children: interaction.subject }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { className: `text-xs ${outcomeColors[interaction.outcome]}`, children: interaction.outcome }), _jsx("span", { className: "text-xs text-slate-400", children: new Date(interaction.date).toLocaleDateString() })] })] }), _jsxs("p", { className: "text-xs text-slate-400 mb-2", children: ["with ", getContactName(interaction.contactId)] }), _jsx("p", { className: "text-sm text-slate-300 mb-2", children: interaction.description }), _jsxs("div", { className: "flex items-center space-x-4 text-xs text-slate-400", children: [_jsx("span", { className: "capitalize", children: interaction.type }), interaction.duration && (_jsxs("span", { children: [interaction.duration, " min"] })), interaction.location && (_jsxs("div", { className: "flex items-center space-x-1", children: [_jsx(MapPin, { className: "w-3 h-3" }), _jsx("span", { children: interaction.location })] })), interaction.followUpRequired && (_jsx("span", { className: "text-amber-400", children: "Follow-up required" }))] })] })] }) }, interaction.id));
                    })] }), _jsxs("div", { className: "mt-6", children: [_jsx("h4", { className: "text-sm font-medium text-white mb-4", children: "Interaction Types" }), _jsx("div", { className: "grid grid-cols-2 gap-2", children: Object.entries(typeIcons).map(([type, Icon]) => {
                            const count = interactions.filter(i => i.type === type).length;
                            return (_jsxs("div", { className: "flex items-center justify-between p-2 bg-slate-800/30 rounded-lg", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Icon, { className: "w-3 h-3 text-blue-400" }), _jsx("span", { className: "text-xs text-slate-300 capitalize", children: type })] }), _jsx("span", { className: "text-xs text-white font-medium", children: count })] }, type));
                        }) })] }), _jsx("div", { className: "mt-6 p-3 bg-blue-600/20 rounded-lg", children: _jsxs("p", { className: "text-sm text-blue-300", children: ["\uD83D\uDCCA You're averaging ", Math.round(interactions.length / 4), " interactions per week. Great networking momentum!"] }) })] }));
}
