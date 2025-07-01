import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { Smartphone, Wifi, Battery, AlertCircle } from 'lucide-react';
import { useEnvironmentStore } from '../store/environmentStore';
export function DeviceMap() {
    const { devices } = useEnvironmentStore();
    const getDeviceIcon = (type) => {
        const icons = {
            lighting: '💡',
            climate: '🌡️',
            audio: '🔊',
            display: '📺',
            security: '🔒',
            other: '⚙️'
        };
        return icons[type] || '⚙️';
    };
    const getStatusColor = (status) => {
        switch (status) {
            case 'online': return 'text-emerald-400';
            case 'offline': return 'text-slate-400';
            case 'error': return 'text-red-400';
            default: return 'text-slate-400';
        }
    };
    const onlineDevices = devices.filter(d => d.status === 'online').length;
    const offlineDevices = devices.filter(d => d.status === 'offline').length;
    const errorDevices = devices.filter(d => d.status === 'error').length;
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.2 }, className: "glass-card rounded-xl p-6", children: [_jsxs("div", { className: "flex items-center space-x-3 mb-6", children: [_jsx(Smartphone, { className: "w-5 h-5 text-emerald-400" }), _jsx("h3", { className: "text-xl font-semibold text-white", children: "Device Map" })] }), _jsxs("div", { className: "grid grid-cols-3 gap-4 mb-6", children: [_jsxs("div", { className: "bg-slate-800/50 rounded-lg p-4 text-center", children: [_jsx(Wifi, { className: "w-5 h-5 text-emerald-400 mx-auto mb-2" }), _jsx("p", { className: "text-lg font-bold text-white", children: onlineDevices }), _jsx("p", { className: "text-xs text-slate-400", children: "Online" })] }), _jsxs("div", { className: "bg-slate-800/50 rounded-lg p-4 text-center", children: [_jsx(Battery, { className: "w-5 h-5 text-slate-400 mx-auto mb-2" }), _jsx("p", { className: "text-lg font-bold text-white", children: offlineDevices }), _jsx("p", { className: "text-xs text-slate-400", children: "Offline" })] }), _jsxs("div", { className: "bg-slate-800/50 rounded-lg p-4 text-center", children: [_jsx(AlertCircle, { className: "w-5 h-5 text-red-400 mx-auto mb-2" }), _jsx("p", { className: "text-lg font-bold text-white", children: errorDevices }), _jsx("p", { className: "text-xs text-slate-400", children: "Errors" })] })] }), _jsx("div", { className: "space-y-3", children: devices.map((device, index) => (_jsxs(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.1 + index * 0.1 }, className: "flex items-center justify-between p-3 bg-slate-800/30 rounded-lg hover:bg-slate-800/50 transition-colors", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("span", { className: "text-lg", children: getDeviceIcon(device.type) }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-white", children: device.name }), _jsxs("p", { className: "text-xs text-slate-400", children: [device.location, " \u2022 ", device.type] })] })] }), _jsxs("div", { className: "text-right", children: [_jsx("div", { className: `text-sm font-medium ${getStatusColor(device.status)}`, children: device.status }), _jsx("p", { className: "text-xs text-slate-400", children: new Date(device.lastUpdated).toLocaleTimeString() })] })] }, device.id))) }), _jsx("div", { className: "mt-6 p-3 bg-emerald-600/20 rounded-lg", children: _jsxs("p", { className: "text-sm text-emerald-300", children: ["\uD83D\uDD17 ", onlineDevices, " devices connected and responding to environment changes."] }) })] }));
}
