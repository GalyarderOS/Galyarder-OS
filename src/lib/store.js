import { create } from 'zustand';
import { persist } from 'zustand/middleware';
// Function to extract Gmail username and generate default avatar
const getGmailDefaults = (email) => {
    if (email.includes('@gmail.com')) {
        const username = email.split('@')[0];
        return {
            name: username,
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=4285f4&color=fff&size=150`
        };
    }
    return {
        name: email.split('@')[0],
        avatar: undefined
    };
};
export const useAppStore = create()(persist((set, get) => ({
    user: null, // Start with no user for landing page flow
    sidebarOpen: true,
    theme: 'dark',
    hasCompletedWelcome: false, // Start with false for new users
    notifications: [],
    setUser: (user) => {
        // If setting a new user with Gmail, apply defaults
        if (user && user.email.includes('@gmail.com') && (!user.name || user.name === user.email.split('@')[0])) {
            const gmailDefaults = getGmailDefaults(user.email);
            user = {
                ...user,
                name: user.name || gmailDefaults.name,
                avatar: user.avatar || gmailDefaults.avatar
            };
        }
        set({ user });
    },
    setSidebarOpen: (open) => set({ sidebarOpen: open }),
    setTheme: (theme) => set({ theme }),
    setHasCompletedWelcome: (status) => set({ hasCompletedWelcome: status }),
    addNotification: (notification) => {
        const id = Math.random().toString(36).substr(2, 9);
        const newNotification = {
            ...notification,
            id,
            timestamp: new Date(),
        };
        set((state) => ({
            notifications: [newNotification, ...state.notifications].slice(0, 10)
        }));
    },
    removeNotification: (id) => {
        set((state) => ({
            notifications: state.notifications.filter(n => n.id !== id)
        }));
    },
    updateUserProfile: (updates) => {
        const currentUser = get().user;
        if (currentUser) {
            const updatedUser = { ...currentUser, ...updates };
            // If email changed to Gmail, offer to use Gmail defaults
            if (updates.email && updates.email.includes('@gmail.com') && updates.email !== currentUser.email) {
                const gmailDefaults = getGmailDefaults(updates.email);
                // Only apply defaults if name/avatar weren't explicitly changed
                if (!updates.name && !updates.avatar) {
                    updatedUser.name = gmailDefaults.name;
                    updatedUser.avatar = gmailDefaults.avatar;
                }
            }
            set({ user: updatedUser });
        }
    },
}), {
    name: 'galyarderos-storage',
    partialize: (state) => ({
        user: state.user,
        theme: state.theme,
        sidebarOpen: state.sidebarOpen,
        hasCompletedWelcome: state.hasCompletedWelcome,
    }),
}));
