import './settingspage.css'
import Title from '../../Title/Title'
import { useEffect, useState } from 'react'

/**
 * Defines a settings page.
 * @returns {HTMLElement} - Returns a div containing the page content.
 */
const SettingsPage = () => {

	const [resolution, setResolution] = useState()
	const resolutionOptions = ['1920x1080', '1600x900']
	const [showResOptions, setShowResOptions] = useState(false)

	useEffect(() => {
		/**
		 * Gets the sizes from the renderer
		 */
		const getSizesFromRenderer = async () => {
			const sizes = await window.api.getSizes()
			sizes[2] = sizes[1]
			sizes[1] = 'x'
			setResolution(sizes.join(''))
		}
		getSizesFromRenderer()
	}, [])

	/**
	 * Handles clicks on the window, and sets the showResOptions state to false if the click target
	 * is not a descendant of the .resses element.
	 * @param {MouseEvent} event - The click event object.
	 */
	const handleClick = (event) => {
		if (!event.target.closest('.resses')) {
			setShowResOptions(false)
		}
	}
  
	/**
	 * Adds an event listener to the window to handle clicks, and returns a cleanup function that removes
	 * the event listener when the component unmounts.
	 * @returns {void}
	 */
	useEffect(() => {
		window.addEventListener('click', handleClick)
		return () => {
			window.removeEventListener('click', handleClick)
		}
	}, [])
  
	
	/**
	 * Sets the selected resolution to the matched event emitter.
	 * @param {string} resolutionClicked - The resolution to set.
	 */
	const resOptOnClick = (resolutionClicked) => {
		setResolution(resolutionClicked)
	}

	return ( 
		<div className="settingspagecontainer">
			<div className="titleholder">			
				<Title titleText='Settings'></Title>
			</div>
			<div className="settings">
				<div className="windowsize">
					<p>Select your resolution</p>
					<div className="radioinputres">
						<ul className="resses">
							<li className="resopt" id="selectedresolution" onClick={() => setShowResOptions(true)
							}>{resolution}</li>
							{showResOptions && resolutionOptions.map((option) => {
								if (option !== resolution) { // exclude the element that matches the state
									return (
										<li className="resopt" key={option} onClick={() => resOptOnClick(option)}>
											{option}
										</li>
									)
								}
								return null // return null for the excluded element
							})}
						</ul>
					</div>
				</div>
				<div className="othersetting">
					<p>Description for other setting</p>
				</div>
				<input type="button" value="OK" id="oksetting" data-testid="okButton" onClick={() => {
					const resolutions = document.getElementsByName('resolution')
					let width
					let height
					for (let i = 0; i < resolutions.length; i++) {
						if(resolutions[i].checked) {
							const dimensions = resolutions[i].id.split('x')
							width = Number(dimensions[0])
							height = Number(dimensions[1])
						}
					}
					window.api.resizeWindow(width, height)
				}}/>
			</div>
		</div>
	)
}
 
export default SettingsPage