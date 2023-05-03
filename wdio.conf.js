const fs = require('fs')
const dotenv = require('dotenv')
dotenv.config()
const packageJson = JSON.parse(fs.readFileSync('./package.json'))
const productName = packageJson.name

exports.config = {
	outputDir: 'all-logs',
	runner: 'local',
	specs: [
		//'./test/specs/**/*.mjs'
		'./test/specs/settings-tests.mjs'
	],
	// Patterns to exclude.
	exclude: [
		// 'path/to/excluded/files'
	],
	maxInstances: 1,
	capabilities: [{
		browserName: getCapabilities() 
	}],
	logLevel: 'info',
	bail: 0,
	baseUrl: 'http://localhost',
	waitforTimeout: 10000,
	connectionRetryTimeout: 120000,
	//
	// Default request retries count
	connectionRetryCount: 3,
	//
	// Test runner services
	// Services take over a specific job you don't want to take care of. They enhance
	// your test setup with almost no effort. Unlike plugins, they don't add new
	// commands. Instead, they hook themselves up into the test process.
	services: [
		[
			'electron',
			{
				appPath: './dist',
				appName: productName,
				appArgs: ['foo', 'bar=baz'],
				chromedriver: {
					port: 9519,
					logFileName: 'wdio-chromedriver.log',
				},
				electronVersion: '22.3.4',
			},
		],
	],
    
	framework: 'mocha',
	// see also: https://webdriver.io/docs/dot-reporter
	reporters: ['spec'],


    
	//
	// Options to be passed to Mocha.
	// See the full list at http://mochajs.org/
	mochaOpts: {
		ui: 'bdd',
		timeout: 60000
	},
}
function getCapabilities () {
	if(process.env.CI_JOB_NAME) {
		return process.env.CI_JOB_NAME === 'e2e:chrome' ? 'chrome' : 'firefox' 
	}
}