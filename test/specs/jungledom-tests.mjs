/* eslint-disable no-undef */
import { browser } from 'wdio-electron-service'
import { setupBrowser } from '@testing-library/webdriverio'
import { Key } from 'webdriverio'
import { sleepForX } from '../commonfunction.mjs'

describe('application loading', () => {
	let screen
	before(async () => {
		console.log('before screen')
		screen = setupBrowser(browser)
		console.log('after screen, screen = ' + screen)
		console.log('this is browser = ' + browser)
	})
	describe('Jungle DOM', async () => {
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
		it('Should make camp values visible when values is pressed', async () => {
			// Assert that button is in DOM and click it.
			await expect(await screen.getByTestId('valuesButton')).toExist()
			const valuesButton = await screen.getByTestId('valuesButton')
			await valuesButton.click()
			// Assert that the attribute changes
			const valuesDisplay = await screen.getByTestId('valuesdisplay')
			await expect(valuesDisplay).toHaveAttribute('data-isactive', 'true')
		})
		it('Should display route options when input field is selected', async () => {
			// Assert that rotuesearchinput is in DOM
			await expect(await screen.getByTestId('routesearchinput')).toExist()
			const routeInput = await screen.getByTestId('routesearchinput')
			const addRouteButton = await screen.getByTestId('addRouteButton')
			// Open the route creator
			await addRouteButton.click()
			// Assert that it's in the DOM
			await expect(await screen.getByTestId('nameRouteInput')).toExist()
			const nameRouteInput = await screen.getByTestId('nameRouteInput')
			// Name and create our route
			await nameRouteInput.addValue('Test')
			const createButton = await screen.getByTestId('createButton')
			await createButton.click()
			// Assert that the new route is visisble
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
			// Grab the entire blue side jungle
			campArray.push(await screen.getByTestId('Blue-Sentinel-Blue'))
			campArray.push(await screen.getByTestId('Gromp-Blue'))
			campArray.push(await screen.getByTestId('Murkwolf-Blue'))
			campArray.push(await screen.getByTestId('Raptor-Blue'))
			campArray.push(await screen.getByTestId('Red-Brambleback-Blue'))
			campArray.push(await screen.getByTestId('Krugs-Blue'))
			// Click all the elemtns
			for (const element of campArray) {
				await element.click()
			}
			// Assert that they are selected
			for (const element of campArray) {
				await expect(element).toHaveAttribute('data-iscampselected', 'true')
			}
			// Get the reset button and click it
			const resetButton = await screen.getByTestId('resetButtonMap')
			await resetButton.click()
			// Assert that they are no longer selected
			for (const element of campArray) {
				await expect(element).not.toHaveAttribute('data-iscampselected', 'true')
			}
	
		})
		it('Pressing champ selector reset button should unselect all champions', async () => {
			// Assert that the reset button is in the DOM
			await expect(await screen.getByTestId('champUnselectAll')).toExist()
			const champUnselectButton = await screen.getByTestId('champUnselectAll')
			// Grab the input field
			const champInput = await screen.getByTestId('champInput')
			await champInput.clearValue()
			// Add champions to image array and assert that they have been selected
			await champInput.addValue('Zac')
			const zacLi = await screen.getByTestId('Zac')
			await zacLi.click()
			await expect(await screen.getByTestId('Zacimage')).toExist()
			const imageArray = []
			imageArray.push(await screen.getByTestId('Zacimage'))
			await champInput.clearValue()
			await champInput.addValue('Ezreal')
			const ezrealLi = await screen.getByTestId('Ezreal')
			await ezrealLi.click()
			await expect(await screen.getByTestId('Ezrealimage')).toExist()
			imageArray.push(await screen.getByTestId('Ezrealimage'))

			// Push the reset button
			await champUnselectButton.click()

			// Assert that the images have been removed from the DOM
			for (const element of imageArray) {
				await expect(element).not.toExist()
			}
		})
		it('Pressing champion image should remove the element from the DOM', async () => {
			// Grab the champion input
			const champInput = await screen.getByTestId('champInput')
			await sleepForX(3000)
			await champInput.clearValue()
			// Grab two champions
			await champInput.addValue('Ahri')
			const ahriLi = await screen.getByTestId('Ahri')
			await ahriLi.click()
			await champInput.clearValue()
			await champInput.addValue('Soraka')
			const sorakaLi = await screen.getByTestId('Soraka')
			await sorakaLi.click()
			// Assert that their images are in the DOM
			await expect(await screen.getByTestId('Ahriimage')).toExist()
			await expect(await screen.getByTestId('Sorakaimage')).toExist()
			const sorakaImage = await screen.getByTestId('Sorakaimage')
			// Click sorakaImage and clear input
			await sorakaImage.click()
			await sleepForX(2000)
			await champInput.clearValue()
			// Assert that sorakas image is no longer in the DOM but that Ahris image is.
			await expect(sorakaImage).not.toExist()
			await expect(await screen.getByTestId('Ahriimage')).toExist()
		})
		it('Pressing export should save value to clipboard', async () => {
			// Assert that export button exists and click it
			await expect(await screen.getByTestId('exportButton')).toExist()
			const exportButton = await screen.getByTestId('exportButton')
			await exportButton.click()
			// Grab the champion input and focus it
			const champInput = await screen.getByTestId('champInput')
			await champInput.click()
			// Paste the value and assert that it contains something part of an URL
			await browser.keys([Key.Ctrl, 'v'])
			await expect(champInput).toHaveValueContaining('://')
		})
	})
})