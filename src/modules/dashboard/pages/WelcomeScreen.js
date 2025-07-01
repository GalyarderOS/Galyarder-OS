import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Smile, Meh, Frown, Sparkles, CheckCircle } from 'lucide-react';
import { useAppStore } from '../../../lib/store';
import { getInitials, getAvatarGradient } from '../../../lib/utils';
import { AIAssistantDialog } from '../../aiassistant/components/AIAssistantDialog';
import { allModules, iconMap } from '../../../data/modules';
import { useDockStore } from '../../../lib/stores/useDockStore';
import logo from '../../../assets/logo.png';
export function WelcomeScreen() {
    const navigate = useNavigate();
    const { user, setHasCompletedWelcome } = useAppStore();
    const { pinModule } = useDockStore();
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedModules, setSelectedModules] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const userInitials = getInitials(user?.name || 'User');
    const userGradient = getAvatarGradient(user?.name || 'User');
    const handleGetStarted = () => {
        // Pin any selected modules that aren't already pinned
        selectedModules.forEach(moduleId => {
            pinModule(moduleId);
        });
        setHasCompletedWelcome(true);
        navigate('/');
    };
    // Filter modules based on search and category
    const filteredModules = allModules.filter(module => {
        const matchesSearch = module.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || module.category === selectedCategory;
        // Exclude Settings and Command Palette from the list
        const isSystemModule = module.id === 'settings' || module.id === 'command-palette';
        return matchesSearch && matchesCategory && !isSystemModule;
    });
    // Categories for filtering
    const categories = [
        { id: 'all', name: 'All' },
        { id: 'productivity', name: 'Productivity' },
        { id: 'health', name: 'Health & Wellness' },
        { id: 'finance', name: 'Finance' },
        { id: 'personal', name: 'Personal' },
        { id: 'system', name: 'System' }
    ];
    // Toggle module selection
    const toggleModuleSelection = (moduleId) => {
        setSelectedModules(prev => prev.includes(moduleId)
            ? prev.filter(id => id !== moduleId)
            : [...prev, moduleId]);
    };
    const steps = [
        {
            title: "Welcome to GalyarderOS",
            content: (_jsxs("div", { className: "text-center space-y-6", children: [_jsx(motion.div, { initial: { scale: 0 }, animate: { scale: 1 }, transition: { delay: 0.3, type: "spring", stiffness: 200 }, className: "w-32 h-32 mx-auto mb-6 flex items-center justify-center", children: _jsx("img", { src: logo, alt: "GalyarderOS Logo", className: "w-full h-full" }) }), _jsxs("h2", { className: "text-3xl font-bold text-white mb-4", children: ["Hello, ", user?.name || 'User', "!"] }), _jsx("p", { className: "text-slate-300 text-lg leading-relaxed max-w-2xl mx-auto", children: "Welcome to your personal civilization system. GalyarderOS is designed to help you optimize every aspect of your life through intelligent modules and AI-powered insights." })] }))
        },
        {
            title: "Explore Your Modules",
            content: (_jsxs("div", { className: "space-y-6", children: [_jsx("p", { className: "text-slate-300 text-center mb-8", children: "GalyarderOS now includes 27 integrated life systems to help you manage every dimension of your life with clarity, sovereignty, and AI assistance." }), _jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6", children: [_jsx("div", { className: "relative w-full md:w-64", children: _jsx("input", { id: "module-search", type: "text", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), placeholder: "Search modules...", className: "w-full pl-4 pr-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500" }) }), _jsx("div", { className: "flex flex-wrap gap-2", children: categories.map(category => (_jsx("button", { onClick: () => setSelectedCategory(category.id), className: `px-3 py-1.5 rounded-lg text-sm transition-colors ${selectedCategory === category.id
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`, children: category.name }, category.id))) })] }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-[60vh] overflow-y-auto p-2", children: filteredModules.map((module) => {
                            const ModuleIcon = iconMap[module.icon];
                            const isSelected = selectedModules.includes(module.id);
                            const isNew = ['environment-architect', 'sleep-architect', 'spiritual-forge', 'meta-memory', 'ops-center', 'family-matrix', 'digital-sovereignty', 'world-intelligence', 'system-kernel'].includes(module.id);
                            const isCore = ['dashboard', 'ai-assistant', 'chrono-copilot', 'finance-hub', 'health-forge', 'productivity-matrix', 'mind-guard'].includes(module.id);
                            return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.1 }, className: `p-4 rounded-xl cursor-pointer transition-all duration-200 border-2 ${isSelected
                                    ? 'bg-blue-600/20 border-blue-500'
                                    : 'bg-slate-800/30 border-transparent hover:bg-slate-800/50 hover:border-slate-700'}`, onClick: () => toggleModuleSelection(module.id), children: [_jsxs("div", { className: "relative", children: [_jsx("div", { className: `w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${module.color} mb-3 mx-auto`, children: ModuleIcon && _jsx(ModuleIcon, { className: "w-6 h-6 text-white" }) }), _jsxs("div", { className: "absolute -top-2 -right-2 flex space-x-1", children: [isNew && (_jsxs("span", { className: "bg-purple-600 text-white text-xs px-2 py-0.5 rounded-full flex items-center", children: [_jsx(Sparkles, { className: "w-3 h-3 mr-1" }), "New"] })), isCore && (_jsx("span", { className: "bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full", children: "Core" })), module.tag && !isCore && !isNew && (_jsx("span", { className: `text-xs px-2 py-0.5 rounded-full ${module.tag === 'Personal' ? 'bg-emerald-600/20 text-emerald-400' :
                                                            module.tag === 'Advanced' ? 'bg-purple-600/20 text-purple-400' :
                                                                'bg-blue-600/20 text-blue-400'}`, children: module.tag }))] }), isSelected && (_jsx("div", { className: "absolute -top-2 -left-2 bg-blue-500 rounded-full p-1", children: _jsx(CheckCircle, { className: "w-3 h-3 text-white" }) }))] }), _jsxs("div", { className: "text-center", children: [_jsx("h3", { className: "text-sm font-medium text-white mb-1", children: module.name }), _jsx("p", { className: "text-xs text-slate-400 line-clamp-2", children: module.description || `${module.category.charAt(0).toUpperCase() + module.category.slice(1)} module` })] })] }, module.id));
                        }) }), _jsxs("div", { className: "text-center text-sm text-slate-400", children: [_jsx("p", { children: "Click on modules to add them to your dock for quick access" }), _jsxs("p", { className: "mt-1", children: ["Selected: ", selectedModules.length, " modules"] })] })] }))
        },
        {
            title: "Meet Your AI Assistant",
            content: (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsx("div", { className: "w-16 h-16 mx-auto mb-4 flex items-center justify-center", children: _jsx("img", { src: logo, alt: "GalyarderOS Logo", className: "w-full h-full" }) }), _jsx("h3", { className: "text-xl font-semibold text-white mb-2", children: "Galyarder AI Assistant" }), _jsx("p", { className: "text-slate-300", children: "Your intelligent companion is ready to help you optimize your personal civilization. Try asking a question below!" })] }), _jsx("div", { className: "max-w-2xl mx-auto", children: _jsx(AIAssistantDialog, {}) })] }))
        },
        {
            title: "How are you feeling today?",
            content: (_jsxs("div", { className: "space-y-8 text-center", children: [_jsx("p", { className: "text-slate-300 text-lg", children: "Let's personalize your experience. How are you feeling today?" }), _jsx("div", { className: "flex justify-center space-x-8", children: [
                            { emoji: Smile, text: "Great", color: "bg-emerald-600" },
                            { emoji: Meh, text: "Okay", color: "bg-amber-600" },
                            { emoji: Frown, text: "Not Great", color: "bg-red-600" }
                        ].map((mood, index) => (_jsxs(motion.button, { whileHover: { scale: 1.1 }, whileTap: { scale: 0.95 }, className: `flex flex-col items-center space-y-3 p-4 rounded-xl ${mood.color} hover:opacity-90 transition-opacity`, children: [_jsx(mood.emoji, { className: "w-12 h-12 text-white" }), _jsx("span", { className: "text-white font-medium", children: mood.text })] }, index))) }), _jsx("p", { className: "text-slate-400 text-sm", children: "This helps us tailor recommendations and insights to your current state" })] }))
        }
    ];
    return (_jsx("div", { className: "min-h-screen flex flex-col items-center justify-center px-4 py-8", children: _jsxs("div", { className: "w-full max-w-6xl", children: [_jsx("div", { className: "flex justify-center mb-12", children: _jsx("div", { className: "flex space-x-4", children: steps.map((_, index) => (_jsx(motion.div, { className: `w-3 h-3 rounded-full transition-colors ${index <= currentStep ? 'bg-purple-500' : 'bg-slate-600'}`, animate: { scale: index === currentStep ? 1.2 : 1 } }, index))) }) }), _jsxs(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -20 }, transition: { duration: 0.3 }, className: "text-center", children: [_jsx("h1", { className: "text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-8", children: steps[currentStep].title }), _jsx("div", { className: "mb-12", children: steps[currentStep].content })] }, currentStep), _jsxs("div", { className: "flex justify-between items-center max-w-2xl mx-auto", children: [_jsx("button", { onClick: () => setCurrentStep(Math.max(0, currentStep - 1)), disabled: currentStep === 0, className: "px-6 py-3 text-slate-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors", children: "Previous" }), _jsx("div", { className: "flex space-x-4", children: currentStep < steps.length - 1 ? (_jsxs("button", { onClick: () => setCurrentStep(currentStep + 1), className: "flex items-center space-x-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-white transition-colors", children: [_jsx("span", { children: "Next" }), _jsx(ArrowRight, { className: "w-4 h-4" })] })) : (_jsxs("button", { onClick: handleGetStarted, className: "flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg text-white transition-all duration-200 shadow-lg", children: [_jsx(CheckCircle, { className: "w-5 h-5" }), _jsx("span", { children: "Start Using GalyarderOS" })] })) })] }), _jsx("div", { className: "text-center mt-8", children: _jsx("button", { onClick: handleGetStarted, className: "text-slate-400 hover:text-white text-sm transition-colors", children: "Skip introduction" }) })] }) }));
}
