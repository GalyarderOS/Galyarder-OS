import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { PrivacyState, VaultItem, SecurityKey, AccessLog, SecurityAudit, PrivacySettings } from '../types'

const mockVaultItems: VaultItem[] = [
  {
    id: '1',
    name: 'GitHub Account',
    type: 'password',
    category: 'Development',
    encrypted: true,
    lastAccessed: '2024-02-10',
    createdAt: '2024-01-15',
    updatedAt: '2024-02-01',
    tags: ['work', 'development', 'github'],
    metadata: {
      username: 'developer@example.com',
      url: 'https://github.com',
      strength: 'strong'
    }
  },
  {
    id: '2',
    name: 'Passport Scan',
    type: 'document',
    category: 'Identity',
    encrypted: true,
    lastAccessed: '2024-01-20',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-10',
    tags: ['identity', 'travel', 'official'],
    metadata: {
      documentType: 'passport',
      expiryDate: '2029-05-15',
      country: 'US'
    }
  }
]

const mockSecurityKeys: SecurityKey[] = [
  {
    id: '1',
    name: 'AWS Production API Key',
    type: 'api',
    status: 'active',
    expiryDate: '2024-08-15',
    lastUsed: '2024-02-09',
    permissions: ['s3:read', 's3:write', 'ec2:describe'],
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'SSH Key - Production Server',
    type: 'ssh',
    status: 'active',
    lastUsed: '2024-02-08',
    permissions: ['server:access', 'deploy:execute'],
    createdAt: '2024-01-20'
  }
]

const mockAccessLogs: AccessLog[] = [
  {
    id: '1',
    itemId: '1',
    action: 'view',
    timestamp: '2024-02-10T14:30:00Z',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    location: 'San Francisco, CA',
    success: true,
    details: 'Viewed GitHub Account credentials'
  },
  {
    id: '2',
    action: 'login',
    timestamp: '2024-02-10T09:15:00Z',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    location: 'San Francisco, CA',
    success: true,
    details: 'Successful vault login'
  }
]

const mockSecurityAudits: SecurityAudit[] = [
  {
    id: '1',
    type: 'password_strength',
    status: 'warning',
    score: 75,
    findings: [
      {
        id: '1',
        severity: 'medium',
        category: 'Password Security',
        description: '3 passwords are older than 90 days',
        affected: ['GitHub Account', 'Email Account', 'Banking'],
        remediation: 'Update passwords to maintain security'
      }
    ],
    recommendations: [
      'Enable automatic password rotation',
      'Use unique passwords for all accounts',
      'Consider using passkeys where available'
    ],
    completedAt: '2024-02-01T10:00:00Z'
  }
]

const mockPrivacySettings: PrivacySettings = {
  twoFactorEnabled: true,
  biometricEnabled: true,
  autoLockTimeout: 15,
  passwordPolicy: {
    minLength: 12,
    requireSpecialChars: true,
    requireNumbers: true,
    requireUppercase: true
  },
  dataRetention: {
    logRetentionDays: 90,
    autoDeleteInactive: true,
    inactiveThresholdDays: 365
  },
  notifications: {
    securityAlerts: true,
    accessNotifications: true,
    auditReminders: true
  }
}

export const usePrivacyStore = create<PrivacyState>()(
  persist(
    (set, get) => ({
      vaultItems: mockVaultItems,
      securityKeys: mockSecurityKeys,
      accessLogs: mockAccessLogs,
      securityAudits: mockSecurityAudits,
      privacySettings: mockPrivacySettings,

      addVaultItem: (item) => {
        const newItem: VaultItem = {
          ...item,
          id: Math.random().toString(36).substr(2, 9),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
        set((state) => ({
          vaultItems: [...state.vaultItems, newItem]
        }))
        
        // Log the action
        get().logAccess('create', newItem.id, 'Created new vault item')
      },

      updateVaultItem: (id, updates) => {
        set((state) => ({
          vaultItems: state.vaultItems.map(item =>
            item.id === id 
              ? { ...item, ...updates, updatedAt: new Date().toISOString() }
              : item
          )
        }))
        
        get().logAccess('edit', id, 'Updated vault item')
      },

      deleteVaultItem: (id) => {
        set((state) => ({
          vaultItems: state.vaultItems.filter(item => item.id !== id)
        }))
        
        get().logAccess('delete', id, 'Deleted vault item')
      },

      accessVaultItem: (id) => {
        set((state) => ({
          vaultItems: state.vaultItems.map(item =>
            item.id === id 
              ? { ...item, lastAccessed: new Date().toISOString() }
              : item
          )
        }))
        
        get().logAccess('view', id, 'Accessed vault item')
      },

      addSecurityKey: (key) => {
        const newKey: SecurityKey = {
          ...key,
          id: Math.random().toString(36).substr(2, 9),
          createdAt: new Date().toISOString()
        }
        set((state) => ({
          securityKeys: [...state.securityKeys, newKey]
        }))
      },

      updateSecurityKey: (id, updates) => {
        set((state) => ({
          securityKeys: state.securityKeys.map(key =>
            key.id === id ? { ...key, ...updates } : key
          )
        }))
      },

      revokeSecurityKey: (id) => {
        set((state) => ({
          securityKeys: state.securityKeys.map(key =>
            key.id === id ? { ...key, status: 'revoked' as const } : key
          )
        }))
      },

      runSecurityAudit: (type) => {
        // Mock audit results
        const mockAudit: SecurityAudit = {
          id: Math.random().toString(36).substr(2, 9),
          type,
          status: 'passed',
          score: Math.floor(Math.random() * 30) + 70,
          findings: [],
          recommendations: [
            'Continue following security best practices',
            'Regular security audits are recommended'
          ],
          completedAt: new Date().toISOString()
        }
        
        set((state) => ({
          securityAudits: [mockAudit, ...state.securityAudits]
        }))
      },

      updatePrivacySettings: (settings) => {
        set((state) => ({
          privacySettings: { ...state.privacySettings, ...settings }
        }))
      },

      // Helper method to log access (not exposed in interface)
      logAccess: (action: AccessLog['action'], itemId?: string, details?: string) => {
        const newLog: AccessLog = {
          id: Math.random().toString(36).substr(2, 9),
          itemId,
          action,
          timestamp: new Date().toISOString(),
          ipAddress: '192.168.1.100', // Mock IP
          userAgent: navigator.userAgent,
          location: 'Unknown', // Would be determined by IP geolocation
          success: true,
          details
        }
        
        set((state) => ({
          accessLogs: [newLog, ...state.accessLogs].slice(0, 100) // Keep last 100 logs
        }))
      }
    } as any),
    {
      name: 'privacy-vault-storage',
      partialize: (state) => ({
        vaultItems: state.vaultItems,
        securityKeys: state.securityKeys,
        privacySettings: state.privacySettings
        // Don't persist logs and audits for security
      })
    }
  )
)