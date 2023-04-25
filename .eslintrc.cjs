module.exports = {
	root: true,
	env: {
		browser: true,
		commonjs: true,
		es6: true,
		node: true
	},
	globals: {
		'JSX': 'readonly'
	},
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		sourceType: 'module',
		ecmaVersion: 2021
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:react/jsx-runtime',
		'plugin:jsdoc/recommended'
	],
	rules: {
		'indent': [
			'error',
			'tab'
		],
		'linebreak-style': [
			'off',
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'never'
		],
		'react/prop-types': 'off',
		'jsdoc/require-jsdoc': [
			'error',
			{
				'require': {
					'FunctionDeclaration': false,
					'MethodDefinition': true,
					'ClassDeclaration': false,
					'ArrowFunctionExpression': true,
					'FunctionExpression': false
				}
			}
		] 
	}
}
