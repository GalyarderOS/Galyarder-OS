import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type SupportedLanguage = 'en' | 'id'

export interface Language {
  code: SupportedLanguage
  name: string
  nativeName: string
  flag: string
  rtl?: boolean
}

export const supportedLanguages: Language[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸'
  },
  {
    code: 'id',
    name: 'Indonesian',
    nativeName: 'Bahasa Indonesia',
    flag: '🇮🇩'
  }
]

// Translation type definition for type safety
export interface Translations {
  // Navigation & Common
  common: {
    welcome: string
    back: string
    next: string
    save: string
    cancel: string
    delete: string
    edit: string
    loading: string
    error: string
    success: string
    close: string
    open: string
    search: string
    settings: string
    profile: string
    logout: string
    login: string
    register: string
    email: string
    password: string
    name: string
    confirm: string
    language: string
  }
  
  // Landing Page
  landing: {
    title: string
    subtitle: string
    heroHeadline: string
    heroSubheadline: string
    getStarted: string
    learnMore: string
    features: string
    pricing: string
    about: string
    contact: string
    modulesTitle: string
    modulesSubtitle: string
    exploreModules: string
    testimonials: string
    cta: string
    footer: {
      company: string
      product: string
      resources: string
      legal: string
      rights: string
    }
  }
  
  // Dashboard
  dashboard: {
    welcomeBack: string
    overview: string
    consciousness: string
    analytics: string
    aiAssistant: string
    quickStats: string
    recentActivity: string
    productivity: string
    health: string
    finance: string
    relationships: string
  }
  
  // Modules
  modules: {
    aiAssistant: string
    chronoCopilot: string
    financeHub: string
    healthForge: string
    productivityMatrix: string
    careerCommand: string
    mindGuard: string
    systemLogs: string
    relationshipsForge: string
    legacyBuilder: string
    knowledgeArsenal: string
    networkNexus: string
    communicationConsole: string
    privacyVault: string
    calendar: string
    files: string
    calculator: string
    appDrawer: string
    environmentArchitect: string
    sleepArchitect: string
    spiritualForge: string
    metaMemory: string
    opsCenter: string
    familyMatrix: string
    digitalSovereignty: string
    worldIntelligence: string
    systemKernel: string
  }
  
  // Consciousness System
  consciousness: {
    title: string
    level: string
    progress: string
    insights: string
    goals: string
    achievements: string
    score: string
    growth: string
    analytics: string
    authentication: string
    signIn: string
    signUp: string
    profile: string
    settings: string
  }
  
  // Theme & Settings
  theme: {
    mode: string
    light: string
    dark: string
    auto: string
    accent: string
    colors: string
    purple: string
    blue: string
    emerald: string
    orange: string
    pink: string
    red: string
  }
  
  // Time & Dates
  time: {
    today: string
    yesterday: string
    tomorrow: string
    thisWeek: string
    thisMonth: string
    thisYear: string
    morning: string
    afternoon: string
    evening: string
    night: string
  }
}

