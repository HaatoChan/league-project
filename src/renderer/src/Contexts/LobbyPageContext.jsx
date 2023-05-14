import { createContext, useState, useEffect } from 'react'
import { championIds, summonerIds } from '../Data/Objects'
import React from 'react'

export const LobbyContext = createContext()

/**
 * The context for the lobby page.
 * @param {React.PropsWithChildren} props - The component props.
 * @returns {JSX.Element} - The JSX element to be rendered.
 */
const LobbyContextProvider = ({children}) => {
    
	const positionsOrder = ['top', 'jungle', 'middle', 'bottom', 'utility']

	const [teamArray, setTeamArray] = useState([])
	const [imgArray, setImgArray] = useState([])
	const [gameStarting, setGameStarting] = useState(false)
	const [enemyTeam, setEnemyTeam] = useState(null)
	// Receives information from the main process about state of champion select
	window.LCUApi.lobbyInfo((_event, value) => {
		value.myTeam.sort((a, b) => positionsOrder.indexOf(a.assignedPosition) - positionsOrder.indexOf(b.assignedPosition))
		console.log(value)
		setEnemyTeam(value.theirTeam)
		const combinedTeamArray = [...value.theirTeam, ...value.myTeam]
		if(combinedTeamArray.length > 0) {
			setTeamArray(combinedTeamArray)
		}
	})

	// Receives information from main process that the game has ended
	window.LCUApi.gameEnded(() => {
		setGameStarting(false)
	})

	// Receives information from main process that the game has started
	window.LCUApi.gameStarting(() => {
		setGameStarting(true)
	})

	useEffect(() => {
		/**
		 * Resolves all the images
		 */
		const resolveImages = async () => {
			const copiedArray = Array.from(teamArray)
			for (let i = 0; i < teamArray.length; i++) {
				const imgUrl = await championIds[teamArray[i]?.championId]?.image
				copiedArray[i].championImage = imgUrl
				const summonerOneUrl = await summonerIds[teamArray[i]?.spell1Id]?.image
				copiedArray[i].spell1Id = summonerOneUrl
				const summonerTwoUrl = await summonerIds[teamArray[i]?.spell2Id]?.image
				copiedArray[i].spell2Id = summonerTwoUrl
				setImgArray(copiedArray)
			}
		}
		resolveImages()
	},[teamArray])

	return <LobbyContext.Provider
		value={{
			championIds: championIds,
			teamArray: teamArray,
			imgArray: imgArray,
			gameStarting: gameStarting,
			enemyTeam: enemyTeam
		}}
	>
		{children}
	</LobbyContext.Provider>
}


export default LobbyContextProvider