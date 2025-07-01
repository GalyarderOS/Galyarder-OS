import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { Users, Mail, Phone, Calendar, Plus } from 'lucide-react';
import { useOpsCenterStore } from '../store/opsCenterStore';
export function ClientMatrix() {
    const { clients, projects } = useOpsCenterStore();
    const getClientStatusColor = (status) => {
        switch (status) {
            case 'active': return 'text-emerald-400';
            case 'inactive': return 'text-slate-400';
            case 'prospect': return 'text-amber-400';
            default: return 'text-slate-400';
        }
    };
    const getClientProjects = (clientId) => {
        return projects.filter(project => project.clients.includes(clientId));
    };
    const getDaysSinceContact = (lastContact) => {
        const lastDate = new Date(lastContact);
        const today = new Date();
        const diffTime = Math.abs(today.getTime() - lastDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.1 }, className: "glass-card rounded-xl p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(Users, { className: "w-5 h-5 text-purple-400" }), _jsx("h3", { className: "text-xl font-semibold text-white", children: "Client Matrix" })] }), _jsxs("button", { className: "flex items-center space-x-2 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors", children: [_jsx(Plus, { className: "w-4 h-4 text-white" }), _jsx("span", { className: "text-white text-sm", children: "Add Client" })] })] }), _jsxs("div", { className: "grid grid-cols-3 gap-4 mb-6", children: [_jsxs("div", { className: "bg-slate-800/50 rounded-lg p-4 text-center", children: [_jsx("p", { className: "text-lg font-bold text-white", children: clients.filter(c => c.status === 'active').length }), _jsx("p", { className: "text-xs text-slate-400", children: "Active Clients" })] }), _jsxs("div", { className: "bg-slate-800/50 rounded-lg p-4 text-center", children: [_jsx("p", { className: "text-lg font-bold text-white", children: clients.filter(c => c.status === 'prospect').length }), _jsx("p", { className: "text-xs text-slate-400", children: "Prospects" })] }), _jsxs("div", { className: "bg-slate-800/50 rounded-lg p-4 text-center", children: [_jsx("p", { className: "text-lg font-bold text-white", children: clients.reduce((sum, client) => sum + getClientProjects(client.id).length, 0) }), _jsx("p", { className: "text-xs text-slate-400", children: "Total Projects" })] })] }), _jsx("div", { className: "space-y-4", children: clients.map((client, index) => {
                    const clientProjects = getClientProjects(client.id);
                    const daysSinceContact = getDaysSinceContact(client.lastContact);
                    return (_jsxs(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.1 + index * 0.1 }, className: "p-4 bg-slate-800/30 rounded-lg hover:bg-slate-800/50 transition-colors cursor-pointer", children: [_jsxs("div", { className: "flex items-start justify-between mb-3", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex items-center space-x-2 mb-1", children: [_jsx("h4", { className: "text-sm font-medium text-white", children: client.name }), _jsx("span", { className: `text-xs ${getClientStatusColor(client.status)}`, children: client.status })] }), _jsx("p", { className: "text-xs text-slate-400", children: client.company })] }), _jsx("div", { className: "text-right", children: _jsxs("div", { className: "flex items-center space-x-2 text-xs text-slate-400", children: [_jsx(Calendar, { className: "w-3 h-3" }), _jsxs("span", { children: ["Last contact: ", daysSinceContact, " days ago"] })] }) })] }), _jsxs("div", { className: "grid grid-cols-2 gap-3 mb-3", children: [_jsxs("div", { className: "flex items-center space-x-2 text-xs", children: [_jsx(Mail, { className: "w-3 h-3 text-blue-400" }), _jsx("span", { className: "text-slate-300", children: client.email })] }), client.phone && (_jsxs("div", { className: "flex items-center space-x-2 text-xs", children: [_jsx(Phone, { className: "w-3 h-3 text-emerald-400" }), _jsx("span", { className: "text-slate-300", children: client.phone })] }))] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-2 text-xs text-slate-400", children: [_jsxs("span", { children: [clientProjects.length, " projects"] }), client.nextContact && (_jsxs("div", { className: "flex items-center space-x-1", children: [_jsx(Calendar, { className: "w-3 h-3 text-amber-400" }), _jsxs("span", { children: ["Next contact: ", new Date(client.nextContact).toLocaleDateString()] })] }))] }), _jsx("div", { className: "flex flex-wrap gap-1", children: client.tags.slice(0, 2).map(tag => (_jsx("span", { className: "text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded", children: tag }, tag))) })] })] }, client.id));
                }) }), _jsx("div", { className: "mt-6 p-3 bg-purple-600/20 rounded-lg", children: _jsx("p", { className: "text-sm text-purple-300", children: "\uD83E\uDD1D 2 clients need follow-up this week. Schedule time for relationship maintenance." }) })] }));
}