// English translations
const en: Translations = {
  common: {
    welcome: 'Welcome',
    back: 'Back',
    next: 'Next',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    close: 'Close',
    open: 'Open',
    search: 'Search',
    settings: 'Settings',
    profile: 'Profile',
    logout: 'Logout',
    login: 'Login',
    register: 'Register',
    email: 'Email',
    password: 'Password',
    name: 'Name',
    confirm: 'Confirm',
    language: 'Language'
  },
  landing: {
    title: 'GalyarderOS',
    subtitle: 'Your Personal Operating System',
    heroHeadline: 'Build Your Personal Civilization',
    heroSubheadline: 'The ultimate consciousness platform to master productivity, finance, health, relationships, and legacy.',
    getStarted: 'Get Started',
    learnMore: 'Learn More',
    features: 'Features',
    pricing: 'Pricing',
    about: 'About',
    contact: 'Contact',
    modulesTitle: 'Everything You Need to Build Your Personal Civilization',
    modulesSubtitle: '29+ integrated life modules to master productivity, finance, health, relationships, and legacy.',
    exploreModules: 'Explore All Modules',
    testimonials: 'What Our Users Say',
    cta: 'Start Your Journey',
    footer: {
      company: 'Company',
      product: 'Product',
      resources: 'Resources',
      legal: 'Legal',
      rights: 'All rights reserved.'
    }
  },
  dashboard: {
    welcomeBack: 'Welcome Back',
    overview: 'Overview',
    consciousness: 'Consciousness',
    analytics: 'Analytics',
    aiAssistant: 'AI Assistant',
    quickStats: 'Quick Stats',
    recentActivity: 'Recent Activity',
    productivity: 'Productivity',
    health: 'Health',
    finance: 'Finance',
    relationships: 'Relationships'
  },
  modules: {
    aiAssistant: 'AI Assistant',
    chronoCopilot: 'Chrono Copilot',
    financeHub: 'Finance Hub',
    healthForge: 'Health Forge',
    productivityMatrix: 'Productivity Matrix',
    careerCommand: 'Career Command',
    mindGuard: 'Mind Guard',
    systemLogs: 'System Logs',
    relationshipsForge: 'Relationships Forge',
    legacyBuilder: 'Legacy Builder',
    knowledgeArsenal: 'Knowledge Arsenal',
    networkNexus: 'Network Nexus',
    communicationConsole: 'Communication Console',
    privacyVault: 'Privacy Vault',
    calendar: 'Calendar',
    files: 'Files',
    calculator: 'Calculator',
    appDrawer: 'App Drawer',
    environmentArchitect: 'Environment Architect',
    sleepArchitect: 'Sleep Architect',
    spiritualForge: 'Spiritual Forge',
    metaMemory: 'Meta Memory',
    opsCenter: 'Ops Center',
    familyMatrix: 'Family Matrix',
    digitalSovereignty: 'Digital Sovereignty',
    worldIntelligence: 'World Intelligence',
    systemKernel: 'System Kernel'
  },
  consciousness: {
    title: 'Consciousness',
    level: 'Level',
    progress: 'Progress',
    insights: 'Insights',
    goals: 'Goals',
    achievements: 'Achievements',
    score: 'Score',
    growth: 'Growth',
    analytics: 'Analytics',
    authentication: 'Authentication',
    signIn: 'Sign In',
    signUp: 'Sign Up',
    profile: 'Profile',
    settings: 'Settings'
  },
  theme: {
    mode: 'Theme Mode',
    light: 'Light',
    dark: 'Dark',
    auto: 'Auto',
    accent: 'Accent Color',
    colors: 'Colors',
    purple: 'Purple',
    blue: 'Blue',
    emerald: 'Emerald',
    orange: 'Orange',
    pink: 'Pink',
    red: 'Red'
  },
  time: {
    today: 'Today',
    yesterday: 'Yesterday',
    tomorrow: 'Tomorrow',
    thisWeek: 'This Week',
    thisMonth: 'This Month',
    thisYear: 'This Year',
    morning: 'Morning',
    afternoon: 'Afternoon',
    evening: 'Evening',
    night: 'Night'
  }
}

// Indonesian translations
const id: Translations = {
  common: {
    welcome: 'Selamat Datang',
    back: 'Kembali',
    next: 'Lanjut',
    save: 'Simpan',
    cancel: 'Batal',
    delete: 'Hapus',
    edit: 'Edit',
    loading: 'Memuat...',
    error: 'Error',
    success: 'Berhasil',
    close: 'Tutup',
    open: 'Buka',
    search: 'Cari',
    settings: 'Pengaturan',
    profile: 'Profil',
    logout: 'Keluar',
    login: 'Masuk',
    register: 'Daftar',
    email: 'Email',
    password: 'Kata Sandi',
    name: 'Nama',
    confirm: 'Konfirmasi',
    language: 'Bahasa'
  },
  landing: {
    title: 'GalyarderOS',
    subtitle: 'Sistem Operasi Personal Anda',
    heroHeadline: 'Bangun Peradaban Personal Anda',
    heroSubheadline: 'Platform kesadaran ultimate untuk menguasai produktivitas, keuangan, kesehatan, hubungan, dan warisan.',
    getStarted: 'Mulai Sekarang',
    learnMore: 'Pelajari Lebih Lanjut',
    features: 'Fitur',
    pricing: 'Harga',
    about: 'Tentang',
    contact: 'Kontak',
    modulesTitle: 'Semua Yang Anda Butuhkan untuk Membangun Peradaban Personal',
    modulesSubtitle: '29+ modul kehidupan terintegrasi untuk menguasai produktivitas, keuangan, kesehatan, hubungan, dan warisan.',
    exploreModules: 'Jelajahi Semua Modul',
    testimonials: 'Apa Kata Pengguna Kami',
    cta: 'Mulai Perjalanan Anda',
    footer: {
      company: 'Perusahaan',
      product: 'Produk',
      resources: 'Sumber Daya',
      legal: 'Legal',
      rights: 'Hak cipta dilindungi.'
    }
  },
  dashboard: {
    welcomeBack: 'Selamat Datang Kembali',
    overview: 'Ringkasan',
    consciousness: 'Kesadaran',
    analytics: 'Analitik',
    aiAssistant: 'Asisten AI',
    quickStats: 'Statistik Cepat',
    recentActivity: 'Aktivitas Terbaru',
    productivity: 'Produktivitas',
    health: 'Kesehatan',
    finance: 'Keuangan',
    relationships: 'Hubungan'
  },
  modules: {
    aiAssistant: 'Asisten AI',
    chronoCopilot: 'Chrono Copilot',
    financeHub: 'Hub Keuangan',
    healthForge: 'Forge Kesehatan',
    productivityMatrix: 'Matriks Produktivitas',
    careerCommand: 'Komando Karier',
    mindGuard: 'Penjaga Pikiran',
    systemLogs: 'Log Sistem',
    relationshipsForge: 'Forge Hubungan',
    legacyBuilder: 'Pembangun Warisan',
    knowledgeArsenal: 'Arsenal Pengetahuan',
    networkNexus: 'Nexus Jaringan',
    communicationConsole: 'Konsol Komunikasi',
    privacyVault: 'Vault Privasi',
    calendar: 'Kalender',
    files: 'File',
    calculator: 'Kalkulator',
    appDrawer: 'Laci Aplikasi',
    environmentArchitect: 'Arsitek Lingkungan',
    sleepArchitect: 'Arsitek Tidur',
    spiritualForge: 'Forge Spiritual',
    metaMemory: 'Meta Memori',
    opsCenter: 'Pusat Ops',
    familyMatrix: 'Matriks Keluarga',
    digitalSovereignty: 'Kedaulatan Digital',
    worldIntelligence: 'Intelijen Dunia',
    systemKernel: 'Kernel Sistem'
  },
  consciousness: {
    title: 'Kesadaran',
    level: 'Level',
    progress: 'Progres',
    insights: 'Wawasan',
    goals: 'Tujuan',
    achievements: 'Pencapaian',
    score: 'Skor',
    growth: 'Pertumbuhan',
    analytics: 'Analitik',
    authentication: 'Autentikasi',
    signIn: 'Masuk',
    signUp: 'Daftar',
    profile: 'Profil',
    settings: 'Pengaturan'
  },
  theme: {
    mode: 'Mode Tema',
    light: 'Terang',
    dark: 'Gelap',
    auto: 'Otomatis',
    accent: 'Warna Aksen',
    colors: 'Warna',
    purple: 'Ungu',
    blue: 'Biru',
    emerald: 'Zamrud',
    orange: 'Oranye',
    pink: 'Pink',
    red: 'Merah'
  },
  time: {
    today: 'Hari Ini',
    yesterday: 'Kemarin',
    tomorrow: 'Besok',
    thisWeek: 'Minggu Ini',
    thisMonth: 'Bulan Ini',
    thisYear: 'Tahun Ini',
    morning: 'Pagi',
    afternoon: 'Siang',
    evening: 'Sore',
    night: 'Malam'
  }
}

