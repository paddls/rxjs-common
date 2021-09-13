module.exports = {
  roots: ['./src'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  preset: 'ts-jest',
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec|spec-e2e))\\.ts?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^lodash-es/(.*)$': '<rootDir>/node_modules/lodash/$1',
  }
};
