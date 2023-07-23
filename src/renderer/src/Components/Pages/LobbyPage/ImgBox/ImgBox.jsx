import './imgbox.css'

/**
 * A box for displaying an image.
 * @param {object} root0 - The React props object.
 * @param {string} root0.imgUrl - The resolved url of the image to display.
 * @param {Function} root0.onHover - The function to fire when the image is hovered.
 * @returns {HTMLElement} - Returns a box displaying an image.
 */
const ImgBox = ({imgUrl, onHover}) => {
	return ( 
		<div className="divbox">
			<img src={imgUrl} alt="" className="boximg" onMouseEnter={onHover}/>
		</div>
	)
}
 
export default ImgBox