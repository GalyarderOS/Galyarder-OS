import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Sparkles, Terminal, Shield, Settings, Activity, Bot } from 'lucide-react';
import { useAppStore } from '../../../lib/store';
import { getInitials, getAvatarGradient } from '../../../lib/utils';
import logo from '../../../assets/logo.png';
export function AIAssistantTerminal() {
    const { user } = useAppStore();
    const [message, setMessage] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [messages, setMessages] = useState([]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (message.trim()) {
            setIsProcessing(true);
            // Add user message
            const userMessage = { role: 'user', content: message };
            setMessages(prev => [...prev, userMessage]);
            console.log('Processing system command:', message);
            // Simulate processing time
            await new Promise(resolve => setTimeout(resolve, 1500));
            // Add AI response
            const responses = [
                "System status: All modules operational. Performance optimal.",
                "Module manager accessed. 12 modules available for configuration.",
                "Security scan completed. No threats detected. System secure.",
                "Terminal access granted. Ready for advanced commands.",
                "I can help you manage your personal civilization system. What would you like to optimize today?"
            ];
            const aiResponse = {
                role: 'assistant',
                content: responses[Math.floor(Math.random() * responses.length)]
            };
            setMessages(prev => [...prev, aiResponse]);
            setMessage('');
            setIsProcessing(false);
        }
    };
    const quickCommands = [
        { label: 'System Status', command: 'show system status', icon: Activity },
        { label: 'Module Manager', command: 'open module manager', icon: Settings },
        { label: 'Security Check', command: 'run security scan', icon: Shield },
        { label: 'Terminal', command: 'open terminal', icon: Terminal }
    ];
    // Generate user avatar
    const userInitials = getInitials(user?.name || 'User');
    const userGradient = getAvatarGradient(user?.name || 'User');
    return (_jsx("div", { className: "w-full max-w-2xl mx-auto", children: _jsxs("div", { className: "bg-slate-800/40 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-6 shadow-2xl", children: [_jsxs("div", { className: "flex items-center space-x-3 mb-4", children: [_jsx("img", { src: logo, alt: "GalyarderOS Logo", className: "w-8 h-8" }), _jsx("h3", { className: "text-xl font-medium text-white", children: "Galyarder Architect Intelligent" })] }), _jsx("div", { className: "mb-6 p-4 bg-slate-700/40 rounded-lg border border-slate-600/30", children: _jsx("p", { className: "text-slate-300 leading-relaxed", children: "\uD83D\uDC4B Hello! I am Galyarder, your AI Assistant. Ready to help with anything on your OS\u2014just type your question or request!" }) }), _jsx("div", { className: "mb-6 max-h-64 overflow-y-auto", children: messages.length === 0 ? (_jsxs("div", { className: "text-center py-8", children: [_jsx(Sparkles, { className: "w-12 h-12 text-slate-400 mx-auto mb-4" }), _jsx("p", { className: "text-slate-400", children: "Start a conversation with your AI assistant" })] })) : (_jsxs("div", { className: "space-y-4", children: [messages.map((msg, index) => (_jsxs(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, className: `flex items-start space-x-3 ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`, children: [_jsx("div", { className: `p-2 rounded-lg ${msg.role === 'user'
                                            ? 'bg-blue-600'
                                            : 'bg-slate-700'}`, children: msg.role === 'user' ? (user?.avatar ? (_jsx("img", { src: user.avatar, alt: "User", className: "w-4 h-4 rounded-full object-cover" })) : (_jsx("div", { className: `w-4 h-4 rounded-full bg-gradient-to-br ${userGradient} flex items-center justify-center`, children: _jsx("span", { className: "text-white text-xs font-bold", children: userInitials }) }))) : (_jsx(Bot, { className: "w-4 h-4 text-white" })) }), _jsx("div", { className: `flex-1 p-3 rounded-lg ${msg.role === 'user'
                                            ? 'bg-blue-600/20 text-blue-100'
                                            : 'bg-slate-800/50 text-slate-200'}`, children: _jsx("p", { className: "text-sm whitespace-pre-wrap", children: msg.content }) })] }, index))), isProcessing && (_jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "flex items-start space-x-3", children: [_jsx("div", { className: "p-2 bg-slate-700 rounded-lg", children: _jsx(Bot, { className: "w-4 h-4 text-white" }) }), _jsx("div", { className: "flex-1 p-3 bg-slate-800/50 rounded-lg", children: _jsxs("div", { className: "flex space-x-1", children: [_jsx("div", { className: "w-2 h-2 bg-slate-400 rounded-full animate-bounce" }), _jsx("div", { className: "w-2 h-2 bg-slate-400 rounded-full animate-bounce", style: { animationDelay: '0.1s' } }), _jsx("div", { className: "w-2 h-2 bg-slate-400 rounded-full animate-bounce", style: { animationDelay: '0.2s' } })] }) })] }))] })) }), _jsx("div", { className: "grid grid-cols-2 gap-3 mb-6", children: quickCommands.map((cmd, index) => (_jsxs(motion.button, { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, transition: { delay: 0.1 + index * 0.1 }, onClick: () => setMessage(cmd.command), className: "flex items-center space-x-2 p-3 bg-slate-700/30 hover:bg-slate-600/40 border border-slate-600/30 rounded-lg transition-all duration-200 group", children: [_jsx(cmd.icon, { className: "w-4 h-4 text-slate-400 group-hover:text-white" }), _jsx("span", { className: "text-sm text-slate-300 group-hover:text-white", children: cmd.label })] }, cmd.label))) }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { className: "relative", children: [_jsx("input", { type: "text", value: message, onChange: (e) => setMessage(e.target.value), placeholder: "Type your question or ask for help...", className: "w-full px-4 py-3 bg-slate-800/60 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200", disabled: isProcessing }), _jsx("button", { type: "submit", disabled: !message.trim() || isProcessing, className: "absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1.5 bg-purple-600 hover:bg-purple-500 disabled:bg-slate-700 disabled:cursor-not-allowed rounded-md transition-colors", children: isProcessing ? (_jsx("div", { className: "w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" })) : (_jsx(Send, { className: "w-4 h-4 text-white" })) })] }), _jsxs("div", { className: "flex items-center justify-between text-xs", children: [_jsx("p", { className: "text-slate-500", children: "Galyarder can answer questions, provide tips, or control OS modules!" }), isProcessing && (_jsx("span", { className: "text-purple-400 animate-pulse", children: "Processing..." }))] })] }), _jsxs("div", { className: "mt-6 pt-6 border-t border-slate-600/30", children: [_jsx("h4", { className: "text-sm font-medium text-slate-300 mb-3", children: "System Capabilities" }), _jsxs("div", { className: "grid grid-cols-2 gap-2 text-xs text-slate-400", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { className: "w-1.5 h-1.5 bg-emerald-400 rounded-full" }), _jsx("span", { children: "System Management" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { className: "w-1.5 h-1.5 bg-blue-400 rounded-full" }), _jsx("span", { children: "Module Control" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { className: "w-1.5 h-1.5 bg-purple-400 rounded-full" }), _jsx("span", { children: "Security Operations" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { className: "w-1.5 h-1.5 bg-amber-400 rounded-full" }), _jsx("span", { children: "Performance Monitoring" })] })] })] })] }) }));
}
