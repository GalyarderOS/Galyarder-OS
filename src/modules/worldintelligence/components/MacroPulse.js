import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Activity, Plus, Tag } from 'lucide-react';
import { useWorldIntelligenceStore } from '../store/worldIntelligenceStore';
export function MacroPulse() {
    const { trends } = useWorldIntelligenceStore();
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
    const getTimeframeColor = (timeframe) => {
        switch (timeframe) {
            case 'short-term': return 'text-blue-400';
            case 'mid-term': return 'text-purple-400';
            case 'long-term': return 'text-amber-400';
            default: return 'text-slate-400';
        }
    };
    const getDirectionIcon = (direction) => {
        switch (direction) {
            case 'increasing': return TrendingUp;
            case 'decreasing': return TrendingDown;
            case 'volatile': return Activity;
            default: return Activity;
        }
    };
    const getDirectionColor = (direction) => {
        switch (direction) {
            case 'increasing': return 'text-emerald-400';
            case 'decreasing': return 'text-red-400';
            case 'volatile': return 'text-amber-400';
            case 'stable': return 'text-blue-400';
            default: return 'text-slate-400';
        }
    };
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.1 }, className: "glass-card rounded-xl p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(TrendingUp, { className: "w-5 h-5 text-purple-400" }), _jsx("h3", { className: "text-xl font-semibold text-white", children: "Macro Pulse" })] }), _jsxs("button", { className: "flex items-center space-x-2 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors", children: [_jsx(Plus, { className: "w-4 h-4 text-white" }), _jsx("span", { className: "text-white text-sm", children: "Add Trend" })] })] }), _jsxs("div", { className: "grid grid-cols-3 gap-4 mb-6", children: [_jsxs("div", { className: "bg-slate-800/50 rounded-lg p-4 text-center", children: [_jsx("p", { className: "text-lg font-bold text-white", children: trends.filter(t => t.timeframe === 'short-term').length }), _jsx("p", { className: "text-xs text-slate-400", children: "Short-term" })] }), _jsxs("div", { className: "bg-slate-800/50 rounded-lg p-4 text-center", children: [_jsx("p", { className: "text-lg font-bold text-white", children: trends.filter(t => t.timeframe === 'mid-term').length }), _jsx("p", { className: "text-xs text-slate-400", children: "Mid-term" })] }), _jsxs("div", { className: "bg-slate-800/50 rounded-lg p-4 text-center", children: [_jsx("p", { className: "text-lg font-bold text-white", children: trends.filter(t => t.timeframe === 'long-term').length }), _jsx("p", { className: "text-xs text-slate-400", children: "Long-term" })] })] }), _jsx("div", { className: "space-y-4", children: trends.map((trend, index) => {
                    const DirectionIcon = getDirectionIcon(trend.direction);
                    const directionColor = getDirectionColor(trend.direction);
                    return (_jsxs(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.1 + index * 0.1 }, className: "p-4 bg-slate-800/30 rounded-lg", children: [_jsxs("div", { className: "flex items-start justify-between mb-3", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex items-center space-x-2 mb-1", children: [_jsx("h4", { className: "text-sm font-medium text-white", children: trend.name }), _jsx("span", { className: `text-xs capitalize ${getCategoryColor(trend.category)}`, children: trend.category })] }), _jsx("p", { className: "text-xs text-slate-400 mb-2", children: trend.description })] }), _jsxs("div", { className: "text-right", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { className: `text-xs ${getTimeframeColor(trend.timeframe)}`, children: trend.timeframe }), _jsx(DirectionIcon, { className: `w-4 h-4 ${directionColor}` })] }), _jsxs("div", { className: "flex items-center space-x-1 text-xs text-slate-400 mt-1", children: [_jsx("span", { children: "Confidence:" }), _jsxs("span", { className: "text-white", children: [trend.confidence, "%"] })] })] })] }), _jsx("div", { className: "mb-3", children: _jsx("div", { className: "flex flex-wrap gap-1", children: trend.regions.map(region => (_jsx("span", { className: "text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded", children: region }, region))) }) }), trend.relatedSignals.length > 0 && (_jsxs("div", { className: "mb-3", children: [_jsx("p", { className: "text-xs text-slate-400 mb-1", children: "Related Signals:" }), _jsx("div", { className: "flex flex-wrap gap-1", children: trend.relatedSignals.map(signalId => (_jsxs("span", { className: "text-xs bg-blue-600/20 text-blue-300 px-2 py-1 rounded", children: ["Signal #", signalId] }, signalId))) })] })), _jsx("div", { className: "flex flex-wrap gap-1", children: trend.tags.map(tag => (_jsxs("span", { className: "text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded flex items-center space-x-1", children: [_jsx(Tag, { className: "w-2 h-2" }), _jsx("span", { children: tag })] }, tag))) })] }, trend.id));
                }) }), _jsx("div", { className: "mt-6 p-3 bg-purple-600/20 rounded-lg", children: _jsx("p", { className: "text-sm text-purple-300", children: "\uD83D\uDCC8 Understanding macro trends helps you make better strategic decisions and prepare for future scenarios." }) })] }));
}
