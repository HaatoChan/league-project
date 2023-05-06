import { createContext, useState, useEffect } from 'react'
import { championIds } from '../Data/Objects'


export const LobbyContext = createContext()

/**
 *
 * @param root0
 * @param root0.children
 */
const LobbyContextProvider = ({children}) => {
    
	const [teamArray, setTeamArray] = useState([])
	const [imgArray, setImgArray] = useState([])
	window.LCUApi.lobbyInfo((_event, value) => {
		const combinedTeamArray = [...value.myTeam, ...value.theirTeam]
		console.log(value.myTeam[0].championId)
		setTeamArray(combinedTeamArray)
	})

	useEffect(() => {
		/**
		 * Resolves all the images
		 */
		const resolveImages = async () => {
			const copiedArray = Array.from(teamArray)
			console.log(copiedArray)
			for (let i = 0; i < teamArray.length; i++) {
				const imgUrl = await championIds[teamArray[i]?.championId]?.image
				copiedArray[i].championImage = imgUrl
				setImgArray(copiedArray)
			}
		}
		resolveImages()
	},[teamArray])

	return <LobbyContext.Provider
		value={{
			championIds: championIds,
			teamArray: teamArray,
			imgArray: imgArray
		}}
	>
		{children}
	</LobbyContext.Provider>
}


export default LobbyContextProvider