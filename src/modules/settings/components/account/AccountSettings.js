import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Key, Camera, Check, X, RefreshCw, Shield } from 'lucide-react';
import { useAppStore } from '../../../../lib/store';
export function AccountSettings() {
    const { user, updateUserProfile } = useAppStore();
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(user?.name || '');
    const [editedEmail, setEditedEmail] = useState(user?.email || '');
    const [avatarPreview, setAvatarPreview] = useState(user?.avatar || '');
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordSuccess, setPasswordSuccess] = useState(false);
    const fileInputRef = React.useRef(null);
    const handleImageUpload = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setAvatarPreview(e.target?.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const handleSave = () => {
        if (user) {
            updateUserProfile({
                name: editedName,
                email: editedEmail,
                avatar: avatarPreview
            });
        }
        setIsEditing(false);
    };
    const handleCancel = () => {
        setEditedName(user?.name || '');
        setEditedEmail(user?.email || '');
        setAvatarPreview(user?.avatar || '');
        setIsEditing(false);
    };
    const handlePasswordChange = (e) => {
        e.preventDefault();
        setPasswordError('');
        // Validate passwords
        if (newPassword.length < 8) {
            setPasswordError('Password must be at least 8 characters');
            return;
        }
        if (newPassword !== confirmPassword) {
            setPasswordError('Passwords do not match');
            return;
        }
        // Simulate password change
        setTimeout(() => {
            setPasswordSuccess(true);
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            // Reset success message after 3 seconds
            setTimeout(() => {
                setPasswordSuccess(false);
                setShowPasswordForm(false);
            }, 3000);
        }, 1000);
    };
    // Generate default avatar if no avatar is set
    const generateDefaultAvatar = (name) => {
        const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
        const colors = [
            'from-blue-500 to-blue-600',
            'from-purple-500 to-purple-600',
            'from-emerald-500 to-emerald-600',
            'from-amber-500 to-amber-600',
            'from-pink-500 to-pink-600',
            'from-indigo-500 to-indigo-600'
        ];
        const colorIndex = name.length % colors.length;
        return { initials, gradient: colors[colorIndex] };
    };
    const defaultAvatar = generateDefaultAvatar(editedName || 'User');
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "bg-slate-800/40 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-6", children: [_jsxs("h3", { className: "text-lg font-medium text-white mb-4 flex items-center space-x-2", children: [_jsx(User, { className: "w-5 h-5 text-blue-400" }), _jsx("span", { children: "Profile Information" })] }), _jsxs("div", { className: "flex flex-col md:flex-row gap-6", children: [_jsxs("div", { className: "flex flex-col items-center space-y-4", children: [_jsxs("div", { className: "relative group", children: [avatarPreview ? (_jsx("img", { src: avatarPreview, alt: "Profile", className: "w-32 h-32 rounded-full ring-4 ring-slate-600/50 object-cover" })) : (_jsx("div", { className: `w-32 h-32 rounded-full ring-4 ring-slate-600/50 bg-gradient-to-br ${defaultAvatar.gradient} flex items-center justify-center`, children: _jsx("span", { className: "text-white text-4xl font-bold", children: defaultAvatar.initials }) })), isEditing && (_jsx(motion.button, { initial: { opacity: 0 }, animate: { opacity: 1 }, onClick: () => fileInputRef.current?.click(), className: "absolute inset-0 bg-black/60 rounded-full flex items-center justify-center \n                           opacity-0 group-hover:opacity-100 transition-opacity duration-200", "aria-label": "Change profile photo", children: _jsx(Camera, { className: "w-8 h-8 text-white" }) }))] }), _jsx("input", { ref: fileInputRef, type: "file", accept: "image/*", onChange: handleImageUpload, className: "hidden", "aria-label": "Upload profile photo" }), isEditing && (_jsx("button", { onClick: () => fileInputRef.current?.click(), className: "text-sm text-blue-400 hover:text-blue-300 transition-colors\n                         px-3 py-1 rounded-md hover:bg-blue-500/10", children: "Change Photo" }))] }), _jsxs("div", { className: "flex-1 space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-300 mb-2", children: "Display Name" }), isEditing ? (_jsx("input", { type: "text", value: editedName, onChange: (e) => setEditedName(e.target.value), className: "w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 \n                           rounded-lg text-white placeholder-slate-400 \n                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent\n                           transition-all duration-200", placeholder: "Enter your name" })) : (_jsxs("div", { className: "flex items-center space-x-3 p-3 bg-slate-700/30 rounded-lg", children: [_jsx(User, { className: "w-4 h-4 text-slate-400" }), _jsx("span", { className: "text-white", children: user?.name })] }))] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-300 mb-2", children: "Email Address" }), isEditing ? (_jsx("input", { type: "email", value: editedEmail, onChange: (e) => setEditedEmail(e.target.value), className: "w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 \n                           rounded-lg text-white placeholder-slate-400 \n                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent\n                           transition-all duration-200", placeholder: "Enter your email" })) : (_jsxs("div", { className: "flex items-center space-x-3 p-3 bg-slate-700/30 rounded-lg", children: [_jsx(Mail, { className: "w-4 h-4 text-slate-400" }), _jsx("span", { className: "text-white", children: user?.email })] }))] }), !isEditing && (_jsx("div", { children: _jsxs("button", { onClick: () => setShowPasswordForm(!showPasswordForm), className: "flex items-center space-x-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors", children: [_jsx(Key, { className: "w-4 h-4" }), _jsx("span", { children: "Change Password" })] }) })), showPasswordForm && !isEditing && (_jsxs(motion.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: 'auto' }, exit: { opacity: 0, height: 0 }, className: "mt-4 p-4 bg-slate-700/30 rounded-lg border border-slate-600/50", children: [_jsxs("h4", { className: "text-sm font-medium text-white mb-3 flex items-center space-x-2", children: [_jsx(Shield, { className: "w-4 h-4 text-blue-400" }), _jsx("span", { children: "Change Password" })] }), passwordSuccess ? (_jsxs("div", { className: "flex items-center space-x-2 text-emerald-400 mb-2", children: [_jsx(Check, { className: "w-4 h-4" }), _jsx("span", { children: "Password updated successfully!" })] })) : (_jsxs("form", { onSubmit: handlePasswordChange, className: "space-y-3", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-xs text-slate-400 mb-1", children: "Current Password" }), _jsx("input", { type: "password", value: currentPassword, onChange: (e) => setCurrentPassword(e.target.value), className: "w-full px-3 py-2 bg-slate-800 border border-slate-600 \n                                 rounded-lg text-white placeholder-slate-500 \n                                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent", required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs text-slate-400 mb-1", children: "New Password" }), _jsx("input", { type: "password", value: newPassword, onChange: (e) => setNewPassword(e.target.value), className: "w-full px-3 py-2 bg-slate-800 border border-slate-600 \n                                 rounded-lg text-white placeholder-slate-500 \n                                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent", required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs text-slate-400 mb-1", children: "Confirm New Password" }), _jsx("input", { type: "password", value: confirmPassword, onChange: (e) => setConfirmPassword(e.target.value), className: "w-full px-3 py-2 bg-slate-800 border border-slate-600 \n                                 rounded-lg text-white placeholder-slate-500 \n                                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent", required: true })] }), passwordError && (_jsx("div", { className: "text-red-400 text-xs", children: passwordError })), _jsxs("div", { className: "flex justify-end space-x-2", children: [_jsx("button", { type: "button", onClick: () => setShowPasswordForm(false), className: "px-3 py-1.5 bg-slate-600 hover:bg-slate-500 text-white rounded-lg text-sm", children: "Cancel" }), _jsx("button", { type: "submit", className: "px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm", children: "Update Password" })] })] }))] })), _jsx("div", { className: "flex justify-end space-x-3 pt-4", children: isEditing ? (_jsxs(_Fragment, { children: [_jsxs("button", { onClick: handleCancel, className: "flex items-center space-x-2 px-4 py-3 bg-slate-700/50 hover:bg-slate-600/50 \n                             rounded-lg text-white transition-all duration-200 \n                             border border-slate-600/30 hover:border-slate-500/50", children: [_jsx(X, { className: "w-4 h-4" }), _jsx("span", { children: "Cancel" })] }), _jsxs("button", { onClick: handleSave, className: "flex items-center space-x-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 \n                             rounded-lg text-white transition-all duration-200 \n                             shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40", children: [_jsx(Check, { className: "w-4 h-4" }), _jsx("span", { children: "Save Changes" })] })] })) : (_jsxs("button", { onClick: () => setIsEditing(true), className: "flex items-center space-x-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 \n                           rounded-lg text-white transition-all duration-200 \n                           shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40", children: [_jsx(RefreshCw, { className: "w-4 h-4" }), _jsx("span", { children: "Edit Profile" })] })) })] })] })] }), _jsxs("div", { className: "bg-slate-800/40 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-6", children: [_jsx("h3", { className: "text-lg font-medium text-white mb-4", children: "Account Preferences" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-white", children: "Language" }), _jsx("p", { className: "text-xs text-slate-400", children: "Select your preferred language" })] }), _jsxs("select", { className: "bg-slate-700 border border-slate-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500", children: [_jsx("option", { value: "en", children: "English" }), _jsx("option", { value: "es", children: "Espa\u00F1ol" }), _jsx("option", { value: "fr", children: "Fran\u00E7ais" }), _jsx("option", { value: "de", children: "Deutsch" }), _jsx("option", { value: "ja", children: "\u65E5\u672C\u8A9E" }), _jsx("option", { value: "zh", children: "\u4E2D\u6587" })] })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-white", children: "Time Zone" }), _jsx("p", { className: "text-xs text-slate-400", children: "Set your local time zone" })] }), _jsxs("select", { className: "bg-slate-700 border border-slate-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500", children: [_jsx("option", { value: "utc", children: "UTC (GMT+0)" }), _jsx("option", { value: "est", children: "Eastern Time (GMT-5)" }), _jsx("option", { value: "cst", children: "Central Time (GMT-6)" }), _jsx("option", { value: "mst", children: "Mountain Time (GMT-7)" }), _jsx("option", { value: "pst", children: "Pacific Time (GMT-8)" }), _jsx("option", { value: "ist", children: "India (GMT+5:30)" }), _jsx("option", { value: "jst", children: "Japan (GMT+9)" })] })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-white", children: "Date Format" }), _jsx("p", { className: "text-xs text-slate-400", children: "Choose how dates are displayed" })] }), _jsxs("select", { className: "bg-slate-700 border border-slate-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500", children: [_jsx("option", { value: "mdy", children: "MM/DD/YYYY" }), _jsx("option", { value: "dmy", children: "DD/MM/YYYY" }), _jsx("option", { value: "ymd", children: "YYYY-MM-DD" })] })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-white", children: "First Day of Week" }), _jsx("p", { className: "text-xs text-slate-400", children: "Set calendar start day" })] }), _jsxs("select", { className: "bg-slate-700 border border-slate-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500", children: [_jsx("option", { value: "sunday", children: "Sunday" }), _jsx("option", { value: "monday", children: "Monday" })] })] })] })] }), _jsxs("div", { className: "bg-slate-800/40 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-6", children: [_jsx("h3", { className: "text-lg font-medium text-white mb-4", children: "Connected Accounts" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between p-3 bg-slate-700/30 rounded-lg", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "w-10 h-10 bg-[#4285F4] rounded-full flex items-center justify-center", children: _jsx("span", { className: "text-white font-bold", children: "G" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-white", children: "Google" }), _jsx("p", { className: "text-xs text-slate-400", children: user?.email?.includes('@gmail.com')
                                                            ? `Connected as ${user.email}`
                                                            : 'Not connected' })] })] }), _jsx("button", { className: `px-3 py-1.5 rounded-lg text-sm ${user?.email?.includes('@gmail.com')
                                            ? 'bg-red-600/20 text-red-400 hover:bg-red-600/30'
                                            : 'bg-blue-600 text-white hover:bg-blue-700'}`, children: user?.email?.includes('@gmail.com') ? 'Disconnect' : 'Connect' })] }), _jsxs("div", { className: "flex items-center justify-between p-3 bg-slate-700/30 rounded-lg", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "w-10 h-10 bg-[#1DA1F2] rounded-full flex items-center justify-center", children: _jsx("span", { className: "text-white font-bold", children: "T" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-white", children: "Twitter" }), _jsx("p", { className: "text-xs text-slate-400", children: "Not connected" })] })] }), _jsx("button", { className: "px-3 py-1.5 bg-blue-600 text-white hover:bg-blue-700 rounded-lg text-sm", children: "Connect" })] }), _jsxs("div", { className: "flex items-center justify-between p-3 bg-slate-700/30 rounded-lg", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "w-10 h-10 bg-[#0A66C2] rounded-full flex items-center justify-center", children: _jsx("span", { className: "text-white font-bold", children: "L" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-white", children: "LinkedIn" }), _jsx("p", { className: "text-xs text-slate-400", children: "Not connected" })] })] }), _jsx("button", { className: "px-3 py-1.5 bg-blue-600 text-white hover:bg-blue-700 rounded-lg text-sm", children: "Connect" })] })] })] })] }));
}
