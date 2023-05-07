import { useContext, useEffect, useState } from 'react'
import './sideselect.css'
import { CampSelectionContext } from '../../../../Contexts/CampSelectionContext'
import { SideBarContext } from '../../../../Contexts/SideBarContext'

/**
 * Defines a sideselector component.
 * @returns {HTMLElement} - Returns a sideselector element
 */
const SideSelect = () => {
  
	const {setSideSelected, sideSelected} = useContext(CampSelectionContext)
	const { newImport } = useContext(SideBarContext)
	const [bluebox, setBlueBox] = useState(true)
	const [redbox, setRedBox] = useState(true)
      
	/**
	 * Verifies that the other checkbox is not unchecked before unchecking the checkbox and updates their state.
	 * @param {HTMLElement} target - The target element
	 */
	const onClickHandle = (target) => {
		const isChecked = target.checked
		if (target.id === 'bluebox') {
			const redBox = document.getElementById('redbox')
			if(!isChecked) {
				if (!redBox.checked) {
					setBlueBox(true)
				}
				else {
					if (!isChecked) {
						setBlueBox(false)
						setSideSelected('Red')
					} else {
						setBlueBox(true)
						setSideSelected('All')
					}
				}
			} else {
				setBlueBox(true)
				setSideSelected('All')
			}
		}
		if (target.id === 'redbox') {
			const blueBox = document.getElementById('bluebox')
			if(!isChecked) {
				if (!blueBox.checked) {
					setRedBox(true)
				}
				else {
					if (!isChecked) {
						setRedBox(false)
						setSideSelected('Blue')
					} else {
						setRedBox(true)
						setSideSelected('All')
					}
				}
			} else {
				setRedBox(true)
				setSideSelected('All')
			}
		}
	}

	useEffect(() => {
		setSideSelected(newImport?.side || 'All')
	},[newImport])
      
	useEffect(() => {
		if(sideSelected === 'All') {
			setBlueBox(true)
			setRedBox(true)
		} else if (sideSelected === 'Red') {
			setBlueBox(false)
			setRedBox(true)
		} else if (sideSelected === 'Blue') {
			setRedBox(false)
			setBlueBox(true)
		}
	},[sideSelected])
  
	return (
		<>
			<p className="selectsidep">Select side(s)</p>
			<label className="sidebox-label" htmlFor="bluebox" id="bluelabel">
				<input
					type="checkbox"
					className="sidebox"
					id="bluebox"
					data-side="Blue"
					data-testid='BlueSide'
					onChange={(e) => onClickHandle(e.target)}
					checked={bluebox}
				/>
			</label>
			<label className="sidebox-label" htmlFor="redbox" id="redlabel">
				<input
					type="checkbox"
					className="sidebox"
					id="redbox"
					data-side="Red"
					onChange={(e) => onClickHandle(e.target)}
					data-testid='RedSide'
					checked={redbox}
				/>
			</label>
		</>
	)
}
  

 
export default SideSelect
