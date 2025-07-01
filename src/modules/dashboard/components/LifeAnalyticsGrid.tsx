import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Clock, 
  DollarSign, 
  Heart, 
  Brain, 
  Bot, 
  Target, 
  TrendingUp, 
  TrendingDown,
  Activity, 
  Zap, 
  Calendar, 
  BookOpen, 
  Users,
  Briefcase,
  Shield,
  MessageSquare,
  Globe,
  Database,
  Moon,
  PieChart,
  Grid,
  Cog
} from 'lucide-react'
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart as RechartsPieChart, 
  Pie, 
  Cell, 
  AreaChart, 
  Area,
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip,
  CartesianGrid,
  Legend,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ComposedChart,
  Scatter
} from 'recharts'

// Interface for dashboard statistics
interface DashboardStat {
  id: string
  label: string
  value: string | number
  icon: React.ElementType
  color: string
  trend?: 'up' | 'down' | 'neutral'
  trendValue?: string
  progress?: number
  href?: string
  chartType?: 'line' | 'bar' | 'pie' | 'area' | 'radar' | 'composed' | 'scatter'
  chartData?: Array<any>
  secondaryValue?: string
  secondaryLabel?: string
  module: string
  priority: number
}

export function LifeAnalyticsGrid() {
  // Comprehensive statistics data with advanced chart data from all modules
  const stats: DashboardStat[] = [
    // Time Management (Chrono Copilot)
    {
      id: 'deep-work',
      label: 'Deep Work',
      value: '18.5 hrs',
      secondaryValue: '85%',
      secondaryLabel: 'of target',
      icon: Clock,
      color: 'from-blue-500 to-blue-600',
      trend: 'up',
      trendValue: '+12%',
      progress: 85,
      href: '/app/chrono-copilot',
      chartType: 'area',
      module: 'Chrono Copilot',
      priority: 10,
      chartData: [
        { day: 'Mon', hours: 3.5, target: 4 },
        { day: 'Tue', hours: 4.2, target: 4 },
        { day: 'Wed', hours: 2.8, target: 4 },
        { day: 'Thu', hours: 3.9, target: 4 },
        { day: 'Fri', hours: 4.1, target: 4 }
      ]
    },
    {
      id: 'rituals-completed',
      label: 'Ritual Adherence',
      value: '12/15',
      secondaryValue: '80%',
      secondaryLabel: 'completion rate',
      icon: Calendar,
      color: 'from-emerald-500 to-emerald-600',
      trend: 'up',
      trendValue: '+5%',
      progress: 80,
      href: '/app/chrono-copilot',
      chartType: 'bar',
      module: 'Chrono Copilot',
      priority: 9,
      chartData: [
        { name: 'Morning', completed: 5, total: 5 },
        { name: 'Afternoon', completed: 3, total: 4 },
        { name: 'Evening', completed: 4, total: 6 }
      ]
    },
    
    // Finance
    {
      id: 'weekly-cashflow',
      label: 'Weekly Cashflow',
      value: '$1,250',
      secondaryValue: '$3,850',
      secondaryLabel: 'monthly projection',
      icon: DollarSign,
      color: 'from-green-500 to-green-600',
      trend: 'up',
      trendValue: '+8%',
      progress: 65,
      href: '/app/finance-hub',
      chartType: 'composed',
      module: 'Finance Hub',
      priority: 10,
      chartData: [
        { day: 'Mon', income: 350, expenses: 120, net: 230 },
        { day: 'Tue', income: 280, expenses: 200, net: 80 },
        { day: 'Wed', income: 450, expenses: 180, net: 270 },
        { day: 'Thu', income: 320, expenses: 250, net: 70 },
        { day: 'Fri', income: 500, expenses: 150, net: 350 }
      ]
    },
    {
      id: 'investments',
      label: 'Investment Portfolio',
      value: '+7.2%',
      secondaryValue: '$42,850',
      secondaryLabel: 'total value',
      icon: TrendingUp,
      color: 'from-indigo-500 to-indigo-600',
      trend: 'up',
      trendValue: 'YTD',
      progress: 72,
      href: '/app/finance-hub',
      chartType: 'pie',
      module: 'Finance Hub',
      priority: 8,
      chartData: [
        { name: 'Stocks', value: 25000 },
        { name: 'Bonds', value: 8000 },
        { name: 'Crypto', value: 5000 },
        { name: 'Cash', value: 4850 }
      ]
    },
    
    // Health
    {
      id: 'health-metrics',
      label: 'Health Score',
      value: '85/100',
      secondaryValue: '↑3',
      secondaryLabel: 'from last week',
      icon: Heart,
      color: 'from-red-500 to-red-600',
      trend: 'up',
      trendValue: '+3.5%',
      progress: 85,
      href: '/app/health-forge',
      chartType: 'radar',
      module: 'Health Forge',
      priority: 10,
      chartData: [
        { metric: 'Nutrition', score: 80, fullMark: 100 },
        { metric: 'Exercise', score: 90, fullMark: 100 },
        { metric: 'Sleep', score: 75, fullMark: 100 },
        { metric: 'Stress', score: 85, fullMark: 100 },
        { metric: 'Hydration', score: 95, fullMark: 100 }
      ]
    },
    {
      id: 'weight-trend',
      label: 'Weight Trend',
      value: '74.5 kg',
      secondaryValue: '-1.2 kg',
      secondaryLabel: 'this month',
      icon: Activity,
      color: 'from-pink-500 to-pink-600',
      trend: 'down',
      trendValue: '-1.6%',
      progress: 90,
      href: '/app/health-forge',
      chartType: 'line',
      module: 'Health Forge',
      priority: 8,
      chartData: [
        { week: 'W1', weight: 75.7 },
        { week: 'W2', weight: 75.3 },
        { week: 'W3', weight: 75.0 },
        { week: 'W4', weight: 74.8 },
        { week: 'W5', weight: 74.5 }
      ]
    },
    
    // Mental Wellness
    {
      id: 'mood-tracking',
      label: 'Mood Tracking',
      value: '8.2/10',
      secondaryValue: '12',
      secondaryLabel: 'entries this week',
      icon: Brain,
      color: 'from-purple-500 to-purple-600',
      trend: 'up',
      trendValue: '+0.8',
      progress: 82,
      href: '/app/mind-guard',
      chartType: 'line',
      module: 'Mind Guard',
      priority: 9,
      chartData: [
        { day: 'Mon', mood: 7.5 },
        { day: 'Tue', mood: 8.0 },
        { day: 'Wed', mood: 7.8 },
        { day: 'Thu', mood: 8.5 },
        { day: 'Fri', mood: 8.2 },
        { day: 'Sat', mood: 8.7 },
        { day: 'Sun', mood: 8.2 }
      ]
    },
    {
      id: 'energy-level',
      label: 'Energy Levels',
      value: '85%',
      secondaryValue: '↑10%',
      secondaryLabel: 'from baseline',
      icon: Zap,
      color: 'from-amber-500 to-amber-600',
      trend: 'up',
      trendValue: '+10%',
      progress: 85,
      href: '/app/mind-guard',
      chartType: 'area',
      module: 'Mind Guard',
      priority: 7,
      chartData: [
        { hour: '6am', energy: 60 },
        { hour: '9am', energy: 85 },
        { hour: '12pm', energy: 75 },
        { hour: '3pm', energy: 65 },
        { hour: '6pm', energy: 80 },
        { hour: '9pm', energy: 55 }
      ]
    },
    
    // AI & Productivity
    {
      id: 'ai-insights',
      label: 'AI Insights Generated',
      value: '28',
      secondaryValue: '12',
      secondaryLabel: 'actionable items',
      icon: Bot,
      color: 'from-blue-500 to-purple-600',
      trend: 'up',
      trendValue: '+8',
      progress: 70,
      href: '/app/ai-assistant',
      chartType: 'pie',
      module: 'AI Assistant',
      priority: 9,
      chartData: [
        { name: 'Productivity', value: 8 },
        { name: 'Health', value: 6 },
        { name: 'Finance', value: 5 },
        { name: 'Relationships', value: 4 },
        { name: 'Career', value: 5 }
      ]
    },
    {
      id: 'goal-progress',
      label: 'Goal Completion',
      value: '68%',
      secondaryValue: '15/22',
      secondaryLabel: 'milestones reached',
      icon: Target,
      color: 'from-emerald-500 to-blue-500',
      trend: 'up',
      trendValue: '+5%',
      progress: 68,
      href: '/app/productivity-matrix',
      chartType: 'bar',
      module: 'Productivity Matrix',
      priority: 10,
      chartData: [
        { category: 'Health', progress: 75, target: 100 },
        { category: 'Career', progress: 60, target: 100 },
        { category: 'Learning', progress: 85, target: 100 },
        { category: 'Finance', progress: 50, target: 100 },
        { category: 'Personal', progress: 70, target: 100 }
      ]
    },
    
    // Knowledge & Learning
    {
      id: 'learning-hours',
      label: 'Learning Investment',
      value: '12.5 hrs',
      secondaryValue: '3',
      secondaryLabel: 'books in progress',
      icon: BookOpen,
      color: 'from-blue-500 to-indigo-600',
      trend: 'up',
      trendValue: '+2.5 hrs',
      progress: 70,
      href: '/app/knowledge-arsenal',
      chartType: 'bar',
      module: 'Knowledge Arsenal',
      priority: 8,
      chartData: [
        { day: 'Mon', hours: 1.5 },
        { day: 'Tue', hours: 2.0 },
        { day: 'Wed', hours: 3.0 },
        { day: 'Thu', hours: 2.5 },
        { day: 'Fri', hours: 1.5 },
        { day: 'Sat', hours: 1.0 },
        { day: 'Sun', hours: 1.0 }
      ]
    },
    {
      id: 'skill-development',
      label: 'Skill Development',
      value: '4',
      secondaryValue: '78%',
      secondaryLabel: 'avg. mastery',
      icon: Target,
      color: 'from-purple-500 to-indigo-600',
      trend: 'up',
      trendValue: '+1',
      progress: 78,
      href: '/app/knowledge-arsenal',
      chartType: 'radar',
      module: 'Knowledge Arsenal',
      priority: 7,
      chartData: [
        { skill: 'TypeScript', score: 85, fullMark: 100 },
        { skill: 'React', score: 90, fullMark: 100 },
        { skill: 'UX Design', score: 70, fullMark: 100 },
        { skill: 'Data Analysis', score: 65, fullMark: 100 }
      ]
    },
    
    // Relationships
    {
      id: 'network-growth',
      label: 'Network Growth',
      value: '+8',
      secondaryValue: '145',
      secondaryLabel: 'total connections',
      icon: Users,
      color: 'from-violet-500 to-purple-600',
      trend: 'up',
      trendValue: 'This Month',
      progress: 75,
      href: '/app/network-nexus',
      chartType: 'line',
      module: 'Network Nexus',
      priority: 7,
      chartData: [
        { month: 'Jan', connections: 125 },
        { month: 'Feb', connections: 130 },
        { month: 'Mar', connections: 132 },
        { month: 'Apr', connections: 137 },
        { month: 'May', connections: 140 },
        { month: 'Jun', connections: 145 }
      ]
    },
    {
      id: 'relationship-quality',
      label: 'Relationship Quality',
      value: '8.4/10',
      secondaryValue: '12',
      secondaryLabel: 'meaningful interactions',
      icon: Heart,
      color: 'from-pink-500 to-red-600',
      trend: 'up',
      trendValue: '+0.3',
      progress: 84,
      href: '/app/relationships-forge',
      chartType: 'pie',
      module: 'Relationships Forge',
      priority: 8,
      chartData: [
        { name: 'Family', value: 9.2 },
        { name: 'Close Friends', value: 8.7 },
        { name: 'Colleagues', value: 7.5 },
        { name: 'Community', value: 8.0 }
      ]
    },
    
    // Career & Professional
    {
      id: 'career-metrics',
      label: 'Career Growth',
      value: '85%',
      secondaryValue: '3',
      secondaryLabel: 'milestones achieved',
      icon: Briefcase,
      color: 'from-blue-600 to-indigo-600',
      trend: 'up',
      trendValue: '+15%',
      progress: 85,
      href: '/app/career-command',
      chartType: 'line',
      module: 'Career Command',
      priority: 8,
      chartData: [
        { quarter: 'Q1', growth: 65 },
        { quarter: 'Q2', growth: 70 },
        { quarter: 'Q3', growth: 75 },
        { quarter: 'Q4', growth: 85 }
      ]
    },
    {
      id: 'income-streams',
      label: 'Income Streams',
      value: '4',
      secondaryValue: '$12,500',
      secondaryLabel: 'monthly total',
      icon: DollarSign,
      color: 'from-green-500 to-emerald-600',
      trend: 'up',
      trendValue: '+1',
      progress: 80,
      href: '/app/career-command',
      chartType: 'pie',
      module: 'Career Command',
      priority: 7,
      chartData: [
        { name: 'Primary Job', value: 8500 },
        { name: 'Freelance', value: 2200 },
        { name: 'Investments', value: 1350 },
        { name: 'Side Business', value: 450 }
      ]
    },
    
    // Advanced Modules
    {
      id: 'sleep-quality',
      label: 'Sleep Quality',
      value: '87%',
      secondaryValue: '7.2 hrs',
      secondaryLabel: 'avg. duration',
      icon: Moon,
      color: 'from-blue-500 to-indigo-600',
      trend: 'up',
      trendValue: '+5%',
      progress: 87,
      href: '/app/sleep-architect',
      chartType: 'area',
      module: 'Sleep Architect',
      priority: 9,
      chartData: [
        { day: 'Mon', quality: 82, duration: 7.0 },
        { day: 'Tue', quality: 88, duration: 7.5 },
        { day: 'Wed', quality: 85, duration: 7.2 },
        { day: 'Thu', quality: 90, duration: 7.8 },
        { day: 'Fri', quality: 86, duration: 7.3 },
        { day: 'Sat', quality: 92, duration: 8.0 },
        { day: 'Sun', quality: 87, duration: 7.4 }
      ]
    },
    {
      id: 'digital-security',
      label: 'Security Score',
      value: '92/100',
      secondaryValue: '0',
      secondaryLabel: 'vulnerabilities',
      icon: Shield,
      color: 'from-slate-500 to-blue-600',
      trend: 'up',
      trendValue: '+8',
      progress: 92,
      href: '/app/privacy-vault',
      chartType: 'radar',
      module: 'Privacy Vault',
      priority: 8,
      chartData: [
        { category: 'Passwords', score: 95, fullMark: 100 },
        { category: 'Encryption', score: 90, fullMark: 100 },
        { category: 'Authentication', score: 100, fullMark: 100 },
        { category: 'Updates', score: 85, fullMark: 100 },
        { category: 'Backups', score: 90, fullMark: 100 }
      ]
    },
    {
      id: 'communication-metrics',
      label: 'Communication',
      value: '24',
      secondaryValue: '85%',
      secondaryLabel: 'response rate',
      icon: MessageSquare,
      color: 'from-blue-500 to-cyan-600',
      trend: 'up',
      trendValue: '+5',
      progress: 80,
      href: '/app/communication-console',
      chartType: 'bar',
      module: 'Communication Console',
      priority: 6,
      chartData: [
        { channel: 'Email', sent: 15, received: 22 },
        { channel: 'Messages', sent: 45, received: 38 },
        { channel: 'Calls', sent: 8, received: 10 },
        { channel: 'Meetings', count: 6 }
      ]
    },
    {
      id: 'world-signals',
      label: 'World Signals',
      value: '18',
      secondaryValue: '5',
      secondaryLabel: 'high impact',
      icon: Globe,
      color: 'from-blue-500 to-amber-600',
      trend: 'up',
      trendValue: '+3',
      progress: 75,
      href: '/app/world-intelligence',
      chartType: 'pie',
      module: 'World Intelligence',
      priority: 7,
      chartData: [
        { category: 'Economic', count: 5 },
        { category: 'Geopolitical', count: 4 },
        { category: 'Technological', count: 6 },
        { category: 'Environmental', count: 3 }
      ]
    },
    {
      id: 'system-health',
      label: 'System Health',
      value: '98%',
      secondaryValue: '124',
      secondaryLabel: 'data points tracked',
      icon: Database,
      color: 'from-blue-500 to-purple-600',
      trend: 'up',
      trendValue: '+2%',
      progress: 98,
      href: '/app/meta-memory',
      chartType: 'line',
      module: 'Meta Memory',
      priority: 6,
      chartData: [
        { day: 'Mon', uptime: 99, performance: 97 },
        { day: 'Tue', uptime: 100, performance: 98 },
        { day: 'Wed', uptime: 98, performance: 96 },
        { day: 'Thu', uptime: 100, performance: 99 },
        { day: 'Fri', uptime: 100, performance: 100 },
        { day: 'Sat', uptime: 100, performance: 98 },
        { day: 'Sun', uptime: 100, performance: 98 }
      ]
    },
    {
      id: 'life-balance',
      label: 'Life Balance',
      value: '82%',
      secondaryValue: '7/8',
      secondaryLabel: 'domains in balance',
      icon: PieChart,
      color: 'from-purple-500 to-pink-600',
      trend: 'up',
      trendValue: '+5%',
      progress: 82,
      href: '/app/dashboard',
      chartType: 'radar',
      module: 'Dashboard',
      priority: 10,
      chartData: [
        { domain: 'Health', score: 85, fullMark: 100 },
        { domain: 'Career', score: 80, fullMark: 100 },
        { domain: 'Relationships', score: 75, fullMark: 100 },
        { domain: 'Finance', score: 90, fullMark: 100 },
        { domain: 'Personal Growth', score: 85, fullMark: 100 },
        { domain: 'Recreation', score: 70, fullMark: 100 },
        { domain: 'Spirituality', score: 80, fullMark: 100 },
        { domain: 'Environment', score: 90, fullMark: 100 }
      ]
    },
    {
      id: 'app-drawer',
      label: 'App Drawer',
      value: '27',
      secondaryValue: '12',
      secondaryLabel: 'active modules',
      icon: Grid,
      color: 'from-gray-500 to-gray-600',
      trend: 'up',
      trendValue: '+1',
      progress: 75,
      href: '/app/app-drawer',
      chartType: 'pie',
      module: 'App Drawer',
      priority: 5,
      chartData: [
        { category: 'Core', count: 8 },
        { category: 'Productivity', count: 6 },
        { category: 'Health', count: 4 },
        { category: 'Personal', count: 5 },
        { category: 'System', count: 4 }
      ]
    },
    {
      id: 'system-kernel',
      label: 'System Kernel',
      value: '4',
      secondaryValue: '8',
      secondaryLabel: 'system behaviors',
      icon: Cog,
      color: 'from-indigo-500 to-purple-600',
      trend: 'neutral',
      trendValue: 'Stable',
      progress: 95,
      href: '/app/system-kernel',
      chartType: 'radar',
      module: 'System Kernel',
      priority: 9,
      chartData: [
        { mode: 'Balanced', score: 85, fullMark: 100 },
        { mode: 'Focus', score: 70, fullMark: 100 },
        { mode: 'Wellness', score: 60, fullMark: 100 },
        { mode: 'Security', score: 90, fullMark: 100 }
      ]
    }
  ]

  // Sort stats by priority
  const sortedStats = [...stats].sort((a, b) => b.priority - a.priority);

  // Function to render the appropriate chart based on type
  const renderChart = (stat: DashboardStat) => {
    if (!stat.chartData || !stat.chartType) return null;

    // Extract the main data key for charts
    const getMainDataKey = (data: any[]) => {
      const firstItem = data[0];
      const keys = Object.keys(firstItem);
      return keys.find(key => 
        key !== 'day' && 
        key !== 'week' && 
        key !== 'month' && 
        key !== 'quarter' && 
        key !== 'year' && 
        key !== 'hour' && 
        key !== 'name' && 
        key !== 'category' && 
        key !== 'metric' && 
        key !== 'skill' && 
        key !== 'domain' && 
        key !== 'fullMark' && 
        key !== 'target' &&
        key !== 'mode'
      ) || '';
    };

    // Generate gradient ID based on stat ID to ensure uniqueness
    const gradientId = `gradient-${stat.id}`;
    
    // Extract color code from gradient string
    const getColorFromGradient = (gradient: string) => {
      if (gradient.includes('blue')) return '#3B82F6';
      if (gradient.includes('emerald')) return '#10B981';
      if (gradient.includes('green')) return '#10B981';
      if (gradient.includes('red')) return '#EF4444';
      if (gradient.includes('purple')) return '#8B5CF6';
      if (gradient.includes('pink')) return '#EC4899';
      if (gradient.includes('amber')) return '#F59E0B';
      if (gradient.includes('indigo')) return '#6366F1';
      if (gradient.includes('violet')) return '#8B5CF6';
      if (gradient.includes('cyan')) return '#06B6D4';
      if (gradient.includes('gray')) return '#6B7280';
      return '#3B82F6'; // Default blue
    };
    
    const mainColor = getColorFromGradient(stat.color);
    const secondaryColor = stat.color.includes('to-') 
      ? getColorFromGradient(stat.color.split('to-')[1]) 
      : mainColor;
    
    const pieColors = [
      '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', 
      '#EC4899', '#EF4444', '#06B6D4', '#6366F1'
    ];

    switch (stat.chartType) {
      case 'line':
        return (
          <div className="h-20 mt-2 -mx-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stat.chartData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                <defs>
                  <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor={mainColor} />
                    <stop offset="100%" stopColor={secondaryColor} />
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey={Object.keys(stat.chartData[0])[0]} 
                  tick={{ fill: '#94A3B8', fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1E293B', 
                    borderColor: '#334155',
                    borderRadius: '0.375rem',
                    fontSize: '0.75rem'
                  }}
                  itemStyle={{ color: '#F1F5F9' }}
                  labelStyle={{ color: '#94A3B8' }}
                />
                <Line 
                  type="monotone" 
                  dataKey={getMainDataKey(stat.chartData)} 
                  stroke={`url(#${gradientId})`}
                  strokeWidth={2}
                  dot={{ fill: mainColor, r: 3 }}
                  activeDot={{ r: 5, fill: secondaryColor }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        );
      
      case 'bar':
        return (
          <div className="h-20 mt-2 -mx-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stat.chartData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                <defs>
                  <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={mainColor} stopOpacity={0.8}/>
                    <stop offset="100%" stopColor={mainColor} stopOpacity={0.3}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey={Object.keys(stat.chartData[0])[0]}
                  tick={{ fill: '#94A3B8', fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1E293B', 
                    borderColor: '#334155',
                    borderRadius: '0.375rem',
                    fontSize: '0.75rem'
                  }}
                  itemStyle={{ color: '#F1F5F9' }}
                  labelStyle={{ color: '#94A3B8' }}
                />
                <Bar 
                  dataKey={getMainDataKey(stat.chartData)} 
                  fill={`url(#${gradientId})`}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        );
      
      case 'pie':
        return (
          <div className="h-20 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                <Pie
                  data={stat.chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={15}
                  outerRadius={35}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {stat.chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1E293B', 
                    borderColor: '#334155',
                    borderRadius: '0.375rem',
                    fontSize: '0.75rem'
                  }}
                  itemStyle={{ color: '#F1F5F9' }}
                  labelStyle={{ color: '#94A3B8' }}
                />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        );
      
      case 'area':
        return (
          <div className="h-20 mt-2 -mx-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stat.chartData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                <defs>
                  <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={mainColor} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={mainColor} stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey={Object.keys(stat.chartData[0])[0]}
                  tick={{ fill: '#94A3B8', fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1E293B', 
                    borderColor: '#334155',
                    borderRadius: '0.375rem',
                    fontSize: '0.75rem'
                  }}
                  itemStyle={{ color: '#F1F5F9' }}
                  labelStyle={{ color: '#94A3B8' }}
                />
                <Area 
                  type="monotone" 
                  dataKey={getMainDataKey(stat.chartData)} 
                  stroke={mainColor}
                  fillOpacity={1}
                  fill={`url(#${gradientId})`}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        );
        
      case 'radar':
        return (
          <div className="h-20 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius={35} data={stat.chartData}>
                <PolarGrid stroke="#475569" />
                <PolarAngleAxis 
                  dataKey={Object.keys(stat.chartData[0])[0]} 
                  tick={false}
                />
                <Radar 
                  name={stat.label}
                  dataKey="score"
                  stroke={mainColor}
                  fill={mainColor}
                  fillOpacity={0.5}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1E293B', 
                    borderColor: '#334155',
                    borderRadius: '0.375rem',
                    fontSize: '0.75rem'
                  }}
                  itemStyle={{ color: '#F1F5F9' }}
                  labelStyle={{ color: '#94A3B8' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        );
        
      case 'composed':
        return (
          <div className="h-20 mt-2 -mx-2">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={stat.chartData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                <defs>
                  <linearGradient id={`${gradientId}-bar`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={mainColor} stopOpacity={0.8}/>
                    <stop offset="100%" stopColor={mainColor} stopOpacity={0.3}/>
                  </linearGradient>
                  <linearGradient id={`${gradientId}-line`} x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor={secondaryColor} />
                    <stop offset="100%" stopColor={mainColor} />
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey={Object.keys(stat.chartData[0])[0]}
                  tick={{ fill: '#94A3B8', fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1E293B', 
                    borderColor: '#334155',
                    borderRadius: '0.375rem',
                    fontSize: '0.75rem'
                  }}
                  itemStyle={{ color: '#F1F5F9' }}
                  labelStyle={{ color: '#94A3B8' }}
                />
                <Bar 
                  dataKey="income" 
                  fill={`url(#${gradientId}-bar)`}
                  radius={[4, 4, 0, 0]}
                  barSize={6}
                />
                <Bar 
                  dataKey="expenses" 
                  fill="#EF4444"
                  fillOpacity={0.6}
                  radius={[4, 4, 0, 0]}
                  barSize={6}
                />
                <Line 
                  type="monotone" 
                  dataKey="net" 
                  stroke={`url(#${gradientId}-line)`}
                  strokeWidth={2}
                  dot={{ fill: mainColor, r: 3 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        );
        
      case 'scatter':
        return (
          <div className="h-20 mt-2 -mx-2">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={stat.chartData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                <XAxis 
                  dataKey={Object.keys(stat.chartData[0])[0]}
                  tick={{ fill: '#94A3B8', fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1E293B', 
                    borderColor: '#334155',
                    borderRadius: '0.375rem',
                    fontSize: '0.75rem'
                  }}
                  itemStyle={{ color: '#F1F5F9' }}
                  labelStyle={{ color: '#94A3B8' }}
                />
                <Scatter 
                  dataKey={getMainDataKey(stat.chartData)} 
                  fill={mainColor}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mt-12"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-white">Life Command Center</h2>
        <div className="text-sm text-slate-400">
          <span className="text-emerald-400 font-medium">85%</span> system health • Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {sortedStats.map((stat, index) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.05 }}
          >
            <Link
              to={stat.href || '#'}
              className="block h-full p-4 bg-slate-800/30 hover:bg-slate-800/50 rounded-xl border border-slate-700 hover:border-slate-600 transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.color}`}>
                    <stat.icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xs text-slate-400">{stat.module}</span>
                </div>
                
                {stat.trend && (
                  <div className={`flex items-center space-x-1 text-xs ${
                    stat.trend === 'up' ? 'text-emerald-400' : 
                    stat.trend === 'down' ? (
                      stat.id === 'weight-trend' ? 'text-emerald-400' : 'text-red-400'
                    ) : 'text-slate-400'
                  }`}>
                    {stat.trend === 'up' && <TrendingUp className="w-3 h-3" />}
                    {stat.trend === 'down' && (
                      stat.id === 'weight-trend' ? 
                        <TrendingDown className="w-3 h-3" /> : 
                        <TrendingDown className="w-3 h-3" />
                    )}
                    <span>{stat.trendValue}</span>
                  </div>
                )}
              </div>
              
              <div className="mb-1">
                <div className="flex items-end justify-between">
                  <div className="text-lg font-semibold text-white">{stat.value}</div>
                  {stat.secondaryValue && (
                    <div className="text-xs text-slate-300">{stat.secondaryValue}</div>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-slate-400">{stat.label}</div>
                  {stat.secondaryLabel && (
                    <div className="text-xs text-slate-500">{stat.secondaryLabel}</div>
                  )}
                </div>
              </div>
              
              {/* Render chart if available, otherwise show progress bar */}
              {stat.chartData && stat.chartType ? (
                renderChart(stat)
              ) : stat.progress !== undefined && (
                <div className="mt-3">
                  <div className="w-full bg-slate-700 rounded-full h-1.5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${stat.progress}%` }}
                      transition={{ delay: 0.6 + index * 0.05, duration: 0.8 }}
                      className={`h-1.5 rounded-full bg-gradient-to-r ${stat.color}`}
                    />
                  </div>
                </div>
              )}
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}