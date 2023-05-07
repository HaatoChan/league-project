import './map.css'
import map from './images/map11.png'
import JungleCamp from '../JungleCamp/JungleCamp'
import {CampSelectionContext} from '../../../../Contexts/CampSelectionContext'
import ResetButton from '../ResetButton/ResetButton'
import { camps } from '../../../../Data/Arrays'
import { useContext, useEffect } from 'react'
import { SideBarContext } from '../../../../Contexts/SideBarContext'

/**
 * Defines a map element containing the jungle camps.
 * @returns {HTMLElement} Returns a map element.
 */
const Map = () => {
	const { newImport } = useContext(SideBarContext)

	useEffect(() => {
		console.log(newImport?.route)
		if (newImport?.route) {
			const string = atob(newImport.route)
			console.log(string)
			let newArray = []
			newArray = string.split(':')
			testFunc(newArray)
		}
	},[newImport])

	/**
	 *
	 * @param array
	 */
	const testFunc = async (array) => {
		const reset = document.getElementById('resetAllCamps')
		await reset.click()
		for(const element of array) {
			const button = document.getElementById(element)
			await button.click()
		}
	}

	return (
		<CampSelectionContext.Consumer>
			{() => (
				<div className="mapwrap">
					<ResetButton />
					<img src={map} alt="gamemap" className="mapholder" />
					{camps.map((camp) => (
						<JungleCamp
							key={camp.position}
							theCamp={camp.position}
							goldValue={camp.goldValue}
							expValue={camp.expValue}
							image={camp.image}
						/>
					))}
				</div>
			)}
		</CampSelectionContext.Consumer>
	)
}
 
export default Map