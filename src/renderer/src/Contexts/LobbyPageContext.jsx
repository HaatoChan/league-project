import { createContext, useState, useEffect } from 'react'
import { championIds, summonerIds } from '../Data/Objects'
import { useNavigate, useLocation } from 'react-router'
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
	const [itemData, setItemData] = useState()
	const navigate = useNavigate()
	const location = useLocation()
	// Receives information from the main process about state of champion select
	window.LCUApi.lobbyInfo((_event, value) => {
		value.myTeam.sort((a, b) => positionsOrder.indexOf(a.assignedPosition) - positionsOrder.indexOf(b.assignedPosition))
		if (value.theirTeam.length > 0) {
			setEnemyTeam(value.theirTeam)
		}
		const combinedTeamArray = [...value.theirTeam, ...value.myTeam]
		if(combinedTeamArray.length > 0) {
			setTeamArray(combinedTeamArray)
		}
	})

	window.api.itemDataToRenderer((_event, value) => {
		setItemData(value)
	})

	// Receives information from main process that the game has ended
	window.LCUApi.gameEnded(() => {
		location.pathname === '/lobby-screen' ? {} : navigate('/lobby-screen')
		setGameStarting(false)
	})

	// Receives information from main process that the game has started
	window.LCUApi.gameStarting(() => {
		setGameStarting(true)
	})

	window.LCUApi.lobbyExited(() => {
		setTeamArray([])
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
		teamArray ?	resolveImages() : {}
	},[teamArray])

	useEffect(() => {
		/**
		 * Pulls the item data from main and sets a state.
		 */
		const getItemsFromMain = async () => {
			const holder = await window.api.itemData()
			if (!itemData) {
				setItemData(holder)
			}
		}
		if(!itemData) {
			getItemsFromMain()
		}
	},[itemData])

	return <LobbyContext.Provider
		value={{
			championIds: championIds,
			teamArray: teamArray,
			imgArray: imgArray,
			gameStarting: gameStarting,
			enemyTeam: enemyTeam,
			itemData: itemData
		}}
	>
		{children}
	</LobbyContext.Provider>
}


export default LobbyContextProvider