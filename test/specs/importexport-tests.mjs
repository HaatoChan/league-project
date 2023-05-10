/* eslint-disable no-undef */
import { browser } from 'wdio-electron-service'
import { setupBrowser } from '@testing-library/webdriverio'

describe('Export & Import', () => {
	let screen
	before(async () => {
		screen = setupBrowser(browser)
	})
	it('Should navigate to JGL page', async () => {
		// Navigate to JGL page
		const aLink = await screen.getByTestId('jungleA')
		await aLink.click()
		await expect(await screen.getByTestId('sideBarDivTest')).toExist()
	})
	it('Should open import menu when import button is pressed', async () => {
		// Grab the scuttleButtom element and press it
		const scuttleBottom = await screen.getByTestId('Scuttlecrab-Bottom')
		await scuttleBottom.click()
		// Assert that it was pressed
		await expect(scuttleBottom).toHaveAttribute('data-iscampselected', 'true')
		// Grab import button and press it
		const importButton = await screen.getByTestId('importButton')
		await importButton.click()
		// Assert that import area opened
		await expect(await screen.getByTestId('textareaImport')).toExist()
	})
	it('Should not modify settings if invalid JSON is input', async () => {
		// Write to clipboard and paste it
		await navigator.clipboard.writeText('Completely invalid JSON')
		const importInput = await screen.getByTestId('textareaImport')
		await importInput.click()
		// TODO grab old test from gitlab
	}) 
})