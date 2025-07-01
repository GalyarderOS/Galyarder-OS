import { useCommunicationStore } from '../store/communicationStore';
export function useCommunicationAI() {
    const { contentQueue, voiceDrafts, brandMetrics } = useCommunicationStore();
    const getAIContext = () => {
        return {
            contentQueue: contentQueue.map(content => ({
                title: content.title,
                type: content.type,
                platform: content.platform,
                status: content.status,
                tags: content.tags,
                engagement: content.engagement
            })),
            voiceDrafts: voiceDrafts.map(draft => ({
                title: draft.title,
                tone: draft.tone,
                purpose: draft.purpose,
                keywords: draft.keywords,
                status: draft.status
            })),
            brandMetrics: brandMetrics.slice(-3)
        };
    };
    const generateContentInsights = () => {
        const insights = [];
        // Check content pipeline health
        const draftCount = contentQueue.filter(c => c.status === 'draft').length;
        const scheduledCount = contentQueue.filter(c => c.status === 'scheduled').length;
        if (draftCount < 3) {
            insights.push({
                type: 'warning',
                message: 'Your content pipeline is running low. Consider creating more drafts to maintain consistent publishing.'
            });
        }
        if (scheduledCount === 0) {
            insights.push({
                type: 'suggestion',
                message: 'No content scheduled for upcoming weeks. Plan your publishing calendar to maintain audience engagement.'
            });
        }
        // Analyze content performance
        const publishedContent = contentQueue.filter(c => c.status === 'published' && c.engagement);
        if (publishedContent.length > 0) {
            const avgEngagement = publishedContent.reduce((sum, c) => sum + (c.engagement?.views || 0), 0) / publishedContent.length;
            if (avgEngagement < 1000) {
                insights.push({
                    type: 'suggestion',
                    message: 'Consider experimenting with different content formats or topics to increase engagement.'
                });
            }
        }
        // Voice consistency check
        const tones = [...new Set(voiceDrafts.map(d => d.tone))];
        if (tones.length > 3) {
            insights.push({
                type: 'info',
                message: 'You\'re using multiple voice tones. Consider establishing a consistent brand voice for better recognition.'
            });
        }
        return insights;
    };
    const suggestContentTopics = () => {
        const suggestions = [];
        // Based on existing tags and performance
        const popularTags = contentQueue
            .flatMap(c => c.tags)
            .reduce((acc, tag) => {
            acc[tag] = (acc[tag] || 0) + 1;
            return acc;
        }, {});
        const topTags = Object.entries(popularTags)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 3)
            .map(([tag]) => tag);
        topTags.forEach(tag => {
            suggestions.push({
                topic: `Advanced ${tag} strategies`,
                reason: `Your ${tag} content performs well`,
                suggestedFormat: 'article'
            });
        });
        // Trending topics (mock)
        suggestions.push({
            topic: 'AI in Content Creation',
            reason: 'Trending topic in your industry',
            suggestedFormat: 'video'
        }, {
            topic: 'Personal Branding Tips',
            reason: 'High engagement potential',
            suggestedFormat: 'post'
        });
        return suggestions;
    };
    const optimizeVoice = (content, targetTone) => {
        // Mock AI voice optimization
        const optimizations = {
            professional: 'Consider using more formal language and industry-specific terminology.',
            casual: 'Add conversational elements and relatable examples.',
            authoritative: 'Include data points and expert references to strengthen credibility.',
            friendly: 'Use warmer language and personal anecdotes.',
            inspirational: 'Add motivational language and call-to-action elements.'
        };
        return {
            suggestion: optimizations[targetTone] || 'Maintain consistency with your established voice.',
            optimizedContent: `${content}\n\n[AI Optimized for ${targetTone} tone]`
        };
    };
    return {
        getAIContext,
        generateContentInsights,
        suggestContentTopics,
        optimizeVoice
    };
}
