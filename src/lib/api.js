// Mock API service for AI Assistant
// In production, this would connect to your n8n webhook endpoint
export class AIService {
    static WEBHOOK_URL = process.env.VITE_N8N_WEBHOOK_URL || '/api/agent/ask';
    static async sendMessage(request) {
        try {
            // In production, this would be a real API call to your n8n webhook
            const response = await fetch(this.WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        }
        catch (error) {
            console.error('AI Service Error:', error);
            // Fallback to mock response for development
            return this.getMockResponse(request);
        }
    }
    static getMockResponse(request) {
        const responses = [
            {
                response: "Based on your recent activity patterns, I notice you're most productive in the morning hours. Consider scheduling your most important tasks between 9-11 AM for optimal performance.",
                suggestions: [
                    "Block 9-11 AM for deep work sessions",
                    "Schedule meetings after 2 PM",
                    "Use morning energy for creative tasks"
                ],
                actionItems: [
                    "Update your time blocking schedule",
                    "Set morning routine reminders"
                ]
            },
            {
                response: "Your health metrics show great progress! You've maintained a consistent exercise routine for 3 weeks. To optimize further, try adding 10 minutes of stretching after workouts.",
                suggestions: [
                    "Add post-workout stretching routine",
                    "Track flexibility improvements",
                    "Consider yoga or mobility work"
                ],
                actionItems: [
                    "Schedule stretching sessions",
                    "Research flexibility exercises"
                ]
            },
            {
                response: "I see you've been working on financial goals. Your spending patterns suggest you could save an additional $200/month by optimizing subscription services and meal planning.",
                suggestions: [
                    "Audit monthly subscriptions",
                    "Plan weekly meals in advance",
                    "Use budgeting apps for tracking"
                ],
                actionItems: [
                    "Review all active subscriptions",
                    "Create meal planning template"
                ]
            }
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }
}
// Export for use in components
export const aiService = AIService;
