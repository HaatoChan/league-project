import { useContext } from 'react'
import './copied.css'
import { SideBarContext } from '../../Contexts/SideBarContext'

/**
 * Returns a div telling the user something was copied.
 * @returns {JSX.Element} - Returns an alert message.
 */
const Copied = () => {

	const  {copiedActive}  = useContext(SideBarContext)

	return ( 
		<div className="copied" data-isdisplayed={copiedActive}>
			<p className="copiedP">Saved to clipboard</p>
		</div>
	)
}
 
export default Copied