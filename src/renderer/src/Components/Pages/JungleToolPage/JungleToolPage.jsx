import './jungletoolpage.css'
import Map from './Map/Map'
import Title from '../../Title/Title'
import ExpDisplay from './ExpDisplay/ExpDisplay'
import SideBar from './SideBar/SideBar'
import ValuesDisplay from './ValuesDisplay/ValuesDisplay'
import Copied from './Copied/Copied'
import SelectChamp from './SelectChamp/SelectChamp'
import RouteSearch from './RouteSearch/RouteSearch'
import ImportDisplay from './ImportDisplay/ImportDisplay'

/**
 * Defines the jungle tool page.
 * @returns {HTMLElement} - Returns a div containing the page.
 */
const JungleToolPage = () => {
	return ( 
		<div className="jungletoolpagecontainer">
			<div className="titleholder">
				<Title titleText='Jungle Gap' color='white'></Title>
			</div>
			<div className="mapcontainer">
				<Map></Map>
			</div>
			<div className="expdisplaycontainer">
				<ExpDisplay></ExpDisplay>
			</div>
			<div className="champselectcontainer">
				<SelectChamp></SelectChamp>
			</div>
			<div className="valuesdisplaycontainer">
				<ValuesDisplay />
			</div>
			<ImportDisplay />
			<Copied></Copied>
			<SideBar />
			<div className="routesearchcontainer">
				<RouteSearch />
			</div>
		</div>
	)
}
 
export default JungleToolPage