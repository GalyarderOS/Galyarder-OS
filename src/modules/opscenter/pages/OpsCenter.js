import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Briefcase, Users, ListChecks } from 'lucide-react';
import { ProjectBoard } from '../components/ProjectBoard';
import { ClientMatrix } from '../components/ClientMatrix';
import { ExecutionStack } from '../components/ExecutionStack';
import { CrudList } from '../../../components/shared/CrudList';
import { useOpsCenterStore } from '../store/opsCenterStore';
export function OpsCenter() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const { projects, clients, workflows, addProject, updateProject, deleteProject, addClient, updateClient, deleteClient, addWorkflow, updateWorkflow, deleteWorkflow } = useOpsCenterStore();
    const projectFields = [
        { name: 'name', label: 'Project Name', type: 'text', required: true, isListColumn: true },
        { name: 'description', label: 'Description', type: 'textarea', required: true },
        {
            name: 'status',
            label: 'Status',
            type: 'select',
            options: [
                { value: 'planning', label: 'Planning' },
                { value: 'active', label: 'Active' },
                { value: 'paused', label: 'Paused' },
                { value: 'completed', label: 'Completed' },
                { value: 'archived', label: 'Archived' }
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
                { value: 'high', label: 'High' },
                { value: 'critical', label: 'Critical' }
            ],
            required: true,
            isListColumn: true
        },
        { name: 'startDate', label: 'Start Date', type: 'date', required: true },
        { name: 'endDate', label: 'End Date', type: 'date', required: true },
        { name: 'progress', label: 'Progress (%)', type: 'number', required: true, isListColumn: true },
        { name: 'clients', label: 'Clients', type: 'tags' },
        { name: 'team', label: 'Team Members', type: 'tags' },
        { name: 'tags', label: 'Tags', type: 'tags' },
        { name: 'notes', label: 'Notes', type: 'textarea' }
    ];
    const clientFields = [
        { name: 'name', label: 'Client Name', type: 'text', required: true, isListColumn: true },
        { name: 'company', label: 'Company', type: 'text', required: true, isListColumn: true },
        { name: 'email', label: 'Email', type: 'text', required: true, isListColumn: true },
        { name: 'phone', label: 'Phone', type: 'text' },
        {
            name: 'status',
            label: 'Status',
            type: 'select',
            options: [
                { value: 'active', label: 'Active' },
                { value: 'inactive', label: 'Inactive' },
                { value: 'prospect', label: 'Prospect' }
            ],
            required: true,
            isListColumn: true
        },
        { name: 'projects', label: 'Projects', type: 'tags' },
        { name: 'notes', label: 'Notes', type: 'textarea' },
        { name: 'lastContact', label: 'Last Contact', type: 'date', required: true },
        { name: 'nextContact', label: 'Next Contact', type: 'date' },
        { name: 'tags', label: 'Tags', type: 'tags' }
    ];
    const workflowFields = [
        { name: 'name', label: 'Workflow Name', type: 'text', required: true, isListColumn: true },
        { name: 'description', label: 'Description', type: 'textarea', required: true },
        { name: 'category', label: 'Category', type: 'text', required: true, isListColumn: true },
        { name: 'isActive', label: 'Active', type: 'checkbox', isListColumn: true }
    ];
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "mb-8", children: [_jsx("h1", { className: "text-3xl font-bold bg-gradient-to-r from-blue-400 to-amber-400 bg-clip-text text-transparent", children: "Ops Center" }), _jsx("p", { className: "text-slate-400 mt-2", children: "Execution hub for projects and campaigns with tactical workflows" })] }), _jsxs("div", { className: "flex space-x-2 mb-6", children: [_jsx("button", { onClick: () => setActiveTab('dashboard'), className: `px-4 py-2 rounded-lg transition-colors ${activeTab === 'dashboard'
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`, children: "Dashboard" }), _jsx("button", { onClick: () => setActiveTab('manage'), className: `px-4 py-2 rounded-lg transition-colors ${activeTab === 'manage'
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`, children: "Manage" })] }), activeTab === 'dashboard' ? (_jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-3 gap-8", children: [_jsx("div", { className: "xl:col-span-2", children: _jsx(ProjectBoard, {}) }), _jsxs("div", { className: "space-y-8", children: [_jsx(ClientMatrix, {}), _jsx(ExecutionStack, {})] })] })) : (_jsxs("div", { className: "space-y-8", children: [_jsx(CrudList, { title: "Projects", items: projects, fields: projectFields, onAdd: addProject, onUpdate: updateProject, onDelete: deleteProject, icon: _jsx(Briefcase, { className: "w-5 h-5 text-blue-400" }), color: "blue" }), _jsx(CrudList, { title: "Clients", items: clients, fields: clientFields, onAdd: addClient, onUpdate: updateClient, onDelete: deleteClient, icon: _jsx(Users, { className: "w-5 h-5 text-purple-400" }), color: "purple" }), _jsx(CrudList, { title: "Workflows", items: workflows, fields: workflowFields, onAdd: addWorkflow, onUpdate: updateWorkflow, onDelete: deleteWorkflow, icon: _jsx(ListChecks, { className: "w-5 h-5 text-amber-400" }), color: "amber" })] }))] }));
}
