import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AIAssistant } from '../modules/aiassistant/pages/AIAssistant';
const queryClient = new QueryClient({
    defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
    },
});
const renderWithProviders = (component) => {
    return render(_jsx(QueryClientProvider, { client: queryClient, children: _jsx(BrowserRouter, { children: component }) }));
};
describe('AIAssistant', () => {
    it('renders AI assistant interface', () => {
        renderWithProviders(_jsx(AIAssistant, {}));
        expect(screen.getByText('AI Assistant')).toBeInTheDocument();
    });
    it('allows sending messages', async () => {
        renderWithProviders(_jsx(AIAssistant, {}));
        const input = screen.getByPlaceholderText(/Ask about your goals/i);
        const sendButton = screen.getByRole('button', { name: /send/i });
        fireEvent.change(input, { target: { value: 'How can I improve my productivity?' } });
        fireEvent.click(sendButton);
        await waitFor(() => {
            expect(screen.getByText('How can I improve my productivity?')).toBeInTheDocument();
        });
    });
    it('displays AI insights section', () => {
        renderWithProviders(_jsx(AIAssistant, {}));
        expect(screen.getByText('AI Insights')).toBeInTheDocument();
    });
    it('shows suggestions', () => {
        renderWithProviders(_jsx(AIAssistant, {}));
        expect(screen.getByText('Suggestions')).toBeInTheDocument();
    });
});
