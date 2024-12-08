import { eslint } from '@old7even/eslint';

export default eslint(
  {
    typescript: true,
    react: true,
    jsx: true,
  },
  {
    rules: {
      'ts/no-require-imports': 'off',
      'old7even-react/no-unescaped-entities': 'off',
      // "ts/no-require-imports": "off",
    },
  },
  {
    ignores: ['src/__tests__'],
  }
);
