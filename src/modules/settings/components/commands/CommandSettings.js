import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Command, Plus, Edit, Trash2, Check, Terminal, Zap, ArrowRight, Maximize, Search, Grid } from 'lucide-react';
import { useSettingsStore } from '../../../../lib/stores/useSettingsStore';
import { allModules, iconMap } from '../../../../data/modules';
export function CommandSettings() {
    const { commands, addCustomCommand, updateCustomCommand, deleteCustomCommand, toggleModuleInSearch } = useSettingsStore();
    const [showAddCommandModal, setShowAddCommandModal] = useState(false);
    const [editingCommandId, setEditingCommandId] = useState(null);
    const [commandForm, setCommandForm] = useState({
        command: '',
        label: '',
        actionType: 'navigate',
        path: '',
        modal: '',
        hook: ''
    });
    const [formError, setFormError] = useState('');
    const handleAddCommand = () => {
        setCommandForm({
            command: '',
            label: '',
            actionType: 'navigate',
            path: '',
            modal: '',
            hook: ''
        });
        setFormError('');
        setShowAddCommandModal(true);
        setEditingCommandId(null);
    };
    const handleEditCommand = (command) => {
        setCommandForm({
            command: command.command,
            label: command.label,
            actionType: command.actionType,
            path: command.actionType === 'navigate' ? command.payload?.path || '' : '',
            modal: command.actionType === 'openModal' ? command.payload?.modal || '' : '',
            hook: command.actionType === 'triggerHook' ? command.payload?.hook || '' : ''
        });
        setFormError('');
        setShowAddCommandModal(true);
        setEditingCommandId(command.id);
    };
    const handleSaveCommand = () => {
        // Validate form
        if (!commandForm.command.trim()) {
            setFormError('Command is required');
            return;
        }
        if (!commandForm.label.trim()) {
            setFormError('Label is required');
            return;
        }
        // Validate action type specific fields
        if (commandForm.actionType === 'navigate' && !commandForm.path.trim()) {
            setFormError('Path is required for navigation actions');
            return;
        }
        if (commandForm.actionType === 'openModal' && !commandForm.modal.trim()) {
            setFormError('Modal name is required for modal actions');
            return;
        }
        if (commandForm.actionType === 'triggerHook' && !commandForm.hook.trim()) {
            setFormError('Hook name is required for hook actions');
            return;
        }
        // Create payload based on action type
        let payload = {};
        if (commandForm.actionType === 'navigate') {
            payload = { path: commandForm.path };
        }
        else if (commandForm.actionType === 'openModal') {
            payload = { modal: commandForm.modal };
        }
        else if (commandForm.actionType === 'triggerHook') {
            payload = { hook: commandForm.hook };
        }
        // Add or update command
        if (editingCommandId) {
            updateCustomCommand(editingCommandId, {
                command: commandForm.command,
                label: commandForm.label,
                actionType: commandForm.actionType,
                payload
            });
        }
        else {
            addCustomCommand({
                command: commandForm.command,
                label: commandForm.label,
                actionType: commandForm.actionType,
                payload
            });
        }
        // Close modal
        setShowAddCommandModal(false);
        setEditingCommandId(null);
    };
    const handleToggleModule = (moduleId, enabled) => {
        toggleModuleInSearch(moduleId, enabled);
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "bg-slate-800/40 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Command, { className: "w-5 h-5 text-blue-400" }), _jsx("h3", { className: "text-lg font-medium text-white", children: "Custom Commands" })] }), _jsxs("button", { onClick: handleAddCommand, className: "flex items-center space-x-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors", children: [_jsx(Plus, { className: "w-4 h-4 text-white" }), _jsx("span", { className: "text-white text-sm", children: "Add Command" })] })] }), _jsx("div", { className: "space-y-4", children: commands.customCommands.length === 0 ? (_jsxs("div", { className: "text-center py-8", children: [_jsx(Terminal, { className: "w-12 h-12 text-slate-500 mx-auto mb-4" }), _jsx("p", { className: "text-slate-400 mb-2", children: "No custom commands yet" }), _jsx("p", { className: "text-sm text-slate-500 mb-4", children: "Create commands to quickly access features" }), _jsxs("button", { onClick: handleAddCommand, className: "px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors inline-flex items-center space-x-2", children: [_jsx(Plus, { className: "w-4 h-4" }), _jsx("span", { children: "Add Your First Command" })] })] })) : (_jsx("div", { className: "space-y-3", children: commands.customCommands.map((command) => (_jsxs("div", { className: "flex items-center justify-between p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center", children: command.actionType === 'navigate' ? (_jsx(ArrowRight, { className: "w-5 h-5 text-blue-400" })) : command.actionType === 'openModal' ? (_jsx(Maximize, { className: "w-5 h-5 text-purple-400" })) : (_jsx(Zap, { className: "w-5 h-5 text-amber-400" })) }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-white", children: command.label }), _jsx("p", { className: "text-xs font-mono bg-slate-800 px-1.5 py-0.5 rounded text-slate-300 inline-block", children: command.command })] })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("button", { onClick: () => handleEditCommand(command), className: "p-2 hover:bg-slate-600 rounded-lg transition-colors", children: _jsx(Edit, { className: "w-4 h-4 text-slate-400 hover:text-white" }) }), _jsx("button", { onClick: () => deleteCustomCommand(command.id), className: "p-2 hover:bg-red-600/20 rounded-lg transition-colors", children: _jsx(Trash2, { className: "w-4 h-4 text-slate-400 hover:text-red-400" }) })] })] }, command.id))) })) })] }), _jsxs("div", { className: "bg-slate-800/40 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-6", children: [_jsxs("h3", { className: "text-lg font-medium text-white mb-4 flex items-center space-x-2", children: [_jsx(Search, { className: "w-5 h-5 text-purple-400" }), _jsx("span", { children: "Command Palette" })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-white", children: "Keyboard Shortcut" }), _jsx("p", { className: "text-xs text-slate-400", children: "Open command palette with keyboard" })] }), _jsxs("div", { className: "flex items-center space-x-1", children: [_jsx("span", { className: "px-2 py-1 bg-slate-700 rounded text-xs text-white font-mono", children: "Ctrl" }), _jsx("span", { className: "text-slate-400", children: "+" }), _jsx("span", { className: "px-2 py-1 bg-slate-700 rounded text-xs text-white font-mono", children: "K" })] })] }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-white mb-2", children: "Modules in Search" }), _jsx("p", { className: "text-xs text-slate-400 mb-3", children: "Select which modules appear in command palette results" }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 max-h-64 overflow-y-auto p-1", children: allModules.map((module) => {
                                            const ModuleIcon = iconMap[module.icon] || Grid;
                                            const isEnabled = commands.enabledModules.includes(module.id);
                                            return (_jsxs("div", { className: "flex items-center justify-between p-2 bg-slate-700/30 rounded-lg", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(ModuleIcon, { className: "w-4 h-4 text-slate-400" }), _jsx("span", { className: "text-sm text-white", children: module.name })] }), _jsx("button", { onClick: () => handleToggleModule(module.id, !isEnabled), className: `w-8 h-4 ${isEnabled ? 'bg-blue-600' : 'bg-slate-600'} rounded-full relative transition-colors`, children: _jsx("div", { className: `w-3 h-3 bg-white rounded-full absolute top-0.5 transition-transform ${isEnabled ? 'right-0.5' : 'left-0.5'}` }) })] }, module.id));
                                        }) })] })] })] }), _jsxs("div", { className: "bg-slate-800/40 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-6", children: [_jsxs("h3", { className: "text-lg font-medium text-white mb-4 flex items-center space-x-2", children: [_jsx(Zap, { className: "w-5 h-5 text-amber-400" }), _jsx("span", { children: "Quick Actions" })] }), _jsxs("div", { className: "space-y-4", children: [_jsx("p", { className: "text-sm text-slate-300", children: "Quick actions are available throughout the system for fast access to common tasks." }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [_jsxs("div", { className: "p-3 bg-slate-700/30 rounded-lg", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("p", { className: "text-sm font-medium text-white", children: "Add Expense" }), _jsx("span", { className: "text-xs bg-blue-600/20 text-blue-400 px-2 py-0.5 rounded", children: "Finance" })] }), _jsx("p", { className: "text-xs text-slate-400 mb-2", children: "Quickly log a new expense" }), _jsxs("div", { className: "flex items-center space-x-1 text-xs", children: [_jsx("span", { className: "px-1.5 py-0.5 bg-slate-700 rounded text-slate-300 font-mono", children: "Alt" }), _jsx("span", { className: "text-slate-400", children: "+" }), _jsx("span", { className: "px-1.5 py-0.5 bg-slate-700 rounded text-slate-300 font-mono", children: "E" })] })] }), _jsxs("div", { className: "p-3 bg-slate-700/30 rounded-lg", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("p", { className: "text-sm font-medium text-white", children: "Start Focus Mode" }), _jsx("span", { className: "text-xs bg-purple-600/20 text-purple-400 px-2 py-0.5 rounded", children: "Productivity" })] }), _jsx("p", { className: "text-xs text-slate-400 mb-2", children: "Begin a focused work session" }), _jsxs("div", { className: "flex items-center space-x-1 text-xs", children: [_jsx("span", { className: "px-1.5 py-0.5 bg-slate-700 rounded text-slate-300 font-mono", children: "Alt" }), _jsx("span", { className: "text-slate-400", children: "+" }), _jsx("span", { className: "px-1.5 py-0.5 bg-slate-700 rounded text-slate-300 font-mono", children: "F" })] })] }), _jsxs("div", { className: "p-3 bg-slate-700/30 rounded-lg", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("p", { className: "text-sm font-medium text-white", children: "Log Workout" }), _jsx("span", { className: "text-xs bg-red-600/20 text-red-400 px-2 py-0.5 rounded", children: "Health" })] }), _jsx("p", { className: "text-xs text-slate-400 mb-2", children: "Record a new workout session" }), _jsxs("div", { className: "flex items-center space-x-1 text-xs", children: [_jsx("span", { className: "px-1.5 py-0.5 bg-slate-700 rounded text-slate-300 font-mono", children: "Alt" }), _jsx("span", { className: "text-slate-400", children: "+" }), _jsx("span", { className: "px-1.5 py-0.5 bg-slate-700 rounded text-slate-300 font-mono", children: "W" })] })] }), _jsxs("div", { className: "p-3 bg-slate-700/30 rounded-lg", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("p", { className: "text-sm font-medium text-white", children: "Add Time Block" }), _jsx("span", { className: "text-xs bg-emerald-600/20 text-emerald-400 px-2 py-0.5 rounded", children: "Time" })] }), _jsx("p", { className: "text-xs text-slate-400 mb-2", children: "Schedule a new time block" }), _jsxs("div", { className: "flex items-center space-x-1 text-xs", children: [_jsx("span", { className: "px-1.5 py-0.5 bg-slate-700 rounded text-slate-300 font-mono", children: "Alt" }), _jsx("span", { className: "text-slate-400", children: "+" }), _jsx("span", { className: "px-1.5 py-0.5 bg-slate-700 rounded text-slate-300 font-mono", children: "T" })] })] })] })] })] }), showAddCommandModal && (_jsx("div", { className: "fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50", children: _jsxs(motion.div, { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, className: "bg-slate-800 border border-slate-700 rounded-xl p-6 w-full max-w-md mx-4", children: [_jsxs("h3", { className: "text-xl font-semibold text-white mb-4 flex items-center space-x-2", children: [_jsx(Command, { className: "w-5 h-5 text-blue-400" }), _jsx("span", { children: editingCommandId ? 'Edit Command' : 'Add Command' })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm text-slate-300 mb-1", children: "Command" }), _jsx("input", { type: "text", value: commandForm.command, onChange: (e) => setCommandForm({ ...commandForm, command: e.target.value }), placeholder: "/command-name", className: "w-full px-3 py-2 bg-slate-700 border border-slate-600 \n                           rounded-lg text-white placeholder-slate-500 \n                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" }), _jsx("p", { className: "text-xs text-slate-400 mt-1", children: "Start with / for slash commands (e.g., /finance)" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm text-slate-300 mb-1", children: "Label" }), _jsx("input", { type: "text", value: commandForm.label, onChange: (e) => setCommandForm({ ...commandForm, label: e.target.value }), placeholder: "Human-readable label", className: "w-full px-3 py-2 bg-slate-700 border border-slate-600 \n                           rounded-lg text-white placeholder-slate-500 \n                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm text-slate-300 mb-1", children: "Action Type" }), _jsxs("select", { value: commandForm.actionType, onChange: (e) => setCommandForm({
                                                ...commandForm,
                                                actionType: e.target.value
                                            }), className: "w-full px-3 py-2 bg-slate-700 border border-slate-600 \n                           rounded-lg text-white \n                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent", children: [_jsx("option", { value: "navigate", children: "Navigate to Page" }), _jsx("option", { value: "openModal", children: "Open Modal" }), _jsx("option", { value: "triggerHook", children: "Trigger Action" })] })] }), commandForm.actionType === 'navigate' && (_jsxs("div", { children: [_jsx("label", { className: "block text-sm text-slate-300 mb-1", children: "Path" }), _jsx("input", { type: "text", value: commandForm.path, onChange: (e) => setCommandForm({ ...commandForm, path: e.target.value }), placeholder: "/app/dashboard", className: "w-full px-3 py-2 bg-slate-700 border border-slate-600 \n                             rounded-lg text-white placeholder-slate-500 \n                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" })] })), commandForm.actionType === 'openModal' && (_jsxs("div", { children: [_jsx("label", { className: "block text-sm text-slate-300 mb-1", children: "Modal Name" }), _jsx("input", { type: "text", value: commandForm.modal, onChange: (e) => setCommandForm({ ...commandForm, modal: e.target.value }), placeholder: "addExpense", className: "w-full px-3 py-2 bg-slate-700 border border-slate-600 \n                             rounded-lg text-white placeholder-slate-500 \n                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" })] })), commandForm.actionType === 'triggerHook' && (_jsxs("div", { children: [_jsx("label", { className: "block text-sm text-slate-300 mb-1", children: "Hook Name" }), _jsx("input", { type: "text", value: commandForm.hook, onChange: (e) => setCommandForm({ ...commandForm, hook: e.target.value }), placeholder: "startFocusMode", className: "w-full px-3 py-2 bg-slate-700 border border-slate-600 \n                             rounded-lg text-white placeholder-slate-500 \n                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" })] })), formError && (_jsx("div", { className: "text-red-400 text-sm", children: formError })), _jsxs("div", { className: "flex justify-end space-x-3 pt-2", children: [_jsx("button", { type: "button", onClick: () => setShowAddCommandModal(false), className: "px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg", children: "Cancel" }), _jsxs("button", { type: "button", onClick: handleSaveCommand, className: "px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center space-x-2", children: [_jsx(Check, { className: "w-4 h-4" }), _jsxs("span", { children: [editingCommandId ? 'Update' : 'Add', " Command"] })] })] })] })] }) }))] }));
}
