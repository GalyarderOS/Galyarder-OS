export interface FileItem {
  id: string
  name: string
  type: 'file' | 'folder'
  size: number
  mimeType?: string
  extension?: string
  parentId?: string
  path: string
  isStarred: boolean
  isShared: boolean
  tags: string[]
  createdAt: string
  updatedAt: string
  lastAccessed: string
  owner: string
  permissions: {
    read: boolean
    write: boolean
    delete: boolean
    share: boolean
  }
  thumbnail?: string
  downloadUrl?: string
}

export interface FileUpload {
  file: File
  progress: number
  status: 'pending' | 'uploading' | 'completed' | 'error'
  error?: string
}

export interface FilesView {
  type: 'list' | 'grid'
  sortBy: 'name' | 'size' | 'date' | 'type'
  sortOrder: 'asc' | 'desc'
  showHidden: boolean
}

export interface FilesState {
  files: FileItem[]
  currentPath: string
  selectedFiles: string[]
  uploads: Record<string, FileUpload>
  view: FilesView
  searchQuery: string
  
  // Navigation actions
  navigateToPath: (path: string) => void
  navigateUp: () => void
  
  // File actions
  createFolder: (name: string, parentPath?: string) => void
  uploadFile: (file: File, parentPath?: string) => void
  renameFile: (id: string, newName: string) => void
  moveFile: (id: string, newPath: string) => void
  deleteFile: (id: string) => void
  toggleStar: (id: string) => void
  shareFile: (id: string, permissions: Partial<FileItem['permissions']>) => void
  
  // Selection actions
  selectFile: (id: string) => void
  selectMultiple: (ids: string[]) => void
  clearSelection: () => void
  
  // View actions
  setView: (view: Partial<FilesView>) => void
  setSearchQuery: (query: string) => void
  
  // Utility actions
  getFilesInPath: (path: string) => FileItem[]
  getFileById: (id: string) => FileItem | undefined
  getFilesByType: (mimeType: string) => FileItem[]
  getStarredFiles: () => FileItem[]
  getSharedFiles: () => FileItem[]
}