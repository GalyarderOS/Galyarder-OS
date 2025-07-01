# GalyarderOS - Development Guide

## 🏗️ Architecture Overview

GalyarderOS is a modular, AI-powered Personal Civilization System built with modern web technologies. The system follows a feature-first architecture where each module represents a distinct domain of personal development.

### Core Technologies
- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: TailwindCSS + CVA (Class Variance Authority)
- **State Management**: Zustand with persistence
- **Routing**: React Router v6
- **Animations**: Framer Motion
- **Data Fetching**: TanStack Query
- **Testing**: Vitest + React Testing Library
- **PWA**: Vite PWA Plugin

## 📁 Project Structure

```
src/
├── components/          # Shared UI components
│   └── layout/         # Layout components (Header, Sidebar, etc.)
├── lib/                # Utilities and configurations
│   ├── store.ts        # Global Zustand store
│   ├── utils.ts        # Utility functions
│   └── api.ts          # AI service and API calls
├── modules/            # Feature modules (domain-driven)
│   ├── dashboard/      # Life overview and metrics
│   ├── aiassistant/    # AI-powered insights and chat
│   ├── chronocopilot/  # Time management and rituals
│   ├── financehub/     # Financial tracking and planning
│   ├── healthforge/    # Health and wellness tracking
│   ├── productivitymatrix/ # Focus and productivity optimization
│   ├── careercommand/  # Career development and skills
│   ├── mindguard/      # Mental wellness and emotions
│   ├── systemlogs/     # Activity tracking and analytics
│   ├── relationshipsforge/ # Social connections management
│   └── legacybuilder/  # Purpose and mission definition
└── test/               # Test files and setup
```

## 🧩 Module Architecture

Each module follows a consistent structure:

```
module-name/
├── pages/              # Route components
├── components/         # Module-specific components
├── hooks/              # Custom hooks for the module
├── types/              # TypeScript type definitions
└── store/              # Module-specific Zustand stores (if needed)
```

### Module Conventions

