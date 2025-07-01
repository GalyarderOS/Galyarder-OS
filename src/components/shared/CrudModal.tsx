import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { X, Save, Trash2, AlertTriangle } from 'lucide-react'

interface CrudModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  item: any
  onSave: (item: any) => void
  onDelete?: (id: string) => void
  fields: {
    name: string
    label: string
    type: 'text' | 'textarea' | 'number' | 'date' | 'select' | 'checkbox' | 'tags'
    options?: { value: string, label: string }[]
    required?: boolean
  }[]
}

export function CrudModal({ isOpen, onClose, title, item, onSave, onDelete, fields }: CrudModalProps) {
  const [formData, setFormData] = useState<any>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const isNewItem = !item?.id

  useEffect(() => {
    if (item) {
      setFormData({ ...item })
    } else {
      const initialData: Record<string, any> = {}
      fields.forEach(field => {
        initialData[field.name] = field.type === 'checkbox' ? false : ''
      })
      setFormData(initialData)
    }
  }, [item, fields])

  const handleChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleTagsChange = (name: string, value: string) => {
    const tags = value.split(',').map(tag => tag.trim()).filter(Boolean)
    setFormData(prev => ({ ...prev, [name]: tags }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    fields.forEach(field => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} is required`
      }
    })
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    onSave(formData)
    onClose()
  }

  const handleDelete = () => {
    if (onDelete && item?.id) {
      onDelete(item.id)
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-slate-800 rounded-xl border border-slate-700 shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <h3 className="text-lg font-semibold text-white">
            {isNewItem ? `Add ${title}` : `Edit ${title}`}
          </h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {fields.map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                {field.label} {field.required && <span className="text-red-400">*</span>}
              </label>
              
              {field.type === 'text' && (
                <input
                  type="text"
                  value={formData[field.name] || ''}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
              
              {field.type === 'textarea' && (
                <textarea
                  value={formData[field.name] || ''}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              )}
              
              {field.type === 'number' && (
                <input
                  type="number"
                  value={formData[field.name] || ''}
                  onChange={(e) => handleChange(field.name, parseFloat(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
              
              {field.type === 'date' && (
                <input
                  type="date"
                  value={formData[field.name] || ''}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
              
              {field.type === 'select' && field.options && (
                <select
                  value={formData[field.name] || ''}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select {field.label}</option>
                  {field.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              )}
              
              {field.type === 'checkbox' && (
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData[field.name] || false}
                    onChange={(e) => handleChange(field.name, e.target.checked)}
                    className="w-4 h-4 bg-slate-700 border-slate-600 rounded focus:ring-blue-500 text-blue-600"
                  />
                  <span className="ml-2 text-sm text-slate-300">Enable {field.label}</span>
                </div>
              )}
              
              {field.type === 'tags' && (
                <div>
                  <input
                    type="text"
                    value={Array.isArray(formData[field.name]) ? formData[field.name].join(', ') : ''}
                    onChange={(e) => handleTagsChange(field.name, e.target.value)}
                    placeholder="Enter tags separated by commas"
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="mt-1 text-xs text-slate-400">Separate tags with commas</p>
                </div>
              )}
              
              {errors[field.name] && (
                <p className="mt-1 text-xs text-red-400">{errors[field.name]}</p>
              )}
            </div>
          ))}

          {/* Action Buttons */}
          <div className="flex justify-between pt-4 border-t border-slate-700">
            <div>
              {!isNewItem && onDelete && (
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(true)}
                  className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Save</span>
              </button>
            </div>
          </div>
        </form>

        {/* Delete Confirmation */}
        {showDeleteConfirm && (
          <div className="p-4 border-t border-slate-700">
            <div className="p-4 bg-red-600/10 border border-red-600/30 rounded-lg mb-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-red-400 mb-1">Confirm Deletion</h4>
                  <p className="text-sm text-red-300">
                    Are you sure you want to delete this {title.toLowerCase()}? This action cannot be undone.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}