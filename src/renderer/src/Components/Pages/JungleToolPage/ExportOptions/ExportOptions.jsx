import { SideBarContext } from '../../../../Contexts/SideBarContext'
import Button from '../Button/Button'
import './exportoptions.css'
import { useContext } from 'react'
/**
 * Defines the options for exporting.
 * @param {object} root0 - The react props object.
 * @param {Function} root0.onMouseEnter - Fired when user mouses over the div.
 * @param {Function} root0.onMouseLeave - Fired when the user leaves the div.
 * @param {Function} root0.jsonClick - Fired when the user clicks the JSON button.
 * @param {Function} root0.urlClick - Fired when the user clicks the URL button.
 * @returns {HTMLElement} - Returns the export options component.
 */
const ExportOptions = ({onMouseEnter, onMouseLeave, jsonClick, urlClick}) => {

	const  {exportOptionsActive} = useContext(SideBarContext)

	return ( 
		<div className="exportoptionscontainer" data-isactive={exportOptionsActive} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
			<Button 
				Text='JSON'
				testid='JSONexport'
				onClick={jsonClick}
			/>
			<Button 
				Text='URL'
				testid='urlExport'
				onClick={urlClick}
			/>
		</div>
	)
}
 
export default ExportOptions