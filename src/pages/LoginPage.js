import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, ArrowLeft, Bot, Shield, Zap, Target, Brain, Command } from 'lucide-react';
import { useAppStore } from '../lib/store';
import logo from '../assets/logo.png';
export function LoginPage() {
    const navigate = useNavigate();
    const { setUser, hasCompletedWelcome } = useAppStore();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const validateForm = () => {
        const newErrors = {};
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        }
        else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
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
            // Mock successful login
            const user = {
                id: '1',
                name: 'Alex Chen',
                email: formData.email,
                avatar: formData.email.includes('@gmail.com')
                    ? `https://ui-avatars.com/api/?name=${encodeURIComponent('Alex Chen')}&background=4285f4&color=fff&size=150`
                    : 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
            };
            setUser(user);
            // Redirect based on welcome completion status
            if (hasCompletedWelcome) {
                navigate('/');
            }
            else {
                navigate('/welcome');
            }
        }
        catch (error) {
            console.error('Login error:', error);
            setErrors({ general: 'Invalid email or password' });
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
    const handleDemoAccess = () => {
        setFormData({
            email: 'demo@galyarderos.com',
            password: 'demo123456'
        });
    };
    return (_jsxs("div", { className: "min-h-screen flex", children: [_jsxs("div", { className: "flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-20 xl:px-24 bg-slate-950 relative overflow-hidden", children: [_jsxs("div", { className: "absolute inset-0 z-0", children: [_jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08),transparent_50%)]" }), _jsx("div", { className: "absolute inset-0", children: _jsx("div", { className: "h-full w-full bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(to_right,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:32px_32px] opacity-[0.15]" }) }), _jsx(motion.div, { className: "absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-600/5 blur-3xl", animate: {
                                    x: [0, 10, 0],
                                    y: [0, -10, 0],
                                }, transition: {
                                    duration: 8,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                } }), _jsx(motion.div, { className: "absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-purple-600/5 blur-3xl", animate: {
                                    x: [0, -10, 0],
                                    y: [0, 10, 0],
                                }, transition: {
                                    duration: 10,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                } })] }), _jsxs("div", { className: "mx-auto w-full max-w-sm lg:w-96 relative z-10", children: [_jsxs("div", { className: "mb-8", children: [_jsxs(Link, { to: "/", className: "inline-flex items-center space-x-2 text-slate-400 hover:text-white transition-colors mb-8", children: [_jsx(ArrowLeft, { className: "w-4 h-4" }), _jsx("span", { children: "Back to home" })] }), _jsxs("div", { className: "flex items-center space-x-3 mb-6", children: [_jsx("img", { src: logo, alt: "GalyarderOS Logo", className: "w-10 h-10" }), _jsx("span", { className: "text-white font-semibold text-xl", children: "GalyarderOS" })] }), _jsx("h2", { className: "text-3xl font-bold text-white mb-2", children: "Welcome Back" }), _jsx("p", { className: "text-slate-400", children: "Your insights and systems await" })] }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [errors.general && (_jsx("div", { className: "bg-red-500/10 border border-red-500/20 rounded-lg p-3", children: _jsx("p", { className: "text-red-400 text-sm", children: errors.general }) })), _jsxs("div", { children: [_jsx("label", { htmlFor: "email", className: "block text-sm font-medium text-slate-300 mb-2", children: "Email Address" }), _jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: _jsx(Mail, { className: "h-5 w-5 text-slate-400" }) }), _jsx("input", { id: "email", type: "email", value: formData.email, onChange: (e) => handleInputChange('email', e.target.value), className: `block w-full pl-10 pr-3 py-3 border rounded-lg bg-slate-800/50 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${errors.email ? 'border-red-500' : 'border-slate-600'}`, placeholder: "Enter your email" })] }), errors.email && (_jsx("p", { className: "mt-1 text-sm text-red-400", children: errors.email }))] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "password", className: "block text-sm font-medium text-slate-300 mb-2", children: "Password" }), _jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: _jsx(Lock, { className: "h-5 w-5 text-slate-400" }) }), _jsx("input", { id: "password", type: showPassword ? 'text' : 'password', value: formData.password, onChange: (e) => handleInputChange('password', e.target.value), className: `block w-full pl-10 pr-10 py-3 border rounded-lg bg-slate-800/50 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${errors.password ? 'border-red-500' : 'border-slate-600'}`, placeholder: "Enter your password" }), _jsx("button", { type: "button", onClick: () => setShowPassword(!showPassword), className: "absolute inset-y-0 right-0 pr-3 flex items-center", children: showPassword ? (_jsx(EyeOff, { className: "h-5 w-5 text-slate-400 hover:text-slate-300" })) : (_jsx(Eye, { className: "h-5 w-5 text-slate-400 hover:text-slate-300" })) })] }), errors.password && (_jsx("p", { className: "mt-1 text-sm text-red-400", children: errors.password }))] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center", children: [_jsx("input", { id: "remember-me", name: "remember-me", type: "checkbox", className: "h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-600 rounded bg-slate-800" }), _jsx("label", { htmlFor: "remember-me", className: "ml-2 block text-sm text-slate-300", children: "Remember me" })] }), _jsx("div", { className: "text-sm", children: _jsx("a", { href: "#", className: "text-blue-400 hover:text-blue-300 transition-colors", children: "Forgot your password?" }) })] }), _jsx("button", { type: "submit", disabled: isLoading, className: "w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200", children: isLoading ? (_jsx("div", { className: "w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" })) : ('Enter My OS') }), _jsx("div", { className: "text-center", children: _jsxs("p", { className: "text-slate-400", children: ["Don't have an account?", ' ', _jsx(Link, { to: "/register", className: "text-blue-400 hover:text-blue-300 transition-colors", children: "Create one now" })] }) })] }), _jsxs("div", { className: "mt-8 p-4 bg-slate-800/30 rounded-lg border border-slate-700", children: [_jsxs("h4", { className: "text-sm font-medium text-slate-300 mb-2 flex items-center space-x-2", children: [_jsx(Command, { className: "w-4 h-4 text-blue-400" }), _jsx("span", { children: "Try Demo OS" })] }), _jsx("p", { className: "text-xs text-slate-400 mb-3", children: "Launch GalyarderOS instantly with a pre-configured demo account" }), _jsx("button", { onClick: handleDemoAccess, className: "w-full py-2 px-3 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 hover:text-blue-300 border border-blue-600/20 rounded-md text-sm transition-colors", children: "Launch Demo OS" })] })] })] }), _jsx("div", { className: "hidden lg:block relative w-0 flex-1", children: _jsxs("div", { className: "absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800", children: [_jsx("div", { className: "absolute inset-0 bg-black/20" }), _jsx("div", { className: "absolute inset-0 opacity-10", children: _jsx("div", { className: "h-full w-full bg-[linear-gradient(white_1px,transparent_1px),linear-gradient(to_right,white_1px,transparent_1px)] bg-[size:32px_32px]" }) }), _jsx(motion.div, { className: "absolute top-1/4 left-1/4 w-32 h-32 bg-white/5 rounded-lg backdrop-blur-md", animate: {
                                y: [0, -20, 0],
                                rotate: [0, 5, 0]
                            }, transition: {
                                duration: 10,
                                repeat: Infinity,
                                ease: "easeInOut"
                            } }), _jsx(motion.div, { className: "absolute bottom-1/4 right-1/4 w-40 h-40 bg-white/5 rounded-lg backdrop-blur-md", animate: {
                                y: [0, 20, 0],
                                rotate: [0, -5, 0]
                            }, transition: {
                                duration: 12,
                                repeat: Infinity,
                                ease: "easeInOut"
                            } }), _jsx("div", { className: "relative h-full flex flex-col justify-center items-center p-12 text-center", children: _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8 }, children: [_jsx("h2", { className: "text-4xl font-bold text-white mb-6", children: "Welcome Back to Your OS" }), _jsx("p", { className: "text-xl text-blue-100 mb-8 max-w-md", children: "Continue optimizing your life with AI-powered insights and intelligent automation" }), _jsxs("div", { className: "bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-md mx-auto mb-8 border border-white/10", children: [_jsxs("h3", { className: "text-white font-semibold mb-4 flex items-center justify-center space-x-2", children: [_jsx(Bot, { className: "w-5 h-5 text-blue-300" }), _jsx("span", { children: "Life System Status" })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Brain, { className: "w-4 h-4 text-purple-300" }), _jsx("span", { className: "text-white text-sm", children: "AI Insights" })] }), _jsx("span", { className: "text-green-300 text-sm", children: "8 new insights" })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Target, { className: "w-4 h-4 text-blue-300" }), _jsx("span", { className: "text-white text-sm", children: "Goals Progress" })] }), _jsx("span", { className: "text-blue-300 text-sm", children: "75% complete" })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Shield, { className: "w-4 h-4 text-emerald-300" }), _jsx("span", { className: "text-white text-sm", children: "System Security" })] }), _jsx("span", { className: "text-emerald-300 text-sm", children: "Protected" })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Zap, { className: "w-4 h-4 text-amber-300" }), _jsx("span", { className: "text-white text-sm", children: "Module Activity" })] }), _jsx("span", { className: "text-amber-300 text-sm", children: "High" })] })] })] }), _jsx("p", { className: "text-blue-200 text-sm", children: "Your personal civilization system is ready and waiting for you" })] }) })] }) })] }));
}
