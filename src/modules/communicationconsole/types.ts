export interface ContentPiece {
  id: string
  title: string
  type: 'article' | 'post' | 'video' | 'podcast' | 'newsletter' | 'presentation'
  platform: 'blog' | 'linkedin' | 'twitter' | 'youtube' | 'medium' | 'newsletter' | 'website'
  status: 'draft' | 'review' | 'scheduled' | 'published' | 'archived'
  content: string
  excerpt?: string
  tags: string[]
  targetAudience: string
  publishDate?: string
  scheduledDate?: string
  wordCount: number
  estimatedReadTime: number
  engagement?: {
    views: number
    likes: number
    shares: number
    comments: number
  }
  createdAt: string
  updatedAt: string
}

export interface VoiceDraft {
  id: string
  title: string
  content: string
  tone: 'professional' | 'casual' | 'authoritative' | 'friendly' | 'inspirational'
  purpose: 'inform' | 'persuade' | 'entertain' | 'educate' | 'inspire'
  targetLength: 'short' | 'medium' | 'long'
  keywords: string[]
  status: 'draft' | 'refined' | 'approved'
  versions: VoiceVersion[]
  createdAt: string
  updatedAt: string
}

export interface VoiceVersion {
  id: string
  content: string
  tone: string
  createdAt: string
  feedback?: string
}

export interface BrandMetrics {
  id: string
  period: string
  totalReach: number
  engagement: number
  followerGrowth: number
  contentPerformance: {
    topPerforming: string[]
    averageEngagement: number
    bestPerformingType: string
  }
  brandMentions: number
  sentimentScore: number
}

export interface PublicationGoal {
  id: string
  title: string
  description: string
  targetDate: string
  targetMetric: 'reach' | 'engagement' | 'followers' | 'publications'
  targetValue: number
  currentValue: number
  status: 'active' | 'completed' | 'paused'
  createdAt: string
}

export interface CommunicationState {
  contentQueue: ContentPiece[]
  voiceDrafts: VoiceDraft[]
  brandMetrics: BrandMetrics[]
  publicationGoals: PublicationGoal[]
  
  // Content actions
  addContent: (content: Omit<ContentPiece, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateContent: (id: string, updates: Partial<ContentPiece>) => void
  deleteContent: (id: string) => void
  publishContent: (id: string) => void
  
  // Voice draft actions
  addVoiceDraft: (draft: Omit<VoiceDraft, 'id' | 'createdAt' | 'updatedAt' | 'versions'>) => void
  updateVoiceDraft: (id: string, updates: Partial<VoiceDraft>) => void
  deleteVoiceDraft: (id: string) => void
  addVoiceVersion: (draftId: string, version: Omit<VoiceVersion, 'id' | 'createdAt'>) => void
  
  // Goal actions
  addPublicationGoal: (goal: Omit<PublicationGoal, 'id' | 'createdAt'>) => void
  updatePublicationGoal: (id: string, updates: Partial<PublicationGoal>) => void
  deletePublicationGoal: (id: string) => void
}