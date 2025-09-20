// Jest setup for React Testing Library and JSDOM
import '@testing-library/jest-dom';

// Mock matchMedia which is not implemented in JSDOM
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {}, // deprecated
    removeListener: () => {}, // deprecated
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

// Optional: reduce motion for framer-motion during tests to avoid flakiness
process.env.FRAME_MOTION_PREFER_REDUCED_MOTION = 'true';
