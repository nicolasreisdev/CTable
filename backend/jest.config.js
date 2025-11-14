module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['/test/**/*.test.ts', '**/?(*.)+(spec|test).ts'],
  rootDir: 'src',

  collectCoverageFrom: [
    'business/**/*.ts',
    'controller/**/*.ts',
    'models/**/*.ts',
    'utils/**/*.ts',
    'routes.ts',
    'app.ts'
  ],

};

