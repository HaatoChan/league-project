import { useContext, useState, useEffect } from 'react'
import './lobbypage.css'
import { LobbyContext } from '../../../Contexts/LobbyPageContext'
import ChampionSplash from './ChampionSplash/ChampionSplash'
import Map from '../JungleToolPage/Map/Map'
import RouteSearch from '../JungleToolPage/RouteSearch/RouteSearch'
import { CampSelectionContext } from '../../../Contexts/CampSelectionContext'
import ExpDisplay from '../JungleToolPage/ExpDisplay/ExpDisplay'
import SelectChamp from '../JungleToolPage/SelectChamp/SelectChamp'
import { SideBarContext } from '../../../Contexts/SideBarContext'
import ImportDisplay from '../JungleToolPage/ImportDisplay/ImportDisplay'
import { championNames } from '../../../Data/Arrays'

/**
 * Defines the lobby page
 * @param {object} root0 - The React props object.
 * @param {object} root0.endOfGameData - The end of game data provided by app
 * @returns {HTMLElement} - Returns the lobby page.
 */
const LobbyPage = ({endOfGameData}) => {

	const {exportObject, routeName, routeGameData, setRouteGameData, setRouteName} = useContext(CampSelectionContext)
	const {championIds, teamArray, imgArray, enemyTeam} = useContext(LobbyContext)
	const {importOnClick} = useContext(SideBarContext)
	const [enemyTeamDisplay, setEnemyTeamDisplay] = useState(null)
	const [endOfGameTeamOne, setEndOfGameTeamOne] = useState([])
	const [endOfGameTeamTwo, setEndOfGameTeamTwo] = useState([])
	window.LCUApi.gameStarting(async () => {
		window.LCUApi.setRoute(routeGameData)
	})

	window.LCUApi.updateRouteData(async (_event, routeData) => {
		setRouteGameData(routeData.gameData)
		setRouteName(routeData.name)
	})

	window.LCUApi.lobbyExited(async () => {
		setEnemyTeamDisplay(null)
	})

	/**
	 * Adds the images of the enemy team to display.
	 * @param {string} champName - The champName to grab image from.
	 * @returns {string} - Returns the url in string format
	 */
	const addEnemyImages = async (champName) => {
		for (let i = 0; i < championNames.length; i++) {
			if (championNames[i].name === champName) {
				const imgUrl = await championNames[i].image
				return imgUrl
			}
		}
	}

	useEffect(() => {
		if(endOfGameData !== null) {
			console.log(endOfGameData)
			console.log(endOfGameData.teams)
			setEndOfGameTeamOne(endOfGameData.teams[0])
			setEndOfGameTeamTwo(endOfGameData.teams[1])
			console.log(endOfGameTeamOne)
			console.log(endOfGameTeamTwo)
		}
	},[endOfGameData])

	useEffect( () => {
		if (enemyTeam && Object.keys(routeGameData).length > 0) {
			/**
			 * Grabs the correct route statistics and adds the corresponding image.
			 */
			const grabEnemyTeam = async () => {
				if (Object.keys(routeGameData).length > 0 && enemyTeam.length > 0) {
				// eslint-disable-next-line no-unsafe-optional-chaining
					const enemyArray = (routeGameData?.vsChampion.map((vsChampObj) => {
						for (let i = 0; i < enemyTeam.length; i++) {
							if (Object.keys(vsChampObj)[0] === enemyTeam[i].championId.toString()) {
								const {name, totalWr, totalGames, totalWins, totalLosses} = vsChampObj[Object.keys(vsChampObj)[0]]
								return {name, totalWr, totalGames, totalWins, totalLosses}
							}
						}
					})).filter(Boolean)				
					for(const champion of enemyArray) {
						champion.imgUrl = await addEnemyImages(champion.name)
					}
					setEnemyTeamDisplay(enemyArray)
				}
			}
			grabEnemyTeam()
		}
	},[enemyTeam])

	return ( 
		<div className="lobbypagecontainer">
			<div className="teamcomp">
				{teamArray && teamArray.map((player, index) => (
					<ChampionSplash 
						key={player.cellId}
						champName={championIds[player?.championId]?.name}
						imgUrl={imgArray[index]?.championImage}
						summonerSpellOne={imgArray[index]?.spell1Id}
						summonerSpellTwo={imgArray[index]?.spell2Id}
					/>
				))}
				{}
			</div>
			<div className="statistics">
				<h1 className="gamestarting">{routeName}</h1>
				<div className="enemyteamdata">
					{routeGameData.vsChampion && enemyTeamDisplay && <div className="championSpec">
						{enemyTeamDisplay.map((champion) => (
							<div className="champSpecInfo" key={champion.name + 'div'}>
								<img src={champion.imgUrl} alt="" className='enemyJglStatisticImg'/>
								<p className="" key={champion.name}>{champion.name}</p>
								<p>{champion.totalWr}</p>
							</div>
						))}
					</div>
					}
				</div>
			</div>
			<div className="mapdiv">
				<Map padding='0rem' />
			</div>
			<div className="routeselector">
				<div className="overalldiv">
					<p className="totalwr">Winrate: {routeGameData.totalWr}</p>
					<br />
					<p className="totalGames">Games: {routeGameData.totalGames}</p>
					<br />
					<p className="totalWins">Wins {routeGameData.totalWins}</p>
					<p className="totalLosses">Losses {routeGameData.totalLosses}</p>
				</div>
				<RouteSearch inputStyle={{
					width: '55%',
					height: '15%',
					left: '0.5%',
					top: '92%'
				}}
				optionsStyle={{
					top: '83.5%',
					width: '100%'
				}}
				deleteAreaStyle={{
					top: '73%',
					left: '39.1%',
					width: '23%',
					backgroundColor: 'transparent'
				}}
				confirmDeletionStyle={{
					top: '148%',
					height: '117%',
					width: '100%',
					textAlign: 'center'
				}}
				createButtonStyle={{
					height: '15%',
					left: '57%',
					top: '92.1%'
				}}
				deleteButtonStyle={{
					position: 'fixed',
					top: '79%',
					left: '59.5%',
					padding: '0.5rem'
				}}
				/>
				{routeName && <button className="saveButton" onClick={async () => {
					if (routeName) {
						const data = await window.api.readRoutesFile()
						const matchingRoute = data.routes.find(route => route?.name === routeName)
						matchingRoute.side = exportObject.side
						matchingRoute.route = exportObject.route
						matchingRoute.champions = exportObject.champions
						window.api.writeRoutesFile(data)
					} else {
						// Make something that appears
					}
				}}>
					SAVE
				</button>
				}
				<button className="importOpen" onClick={importOnClick}>Import</button>
				<ImportDisplay /> 
			</div>
			<div className="camporder">
				{<button className="test"style={{width: '50px', height: '50px', position: 'absolute', zIndex: '100000'}} onClick={async () => window.LCUApi.setRoute(routeGameData) }></button> }
				<ExpDisplay 
					displayTable={false}
					undermapContainerStyle={{
						left: '0%',
						top: '0%',
						width: '100%',
						height: '19%',
						zIndex: '10000',
						backgroundColor: 'rgba(39, 39, 46)'
					}}
				/>

				<SelectChamp 
					searchBarContainerStyle={{
						height: '18%'
					}}
					champImagesStyle={{
						overflowY: 'hidden'
					}}
					optionsStyle={{
						maxHeight: '340%'
					}}
				/>
			</div>
		</div>
	)
}
 
export default LobbyPage