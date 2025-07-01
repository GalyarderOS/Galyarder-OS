import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { Activity, Eye, Edit, Plus, Trash2, Download, LogIn, LogOut } from 'lucide-react';
import { usePrivacyStore } from '../store/privacyStore';
export function AccessLogs() {
    const { accessLogs, vaultItems } = usePrivacyStore();
    const getActionIcon = (action) => {
        const icons = {
            view: Eye,
            edit: Edit,
            create: Plus,
            delete: Trash2,
            export: Download,
            login: LogIn,
            logout: LogOut
        };
        return icons[action] || Activity;
    };
    const getActionColor = (action) => {
        const colors = {
            view: 'text-blue-400',
            edit: 'text-amber-400',
            create: 'text-emerald-400',
            delete: 'text-red-400',
            export: 'text-purple-400',
            login: 'text-emerald-400',
            logout: 'text-slate-400'
        };
        return colors[action] || 'text-slate-400';
    };
    const getItemName = (itemId) => {
        if (!itemId)
            return 'System';
        const item = vaultItems.find(i => i.id === itemId);
        return item?.name || 'Unknown Item';
    };
    const getLocationFlag = (location) => {
        if (!location || location === 'Unknown')
            return '🌍';
        if (location.includes('US') || location.includes('United States'))
            return '🇺🇸';
        if (location.includes('CA') || location.includes('Canada'))
            return '🇨🇦';
        if (location.includes('UK') || location.includes('United Kingdom'))
            return '🇬🇧';
        return '🌍';
    };
    const todayLogs = accessLogs.filter(log => {
        const logDate = new Date(log.timestamp).toDateString();
        const today = new Date().toDateString();
        return logDate === today;
    });
    const thisWeekLogs = accessLogs.filter(log => {
        const logDate = new Date(log.timestamp);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return logDate >= weekAgo;
    });
    const failedAttempts = accessLogs.filter(log => !log.success);
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.2 }, className: "glass-card rounded-xl p-6", children: [_jsxs("div", { className: "flex items-center space-x-3 mb-6", children: [_jsx(Activity, { className: "w-5 h-5 text-cyan-400" }), _jsx("h3", { className: "text-xl font-semibold text-white", children: "Access Logs" })] }), _jsxs("div", { className: "grid grid-cols-3 gap-4 mb-6", children: [_jsxs("div", { className: "bg-slate-800/50 rounded-lg p-4 text-center", children: [_jsx(Activity, { className: "w-5 h-5 text-blue-400 mx-auto mb-2" }), _jsx("p", { className: "text-lg font-bold text-white", children: todayLogs.length }), _jsx("p", { className: "text-xs text-slate-400", children: "Today" })] }), _jsxs("div", { className: "bg-slate-800/50 rounded-lg p-4 text-center", children: [_jsx("div", { className: "w-5 h-5 bg-emerald-400 rounded-full mx-auto mb-2" }), _jsx("p", { className: "text-lg font-bold text-white", children: thisWeekLogs.length }), _jsx("p", { className: "text-xs text-slate-400", children: "This Week" })] }), _jsxs("div", { className: "bg-slate-800/50 rounded-lg p-4 text-center", children: [_jsx("div", { className: "w-5 h-5 bg-red-400 rounded-full mx-auto mb-2" }), _jsx("p", { className: "text-lg font-bold text-white", children: failedAttempts.length }), _jsx("p", { className: "text-xs text-slate-400", children: "Failed Attempts" })] })] }), failedAttempts.length > 0 && (_jsxs("div", { className: "mb-6 p-4 bg-red-600/20 border border-red-600/30 rounded-lg", children: [_jsxs("div", { className: "flex items-center space-x-2 mb-2", children: [_jsx("div", { className: "w-4 h-4 bg-red-400 rounded-full" }), _jsx("h4", { className: "text-sm font-medium text-red-300", children: "Failed Access Attempts" })] }), _jsx("div", { className: "space-y-2", children: failedAttempts.slice(0, 3).map(log => (_jsxs("div", { className: "flex items-center justify-between text-sm", children: [_jsxs("span", { className: "text-red-200", children: [log.action, " on ", getItemName(log.itemId)] }), _jsx("span", { className: "text-red-400", children: new Date(log.timestamp).toLocaleString() })] }, log.id))) })] })), _jsxs("div", { className: "space-y-4", children: [_jsx("h4", { className: "text-sm font-medium text-white", children: "Recent Activity" }), accessLogs.slice(0, 10).map((log, index) => {
                        const ActionIcon = getActionIcon(log.action);
                        const actionColor = getActionColor(log.action);
                        return (_jsx(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.1 + index * 0.05 }, className: `p-4 rounded-lg ${log.success ? 'bg-slate-800/30' : 'bg-red-600/10 border border-red-600/20'}`, children: _jsxs("div", { className: "flex items-start space-x-3", children: [_jsx("div", { className: `p-2 rounded-lg ${log.success ? 'bg-slate-700/50' : 'bg-red-600/20'}`, children: _jsx(ActionIcon, { className: `w-4 h-4 ${log.success ? actionColor : 'text-red-400'}` }) }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { className: "text-sm font-medium text-white capitalize", children: log.action }), log.itemId && (_jsxs(_Fragment, { children: [_jsx("span", { className: "text-slate-400", children: "\u2022" }), _jsx("span", { className: "text-sm text-slate-300", children: getItemName(log.itemId) })] }))] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { className: "text-xs text-slate-400", children: new Date(log.timestamp).toLocaleString() }), !log.success && (_jsx("span", { className: "text-xs text-red-400 font-medium", children: "FAILED" }))] })] }), _jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-slate-400", children: [_jsxs("div", { children: [_jsx("span", { className: "block", children: "IP Address:" }), _jsx("span", { className: "text-white", children: log.ipAddress })] }), _jsxs("div", { children: [_jsx("span", { className: "block", children: "Location:" }), _jsxs("div", { className: "flex items-center space-x-1", children: [_jsx("span", { children: getLocationFlag(log.location) }), _jsx("span", { className: "text-white", children: log.location || 'Unknown' })] })] }), _jsxs("div", { className: "col-span-2", children: [_jsx("span", { className: "block", children: "User Agent:" }), _jsxs("span", { className: "text-white truncate block", children: [log.userAgent.split(' ')[0], " ", log.userAgent.includes('Mac') ? '(macOS)' :
                                                                        log.userAgent.includes('Windows') ? '(Windows)' :
                                                                            log.userAgent.includes('Linux') ? '(Linux)' : ''] })] })] }), log.details && (_jsxs("div", { className: "mt-2", children: [_jsx("span", { className: "text-xs text-slate-400 block", children: "Details:" }), _jsx("span", { className: "text-xs text-slate-300", children: log.details })] }))] })] }) }, log.id));
                    })] }), _jsxs("div", { className: "mt-6 p-4 bg-cyan-600/20 rounded-lg", children: [_jsx("h4", { className: "text-sm font-medium text-cyan-300 mb-2", children: "Log Retention Policy" }), _jsxs("div", { className: "text-sm text-cyan-200 space-y-1", children: [_jsx("p", { children: "\u2022 Access logs are retained for 90 days" }), _jsx("p", { children: "\u2022 Failed attempts are flagged for security review" }), _jsx("p", { children: "\u2022 Logs are encrypted and stored securely" }), _jsx("p", { children: "\u2022 Export logs for compliance or analysis" })] })] }), _jsx("div", { className: "mt-4 p-3 bg-cyan-600/20 rounded-lg", children: _jsxs("p", { className: "text-sm text-cyan-300", children: ["\uD83D\uDCCA ", accessLogs.length, " access events logged. Monitor for unusual patterns or unauthorized access."] }) })] }));
}
