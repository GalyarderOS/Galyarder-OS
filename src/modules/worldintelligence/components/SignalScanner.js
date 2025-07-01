import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { Search, AlertCircle, CheckCircle, Clock, Zap } from 'lucide-react';
import { useWorldIntelligenceStore } from '../store/worldIntelligenceStore';
export function SignalScanner() {
    const { implications } = useWorldIntelligenceStore();
    const getCategoryColor = (category) => {
        switch (category) {
            case 'opportunity': return 'text-emerald-400';
            case 'threat': return 'text-red-400';
            case 'neutral': return 'text-blue-400';
            default: return 'text-slate-400';
        }
    };
    const getCategoryBg = (category) => {
        switch (category) {
            case 'opportunity': return 'bg-emerald-400/10';
            case 'threat': return 'bg-red-400/10';
            case 'neutral': return 'bg-blue-400/10';
            default: return 'bg-slate-400/10';
        }
    };
    const getStatusColor = (status) => {
        switch (status) {
            case 'identified': return 'text-amber-400';
            case 'analyzing': return 'text-blue-400';
            case 'actioning': return 'text-emerald-400';
            case 'monitoring': return 'text-purple-400';
            default: return 'text-slate-400';
        }
    };
    const getTimeframeColor = (timeframe) => {
        switch (timeframe) {
            case 'immediate': return 'text-red-400';
            case 'short-term': return 'text-amber-400';
            case 'mid-term': return 'text-blue-400';
            case 'long-term': return 'text-emerald-400';
            default: return 'text-slate-400';
        }
    };
    const highImpactImplications = implications.filter(i => i.impact === 'high' || i.impact === 'critical');
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.2 }, className: "glass-card rounded-xl p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(Search, { className: "w-5 h-5 text-amber-400" }), _jsx("h3", { className: "text-xl font-semibold text-white", children: "Signal Scanner" })] }), _jsx("div", { className: "flex items-center space-x-2", children: _jsxs("span", { className: "text-xs text-slate-400", children: [implications.length, " implications identified"] }) })] }), _jsxs("div", { className: "grid grid-cols-3 gap-4 mb-6", children: [_jsxs("div", { className: "bg-slate-800/50 rounded-lg p-4 text-center", children: [_jsx(CheckCircle, { className: "w-5 h-5 text-emerald-400 mx-auto mb-2" }), _jsx("p", { className: "text-lg font-bold text-white", children: implications.filter(i => i.category === 'opportunity').length }), _jsx("p", { className: "text-xs text-slate-400", children: "Opportunities" })] }), _jsxs("div", { className: "bg-slate-800/50 rounded-lg p-4 text-center", children: [_jsx(AlertCircle, { className: "w-5 h-5 text-red-400 mx-auto mb-2" }), _jsx("p", { className: "text-lg font-bold text-white", children: implications.filter(i => i.category === 'threat').length }), _jsx("p", { className: "text-xs text-slate-400", children: "Threats" })] }), _jsxs("div", { className: "bg-slate-800/50 rounded-lg p-4 text-center", children: [_jsx(Clock, { className: "w-5 h-5 text-blue-400 mx-auto mb-2" }), _jsx("p", { className: "text-lg font-bold text-white", children: implications.filter(i => i.timeframe === 'immediate' || i.timeframe === 'short-term').length }), _jsx("p", { className: "text-xs text-slate-400", children: "Urgent" })] })] }), highImpactImplications.length > 0 && (_jsxs("div", { className: "mb-6", children: [_jsxs("h4", { className: "text-sm font-medium text-white mb-3 flex items-center space-x-2", children: [_jsx(Zap, { className: "w-4 h-4 text-amber-400" }), _jsx("span", { children: "High Impact Implications" })] }), _jsx("div", { className: "space-y-3", children: highImpactImplications.map((implication, index) => (_jsxs(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.1 + index * 0.1 }, className: `p-4 rounded-lg ${getCategoryBg(implication.category)} border border-${getCategoryColor(implication.category).replace('text-', '')}/30`, children: [_jsx("div", { className: "flex items-start justify-between mb-2", children: _jsxs("div", { children: [_jsx("h5", { className: "text-sm font-medium text-white", children: implication.title }), _jsxs("div", { className: "flex items-center space-x-2 text-xs", children: [_jsx("span", { className: `${getCategoryColor(implication.category)}`, children: implication.category }), _jsx("span", { className: `${getTimeframeColor(implication.timeframe)}`, children: implication.timeframe }), _jsx("span", { className: `${getStatusColor(implication.status)}`, children: implication.status })] })] }) }), _jsx("p", { className: "text-sm text-slate-300 mb-3", children: implication.description }), _jsxs("div", { className: "mb-3", children: [_jsx("p", { className: "text-xs text-slate-400 mb-1", children: "Action Items:" }), _jsx("div", { className: "space-y-1", children: implication.actionItems.map((item, itemIndex) => (_jsxs("div", { className: "flex items-start space-x-2 text-xs text-slate-300", children: [_jsx("span", { children: "\u2022" }), _jsx("span", { children: item })] }, itemIndex))) })] }), implication.relatedTrends.length > 0 && (_jsxs("div", { children: [_jsx("p", { className: "text-xs text-slate-400 mb-1", children: "Related Trends:" }), _jsx("div", { className: "flex flex-wrap gap-1", children: implication.relatedTrends.map(trendId => (_jsxs("span", { className: "text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded", children: ["Trend #", trendId] }, trendId))) })] }))] }, implication.id))) })] })), _jsxs("div", { className: "space-y-3", children: [_jsx("h4", { className: "text-sm font-medium text-white mb-3", children: "All Implications" }), implications
                        .filter(i => i.impact !== 'high' && i.impact !== 'critical')
                        .map((implication, index) => (_jsxs(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.1 + index * 0.1 }, className: "flex items-center justify-between p-3 bg-slate-800/30 rounded-lg", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-white", children: implication.title }), _jsxs("div", { className: "flex items-center space-x-2 text-xs", children: [_jsx("span", { className: `${getCategoryColor(implication.category)}`, children: implication.category }), _jsx("span", { className: `${getTimeframeColor(implication.timeframe)}`, children: implication.timeframe })] })] }), _jsx("div", { className: "text-right", children: _jsx("span", { className: `text-xs px-2 py-1 rounded-full bg-slate-700 ${getStatusColor(implication.status)}`, children: implication.status }) })] }, implication.id)))] }), _jsx("div", { className: "mt-6 p-3 bg-amber-600/20 rounded-lg", children: _jsx("p", { className: "text-sm text-amber-300", children: "\uD83D\uDD0D Regularly scan for signals and implications to stay ahead of global changes that may affect your strategy." }) })] }));
}
