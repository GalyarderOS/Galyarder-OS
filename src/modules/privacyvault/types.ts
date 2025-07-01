export interface VaultItem {
  id: string
  name: string
  type: 'password' | 'document' | 'key' | 'note' | 'identity' | 'payment'
  category: string
  encrypted: boolean
  lastAccessed: string
  createdAt: string
  updatedAt: string
  tags: string[]
  metadata?: Record<string, any>
}

export interface SecurityKey {
  id: string
  name: string
  type: 'api' | 'ssh' | 'pgp' | 'certificate' | 'token'
  status: 'active' | 'expired' | 'revoked'
  expiryDate?: string
  lastUsed: string
  permissions: string[]
  createdAt: string
}

export interface AccessLog {
  id: string
  itemId?: string
  action: 'view' | 'edit' | 'create' | 'delete' | 'export' | 'login' | 'logout'
  timestamp: string
  ipAddress: string
  userAgent: string
  location?: string
  success: boolean
  details?: string
}

export interface SecurityAudit {
  id: string
  type: 'password_strength' | 'data_breach' | 'access_review' | 'key_rotation'
  status: 'passed' | 'warning' | 'failed'
  score: number
  findings: SecurityFinding[]
  recommendations: string[]
  completedAt: string
}

export interface SecurityFinding {
  id: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  category: string
  description: string
  affected: string[]
  remediation: string
}

export interface PrivacySettings {
  twoFactorEnabled: boolean
  biometricEnabled: boolean
  autoLockTimeout: number
  passwordPolicy: {
    minLength: number
    requireSpecialChars: boolean
    requireNumbers: boolean
    requireUppercase: boolean
  }
  dataRetention: {
    logRetentionDays: number
    autoDeleteInactive: boolean
    inactiveThresholdDays: number
  }
  notifications: {
    securityAlerts: boolean
    accessNotifications: boolean
    auditReminders: boolean
  }
}

export interface PrivacyState {
  vaultItems: VaultItem[]
  securityKeys: SecurityKey[]
  accessLogs: AccessLog[]
  securityAudits: SecurityAudit[]
  privacySettings: PrivacySettings
  
  // Vault actions
  addVaultItem: (item: Omit<VaultItem, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateVaultItem: (id: string, updates: Partial<VaultItem>) => void
  deleteVaultItem: (id: string) => void
  accessVaultItem: (id: string) => void
  
  // Key actions
  addSecurityKey: (key: Omit<SecurityKey, 'id' | 'createdAt'>) => void
  updateSecurityKey: (id: string, updates: Partial<SecurityKey>) => void
  revokeSecurityKey: (id: string) => void
  
  // Audit actions
  runSecurityAudit: (type: SecurityAudit['type']) => void
  
  // Settings actions
  updatePrivacySettings: (settings: Partial<PrivacySettings>) => void
}