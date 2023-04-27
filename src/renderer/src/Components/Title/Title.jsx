import './title.css'

/**
 * Defines a title element.
 * @param {object} root0 - The React props object.
 * @param {string} root0.titleText - The text to show in the title.
 * @param {string} root0.color - The text color.
 * @returns {HTMLElement} - Returns an H1 element.
 */
const Title = ({titleText, color}) => {
	return ( 
		<h1 className="title" style={{ color: color !== null ? color : 'inherit' }}>
			{titleText}
		</h1>

	)
}
 
export default Title