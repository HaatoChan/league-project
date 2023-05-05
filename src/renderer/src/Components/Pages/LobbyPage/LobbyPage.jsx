import { useState } from 'react'
import './lobbypage.css'
import { championIds } from '../../../Data/Objects'
/**
 * Defines the lobby page
 * @returns {HTMLElement} - Returns the lobby page.
 */
const LobbyPage = () => {

	const [teamArray, setTeamArray] = useState([])
	window.LCUApi.lobbyInfo((_event, value) => {
		const combinedTeamArray = [...value.myTeam, ...value.theirTeam]
		console.log(value.myTeam[0].championId)
		setTeamArray(combinedTeamArray)
	})

	return ( 
		<div className="lobbypagecontainer">
			<div className="teamcomp">
				<div className="enemytop">			
					{Array.isArray(teamArray) && teamArray[5]?.championId !== 0 && championIds[teamArray[5]?.championId]?.name}
				</div>
				<div className="enemyjgl">			
					{Array.isArray(teamArray) && teamArray[6]?.championId !== 0 && championIds[teamArray[6]?.championId]?.name}
				</div>
				<div className="enemymid">				
					{Array.isArray(teamArray) && teamArray[7]?.championId !== 0 && championIds[teamArray[7]?.championId]?.name}
				</div>
				<div className="enemybot">				
					{Array.isArray(teamArray) && teamArray[8]?.championId !== 0 && championIds[teamArray[8]?.championId]?.name}
				</div>
				<div className="enemysupp">				
					{Array.isArray(teamArray) && teamArray[9]?.championId !== 0 && championIds[teamArray[9]?.championId]?.name}
				</div>
				<div className="bluetop">
					{Array.isArray(teamArray) && teamArray[0]?.championId !== 0 && championIds[teamArray[0]?.championId]?.name}
				</div>
				<div className="bluejgl">			
					{Array.isArray(teamArray) && teamArray[1]?.championId !== 0 && championIds[teamArray[1]?.championId]?.name}
				</div>
				<div className="bluemid">				
					{Array.isArray(teamArray) && teamArray[2]?.championId !== 0 && championIds[teamArray[2]?.championId]?.name}
				</div>
				<div className="bluebot">				
					{Array.isArray(teamArray) && teamArray[3]?.championId !== 0 && championIds[teamArray[3]?.championId]?.name}
				</div>
				<div className="bluesupp">				
					{Array.isArray(teamArray) && teamArray[4]?.championId !== 0 && championIds[teamArray[4]?.championId]?.name}
				</div>
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