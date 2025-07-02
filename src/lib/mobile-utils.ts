// Mobile utilities for GalyarderOS PWA

// Viewport height handler for mobile browsers
export function initMobileViewport() {
  // Set initial viewport height
  const setVH = () => {
    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  }

  // Set initial value
  setVH()

  // Re-calculate on resize and orientation change
  window.addEventListener('resize', setVH)
  window.addEventListener('orientationchange', () => {
    setTimeout(setVH, 100) // Delay to allow orientation change to complete
  })

  // iOS specific handling
  if (isIOS()) {
    // Handle iOS Safari address bar
    const handleIOSViewport = () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
      
      // Force reflow to apply changes
      document.body.style.height = 'auto'
      document.body.offsetHeight
      document.body.style.height = ''
    }

    window.addEventListener('resize', handleIOSViewport)
    window.addEventListener('scroll', handleIOSViewport, { passive: true })
  }
}

// Device detection utilities
export function isIOS(): boolean {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
}

export function isAndroid(): boolean {
  return /Android/.test(navigator.userAgent)
}

export function isMobile(): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

export function isTablet(): boolean {
  return /iPad|Android/i.test(navigator.userAgent) && window.innerWidth >= 768
}

export function hasTouch(): boolean {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

export function isStandalone(): boolean {
  return window.matchMedia('(display-mode: standalone)').matches || (navigator as any).standalone
}

// PWA installation utilities
export function isPWAInstallable(): Promise<boolean> {
  return new Promise((resolve) => {
    let installPrompt: any = null
    
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      installPrompt = e
      resolve(true)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt, { once: true })
    
    // Timeout after 1 second
    setTimeout(() => {
      if (!installPrompt) {
        resolve(false)
      }
    }, 1000)
  })
}

export async function installPWA(): Promise<boolean> {
  try {
    const installPrompt = (window as any).deferredPrompt
    if (!installPrompt) return false

    installPrompt.prompt()
    const result = await installPrompt.userChoice
    
    if (result.outcome === 'accepted') {
      (window as any).deferredPrompt = null
      return true
    }
    
    return false
  } catch (error) {
    console.error('PWA installation failed:', error)
    return false
  }
}

// Touch gesture utilities
export interface SwipeGesture {
  startX: number
  startY: number
  endX: number
  endY: number
  deltaX: number
  deltaY: number
  direction: 'left' | 'right' | 'up' | 'down' | null
  distance: number
  duration: number
}

export function detectSwipe(
  element: HTMLElement,
  onSwipe: (gesture: SwipeGesture) => void,
  threshold = 50,
  restraint = 100,
  allowedTime = 300
) {
  let startX = 0
  let startY = 0
  let startTime = 0

  const handleTouchStart = (e: TouchEvent) => {
    const touch = e.touches[0]
    startX = touch.clientX
    startY = touch.clientY
    startTime = Date.now()
  }

  const handleTouchEnd = (e: TouchEvent) => {
    const touch = e.changedTouches[0]
    const endX = touch.clientX
    const endY = touch.clientY
    const endTime = Date.now()
    
    const deltaX = endX - startX
    const deltaY = endY - startY
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
    const duration = endTime - startTime

    if (duration <= allowedTime && distance >= threshold) {
      let direction: SwipeGesture['direction'] = null

      if (Math.abs(deltaX) >= Math.abs(deltaY)) {
        // Horizontal swipe
        if (Math.abs(deltaY) <= restraint) {
          direction = deltaX > 0 ? 'right' : 'left'
        }
      } else {
        // Vertical swipe
        if (Math.abs(deltaX) <= restraint) {
          direction = deltaY > 0 ? 'down' : 'up'
        }
      }

      if (direction) {
        onSwipe({
          startX,
          startY,
          endX,
          endY,
          deltaX,
          deltaY,
          direction,
          distance,
          duration
        })
      }
    }
  }

  element.addEventListener('touchstart', handleTouchStart, { passive: true })
  element.addEventListener('touchend', handleTouchEnd, { passive: true })

  // Return cleanup function
  return () => {
    element.removeEventListener('touchstart', handleTouchStart)
    element.removeEventListener('touchend', handleTouchEnd)
  }
}

// Haptic feedback utility
export function vibrate(pattern: number | number[] = 100) {
  if ('vibrate' in navigator) {
    navigator.vibrate(pattern)
  }
}

// Screen orientation utilities
export function lockOrientation(orientation: string) {
  if (screen.orientation && (screen.orientation as any).lock) {
    return (screen.orientation as any).lock(orientation)
  }
  return Promise.reject(new Error('Screen orientation lock not supported'))
}

export function unlockOrientation() {
  if (screen.orientation && (screen.orientation as any).unlock) {
    (screen.orientation as any).unlock()
  }
}

export function getOrientation(): 'portrait' | 'landscape' {
  if (screen.orientation) {
    return screen.orientation.angle === 0 || screen.orientation.angle === 180 ? 'portrait' : 'landscape'
  }
  return window.innerHeight > window.innerWidth ? 'portrait' : 'landscape'
}

