import './sidebar.css'
import { useContext } from 'react'
import Button from '../Button/Button'
import { SideBarContext } from '../../../../Contexts/SideBarContext'
import ExportOptions from '../ExportOptions/ExportOptions'
import { CampSelectionContext } from '../../../../Contexts/CampSelectionContext'


/**
 * Defines a JSX sidebar element.
 * @returns {HTMLElement} Returns a sidebar element.
 */
const SideBar = () => {
	const {exportUrl, exportObject} = useContext(CampSelectionContext)
	const {valuesOnClick, importOnClick, exportOnClick, valuesOnEnter, valuesOnLeave, saveOnClick, exportOnHover, exportOnLeave, setCopiedActive} = useContext(SideBarContext)

	return ( 
		<>
			<div className="sideBarDiv" data-testid='sideBarDivTest'>
				<SideBarContext.Consumer>
					{() => {
						return <>
							<Button Text='Save' onClick={saveOnClick} testid="saveButton"/>
							<Button Text="Values" onClick={valuesOnClick} onMouseEnter={valuesOnEnter} onMouseLeave={valuesOnLeave} testid="valuesButton"/>
							<Button Text="Import" onClick={importOnClick} testid="importButton"/>
							<Button Text="Export" onClick={exportOnClick} onMouseLeave={exportOnLeave} onMouseEnter={exportOnHover} testid="exportButton">		
							</Button>	
							<ExportOptions onMouseEnter={exportOnHover} onMouseLeave={exportOnLeave} 
								jsonClick={async () => {
									try {
										await navigator.clipboard.writeText(JSON.stringify(exportObject))
										setCopiedActive(true)
										setTimeout(() => {
											setCopiedActive(false)
										}, 2000)
									} catch (err) {
										console.log('fail')
									}
								}} 
								urlClick={async () => {
									try {
										await navigator.clipboard.writeText(exportUrl)
										setCopiedActive(true)
										setTimeout(() => {
											setCopiedActive(false)
										}, 2000)
									} catch (err) {
										console.log('fail')
									} 
								}}/>
						</>
					}}	
				</SideBarContext.Consumer>
			</div>
		</>
	)
}
 
export default SideBar