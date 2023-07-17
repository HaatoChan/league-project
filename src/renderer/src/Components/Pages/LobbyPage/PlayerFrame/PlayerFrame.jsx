import ImgBox from '../ImgBox/ImgBox'
import './playerframe.css'
import { useContext, useState } from 'react'
import { championNames } from '../../../../Data/Arrays'
import { summonerIds } from '../../../../Data/Objects'
import { LobbyContext } from '../../../../Contexts/LobbyPageContext'
import arrowRight from '../../../../assets/Arrows/arrow right.svg'
import arrowLeft from '../../../../assets/Arrows/arrow left.svg'

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
 * @param {number} root0.gameLength - The number of total seconds in the game
 * @returns {HTMLElement} - Returns a HTML element with player information.
 */
const PlayerFrame = ({summonerName, itemArray, stats, summonerOne, summonerTwo, trinket, championName, gameLength}) => {
	const [champImg, setChampImg] = useState()
	const [resolvedSmnOne, setResolvedSmnOne] = useState()
	const [resolvedSmnTwo, setResolvedSmnTwo] = useState()
	const [csDisplay, setCsDisplay] = useState(0)
	const displayableItems = 2
	const { itemData } = useContext(LobbyContext)
	console.log(gameLength)
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
		console.log('grabbing')
		setResolvedSmnOne(await summonerIds[summonerOne].image)
		setResolvedSmnTwo(await summonerIds[summonerTwo].image)
	}

	/**
	 * Handles which statistics to show when the arrows are pressed.
	 * @param {number} adjust - A positive or a negative number telling the function whether to increment or decrement the state.
	 */
	const CsDisplay = (adjust) => {
		if (adjust > 0 && !((csDisplay + 1) > (displayableItems - 1))) {
			setCsDisplay(csDisplay + 1)
		} else if (adjust < 0 && !((csDisplay - 1) < 0)) {
			setCsDisplay(csDisplay -1)
		} else if (adjust > 0 && ((csDisplay + 1) > (displayableItems - 1))) {
			setCsDisplay(0)
		} else if ( adjust < 0 && ((csDisplay - 1) < 0)) {
			setCsDisplay(displayableItems - 1)
		}
	}
	if (!resolvedSmnOne && !resolvedSmnTwo) {
		grabSummoners(summonerOne, summonerTwo)
	}
	if(!champImg) {
		grabChampionImage(championName)
	}

	return ( 
		<div className="playercontainer" style={stats.WIN ? { backgroundColor: 'black'} : {backgroundColor: 'black'}}>
			<div className="champImgContainer">
				<img src={champImg} alt="" className='playerFrameChampion'/>
				<div className="levelcontainer">
					<p className="level">{stats.LEVEL}</p>
				</div>
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
				<img src={arrowLeft} alt="left" className="arrow" id='arrowLeft' onClick={() => CsDisplay(-1)}/>
				{ csDisplay === 0 && <p className="totalcs">{stats.MINIONS_KILLED + stats.NEUTRAL_MINIONS_KILLED} CS </p> }
				{ csDisplay === 1 && <p  className='csmin'>{(((stats.MINIONS_KILLED + stats.NEUTRAL_MINIONS_KILLED) / gameLength) * 60).toFixed(1)} CS/m</p>}
				<img src={arrowRight} alt="right" className="arrow" id='arrowRight' onClick={() => CsDisplay(1)}/>
			</div>
			{<p className="kda">{stats.CHAMPIONS_KILLED}/{stats.NUM_DEATHS}/{stats.ASSISTS}</p>}
			<div className="itemcontainer">
				{itemArray.map((item) => (
					<div className="boxcontainer" key={item}>
						<ImgBox 
							imgUrl={itemData[item].img}
						/>
					</div>
				))}
			</div>
			<div className="trinket">
				<img src={itemData[trinket].img} alt="" className='trinketimg'/>
			</div>
		</div>
	)
}

 
export default PlayerFrame