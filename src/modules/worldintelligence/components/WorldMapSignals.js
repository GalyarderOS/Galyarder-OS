import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { Globe, Plus, AlertCircle, ExternalLink, Tag } from 'lucide-react';
import { useWorldIntelligenceStore } from '../store/worldIntelligenceStore';
export function WorldMapSignals() {
    const { signals, verifySignal } = useWorldIntelligenceStore();
    const getCategoryColor = (category) => {
        const colors = {
            'economic': 'text-emerald-400',
            'geopolitical': 'text-red-400',
            'technological': 'text-blue-400',
            'environmental': 'text-green-400',
            'social': 'text-purple-400',
            'other': 'text-slate-400'
        };
        return colors[category] || 'text-slate-400';
    };
    const getImpactColor = (impact) => {
        switch (impact) {
            case 'critical': return 'bg-red-400/20 text-red-400';
            case 'high': return 'bg-amber-400/20 text-amber-400';
            case 'medium': return 'bg-blue-400/20 text-blue-400';
            case 'low': return 'bg-emerald-400/20 text-emerald-400';
            default: return 'bg-slate-400/20 text-slate-400';
        }
    };
    const getRegionEmoji = (region) => {
        const emojis = {
            'Global': '🌎',
            'North America': '🇺🇸',
            'South America': '🇧🇷',
            'Europe': '🇪🇺',
            'Asia': '🇨🇳',
            'Africa': '🇿🇦',
            'Middle East': '🇦🇪',
            'Australia': '🇦🇺'
        };
        return emojis[region] || '🌍';
    };
    const recentSignals = signals.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "glass-card rounded-xl p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(Globe, { className: "w-5 h-5 text-blue-400" }), _jsx("h3", { className: "text-xl font-semibold text-white", children: "World Signals" })] }), _jsxs("button", { className: "flex items-center space-x-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors", children: [_jsx(Plus, { className: "w-4 h-4 text-white" }), _jsx("span", { className: "text-white text-sm", children: "Add Signal" })] })] }), _jsxs("div", { className: "grid grid-cols-3 gap-4 mb-6", children: [_jsxs("div", { className: "bg-slate-800/50 rounded-lg p-4 text-center", children: [_jsx("p", { className: "text-lg font-bold text-white", children: signals.length }), _jsx("p", { className: "text-xs text-slate-400", children: "Total Signals" })] }), _jsxs("div", { className: "bg-slate-800/50 rounded-lg p-4 text-center", children: [_jsx("p", { className: "text-lg font-bold text-white", children: signals.filter(s => s.impact === 'high' || s.impact === 'critical').length }), _jsx("p", { className: "text-xs text-slate-400", children: "High Impact" })] }), _jsxs("div", { className: "bg-slate-800/50 rounded-lg p-4 text-center", children: [_jsx("p", { className: "text-lg font-bold text-white", children: signals.filter(s => s.isVerified).length }), _jsx("p", { className: "text-xs text-slate-400", children: "Verified" })] })] }), _jsx("div", { className: "space-y-4", children: recentSignals.map((signal, index) => (_jsxs(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.1 + index * 0.1 }, className: "p-4 bg-slate-800/30 rounded-lg", children: [_jsxs("div", { className: "flex items-start justify-between mb-3", children: [_jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center space-x-2 mb-2", children: [_jsx("h4", { className: "text-sm font-medium text-white", children: signal.title }), !signal.isVerified && (_jsxs("button", { onClick: () => verifySignal(signal.id), className: "text-xs text-amber-400 hover:text-amber-300 transition-colors flex items-center space-x-1", children: [_jsx(AlertCircle, { className: "w-3 h-3" }), _jsx("span", { children: "Verify" })] }))] }), _jsx("p", { className: "text-sm text-slate-300 mb-3", children: signal.description })] }), _jsxs("div", { className: "text-right", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsxs("span", { className: `text-xs px-2 py-1 rounded ${getImpactColor(signal.impact)}`, children: [signal.impact, " impact"] }), _jsx("span", { className: `text-xs capitalize ${getCategoryColor(signal.category)}`, children: signal.category })] }), _jsx("p", { className: "text-xs text-slate-400 mt-1", children: new Date(signal.date).toLocaleDateString() })] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-3 mb-3", children: [_jsxs("div", { className: "flex items-center space-x-2 text-xs", children: [_jsx("span", { className: "text-slate-400", children: "Source:" }), _jsxs("span", { className: "text-slate-300", children: [signal.source, signal.url && (_jsx("a", { href: signal.url, target: "_blank", rel: "noopener noreferrer", className: "inline-flex items-center ml-1 text-blue-400 hover:text-blue-300 transition-colors", children: _jsx(ExternalLink, { className: "w-3 h-3" }) }))] })] }), _jsxs("div", { className: "flex items-center space-x-2 text-xs", children: [_jsx("span", { className: "text-slate-400", children: "Relevance:" }), _jsxs("span", { className: "text-slate-300", children: [signal.relevance, "%"] })] })] }), _jsx("div", { className: "mb-3", children: _jsx("div", { className: "flex flex-wrap gap-1", children: signal.regions.map(region => (_jsxs("span", { className: "text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded flex items-center space-x-1", children: [_jsx("span", { children: getRegionEmoji(region) }), _jsx("span", { children: region })] }, region))) }) }), _jsx("div", { className: "flex flex-wrap gap-1", children: signal.tags.map(tag => (_jsxs("span", { className: "text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded flex items-center space-x-1", children: [_jsx(Tag, { className: "w-2 h-2" }), _jsx("span", { children: tag })] }, tag))) })] }, signal.id))) }), _jsx("div", { className: "mt-6 p-3 bg-blue-600/20 rounded-lg", children: _jsx("p", { className: "text-sm text-blue-300", children: "\uD83C\uDF0E Stay informed about global developments that may impact your strategic decisions." }) })] }));
}
