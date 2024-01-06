module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'indent': [
      'error',
      2,
      {
        'SwitchCase': 1,
        'ignoredNodes': [
          'JSXElement *',
          'JSXElement'
        ]
      }
    ],
    'object-curly-spacing': ['error', 'always'],
    'template-curly-spacing': ['error', 'always'],
    'quotes': ['error', 'single'],
  },
}
