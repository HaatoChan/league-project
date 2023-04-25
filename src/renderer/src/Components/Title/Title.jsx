import './title.css'

/**
 * Defines a title element.
 * @param {object} root0 - The React props object.
 * @param {string} root0.titleText - The text to show in the title.
 * @returns {HTMLElement} - Returns an H1 element.
 */
const Title = ({titleText}) => {
	return ( 
		<h1 className="title">{titleText}</h1>
	)
}
 
export default Title