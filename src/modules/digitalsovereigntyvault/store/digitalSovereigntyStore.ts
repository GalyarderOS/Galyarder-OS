import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { 
  DigitalSovereigntyState, 
  DigitalAsset, 
  OwnershipRecord, 
  InheritanceProtocol, 
  SecurityKey 
} from '../types'

const mockDigitalAssets: DigitalAsset[] = [
  {
    id: '1',
    name: 'Bitcoin Holdings',
    type: 'cryptocurrency',
    description: 'Primary Bitcoin investment',
    value: 25000,
    acquisitionDate: '2021-05-15',
    location: {
      platform: 'Hardware Wallet',
      identifier: 'Ledger Nano X'
    },
    accessDetails: {
      primaryAccess: 'Hardware wallet with PIN',
      recoveryMethod: 'Seed phrase in secure location',
      notes: 'Backup seed phrase stored in safety deposit box'
    },
    inheritanceStatus: 'configured',
    tags: ['investment', 'crypto', 'bitcoin'],
    lastVerified: '2024-01-15',
    createdAt: '2021-05-15',
    updatedAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'Personal Domain',
    type: 'domain',
    description: 'Primary personal website domain',
    value: 500,
    acquisitionDate: '2019-03-10',
    expiryDate: '2025-03-10',
    location: {
      platform: 'Namecheap',
      identifier: 'example.com',
      url: 'https://example.com'
    },
    accessDetails: {
      primaryAccess: 'Namecheap account login',
      recoveryMethod: 'Email recovery',
      notes: 'Auto-renewal enabled'
    },
    inheritanceStatus: 'partial',
    tags: ['web', 'business', 'identity'],
    lastVerified: '2024-01-20',
    createdAt: '2019-03-10',
    updatedAt: '2024-01-20'
  }
]

const mockOwnershipRecords: OwnershipRecord[] = [
  {
    id: '1',
    assetId: '1',
    documentType: 'receipt',
    issuer: 'Coinbase',
    issueDate: '2021-05-15',
    documentReference: 'CB-20210515-BTC',
    verificationMethod: 'Transaction hash on blockchain',
    notes: 'Initial purchase of Bitcoin',
    tags: ['crypto', 'purchase'],
    createdAt: '2021-05-15'
  },
  {
    id: '2',
    assetId: '2',
    documentType: 'certificate',
    issuer: 'Namecheap',
    issueDate: '2019-03-10',
    documentReference: 'NC-20190310-DOM',
    verificationMethod: 'WHOIS record',
    notes: 'Domain registration confirmation',
    tags: ['domain', 'web'],
    createdAt: '2019-03-10'
  }
]

const mockInheritanceProtocols: InheritanceProtocol[] = [
  {
    id: '1',
    name: 'Digital Asset Inheritance Plan',
    description: 'Comprehensive plan for digital asset inheritance',
    beneficiaries: [
      {
        id: '1',
        name: 'Sarah Johnson',
        relationship: 'Wife',
        contact: 'sarah@example.com',
        assets: ['1', '2']
      },
      {
        id: '2',
        name: 'Michael Johnson',
        relationship: 'Son',
        contact: 'michael@example.com',
        assets: ['1']
      }
    ],
    activationConditions: [
      'Legal declaration of death',
      'Incapacitation for more than 6 months'
    ],
    executors: ['Robert Chen', 'Legal Firm XYZ'],
    instructions: 'Detailed instructions stored in encrypted document with executors',
    lastReviewed: '2024-01-10',
    status: 'active',
    createdAt: '2023-06-15',
    updatedAt: '2024-01-10'
  }
]

const mockSecurityKeys: SecurityKey[] = [
  {
    id: '1',
    name: 'Bitcoin Seed Phrase',
    type: 'seed-phrase',
    associatedAssets: ['1'],
    storageMethod: 'hardware',
    lastRotated: '2021-05-15',
    notes: 'Never store digitally, only on hardware and metal backup',
    createdAt: '2021-05-15',
    updatedAt: '2021-05-15'
  },
  {
    id: '2',
    name: 'Namecheap Account Password',
    type: 'password',
    associatedAssets: ['2'],
    storageMethod: 'encrypted',
    lastRotated: '2023-12-01',
    nextRotation: '2024-06-01',
    notes: 'Stored in password manager',
    createdAt: '2019-03-10',
    updatedAt: '2023-12-01'
  }
]

