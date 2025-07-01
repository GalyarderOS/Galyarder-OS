export interface DigitalAsset {
  id: string
  name: string
  type: 'cryptocurrency' | 'domain' | 'nft' | 'account' | 'license' | 'other'
  description: string
  value: number
  acquisitionDate: string
  expiryDate?: string
  location: {
    platform: string
    identifier: string
    url?: string
  }
  accessDetails: {
    primaryAccess: string
    recoveryMethod: string
    notes: string
  }
  inheritanceStatus: 'configured' | 'partial' | 'none'
  tags: string[]
  lastVerified: string
  createdAt: string
  updatedAt: string
}

export interface OwnershipRecord {
  id: string
  assetId: string
  documentType: 'receipt' | 'certificate' | 'contract' | 'license' | 'other'
  issuer: string
  issueDate: string
  documentReference: string
  verificationMethod: string
  notes: string
  tags: string[]
  createdAt: string
}

export interface InheritanceProtocol {
  id: string
  name: string
  description: string
  beneficiaries: {
    id: string
    name: string
    relationship: string
    contact: string
    assets: string[]
  }[]
  activationConditions: string[]
  executors: string[]
  instructions: string
  lastReviewed: string
  status: 'active' | 'draft' | 'archived'
  createdAt: string
  updatedAt: string
}

export interface SecurityKey {
  id: string
  name: string
  type: 'password' | 'seed-phrase' | 'private-key' | 'api-key' | 'other'
  associatedAssets: string[]
  storageMethod: 'encrypted' | 'hardware' | 'paper' | 'mental' | 'other'
  lastRotated: string
  nextRotation?: string
  notes: string
  createdAt: string
  updatedAt: string
}

export interface DigitalSovereigntyState {
  digitalAssets: DigitalAsset[]
  ownershipRecords: OwnershipRecord[]
  inheritanceProtocols: InheritanceProtocol[]
  securityKeys: SecurityKey[]
  
  // Digital asset actions
  addDigitalAsset: (asset: Omit<DigitalAsset, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateDigitalAsset: (id: string, updates: Partial<DigitalAsset>) => void
  deleteDigitalAsset: (id: string) => void
  verifyDigitalAsset: (id: string) => void
  
  // Ownership record actions
  addOwnershipRecord: (record: Omit<OwnershipRecord, 'id' | 'createdAt'>) => void
  updateOwnershipRecord: (id: string, updates: Partial<OwnershipRecord>) => void
  deleteOwnershipRecord: (id: string) => void
  
  // Inheritance protocol actions
  addInheritanceProtocol: (protocol: Omit<InheritanceProtocol, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateInheritanceProtocol: (id: string, updates: Partial<InheritanceProtocol>) => void
  deleteInheritanceProtocol: (id: string) => void
  
  // Security key actions
  addSecurityKey: (key: Omit<SecurityKey, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateSecurityKey: (id: string, updates: Partial<SecurityKey>) => void
  deleteSecurityKey: (id: string) => void
  rotateSecurityKey: (id: string) => void
  
  // Utility actions
  getAssetsByType: (type: DigitalAsset['type']) => DigitalAsset[]
  getExpiringAssets: (days: number) => DigitalAsset[]
  getKeysNeedingRotation: (days: number) => SecurityKey[]
}