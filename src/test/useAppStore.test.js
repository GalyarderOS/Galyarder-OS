import { renderHook, act } from '@testing-library/react';
import { useAppStore } from '../lib/store';
describe('useAppStore', () => {
    beforeEach(() => {
        useAppStore.getState().setUser({
            id: '1',
            name: 'Test User',
            email: 'test@example.com'
        });
    });
    it('initializes with default state', () => {
        const { result } = renderHook(() => useAppStore());
        expect(result.current.user).toBeTruthy();
        expect(result.current.sidebarOpen).toBe(true);
        expect(result.current.theme).toBe('dark');
        expect(result.current.notifications).toEqual([]);
    });
    it('can toggle sidebar', () => {
        const { result } = renderHook(() => useAppStore());
        act(() => {
            result.current.setSidebarOpen(false);
        });
        expect(result.current.sidebarOpen).toBe(false);
    });
    it('can add notifications', () => {
        const { result } = renderHook(() => useAppStore());
        act(() => {
            result.current.addNotification({
                title: 'Test Notification',
                message: 'This is a test',
                type: 'info'
            });
        });
        expect(result.current.notifications).toHaveLength(1);
        expect(result.current.notifications[0].title).toBe('Test Notification');
    });
    it('can remove notifications', () => {
        const { result } = renderHook(() => useAppStore());
        act(() => {
            result.current.addNotification({
                title: 'Test Notification',
                message: 'This is a test',
                type: 'info'
            });
        });
        const notificationId = result.current.notifications[0].id;
        act(() => {
            result.current.removeNotification(notificationId);
        });
        expect(result.current.notifications).toHaveLength(0);
    });
    it('can change theme', () => {
        const { result } = renderHook(() => useAppStore());
        act(() => {
            result.current.setTheme('light');
        });
        expect(result.current.theme).toBe('light');
    });
});