export const useDigitalSovereigntyStore = create<DigitalSovereigntyState>()(
  persist(
    (set, get) => ({
      digitalAssets: mockDigitalAssets,
      ownershipRecords: mockOwnershipRecords,
      inheritanceProtocols: mockInheritanceProtocols,
      securityKeys: mockSecurityKeys,

      addDigitalAsset: (asset) => {
        const newAsset: DigitalAsset = {
          ...asset,
          id: Math.random().toString(36).substr(2, 9),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
        set((state) => ({
          digitalAssets: [...state.digitalAssets, newAsset]
        }))
      },

      updateDigitalAsset: (id, updates) => {
        set((state) => ({
          digitalAssets: state.digitalAssets.map(asset =>
            asset.id === id 
              ? { ...asset, ...updates, updatedAt: new Date().toISOString() }
              : asset
          )
        }))
      },

      deleteDigitalAsset: (id) => {
        set((state) => ({
          digitalAssets: state.digitalAssets.filter(asset => asset.id !== id),
          ownershipRecords: state.ownershipRecords.filter(record => record.assetId !== id)
        }))
      },

      verifyDigitalAsset: (id) => {
        set((state) => ({
          digitalAssets: state.digitalAssets.map(asset =>
            asset.id === id 
              ? { ...asset, lastVerified: new Date().toISOString(), updatedAt: new Date().toISOString() }
              : asset
          )
        }))
      },

      addOwnershipRecord: (record) => {
        const newRecord: OwnershipRecord = {
          ...record,
          id: Math.random().toString(36).substr(2, 9),
          createdAt: new Date().toISOString()
        }
        set((state) => ({
          ownershipRecords: [...state.ownershipRecords, newRecord]
        }))
      },

      updateOwnershipRecord: (id, updates) => {
        set((state) => ({
          ownershipRecords: state.ownershipRecords.map(record =>
            record.id === id ? { ...record, ...updates } : record
          )
        }))
      },

      deleteOwnershipRecord: (id) => {
        set((state) => ({
          ownershipRecords: state.ownershipRecords.filter(record => record.id !== id)
        }))
      },

      addInheritanceProtocol: (protocol) => {
        const newProtocol: InheritanceProtocol = {
          ...protocol,
          id: Math.random().toString(36).substr(2, 9),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
        set((state) => ({
          inheritanceProtocols: [...state.inheritanceProtocols, newProtocol]
        }))
      },

      updateInheritanceProtocol: (id, updates) => {
        set((state) => ({
          inheritanceProtocols: state.inheritanceProtocols.map(protocol =>
            protocol.id === id 
              ? { ...protocol, ...updates, updatedAt: new Date().toISOString() }
              : protocol
          )
        }))
      },

      deleteInheritanceProtocol: (id) => {
        set((state) => ({
          inheritanceProtocols: state.inheritanceProtocols.filter(protocol => protocol.id !== id)
        }))
      },

      addSecurityKey: (key) => {
        const newKey: SecurityKey = {
          ...key,
          id: Math.random().toString(36).substr(2, 9),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
        set((state) => ({
          securityKeys: [...state.securityKeys, newKey]
        }))
      },

      updateSecurityKey: (id, updates) => {
        set((state) => ({
          securityKeys: state.securityKeys.map(key =>
            key.id === id 
              ? { ...key, ...updates, updatedAt: new Date().toISOString() }
              : key
          )
        }))
      },

      deleteSecurityKey: (id) => {
        set((state) => ({
          securityKeys: state.securityKeys.filter(key => key.id !== id)
        }))
      },

      rotateSecurityKey: (id) => {
        const now = new Date()
        const sixMonthsLater = new Date(now)
        sixMonthsLater.setMonth(now.getMonth() + 6)
        
        set((state) => ({
          securityKeys: state.securityKeys.map(key =>
            key.id === id 
              ? { 
                  ...key, 
                  lastRotated: now.toISOString(),
                  nextRotation: sixMonthsLater.toISOString(),
                  updatedAt: now.toISOString()
                }
              : key
          )
        }))
      },

      getAssetsByType: (type) => {
        return get().digitalAssets.filter(asset => asset.type === type)
      },

      getExpiringAssets: (days) => {
        const today = new Date()
        const futureDate = new Date(today)
        futureDate.setDate(today.getDate() + days)
        
        return get().digitalAssets.filter(asset => {
          if (!asset.expiryDate) return false
          const expiryDate = new Date(asset.expiryDate)
          return expiryDate >= today && expiryDate <= futureDate
        })
      },

      getKeysNeedingRotation: (days) => {
        const today = new Date()
        const futureDate = new Date(today)
        futureDate.setDate(today.getDate() + days)
        
        return get().securityKeys.filter(key => {
          if (!key.nextRotation) return false
          const rotationDate = new Date(key.nextRotation)
          return rotationDate >= today && rotationDate <= futureDate
        })
      }
    }),
    {
      name: 'digital-sovereignty-storage'
    }
  )
)