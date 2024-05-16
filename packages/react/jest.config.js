/** @type {import('ts-jest/dist/types').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFiles: ['jest-canvas-mock'],
  transform: {
    '.+\\.(css|styl|less|sass|scss)$': 'jest-css-modules-transform',
  },
  transformIgnorePatterns: ['node_modules/(?!(fetch-blob|node-fetch)/)'],
  rootDir: './src',
  errorOnDeprecated: false,
};
