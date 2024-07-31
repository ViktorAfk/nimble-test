module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    '@stylistic/jsx',
    "unused-imports"
    
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh', '@stylistic/jsx', "unused-imports"],
  rules: {
    "noUnusedImports": 'error',
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "@stylistic/jsx/jsx-max-props-per-line": [1, { "maximum": 3 }],
    "react/self-closing-comp": ["error", {
      "component": true,
      "html": true
}]
  },
}
