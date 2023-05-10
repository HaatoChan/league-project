import { useContext, useEffect, useState } from 'react'
import './junglecamp.css'
import { CampSelectionContext } from '../../../../Contexts/CampSelectionContext.jsx'


/**
 * Defines a jungle camp element.
 * @param {object} root0 - The react props object.
 * @param {string} root0.theCamp - The name of the camp.
 * @param {string} root0.goldValue  - The gold value of the camp.
 * @param {string} root0.expValue - The exp value of the camp.
 * @param {ImageData} root0.image - The image to display.
 * @returns {HTMLElement} - Returns a jungle camp element.
 */
const JungleCamp = ({ theCamp, goldValue, expValue, image }) => {
	const {campNumber, addToCampNumber, removeFromCampNumber, selectedCamps} = useContext(CampSelectionContext)
	const [campSelected, setCampSelected] = useState(false)
	const [orderInRoute, setOrderInRoute] = useState(null)
	const [positionInArray, setPositionInArray] = useState(null)
	const [imageUrl, setImageUrl] = useState(null)

	useEffect(() => {
		(async () => {
			const url = await image
			setImageUrl(url)
		})()
	}, [image])

	// Some camps use - dashes
	const lastDashIndex = theCamp.lastIndexOf('-')
	const campName = theCamp.substring(0, lastDashIndex)
	useEffect(() => {
		if (campSelected === true && selectedCamps[selectedCamps.length - 1]?.id === theCamp) {
			setOrderInRoute(campNumber)
			setPositionInArray(campNumber - 1)
		} else if (campSelected === true && theCamp !== selectedCamps[positionInArray]?.id) {
			setOrderInRoute(orderInRoute - 1)
			setPositionInArray(positionInArray - 1)
		}
	},[campNumber])

	useEffect(() => {
		if (selectedCamps.length === 0) {
			setCampSelected(false)
			setOrderInRoute(null)
			setPositionInArray(null)
		}
	},[selectedCamps])

	/**
	 * Onclick handler for selecting a camp.
	 * @param {Event} e - The event that triggered the function.
	 */
	const onClickHandle = (e) => {	
		if(campSelected === false) {
			setCampSelected(true)
			setPositionInArray(selectedCamps.length)
			addToCampNumber(e.target)
		} else {
			setCampSelected(false)
			setPositionInArray(null)
			removeFromCampNumber(e.target)
		}	
	}

	return ( 
		<>
			<button className="buttonCamp" data-testid={theCamp} id={theCamp} data-expvalue={expValue} data-goldvalue={goldValue} data-iscampselected={campSelected} onClick={(e) => onClickHandle(e)}>
				{campSelected && <p className="campOrder" data-testid={theCamp + 'p'}>{orderInRoute}</p>}
				<img src={imageUrl} alt={campName} className="campImage" id={campName + 'img'}></img> 
			</button>
		</>
	)
}
 
export default JungleCamp