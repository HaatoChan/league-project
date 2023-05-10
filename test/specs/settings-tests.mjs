import { browser } from 'wdio-electron-service'
import { setupBrowser } from '@testing-library/webdriverio'

/* eslint-disable no-undef */

describe('Settings tests', () => {
	let screen
	before(async () => {
		screen = setupBrowser(browser)
	})
	it('Should navigate to the settings page', async () => {
		// Assert that settingsA exists and click it
		await expect(await screen.getByTestId('settingsA')).toExist()
		const settingsA = await screen.getByTestId('settingsA')
		await settingsA.click()
		// Assert that we navigated to settings page
		await expect(await screen.getByTestId('okButton')).toExist()
	})
	it('Application should have resolution 1600x900', async () => {
		// Get the size of the window from electron api
		const sizes = await browser.electron.browserWindow('getSize')
		// Assert the size
		await expect(sizes[0]).toEqual(1600)
		await expect(sizes[1]).toEqual(900)
	})
	it('Selecting 1920x1080 and pressing OK should change resolution', async () => {
		// Grab the elements
		const currentlyselected = await screen.getByTestId('1600x900')
		await currentlyselected.click()
		const bigResRadio = await screen.getByTestId('1920x1080')
		await bigResRadio.click()
		const okButton = await screen.getByTestId('okButton')
		await okButton.click()
		// Grab the sizes and assert their size
		const sizes = await browser.electron.browserWindow('getSize')
		await expect(sizes[0]).toEqual(1920)
		await expect(sizes[1]).toEqual(1080)
	})
	it('Selecting 1600x900 and pressing OK should change resolution', async () => {
		const currentlyselected = await screen.getByTestId('1920x1080')
		await currentlyselected.click()
		// Grab the elements
		const bigResRadio = await screen.getByTestId('1600x900')
		await bigResRadio.click()
		const okButton = await screen.getByTestId('okButton')
		await okButton.click()
		// Get the size of the window from electron api
		const sizes = await browser.electron.browserWindow('getSize')
		// Assert the size
		await expect(sizes[0]).toEqual(1600)
		await expect(sizes[1]).toEqual(900)
	})
})