// Battery status utility
export async function getBatteryStatus() {
  try {
    const battery = await (navigator as any).getBattery?.()
    if (battery) {
      return {
        level: Math.round(battery.level * 100),
        charging: battery.charging,
        chargingTime: battery.chargingTime,
        dischargingTime: battery.dischargingTime
      }
    }
  } catch (error) {
    console.warn('Battery API not supported:', error)
  }
  return null
}

// Network information utility
export function getNetworkInfo() {
  const connection = (navigator as any).connection || 
                    (navigator as any).mozConnection || 
                    (navigator as any).webkitConnection

  if (connection) {
    return {
      effectiveType: connection.effectiveType,
      downlink: connection.downlink,
      downlinkMax: connection.downlinkMax,
      rtt: connection.rtt,
      saveData: connection.saveData,
      type: connection.type
    }
  }

  return null
}

// Share API utility
export async function shareContent(data: ShareData): Promise<boolean> {
  if (navigator.share) {
    try {
      await navigator.share(data)
      return true
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        console.error('Share failed:', error)
      }
      return false
    }
  }
  
  // Fallback to clipboard
  if (data.url || data.text) {
    try {
      const content = data.url || data.text || ''
      await navigator.clipboard.writeText(content)
      return true
    } catch (error) {
      console.error('Clipboard write failed:', error)
      return false
    }
  }
  
  return false
}

// Safe area utilities
export function getSafeAreaInsets() {
  const style = getComputedStyle(document.documentElement)
  
  return {
    top: parseInt(style.getPropertyValue('--safe-area-inset-top')) || 0,
    right: parseInt(style.getPropertyValue('--safe-area-inset-right')) || 0,
    bottom: parseInt(style.getPropertyValue('--safe-area-inset-bottom')) || 0,
    left: parseInt(style.getPropertyValue('--safe-area-inset-left')) || 0
  }
}

// Prevent zoom utility
export function preventZoom() {
  // Prevent pinch zoom
  document.addEventListener('touchstart', (e) => {
    if (e.touches.length > 1) {
      e.preventDefault()
    }
  }, { passive: false })

  // Prevent double-tap zoom
  let lastTouchEnd = 0
  document.addEventListener('touchend', (e) => {
    const now = Date.now()
    if (now - lastTouchEnd <= 300) {
      e.preventDefault()
    }
    lastTouchEnd = now
  }, { passive: false })
}

// Pull-to-refresh utility
export function setupPullToRefresh(
  element: HTMLElement,
  onRefresh: () => Promise<void>,
  threshold = 100
) {
  let startY = 0
  let currentY = 0
  let isPulling = false

  const handleTouchStart = (e: TouchEvent) => {
    if (element.scrollTop === 0) {
      startY = e.touches[0].clientY
      isPulling = true
    }
  }

  const handleTouchMove = (e: TouchEvent) => {
    if (!isPulling) return

    currentY = e.touches[0].clientY
    const pullDistance = currentY - startY

    if (pullDistance > 0 && element.scrollTop === 0) {
      e.preventDefault()
      
      // Add visual feedback
      const opacity = Math.min(pullDistance / threshold, 1)
      element.style.setProperty('--pull-opacity', opacity.toString())
      
      if (pullDistance > threshold) {
        element.classList.add('pull-ready')
      } else {
        element.classList.remove('pull-ready')
      }
    }
  }

  const handleTouchEnd = async (e: TouchEvent) => {
    if (!isPulling) return

    const pullDistance = currentY - startY
    
    if (pullDistance > threshold) {
      element.classList.add('pull-refreshing')
      try {
        await onRefresh()
      } finally {
        element.classList.remove('pull-refreshing', 'pull-ready')
        element.style.removeProperty('--pull-opacity')
      }
    } else {
      element.classList.remove('pull-ready')
      element.style.removeProperty('--pull-opacity')
    }

    isPulling = false
    startY = 0
    currentY = 0
  }

  element.addEventListener('touchstart', handleTouchStart, { passive: true })
  element.addEventListener('touchmove', handleTouchMove, { passive: false })
  element.addEventListener('touchend', handleTouchEnd, { passive: true })

  return () => {
    element.removeEventListener('touchstart', handleTouchStart)
    element.removeEventListener('touchmove', handleTouchMove)
    element.removeEventListener('touchend', handleTouchEnd)
  }
}

// Mobile performance optimization
export function optimizeForMobile() {
  // Disable hover states on touch devices
  if (hasTouch()) {
    document.body.classList.add('touch-device')
  }

  // Add mobile-specific classes
  if (isMobile()) {
    document.body.classList.add('mobile-device')
  }

  if (isIOS()) {
    document.body.classList.add('ios-device')
  }

  if (isAndroid()) {
    document.body.classList.add('android-device')
  }

  if (isStandalone()) {
    document.body.classList.add('standalone-app')
  }

  // Initialize viewport handling
  initMobileViewport()

  // Prevent zoom if needed
  if (isStandalone()) {
    preventZoom()
  }
}

// Initialize mobile optimizations
export function initMobileOptimizations() {
  if (typeof window !== 'undefined') {
    optimizeForMobile()
    
    // Set up orientation change handling
    screen.orientation?.addEventListener('change', () => {
      setTimeout(() => {
        initMobileViewport()
      }, 100)
    })
  }
}