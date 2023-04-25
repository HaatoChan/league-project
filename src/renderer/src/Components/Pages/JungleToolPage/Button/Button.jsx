import './button.css'

/**
 * Defines a button element.
 * @param {object} root0 - The React props object.
 * @param {string} root0.Text - The text to show in the button.
 * @param {Function} root0.onClick - The onClick event handler.
 * @param {Function} root0.onMouseEnter - The onMouseEnter event handler.
 * @param {Function} root0.onMouseLeave - The onMouseLeave event handler.
 * @returns {HTMLElement} - Returns a button element.
 */
const Button = ({Text, onClick, onMouseEnter, onMouseLeave}) => {
	return ( 
		<>
			<button className="sideB" onClick={onClick} onMouseEnter={onMouseEnter && onMouseEnter} onMouseLeave={onMouseLeave && onMouseLeave}>{Text}</button>
		</>
	)
}
 
export default Button