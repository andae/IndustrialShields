'use strict';

module.exports = {
  extends: 'eslint:recommended',
  rules: {
    'camelcase': ['warn', { properties: 'never' }],
    'indent': ['error', 2],
    'linebreak-style': ['error', 'unix'],
    'max-len': ['warn', { code: 100 }],
    'no-confusing-arrow': ['error', { 'allowParens': true }],
    'no-unused-vars': ['warn'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always']
  },
  env: {
    browser: true,
    es6: true,
    node: true
  }
};
