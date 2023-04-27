import './sidebar.css'
import { useContext } from 'react'
import Button from '../Button/Button'
import { SideBarContext } from '../../../../Contexts/SideBarContext'



/**
 * Defines a JSX sidebar element.
 * @returns {HTMLElement} Returns a sidebar element.
 */
const SideBar = () => {

	const {valuesOnClick, importOnClick, exportOnClick, valuesOnEnter, valuesOnLeave} = useContext(SideBarContext)

	return ( 
		<>
			<div className="sideBarDiv">
				<SideBarContext.Consumer>
					{() => {
						return <>
							<Button Text="Values" onClick={valuesOnClick}onMouseEnter={valuesOnEnter} onMouseLeave={valuesOnLeave}/>
							<Button Text="Import" onClick={importOnClick}/>
							<Button Text="Export" onClick={exportOnClick}/>	
						</>
					}}	
				</SideBarContext.Consumer>
			</div>
		</>
	)
}
 
export default SideBar