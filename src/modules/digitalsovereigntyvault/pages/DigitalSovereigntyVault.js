import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Key, FileCheck, Shield } from 'lucide-react';
import { KeyVault } from '../components/KeyVault';
import { LegacyPass } from '../components/LegacyPass';
import { OwnershipProof } from '../components/OwnershipProof';
import { CrudList } from '@/components/shared/CrudList';
import { useDigitalSovereigntyStore } from '../store/digitalSovereigntyStore';
export function DigitalSovereigntyVault() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const { digitalAssets, ownershipRecords, inheritanceProtocols, securityKeys, addDigitalAsset, updateDigitalAsset, deleteDigitalAsset, addOwnershipRecord, updateOwnershipRecord, deleteOwnershipRecord, addInheritanceProtocol, updateInheritanceProtocol, deleteInheritanceProtocol, addSecurityKey, updateSecurityKey, deleteSecurityKey } = useDigitalSovereigntyStore();
    const assetFields = [
        { name: 'name', label: 'Asset Name', type: 'text', required: true, isListColumn: true },
        {
            name: 'type',
            label: 'Type',
            type: 'select',
            options: [
                { value: 'cryptocurrency', label: 'Cryptocurrency' },
                { value: 'domain', label: 'Domain' },
                { value: 'nft', label: 'NFT' },
                { value: 'account', label: 'Account' },
                { value: 'license', label: 'License' },
                { value: 'other', label: 'Other' }
            ],
            required: true,
            isListColumn: true
        },
        { name: 'description', label: 'Description', type: 'textarea', required: true },
        { name: 'value', label: 'Value ($)', type: 'number', required: true, isListColumn: true },
        { name: 'acquisitionDate', label: 'Acquisition Date', type: 'date', required: true },
        { name: 'expiryDate', label: 'Expiry Date', type: 'date' },
        { name: 'location.platform', label: 'Platform', type: 'text', required: true },
        { name: 'location.identifier', label: 'Identifier', type: 'text', required: true },
        { name: 'location.url', label: 'URL', type: 'text' },
        { name: 'accessDetails.primaryAccess', label: 'Primary Access Method', type: 'text', required: true },
        { name: 'accessDetails.recoveryMethod', label: 'Recovery Method', type: 'text', required: true },
        { name: 'accessDetails.notes', label: 'Access Notes', type: 'textarea' },
        {
            name: 'inheritanceStatus',
            label: 'Inheritance Status',
            type: 'select',
            options: [
                { value: 'configured', label: 'Configured' },
                { value: 'partial', label: 'Partial' },
                { value: 'none', label: 'None' }
            ],
            required: true,
            isListColumn: true
        },
        { name: 'tags', label: 'Tags', type: 'tags' }
    ];
    const recordFields = [
        { name: 'assetId', label: 'Asset ID', type: 'text', required: true, isListColumn: true },
        {
            name: 'documentType',
            label: 'Document Type',
            type: 'select',
            options: [
                { value: 'receipt', label: 'Receipt' },
                { value: 'certificate', label: 'Certificate' },
                { value: 'contract', label: 'Contract' },
                { value: 'license', label: 'License' },
                { value: 'other', label: 'Other' }
            ],
            required: true,
            isListColumn: true
        },
        { name: 'issuer', label: 'Issuer', type: 'text', required: true, isListColumn: true },
        { name: 'issueDate', label: 'Issue Date', type: 'date', required: true, isListColumn: true },
        { name: 'documentReference', label: 'Document Reference', type: 'text', required: true },
        { name: 'verificationMethod', label: 'Verification Method', type: 'text', required: true },
        { name: 'notes', label: 'Notes', type: 'textarea' },
        { name: 'tags', label: 'Tags', type: 'tags' }
    ];
    const keyFields = [
        { name: 'name', label: 'Key Name', type: 'text', required: true, isListColumn: true },
        {
            name: 'type',
            label: 'Type',
            type: 'select',
            options: [
                { value: 'password', label: 'Password' },
                { value: 'seed-phrase', label: 'Seed Phrase' },
                { value: 'private-key', label: 'Private Key' },
                { value: 'api-key', label: 'API Key' },
                { value: 'other', label: 'Other' }
            ],
            required: true,
            isListColumn: true
        },
        { name: 'associatedAssets', label: 'Associated Assets', type: 'tags' },
        {
            name: 'storageMethod',
            label: 'Storage Method',
            type: 'select',
            options: [
                { value: 'encrypted', label: 'Encrypted' },
                { value: 'hardware', label: 'Hardware' },
                { value: 'paper', label: 'Paper' },
                { value: 'mental', label: 'Mental' },
                { value: 'other', label: 'Other' }
            ],
            required: true,
            isListColumn: true
        },
        { name: 'lastRotated', label: 'Last Rotated', type: 'date', required: true },
        { name: 'nextRotation', label: 'Next Rotation', type: 'date' },
        { name: 'notes', label: 'Notes', type: 'textarea' }
    ];
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "mb-8", children: [_jsx("h1", { className: "text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent", children: "Digital Sovereignty Vault" }), _jsx("p", { className: "text-slate-400 mt-2", children: "Secure your digital assets, keys, and inheritance protocols" })] }), _jsxs("div", { className: "flex space-x-2 mb-6", children: [_jsx("button", { onClick: () => setActiveTab('dashboard'), className: `px-4 py-2 rounded-lg transition-colors ${activeTab === 'dashboard'
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`, children: "Dashboard" }), _jsx("button", { onClick: () => setActiveTab('manage'), className: `px-4 py-2 rounded-lg transition-colors ${activeTab === 'manage'
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`, children: "Manage" })] }), activeTab === 'dashboard' ? (_jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-3 gap-8", children: [_jsx("div", { className: "xl:col-span-2", children: _jsx(KeyVault, {}) }), _jsxs("div", { className: "space-y-8", children: [_jsx(LegacyPass, {}), _jsx(OwnershipProof, {})] })] })) : (_jsxs("div", { className: "space-y-8", children: [_jsx(CrudList, { title: "Digital Assets", items: digitalAssets, fields: assetFields, onAdd: addDigitalAsset, onUpdate: updateDigitalAsset, onDelete: deleteDigitalAsset, icon: _jsx(Shield, { className: "w-5 h-5 text-blue-400" }), color: "blue" }), _jsx(CrudList, { title: "Ownership Records", items: ownershipRecords, fields: recordFields, onAdd: addOwnershipRecord, onUpdate: updateOwnershipRecord, onDelete: deleteOwnershipRecord, icon: _jsx(FileCheck, { className: "w-5 h-5 text-emerald-400" }), color: "emerald" }), _jsx(CrudList, { title: "Security Keys", items: securityKeys, fields: keyFields, onAdd: addSecurityKey, onUpdate: updateSecurityKey, onDelete: deleteSecurityKey, icon: _jsx(Key, { className: "w-5 h-5 text-amber-400" }), color: "amber" })] }))] }));
}
