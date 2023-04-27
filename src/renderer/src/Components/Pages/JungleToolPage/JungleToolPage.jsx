import './jungletoolpage.css'
import Map from './Map/Map'
import CampSelectionContextProvider from '../../../Contexts/CampSelectionContext'
import Title from '../../Title/Title'
import ExpDisplay from './ExpDisplay/ExpDisplay'

/**
 * Defines the jungle tool page.
 * @returns {HTMLElement} - Returns a div containing the page.
 */
const JungleToolPage = () => {
	return ( 
		<div className="jungletoolpagecontainer">
			<div className="titleholder">
				<Title titleText='Jungle Gap'></Title>
			</div>
			<CampSelectionContextProvider>
				<div className="mapcontainer">
					<Map></Map>
				</div>
				<div className="expdisplaycontainer">
					<ExpDisplay></ExpDisplay>
				</div>
				<div className="valuesdisplaycontainer">

				</div>
				<div className="champselectcontainer">
					<p className="test">testing testing</p>
				</div>
			</CampSelectionContextProvider>
		</div>
	)
}
 
export default JungleToolPage