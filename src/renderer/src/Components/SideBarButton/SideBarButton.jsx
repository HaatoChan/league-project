import { Link } from 'react-router-dom'
import './sidebarbutton.css'

/**
 * Defines a button element for the electron sidebar.
 * @param {object} root0 - The react props object.
 * @param {string} root0.text - The text to display in the button.
 * @param {string} root0.imgSource - The img source.
 * @param {string} root0.linkHref - The path to link to.
 * @param {object} root0.style - Style object.
 * @returns {HTMLElement} - Returns a HTML button element.
 */
const SideBarButton = ({text, imgSource, linkHref, style}) => {
	return ( 
		<>
			<div className="sidebarbutton">
				<Link className='sidebarA' to={linkHref}>	
					<img src={imgSource} alt="" className="buttonimg" style={style}/>
					<p className='buttonText'>{text}</p>
				</Link>
			</div>
		</>
	)
}
 
export default SideBarButton