import { useEffect, useState, useContext } from 'react'
import './lobbypage.css'
import { LobbyContext } from '../../../Contexts/LobbyPageContext'
import ChampionSplash from './ChampionSplash/ChampionSplash'

/**
 * Defines the lobby page
 * @returns {HTMLElement} - Returns the lobby page.
 */
const LobbyPage = () => {

	const {championIds, teamArray, imgArray} = useContext(LobbyContext)

	return ( 
		<div className="lobbypagecontainer">
			<div className="teamcomp">
				{teamArray.map((player, index) => (
					<ChampionSplash 
						key={player.cellId}
						champName={championIds[player?.championId]?.name}
						imgUrl={imgArray[index]?.championImage}
						summonerSpellOne={imgArray[index]?.spell1Id}
						summonerSpellTwo={imgArray[index]?.spell2Id}
					/>
				))}
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