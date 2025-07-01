import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit, Trash2, Search, Filter, ArrowUpDown } from 'lucide-react'
import { CrudModal } from './CrudModal'

interface CrudListProps {
  title: string
  items: any[]
  fields: {
    name: string
    label: string
    type: 'text' | 'textarea' | 'number' | 'date' | 'select' | 'checkbox' | 'tags'
    options?: { value: string, label: string }[]
    required?: boolean
    isListColumn?: boolean
  }[]
  onAdd: (item: any) => void
  onUpdate: (id: string, item: any) => void
  onDelete: (id: string) => void
  renderItemContent?: (item: any) => React.ReactNode
  emptyStateMessage?: string
  icon?: React.ReactNode
  color?: string
}

export function CrudList({
  title,
  items,
  fields,
  onAdd,
  onUpdate,
  onDelete,
  renderItemContent,
  emptyStateMessage = 'No items found',
  icon,
  color = 'blue'
}: CrudListProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentItem, setCurrentItem] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  const handleAdd = () => {
    setCurrentItem(null)
    setIsModalOpen(true)
  }

  const handleEdit = (item: any) => {
    setCurrentItem(item)
    setIsModalOpen(true)
  }

  const handleSave = (item: any) => {
    if (item.id) {
      onUpdate(item.id, item)
    } else {
      onAdd(item)
    }
  }

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const filteredItems = items.filter(item => {
    if (!searchQuery) return true
    
    // Search across all fields
    return fields.some(field => {
      const value = item[field.name]
      if (!value) return false
      
      if (Array.isArray(value)) {
        return value.some(v => 
          v.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      }
      
      return value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    })
  })

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (!sortField) return 0
    
    const aValue = a[sortField]
    const bValue = b[sortField]
    
    if (aValue === bValue) return 0
    
    const comparison = aValue > bValue ? 1 : -1
    return sortDirection === 'asc' ? comparison : -comparison
  })

  const listColumns = fields.filter(field => field.isListColumn)

  return (
    <div className="glass-card rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          {icon}
          <h3 className="text-xl font-semibold text-white">{title}</h3>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${title.toLowerCase()}...`}
              className="w-48 pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button 
            onClick={handleAdd}
            className={`flex items-center space-x-2 px-3 py-1.5 bg-${color}-600 hover:bg-${color}-700 rounded-lg transition-colors`}
          >
            <Plus className="w-4 h-4 text-white" />
            <span className="text-white text-sm">Add {title}</span>
          </button>
        </div>
      </div>

      {/* List Header */}
      {listColumns.length > 0 && (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4 p-3 bg-slate-800/50 rounded-lg mb-2">
          {listColumns.map((field) => (
            <button
              key={field.name}
              className="flex items-center space-x-1 text-sm font-medium text-slate-300 hover:text-white transition-colors"
              onClick={() => handleSort(field.name)}
            >
              <span>{field.label}</span>
              {sortField === field.name && (
                <ArrowUpDown className={`w-3 h-3 ${sortDirection === 'asc' ? 'rotate-0' : 'rotate-180'}`} />
              )}
            </button>
          ))}
          <div className="text-sm font-medium text-slate-300">Actions</div>
        </div>
      )}

      {/* Items List */}
      <div className="space-y-3">
        {sortedItems.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-slate-400">{emptyStateMessage}</p>
          </div>
        ) : (
          sortedItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-4 bg-slate-800/30 rounded-lg hover:bg-slate-800/50 transition-colors"
            >
              {renderItemContent ? (
                renderItemContent(item)
              ) : (
                <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4 items-center">
                  {listColumns.map((field) => (
                    <div key={field.name}>
                      {field.type === 'tags' && Array.isArray(item[field.name]) ? (
                        <div className="flex flex-wrap gap-1">
                          {item[field.name].slice(0, 2).map((tag: string, i: number) => (
                            <span key={i} className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded">
                              {tag}
                            </span>
                          ))}
                          {item[field.name].length > 2 && (
                            <span className="text-xs text-slate-400">+{item[field.name].length - 2}</span>
                          )}
                        </div>
                      ) : (
                        <span className="text-sm text-slate-300">
                          {item[field.name]?.toString() || '-'}
                        </span>
                      )}
                    </div>
                  ))}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                    >
                      <Edit className="w-4 h-4 text-slate-400 hover:text-white" />
                    </button>
                    <button
                      onClick={() => {
                        setCurrentItem(item)
                        setIsModalOpen(true)
                      }}
                      className="p-2 hover:bg-red-600/20 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-slate-400 hover:text-red-400" />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          ))
        )}
      </div>

      {/* CRUD Modal */}
      <CrudModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={title}
        item={currentItem}
        onSave={handleSave}
        onDelete={onDelete}
        fields={fields}
      />
    </div>
  )
}