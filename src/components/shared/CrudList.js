import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Search, ArrowUpDown } from 'lucide-react';
import { CrudModal } from './CrudModal';
export function CrudList({ title, items, fields, onAdd, onUpdate, onDelete, renderItemContent, emptyStateMessage = 'No items found', icon, color = 'blue' }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortField, setSortField] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');
    const handleAdd = () => {
        setCurrentItem(null);
        setIsModalOpen(true);
    };
    const handleEdit = (item) => {
        setCurrentItem(item);
        setIsModalOpen(true);
    };
    const handleSave = (item) => {
        if (item.id) {
            onUpdate(item.id, item);
        }
        else {
            onAdd(item);
        }
    };
    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        }
        else {
            setSortField(field);
            setSortDirection('asc');
        }
    };
    const filteredItems = items.filter(item => {
        if (!searchQuery)
            return true;
        // Search across all fields
        return fields.some(field => {
            const value = item[field.name];
            if (!value)
                return false;
            if (Array.isArray(value)) {
                return value.some(v => v.toString().toLowerCase().includes(searchQuery.toLowerCase()));
            }
            return value.toString().toLowerCase().includes(searchQuery.toLowerCase());
        });
    });
    const sortedItems = [...filteredItems].sort((a, b) => {
        if (!sortField)
            return 0;
        const aValue = a[sortField];
        const bValue = b[sortField];
        if (aValue === bValue)
            return 0;
        const comparison = aValue > bValue ? 1 : -1;
        return sortDirection === 'asc' ? comparison : -comparison;
    });
    const listColumns = fields.filter(field => field.isListColumn);
    return (_jsxs("div", { className: "glass-card rounded-xl p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [icon, _jsx("h3", { className: "text-xl font-semibold text-white", children: title })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" }), _jsx("input", { type: "text", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), placeholder: `Search ${title.toLowerCase()}...`, className: "w-48 pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500" })] }), _jsxs("button", { onClick: handleAdd, className: `flex items-center space-x-2 px-3 py-1.5 bg-${color}-600 hover:bg-${color}-700 rounded-lg transition-colors`, children: [_jsx(Plus, { className: "w-4 h-4 text-white" }), _jsxs("span", { className: "text-white text-sm", children: ["Add ", title] })] })] })] }), listColumns.length > 0 && (_jsxs("div", { className: "grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4 p-3 bg-slate-800/50 rounded-lg mb-2", children: [listColumns.map((field) => (_jsxs("button", { className: "flex items-center space-x-1 text-sm font-medium text-slate-300 hover:text-white transition-colors", onClick: () => handleSort(field.name), children: [_jsx("span", { children: field.label }), sortField === field.name && (_jsx(ArrowUpDown, { className: `w-3 h-3 ${sortDirection === 'asc' ? 'rotate-0' : 'rotate-180'}` }))] }, field.name))), _jsx("div", { className: "text-sm font-medium text-slate-300", children: "Actions" })] })), _jsx("div", { className: "space-y-3", children: sortedItems.length === 0 ? (_jsx("div", { className: "text-center py-8", children: _jsx("p", { className: "text-slate-400", children: emptyStateMessage }) })) : (sortedItems.map((item, index) => (_jsx(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { delay: index * 0.05 }, className: "p-4 bg-slate-800/30 rounded-lg hover:bg-slate-800/50 transition-colors", children: renderItemContent ? (renderItemContent(item)) : (_jsxs("div", { className: "grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4 items-center", children: [listColumns.map((field) => (_jsx("div", { children: field.type === 'tags' && Array.isArray(item[field.name]) ? (_jsxs("div", { className: "flex flex-wrap gap-1", children: [item[field.name].slice(0, 2).map((tag, i) => (_jsx("span", { className: "text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded", children: tag }, i))), item[field.name].length > 2 && (_jsxs("span", { className: "text-xs text-slate-400", children: ["+", item[field.name].length - 2] }))] })) : (_jsx("span", { className: "text-sm text-slate-300", children: item[field.name]?.toString() || '-' })) }, field.name))), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("button", { onClick: () => handleEdit(item), className: "p-2 hover:bg-slate-700 rounded-lg transition-colors", children: _jsx(Edit, { className: "w-4 h-4 text-slate-400 hover:text-white" }) }), _jsx("button", { onClick: () => {
                                            setCurrentItem(item);
                                            setIsModalOpen(true);
                                        }, className: "p-2 hover:bg-red-600/20 rounded-lg transition-colors", children: _jsx(Trash2, { className: "w-4 h-4 text-slate-400 hover:text-red-400" }) })] })] })) }, item.id)))) }), _jsx(CrudModal, { isOpen: isModalOpen, onClose: () => setIsModalOpen(false), title: title, item: currentItem, onSave: handleSave, onDelete: onDelete, fields: fields })] }));
}
