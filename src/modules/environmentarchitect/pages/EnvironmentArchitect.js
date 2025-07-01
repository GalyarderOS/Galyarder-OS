import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Settings, Laptop, Volume2 } from 'lucide-react';
import { EnvironmentModeSelector } from '../components/EnvironmentModeSelector';
import { AmbientController } from '../components/AmbientController';
import { DeviceMap } from '../components/DeviceMap';
import { CrudList } from '@/components/shared/CrudList';
import { useEnvironmentStore } from '../store/environmentStore';
export function EnvironmentArchitect() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const { modes, devices, ambientProfiles, addMode, updateMode, deleteMode, addDevice, updateDevice, deleteDevice, addAmbientProfile, updateAmbientProfile, deleteAmbientProfile } = useEnvironmentStore();
    const modeFields = [
        { name: 'name', label: 'Mode Name', type: 'text', required: true, isListColumn: true },
        { name: 'description', label: 'Description', type: 'textarea', isListColumn: true },
        {
            name: 'settings.lighting',
            label: 'Lighting (%)',
            type: 'number',
            required: true
        },
        {
            name: 'settings.temperature',
            label: 'Temperature (°C)',
            type: 'number',
            required: true
        },
        {
            name: 'settings.humidity',
            label: 'Humidity (%)',
            type: 'number',
            required: true
        },
        {
            name: 'settings.noise',
            label: 'Noise (dB)',
            type: 'number',
            required: true
        },
        {
            name: 'settings.airQuality',
            label: 'Air Quality (%)',
            type: 'number',
            required: true
        },
        { name: 'devices', label: 'Devices', type: 'tags' },
        { name: 'isActive', label: 'Active', type: 'checkbox', isListColumn: true }
    ];
    const deviceFields = [
        { name: 'name', label: 'Device Name', type: 'text', required: true, isListColumn: true },
        {
            name: 'type',
            label: 'Type',
            type: 'select',
            options: [
                { value: 'lighting', label: 'Lighting' },
                { value: 'climate', label: 'Climate' },
                { value: 'audio', label: 'Audio' },
                { value: 'display', label: 'Display' },
                { value: 'security', label: 'Security' },
                { value: 'other', label: 'Other' }
            ],
            required: true,
            isListColumn: true
        },
        {
            name: 'status',
            label: 'Status',
            type: 'select',
            options: [
                { value: 'online', label: 'Online' },
                { value: 'offline', label: 'Offline' },
                { value: 'error', label: 'Error' }
            ],
            required: true,
            isListColumn: true
        },
        { name: 'location', label: 'Location', type: 'text', required: true, isListColumn: true }
    ];
    const ambientProfileFields = [
        { name: 'name', label: 'Profile Name', type: 'text', required: true, isListColumn: true },
        { name: 'soundscape', label: 'Soundscape', type: 'text', required: true, isListColumn: true },
        { name: 'lighting.brightness', label: 'Brightness (%)', type: 'number', required: true },
        { name: 'lighting.temperature', label: 'Color Temperature (K)', type: 'number', required: true },
        { name: 'lighting.color', label: 'Color (Hex)', type: 'text' },
        { name: 'scent', label: 'Scent', type: 'text' },
        { name: 'duration', label: 'Duration (min)', type: 'number', required: true, isListColumn: true },
        { name: 'triggers', label: 'Triggers', type: 'tags' }
    ];
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "mb-8", children: [_jsx("h1", { className: "text-3xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent", children: "Environment Architect" }), _jsx("p", { className: "text-slate-400 mt-2", children: "Design and control your optimal workspace environment" })] }), _jsxs("div", { className: "flex space-x-2 mb-6", children: [_jsx("button", { onClick: () => setActiveTab('dashboard'), className: `px-4 py-2 rounded-lg transition-colors ${activeTab === 'dashboard'
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`, children: "Dashboard" }), _jsx("button", { onClick: () => setActiveTab('manage'), className: `px-4 py-2 rounded-lg transition-colors ${activeTab === 'manage'
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`, children: "Manage" })] }), activeTab === 'dashboard' ? (_jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-3 gap-8", children: [_jsx("div", { className: "xl:col-span-2", children: _jsx(EnvironmentModeSelector, {}) }), _jsxs("div", { className: "space-y-8", children: [_jsx(AmbientController, {}), _jsx(DeviceMap, {})] })] })) : (_jsxs("div", { className: "space-y-8", children: [_jsx(CrudList, { title: "Environment Modes", items: modes, fields: modeFields, onAdd: addMode, onUpdate: updateMode, onDelete: deleteMode, icon: _jsx(Settings, { className: "w-5 h-5 text-blue-400" }), color: "blue" }), _jsx(CrudList, { title: "Devices", items: devices, fields: deviceFields, onAdd: addDevice, onUpdate: updateDevice, onDelete: deleteDevice, icon: _jsx(Laptop, { className: "w-5 h-5 text-emerald-400" }), color: "emerald" }), _jsx(CrudList, { title: "Ambient Profiles", items: ambientProfiles, fields: ambientProfileFields, onAdd: addAmbientProfile, onUpdate: updateAmbientProfile, onDelete: deleteAmbientProfile, icon: _jsx(Volume2, { className: "w-5 h-5 text-purple-400" }), color: "purple" })] }))] }));
}
