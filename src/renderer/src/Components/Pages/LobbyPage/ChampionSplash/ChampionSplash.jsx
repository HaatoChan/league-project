import './championsplash.css'

/**
 * Defines a champion splash from lobby screen.
 * @param {object} root0 - The React props object.
 * @param {string} root0.imgUrl - The URL to the splashart image.
 * @param {string} root0.champName - The champion name.
 * @param {string} root0.summonerSpellOne - The first selected summoner spell
 * @param {string} root0.summonerSpellTwo - The second selected summoner spell.
 * @returns {HTMLElement} - Returns a champion splash.
 */
const ChampionSplash = ({imgUrl, champName, summonerSpellOne, summonerSpellTwo}) => {
	return ( 
		<div className="playerchamp">
			{imgUrl && <img src={imgUrl} alt="" className="champSplashArt" /> }
			{champName && <div className="banner">
				<p className="champname">{champName}</p>
				{summonerSpellOne &&<img src={summonerSpellOne} alt="Summoner One" className="summonerOne" /> }
				{summonerSpellTwo && <img src={summonerSpellTwo} alt="" className="summonerTwo" /> }
			</div>}
		</div>
	)
}
 
export default ChampionSplash