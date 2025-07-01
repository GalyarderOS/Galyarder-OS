import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { useAIAssistant } from '../hooks/useAIAssistant';
import logo from '../../../assets/logo.png';
export function AIAssistantDialog() {
    const [message, setMessage] = useState('');
    const { messages, sendMessage, isLoading } = useAIAssistant();
    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim()) {
            sendMessage(message);
            setMessage('');
        }
    };
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "glass-card rounded-xl p-6 h-[600px] flex flex-col", children: [_jsxs("div", { className: "flex items-center space-x-3 mb-6", children: [_jsx("img", { src: logo, alt: "GalyarderOS Logo", className: "w-8 h-8" }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold text-white", children: "AI Assistant" }), _jsx("p", { className: "text-sm text-slate-400", children: "Ask me anything about your personal development" })] })] }), _jsxs("div", { className: "flex-1 overflow-y-auto space-y-4 mb-4", children: [messages.length === 0 && (_jsxs("div", { className: "text-center py-8", children: [_jsx(Sparkles, { className: "w-12 h-12 text-slate-400 mx-auto mb-4" }), _jsx("p", { className: "text-slate-400", children: "Start a conversation with your AI assistant" })] })), messages.map((msg, index) => (_jsxs(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, className: `flex items-start space-x-3 ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`, children: [_jsx("div", { className: `p-2 rounded-lg ${msg.role === 'user'
                                    ? 'bg-blue-600'
                                    : 'bg-slate-700'}`, children: msg.role === 'user' ? (_jsx(User, { className: "w-4 h-4 text-white" })) : (_jsx(Bot, { className: "w-4 h-4 text-white" })) }), _jsx("div", { className: `flex-1 p-3 rounded-lg ${msg.role === 'user'
                                    ? 'bg-blue-600/20 text-blue-100'
                                    : 'bg-slate-800/50 text-slate-200'}`, children: _jsx("p", { className: "text-sm whitespace-pre-wrap", children: msg.content }) })] }, index))), isLoading && (_jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "flex items-start space-x-3", children: [_jsx("div", { className: "p-2 bg-slate-700 rounded-lg", children: _jsx(Bot, { className: "w-4 h-4 text-white" }) }), _jsx("div", { className: "flex-1 p-3 bg-slate-800/50 rounded-lg", children: _jsxs("div", { className: "flex space-x-1", children: [_jsx("div", { className: "w-2 h-2 bg-slate-400 rounded-full animate-bounce" }), _jsx("div", { className: "w-2 h-2 bg-slate-400 rounded-full animate-bounce", style: { animationDelay: '0.1s' } }), _jsx("div", { className: "w-2 h-2 bg-slate-400 rounded-full animate-bounce", style: { animationDelay: '0.2s' } })] }) })] }))] }), _jsxs("form", { onSubmit: handleSubmit, className: "flex space-x-2", children: [_jsx("input", { type: "text", value: message, onChange: (e) => setMessage(e.target.value), placeholder: "Ask about your goals, habits, or get insights...", className: "flex-1 px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500", disabled: isLoading }), _jsx("button", { type: "submit", disabled: isLoading || !message.trim(), className: "px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:cursor-not-allowed rounded-lg transition-colors", children: _jsx(Send, { className: "w-4 h-4 text-white" }) })] })] }));
}
