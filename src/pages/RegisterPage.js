import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, User, Lock, ArrowLeft, Check, Shield, Zap, Target, Brain, Bot, Command } from 'lucide-react';
import { useAppStore } from '../lib/store';
import logo from '../assets/logo.png';
export function RegisterPage() {
    const navigate = useNavigate();
    const { setUser, setHasCompletedWelcome } = useAppStore();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [step, setStep] = useState(1);
    const [selectedModules, setSelectedModules] = useState([
        'dashboard', 'ai-assistant', 'chrono-copilot', 'finance-hub', 'health-forge'
    ]);
    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        }
        else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
        }
        else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm())
            return;
        setIsLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            // Create user account
            const newUser = {
                id: Math.random().toString(36).substr(2, 9),
                name: formData.name,
                email: formData.email,
                avatar: formData.email.includes('@gmail.com')
                    ? `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=4285f4&color=fff&size=150`
                    : undefined
            };
            setUser(newUser);
            setHasCompletedWelcome(false); // New users should see welcome flow
            // Redirect to welcome screen
            navigate('/welcome');
        }
        catch (error) {
            console.error('Registration error:', error);
        }
        finally {
            setIsLoading(false);
        }
    };
    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };
    const handleNextStep = () => {
        if (validateForm()) {
            setStep(2);
        }
    };
    const toggleModuleSelection = (moduleId) => {
        setSelectedModules(prev => prev.includes(moduleId)
            ? prev.filter(id => id !== moduleId)
            : [...prev, moduleId]);
    };
    // Core modules for selection
    const coreModules = [
        { id: 'dashboard', name: 'Dashboard', icon: Command, color: 'from-blue-500 to-blue-600' },
        { id: 'ai-assistant', name: 'AI Assistant', icon: Bot, color: 'from-purple-500 to-purple-600' },
        { id: 'chrono-copilot', name: 'Chrono Copilot', icon: Zap, color: 'from-emerald-500 to-emerald-600' },
        { id: 'finance-hub', name: 'Finance Hub', icon: Target, color: 'from-green-500 to-green-600' },
        { id: 'health-forge', name: 'Health Forge', icon: Brain, color: 'from-red-500 to-red-600' },
        { id: 'productivity-matrix', name: 'Productivity Matrix', icon: Shield, color: 'from-amber-500 to-amber-600' }
    ];
    return (_jsxs("div", { className: "min-h-screen flex", children: [_jsxs("div", { className: "flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-20 xl:px-24 bg-slate-950 relative overflow-hidden", children: [_jsxs("div", { className: "absolute inset-0 z-0", children: [_jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.08),transparent_50%)]" }), _jsx("div", { className: "absolute inset-0", children: _jsx("div", { className: "h-full w-full bg-[linear-gradient(rgba(124,58,237,0.05)_1px,transparent_1px),linear-gradient(to_right,rgba(124,58,237,0.05)_1px,transparent_1px)] bg-[size:32px_32px] opacity-[0.15]" }) }), _jsx(motion.div, { className: "absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-purple-600/5 blur-3xl", animate: {
                                    x: [0, -10, 0],
                                    y: [0, 10, 0],
                                }, transition: {
                                    duration: 8,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                } }), _jsx(motion.div, { className: "absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-blue-600/5 blur-3xl", animate: {
                                    x: [0, 10, 0],
                                    y: [0, -10, 0],
                                }, transition: {
                                    duration: 10,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                } })] }), _jsxs("div", { className: "mx-auto w-full max-w-sm lg:w-96 relative z-10", children: [_jsxs("div", { className: "mb-8", children: [_jsxs(Link, { to: "/", className: "inline-flex items-center space-x-2 text-slate-400 hover:text-white transition-colors mb-8", children: [_jsx(ArrowLeft, { className: "w-4 h-4" }), _jsx("span", { children: "Back to home" })] }), _jsxs("div", { className: "flex items-center space-x-3 mb-6", children: [_jsx("img", { src: logo, alt: "GalyarderOS Logo", className: "w-10 h-10" }), _jsx("span", { className: "text-white font-semibold text-xl", children: "GalyarderOS" })] }), _jsx("h2", { className: "text-3xl font-bold text-white mb-2", children: step === 1 ? 'Get Started with GalyarderOS' : 'Customize Your OS' }), _jsx("p", { className: "text-slate-400", children: step === 1
                                            ? 'Begin your journey of self-mastery and intelligent optimization'
                                            : 'Select the modules you want to start with' })] }), step === 1 && (_jsxs(motion.form, { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: 20 }, className: "space-y-6", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "name", className: "block text-sm font-medium text-slate-300 mb-2", children: "Full Name" }), _jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: _jsx(User, { className: "h-5 w-5 text-slate-400" }) }), _jsx("input", { id: "name", type: "text", value: formData.name, onChange: (e) => handleInputChange('name', e.target.value), className: `block w-full pl-10 pr-3 py-3 border rounded-lg bg-slate-800/50 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${errors.name ? 'border-red-500' : 'border-slate-600'}`, placeholder: "Enter your full name" })] }), errors.name && (_jsx("p", { className: "mt-1 text-sm text-red-400", children: errors.name }))] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "email", className: "block text-sm font-medium text-slate-300 mb-2", children: "Email Address" }), _jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: _jsx(Mail, { className: "h-5 w-5 text-slate-400" }) }), _jsx("input", { id: "email", type: "email", value: formData.email, onChange: (e) => handleInputChange('email', e.target.value), className: `block w-full pl-10 pr-3 py-3 border rounded-lg bg-slate-800/50 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${errors.email ? 'border-red-500' : 'border-slate-600'}`, placeholder: "Enter your email" })] }), errors.email && (_jsx("p", { className: "mt-1 text-sm text-red-400", children: errors.email })), formData.email.includes('@gmail.com') && !errors.email && (_jsxs(motion.p, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "mt-1 text-sm text-blue-400 flex items-center space-x-1", children: [_jsx(Check, { className: "w-3 h-3" }), _jsx("span", { children: "Gmail integration available" })] }))] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "password", className: "block text-sm font-medium text-slate-300 mb-2", children: "Password" }), _jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: _jsx(Lock, { className: "h-5 w-5 text-slate-400" }) }), _jsx("input", { id: "password", type: showPassword ? 'text' : 'password', value: formData.password, onChange: (e) => handleInputChange('password', e.target.value), className: `block w-full pl-10 pr-10 py-3 border rounded-lg bg-slate-800/50 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${errors.password ? 'border-red-500' : 'border-slate-600'}`, placeholder: "Create a password" }), _jsx("button", { type: "button", onClick: () => setShowPassword(!showPassword), className: "absolute inset-y-0 right-0 pr-3 flex items-center", children: showPassword ? (_jsx(EyeOff, { className: "h-5 w-5 text-slate-400 hover:text-slate-300" })) : (_jsx(Eye, { className: "h-5 w-5 text-slate-400 hover:text-slate-300" })) })] }), errors.password && (_jsx("p", { className: "mt-1 text-sm text-red-400", children: errors.password }))] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "confirmPassword", className: "block text-sm font-medium text-slate-300 mb-2", children: "Confirm Password" }), _jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: _jsx(Lock, { className: "h-5 w-5 text-slate-400" }) }), _jsx("input", { id: "confirmPassword", type: showConfirmPassword ? 'text' : 'password', value: formData.confirmPassword, onChange: (e) => handleInputChange('confirmPassword', e.target.value), className: `block w-full pl-10 pr-10 py-3 border rounded-lg bg-slate-800/50 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${errors.confirmPassword ? 'border-red-500' : 'border-slate-600'}`, placeholder: "Confirm your password" }), _jsx("button", { type: "button", onClick: () => setShowConfirmPassword(!showConfirmPassword), className: "absolute inset-y-0 right-0 pr-3 flex items-center", children: showConfirmPassword ? (_jsx(EyeOff, { className: "h-5 w-5 text-slate-400 hover:text-slate-300" })) : (_jsx(Eye, { className: "h-5 w-5 text-slate-400 hover:text-slate-300" })) })] }), errors.confirmPassword && (_jsx("p", { className: "mt-1 text-sm text-red-400", children: errors.confirmPassword }))] }), _jsxs("div", { className: "flex items-start", children: [_jsx("div", { className: "flex items-center h-5", children: _jsx("input", { id: "terms", name: "terms", type: "checkbox", className: "h-4 w-4 text-purple-600 focus:ring-purple-500 border-slate-600 rounded bg-slate-800" }) }), _jsx("div", { className: "ml-3 text-sm", children: _jsxs("label", { htmlFor: "terms", className: "text-slate-300", children: ["I agree to the ", _jsx("a", { href: "#", className: "text-purple-400 hover:text-purple-300", children: "Terms of Service" }), " and ", _jsx("a", { href: "#", className: "text-purple-400 hover:text-purple-300", children: "Privacy Policy" })] }) })] }), _jsx("button", { type: "button", onClick: handleNextStep, className: "w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200", children: "Continue" }), _jsx("div", { className: "text-center", children: _jsxs("p", { className: "text-slate-400", children: ["Already have an account?", ' ', _jsx(Link, { to: "/login", className: "text-purple-400 hover:text-purple-300 transition-colors", children: "Sign in" })] }) })] })), step === 2 && (_jsxs(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -20 }, className: "space-y-6", children: [_jsx("div", { className: "bg-slate-800/30 rounded-xl p-4 border border-slate-700", children: _jsx("p", { className: "text-sm text-slate-300", children: "Select the modules you want to start with. You can add more later." }) }), _jsx("div", { className: "grid grid-cols-2 gap-3", children: coreModules.map((module) => (_jsx("div", { onClick: () => toggleModuleSelection(module.id), className: `p-3 rounded-xl cursor-pointer transition-all ${selectedModules.includes(module.id)
                                                ? 'bg-purple-600/20 border-2 border-purple-500'
                                                : 'bg-slate-800/50 border border-slate-700 hover:border-slate-600'}`, children: _jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: `w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br ${module.color}`, children: _jsx(module.icon, { className: "w-5 h-5 text-white" }) }), _jsx("span", { className: "text-sm font-medium text-white", children: module.name }), selectedModules.includes(module.id) && (_jsx(Check, { className: "w-4 h-4 text-purple-400 ml-auto" }))] }) }, module.id))) }), _jsxs("div", { className: "flex space-x-3", children: [_jsx("button", { type: "button", onClick: () => setStep(1), className: "flex-1 py-3 px-4 border border-slate-600 rounded-lg text-white hover:bg-slate-800 transition-colors", children: "Back" }), _jsx("button", { type: "button", onClick: handleSubmit, disabled: isLoading, className: "flex-1 flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200", children: isLoading ? (_jsx("div", { className: "w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" })) : ('Create My Account') })] })] }))] })] }), _jsx("div", { className: "hidden lg:block relative w-0 flex-1", children: _jsxs("div", { className: "absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-800", children: [_jsx("div", { className: "absolute inset-0 bg-black/20" }), _jsx("div", { className: "absolute inset-0 opacity-10", children: _jsx("div", { className: "h-full w-full bg-[linear-gradient(white_1px,transparent_1px),linear-gradient(to_right,white_1px,transparent_1px)] bg-[size:32px_32px]" }) }), _jsx(motion.div, { className: "absolute top-1/3 left-1/3 w-40 h-40 bg-white/5 rounded-2xl backdrop-blur-md", animate: {
                                y: [0, -20, 0],
                                rotate: [0, 5, 0]
                            }, transition: {
                                duration: 10,
                                repeat: Infinity,
                                ease: "easeInOut"
                            } }), _jsx(motion.div, { className: "absolute bottom-1/3 right-1/3 w-48 h-48 bg-white/5 rounded-2xl backdrop-blur-md", animate: {
                                y: [0, 20, 0],
                                rotate: [0, -5, 0]
                            }, transition: {
                                duration: 12,
                                repeat: Infinity,
                                ease: "easeInOut"
                            } }), _jsx("div", { className: "relative h-full flex flex-col justify-center items-center p-12 text-center", children: _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8 }, children: [_jsx("div", { className: "mb-8", children: _jsx("img", { src: logo, alt: "GalyarderOS Logo", className: "w-24 h-24 mx-auto" }) }), _jsx("h2", { className: "text-4xl font-bold text-white mb-6", children: "Join the Future of Personal Optimization" }), _jsx("p", { className: "text-xl text-blue-100 mb-8 max-w-md", children: "Transform your life with AI-powered insights and intelligent automation" }), _jsxs("div", { className: "bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-md mx-auto mb-8 border border-white/10", children: [_jsx("h3", { className: "text-white font-semibold mb-6", children: "27+ Integrated Life Modules" }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center space-x-3", children: [_jsx(Bot, { className: "w-5 h-5 text-purple-300" }), _jsxs("div", { className: "text-left", children: [_jsx("p", { className: "text-white text-sm font-medium", children: "AI Assistant" }), _jsx("p", { className: "text-blue-200 text-xs", children: "Personalized insights" })] })] }), _jsxs("div", { className: "bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center space-x-3", children: [_jsx(Target, { className: "w-5 h-5 text-emerald-300" }), _jsxs("div", { className: "text-left", children: [_jsx("p", { className: "text-white text-sm font-medium", children: "Goal Tracking" }), _jsx("p", { className: "text-blue-200 text-xs", children: "Achievement system" })] })] }), _jsxs("div", { className: "bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center space-x-3", children: [_jsx(Zap, { className: "w-5 h-5 text-amber-300" }), _jsxs("div", { className: "text-left", children: [_jsx("p", { className: "text-white text-sm font-medium", children: "Time Optimization" }), _jsx("p", { className: "text-blue-200 text-xs", children: "Maximize productivity" })] })] }), _jsxs("div", { className: "bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center space-x-3", children: [_jsx(Brain, { className: "w-5 h-5 text-blue-300" }), _jsxs("div", { className: "text-left", children: [_jsx("p", { className: "text-white text-sm font-medium", children: "Mind Guard" }), _jsx("p", { className: "text-blue-200 text-xs", children: "Mental wellness" })] })] })] })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-white mb-2", children: "\u221E" }), _jsx("p", { className: "text-blue-200 text-sm", children: "Infinite Potential. Complete Control." })] })] }) })] }) })] }));
}
