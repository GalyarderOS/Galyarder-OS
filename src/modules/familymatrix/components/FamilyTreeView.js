import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { Users, Plus, Phone, Mail, Calendar, Heart } from 'lucide-react';
import { useFamilyMatrixStore } from '../store/familyMatrixStore';
export function FamilyTreeView() {
    const { familyMembers, getUpcomingBirthdays } = useFamilyMatrixStore();
    const upcomingBirthdays = getUpcomingBirthdays(30);
    const getRelationshipColor = (relationship) => {
        const colors = {
            'Wife': 'text-pink-400',
            'Husband': 'text-blue-400',
            'Son': 'text-emerald-400',
            'Daughter': 'text-purple-400',
            'Father': 'text-amber-400',
            'Mother': 'text-red-400',
            'Brother': 'text-indigo-400',
            'Sister': 'text-violet-400'
        };
        return colors[relationship] || 'text-slate-400';
    };
    const getDaysSinceContact = (lastContact) => {
        const lastDate = new Date(lastContact);
        const today = new Date();
        const diffTime = Math.abs(today.getTime() - lastDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "glass-card rounded-xl p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(Users, { className: "w-5 h-5 text-blue-400" }), _jsx("h3", { className: "text-xl font-semibold text-white", children: "Family Tree" })] }), _jsxs("button", { className: "flex items-center space-x-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors", children: [_jsx(Plus, { className: "w-4 h-4 text-white" }), _jsx("span", { className: "text-white text-sm", children: "Add Member" })] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4 mb-6", children: [_jsxs("div", { className: "bg-slate-800/50 rounded-lg p-4 text-center", children: [_jsx("p", { className: "text-lg font-bold text-white", children: familyMembers.length }), _jsx("p", { className: "text-xs text-slate-400", children: "Family Members" })] }), _jsxs("div", { className: "bg-slate-800/50 rounded-lg p-4 text-center", children: [_jsx("p", { className: "text-lg font-bold text-white", children: upcomingBirthdays.length }), _jsx("p", { className: "text-xs text-slate-400", children: "Upcoming Birthdays" })] })] }), _jsx("div", { className: "space-y-4", children: familyMembers.map((member, index) => (_jsxs(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.1 + index * 0.1 }, className: "p-4 bg-slate-800/30 rounded-lg hover:bg-slate-800/50 transition-colors cursor-pointer", children: [_jsxs("div", { className: "flex items-center space-x-4", children: [member.avatar ? (_jsx("img", { src: member.avatar, alt: member.name, className: "w-12 h-12 rounded-full object-cover" })) : (_jsx("div", { className: "w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center", children: _jsx("span", { className: "text-white font-bold text-lg", children: member.name.charAt(0) }) })), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center space-x-2 mb-1", children: [_jsx("h4", { className: "text-sm font-medium text-white", children: member.name }), _jsx("span", { className: `text-xs ${getRelationshipColor(member.relationship)}`, children: member.relationship })] }), _jsxs("div", { className: "grid grid-cols-2 gap-2 text-xs text-slate-400", children: [member.birthdate && (_jsxs("div", { className: "flex items-center space-x-1", children: [_jsx(Calendar, { className: "w-3 h-3" }), _jsx("span", { children: new Date(member.birthdate).toLocaleDateString() })] })), _jsxs("div", { className: "flex items-center space-x-1", children: [_jsx(Heart, { className: "w-3 h-3 text-red-400" }), _jsxs("span", { children: ["Last contact: ", getDaysSinceContact(member.lastContact), " days ago"] })] }), member.contact.phone && (_jsxs("div", { className: "flex items-center space-x-1", children: [_jsx(Phone, { className: "w-3 h-3 text-emerald-400" }), _jsx("span", { children: member.contact.phone })] })), member.contact.email && (_jsxs("div", { className: "flex items-center space-x-1", children: [_jsx(Mail, { className: "w-3 h-3 text-blue-400" }), _jsx("span", { children: member.contact.email })] }))] })] })] }), member.notes && (_jsxs("p", { className: "text-xs text-slate-400 mt-2 italic", children: ["\"", member.notes, "\""] })), member.importantDates.length > 0 && (_jsx("div", { className: "mt-2 pt-2 border-t border-slate-700", children: _jsx("div", { className: "flex flex-wrap gap-2", children: member.importantDates.map(date => (_jsxs("div", { className: "text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded flex items-center space-x-1", children: [_jsx(Calendar, { className: "w-2 h-2" }), _jsxs("span", { children: [date.title, ": ", new Date(date.date).toLocaleDateString()] })] }, date.id))) }) }))] }, member.id))) }), _jsx("div", { className: "mt-6 p-3 bg-blue-600/20 rounded-lg", children: _jsxs("p", { className: "text-sm text-blue-300", children: ["\uD83D\uDC68\u200D\uD83D\uDC69\u200D\uD83D\uDC67\u200D\uD83D\uDC66 Upcoming: Michael's birthday on ", new Date('2024-03-10').toLocaleDateString(), ". Start planning celebration!"] }) })] }));
}
