module.exports = {
  moduleDirectories: ["node_modules", "./"],
  roots: [
    '<rootDir>',
    '<rootDir>/src',
    '<rootDir>/tests',
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testEnvironment: 'node'
}