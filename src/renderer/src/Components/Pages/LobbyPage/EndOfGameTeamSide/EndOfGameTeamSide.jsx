import PlayerFrame from '../PlayerFrame/PlayerFrame'
import './endofgameteamside.css'

/**
 * Renders information about a team with data from end of game client data.
 * @param {object} root0 - The React props object.
 * @param {Array} root0.playerArray - The array of players to display data for.
 * @param {number} root0.gameLength - Total length of game in seconds.
 * @returns {HTMLElement} - Returns html element for the team
 */
const EndOfGameTeamSide = ({playerArray, gameLength}) => {
	return ( 
		<div className="teamcontainer">
			{playerArray && playerArray.map((player) => (
				<PlayerFrame
					key={player.summonerId}
					summonerName={player.summonerName}
					stats={player.stats}
					trinket={player.items[player.items.length - 1]}
					itemArray={player.items.slice(0, -1)}
					championName={player.championName}
					summonerOne={player.spell1Id}
					summonerTwo={player.spell2Id}
					gameLength={gameLength}
				/>
			))}
		</div>
	)
}
 
export default EndOfGameTeamSide