module.exports = {
  root: true,
  env: {
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    'standard'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json']
  },
  plugins: [
    '@typescript-eslint',
    'simple-import-sort'
  ],
  rules: {
    'simple-import-sort/imports': 'error',
    'jsx-quotes': ['error', 'prefer-single'],
    'no-undef': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    "no-use-before-define": 'off',
    "@typescript-eslint/no-use-before-define": 'error',
    '@typescript-eslint/no-explicit-any': 'off'
  }
}
