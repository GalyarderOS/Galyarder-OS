import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { Shield, Key, Eye, AlertTriangle, Plus, Lock } from 'lucide-react';
import { usePrivacyStore } from '../store/privacyStore';
export function VaultDashboard() {
    const { vaultItems, securityKeys, securityAudits, privacySettings } = usePrivacyStore();
    const getSecurityScore = () => {
        const latestAudit = securityAudits[0];
        return latestAudit?.score || 85;
    };
    const getVulnerabilities = () => {
        return securityAudits
            .flatMap(audit => audit.findings)
            .filter(finding => finding.severity === 'high' || finding.severity === 'critical')
            .length;
    };
    const getExpiringSoon = () => {
        const thirtyDaysFromNow = new Date();
        thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
        return securityKeys.filter(key => key.expiryDate && new Date(key.expiryDate) <= thirtyDaysFromNow).length;
    };
    const typeIcons = {
        password: '🔑',
        document: '📄',
        key: '🗝️',
        note: '📝',
        identity: '👤',
        payment: '💳'
    };
    const statusColors = {
        active: 'text-emerald-400',
        expired: 'text-red-400',
        revoked: 'text-amber-400'
    };
    const securityScore = getSecurityScore();
    const vulnerabilities = getVulnerabilities();
    const expiringSoon = getExpiringSoon();
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "glass-card rounded-xl p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(Shield, { className: "w-5 h-5 text-blue-400" }), _jsx("h3", { className: "text-xl font-semibold text-white", children: "Vault Dashboard" })] }), _jsxs("button", { className: "flex items-center space-x-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors", children: [_jsx(Plus, { className: "w-4 h-4 text-white" }), _jsx("span", { className: "text-white text-sm", children: "Add Item" })] })] }), _jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-6", children: [_jsxs("div", { className: "bg-slate-800/50 rounded-lg p-4 text-center", children: [_jsx(Shield, { className: `w-5 h-5 mx-auto mb-2 ${securityScore >= 80 ? 'text-emerald-400' :
                                    securityScore >= 60 ? 'text-amber-400' : 'text-red-400'}` }), _jsxs("p", { className: "text-lg font-bold text-white", children: [securityScore, "%"] }), _jsx("p", { className: "text-xs text-slate-400", children: "Security Score" })] }), _jsxs("div", { className: "bg-slate-800/50 rounded-lg p-4 text-center", children: [_jsx(Lock, { className: "w-5 h-5 text-blue-400 mx-auto mb-2" }), _jsx("p", { className: "text-lg font-bold text-white", children: vaultItems.length }), _jsx("p", { className: "text-xs text-slate-400", children: "Vault Items" })] }), _jsxs("div", { className: "bg-slate-800/50 rounded-lg p-4 text-center", children: [_jsx(AlertTriangle, { className: `w-5 h-5 mx-auto mb-2 ${vulnerabilities > 0 ? 'text-red-400' : 'text-emerald-400'}` }), _jsx("p", { className: "text-lg font-bold text-white", children: vulnerabilities }), _jsx("p", { className: "text-xs text-slate-400", children: "Vulnerabilities" })] }), _jsxs("div", { className: "bg-slate-800/50 rounded-lg p-4 text-center", children: [_jsx(Key, { className: `w-5 h-5 mx-auto mb-2 ${expiringSoon > 0 ? 'text-amber-400' : 'text-emerald-400'}` }), _jsx("p", { className: "text-lg font-bold text-white", children: expiringSoon }), _jsx("p", { className: "text-xs text-slate-400", children: "Expiring Soon" })] })] }), _jsxs("div", { className: "mb-6", children: [_jsx("h4", { className: "text-sm font-medium text-white mb-4", children: "Recent Vault Items" }), _jsx("div", { className: "space-y-3", children: vaultItems.slice(0, 5).map((item, index) => (_jsxs(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.1 + index * 0.1 }, className: "flex items-center justify-between p-3 bg-slate-800/30 rounded-lg hover:bg-slate-800/50 transition-colors cursor-pointer", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("span", { className: "text-lg", children: typeIcons[item.type] }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-white", children: item.name }), _jsxs("div", { className: "flex items-center space-x-2 text-xs text-slate-400", children: [_jsx("span", { className: "capitalize", children: item.type }), _jsx("span", { children: "\u2022" }), _jsx("span", { children: item.category }), _jsx("span", { children: "\u2022" }), _jsxs("span", { children: ["Last accessed: ", new Date(item.lastAccessed).toLocaleDateString()] })] })] })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [item.encrypted && (_jsx(Lock, { className: "w-3 h-3 text-emerald-400" })), _jsx(Eye, { className: "w-4 h-4 text-slate-400 hover:text-white transition-colors" })] })] }, item.id))) })] }), _jsxs("div", { className: "mb-6", children: [_jsx("h4", { className: "text-sm font-medium text-white mb-4", children: "Security Keys" }), _jsx("div", { className: "space-y-2", children: securityKeys.slice(0, 3).map((key, index) => (_jsxs(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.1 + index * 0.1 }, className: "flex items-center justify-between p-3 bg-slate-800/30 rounded-lg", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(Key, { className: "w-4 h-4 text-blue-400" }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-white", children: key.name }), _jsxs("p", { className: "text-xs text-slate-400 capitalize", children: [key.type, " key"] })] })] }), _jsxs("div", { className: "text-right", children: [_jsx("p", { className: `text-sm ${statusColors[key.status]}`, children: key.status }), key.expiryDate && (_jsxs("p", { className: "text-xs text-slate-400", children: ["Expires: ", new Date(key.expiryDate).toLocaleDateString()] }))] })] }, key.id))) })] }), _jsxs("div", { className: "p-4 bg-slate-800/30 rounded-lg", children: [_jsx("h4", { className: "text-sm font-medium text-white mb-3", children: "Security Settings" }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-xs text-slate-400", children: "Two-Factor Auth" }), _jsx("div", { className: `w-2 h-2 rounded-full ${privacySettings.twoFactorEnabled ? 'bg-emerald-400' : 'bg-red-400'}` })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-xs text-slate-400", children: "Biometric Lock" }), _jsx("div", { className: `w-2 h-2 rounded-full ${privacySettings.biometricEnabled ? 'bg-emerald-400' : 'bg-red-400'}` })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-xs text-slate-400", children: "Auto Lock" }), _jsxs("span", { className: "text-xs text-white", children: [privacySettings.autoLockTimeout, "m"] })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-xs text-slate-400", children: "Log Retention" }), _jsxs("span", { className: "text-xs text-white", children: [privacySettings.dataRetention.logRetentionDays, "d"] })] })] })] }), _jsx("div", { className: "mt-6 p-3 bg-blue-600/20 rounded-lg", children: _jsxs("p", { className: "text-sm text-blue-300", children: ["\uD83D\uDD12 Your vault is secure with ", vaultItems.filter(i => i.encrypted).length, " encrypted items and strong security policies."] }) })] }));
}
