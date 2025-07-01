import { motion } from 'framer-motion'
import { Users, Plus, Phone, Mail, Calendar, Heart } from 'lucide-react'
import { useFamilyMatrixStore } from '../store/familyMatrixStore'

export function FamilyTreeView() {
  const { familyMembers, getUpcomingBirthdays } = useFamilyMatrixStore()

  const upcomingBirthdays = getUpcomingBirthdays(30)

  const getRelationshipColor = (relationship: string) => {
    const colors = {
      'Wife': 'text-pink-400',
      'Husband': 'text-blue-400',
      'Son': 'text-emerald-400',
      'Daughter': 'text-purple-400',
      'Father': 'text-amber-400',
      'Mother': 'text-red-400',
      'Brother': 'text-indigo-400',
      'Sister': 'text-violet-400'
    }
    return colors[relationship as keyof typeof colors] || 'text-slate-400'
  }

  const getDaysSinceContact = (lastContact: string) => {
    const lastDate = new Date(lastContact)
    const today = new Date()
    const diffTime = Math.abs(today.getTime() - lastDate.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Users className="w-5 h-5 text-blue-400" />
          <h3 className="text-xl font-semibold text-white">Family Tree</h3>
        </div>
        <button className="flex items-center space-x-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
          <Plus className="w-4 h-4 text-white" />
          <span className="text-white text-sm">Add Member</span>
        </button>
      </div>

      {/* Family Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <p className="text-lg font-bold text-white">{familyMembers.length}</p>
          <p className="text-xs text-slate-400">Family Members</p>
        </div>
        
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <p className="text-lg font-bold text-white">{upcomingBirthdays.length}</p>
          <p className="text-xs text-slate-400">Upcoming Birthdays</p>
        </div>
      </div>

      {/* Family Members */}
      <div className="space-y-4">
        {familyMembers.map((member, index) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
            className="p-4 bg-slate-800/30 rounded-lg hover:bg-slate-800/50 transition-colors cursor-pointer"
          >
            <div className="flex items-center space-x-4">
              {member.avatar ? (
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {member.name.charAt(0)}
                  </span>
                </div>
              )}
              
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="text-sm font-medium text-white">{member.name}</h4>
                  <span className={`text-xs ${getRelationshipColor(member.relationship)}`}>
                    {member.relationship}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-400">
                  {member.birthdate && (
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(member.birthdate).toLocaleDateString()}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-1">
                    <Heart className="w-3 h-3 text-red-400" />
                    <span>Last contact: {getDaysSinceContact(member.lastContact)} days ago</span>
                  </div>
                  
                  {member.contact.phone && (
                    <div className="flex items-center space-x-1">
                      <Phone className="w-3 h-3 text-emerald-400" />
                      <span>{member.contact.phone}</span>
                    </div>
                  )}
                  
                  {member.contact.email && (
                    <div className="flex items-center space-x-1">
                      <Mail className="w-3 h-3 text-blue-400" />
                      <span>{member.contact.email}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {member.notes && (
              <p className="text-xs text-slate-400 mt-2 italic">"{member.notes}"</p>
            )}
            
            {/* Important Dates */}
            {member.importantDates.length > 0 && (
              <div className="mt-2 pt-2 border-t border-slate-700">
                <div className="flex flex-wrap gap-2">
                  {member.importantDates.map(date => (
                    <div key={date.id} className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded flex items-center space-x-1">
                      <Calendar className="w-2 h-2" />
                      <span>{date.title}: {new Date(date.date).toLocaleDateString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="mt-6 p-3 bg-blue-600/20 rounded-lg">
        <p className="text-sm text-blue-300">
          👨‍👩‍👧‍👦 Upcoming: Michael's birthday on {new Date('2024-03-10').toLocaleDateString()}. Start planning celebration!
        </p>
      </div>
    </motion.div>
  )
}