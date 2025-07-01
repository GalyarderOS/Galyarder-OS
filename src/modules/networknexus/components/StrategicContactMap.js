import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { Users, Star, TrendingUp, Plus } from 'lucide-react';
import { useNetworkStore } from '../store/networkStore';
export function StrategicContactMap() {
    const { contacts, interactions } = useNetworkStore();
    const getContactInteractionCount = (contactId) => {
        return interactions.filter(i => i.contactId === contactId).length;
    };
    const getLastInteractionDate = (contactId) => {
        const contactInteractions = interactions
            .filter(i => i.contactId === contactId)
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        return contactInteractions.length > 0 ? contactInteractions[0].date : null;
    };
    const getDaysSinceLastContact = (contactId) => {
        const lastDate = getLastInteractionDate(contactId);
        if (!lastDate)
            return Infinity;
        const daysDiff = Math.floor((new Date().getTime() - new Date(lastDate).getTime()) / (1000 * 60 * 60 * 24));
        return daysDiff;
    };
    const categoryColors = {
        professional: 'text-blue-400',
        personal: 'text-emerald-400',
        mentor: 'text-purple-400',
        client: 'text-amber-400',
        vendor: 'text-pink-400'
    };
    const relationshipColors = {
        strong: 'border-emerald-400 bg-emerald-400/10',
        medium: 'border-amber-400 bg-amber-400/10',
        weak: 'border-slate-400 bg-slate-400/10'
    };
    const strongContacts = contacts.filter(c => c.relationship === 'strong');
    const needsAttention = contacts.filter(c => getDaysSinceLastContact(c.id) > 30);
    const recentlyContacted = contacts.filter(c => getDaysSinceLastContact(c.id) <= 7);
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.2 }, className: "glass-card rounded-xl p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(Users, { className: "w-5 h-5 text-purple-400" }), _jsx("h3", { className: "text-xl font-semibold text-white", children: "Strategic Contact Map" })] }), _jsxs("button", { className: "flex items-center space-x-2 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors", children: [_jsx(Plus, { className: "w-4 h-4 text-white" }), _jsx("span", { className: "text-white text-sm", children: "Add Contact" })] })] }), _jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-6", children: [_jsxs("div", { className: "bg-slate-800/50 rounded-lg p-4 text-center", children: [_jsx(Users, { className: "w-5 h-5 text-blue-400 mx-auto mb-2" }), _jsx("p", { className: "text-lg font-bold text-white", children: contacts.length }), _jsx("p", { className: "text-xs text-slate-400", children: "Total Contacts" })] }), _jsxs("div", { className: "bg-slate-800/50 rounded-lg p-4 text-center", children: [_jsx(Star, { className: "w-5 h-5 text-emerald-400 mx-auto mb-2" }), _jsx("p", { className: "text-lg font-bold text-white", children: strongContacts.length }), _jsx("p", { className: "text-xs text-slate-400", children: "Strong Relationships" })] }), _jsxs("div", { className: "bg-slate-800/50 rounded-lg p-4 text-center", children: [_jsx(TrendingUp, { className: "w-5 h-5 text-amber-400 mx-auto mb-2" }), _jsx("p", { className: "text-lg font-bold text-white", children: recentlyContacted.length }), _jsx("p", { className: "text-xs text-slate-400", children: "Recent Contact" })] }), _jsxs("div", { className: "bg-slate-800/50 rounded-lg p-4 text-center", children: [_jsx("div", { className: "w-5 h-5 bg-red-400 rounded-full mx-auto mb-2" }), _jsx("p", { className: "text-lg font-bold text-white", children: needsAttention.length }), _jsx("p", { className: "text-xs text-slate-400", children: "Needs Attention" })] })] }), _jsxs("div", { className: "mb-6", children: [_jsx("h4", { className: "text-sm font-medium text-white mb-4", children: "Key Contacts" }), _jsx("div", { className: "space-y-3", children: strongContacts.slice(0, 5).map((contact, index) => (_jsx(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.1 + index * 0.1 }, className: `p-4 border rounded-lg ${relationshipColors[contact.relationship]}`, children: _jsxs("div", { className: "flex items-center space-x-4", children: [contact.avatar ? (_jsx("img", { src: contact.avatar, alt: contact.name, className: "w-12 h-12 rounded-full ring-2 ring-slate-600" })) : (_jsx("div", { className: "w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center", children: _jsx("span", { className: "text-white font-bold text-sm", children: contact.name.split(' ').map(n => n[0]).join('') }) })), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center justify-between mb-1", children: [_jsx("h5", { className: "text-sm font-medium text-white", children: contact.name }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { className: `text-xs ${categoryColors[contact.category]}`, children: contact.category }), _jsxs("span", { className: "text-xs text-slate-400", children: [getContactInteractionCount(contact.id), " interactions"] })] })] }), contact.position && contact.company && (_jsxs("p", { className: "text-xs text-slate-400 mb-1", children: [contact.position, " at ", contact.company] })), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("p", { className: "text-xs text-slate-400", children: ["Last contact: ", getDaysSinceLastContact(contact.id) === Infinity
                                                                ? 'Never'
                                                                : `${getDaysSinceLastContact(contact.id)} days ago`] }), _jsx("div", { className: "flex items-center space-x-1", children: contact.tags.slice(0, 2).map(tag => (_jsx("span", { className: "text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded", children: tag }, tag))) })] })] })] }) }, contact.id))) })] }), needsAttention.length > 0 && (_jsxs("div", { className: "mb-6", children: [_jsx("h4", { className: "text-sm font-medium text-red-400 mb-4", children: "Contacts Needing Attention" }), _jsx("div", { className: "space-y-2", children: needsAttention.slice(0, 3).map((contact, index) => (_jsxs(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.1 + index * 0.1 }, className: "flex items-center justify-between p-3 bg-red-600/10 border border-red-600/20 rounded-lg", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [contact.avatar ? (_jsx("img", { src: contact.avatar, alt: contact.name, className: "w-8 h-8 rounded-full" })) : (_jsx("div", { className: "w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center", children: _jsx("span", { className: "text-white font-bold text-xs", children: contact.name.split(' ').map(n => n[0]).join('') }) })), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-white", children: contact.name }), _jsxs("p", { className: "text-xs text-slate-400", children: [getDaysSinceLastContact(contact.id), " days since last contact"] })] })] }), _jsx("button", { className: "text-xs text-red-400 hover:text-red-300 transition-colors", children: "Reach out" })] }, contact.id))) })] })), _jsxs("div", { children: [_jsx("h4", { className: "text-sm font-medium text-white mb-4", children: "Network Breakdown" }), _jsx("div", { className: "grid grid-cols-2 gap-2", children: Object.entries(categoryColors).map(([category, color]) => {
                            const count = contacts.filter(c => c.category === category).length;
                            return (_jsxs("div", { className: "flex items-center justify-between p-2 bg-slate-800/30 rounded-lg", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { className: `w-3 h-3 rounded-full bg-current ${color}` }), _jsx("span", { className: "text-xs text-slate-300 capitalize", children: category })] }), _jsx("span", { className: "text-xs text-white font-medium", children: count })] }, category));
                        }) })] }), _jsx("div", { className: "mt-6 p-3 bg-purple-600/20 rounded-lg", children: _jsx("p", { className: "text-sm text-purple-300", children: "\uD83C\uDFAF Focus on strengthening relationships with contacts you haven't reached out to in 30+ days." }) })] }));
}
