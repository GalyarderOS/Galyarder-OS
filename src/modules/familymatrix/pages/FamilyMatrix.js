import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Users, CheckSquare, Heart } from 'lucide-react';
import { FamilyTreeView } from '../components/FamilyTreeView';
import { ResponsibilityTracker } from '../components/ResponsibilityTracker';
import { GratitudeLedger } from '../components/GratitudeLedger';
import { CrudList } from '../../../components/shared/CrudList';
import { useFamilyMatrixStore } from '../store/familyMatrixStore';
export function FamilyMatrix() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const { familyMembers, responsibilities, gratitudeEntries, familyEvents, addFamilyMember, updateFamilyMember, deleteFamilyMember, addResponsibility, updateResponsibility, deleteResponsibility, addGratitudeEntry, updateGratitudeEntry, deleteGratitudeEntry, addFamilyEvent, updateFamilyEvent, deleteFamilyEvent } = useFamilyMatrixStore();
    const familyMemberFields = [
        { name: 'name', label: 'Name', type: 'text', required: true, isListColumn: true },
        { name: 'relationship', label: 'Relationship', type: 'text', required: true, isListColumn: true },
        { name: 'birthdate', label: 'Birthdate', type: 'date' },
        { name: 'contact.email', label: 'Email', type: 'text' },
        { name: 'contact.phone', label: 'Phone', type: 'text' },
        { name: 'contact.address', label: 'Address', type: 'text' },
        { name: 'notes', label: 'Notes', type: 'textarea' },
        { name: 'lastContact', label: 'Last Contact', type: 'date', required: true, isListColumn: true },
        { name: 'nextContact', label: 'Next Contact', type: 'date' },
        { name: 'tags', label: 'Tags', type: 'tags' }
    ];
    const responsibilityFields = [
        { name: 'title', label: 'Title', type: 'text', required: true, isListColumn: true },
        { name: 'description', label: 'Description', type: 'textarea', required: true },
        { name: 'assignee', label: 'Assignee', type: 'text', required: true, isListColumn: true },
        { name: 'dueDate', label: 'Due Date', type: 'date' },
        { name: 'recurring', label: 'Recurring', type: 'checkbox', isListColumn: true },
        { name: 'recurrencePattern', label: 'Recurrence Pattern', type: 'text' },
        {
            name: 'status',
            label: 'Status',
            type: 'select',
            options: [
                { value: 'pending', label: 'Pending' },
                { value: 'in-progress', label: 'In Progress' },
                { value: 'completed', label: 'Completed' },
                { value: 'overdue', label: 'Overdue' }
            ],
            required: true,
            isListColumn: true
        },
        {
            name: 'priority',
            label: 'Priority',
            type: 'select',
            options: [
                { value: 'low', label: 'Low' },
                { value: 'medium', label: 'Medium' },
                { value: 'high', label: 'High' }
            ],
            required: true,
            isListColumn: true
        },
        { name: 'category', label: 'Category', type: 'text', required: true },
        { name: 'notes', label: 'Notes', type: 'textarea' }
    ];
    const gratitudeEntryFields = [
        { name: 'date', label: 'Date', type: 'date', required: true, isListColumn: true },
        { name: 'recipient', label: 'Recipient', type: 'text', required: true, isListColumn: true },
        { name: 'content', label: 'Content', type: 'textarea', required: true },
        { name: 'category', label: 'Category', type: 'text', required: true, isListColumn: true },
        { name: 'isShared', label: 'Shared', type: 'checkbox', isListColumn: true },
        { name: 'tags', label: 'Tags', type: 'tags' }
    ];
    const eventFields = [
        { name: 'title', label: 'Title', type: 'text', required: true, isListColumn: true },
        { name: 'description', label: 'Description', type: 'textarea', required: true },
        { name: 'date', label: 'Date', type: 'date', required: true, isListColumn: true },
        { name: 'location', label: 'Location', type: 'text' },
        { name: 'attendees', label: 'Attendees', type: 'tags' },
        {
            name: 'status',
            label: 'Status',
            type: 'select',
            options: [
                { value: 'planned', label: 'Planned' },
                { value: 'confirmed', label: 'Confirmed' },
                { value: 'completed', label: 'Completed' },
                { value: 'cancelled', label: 'Cancelled' }
            ],
            required: true,
            isListColumn: true
        },
        { name: 'notes', label: 'Notes', type: 'textarea' }
    ];
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "mb-8", children: [_jsx("h1", { className: "text-3xl font-bold bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent", children: "Family Matrix" }), _jsx("p", { className: "text-slate-400 mt-2", children: "Manage family relationships, responsibilities, and express gratitude" })] }), _jsxs("div", { className: "flex space-x-2 mb-6", children: [_jsx("button", { onClick: () => setActiveTab('dashboard'), className: `px-4 py-2 rounded-lg transition-colors ${activeTab === 'dashboard'
                            ? 'bg-pink-600 text-white'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`, children: "Dashboard" }), _jsx("button", { onClick: () => setActiveTab('manage'), className: `px-4 py-2 rounded-lg transition-colors ${activeTab === 'manage'
                            ? 'bg-pink-600 text-white'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`, children: "Manage" })] }), activeTab === 'dashboard' ? (_jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-3 gap-8", children: [_jsx("div", { className: "xl:col-span-2", children: _jsx(FamilyTreeView, {}) }), _jsxs("div", { className: "space-y-8", children: [_jsx(ResponsibilityTracker, {}), _jsx(GratitudeLedger, {})] })] })) : (_jsxs("div", { className: "space-y-8", children: [_jsx(CrudList, { title: "Family Members", items: familyMembers, fields: familyMemberFields, onAdd: addFamilyMember, onUpdate: updateFamilyMember, onDelete: deleteFamilyMember, icon: _jsx(Users, { className: "w-5 h-5 text-blue-400" }), color: "blue" }), _jsx(CrudList, { title: "Responsibilities", items: responsibilities, fields: responsibilityFields, onAdd: addResponsibility, onUpdate: updateResponsibility, onDelete: deleteResponsibility, icon: _jsx(CheckSquare, { className: "w-5 h-5 text-emerald-400" }), color: "emerald" }), _jsx(CrudList, { title: "Gratitude Entries", items: gratitudeEntries, fields: gratitudeEntryFields, onAdd: addGratitudeEntry, onUpdate: updateGratitudeEntry, onDelete: deleteGratitudeEntry, icon: _jsx(Heart, { className: "w-5 h-5 text-pink-400" }), color: "pink" }), _jsx(CrudList, { title: "Family Events", items: familyEvents, fields: eventFields, onAdd: addFamilyEvent, onUpdate: updateFamilyEvent, onDelete: deleteFamilyEvent, icon: _jsx(Users, { className: "w-5 h-5 text-purple-400" }), color: "purple" })] }))] }));
}
