import './sidebar.css'
import { useContext } from 'react'
import Button from '../Button/Button'
import { SideBarContext } from '../../../../Contexts/SideBarContext'



/**
 * Defines a JSX sidebar element.
 * @returns {HTMLElement} Returns a sidebar element.
 */
const SideBar = () => {

	const {valuesOnClick, importOnClick, exportOnClick, valuesOnEnter, valuesOnLeave, saveOnClick} = useContext(SideBarContext)

	return ( 
		<>
			<div className="sideBarDiv" data-testid='sideBarDivTest'>
				<SideBarContext.Consumer>
					{() => {
						return <>
							<Button Text="Save" onClick={saveOnClick} testid="saveButton"/>
							<Button Text="Values" onClick={valuesOnClick}onMouseEnter={valuesOnEnter} onMouseLeave={valuesOnLeave} testid="valuesButton"/>
							<Button Text="Import" onClick={importOnClick} testid="importButton"/>
							<Button Text="Export" onClick={exportOnClick} testid="exportButton"/>	
						</>
					}}	
				</SideBarContext.Consumer>
			</div>
		</>
	)
}
 
export default SideBar