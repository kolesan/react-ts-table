module.exports = {
  'env': {
    'browser': true,
    'es6': true
  },
  'extends': [
    'recommended/esnext'
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly'
  },
  'parserOptions': {
    'ecmaVersion': 2018,
    'sourceType': 'module'
  },
  'rules': {
    "array-callback-return": 1
  }
};