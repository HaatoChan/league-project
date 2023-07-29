import { patchInfo } from '../renderer/src/Data/PatchInfo'
import { championIds } from '../renderer/src/Data/Objects'

/**
 * Used to update the routes with new champions on new patch.
 * @param {object} routeData - Contains all the users routes.
 * @returns {boolean} - Whether to update the routes file or not.
 */
export const updateRoute = (routeData) => {
	let update = false
	for (let i = 0; i < routeData.routes.length; i++) {
		if (routeData.routes[i].patch !== patchInfo.currentPatch) {
			const routeDataKeys = []
			for (const vsChampObject of routeData.routes[i].gameData.vsChampion) {
				routeDataKeys.push(Object.keys(vsChampObject)[0])
			}
			for (const [key, value] of Object.entries(championIds)) {
				const found = routeDataKeys.find(champKey => champKey === key)
				if (!found) {
					const builtChampion = buildChampionObject(key, value.name)
					routeData.routes[i].gameData.vsChampion.push(builtChampion)
					update = true
				}
			}
		}
	}
	return update
}

/**
 * Used to build the champion object if it does not exist.
 * @param {number} key - Champion ID of the champion
 * @param {string} name - Name of the champion.
 * @returns {object} - Returns the built champion object.
 */
const buildChampionObject = (key, name) => {
	const champObject = {
		[key]: {
			name: name,
			totalWr: '-%',
			totalGames: 0,
			totalWins: 0,
			totalLosses: 0
		}
	}
	return champObject
}