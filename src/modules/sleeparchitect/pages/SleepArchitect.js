import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Moon, Clock, Sunrise } from 'lucide-react';
import { SleepLog } from '../components/SleepLog';
import { CycleVisualizer } from '../components/CycleVisualizer';
import { WakeProtocol } from '../components/WakeProtocol';
import { CrudList } from '../../../components/shared/CrudList';
import { useSleepStore } from '../store/sleepStore';
export function SleepArchitect() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const { sessions, cycles, wakeProtocols, addSession, updateSession, deleteSession, addCycle, updateCycle, deleteCycle, addWakeProtocol, updateWakeProtocol, deleteWakeProtocol } = useSleepStore();
    const sessionFields = [
        { name: 'date', label: 'Date', type: 'date', required: true, isListColumn: true },
        { name: 'bedTime', label: 'Bed Time', type: 'text', required: true, isListColumn: true },
        { name: 'sleepTime', label: 'Sleep Time', type: 'text', required: true },
        { name: 'wakeTime', label: 'Wake Time', type: 'text', required: true, isListColumn: true },
        { name: 'duration', label: 'Duration (min)', type: 'number', required: true },
        { name: 'quality', label: 'Quality (1-10)', type: 'number', required: true, isListColumn: true },
        { name: 'notes', label: 'Notes', type: 'textarea' },
        { name: 'environment.temperature', label: 'Temperature (°C)', type: 'number' },
        { name: 'environment.humidity', label: 'Humidity (%)', type: 'number' },
        { name: 'environment.noise', label: 'Noise (dB)', type: 'number' },
        { name: 'recovery.hrv', label: 'HRV', type: 'number' },
        { name: 'recovery.restingHR', label: 'Resting Heart Rate', type: 'number' },
        { name: 'recovery.bodyBattery', label: 'Body Battery (%)', type: 'number' }
    ];
    const cycleFields = [
        { name: 'name', label: 'Cycle Name', type: 'text', required: true, isListColumn: true },
        {
            name: 'type',
            label: 'Type',
            type: 'select',
            options: [
                { value: 'monophasic', label: 'Monophasic' },
                { value: 'biphasic', label: 'Biphasic' },
                { value: 'polyphasic', label: 'Polyphasic' }
            ],
            required: true,
            isListColumn: true
        },
        { name: 'totalSleep', label: 'Total Sleep (min)', type: 'number', required: true, isListColumn: true },
        { name: 'isActive', label: 'Active', type: 'checkbox', isListColumn: true }
    ];
    const wakeProtocolFields = [
        { name: 'name', label: 'Protocol Name', type: 'text', required: true, isListColumn: true },
        { name: 'duration', label: 'Duration (min)', type: 'number', required: true, isListColumn: true },
        { name: 'isActive', label: 'Active', type: 'checkbox', isListColumn: true }
    ];
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "mb-8", children: [_jsx("h1", { className: "text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent", children: "Sleep Architect" }), _jsx("p", { className: "text-slate-400 mt-2", children: "Optimize your sleep cycles and recovery for peak performance" })] }), _jsxs("div", { className: "flex space-x-2 mb-6", children: [_jsx("button", { onClick: () => setActiveTab('dashboard'), className: `px-4 py-2 rounded-lg transition-colors ${activeTab === 'dashboard'
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`, children: "Dashboard" }), _jsx("button", { onClick: () => setActiveTab('manage'), className: `px-4 py-2 rounded-lg transition-colors ${activeTab === 'manage'
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`, children: "Manage" })] }), activeTab === 'dashboard' ? (_jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-3 gap-8", children: [_jsx("div", { className: "xl:col-span-2", children: _jsx(SleepLog, {}) }), _jsxs("div", { className: "space-y-8", children: [_jsx(CycleVisualizer, {}), _jsx(WakeProtocol, {})] })] })) : (_jsxs("div", { className: "space-y-8", children: [_jsx(CrudList, { title: "Sleep Sessions", items: sessions, fields: sessionFields, onAdd: addSession, onUpdate: updateSession, onDelete: deleteSession, icon: _jsx(Moon, { className: "w-5 h-5 text-blue-400" }), color: "blue" }), _jsx(CrudList, { title: "Sleep Cycles", items: cycles, fields: cycleFields, onAdd: addCycle, onUpdate: updateCycle, onDelete: deleteCycle, icon: _jsx(Clock, { className: "w-5 h-5 text-purple-400" }), color: "purple" }), _jsx(CrudList, { title: "Wake Protocols", items: wakeProtocols, fields: wakeProtocolFields, onAdd: addWakeProtocol, onUpdate: updateWakeProtocol, onDelete: deleteWakeProtocol, icon: _jsx(Sunrise, { className: "w-5 h-5 text-amber-400" }), color: "amber" })] }))] }));
}
