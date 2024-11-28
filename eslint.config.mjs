import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';
// import eslintPluginJsxA11y from 'eslint-plugin-jsx-a11y';
// import eslintPluginImport from 'eslint-plugin-import';
// import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
// import eslintConfigAirbnbBase from 'eslint-config-airbnb-base';

export default [
	{
		files: ['**/*.{js,mjs,cjs,jsx}'],
		languageOptions: {
			parserOptions: {
				ecmaVersion: 2020,
				sourceType: 'module',
				ecmaFeatures: {
					jsx: true
				}
			},
			globals: globals.browser
		},
		plugins: {
			prettier: eslintPluginPrettier,
			react: pluginReact
			// import: eslintPluginImport,
			// 'jsx-a11y': eslintPluginJsxA11y
			// 'react-hooks': eslintPluginReactHooks
		},
		rules: {
			...pluginJs.configs.recommended.rules,
			...pluginReact.configs.flat.recommended.rules,
			...eslintConfigPrettier.rules,
			// ...eslintConfigAirbnbBase.rules,
			'prettier/prettier': ['warn', { endOfLine: 'auto' }],
			'react/prop-types': 'off',
			'no-unused-vars': 'warn',
			'import/no-unresolved': 'off',
			'react/react-in-jsx-scope': 'off'
			// 'jsx-a11y/anchor-is-valid': 'warn',
			// 'react-hooks/rules-of-hooks': 'error',
			// 'react-hooks/exhaustive-deps': 'warn',
		}
	}
];
