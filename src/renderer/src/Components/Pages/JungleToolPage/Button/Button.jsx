import './button.css'

/**
 * Defines a button element.
 * @param {object} root0 - The React props object.
 * @param {string} root0.Text - The text to show in the button.
 * @param {Function} root0.onClick - The onClick event handler.
 * @param {Function} root0.onMouseEnter - The onMouseEnter event handler.
 * @param {Function} root0.onMouseLeave - The onMouseLeave event handler.
 * @param {string} root0.testid - The testid.
 * @returns {HTMLElement} - Returns a button element.
 */
const Button = ({Text, onClick, onMouseEnter, onMouseLeave, testid}) => {
	return ( 
		<>
			<button className="sideB" data-testid={testid} onClick={onClick} onMouseEnter={onMouseEnter && onMouseEnter} onMouseLeave={onMouseLeave && onMouseLeave}>{Text}</button>
		</>
	)
}
 
export default Button