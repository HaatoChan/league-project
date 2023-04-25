import './sidebarbutton.css'

/**
 * Defines a button element for the electron sidebar.
 * @param {object} root0 - The react props object.
 * @param {string} root0.text - The text to display in the button.
 * @param {string} root0.imgSource - The img source.
 * @param {Function} root0.onClick - The onclick event to fire when the user presses the div.
 * @returns {HTMLElement} - Returns a HTML button element.
 */
const SideBarButton = ({text, imgSource, onClick}) => {
	return ( 
		<>
			<div className="sidebarbutton" onClick={onClick}>			
				<img src={imgSource} alt="" className="buttonimg" />
				<p className='buttonText'>{text}</p> 
			</div>
		</>
	)
}
 
export default SideBarButton