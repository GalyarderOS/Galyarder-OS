import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { Brain, TrendingUp, Target, Clock, Heart } from 'lucide-react';
const insights = [
    {
        title: 'Productivity Peak',
        description: 'Your most productive hours are 9-11 AM',
        icon: TrendingUp,
        color: 'text-emerald-400'
    },
    {
        title: 'Goal Alignment',
        description: 'Health goals need more attention this week',
        icon: Target,
        color: 'text-blue-400'
    },
    {
        title: 'Time Optimization',
        description: 'Consider batching similar tasks together',
        icon: Clock,
        color: 'text-purple-400'
    },
    {
        title: 'Wellness Check',
        description: 'Stress levels elevated - schedule downtime',
        icon: Heart,
        color: 'text-red-400'
    }
];
const suggestions = [
    'Review your weekly goals and adjust priorities',
    'Schedule a 30-minute break between intense work sessions',
    'Consider adding a mindfulness practice to your routine',
    'Update your financial tracking for better insights',
    'Plan your meals for the week to support health goals'
];
export function NotionAssistantPage() {
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.2 }, className: "space-y-6", children: [_jsxs("div", { className: "glass-card rounded-xl p-6", children: [_jsxs("div", { className: "flex items-center space-x-3 mb-4", children: [_jsx(Brain, { className: "w-5 h-5 text-purple-400" }), _jsx("h3", { className: "text-lg font-semibold text-white", children: "AI Insights" })] }), _jsx("div", { className: "space-y-3", children: insights.map((insight, index) => (_jsxs(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.3 + index * 0.1 }, className: "flex items-start space-x-3 p-3 bg-slate-800/30 rounded-lg", children: [_jsx(insight.icon, { className: `w-4 h-4 mt-0.5 ${insight.color}` }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-white", children: insight.title }), _jsx("p", { className: "text-xs text-slate-400 mt-1", children: insight.description })] })] }, insight.title))) })] }), _jsxs("div", { className: "glass-card rounded-xl p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-white mb-4", children: "Suggestions" }), _jsx("div", { className: "space-y-2", children: suggestions.map((suggestion, index) => (_jsxs(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.5 + index * 0.1 }, className: "flex items-start space-x-2 text-sm text-slate-300", children: [_jsx("span", { className: "text-blue-400 mt-1", children: "\u2022" }), _jsx("span", { children: suggestion })] }, index))) })] })] }));
}
