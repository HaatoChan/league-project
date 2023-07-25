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
	const [dmgDisplay, setDmgDisplay] = useState(true)
	const displayableItems = 2
	const { itemData } = useContext(LobbyContext)

	console.log(itemArray)

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

	/**
	 * Modify damage number for readability.
	 * @param {string} str - The string to modify.
	 * @returns {string} - Returns modified or unmodified string.
	 */
	const modifyDamageString = (str) => {
		if (str.length === 5) {
			const firstTwoDigits = str.slice(0, 2)
			const remainingDigits = str.slice(2)
			return firstTwoDigits + '.' + remainingDigits
		}
		return str // Return the original string if it's not 5 digits long
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
	/**
	 * Controls the dmg display on the player frame.
	 */
	const DmgDisplay = () => {
		if (dmgDisplay) {
			setDmgDisplay(false)
		} else {
			setDmgDisplay(true)
		}
	}
	
	if (!resolvedSmnOne && !resolvedSmnTwo) {
		grabSummoners(summonerOne, summonerTwo)
	}
	if(!champImg) {
		grabChampionImage(championName)
	}

	return ( 
		<div className="playercontainer" style={stats.WIN ? { backgroundColor: 'rgb(17, 19, 54)'} : {backgroundColor: 'rgb(61, 26, 26)'}}>
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
			<div className="damagedealt">
				<img src={arrowRight} alt="right" className="arrow" id='arrowDmgRight' onClick={() => DmgDisplay()}/>
				{dmgDisplay && <p className="totaldmg">{modifyDamageString(stats.TOTAL_DAMAGE_DEALT_TO_CHAMPIONS.toString())}</p> }
				{!dmgDisplay && <p className="damageperminute">{((stats.TOTAL_DAMAGE_DEALT_TO_CHAMPIONS / gameLength) * 60).toFixed(0)} d/m</p> }
				<img src={arrowLeft} alt="left" className="arrow" id='arrowDmgLeft' onClick={() => DmgDisplay()}/>
			</div>
			<div className="csing">
				<img src={arrowLeft} alt="left" className="arrow" id='arrowCsLeft' onClick={() => CsDisplay(-1)}/>
				{ csDisplay === 0 && <p className="totalcs">{stats.MINIONS_KILLED + stats.NEUTRAL_MINIONS_KILLED} CS </p> }
				{ csDisplay === 1 && <p  className='csmin'>{(((stats.MINIONS_KILLED + stats.NEUTRAL_MINIONS_KILLED) / gameLength) * 60).toFixed(1)} CS/m</p>}
				<img src={arrowRight} alt="right" className="arrow" id='arrowCsRight' onClick={() => CsDisplay(1)}/>
			</div>
			{<p className="kda">{stats.CHAMPIONS_KILLED}/{stats.NUM_DEATHS}/{stats.ASSISTS}</p>}
			<div className="itemcontainer">
				{itemArray.map((item, index) => (
					<div className="boxcontainer" key={(item + index) + summonerName}>
						<ImgBox
							contextData={itemData[item]}
							imgUrl={itemData[item]?.img ? itemData[item].img : undefined}
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