import { create } from 'zustand';
import { persist } from 'zustand/middleware';
const mockFiles = [
    {
        id: '1',
        name: 'Documents',
        type: 'folder',
        size: 0,
        path: '/Documents',
        isStarred: false,
        isShared: false,
        tags: [],
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-02-01T10:00:00Z',
        lastAccessed: '2024-02-10T10:00:00Z',
        owner: 'user@example.com',
        permissions: {
            read: true,
            write: true,
            delete: true,
            share: true
        }
    },
    {
        id: '2',
        name: 'Project Proposal.pdf',
        type: 'file',
        size: 2048576,
        mimeType: 'application/pdf',
        extension: 'pdf',
        parentId: '1',
        path: '/Documents/Project Proposal.pdf',
        isStarred: true,
        isShared: true,
        tags: ['work', 'important'],
        createdAt: '2024-02-01T10:00:00Z',
        updatedAt: '2024-02-01T10:00:00Z',
        lastAccessed: '2024-02-10T10:00:00Z',
        owner: 'user@example.com',
        permissions: {
            read: true,
            write: true,
            delete: true,
            share: true
        },
        downloadUrl: '#'
    },
    {
        id: '3',
        name: 'Images',
        type: 'folder',
        size: 0,
        path: '/Images',
        isStarred: false,
        isShared: false,
        tags: [],
        createdAt: '2024-01-10T10:00:00Z',
        updatedAt: '2024-02-05T10:00:00Z',
        lastAccessed: '2024-02-08T10:00:00Z',
        owner: 'user@example.com',
        permissions: {
            read: true,
            write: true,
            delete: true,
            share: true
        }
    },
    {
        id: '4',
        name: 'vacation-photo.jpg',
        type: 'file',
        size: 1536000,
        mimeType: 'image/jpeg',
        extension: 'jpg',
        parentId: '3',
        path: '/Images/vacation-photo.jpg',
        isStarred: false,
        isShared: false,
        tags: ['personal', 'vacation'],
        createdAt: '2024-01-20T10:00:00Z',
        updatedAt: '2024-01-20T10:00:00Z',
        lastAccessed: '2024-02-05T10:00:00Z',
        owner: 'user@example.com',
        permissions: {
            read: true,
            write: true,
            delete: true,
            share: true
        },
        thumbnail: 'https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    },
    {
        id: '5',
        name: 'presentation.pptx',
        type: 'file',
        size: 5242880,
        mimeType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        extension: 'pptx',
        path: '/presentation.pptx',
        isStarred: true,
        isShared: false,
        tags: ['work', 'presentation'],
        createdAt: '2024-02-05T10:00:00Z',
        updatedAt: '2024-02-08T10:00:00Z',
        lastAccessed: '2024-02-10T10:00:00Z',
        owner: 'user@example.com',
        permissions: {
            read: true,
            write: true,
            delete: true,
            share: true
        }
    }
];
export const useFilesStore = create()(persist((set, get) => ({
    files: mockFiles,
    currentPath: '/',
    selectedFiles: [],
    uploads: {},
    view: {
        type: 'list',
        sortBy: 'name',
        sortOrder: 'asc',
        showHidden: false
    },
    searchQuery: '',
    navigateToPath: (path) => {
        set({ currentPath: path, selectedFiles: [] });
    },
    navigateUp: () => {
        const currentPath = get().currentPath;
        if (currentPath === '/')
            return;
        const pathParts = currentPath.split('/').filter(Boolean);
        pathParts.pop();
        const newPath = pathParts.length > 0 ? '/' + pathParts.join('/') : '/';
        set({ currentPath: newPath, selectedFiles: [] });
    },
    createFolder: (name, parentPath) => {
        const path = parentPath || get().currentPath;
        const fullPath = path === '/' ? `/${name}` : `${path}/${name}`;
        const newFolder = {
            id: Math.random().toString(36).substr(2, 9),
            name,
            type: 'folder',
            size: 0,
            path: fullPath,
            isStarred: false,
            isShared: false,
            tags: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            lastAccessed: new Date().toISOString(),
            owner: 'user@example.com',
            permissions: {
                read: true,
                write: true,
                delete: true,
                share: true
            }
        };
        set((state) => ({
            files: [...state.files, newFolder]
        }));
    },
    uploadFile: (file, parentPath) => {
        const path = parentPath || get().currentPath;
        const fullPath = path === '/' ? `/${file.name}` : `${path}/${file.name}`;
        const uploadId = Math.random().toString(36).substr(2, 9);
        // Add to uploads with progress tracking
        set((state) => ({
            uploads: {
                ...state.uploads,
                [uploadId]: {
                    file,
                    progress: 0,
                    status: 'uploading'
                }
            }
        }));
        // Simulate upload progress
        const interval = setInterval(() => {
            const currentUpload = get().uploads[uploadId];
            if (!currentUpload) {
                clearInterval(interval);
                return;
            }
            const newProgress = Math.min(currentUpload.progress + 10, 100);
            set((state) => ({
                uploads: {
                    ...state.uploads,
                    [uploadId]: {
                        ...currentUpload,
                        progress: newProgress,
                        status: newProgress === 100 ? 'completed' : 'uploading'
                    }
                }
            }));
            if (newProgress === 100) {
                clearInterval(interval);
                // Add file to files list
                const newFile = {
                    id: Math.random().toString(36).substr(2, 9),
                    name: file.name,
                    type: 'file',
                    size: file.size,
                    mimeType: file.type,
                    extension: file.name.split('.').pop(),
                    path: fullPath,
                    isStarred: false,
                    isShared: false,
                    tags: [],
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    lastAccessed: new Date().toISOString(),
                    owner: 'user@example.com',
                    permissions: {
                        read: true,
                        write: true,
                        delete: true,
                        share: true
                    }
                };
                set((state) => ({
                    files: [...state.files, newFile]
                }));
                // Remove from uploads after a delay
                setTimeout(() => {
                    set((state) => {
                        const { [uploadId]: removed, ...remainingUploads } = state.uploads;
                        return { uploads: remainingUploads };
                    });
                }, 2000);
            }
        }, 200);
    },
    renameFile: (id, newName) => {
        set((state) => ({
            files: state.files.map(file => {
                if (file.id === id) {
                    const pathParts = file.path.split('/');
                    pathParts[pathParts.length - 1] = newName;
                    return {
                        ...file,
                        name: newName,
                        path: pathParts.join('/'),
                        updatedAt: new Date().toISOString()
                    };
                }
                return file;
            })
        }));
    },
    moveFile: (id, newPath) => {
        set((state) => ({
            files: state.files.map(file => file.id === id
                ? { ...file, path: newPath, updatedAt: new Date().toISOString() }
                : file)
        }));
    },
    deleteFile: (id) => {
        set((state) => ({
            files: state.files.filter(file => file.id !== id),
            selectedFiles: state.selectedFiles.filter(fileId => fileId !== id)
        }));
    },
    toggleStar: (id) => {
        set((state) => ({
            files: state.files.map(file => file.id === id
                ? { ...file, isStarred: !file.isStarred, updatedAt: new Date().toISOString() }
                : file)
        }));
    },
    shareFile: (id, permissions) => {
        set((state) => ({
            files: state.files.map(file => file.id === id
                ? {
                    ...file,
                    isShared: true,
                    permissions: { ...file.permissions, ...permissions },
                    updatedAt: new Date().toISOString()
                }
                : file)
        }));
    },
    selectFile: (id) => {
        set((state) => ({
            selectedFiles: state.selectedFiles.includes(id)
                ? state.selectedFiles.filter(fileId => fileId !== id)
                : [...state.selectedFiles, id]
        }));
    },
    selectMultiple: (ids) => {
        set({ selectedFiles: ids });
    },
    clearSelection: () => {
        set({ selectedFiles: [] });
    },
    setView: (view) => {
        set((state) => ({
            view: { ...state.view, ...view }
        }));
    },
    setSearchQuery: (query) => {
        set({ searchQuery: query });
    },
    getFilesInPath: (path) => {
        const files = get().files;
        if (path === '/') {
            return files.filter(file => !file.parentId);
        }
        return files.filter(file => file.path.startsWith(path) && file.path !== path);
    },
    getFileById: (id) => {
        return get().files.find(file => file.id === id);
    },
    getFilesByType: (mimeType) => {
        return get().files.filter(file => file.mimeType?.startsWith(mimeType));
    },
    getStarredFiles: () => {
        return get().files.filter(file => file.isStarred);
    },
    getSharedFiles: () => {
        return get().files.filter(file => file.isShared);
    }
}), {
    name: 'files-storage',
    partialize: (state) => ({
        files: state.files,
        view: state.view
    })
}));
