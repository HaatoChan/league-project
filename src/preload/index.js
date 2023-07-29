import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { isTest } from '../util'

if (isTest) {
	import('wdio-electron-service/preload')
}

// Custom APIs for renderer
const api = {
	/**
	 *
	 */
	appIcon: async () => {
		const path = await ipcRenderer.invoke('appicon')
		return path
	},
	/**
	 * Testing thing.
	 * @param {number} width - Thw width to resize the window.
	 * @param {number} height - The height to resize the window to.
	 */
	resizeWindow: (width, height) => {
		ipcRenderer.send('resizeWindow', width, height)
	},
	/**
	 * Gets the size of the window and returns it.
	 * @returns {Array} - Returns an array containing the width and height of the window.
	 */
	getSizes: async () => {
		const sizes = await ipcRenderer.invoke('getSizes')
		return sizes
	},
	/**
	 * Reads and logs a text file.
	 * @returns {object} - Returns an object with the routes.
	 */
	readRoutesFile: async () => {
		const textFile = await ipcRenderer.invoke('readRoutesFile')
		return JSON.parse(textFile)
	},
	/**
	 * Writes the passed data to the JSON file.
	 * @param {object} data - An object containing routes data.
	 */
	writeRoutesFile: (data) => {
		ipcRenderer.send('writeRoutesFile', data)
	},
	/**
	 * Passes the itemdata from the main process to the renderer.
	 * @returns {object} - A javasript object holding all the item data.
	 */
	itemData: async () => await ipcRenderer.invoke('itemData'),
	/**
	 * Tells the renderer that item data failed to fetch.
	 * @param {Function} callback - The callback function to execute
	 */
	failedFetch: (callback) => {
		ipcRenderer.on('failed-to-fetch', callback)
	},
	/**
	 * Tells the main to clear the main interval.
	 */
	clearMainInterval: () => {
		ipcRenderer.send('clearInterval')
	},
	/**
	 * Fired when the user attempts to refetch the itemdata.
	 */
	reTryFetch: () => {
		ipcRenderer.send('retryFetch')
	},
	/**
	 * Sends the itemData to the renderer.
	 * @param {Function} callback - The callback function to execute
	 */
	itemDataToRenderer: (callback) => {
		ipcRenderer.on('itemdata-to-renderer', callback)
	},
	/**
	 * Executed when the fetch attempt succeeds.
	 * @param {Function} callback - The callback function to execute.
	 */
	fetchSuccess: (callback) => {
		ipcRenderer.on('fetch-success', callback)
	}
}
const LCUApi = {
	/**
	 * Listens to if the lcu was connected
	 * @param {Function} callback - The callback function execute
	 */
	lcuConnected: (callback) => {
		ipcRenderer.on('lcu-connected', callback)
	},
	/**
	 * Receives lobby information from the main thread.
	 * @param {Function} callback - The callback function execute
	 */
	lobbyInfo: (callback) => {
		ipcRenderer.on('champ-select-info', callback)
	},
	/**
	 * Receives information about the game starting
	 * @param {Function} callback - The callback function execute
	 */
	gameStarting: (callback) => {
		ipcRenderer.on('game-starting', callback)
	},
	/**
	 * Receives information about the game having ended
	 * @param {Function} callback - The callback function to execute
	 */
	gameEnded: (callback) => {
		ipcRenderer.on('game-ended', callback)
	},
	/**
	 * Receives information that the user has entered a lobby
	 * @param {Function} callback - The callback function to execute	 
	 */
	lobbyEntered: (callback) => {
		ipcRenderer.on('lobby-entered', callback)
	},
	/**
	 * Receives information that the user has exited the lobby
	 * @param {Function} callback - The callback function to execute	 
	 */
	lobbyExited: (callback) => {
		ipcRenderer.on('lobby-exited', callback)
	},
	/**
	 * Tells the renderer to update its route data.
	 * @param {Function} callback - The callback function to execute	 
	 */
	updateRoutesCache: (callback) => {
		ipcRenderer.on('winrate-updated', callback)
	},
	/**
	 * Tells the main process to update the winrate
	 * @param {object} route - The object in question
	 * @param {object} localPlayer - The localPlayer data from the league client
	 */
	updateWinrate: (route, localPlayer) => {
		ipcRenderer.send('update-route-winrate', route, localPlayer)
	},
	/**
	 * Sets the route in the main process.
	 * @param {object} route - The route to set
	 * @param {Array} enemyTeam - An array of objects containing the enemy team
	 */
	setRoute: (route, enemyTeam) => {
		ipcRenderer.send('setRoute', route, enemyTeam)
	},
	/**
	 * Tells the renderer to update the displayed winrate on game end.
	 * @param {Function} callback - The callback function to execute
	 */
	updateRouteData: (callback) => {
		ipcRenderer.on('update-route-data', callback)
	}

}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
	try {
		contextBridge.exposeInMainWorld('electron', electronAPI)
		contextBridge.exposeInMainWorld('api', api)
		contextBridge.exposeInMainWorld('LCUApi', LCUApi)
	} catch (error) {
		console.error(error)
	}
} else {
	window.electron = electronAPI
	window.LCUApi = LCUApi
	window.api = api
}
  