// Translation resources
const resources = {
  en,
  id
}

// I18n store interface
interface I18nState {
  currentLanguage: SupportedLanguage
  translations: Translations
  isRTL: boolean
  
  // Actions
  setLanguage: (language: SupportedLanguage) => void
  t: (key: string, defaultValue?: string) => string
  getCurrentLanguage: () => Language
  getSupportedLanguages: () => Language[]
}

// Utility function to get nested translation value
const getNestedValue = (obj: any, path: string): string => {
  return path.split('.').reduce((current, key) => {
    return current && current[key] ? current[key] : null
  }, obj)
}

// Create I18n store
export const useI18nStore = create<I18nState>()(
  persist(
    (set, get) => ({
      currentLanguage: 'en',
      translations: en,
      isRTL: false,

      setLanguage: (language: SupportedLanguage) => {
        const newTranslations = resources[language]
        const languageInfo = supportedLanguages.find(lang => lang.code === language)
        
        set({
          currentLanguage: language,
          translations: newTranslations,
          isRTL: languageInfo?.rtl || false
        })
        
        // Update document language and direction
        document.documentElement.lang = language
        document.documentElement.dir = languageInfo?.rtl ? 'rtl' : 'ltr'
        
        // Store in localStorage for persistence
        localStorage.setItem('galyarderos-language', language)
        
        // Trigger custom event for other components to listen
        window.dispatchEvent(new CustomEvent('languageChanged', { detail: language }))
      },

      t: (key: string, defaultValue?: string): string => {
        const { translations } = get()
        const value = getNestedValue(translations, key)
        return value || defaultValue || key
      },

      getCurrentLanguage: () => {
        const { currentLanguage } = get()
        return supportedLanguages.find(lang => lang.code === currentLanguage) || supportedLanguages[0]
      },

      getSupportedLanguages: () => supportedLanguages
    }),
    {
      name: 'galyarderos-i18n',
      partialize: (state) => ({ currentLanguage: state.currentLanguage })
    }
  )
)

// Initialize i18n system
export const initializeI18n = () => {
  const { setLanguage } = useI18nStore.getState()
  
  // Get saved language or detect from browser
  const savedLanguage = localStorage.getItem('galyarderos-language') as SupportedLanguage
  const browserLanguage = navigator.language.split('-')[0] as SupportedLanguage
  
  // Use saved language, browser language, or default to English
  const defaultLanguage = savedLanguage || 
    (supportedLanguages.some(lang => lang.code === browserLanguage) ? browserLanguage : 'en')
  
  setLanguage(defaultLanguage)
}

// Custom hook for easy translation access
export const useTranslation = () => {
  const { t, currentLanguage, setLanguage, getCurrentLanguage, getSupportedLanguages } = useI18nStore()
  
  return {
    t,
    currentLanguage,
    setLanguage,
    getCurrentLanguage,
    getSupportedLanguages,
    isRTL: useI18nStore(state => state.isRTL)
  }
}

export default useI18nStore