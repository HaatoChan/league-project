import './settingspage.css'
import Title from '../../Title/Title'
import { useEffect, useState } from 'react'

/**
 * Defines a settings page.
 * @returns {HTMLElement} - Returns a div containing the page content.
 */
const SettingsPage = () => {

	const [resolution, setResolution] = useState()

	useEffect(() => {
		/**
		 * Gets the sizes from the renderer
		 */
		const getSizesFromRenderer = async () => {
			const sizes = await window.api.getSizes()
			console.log(sizes)
			if (sizes[0] === 1920) {
				const radio = document.getElementById('1920x1080')
				radio.defaultChecked = true
			} else if (sizes[0] === 1600) {
				const radio = document.getElementById('1600x900')
				radio.defaultChecked = true
			}
		}
		getSizesFromRenderer()
	}, [])

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
							<li className="resolutionopt" id="1920x1080">1920x1080</li>
							<li className="resolutionopt" id="1600x900">1600x900</li>
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