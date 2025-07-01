import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { CalendarGrid } from '../components/CalendarGrid';
import { EventList } from '../components/EventList';
export function Calendar() {
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "mb-8", children: [_jsx("h1", { className: "text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent", children: "Calendar" }), _jsx("p", { className: "text-slate-400 mt-2", children: "Manage your schedule and never miss an important event" })] }), _jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-3 gap-8", children: [_jsx("div", { className: "xl:col-span-2", children: _jsx(CalendarGrid, {}) }), _jsx("div", { children: _jsx(EventList, {}) })] })] }));
}
