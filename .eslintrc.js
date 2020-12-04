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
    'unicorn/prevent-abbreviations': [
      'error',
      {
        replacements: {
          args: false,
          err: {
            error: false,
          },
        },
      },
    ],
    'unicorn/catch-error-name': [
      'error',
      {
        name: 'err',
      },
    ],
  },
};
