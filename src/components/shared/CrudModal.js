import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Save, Trash2, AlertTriangle } from 'lucide-react';
export function CrudModal({ isOpen, onClose, title, item, onSave, onDelete, fields }) {
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const isNewItem = !item?.id;
    useEffect(() => {
        if (item) {
            setFormData({ ...item });
        }
        else {
            const initialData = {};
            fields.forEach(field => {
                initialData[field.name] = field.type === 'checkbox' ? false : '';
            });
            setFormData(initialData);
        }
    }, [item, fields]);
    const handleChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };
    const handleTagsChange = (name, value) => {
        const tags = value.split(',').map(tag => tag.trim()).filter(Boolean);
        setFormData(prev => ({ ...prev, [name]: tags }));
    };
    const validateForm = () => {
        const newErrors = {};
        fields.forEach(field => {
            if (field.required && !formData[field.name]) {
                newErrors[field.name] = `${field.label} is required`;
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm())
            return;
        onSave(formData);
        onClose();
    };
    const handleDelete = () => {
        if (onDelete && item?.id) {
            onDelete(item.id);
            onClose();
        }
    };
    if (!isOpen)
        return null;
    return (_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm", children: _jsxs(motion.div, { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.9 }, className: "bg-slate-800 rounded-xl border border-slate-700 shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto", onClick: (e) => e.stopPropagation(), children: [_jsxs("div", { className: "flex items-center justify-between p-4 border-b border-slate-700", children: [_jsx("h3", { className: "text-lg font-semibold text-white", children: isNewItem ? `Add ${title}` : `Edit ${title}` }), _jsx("button", { onClick: onClose, className: "p-1 hover:bg-slate-700 rounded-lg transition-colors", children: _jsx(X, { className: "w-5 h-5 text-slate-400" }) })] }), _jsxs("form", { onSubmit: handleSubmit, className: "p-4 space-y-4", children: [fields.map((field) => (_jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-slate-300 mb-1", children: [field.label, " ", field.required && _jsx("span", { className: "text-red-400", children: "*" })] }), field.type === 'text' && (_jsx("input", { type: "text", value: formData[field.name] || '', onChange: (e) => handleChange(field.name, e.target.value), className: "w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500" })), field.type === 'textarea' && (_jsx("textarea", { value: formData[field.name] || '', onChange: (e) => handleChange(field.name, e.target.value), rows: 4, className: "w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" })), field.type === 'number' && (_jsx("input", { type: "number", value: formData[field.name] || '', onChange: (e) => handleChange(field.name, parseFloat(e.target.value)), className: "w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500" })), field.type === 'date' && (_jsx("input", { type: "date", value: formData[field.name] || '', onChange: (e) => handleChange(field.name, e.target.value), className: "w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500" })), field.type === 'select' && field.options && (_jsxs("select", { value: formData[field.name] || '', onChange: (e) => handleChange(field.name, e.target.value), className: "w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500", children: [_jsxs("option", { value: "", children: ["Select ", field.label] }), field.options.map((option) => (_jsx("option", { value: option.value, children: option.label }, option.value)))] })), field.type === 'checkbox' && (_jsxs("div", { className: "flex items-center", children: [_jsx("input", { type: "checkbox", checked: formData[field.name] || false, onChange: (e) => handleChange(field.name, e.target.checked), className: "w-4 h-4 bg-slate-700 border-slate-600 rounded focus:ring-blue-500 text-blue-600" }), _jsxs("span", { className: "ml-2 text-sm text-slate-300", children: ["Enable ", field.label] })] })), field.type === 'tags' && (_jsxs("div", { children: [_jsx("input", { type: "text", value: Array.isArray(formData[field.name]) ? formData[field.name].join(', ') : '', onChange: (e) => handleTagsChange(field.name, e.target.value), placeholder: "Enter tags separated by commas", className: "w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500" }), _jsx("p", { className: "mt-1 text-xs text-slate-400", children: "Separate tags with commas" })] })), errors[field.name] && (_jsx("p", { className: "mt-1 text-xs text-red-400", children: errors[field.name] }))] }, field.name))), _jsxs("div", { className: "flex justify-between pt-4 border-t border-slate-700", children: [_jsx("div", { children: !isNewItem && onDelete && (_jsx("button", { type: "button", onClick: () => setShowDeleteConfirm(true), className: "px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg transition-colors", children: _jsx(Trash2, { className: "w-4 h-4" }) })) }), _jsxs("div", { className: "flex space-x-3", children: [_jsx("button", { type: "button", onClick: onClose, className: "px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors", children: "Cancel" }), _jsxs("button", { type: "submit", className: "px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2", children: [_jsx(Save, { className: "w-4 h-4" }), _jsx("span", { children: "Save" })] })] })] })] }), showDeleteConfirm && (_jsxs("div", { className: "p-4 border-t border-slate-700", children: [_jsx("div", { className: "p-4 bg-red-600/10 border border-red-600/30 rounded-lg mb-4", children: _jsxs("div", { className: "flex items-start space-x-3", children: [_jsx(AlertTriangle, { className: "w-5 h-5 text-red-400 mt-0.5" }), _jsxs("div", { children: [_jsx("h4", { className: "text-sm font-medium text-red-400 mb-1", children: "Confirm Deletion" }), _jsxs("p", { className: "text-sm text-red-300", children: ["Are you sure you want to delete this ", title.toLowerCase(), "? This action cannot be undone."] })] })] }) }), _jsxs("div", { className: "flex justify-end space-x-3", children: [_jsx("button", { type: "button", onClick: () => setShowDeleteConfirm(false), className: "px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors", children: "Cancel" }), _jsx("button", { type: "button", onClick: handleDelete, className: "px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors", children: "Delete" })] })] }))] }) }));
}
