/* eslint-disable no-undef */
import { browser } from 'wdio-electron-service'
import { setupBrowser, } from '@testing-library/webdriverio'


describe('application loading', () => {
	let screen
	before(() => {
		screen = setupBrowser(browser)
	})

	describe('DOM', async () => {
		it('should determine when an element is in the document', async () => {
			await expect(await screen.getByTestId('jungleA')).toExist()
		})
	})
})