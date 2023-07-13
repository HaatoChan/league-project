import './imgbox.css'

/**
 * A box for displaying an image.
 * @param {object} root0 - The React props object.
 * @param {string} root0.imgUrl - The resolved url of the image to display.
 * @returns {HTMLElement} - Returns a box displaying an image.
 */
const ImgBox = ({imgUrl}) => {
	return ( 
		<div className="divbox">
			<img src={imgUrl} alt="" className="boximg" />
		</div>
	)
}
 
export default ImgBox