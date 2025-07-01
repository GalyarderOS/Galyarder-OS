import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, User, Shield, Bell, Palette, Monitor, ChevronRight, Search, Bot, Command } from 'lucide-react';
import { useAppStore } from '../lib/store';
import { AppearanceSettings } from '../modules/settings/components/appearance/AppearanceSettings';
import { AccountSettings } from '../modules/settings/components/account/AccountSettings';
import { NotificationSettings } from '../modules/settings/components/notifications/NotificationSettings';
import { SystemSettings } from '../modules/settings/components/system/SystemSettings';
import { IntegrationSettings } from '../modules/settings/components/integrations/IntegrationSettings';
import { CommandSettings } from '../modules/settings/components/commands/CommandSettings';
import { SecuritySettings } from '../modules/settings/components/security/SecuritySettings';
export function Settings() {
    const { user, theme, setTheme } = useAppStore();
    const [activeSection, setActiveSection] = useState('appearance');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const settingsSections = [
        {
            id: 'appearance',
            title: 'Appearance',
            icon: Palette,
            description: 'Customize your interface'
        },
        {
            id: 'account',
            title: 'Account',
            icon: User,
            description: 'Manage your profile and preferences'
        },
        {
            id: 'security',
            title: 'Security & Privacy',
            icon: Shield,
            description: 'Control your security settings'
        },
        {
            id: 'notifications',
            title: 'Notifications',
            icon: Bell,
            description: 'Configure alerts and updates'
        },
        {
            id: 'system',
            title: 'System',
            icon: Monitor,
            description: 'System preferences and performance'
        },
        {
            id: 'integrations',
            title: 'AI & Integrations',
            icon: Bot,
            description: 'Connect external services and AI providers'
        },
        {
            id: 'commands',
            title: 'Commands & Shortcuts',
            icon: Command,
            description: 'Customize commands and keyboard shortcuts'
        }
    ];
    // Search functionality
    useEffect(() => {
        if (!searchQuery.trim()) {
            setSearchResults([]);
            return;
        }
        const results = [];
        // Search in appearance settings
        ['Theme', 'Color scheme', 'Accent color', 'Animations', 'Sidebar', 'Display'].forEach(label => {
            if (label.toLowerCase().includes(searchQuery.toLowerCase())) {
                results.push({ section: 'appearance', label });
            }
        });
        // Search in account settings
        ['Profile', 'Email', 'Password', 'Avatar', 'Name', 'Preferences'].forEach(label => {
            if (label.toLowerCase().includes(searchQuery.toLowerCase())) {
                results.push({ section: 'account', label });
            }
        });
        // Search in security settings
        ['Two-factor', 'Authentication', 'Privacy', 'Data', 'Encryption', 'Backup'].forEach(label => {
            if (label.toLowerCase().includes(searchQuery.toLowerCase())) {
                results.push({ section: 'security', label });
            }
        });
        // Search in notification settings
        ['Email notifications', 'Push notifications', 'Alerts', 'Reminders', 'Updates'].forEach(label => {
            if (label.toLowerCase().includes(searchQuery.toLowerCase())) {
                results.push({ section: 'notifications', label });
            }
        });
        // Search in system settings
        ['Performance', 'Storage', 'Memory', 'CPU', 'Network', 'Battery'].forEach(label => {
            if (label.toLowerCase().includes(searchQuery.toLowerCase())) {
                results.push({ section: 'system', label });
            }
        });
        // Search in integrations settings
        ['OpenAI', 'Gemini', 'Claude', 'Notion', 'API keys', 'Connections'].forEach(label => {
            if (label.toLowerCase().includes(searchQuery.toLowerCase())) {
                results.push({ section: 'integrations', label });
            }
        });
        // Search in commands settings
        ['Shortcuts', 'Commands', 'Keyboard', 'Hotkeys', 'Quick actions'].forEach(label => {
            if (label.toLowerCase().includes(searchQuery.toLowerCase())) {
                results.push({ section: 'commands', label });
            }
        });
        setSearchResults(results);
    }, [searchQuery]);
    const renderContent = () => {
        switch (activeSection) {
            case 'appearance':
                return _jsx(AppearanceSettings, {});
            case 'account':
                return _jsx(AccountSettings, {});
            case 'security':
                return _jsx(SecuritySettings, {});
            case 'notifications':
                return _jsx(NotificationSettings, {});
            case 'system':
                return _jsx(SystemSettings, {});
            case 'integrations':
                return _jsx(IntegrationSettings, {});
            case 'commands':
                return _jsx(CommandSettings, {});
            default:
                return (_jsxs("div", { className: "bg-slate-800/40 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-6", children: [_jsx("h3", { className: "text-lg font-medium text-white mb-4", children: settingsSections.find(s => s.id === activeSection)?.title }), _jsx("p", { className: "text-slate-400", children: "Settings for this section are coming soon." })] }));
        }
    };
    return (_jsx("div", { className: "min-h-screen bg-slate-950 p-4 lg:p-8", children: _jsxs("div", { className: "max-w-7xl mx-auto", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "mb-8", children: [_jsxs("div", { className: "flex items-center space-x-3 mb-2", children: [_jsx(SettingsIcon, { className: "w-8 h-8 text-slate-400" }), _jsx("h1", { className: "text-3xl font-bold text-white", children: "Settings" })] }), _jsx("p", { className: "text-slate-400", children: "Manage your account preferences and integrations" })] }), _jsxs("div", { className: "mb-6", children: [_jsxs("div", { className: "relative max-w-md", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" }), _jsx("input", { type: "text", placeholder: "Search settings...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" })] }), searchResults.length > 0 && (_jsx("div", { className: "mt-2 max-w-md bg-slate-800 border border-slate-700 rounded-lg shadow-lg overflow-hidden", children: _jsx("div", { className: "p-2", children: searchResults.map((result, index) => (_jsxs("button", { className: "w-full text-left px-3 py-2 hover:bg-slate-700 rounded-md transition-colors", onClick: () => {
                                        setActiveSection(result.section);
                                        setSearchQuery('');
                                    }, children: [_jsxs("div", { className: "flex items-center space-x-2", children: [settingsSections.find(s => s.id === result.section)?.icon && (_jsx("div", { className: "w-4 h-4 text-slate-400", children: result.section === 'appearance' ? _jsx(Palette, { size: 16 }) :
                                                        result.section === 'account' ? _jsx(User, { size: 16 }) :
                                                            result.section === 'security' ? _jsx(Shield, { size: 16 }) :
                                                                result.section === 'notifications' ? _jsx(Bell, { size: 16 }) :
                                                                    result.section === 'system' ? _jsx(Monitor, { size: 16 }) :
                                                                        result.section === 'integrations' ? _jsx(Bot, { size: 16 }) :
                                                                            _jsx(Command, { size: 16 }) })), _jsx("span", { className: "text-white", children: result.label })] }), _jsxs("p", { className: "text-xs text-slate-400 ml-6", children: ["in ", settingsSections.find(s => s.id === result.section)?.title] })] }, index))) }) }))] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-4 gap-8", children: [_jsx(motion.div, { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.1 }, className: "lg:col-span-1", children: _jsx("div", { className: "bg-slate-800/40 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-4", children: _jsx("nav", { className: "space-y-2", children: settingsSections.map((section) => (_jsxs("button", { onClick: () => setActiveSection(section.id), className: `w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-all ${activeSection === section.id
                                            ? 'bg-purple-600/20 text-purple-300 border border-purple-600/30'
                                            : 'text-slate-300 hover:bg-slate-700/30 hover:text-white'}`, children: [_jsx(section.icon, { className: "w-5 h-5" }), _jsxs("div", { className: "flex-1", children: [_jsx("p", { className: "text-sm font-medium", children: section.title }), _jsx("p", { className: "text-xs opacity-70", children: section.description })] }), _jsx(ChevronRight, { className: "w-4 h-4" })] }, section.id))) }) }) }), _jsx(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.2 }, className: "lg:col-span-3", children: renderContent() })] })] }) }));
}
