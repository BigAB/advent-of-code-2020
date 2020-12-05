module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  plugins: ['unicorn'],
  extends: ['eslint:recommended', 'plugin:unicorn/recommended'],
  rules: {
    'unicorn/no-reduce': 'off',
    'unicorn/prevent-abbreviations': 'off',
    'unicorn/catch-error-name': [
      'error',
      {
        name: 'err',
      },
    ],
    'unicorn/consistent-function-scoping': 'off',
    'unicorn/no-nested-ternary': 'off',
  },
};
