import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { VaultDashboard } from '../components/VaultDashboard';
import { KeyTracker } from '../components/KeyTracker';
import { AccessLogs } from '../components/AccessLogs';
export function PrivacyVault() {
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "mb-8", children: [_jsx("h1", { className: "text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent", children: "Privacy Vault" }), _jsx("p", { className: "text-slate-400 mt-2", children: "Secure your digital life with encrypted storage and access monitoring" })] }), _jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-3 gap-8", children: [_jsxs("div", { className: "xl:col-span-2 space-y-8", children: [_jsx(VaultDashboard, {}), _jsx(AccessLogs, {})] }), _jsx("div", { children: _jsx(KeyTracker, {}) })] })] }));
}
