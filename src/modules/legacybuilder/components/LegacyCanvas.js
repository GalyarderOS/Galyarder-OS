import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { Compass, Target, Heart, Star } from 'lucide-react';
const legacyAreas = [
    {
        title: 'Personal Impact',
        description: 'How I want to be remembered by family and friends',
        icon: Heart,
        color: 'text-pink-400',
        progress: 75,
        goals: [
            'Be a supportive mentor to younger developers',
            'Maintain strong relationships with family',
            'Practice kindness and empathy daily'
        ]
    },
    {
        title: 'Professional Legacy',
        description: 'The mark I want to leave in my career',
        icon: Target,
        color: 'text-blue-400',
        progress: 60,
        goals: [
            'Build products that improve people\'s lives',
            'Mentor and develop other professionals',
            'Contribute to open source community'
        ]
    },
    {
        title: 'Community Contribution',
        description: 'How I want to give back to society',
        icon: Star,
        color: 'text-amber-400',
        progress: 45,
        goals: [
            'Volunteer for education initiatives',
            'Support environmental causes',
            'Help bridge the digital divide'
        ]
    },
    {
        title: 'Knowledge Sharing',
        description: 'The wisdom and skills I want to pass on',
        icon: Compass,
        color: 'text-purple-400',
        progress: 80,
        goals: [
            'Write technical articles and tutorials',
            'Speak at conferences and meetups',
            'Create educational content'
        ]
    }
];
export function LegacyCanvas() {
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "glass-card rounded-xl p-6", children: [_jsxs("div", { className: "flex items-center space-x-3 mb-6", children: [_jsx(Compass, { className: "w-5 h-5 text-amber-400" }), _jsx("h3", { className: "text-xl font-semibold text-white", children: "Legacy Canvas" })] }), _jsx("div", { className: "grid grid-cols-1 gap-6", children: legacyAreas.map((area, index) => (_jsx(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.1 + index * 0.1 }, className: "p-4 bg-slate-800/30 rounded-lg", children: _jsxs("div", { className: "flex items-start space-x-3 mb-3", children: [_jsx("div", { className: "p-2 bg-slate-700/50 rounded-lg", children: _jsx(area.icon, { className: `w-4 h-4 ${area.color}` }) }), _jsxs("div", { className: "flex-1", children: [_jsx("h4", { className: "text-sm font-medium text-white mb-1", children: area.title }), _jsx("p", { className: "text-xs text-slate-400 mb-3", children: area.description }), _jsxs("div", { className: "mb-3", children: [_jsxs("div", { className: "flex justify-between text-xs text-slate-400 mb-1", children: [_jsx("span", { children: "Progress" }), _jsxs("span", { children: [area.progress, "%"] })] }), _jsx("div", { className: "bg-slate-700 rounded-full h-2", children: _jsx(motion.div, { initial: { width: 0 }, animate: { width: `${area.progress}%` }, transition: { delay: 0.3 + index * 0.1, duration: 0.8 }, className: `h-2 rounded-full bg-gradient-to-r ${area.color.includes('pink') ? 'from-pink-500 to-pink-400' :
                                                        area.color.includes('blue') ? 'from-blue-500 to-blue-400' :
                                                            area.color.includes('amber') ? 'from-amber-500 to-amber-400' :
                                                                'from-purple-500 to-purple-400'}` }) })] }), _jsx("div", { className: "space-y-1", children: area.goals.map((goal, goalIndex) => (_jsxs("div", { className: "flex items-start space-x-2", children: [_jsx("span", { className: `text-xs mt-0.5 ${area.color}`, children: "\u2022" }), _jsx("span", { className: "text-xs text-slate-300", children: goal })] }, goalIndex))) })] })] }) }, area.title))) }), _jsxs("div", { className: "mt-6 p-4 bg-amber-600/20 rounded-lg", children: [_jsx("p", { className: "text-sm text-amber-300 mb-2", children: "\uD83C\uDF1F Your Legacy Score: 65/100" }), _jsx("p", { className: "text-xs text-amber-200", children: "Focus on community contribution to strengthen your overall legacy impact" })] })] }));
}
