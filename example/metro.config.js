const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Watch the parent library for changes during development
config.watchFolders = [path.resolve(__dirname, '..')];

module.exports = config;
