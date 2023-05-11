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

	useEffect(() => {
	//	resetAll()
	},[])

	//	const { newImport } = useContext(SideBarContext)
	const {currentlySelected, setSelectedCamps, resetAll } = useContext(CampSelectionContext)

	//	useEffect(() => {
	//		console.log(newImport)
	//		if (newImport?.route) {
	//			setSelectedCamps([])
	//			campUpdate()
	//		}
	//	},[newImport])

	/**
	 * Clicks the camps in the array.
	 * @param {NodeList} array - A list of html elements.
	 */
	const clickCamps = async (array) => {
		const allCamps = document.getElementsByClassName('buttonCamp')
		for(const elements of allCamps) {
			if(elements.dataset.iscampselected === 'true') {
				await elements.click()
			}
		}
		for(const element of array) {
			const button = document.getElementById(element)
			console.log('triggered in map?')
			await button.click()
		}
	}

	/**
	 *
	 */
	//	const campUpdate = async () => {
	//		const string = atob(newImport.route)
	//		let newArray = []
	//		newArray = string.split(':')
	//		clickCamps(newArray)
	//	}

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