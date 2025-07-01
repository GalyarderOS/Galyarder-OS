import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { Key, Plus, RotateCcw, AlertCircle, Calendar } from 'lucide-react';
import { useDigitalSovereigntyStore } from '../store/digitalSovereigntyStore';
export function KeyVault() {
    const { securityKeys, rotateSecurityKey, getKeysNeedingRotation } = useDigitalSovereigntyStore();
    const keysNeedingRotation = getKeysNeedingRotation(30);
    const getKeyTypeIcon = (type) => {
        const icons = {
            'password': '🔑',
            'seed-phrase': '🌱',
            'private-key': '🔐',
            'api-key': '🔌',
            'other': '🔒'
        };
        return icons[type] || '🔒';
    };
    const getStorageMethodColor = (method) => {
        switch (method) {
            case 'hardware': return 'text-emerald-400';
            case 'encrypted': return 'text-blue-400';
            case 'paper': return 'text-amber-400';
            case 'mental': return 'text-purple-400';
            default: return 'text-slate-400';
        }
    };
    const getDaysSinceRotation = (lastRotated) => {
        const lastDate = new Date(lastRotated);
        const today = new Date();
        const diffTime = Math.abs(today.getTime() - lastDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "glass-card rounded-xl p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(Key, { className: "w-5 h-5 text-blue-400" }), _jsx("h3", { className: "text-xl font-semibold text-white", children: "Key Vault" })] }), _jsxs("button", { className: "flex items-center space-x-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors", children: [_jsx(Plus, { className: "w-4 h-4 text-white" }), _jsx("span", { className: "text-white text-sm", children: "Add Key" })] })] }), _jsxs("div", { className: "grid grid-cols-3 gap-4 mb-6", children: [_jsxs("div", { className: "bg-slate-800/50 rounded-lg p-4 text-center", children: [_jsx("p", { className: "text-lg font-bold text-white", children: securityKeys.length }), _jsx("p", { className: "text-xs text-slate-400", children: "Total Keys" })] }), _jsxs("div", { className: "bg-slate-800/50 rounded-lg p-4 text-center", children: [_jsx("p", { className: "text-lg font-bold text-white", children: keysNeedingRotation.length }), _jsx("p", { className: "text-xs text-slate-400", children: "Need Rotation" })] }), _jsxs("div", { className: "bg-slate-800/50 rounded-lg p-4 text-center", children: [_jsx("p", { className: "text-lg font-bold text-white", children: securityKeys.filter(k => k.storageMethod === 'hardware').length }), _jsx("p", { className: "text-xs text-slate-400", children: "Hardware Secured" })] })] }), keysNeedingRotation.length > 0 && (_jsxs("div", { className: "mb-6 p-4 bg-amber-600/20 border border-amber-600/30 rounded-lg", children: [_jsxs("div", { className: "flex items-center space-x-2 mb-2", children: [_jsx(AlertCircle, { className: "w-4 h-4 text-amber-400" }), _jsx("h4", { className: "text-sm font-medium text-amber-300", children: "Keys Needing Rotation" })] }), _jsx("div", { className: "space-y-2", children: keysNeedingRotation.map(key => (_jsxs("div", { className: "flex items-center justify-between text-sm", children: [_jsx("span", { className: "text-amber-200", children: key.name }), _jsxs("button", { onClick: () => rotateSecurityKey(key.id), className: "text-xs text-blue-400 hover:text-blue-300 transition-colors flex items-center space-x-1", children: [_jsx(RotateCcw, { className: "w-3 h-3" }), _jsx("span", { children: "Rotate Now" })] })] }, key.id))) })] })), _jsx("div", { className: "space-y-4", children: securityKeys.map((key, index) => (_jsxs(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.1 + index * 0.1 }, className: "p-4 bg-slate-800/30 rounded-lg", children: [_jsxs("div", { className: "flex items-start justify-between mb-3", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("span", { className: "text-2xl", children: getKeyTypeIcon(key.type) }), _jsxs("div", { children: [_jsx("h4", { className: "text-sm font-medium text-white", children: key.name }), _jsx("p", { className: "text-xs text-slate-400 capitalize", children: key.type })] })] }), _jsxs("div", { className: "text-right", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsxs("span", { className: `text-xs ${getStorageMethodColor(key.storageMethod)}`, children: [key.storageMethod, " storage"] }), _jsx("button", { onClick: () => rotateSecurityKey(key.id), className: "p-1 hover:bg-slate-700 rounded transition-colors", children: _jsx(RotateCcw, { className: "w-3 h-3 text-slate-400 hover:text-blue-400" }) })] }), _jsxs("p", { className: "text-xs text-slate-400 mt-1", children: ["Last rotated: ", getDaysSinceRotation(key.lastRotated), " days ago"] })] })] }), key.associatedAssets.length > 0 && (_jsxs("div", { className: "mb-3", children: [_jsx("p", { className: "text-xs text-slate-400 mb-1", children: "Associated Assets:" }), _jsx("div", { className: "flex flex-wrap gap-1", children: key.associatedAssets.map(assetId => (_jsx("span", { className: "text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded", children: assetId }, assetId))) })] })), key.nextRotation && (_jsxs("div", { className: "flex items-center space-x-2 text-xs", children: [_jsx(Calendar, { className: "w-3 h-3 text-blue-400" }), _jsxs("span", { className: "text-slate-400", children: ["Next rotation: ", new Date(key.nextRotation).toLocaleDateString()] })] })), key.notes && (_jsxs("p", { className: "text-xs text-slate-400 mt-2 italic", children: ["\"", key.notes, "\""] }))] }, key.id))) }), _jsx("div", { className: "mt-6 p-3 bg-blue-600/20 rounded-lg", children: _jsx("p", { className: "text-sm text-blue-300", children: "\uD83D\uDD10 Regular key rotation is essential for maintaining digital sovereignty and security." }) })] }));
}
