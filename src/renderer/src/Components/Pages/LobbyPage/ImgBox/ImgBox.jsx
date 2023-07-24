import { useState } from 'react'
import './imgbox.css'

/**
 * A box for displaying an image.
 * @param {object} root0 - The React props object.
 * @param {string} root0.imgUrl - The resolved url of the image to display.
 * @param {object} root0.contextData - Contains information about the spell or item being displayed.
 * @returns {HTMLElement} - Returns a box displaying an image.
 */
const ImgBox = ({imgUrl, contextData}) => {
	const [displayBox, setDisplayBox] = useState(false)

	function grabItemMarkup() {
		return {__html: contextData.description}
	}
	return ( 
		<div className="divbox">
			{ displayBox && <div className="descriptionbox">
				<p className="nameofitem">{contextData.name} <span className='goldcost'>{contextData.gold.total} ({contextData.gold.base})</span></p>
				<p dangerouslySetInnerHTML={grabItemMarkup()}></p>
			</div> 
			}
			<img src={imgUrl} alt="" className="boximg" onMouseEnter={() => {
				if(contextData) {
					setDisplayBox(true)
				}
			}} onMouseLeave={() => setDisplayBox(false)}/>
		</div>
	)
}
 
export default ImgBox