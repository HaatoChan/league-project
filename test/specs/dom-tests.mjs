/* eslint-disable no-undef */
import { browser } from 'wdio-electron-service'
import { setupBrowser } from '@testing-library/webdriverio'

/**
 * Sleeps for passed amount in miliseocnds
 * @param {number} timeToSleep - Time to Sleep in miliseconds.
 * @returns {Promise} - Returns a promise to sleep.
 */
const sleepForX = async (timeToSleep) => {
	return new Promise(resolve => setTimeout(resolve, timeToSleep))
}

describe('application loading', () => {
	let screen
	before(async () => {
		screen = setupBrowser(browser)
	})
	describe('DOM', async () => {
		it('should load the home page on launch', async () => {
			await expect(await browser.getByTestId('jungleA')).toExist()
		})
		it('Should navigate to the jungle tool page', async () => {
			const jungleA = await browser.getByTestId('jungleA')
			await jungleA.click()
			// Wait for 1 second and check that we are at the jungle page
			await sleepForX(1000)
			await expect(await screen.getByTestId('sideBarDivTest')).toExist()
		})
		it('Should modify the URL correctly', async () => {
			// Get all the jungle camp buttons
			const redRedBuff = await screen.getByTestId('Red-Brambleback-Red')
			const redRaptors = await screen.getByTestId('Raptor-Red')
			const redKrugs = await screen.getByTestId('Krugs-Red')
			const redMurkWolf = await screen.getByTestId('Murkwolf-Red')
			// Press the jungle camp buttons
			await redRedBuff.click()
			await redRaptors.click()
			await redKrugs.click()
			await redMurkWolf.click()
			// Assert that the URL has changed
			await expect(browser).toHaveUrlContaining('UmVkLUJyYW1ibGViYWNrLVJlZDpSYXB0b3ItUmVkOktydWdzLVJlZDpNdXJrd29sZi1SZWQ=')
			// Click redbuff and assert that URL has changed again
			await redRedBuff.click()
			await expect(browser).toHaveUrlContaining('UmFwdG9yLVJlZDpLcnVncy1SZWQ6TXVya3dvbGYtUmVk')
			// Get the champion selector input and select akshan
			const champInput = await screen.getByTestId('champInput')
			await champInput.addValue('Akshan')
			// Assert that Akshan option is visible
			await expect(await screen.getByTestId('Akshan')).toExist()
			// Click it and assert that URL updated
			const akshanLi = await screen.getByTestId('Akshan')
			await akshanLi.click()
			await expect(browser).toHaveUrlContaining('Akshan')
			// Clear the value and select Ahri
			await champInput.clearValue()
			await champInput.addValue('Ahri')
			// Assert that Ahri option is visible
			await expect(await screen.getByTestId('Ahri')).toExist()
			// Click Ahri option and assert that URL updates
			const AhriLi = await screen.getByTestId('Ahri')
			await AhriLi.click()
			await expect(browser).toHaveUrlContaining('Akshan:Ahri')
			// Select side which should update the URL
			const blueSide = await screen.getByTestId('BlueSide')
			await blueSide.click()
			await expect(browser).toHaveUrlContaining('Red')
			console.log('Browser URL: ' + await browser.getUrl())
		})
		it('Should make camp values visible when values is pressed', async () => {
			await expect(await screen.getByTestId('valuesButton')).toExist()
			const valuesButton = await screen.getByTestId('valuesButton')
			await valuesButton.click()
			const valuesDisplay = await screen.getByTestId('valuesdisplay')
			await expect(valuesDisplay).toHaveAttribute('data-isactive', 'true')
		})
		it('Should display route options when input field is selected', async () => {
			await expect(await screen.getByTestId('routesearchinput')).toExist()
			const routeInput = await screen.getByTestId('routesearchinput')
			const addRouteButton = await screen.getByTestId('addRouteButton')
			await addRouteButton.click()
			await expect(await screen.getByTestId('nameRouteInput')).toExist()
			const nameRouteInput = await screen.getByTestId('nameRouteInput')
			await nameRouteInput.addValue('Test')
			const createButton = await screen.getByTestId('createButton')
			await createButton.click()
			await routeInput.addValue('Test')
			await expect(await screen.getByTestId('Test')).toExist()
		})
		it('Should display route name when option is clicked', async () => {
			const routeLi = await screen.getByTestId('Test')
			await routeLi.click()
			await expect(await screen.getByTestId('currentlySelectedTest')).toExist()
		})
		it('Pressing jungle camp reset should unselect all camps', async () => {
			const campArray = []
			campArray.push(await screen.getByTestId('Blue-Sentinel-Blue'))
			campArray.push(await screen.getByTestId('Gromp-Blue'))
			campArray.push(await screen.getByTestId('Murkwolf-Blue'))
			campArray.push(await screen.getByTestId('Raptor-Blue'))
			campArray.push(await screen.getByTestId('Red-Brambleback-Blue'))
			campArray.push(await screen.getByTestId('Krugs-Blue'))
			for (const element of campArray) {
				await element.click()
			}
		
			for (const element of campArray) {
				await expect(element).toHaveAttribute('data-iscampselected', 'true')
			}
	
			const resetButton = await screen.getByTestId('resetButtonMap')
			await resetButton.click()
	
			for (const element of campArray) {
				await expect(element).not.toHaveAttribute('data-iscampselected', 'true')
			}
	
		})
	})
})