import { usePrivacyStore } from '../store/privacyStore'

export function usePrivacyAI() {
  const { vaultItems, securityKeys, accessLogs, securityAudits } = usePrivacyStore()

  const getAIContext = () => {
    return {
      vaultItems: vaultItems.map(item => ({
        type: item.type,
        category: item.category,
        encrypted: item.encrypted,
        lastAccessed: item.lastAccessed,
        tags: item.tags
      })),
      securityKeys: securityKeys.map(key => ({
        type: key.type,
        status: key.status,
        expiryDate: key.expiryDate,
        lastUsed: key.lastUsed
      })),
      accessLogs: accessLogs.slice(-50).map(log => ({
        action: log.action,
        success: log.success,
        timestamp: log.timestamp,
        ipAddress: log.ipAddress
      })),
      securityAudits: securityAudits.slice(-3)
    }
  }

  const generateSecurityInsights = () => {
    const insights = []
    
    // Check for weak passwords or old items
    const oldItems = vaultItems.filter(item => {
      const daysSinceUpdate = Math.floor(
        (new Date().getTime() - new Date(item.updatedAt).getTime()) / (1000 * 60 * 60 * 24)
      )
      return daysSinceUpdate > 90 && item.type === 'password'
    })
    
    if (oldItems.length > 0) {
      insights.push({
        type: 'warning',
        message: `${oldItems.length} passwords haven't been updated in 90+ days. Consider rotating them for better security.`
      })
    }

    // Check for expiring keys
    const expiringSoon = securityKeys.filter(key => {
      if (!key.expiryDate) return false
      const daysUntilExpiry = Math.floor(
        (new Date(key.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
      )
      return daysUntilExpiry <= 30 && daysUntilExpiry > 0
    })
    
    if (expiringSoon.length > 0) {
      insights.push({
        type: 'urgent',
        message: `${expiringSoon.length} security keys expire within 30 days. Plan key rotation to avoid service disruption.`
      })
    }

    // Check for failed access attempts
    const recentFailures = accessLogs.filter(log => {
      const daysSinceLog = Math.floor(
        (new Date().getTime() - new Date(log.timestamp).getTime()) / (1000 * 60 * 60 * 24)
      )
      return !log.success && daysSinceLog <= 7
    })
    
    if (recentFailures.length > 5) {
      insights.push({
        type: 'critical',
        message: `${recentFailures.length} failed access attempts in the last week. Review security logs for potential threats.`
      })
    }

    // Check encryption status
    const unencryptedItems = vaultItems.filter(item => !item.encrypted)
    if (unencryptedItems.length > 0) {
      insights.push({
        type: 'warning',
        message: `${unencryptedItems.length} vault items are not encrypted. Enable encryption for better protection.`
      })
    }

    return insights
  }

  const suggestSecurityImprovements = () => {
    const suggestions = []
    
    // Analyze vault organization
    const categories = [...new Set(vaultItems.map(item => item.category))]
    if (categories.length < 3) {
      suggestions.push({
        category: 'Organization',
        suggestion: 'Create more specific categories to better organize your vault items',
        impact: 'medium'
      })
    }

    // Check for missing tags
    const untaggedItems = vaultItems.filter(item => item.tags.length === 0)
    if (untaggedItems.length > vaultItems.length * 0.3) {
      suggestions.push({
        category: 'Organization',
        suggestion: 'Add tags to vault items for better searchability and organization',
        impact: 'low'
      })
    }

    // Security key diversity
    const keyTypes = [...new Set(securityKeys.map(key => key.type))]
    if (keyTypes.length < 2) {
      suggestions.push({
        category: 'Security',
        suggestion: 'Consider using multiple types of security keys for defense in depth',
        impact: 'medium'
      })
    }

    // Access pattern analysis
    const accessFrequency = vaultItems.map(item => {
      const daysSinceAccess = Math.floor(
        (new Date().getTime() - new Date(item.lastAccessed).getTime()) / (1000 * 60 * 60 * 24)
      )
      return daysSinceAccess
    })
    
    const averageDaysSinceAccess = accessFrequency.reduce((sum, days) => sum + days, 0) / accessFrequency.length
    
    if (averageDaysSinceAccess > 60) {
      suggestions.push({
        category: 'Usage',
        suggestion: 'Many vault items haven\'t been accessed recently. Consider archiving unused items',
        impact: 'low'
      })
    }

    return suggestions
  }

  const assessSecurityRisk = () => {
    let riskScore = 0
    const riskFactors = []
    
    // Check for expired keys
    const expiredKeys = securityKeys.filter(key => key.status === 'expired')
    if (expiredKeys.length > 0) {
      riskScore += expiredKeys.length * 20
      riskFactors.push(`${expiredKeys.length} expired security keys`)
    }

    // Check for old passwords
    const oldPasswords = vaultItems.filter(item => {
      const daysSinceUpdate = Math.floor(
        (new Date().getTime() - new Date(item.updatedAt).getTime()) / (1000 * 60 * 60 * 24)
      )
      return daysSinceUpdate > 180 && item.type === 'password'
    })
    
    if (oldPasswords.length > 0) {
      riskScore += oldPasswords.length * 10
      riskFactors.push(`${oldPasswords.length} passwords older than 6 months`)
    }

    // Check for failed access attempts
    const recentFailures = accessLogs.filter(log => {
      const daysSinceLog = Math.floor(
        (new Date().getTime() - new Date(log.timestamp).getTime()) / (1000 * 60 * 60 * 24)
      )
      return !log.success && daysSinceLog <= 30
    })
    
    if (recentFailures.length > 10) {
      riskScore += 30
      riskFactors.push(`${recentFailures.length} failed access attempts this month`)
    }

    // Determine risk level
    let riskLevel: 'low' | 'medium' | 'high' | 'critical'
    if (riskScore >= 80) riskLevel = 'critical'
    else if (riskScore >= 50) riskLevel = 'high'
    else if (riskScore >= 20) riskLevel = 'medium'
    else riskLevel = 'low'

    return {
      score: Math.min(riskScore, 100),
      level: riskLevel,
      factors: riskFactors
    }
  }

  return {
    getAIContext,
    generateSecurityInsights,
    suggestSecurityImprovements,
    assessSecurityRisk
  }
}