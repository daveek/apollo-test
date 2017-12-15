module.exports = {
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
    'prettier',
    'prettier/react',
  ],
  'plugins': [
    'json',
    'react',
    'prettier',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      classes: true,
      jsx: true,
    },
    sourceType: 'module',
  },
  'env': {
    'es6': true,
    'node': true,
    browser: true,
    mocha: true,
  },
  'rules': {
    'prettier/prettier': 'error',
  },
}
