import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Dashboard } from '../modules/dashboard/pages/Dashboard';
const queryClient = new QueryClient({
    defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
    },
});
const renderWithProviders = (component) => {
    return render(_jsx(QueryClientProvider, { client: queryClient, children: _jsx(BrowserRouter, { children: component }) }));
};
describe('Dashboard', () => {
    it('renders welcome message', () => {
        renderWithProviders(_jsx(Dashboard, {}));
        expect(screen.getByText(/Welcome back, Alex/i)).toBeInTheDocument();
    });
    it('displays life overview section', () => {
        renderWithProviders(_jsx(Dashboard, {}));
        expect(screen.getByText('Life Overview')).toBeInTheDocument();
    });
    it('shows quick actions', () => {
        renderWithProviders(_jsx(Dashboard, {}));
        expect(screen.getByText('Quick Actions')).toBeInTheDocument();
    });
    it('displays recent activity', () => {
        renderWithProviders(_jsx(Dashboard, {}));
        expect(screen.getByText('Recent Activity')).toBeInTheDocument();
    });
});
