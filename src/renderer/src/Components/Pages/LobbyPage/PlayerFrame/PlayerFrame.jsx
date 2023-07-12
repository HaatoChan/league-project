import './playerframe.css'

/**
 * Renders information about an individual player at the end of a game.
 * @param {object} root0 - The React props object.
 * @param {string} root0.summonerName - The name of the player.
 * @param {Array} root0.itemArray - The array of item ids.
 * @param {object} root0.stats - Object holding the players stats.
 * @param {number} root0.summonerOne - The first summoner spell id.
 * @param {number} root0.summonerTwo - The second summoner spell id.
 * @returns {HTMLElement} - Returns a HTML element with player information.
 */
const PlayerFrame = ({summonerName, itemArray, stats, summonerOne, summonerTwo}) => {
	console.log(stats)
	return ( 
		<div className="playercontainer">
			<div className="champImgContainer">
				<img src="" alt="" />
			</div>
			<p className='playername'>{summonerName}</p>
			{<p className="kda">{stats.CHAMPIONS_KILLED}/{stats.NUM_DEATHS}/{stats.ASSISTS}</p>}
		</div>
	)
}

 
export default PlayerFrame