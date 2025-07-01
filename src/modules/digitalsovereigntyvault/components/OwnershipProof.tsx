import { motion } from 'framer-motion'
import { FileCheck, Plus, Calendar, Tag, Search } from 'lucide-react'
import { useDigitalSovereigntyStore } from '../store/digitalSovereigntyStore'

export function OwnershipProof() {
  const { ownershipRecords, digitalAssets } = useDigitalSovereigntyStore()

  const getAssetName = (assetId: string) => {
    const asset = digitalAssets.find(a => a.id === assetId)
    return asset ? asset.name : 'Unknown Asset'
  }

  const getDocumentTypeColor = (type: string) => {
    const colors = {
      'receipt': 'text-emerald-400',
      'certificate': 'text-blue-400',
      'contract': 'text-purple-400',
      'license': 'text-amber-400',
      'other': 'text-slate-400'
    }
    return colors[type as keyof typeof colors] || 'text-slate-400'
  }

  const getDocumentTypeIcon = (type: string) => {
    const icons = {
      'receipt': '🧾',
      'certificate': '📜',
      'contract': '📝',
      'license': '🪪',
      'other': '📄'
    }
    return icons[type as keyof typeof icons] || '📄'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass-card rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <FileCheck className="w-5 h-5 text-emerald-400" />
          <h3 className="text-xl font-semibold text-white">Ownership Proof</h3>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search records..."
              className="w-48 pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <button className="flex items-center space-x-2 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors">
            <Plus className="w-4 h-4 text-white" />
            <span className="text-white text-sm">Add Record</span>
          </button>
        </div>
      </div>

      {/* Records Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <p className="text-lg font-bold text-white">{ownershipRecords.length}</p>
          <p className="text-xs text-slate-400">Total Records</p>
        </div>
        
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <p className="text-lg font-bold text-white">
            {ownershipRecords.filter(r => r.documentType === 'certificate').length}
          </p>
          <p className="text-xs text-slate-400">Certificates</p>
        </div>
        
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <p className="text-lg font-bold text-white">
            {ownershipRecords.filter(r => r.documentType === 'receipt').length}
          </p>
          <p className="text-xs text-slate-400">Receipts</p>
        </div>
      </div>

      {/* Ownership Records */}
      <div className="space-y-4">
        {ownershipRecords.map((record, index) => (
          <motion.div
            key={record.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
            className="p-4 bg-slate-800/30 rounded-lg"
          >
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-slate-700/50 rounded-lg">
                <span className="text-xl">{getDocumentTypeIcon(record.documentType)}</span>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <h4 className="text-sm font-medium text-white">
                      {getAssetName(record.assetId)}
                    </h4>
                    <span className={`text-xs capitalize ${getDocumentTypeColor(record.documentType)}`}>
                      {record.documentType}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-slate-400">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(record.issueDate).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <p className="text-xs text-slate-400">Issuer:</p>
                    <p className="text-sm text-slate-300">{record.issuer}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Reference:</p>
                    <p className="text-sm text-slate-300">{record.documentReference}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Verification Method:</p>
                    <p className="text-sm text-slate-300">{record.verificationMethod}</p>
                  </div>
                </div>
                
                {record.notes && (
                  <p className="text-xs text-slate-400 mb-3 italic">"{record.notes}"</p>
                )}
                
                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {record.tags.map(tag => (
                    <span key={tag} className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded flex items-center space-x-1">
                      <Tag className="w-2 h-2" />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 p-3 bg-emerald-600/20 rounded-lg">
        <p className="text-sm text-emerald-300">
          📄 Maintaining proper ownership records is essential for asset verification and inheritance.
        </p>
      </div>
    </motion.div>
  )
}