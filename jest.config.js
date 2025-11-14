module.exports = {
  transform: {
    "^.+\\.(ts|tsx)$": "babel-jest",
  },
  transformIgnorePatterns: [
    "node_modules/(?!@expo/ui|react-native|expo-modules-core)/",
  ],
};