1. **Single Responsibility**: Each module handles one domain
2. **Self-Contained**: Modules should minimize cross-dependencies
3. **Consistent Naming**: Use kebab-case for files, PascalCase for components
4. **Type Safety**: All components and hooks must be fully typed

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#3B82F6) - Main actions and highlights
- **Secondary**: Emerald (#10B981) - Success states and positive metrics
- **Accent**: Amber (#F59E0B) - Warnings and attention-grabbing elements
- **Background**: Slate 950 (#0F172A) - Main background
- **Surface**: Slate 900 (#0F1629) - Card backgrounds with glass effect

### Typography
- **Headings**: Inter font family, 120% line height
- **Body**: Inter font family, 150% line height
- **Code**: JetBrains Mono, 140% line height

### Spacing System
- Base unit: 8px
- Scale: 4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px, 64px

### Component Variants (CVA)
```typescript
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-blue-600 text-white hover:bg-blue-700",
        secondary: "bg-slate-700 text-white hover:bg-slate-600",
        ghost: "hover:bg-slate-800 text-slate-300"
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4",
        lg: "h-12 px-6 text-lg"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
)
```

## 🤖 AI Integration

### Architecture
The AI system uses a webhook-based architecture:

1. **Frontend** → sends structured requests to `/api/agent/ask`
2. **n8n Workflow** → processes requests and calls AI providers
3. **AI Provider** (OpenRouter/Gemini) → generates responses
4. **Response** → returns structured JSON to frontend

### Request Format
```typescript
interface AIRequest {
  message: string
  context?: {
    module?: string
    userActivity?: any[]
    currentGoals?: any[]
  }
}
```

### Response Format
```typescript
interface AIResponse {
  response: string
  suggestions?: string[]
  actionItems?: string[]
}
```

### Implementation
```typescript
// In components
const { sendMessage, isLoading } = useAIAssistant()

await sendMessage("How can I improve my productivity?")
```

### Security
- API keys stored securely in n8n environment
- No sensitive data exposed to client
- Rate limiting implemented on webhook endpoint

## 📱 PWA Configuration

### Features
- **Offline Support**: Service worker caches essential resources
- **Installable**: Meets PWA criteria for installation prompts
- **Background Sync**: Queues actions when offline
- **Push Notifications**: Ready for future implementation

### Configuration
```typescript
// vite.config.ts
VitePWA({
  registerType: 'autoUpdate',
  workbox: {
    globPatterns: ['**/*.{js,css,html,ico,png,svg}']
  },
  manifest: {
    name: 'GalyarderOS',
    short_name: 'GalyarderOS',
    theme_color: '#1e293b',
    background_color: '#0f172a'
  }
})
```

## 🧪 Testing Strategy

### Unit Tests
- Component rendering and behavior
- Hook functionality and state management
- Utility function correctness

### Integration Tests
- User workflows (login, goal creation, habit completion)
- Module interactions
- API integration points

### Test Structure
```typescript
describe('ComponentName', () => {
  it('renders correctly', () => {
    render(<ComponentName />)
    expect(screen.getByText('Expected Text')).toBeInTheDocument()
  })

  it('handles user interactions', async () => {
    const user = userEvent.setup()
    render(<ComponentName />)
    
    await user.click(screen.getByRole('button'))
    expect(mockFunction).toHaveBeenCalled()
  })
})
```

### Running Tests
```bash
npm run test          # Run all tests
npm run test:ui       # Run with UI interface
npm run test:coverage # Generate coverage report
```

## 🔄 State Management

### Global Store (Zustand)
```typescript
interface AppState {
  user: User | null
  sidebarOpen: boolean
  theme: 'light' | 'dark'
  notifications: Notification[]
  
  // Actions
  setUser: (user: User | null) => void
  setSidebarOpen: (open: boolean) => void
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void
}
```

### Module Stores
Each module can have its own store for domain-specific state:

```typescript
// modules/financehub/store/financeStore.ts
interface FinanceState {
  transactions: Transaction[]
  budgets: Budget[]
  addTransaction: (transaction: Transaction) => void
  updateBudget: (budget: Budget) => void
}
```

### Persistence
- Global state persisted to localStorage
- Module states can opt into persistence
- Automatic hydration on app startup

## 🚀 Development Workflow

### Getting Started
```bash
npm install           # Install dependencies
npm run dev          # Start development server
npm run test         # Run tests in watch mode
```

### Code Quality
```bash
npm run lint         # ESLint checking
npm run type-check   # TypeScript validation
npm run format       # Prettier formatting
```

### Building
```bash
npm run build        # Production build
npm run preview      # Preview production build
```

## 📦 Deployment

### Build Process
1. TypeScript compilation
2. Vite bundling and optimization
3. PWA manifest and service worker generation
4. Asset optimization and compression

### Environment Variables
```env
VITE_N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/ai-agent
VITE_APP_VERSION=1.0.0
```

### Deployment Targets
- **Netlify**: Automatic deployments from Git
- **Vercel**: Zero-config deployment
- **Self-hosted**: Docker container available

## 🔧 Customization

### Adding New Modules
1. Create module directory structure
2. Implement page and components
3. Add route to App.tsx
4. Update navigation in Sidebar.tsx
5. Add tests for new functionality

### Extending AI Capabilities
1. Update AIRequest/AIResponse interfaces
2. Modify n8n workflow for new context
3. Update useAIAssistant hook
4. Add new AI-powered features to modules

### Theme Customization
1. Update Tailwind config for new colors
2. Modify CSS custom properties
3. Update component variants
4. Test across all modules

## 📚 Best Practices

### Component Development
- Use TypeScript for all components
- Implement proper error boundaries
- Follow accessibility guidelines (ARIA labels, keyboard navigation)
- Optimize for performance (React.memo, useMemo, useCallback)

### State Management
- Keep state as local as possible
- Use global state only for truly global data
- Implement optimistic updates for better UX
- Handle loading and error states consistently

### Testing
- Write tests before implementing features (TDD)
- Test user workflows, not implementation details
- Mock external dependencies
- Maintain high test coverage (>80%)

### Performance
- Lazy load modules and heavy components
- Optimize images and assets
- Implement virtual scrolling for large lists
- Use React DevTools Profiler to identify bottlenecks

## 🐛 Troubleshooting

### Common Issues
1. **Build Errors**: Check TypeScript types and imports
2. **Test Failures**: Verify mock implementations and async handling
3. **PWA Issues**: Clear browser cache and check manifest
4. **State Persistence**: Check localStorage and Zustand persistence config

### Debug Tools
- React DevTools for component inspection
- Zustand DevTools for state debugging
- Network tab for API call analysis
- Lighthouse for PWA and performance auditing

## 🤝 Contributing

### Code Style
- Use Prettier for formatting
- Follow ESLint rules
- Write meaningful commit messages
- Update documentation for new features

### Pull Request Process
1. Create feature branch from main
2. Implement changes with tests
3. Update documentation
4. Submit PR with clear description
5. Address review feedback

---

For questions or support, refer to the project documentation or create an issue in the repository.