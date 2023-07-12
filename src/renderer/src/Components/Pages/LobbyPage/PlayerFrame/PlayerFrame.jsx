import ImgBox from '../ImgBox/ImgBox'
import './playerframe.css'

/**
 * Renders information about an individual player at the end of a game.
 * @param {object} root0 - The React props object.
 * @param {string} root0.summonerName - The name of the player.
 * @param {Array} root0.itemArray - The array of item ids.
 * @param {object} root0.stats - Object holding the players stats.
 * @param {number} root0.summonerOne - The first summoner spell id.
 * @param {number} root0.summonerTwo - The second summoner spell id.
 * @param {number} root0.trinket - The trinket of the player.
 * @returns {HTMLElement} - Returns a HTML element with player information.
 */
const PlayerFrame = ({summonerName, itemArray, stats, summonerOne, summonerTwo, trinket}) => {
	console.log(stats)
	return ( 
		<div className="playercontainer">
			<div className="champImgContainer">
				<img src="" alt="" />
			</div>
			<div className="summonerspellcontainer">
				<ImgBox />
				<ImgBox />
			</div>
			<p className='playername'>{summonerName}</p>
			<div className="csing">
				<p className="csmin">{stats.MINIONS_KILLED + stats.NEUTRAL_MINIONS_KILLED} CS</p>
			</div>
			{<p className="kda">{stats.CHAMPIONS_KILLED}/{stats.NUM_DEATHS}/{stats.ASSISTS}</p>}
			<div className="itemcontainer">
				{itemArray.map((item) => (
					<div className="boxcontainer" key={item}>
						<ImgBox />
					</div>
				))}
			</div>
		</div>
	)
}

 
export default PlayerFrame