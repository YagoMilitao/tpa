const config = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.(spec|test).ts?(x)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: ['<rootDir>/src/test/setupTests.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: '<rootDir>/tsconfig.test.json',
      },
    ],
  },
  moduleNameMapper: {
    // CSS modules and Tailwind classes
    '^.+\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    // Static assets
    '^.+\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/src/test/fileMock.ts',
    // Mock framer-motion to avoid animation complexities in tests
    '^framer-motion$': '<rootDir>/src/test/__mocks__/framer-motion.ts',
    // Path aliases if you add any in tsconfig
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  // React 19 uses modern JSX runtime; this helps if needed
  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons'],
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/main.tsx',
    '!src/vite-env.d.ts',
    '!src/**/index.ts',
  ],
  coverageDirectory: 'coverage',
}

export default config
