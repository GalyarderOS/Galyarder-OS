import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Save, RefreshCw, MessageSquare } from 'lucide-react';
import { useCommunicationStore } from '../store/communicationStore';
export function VoiceDraftEditor() {
    const { voiceDrafts, addVoiceVersion } = useCommunicationStore();
    const [selectedDraft, setSelectedDraft] = useState(null);
    const [editingContent, setEditingContent] = useState('');
    const toneColors = {
        professional: 'text-blue-400',
        casual: 'text-emerald-400',
        authoritative: 'text-purple-400',
        friendly: 'text-amber-400',
        inspirational: 'text-pink-400'
    };
    const purposeIcons = {
        inform: '📚',
        persuade: '🎯',
        entertain: '🎭',
        educate: '🎓',
        inspire: '✨'
    };
    const handleRefineVoice = (draftId) => {
        // Mock AI voice refinement
        const draft = voiceDrafts.find(d => d.id === draftId);
        if (draft) {
            const refinedContent = `${draft.content}\n\n[AI Refined Version]\nThis refined version maintains your core message while enhancing clarity and impact...`;
            addVoiceVersion(draftId, {
                content: refinedContent,
                tone: draft.tone,
                feedback: 'AI-refined for better clarity and engagement'
            });
        }
    };
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.1 }, className: "glass-card rounded-xl p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(MessageSquare, { className: "w-5 h-5 text-purple-400" }), _jsx("h3", { className: "text-xl font-semibold text-white", children: "Voice Draft Editor" })] }), _jsxs("button", { className: "flex items-center space-x-2 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors", children: [_jsx(Plus, { className: "w-4 h-4 text-white" }), _jsx("span", { className: "text-white text-sm", children: "New Draft" })] })] }), _jsxs("div", { className: "mb-6", children: [_jsx("h4", { className: "text-sm font-medium text-white mb-4", children: "Voice Drafts" }), _jsx("div", { className: "space-y-3", children: voiceDrafts.map((draft, index) => (_jsxs(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.1 + index * 0.1 }, className: `p-4 border rounded-lg cursor-pointer transition-all ${selectedDraft === draft.id
                                ? 'border-purple-400 bg-purple-400/10'
                                : 'border-slate-700 bg-slate-800/30 hover:border-slate-600'}`, onClick: () => {
                                setSelectedDraft(draft.id);
                                setEditingContent(draft.content);
                            }, children: [_jsxs("div", { className: "flex items-start justify-between mb-3", children: [_jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center space-x-2 mb-2", children: [_jsx("span", { className: "text-lg", children: purposeIcons[draft.purpose] }), _jsx("h5", { className: "text-sm font-medium text-white", children: draft.title })] }), _jsxs("div", { className: "flex items-center space-x-4 text-xs text-slate-400 mb-2", children: [_jsx("span", { className: `${toneColors[draft.tone]} capitalize`, children: draft.tone }), _jsx("span", { className: "capitalize", children: draft.purpose }), _jsx("span", { className: "capitalize", children: draft.targetLength }), _jsxs("span", { children: [draft.versions.length, " versions"] })] }), _jsxs("p", { className: "text-xs text-slate-300 line-clamp-2", children: [draft.content.substring(0, 100), "..."] })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("button", { onClick: (e) => {
                                                        e.stopPropagation();
                                                        handleRefineVoice(draft.id);
                                                    }, className: "p-2 hover:bg-purple-600/20 rounded-lg transition-colors", children: _jsx(RefreshCw, { className: "w-4 h-4 text-purple-400" }) }), _jsx("button", { className: "p-2 hover:bg-slate-700 rounded-lg transition-colors", children: _jsx(Edit, { className: "w-4 h-4 text-slate-400 hover:text-white" }) })] })] }), _jsx("div", { className: "flex flex-wrap gap-1", children: draft.keywords.slice(0, 3).map(keyword => (_jsx("span", { className: "text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded", children: keyword }, keyword))) })] }, draft.id))) })] }), selectedDraft && (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "border border-slate-700 rounded-lg p-4", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h4", { className: "text-sm font-medium text-white", children: "Edit Draft" }), _jsxs("button", { className: "flex items-center space-x-2 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors", children: [_jsx(Save, { className: "w-4 h-4 text-white" }), _jsx("span", { className: "text-white text-sm", children: "Save Version" })] })] }), _jsx("textarea", { value: editingContent, onChange: (e) => setEditingContent(e.target.value), className: "w-full h-40 p-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500", placeholder: "Edit your voice draft here..." }), _jsxs("div", { className: "flex items-center justify-between mt-4 text-xs text-slate-400", children: [_jsxs("span", { children: [editingContent.length, " characters"] }), _jsxs("span", { children: ["~", Math.ceil(editingContent.split(' ').length / 200), " min read"] })] })] })), selectedDraft && (_jsxs("div", { className: "mt-6", children: [_jsx("h4", { className: "text-sm font-medium text-white mb-4", children: "Version History" }), _jsx("div", { className: "space-y-2", children: voiceDrafts
                            .find(d => d.id === selectedDraft)
                            ?.versions.slice(-3)
                            .map((version, index) => (_jsxs(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.1 + index * 0.1 }, className: "p-3 bg-slate-800/30 rounded-lg", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { className: `text-xs ${toneColors[version.tone]} capitalize`, children: version.tone }), _jsx("span", { className: "text-xs text-slate-400", children: new Date(version.createdAt).toLocaleDateString() })] }), _jsx("button", { onClick: () => setEditingContent(version.content), className: "text-xs text-blue-400 hover:text-blue-300 transition-colors", children: "Use this version" })] }), _jsxs("p", { className: "text-xs text-slate-300 line-clamp-2", children: [version.content.substring(0, 150), "..."] }), version.feedback && (_jsx("p", { className: "text-xs text-purple-400 mt-2 italic", children: version.feedback }))] }, version.id))) })] })), _jsx("div", { className: "mt-6 p-3 bg-purple-600/20 rounded-lg", children: _jsx("p", { className: "text-sm text-purple-300", children: "\uD83C\uDFA8 Use AI refinement to enhance your voice and maintain consistency across all your content." }) })] }));
}
