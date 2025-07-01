import { motion } from 'framer-motion'
import { useState } from 'react'
import { Key, Users, FileCheck, Shield } from 'lucide-react'
import { KeyVault } from '../components/KeyVault'
import { LegacyPass } from '../components/LegacyPass'
import { OwnershipProof } from '../components/OwnershipProof'
import { CrudList } from '@/components/shared/CrudList'
import { useDigitalSovereigntyStore } from '../store/digitalSovereigntyStore'

export function DigitalSovereigntyVault() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'manage'>('dashboard')
  const { 
    digitalAssets, 
    ownershipRecords, 
    inheritanceProtocols, 
    securityKeys,
    addDigitalAsset,
    updateDigitalAsset,
    deleteDigitalAsset,
    addOwnershipRecord,
    updateOwnershipRecord,
    deleteOwnershipRecord,
    addInheritanceProtocol,
    updateInheritanceProtocol,
    deleteInheritanceProtocol,
    addSecurityKey,
    updateSecurityKey,
    deleteSecurityKey
  } = useDigitalSovereigntyStore()

  const assetFields = [
    { name: 'name', label: 'Asset Name', type: 'text' as const, required: true, isListColumn: true },
    { 
      name: 'type', 
      label: 'Type', 
      type: 'select' as const, 
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
    { name: 'description', label: 'Description', type: 'textarea' as const, required: true },
    { name: 'value', label: 'Value ($)', type: 'number' as const, required: true, isListColumn: true },
    { name: 'acquisitionDate', label: 'Acquisition Date', type: 'date' as const, required: true },
    { name: 'expiryDate', label: 'Expiry Date', type: 'date' as const },
    { name: 'location.platform', label: 'Platform', type: 'text' as const, required: true },
    { name: 'location.identifier', label: 'Identifier', type: 'text' as const, required: true },
    { name: 'location.url', label: 'URL', type: 'text' as const },
    { name: 'accessDetails.primaryAccess', label: 'Primary Access Method', type: 'text' as const, required: true },
    { name: 'accessDetails.recoveryMethod', label: 'Recovery Method', type: 'text' as const, required: true },
    { name: 'accessDetails.notes', label: 'Access Notes', type: 'textarea' as const },
    { 
      name: 'inheritanceStatus', 
      label: 'Inheritance Status', 
      type: 'select' as const, 
      options: [
        { value: 'configured', label: 'Configured' },
        { value: 'partial', label: 'Partial' },
        { value: 'none', label: 'None' }
      ],
      required: true,
      isListColumn: true
    },
    { name: 'tags', label: 'Tags', type: 'tags' as const }
  ]

  const recordFields = [
    { name: 'assetId', label: 'Asset ID', type: 'text' as const, required: true, isListColumn: true },
    { 
      name: 'documentType', 
      label: 'Document Type', 
      type: 'select' as const, 
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
    { name: 'issuer', label: 'Issuer', type: 'text' as const, required: true, isListColumn: true },
    { name: 'issueDate', label: 'Issue Date', type: 'date' as const, required: true, isListColumn: true },
    { name: 'documentReference', label: 'Document Reference', type: 'text' as const, required: true },
    { name: 'verificationMethod', label: 'Verification Method', type: 'text' as const, required: true },
    { name: 'notes', label: 'Notes', type: 'textarea' as const },
    { name: 'tags', label: 'Tags', type: 'tags' as const }
  ]

  const keyFields = [
    { name: 'name', label: 'Key Name', type: 'text' as const, required: true, isListColumn: true },
    { 
      name: 'type', 
      label: 'Type', 
      type: 'select' as const, 
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
    { name: 'associatedAssets', label: 'Associated Assets', type: 'tags' as const },
    { 
      name: 'storageMethod', 
      label: 'Storage Method', 
      type: 'select' as const, 
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
    { name: 'lastRotated', label: 'Last Rotated', type: 'date' as const, required: true },
    { name: 'nextRotation', label: 'Next Rotation', type: 'date' as const },
    { name: 'notes', label: 'Notes', type: 'textarea' as const }
  ]

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Digital Sovereignty Vault
        </h1>
        <p className="text-slate-400 mt-2">
          Secure your digital assets, keys, and inheritance protocols
        </p>
      </motion.div>

      {/* Tab Navigation */}
      <div className="flex space-x-2 mb-6">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'dashboard'
              ? 'bg-blue-600 text-white'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          Dashboard
        </button>
        <button
          onClick={() => setActiveTab('manage')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'manage'
              ? 'bg-blue-600 text-white'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          Manage
        </button>
      </div>

      {activeTab === 'dashboard' ? (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2">
            <KeyVault />
          </div>
          <div className="space-y-8">
            <LegacyPass />
            <OwnershipProof />
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <CrudList
            title="Digital Assets"
            items={digitalAssets}
            fields={assetFields}
            onAdd={addDigitalAsset}
            onUpdate={updateDigitalAsset}
            onDelete={deleteDigitalAsset}
            icon={<Shield className="w-5 h-5 text-blue-400" />}
            color="blue"
          />
          
          <CrudList
            title="Ownership Records"
            items={ownershipRecords}
            fields={recordFields}
            onAdd={addOwnershipRecord}
            onUpdate={updateOwnershipRecord}
            onDelete={deleteOwnershipRecord}
            icon={<FileCheck className="w-5 h-5 text-emerald-400" />}
            color="emerald"
          />
          
          <CrudList
            title="Security Keys"
            items={securityKeys}
            fields={keyFields}
            onAdd={addSecurityKey}
            onUpdate={updateSecurityKey}
            onDelete={deleteSecurityKey}
            icon={<Key className="w-5 h-5 text-amber-400" />}
            color="amber"
          />
        </div>
      )}
    </div>
  )
}