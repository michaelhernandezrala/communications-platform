import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const typescriptConfig = tseslint.config({
  files: ['**/*.ts'],
  extends: [...tseslint.configs.recommended],
  languageOptions: {
    parser: tseslint.parser,
    parserOptions: {
      project: './tsconfig.json',
    },
    globals: {
      ...globals.node,
    },
  },
  plugins: {
    '@typescript-eslint': tseslint.plugin,
    import: importPlugin,
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
    },
  },
  rules: {
    'no-console': ['error', { allow: ['warn', 'error', 'info'] }],

    'max-len': [
      'error',
      {
        code: 120,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
        ignoreComments: false,
      },
    ],

    'no-unused-vars': 'off',
    'no-undef': 'off',
    'no-duplicate-imports': 'error',
    'no-var': 'error',
    'prefer-const': 'error',
    eqeqeq: ['error', 'always', { null: 'ignore' }],
    'no-unused-expressions': 'error',
    'no-param-reassign': 'error',

    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/no-misused-promises': 'error',
    '@typescript-eslint/await-thenable': 'error',
    '@typescript-eslint/no-unnecessary-type-assertion': 'error',
    '@typescript-eslint/prefer-nullish-coalescing': 'error',
    '@typescript-eslint/prefer-optional-chain': 'error',

    'import/first': 'error',
    'import/no-duplicates': 'error',
    'import/no-cycle': 'error',
    'import/no-self-import': 'error',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', ['parent', 'sibling'], 'index', 'object', 'type'],
        pathGroups: [
          {
            pattern: '@/**',
            group: 'internal',
            position: 'after',
          },
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
});

const javascriptConfig = {
  files: ['**/*.{js,mjs,cjs}'],
  extends: [js.configs.recommended],
  languageOptions: {
    globals: globals.node,
  },
  rules: {
    'no-console': ['error', { allow: ['warn', 'error', 'info'] }],

    'max-len': [
      'error',
      {
        code: 120,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
        ignoreComments: false,
      },
    ],

    'no-var': 'error',
    'prefer-const': 'error',
    eqeqeq: ['error', 'always', { null: 'ignore' }],
  },
};

const configFilesOverride = {
  files: ['eslint.config.js', '*.config.js', '*.config.ts'],
  rules: {
    'no-console': 'off',
    'max-len': 'off',
  },
};

const testFilesOverride = {
  files: ['**/*.test.ts', '**/*.spec.ts'],
  rules: {
    'no-console': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
  },
};

const ignorePatterns = {
  ignores: ['node_modules/**', 'dist/**', 'build/**', 'coverage/**', '.next/**', 'out/**', 'commitlint.config.ts'],
};

export default defineConfig([
  ignorePatterns,
  javascriptConfig,
  typescriptConfig,
  configFilesOverride,
  testFilesOverride,
  ignorePatterns,
  prettierConfig,
]);
