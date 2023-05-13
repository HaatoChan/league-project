import { createContext, useState } from 'react'
import React, { useEffect } from 'react'

export const CampSelectionContext = createContext()

/**
 * A React component that provides context for exp and gold values.
 * @param {React.PropsWithChildren} props - The component props.
 * @returns {JSX.Element} - The JSX element to be rendered.
 */
const CampSelectionContextProvider = ({children}) => {
	const champNames = ''
	const [selectedChampions, setSelectedChampions] = useState(() => {
		if (champNames && champNames[0]) { // add an additional check here
			const nameArray = champNames.map(champ => champ.replace(/%20/g, ' '))
			return nameArray
		} else {
			return []
		}
	})
	
	const [sideSelected, setSideSelected] = useState('All')
	const [campNumber, setCampNumber] = useState(0)
	const [selectedCamps, setSelectedCamps] = useState([])
	const [totalExp, setTotalExp] = useState(0)
	const [totalGold, setTotalGold] = useState(0)
	const [level, setLevel] = useState(1)
	const totalRequired = [ 280, 380, 480, 580, 680, 780, 880, 980, 1080, 1180, 1280, 1380, 1480, 1580, 1680, 1780, 1880]
	const [exportUrl, setExportUrl] = useState('https://fluffy-bombolone-8bfa7b.netlify.app/All//')
	const [exportObject, setExportObject] = useState({})
	const [routeName, setRouteName] = useState('')
	const [totalWr, setTotalWr] = useState(null)
	const [gameSelectedRoute, setGameSelectedRoute] = useState(null)
	const [routeGameData, setRouteGameData] = useState({})

	// Receives information from the main process that the game is starting
	window.LCUApi.gameStarting(async () => {
		if (routeName) {
			const data = await window.api.readRoutesFile()
			const selectedRoute = data.routes.find(route => route.name === routeName)
			setGameSelectedRoute(selectedRoute)
			console.log('Game starting selected: ')
			console.log(selectedRoute)
		}
	})
	// Receives information from the main process that the game ended
	window.LCUApi.gameEnded((_event, value) => {
		console.log('Game ending all data from renderer: ')
		console.log(value)
		// Update the winrate
		updateWinrate(value.localPlayer)
	})

	/**
	 * Updates the winrate after the game has ended
	 * @param {object} localPlayerData - The local players winrate on game end.
	 */
	const updateWinrate = async (localPlayerData) => {
		gameSelectedRoute.totalGames++
		console.log('Before game updated: ')
		console.log(gameSelectedRoute)
		if(localPlayerData.stats.LOSE) {
			gameSelectedRoute.totalLosses++
		} else if (localPlayerData.stats.WIN) {
			gameSelectedRoute.totalWins++
		}
		console.log('After updates gameselected route: ')
		console.log(gameSelectedRoute)
		const data = await window.api.readRoutesFile()

		// Find the index and replace
		const selectedRouteIndex = data.routes.findIndex(route => route.name === gameSelectedRoute.name)
		if (selectedRouteIndex !== -1) {
			const selectedRoute = data.routes[selectedRouteIndex]
			Object.assign(selectedRoute, gameSelectedRoute)
			data.routes[selectedRouteIndex] = selectedRoute
			await window.api.writeRoutesFile(data)
		}
	}

	/**
	 * Adds experience to the totalExp state.
	 * @param {number} expvalue - The exp value to work with.
	 */
	const expAdd = (expvalue) => {
		if (selectedCamps.length === 0) {
			setTotalExp((Number(expvalue) + 150) - totalRequired[level - 1])
			Number(expvalue) + 150 >= totalRequired[level - 1]
				? setLevel(level + 1)
				: {}
		} else {
			if(totalExp + Number(expvalue) >= totalRequired[level - 1]) {
				setTotalExp((totalExp + Number(expvalue)) - totalRequired[level - 1])
				setLevel(level + 1)
			} else {
				setTotalExp(totalExp + Number(expvalue))
			}
		}
	}

	useEffect(() => {
		const selectedCampIds = selectedCamps.map((camp) => camp.id).join(':')
		const selectedChamps = selectedChampions.map((champ) => champ).join(':')
		const encodedIds = window.btoa(selectedCampIds)
		let newUrl = `https://fluffy-bombolone-8bfa7b.netlify.app/${sideSelected}/${encodedIds}/`
		if(selectedChamps) {
			newUrl += `${selectedChamps}`
		}
		setExportUrl(newUrl)
		const routeObject = {side: sideSelected, route: encodedIds, champions: selectedChamps}
		setExportObject(routeObject)
	}, [sideSelected, selectedCamps, selectedChampions])	

	/**
	 * Reduces experience for the totalExp state.
	 * @param {number} expvalue - The exp value to work with.
	 */
	const expDetract = (expvalue) => {
		if(selectedCamps.length === 1) {
			setTotalExp(0)
			setLevel(level - 1)
		} else {
			if(totalExp - Number(expvalue) < 0) {
				const amountToDetract = totalExp - Number(expvalue)
				const nextRequiredExp = totalRequired[level - 2]
				setTotalExp(nextRequiredExp + amountToDetract)
				setLevel(level - 1)
			} else {
				setTotalExp(totalExp - Number(expvalue))
			}
		}
	}

	/**
	 * Handles the imported data.
	 * @param {string} importValue - The import value.
	 */
	const createImport = async (importValue) => {
		try {
			const importData = JSON.parse(importValue)
			setSideSelected(importData?.side)
			// Split the data and set selected champions
			const championArray = importData?.champions?.split(':')
			if(championArray) {
				championArray[0]?.length > 0 ? setSelectedChampions(championArray) : setSelectedChampions([])
			}
			// Set the camps
			await resetAll()
			if (importData.route) {
				const string = atob(importData?.route)
				let newArray = []
				newArray = string.split(':')
				const allCamps = document.getElementsByClassName('buttonCamp')
				for(const elements of allCamps) {
					if(elements.dataset.iscampselected === 'true') {
						await elements.click()
					}
				}
				for(const element of newArray) {
					const button = document.getElementById(element)
					await button.click()
				}
			}
			if (importData.name) {
				setRouteName(importData.name)
			}
			if(importData.gameData) {
				setRouteGameData(importData.gameData)
			}
		} catch (error) {
			console.error(error)
		}
	}

	/**
	 * Resets all of the camp options and exp
	 */
	const resetAll = async () => {
		setSelectedCamps([])
		setCampNumber(0)
		setTotalGold(0)
		setLevel(1)
		setTotalExp(0)

		// Wait for state updates to complete
		await new Promise((resolve) => setTimeout(resolve, 100))
	}


	/**
	 * Handles the deletion of the currently selected route.
	 * @param {Function} setAllRoutes - The routes used in RouteSearch component.
	 */
	const deleteOnClick = async (setAllRoutes) => {
		const allRoutes = await window.api.readRoutesFile()
		const matchingRouteIndex = allRoutes.routes.findIndex(route => route.name === routeName)
  
		if (matchingRouteIndex !== -1) {
			allRoutes.routes.splice(matchingRouteIndex, 1)
			await window.api.writeRoutesFile(allRoutes)
			await resetAll()
			setSideSelected('All')
			setSelectedChampions([])
			console.log(allRoutes)
			setRouteName('')
			setTotalWr(null)
			setAllRoutes(allRoutes.routes)
		}
	}

	return <CampSelectionContext.Provider
		value={{
			// Add attributes here
			campNumber: campNumber,
			totalExp: totalExp,
			level: level,
			totalRequired: totalRequired,
			totalGold: totalGold,
			/**
			 * Resets all states.
			 */
			resetAll: resetAll,
			/**
			 * Saves the element target and retrieves values saved as attributes.
			 * @param {HTMLElement} e - The event target.
			 */
			addToCampNumber: (e) => {
				expAdd(e.dataset.expvalue)
				setTotalGold(totalGold + Number(e.dataset.goldvalue))
				setCampNumber(campNumber + 1)
				setSelectedCamps([...selectedCamps, e])
			},
			/**
			 * Removes the element target from state array and detracts its values from states.
			 * @param {HTMLElement} e - The event target.
			 */
			removeFromCampNumber: (e) => {
				expDetract(e.dataset.expvalue)
				const updatedSelectedCamps = selectedCamps.filter((element) => element !== e)
				setTotalGold(totalGold - Number(e.dataset.goldvalue))
				setSelectedCamps(updatedSelectedCamps)
				setCampNumber(updatedSelectedCamps.length)			
			},
			selectedCamps: selectedCamps,
			setSelectedCamps: setSelectedCamps,
			setSideSelected: setSideSelected,
			sideSelected: sideSelected,
			selectedChampions: selectedChampions,
			setSelectedChampions: setSelectedChampions,
			exportUrl: exportUrl,
			createImport: createImport,
			routeName: routeName,
			exportObject: exportObject,
			deleteOnClick: deleteOnClick,
			totalWr: totalWr,
			routeGameData: routeGameData
		}}
	>
		{children}
	</CampSelectionContext.Provider>
}

export default CampSelectionContextProvider
