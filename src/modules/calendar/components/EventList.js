import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { Clock, MapPin, Users, Bell, Edit, Trash2 } from 'lucide-react';
import { useCalendarStore } from '../store/calendarStore';
export function EventList() {
    const { selectedDate, getEventsForDate, deleteEvent } = useCalendarStore();
    const events = getEventsForDate(selectedDate);
    const sortedEvents = events.sort((a, b) => a.startTime.localeCompare(b.startTime));
    const categoryIcons = {
        work: '💼',
        personal: '🏠',
        health: '💪',
        social: '👥',
        other: '📅'
    };
    const formatTime = (time) => {
        const [hours, minutes] = time.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour % 12 || 12;
        return `${displayHour}:${minutes} ${ampm}`;
    };
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.1 }, className: "glass-card rounded-xl p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsxs("h3", { className: "text-xl font-semibold text-white", children: ["Events for ", selectedDate.toLocaleDateString('en-US', {
                                weekday: 'long',
                                month: 'long',
                                day: 'numeric'
                            })] }), _jsxs("span", { className: "text-sm text-slate-400", children: [events.length, " event", events.length !== 1 ? 's' : ''] })] }), events.length === 0 ? (_jsxs("div", { className: "text-center py-8", children: [_jsx("div", { className: "w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4", children: _jsx(Clock, { className: "w-8 h-8 text-slate-400" }) }), _jsx("p", { className: "text-slate-400 mb-2", children: "No events scheduled" }), _jsx("p", { className: "text-sm text-slate-500", children: "Click the + button to add an event" })] })) : (_jsx("div", { className: "space-y-4", children: sortedEvents.map((event, index) => (_jsxs(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.1 + index * 0.1 }, className: "p-4 border border-slate-700/50 rounded-lg hover:border-slate-600/50 transition-colors group", style: { borderLeftColor: event.color, borderLeftWidth: '4px' }, children: [_jsxs("div", { className: "flex items-start justify-between mb-3", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("span", { className: "text-lg", children: categoryIcons[event.category] }), _jsxs("div", { children: [_jsx("h4", { className: "text-sm font-medium text-white", children: event.title }), event.description && (_jsx("p", { className: "text-xs text-slate-400 mt-1", children: event.description }))] })] }), _jsxs("div", { className: "flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity", children: [_jsx("button", { className: "p-1 hover:bg-slate-700 rounded transition-colors", children: _jsx(Edit, { className: "w-3 h-3 text-slate-400 hover:text-white" }) }), _jsx("button", { onClick: () => deleteEvent(event.id), className: "p-1 hover:bg-red-600/20 rounded transition-colors", children: _jsx(Trash2, { className: "w-3 h-3 text-slate-400 hover:text-red-400" }) })] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4 text-xs text-slate-400", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Clock, { className: "w-3 h-3" }), _jsxs("span", { children: [formatTime(event.startTime), " - ", formatTime(event.endTime)] })] }), event.location && (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(MapPin, { className: "w-3 h-3" }), _jsx("span", { className: "truncate", children: event.location })] })), event.attendees && event.attendees.length > 0 && (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Users, { className: "w-3 h-3" }), _jsxs("span", { children: [event.attendees.length, " attendee", event.attendees.length !== 1 ? 's' : ''] })] })), event.reminder?.enabled && (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Bell, { className: "w-3 h-3" }), _jsxs("span", { children: [event.reminder.minutes, "m reminder"] })] }))] }), event.recurring?.type !== 'none' && (_jsxs("div", { className: "mt-2 text-xs text-purple-400", children: ["\uD83D\uDD04 Repeats ", event.recurring?.type] }))] }, event.id))) })), _jsxs("div", { className: "mt-6 p-4 bg-slate-800/30 rounded-lg", children: [_jsx("h4", { className: "text-sm font-medium text-white mb-3", children: "Today's Schedule" }), _jsxs("div", { className: "grid grid-cols-2 gap-4 text-sm", children: [_jsxs("div", { children: [_jsx("span", { className: "text-slate-400", children: "Busy Time:" }), _jsx("span", { className: "text-white ml-2", children: events.length > 0 ? `${events.length * 1.5}h` : '0h' })] }), _jsxs("div", { children: [_jsx("span", { className: "text-slate-400", children: "Free Time:" }), _jsx("span", { className: "text-white ml-2", children: events.length > 0 ? `${8 - events.length * 1.5}h` : '8h' })] })] })] })] }));
}
