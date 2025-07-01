import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Zap, Target, Shield, Bot, User } from 'lucide-react';
import logo from '../../assets/logo.png';
// AI Assistant chat examples
const aiChatExamples = [
    {
        message: "Based on your sleep patterns, I recommend adjusting your bedtime by 30 minutes for optimal recovery.",
        type: "sleep"
    },
    {
        message: "Your productivity peaks at 10 AM. Consider scheduling important tasks during this window.",
        type: "productivity"
    },
    {
        message: "I've noticed a pattern in your spending. You could save $320/month by optimizing these 3 categories.",
        type: "finance"
    },
    {
        message: "Your workout consistency has improved by 35% this month. Great progress on your fitness goals!",
        type: "health"
    },
    {
        message: "You haven't connected with Michael in 3 weeks. Consider reaching out to maintain this relationship.",
        type: "relationships"
    }
];
export function AISection() {
    const [currentAIExample, setCurrentAIExample] = useState(0);
    // Auto-rotate AI examples
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentAIExample(prev => (prev + 1) % aiChatExamples.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);
    return (_jsxs("section", { id: "ai", className: "py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-950 to-slate-900/90 relative overflow-hidden", children: [_jsxs("div", { className: "absolute inset-0 z-0", children: [_jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent_50%)]" }), _jsx("div", { className: "absolute inset-0", children: Array.from({ length: 20 }).map((_, i) => (_jsx(motion.div, { className: "absolute bg-blue-500/5 rounded-full", style: {
                                width: `${Math.random() * 300 + 50}px`,
                                height: `${Math.random() * 300 + 50}px`,
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }, animate: {
                                scale: [1, 1.2, 1],
                                opacity: [0.3, 0.6, 0.3],
                            }, transition: {
                                duration: 5 + Math.random() * 5,
                                repeat: Infinity,
                                ease: "easeInOut"
                            } }, i))) })] }), _jsx("div", { className: "max-w-7xl mx-auto relative z-10", children: _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center", children: [_jsxs(motion.div, { initial: { opacity: 0, x: -20 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true }, transition: { duration: 0.8 }, children: [_jsxs("h2", { className: "text-4xl md:text-5xl font-bold text-white mb-6", children: ["Your Personal AI for", ' ', _jsx("span", { className: "bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent", children: "Self-Mastery" })] }), _jsx("p", { className: "text-xl text-slate-300 mb-8", children: "Our AI assistant learns from your patterns and gives real-time insights to optimize your life across all dimensions." }), _jsxs("div", { className: "space-y-4 mb-8", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(Brain, { className: "w-6 h-6 text-purple-400" }), _jsx("span", { className: "text-white", children: "Intelligent pattern recognition across all life areas" })] }), _jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(Zap, { className: "w-6 h-6 text-yellow-400" }), _jsx("span", { className: "text-white", children: "Real-time optimization suggestions based on your data" })] }), _jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(Target, { className: "w-6 h-6 text-emerald-400" }), _jsx("span", { className: "text-white", children: "Personalized goal recommendations and tracking" })] }), _jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(Shield, { className: "w-6 h-6 text-blue-400" }), _jsx("span", { className: "text-white", children: "Privacy-first AI processing with full data sovereignty" })] })] }), _jsxs(Link, { to: "/register", className: "inline-flex items-center space-x-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors shadow-lg shadow-purple-600/20", children: [_jsx(Bot, { className: "w-5 h-5" }), _jsx("span", { children: "Try the AI Assistant" })] })] }), _jsxs(motion.div, { initial: { opacity: 0, x: 20 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true }, transition: { duration: 0.8, delay: 0.2 }, className: "relative", children: [_jsxs("div", { className: "bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 shadow-2xl", children: [_jsxs("div", { className: "flex items-center space-x-3 mb-6", children: [_jsx("img", { src: logo, alt: "GalyarderOS Logo", className: "w-8 h-8" }), _jsx("span", { className: "text-white font-semibold", children: "AI Assistant" })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-start justify-end space-x-3", children: [_jsx("div", { className: "bg-blue-600/20 p-3 rounded-lg max-w-xs", children: _jsx("p", { className: "text-blue-200 text-sm", children: "How can I optimize my day based on my current data?" }) }), _jsx("div", { className: "w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center", children: _jsx(User, { className: "w-4 h-4 text-white" }) })] }), _jsxs("div", { className: "flex items-start space-x-3", children: [_jsx("div", { className: "w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center", children: _jsx(Bot, { className: "w-4 h-4 text-white" }) }), _jsx("div", { className: "bg-purple-600/20 p-3 rounded-lg max-w-md", children: _jsx(AnimatePresence, { mode: "wait", children: _jsx(motion.p, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.5 }, className: "text-purple-200 text-sm", children: aiChatExamples[currentAIExample].message }, currentAIExample) }) })] }), _jsx("div", { className: "pl-11", children: _jsxs("div", { className: "flex flex-wrap gap-2", children: [_jsx("button", { className: "px-3 py-1 bg-slate-700/50 hover:bg-slate-700 text-white text-xs rounded-full transition-colors", children: "View Details" }), _jsx("button", { className: "px-3 py-1 bg-slate-700/50 hover:bg-slate-700 text-white text-xs rounded-full transition-colors", children: "Apply Suggestion" }), _jsx("button", { className: "px-3 py-1 bg-slate-700/50 hover:bg-slate-700 text-white text-xs rounded-full transition-colors", children: "Analyze Further" })] }) })] }), _jsx("div", { className: "flex justify-center space-x-2 mt-6", children: aiChatExamples.map((_, index) => (_jsx("div", { className: `w-2 h-2 rounded-full ${index === currentAIExample ? 'bg-purple-500' : 'bg-slate-600'}` }, index))) })] }), _jsx(motion.div, { className: "absolute -top-10 -right-10 w-24 h-24 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full blur-xl", animate: {
                                        scale: [1, 1.2, 1],
                                        opacity: [0.3, 0.6, 0.3],
                                    }, transition: {
                                        duration: 5,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    } }), _jsx(motion.div, { className: "absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-emerald-500/10 rounded-full blur-xl", animate: {
                                        scale: [1, 1.3, 1],
                                        opacity: [0.3, 0.5, 0.3],
                                    }, transition: {
                                        duration: 7,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    } })] })] }) })] }));
}
