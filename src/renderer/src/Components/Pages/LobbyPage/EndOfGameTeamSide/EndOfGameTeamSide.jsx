import PlayerFrame from '../PlayerFrame/PlayerFrame'
import './endofgameteamside.css'

/**
 * Renders information about a team with data from end of game client data.
 * @param {object} root0 - The React props object.
 * @param {Array} root0.playerArray - The array of players to display data for.
 * @returns {HTMLElement} - Returns html element for the team
 */
const EndOfGameTeamSide = ({playerArray}) => {
	console.log(playerArray)
	return ( 
		<div className="teamcontainer">
			{playerArray && playerArray.map((player) => (
				<PlayerFrame
					key={player.summonerId}
					summonerName={player.summonerName}
					stats={player.stats}
					trinket={player.items[player.items.length - 1]}
					itemArray={player.items.slice(0, -1)}
				/>
			))}
		</div>
	)
}
 
export default EndOfGameTeamSide