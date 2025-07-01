import { create } from 'zustand';
import { persist } from 'zustand/middleware';
const mockModes = [
    {
        id: '1',
        name: 'Deep Focus',
        description: 'Optimal environment for concentrated work',
        settings: {
            lighting: 75,
            temperature: 22,
            humidity: 45,
            noise: 20,
            airQuality: 95
        },
        devices: ['desk-lamp', 'ac-unit', 'noise-machine'],
        isActive: true,
        createdAt: '2024-01-15'
    },
    {
        id: '2',
        name: 'Creative Flow',
        description: 'Inspiring environment for creative work',
        settings: {
            lighting: 60,
            temperature: 24,
            humidity: 50,
            noise: 30,
            airQuality: 90
        },
        devices: ['ambient-lights', 'speaker-system'],
        isActive: false,
        createdAt: '2024-01-20'
    }
];
const mockDevices = [
    {
        id: 'desk-lamp',
        name: 'Desk Lamp',
        type: 'lighting',
        status: 'online',
        location: 'Office',
        settings: { brightness: 75, temperature: 4000 },
        lastUpdated: '2024-02-10T14:30:00Z'
    },
    {
        id: 'ac-unit',
        name: 'AC Unit',
        type: 'climate',
        status: 'online',
        location: 'Office',
        settings: { temperature: 22, mode: 'cool' },
        lastUpdated: '2024-02-10T14:25:00Z'
    },
    {
        id: 'speaker-system',
        name: 'Speaker System',
        type: 'audio',
        status: 'online',
        location: 'Office',
        settings: { volume: 30, source: 'bluetooth' },
        lastUpdated: '2024-02-10T14:20:00Z'
    }
];
const mockAmbientProfiles = [
    {
        id: '1',
        name: 'Forest Ambience',
        soundscape: 'forest-sounds',
        lighting: {
            brightness: 40,
            temperature: 3000,
            color: '#4ade80'
        },
        scent: 'pine',
        duration: 60,
        triggers: ['stress', 'fatigue']
    },
    {
        id: '2',
        name: 'Ocean Waves',
        soundscape: 'ocean-waves',
        lighting: {
            brightness: 30,
            temperature: 5000,
            color: '#06b6d4'
        },
        duration: 45,
        triggers: ['anxiety', 'insomnia']
    }
];
export const useEnvironmentStore = create()(persist((set, get) => ({
    modes: mockModes,
    devices: mockDevices,
    ambientProfiles: mockAmbientProfiles,
    currentMode: '1',
    addMode: (mode) => {
        const newMode = {
            ...mode,
            id: Math.random().toString(36).substr(2, 9),
            createdAt: new Date().toISOString()
        };
        set((state) => ({
            modes: [...state.modes, newMode]
        }));
    },
    updateMode: (id, updates) => {
        set((state) => ({
            modes: state.modes.map(mode => mode.id === id ? { ...mode, ...updates } : mode)
        }));
    },
    deleteMode: (id) => {
        set((state) => ({
            modes: state.modes.filter(mode => mode.id !== id),
            currentMode: state.currentMode === id ? null : state.currentMode
        }));
    },
    activateMode: (id) => {
        set((state) => ({
            modes: state.modes.map(mode => ({
                ...mode,
                isActive: mode.id === id
            })),
            currentMode: id
        }));
    },
    addDevice: (device) => {
        const newDevice = {
            ...device,
            id: Math.random().toString(36).substr(2, 9),
            lastUpdated: new Date().toISOString()
        };
        set((state) => ({
            devices: [...state.devices, newDevice]
        }));
    },
    updateDevice: (id, updates) => {
        set((state) => ({
            devices: state.devices.map(device => device.id === id
                ? { ...device, ...updates, lastUpdated: new Date().toISOString() }
                : device)
        }));
    },
    deleteDevice: (id) => {
        set((state) => ({
            devices: state.devices.filter(device => device.id !== id)
        }));
    },
    addAmbientProfile: (profile) => {
        const newProfile = {
            ...profile,
            id: Math.random().toString(36).substr(2, 9)
        };
        set((state) => ({
            ambientProfiles: [...state.ambientProfiles, newProfile]
        }));
    },
    updateAmbientProfile: (id, updates) => {
        set((state) => ({
            ambientProfiles: state.ambientProfiles.map(profile => profile.id === id ? { ...profile, ...updates } : profile)
        }));
    },
    deleteAmbientProfile: (id) => {
        set((state) => ({
            ambientProfiles: state.ambientProfiles.filter(profile => profile.id !== id)
        }));
    }
}), {
    name: 'environment-architect-storage'
}));
