import { useState } from 'react'
import './lobbypage.css'
/**
 * Defines the lobby page
 * @returns {HTMLElement} - Returns the lobby page.
 */
const LobbyPage = () => {

	const [teamArray, setTeamArray] = useState([])
	window.LCUApi.lobbyInfo((_event, value) => {
		console.log(value)
	})

	return ( 
		<div className="lobbypagecontainer">
			<div className="teamcomp">
				<div className="enemytop"></div>
				<div className="enemyjgl"></div>
				<div className="enemymid"></div>
				<div className="enemybot"></div>
				<div className="enemysupp"></div>
				<div className="bluetop"></div>
				<div className="bluejgl"></div>
				<div className="bluemid"></div>
				<div className="bluebot"></div>
				<div className="bluesupp"></div>
			</div>
			<div className="statistics">
                
			</div>
			<div className="mapdiv">
                
			</div>
			<div className="routeselector">
                
			</div>
			<div className="camporder">
                
			</div>
		</div>
	)
}
 
export default LobbyPage