import ImgBox from '../ImgBox/ImgBox'
import './playerframe.css'
import Ward from '../../../../assets/item/3340.png'
import { useState } from 'react'
import { championNames } from '../../../../Data/Arrays'
import { summonerIds } from '../../../../Data/Objects'

/**
 * Renders information about an individual player at the end of a game.
 * @param {object} root0 - The React props object.
 * @param {string} root0.summonerName - The name of the player.
 * @param {Array} root0.itemArray - The array of item ids.
 * @param {object} root0.stats - Object holding the players stats.
 * @param {number} root0.summonerOne - The first summoner spell id.
 * @param {number} root0.summonerTwo - The second summoner spell id.
 * @param {number} root0.trinket - The trinket of the player.
 * @param {string} root0.championName - Name of the champion.
 * @returns {HTMLElement} - Returns a HTML element with player information.
 */
const PlayerFrame = ({summonerName, itemArray, stats, summonerOne, summonerTwo, trinket, championName}) => {

	const [champImg, setChampImg] = useState()
	const [resolvedSmnOne, setResolvedSmnOne] = useState()
	const [resolvedSmnTwo, setResolvedSmnTwo] = useState()
	/**
	 * Grabs the square portrait of a champion and resolves image path.
	 * @param {string} champName - The name of the champion.
	 */
	const grabChampionImage = async (champName) => {
		for (let i = 0; i < championNames.length; i++) {
			if (championNames[i].name === champName) {
				const imgUrl = await championNames[i].image
				setChampImg(imgUrl)
			}
		}
	}

	/**
	 * Resolved the players selected summoner spells to valid image urls.
	 * @param {number} summonerOne - The id of the first selected summoner spell.
	 * @param {number} summonerTwo - The id of the second selected summoner spell-
	 */
	const grabSummoners = async (summonerOne, summonerTwo) => {
		setResolvedSmnOne(await summonerIds[summonerOne].image)
		setResolvedSmnTwo(await summonerIds[summonerTwo].image)
	}

	grabSummoners(summonerOne, summonerTwo)
	grabChampionImage(championName)
	

	return ( 
		<div className="playercontainer">
			<div className="champImgContainer">
				<img src={champImg} alt="" className='playerFrameChampion'/>
			</div>
			<div className="summonerspellcontainer">
				<ImgBox 
					imgUrl={resolvedSmnOne}
				/>
				<ImgBox 
					imgUrl={resolvedSmnTwo}
				/>
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
			<div className="trinket">
				<img src={Ward} alt="" className='trinketimg'/>
			</div>
		</div>
	)
}

 
export default PlayerFrame