import { useState, useRef, useEffect } from 'react'
import './imgbox.css'
import  placeholder from '../../../../assets/square-48.png'

/**
 * A box for displaying an image.
 * @param {object} root0 - The React props object.
 * @param {string} root0.imgUrl - The resolved url of the image to display.
 * @param {object} root0.contextData - Contains information about the spell or item being displayed.
 * @returns {HTMLElement} - Returns a box displaying an image.
 */
const ImgBox = ({imgUrl, contextData}) => {
	const [displayBox, setDisplayBox] = useState(false)
	const descriptionBoxRef = useRef(null)
	const [boxStyle, setBoxStyle] = useState({top: '100%'})
	useEffect(() => {
		const descriptionBoxElement = descriptionBoxRef.current
		if (descriptionBoxElement) {
			const elementRect = descriptionBoxElement.getBoundingClientRect()
			const viewportHeight = window.innerHeight
			if(elementRect.bottom > viewportHeight) {
				setBoxStyle({bottom: '100%'})
			}
		}
	},[displayBox])

	function grabItemMarkup() {
		return {__html: contextData.description}
	}
	
	return ( 
		<div className="divbox">
			{ displayBox && <div ref={descriptionBoxRef} style={boxStyle} className="descriptionbox">
				<p className="nameofitem">{contextData.name} <span className='goldcost'>{contextData.gold.total} ({contextData.gold.base})</span></p>
				<p dangerouslySetInnerHTML={grabItemMarkup()}></p>
			</div> 
			}
			<img src={imgUrl ? imgUrl : placeholder } alt="" className="boximg" onMouseEnter={() => {
				if(contextData) {
					setDisplayBox(true)
				}
			}} onMouseLeave={() => setDisplayBox(false)}/>
		</div>
	)
}
 
export default ImgBox