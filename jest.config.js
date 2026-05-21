module.exports = {
  transform: {
    "^.+\\.(ts|tsx)$": "babel-jest",
  },
  transformIgnorePatterns: [
    "node_modules/(?!@expo/ui|react-native|expo-modules-core)/",
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@expo/ui/swift-ui/modifiers$":
      "<rootDir>/__mocks__/@expo/ui/swift-ui/modifiers.ts",
  },
  globals: {
    __DEV__: true,
  },
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/index.ts",
    "!src/mappers/styles/**",
    "!src/types.ts",
    "!src/components/types.ts",
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
};
