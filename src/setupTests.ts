import '@testing-library/jest-dom'

// Mock window APIs for testing environment
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: () => ({
    matches: false,
    addListener: () => {},
    removeListener: () => {},
  }),
})

// Simple IntersectionObserver mock
global.IntersectionObserver = class {
  observe() {}
  disconnect() {}
  unobserve() {}
} as any

// Simple ResizeObserver mock  
global.ResizeObserver = class {
  observe() {}
  disconnect() {}
  unobserve() {}
} as any

// Mock requestAnimationFrame
global.requestAnimationFrame = (callback: FrameRequestCallback) => {
  return setTimeout(callback, 0)
}

// Mock cancelAnimationFrame
global.cancelAnimationFrame = (id: number) => {
  clearTimeout(id)
}