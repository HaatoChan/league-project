import './settingspage.css'
import Title from '../../Title/Title'

/**
 * Defines a settings page.
 * @returns {HTMLElement} - Returns a div containing the page content.
 */
const SettingsPage = () => {
	return ( 
		<div className="settingspagecontainer">
			<div className="titleholder">			
				<Title titleText='Settings'></Title>
			</div>
			<div className="settings">
				<div className="windowsize">
					<p>Select your resolution</p>
					<div className="radioinputres">
						<label>
							<input type="radio" name="resolution" id="1920x1080" />
                          1920x1080
						</label>
						<label>
							<input type="radio" name="resolution" id="1600x900" />
                           1600x900
						</label>
					</div>
				</div>
				<div className="othersetting">
					<p>Description for other setting</p>
				</div>
				<input type="button" value="OK" id="oksetting" onClick={() => {
					window.api.resizeWindow(500, 500)
				}}/>
			</div>
		</div>
	)
}
 
export default SettingsPage