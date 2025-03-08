// @ts-check
import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    rules: {
      'no-unused-vars': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn'],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/ no-unsafe-function-type': 'warn',
      'no-empty': 'warn',
    },
  },
)
