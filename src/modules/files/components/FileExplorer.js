import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Folder, File, Star, Share2, Download, Trash2, Edit, Upload, Grid, List, Search, ChevronRight, Home } from 'lucide-react';
import { useFilesStore } from '../store/filesStore';
export function FileExplorer() {
    const { files, currentPath, selectedFiles, view, searchQuery, navigateToPath, navigateUp, selectFile, toggleStar, deleteFile, setView, setSearchQuery, getFilesInPath } = useFilesStore();
    const [dragOver, setDragOver] = useState(false);
    const currentFiles = getFilesInPath(currentPath);
    const filteredFiles = searchQuery
        ? currentFiles.filter(file => file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            file.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
        : currentFiles;
    const sortedFiles = [...filteredFiles].sort((a, b) => {
        const { sortBy, sortOrder } = view;
        let comparison = 0;
        switch (sortBy) {
            case 'name':
                comparison = a.name.localeCompare(b.name);
                break;
            case 'size':
                comparison = a.size - b.size;
                break;
            case 'date':
                comparison = new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
                break;
            case 'type':
                comparison = (a.type + (a.extension || '')).localeCompare(b.type + (b.extension || ''));
                break;
        }
        return sortOrder === 'asc' ? comparison : -comparison;
    });
    const formatFileSize = (bytes) => {
        if (bytes === 0)
            return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };
    const getFileIcon = (file) => {
        if (file.type === 'folder')
            return Folder;
        if (file.mimeType?.startsWith('image/'))
            return '🖼️';
        if (file.mimeType?.startsWith('video/'))
            return '🎥';
        if (file.mimeType?.startsWith('audio/'))
            return '🎵';
        if (file.mimeType?.includes('pdf'))
            return '📄';
        if (file.mimeType?.includes('document') || file.mimeType?.includes('text'))
            return '📝';
        if (file.mimeType?.includes('spreadsheet'))
            return '📊';
        if (file.mimeType?.includes('presentation'))
            return '📽️';
        return File;
    };
    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        const files = Array.from(e.dataTransfer.files);
        files.forEach(file => {
            // Handle file upload
            console.log('Uploading file:', file.name);
        });
    };
    const pathParts = currentPath.split('/').filter(Boolean);
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "glass-card rounded-xl p-6", onDragOver: (e) => {
            e.preventDefault();
            setDragOver(true);
        }, onDragLeave: () => setDragOver(false), onDrop: handleDrop, children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(Folder, { className: "w-5 h-5 text-blue-400" }), _jsx("h3", { className: "text-xl font-semibold text-white", children: "File Explorer" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("button", { onClick: () => setView({ type: view.type === 'list' ? 'grid' : 'list' }), className: "p-2 hover:bg-slate-700 rounded-lg transition-colors", children: view.type === 'list' ? (_jsx(Grid, { className: "w-4 h-4 text-slate-400 hover:text-white" })) : (_jsx(List, { className: "w-4 h-4 text-slate-400 hover:text-white" })) }), _jsxs("button", { className: "flex items-center space-x-2 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors", children: [_jsx(Upload, { className: "w-4 h-4 text-white" }), _jsx("span", { className: "text-white text-sm", children: "Upload" })] })] })] }), _jsxs("div", { className: "space-y-4 mb-6", children: [_jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" }), _jsx("input", { type: "text", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), placeholder: "Search files and folders...", className: "w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500" })] }), _jsxs("div", { className: "flex items-center space-x-2 text-sm", children: [_jsxs("button", { onClick: () => navigateToPath('/'), className: "flex items-center space-x-1 text-slate-400 hover:text-white transition-colors", children: [_jsx(Home, { className: "w-3 h-3" }), _jsx("span", { children: "Home" })] }), pathParts.map((part, index) => (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(ChevronRight, { className: "w-3 h-3 text-slate-500" }), _jsx("button", { onClick: () => navigateToPath('/' + pathParts.slice(0, index + 1).join('/')), className: "text-slate-400 hover:text-white transition-colors", children: part })] }, index)))] })] }), _jsx("div", { className: `${dragOver ? 'border-2 border-dashed border-blue-500 bg-blue-500/10' : ''} rounded-lg transition-all`, children: view.type === 'list' ? (_jsx("div", { className: "space-y-2", children: sortedFiles.map((file, index) => {
                        const FileIcon = getFileIcon(file);
                        const isSelected = selectedFiles.includes(file.id);
                        return (_jsxs(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, transition: { delay: index * 0.05 }, className: `flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all group ${isSelected ? 'bg-blue-600/20 border border-blue-500/50' : 'hover:bg-slate-800/50'}`, onClick: () => {
                                if (file.type === 'folder') {
                                    navigateToPath(file.path);
                                }
                                else {
                                    selectFile(file.id);
                                }
                            }, children: [_jsxs("div", { className: "flex items-center space-x-3 flex-1", children: [typeof FileIcon === 'string' ? (_jsx("span", { className: "text-lg", children: FileIcon })) : (_jsx(FileIcon, { className: "w-5 h-5 text-blue-400" })), _jsxs("div", { className: "flex-1", children: [_jsx("p", { className: "text-sm font-medium text-white", children: file.name }), _jsxs("div", { className: "flex items-center space-x-4 text-xs text-slate-400", children: [_jsx("span", { children: file.type === 'folder' ? 'Folder' : formatFileSize(file.size) }), _jsx("span", { children: new Date(file.updatedAt).toLocaleDateString() }), file.tags.length > 0 && (_jsx("div", { className: "flex space-x-1", children: file.tags.slice(0, 2).map(tag => (_jsx("span", { className: "bg-slate-700 px-1 py-0.5 rounded text-xs", children: tag }, tag))) }))] })] })] }), _jsxs("div", { className: "flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity", children: [_jsx("button", { onClick: (e) => {
                                                e.stopPropagation();
                                                toggleStar(file.id);
                                            }, className: "p-1 hover:bg-slate-700 rounded transition-colors", children: _jsx(Star, { className: `w-3 h-3 ${file.isStarred ? 'text-yellow-400 fill-current' : 'text-slate-400'}` }) }), file.isShared && (_jsx(Share2, { className: "w-3 h-3 text-emerald-400" })), _jsx("button", { className: "p-1 hover:bg-slate-700 rounded transition-colors", children: _jsx(Download, { className: "w-3 h-3 text-slate-400 hover:text-white" }) }), _jsx("button", { className: "p-1 hover:bg-slate-700 rounded transition-colors", children: _jsx(Edit, { className: "w-3 h-3 text-slate-400 hover:text-white" }) }), _jsx("button", { onClick: (e) => {
                                                e.stopPropagation();
                                                deleteFile(file.id);
                                            }, className: "p-1 hover:bg-red-600/20 rounded transition-colors", children: _jsx(Trash2, { className: "w-3 h-3 text-slate-400 hover:text-red-400" }) })] })] }, file.id));
                    }) })) : (_jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4", children: sortedFiles.map((file, index) => {
                        const FileIcon = getFileIcon(file);
                        const isSelected = selectedFiles.includes(file.id);
                        return (_jsx(motion.div, { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, transition: { delay: index * 0.05 }, className: `p-4 rounded-lg cursor-pointer transition-all group ${isSelected ? 'bg-blue-600/20 border border-blue-500/50' : 'hover:bg-slate-800/50'}`, onClick: () => {
                                if (file.type === 'folder') {
                                    navigateToPath(file.path);
                                }
                                else {
                                    selectFile(file.id);
                                }
                            }, children: _jsxs("div", { className: "text-center", children: [file.thumbnail ? (_jsx("img", { src: file.thumbnail, alt: file.name, className: "w-12 h-12 object-cover rounded mx-auto mb-2" })) : typeof FileIcon === 'string' ? (_jsx("div", { className: "text-3xl mb-2", children: FileIcon })) : (_jsx(FileIcon, { className: "w-12 h-12 text-blue-400 mx-auto mb-2" })), _jsx("p", { className: "text-sm font-medium text-white truncate", children: file.name }), _jsx("p", { className: "text-xs text-slate-400", children: file.type === 'folder' ? 'Folder' : formatFileSize(file.size) }), _jsxs("div", { className: "flex items-center justify-center space-x-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity", children: [file.isStarred && (_jsx(Star, { className: "w-3 h-3 text-yellow-400 fill-current" })), file.isShared && (_jsx(Share2, { className: "w-3 h-3 text-emerald-400" }))] })] }) }, file.id));
                    }) })) }), sortedFiles.length === 0 && (_jsxs("div", { className: "text-center py-12", children: [_jsx(Folder, { className: "w-16 h-16 text-slate-400 mx-auto mb-4" }), _jsx("p", { className: "text-slate-400 mb-2", children: searchQuery ? 'No files match your search' : 'This folder is empty' }), _jsx("p", { className: "text-sm text-slate-500", children: searchQuery ? 'Try a different search term' : 'Drag and drop files here or click Upload' })] })), _jsx("div", { className: "mt-6 p-4 bg-slate-800/30 rounded-lg", children: _jsxs("div", { className: "grid grid-cols-3 gap-4 text-sm", children: [_jsxs("div", { children: [_jsx("span", { className: "text-slate-400", children: "Total Items:" }), _jsx("span", { className: "text-white ml-2", children: currentFiles.length })] }), _jsxs("div", { children: [_jsx("span", { className: "text-slate-400", children: "Selected:" }), _jsx("span", { className: "text-white ml-2", children: selectedFiles.length })] }), _jsxs("div", { children: [_jsx("span", { className: "text-slate-400", children: "Total Size:" }), _jsx("span", { className: "text-white ml-2", children: formatFileSize(currentFiles.reduce((sum, file) => sum + file.size, 0)) })] })] }) })] }));
}
