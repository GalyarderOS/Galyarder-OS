import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { FileCheck, Plus, Calendar, Tag, Search } from 'lucide-react';
import { useDigitalSovereigntyStore } from '../store/digitalSovereigntyStore';
export function OwnershipProof() {
    const { ownershipRecords, digitalAssets } = useDigitalSovereigntyStore();
    const getAssetName = (assetId) => {
        const asset = digitalAssets.find(a => a.id === assetId);
        return asset ? asset.name : 'Unknown Asset';
    };
    const getDocumentTypeColor = (type) => {
        const colors = {
            'receipt': 'text-emerald-400',
            'certificate': 'text-blue-400',
            'contract': 'text-purple-400',
            'license': 'text-amber-400',
            'other': 'text-slate-400'
        };
        return colors[type] || 'text-slate-400';
    };
    const getDocumentTypeIcon = (type) => {
        const icons = {
            'receipt': '🧾',
            'certificate': '📜',
            'contract': '📝',
            'license': '🪪',
            'other': '📄'
        };
        return icons[type] || '📄';
    };
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.2 }, className: "glass-card rounded-xl p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(FileCheck, { className: "w-5 h-5 text-emerald-400" }), _jsx("h3", { className: "text-xl font-semibold text-white", children: "Ownership Proof" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" }), _jsx("input", { type: "text", placeholder: "Search records...", className: "w-48 pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500" })] }), _jsxs("button", { className: "flex items-center space-x-2 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors", children: [_jsx(Plus, { className: "w-4 h-4 text-white" }), _jsx("span", { className: "text-white text-sm", children: "Add Record" })] })] })] }), _jsxs("div", { className: "grid grid-cols-3 gap-4 mb-6", children: [_jsxs("div", { className: "bg-slate-800/50 rounded-lg p-4 text-center", children: [_jsx("p", { className: "text-lg font-bold text-white", children: ownershipRecords.length }), _jsx("p", { className: "text-xs text-slate-400", children: "Total Records" })] }), _jsxs("div", { className: "bg-slate-800/50 rounded-lg p-4 text-center", children: [_jsx("p", { className: "text-lg font-bold text-white", children: ownershipRecords.filter(r => r.documentType === 'certificate').length }), _jsx("p", { className: "text-xs text-slate-400", children: "Certificates" })] }), _jsxs("div", { className: "bg-slate-800/50 rounded-lg p-4 text-center", children: [_jsx("p", { className: "text-lg font-bold text-white", children: ownershipRecords.filter(r => r.documentType === 'receipt').length }), _jsx("p", { className: "text-xs text-slate-400", children: "Receipts" })] })] }), _jsx("div", { className: "space-y-4", children: ownershipRecords.map((record, index) => (_jsx(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.1 + index * 0.1 }, className: "p-4 bg-slate-800/30 rounded-lg", children: _jsxs("div", { className: "flex items-start space-x-3", children: [_jsx("div", { className: "p-2 bg-slate-700/50 rounded-lg", children: _jsx("span", { className: "text-xl", children: getDocumentTypeIcon(record.documentType) }) }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("h4", { className: "text-sm font-medium text-white", children: getAssetName(record.assetId) }), _jsx("span", { className: `text-xs capitalize ${getDocumentTypeColor(record.documentType)}`, children: record.documentType })] }), _jsxs("div", { className: "flex items-center space-x-2 text-xs text-slate-400", children: [_jsx(Calendar, { className: "w-3 h-3" }), _jsx("span", { children: new Date(record.issueDate).toLocaleDateString() })] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-3 mb-3", children: [_jsxs("div", { children: [_jsx("p", { className: "text-xs text-slate-400", children: "Issuer:" }), _jsx("p", { className: "text-sm text-slate-300", children: record.issuer })] }), _jsxs("div", { children: [_jsx("p", { className: "text-xs text-slate-400", children: "Reference:" }), _jsx("p", { className: "text-sm text-slate-300", children: record.documentReference })] }), _jsxs("div", { children: [_jsx("p", { className: "text-xs text-slate-400", children: "Verification Method:" }), _jsx("p", { className: "text-sm text-slate-300", children: record.verificationMethod })] })] }), record.notes && (_jsxs("p", { className: "text-xs text-slate-400 mb-3 italic", children: ["\"", record.notes, "\""] })), _jsx("div", { className: "flex flex-wrap gap-1", children: record.tags.map(tag => (_jsxs("span", { className: "text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded flex items-center space-x-1", children: [_jsx(Tag, { className: "w-2 h-2" }), _jsx("span", { children: tag })] }, tag))) })] })] }) }, record.id))) }), _jsx("div", { className: "mt-6 p-3 bg-emerald-600/20 rounded-lg", children: _jsx("p", { className: "text-sm text-emerald-300", children: "\uD83D\uDCC4 Maintaining proper ownership records is essential for asset verification and inheritance." }) })] }));
}
