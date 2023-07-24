import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import fs from 'fs'
import path from 'path'
import { isTest } from '../util'
import { authenticate, LeagueClient, createWebSocketConnection } from 'league-connect'
import fetch from 'node-fetch'
import { leaguePatch } from '../renderer/src/Data/PatchInfo'

if (isTest) {
	import('wdio-electron-service/main')
}

let mainWindow
// LCU variables
let credentials
let client
let interval
let selectedRoute = null

async function createWindow() {
	const { width, height } = JSON.parse(await readFile(path.join(app.getPath('userData'), 'settings.json'))).resolution

	// Create the browser window.
	mainWindow = new BrowserWindow({
		width: width,
		height: height,
		show: false,
		autoHideMenuBar: true,
		...(process.platform === 'linux' ? { } : {}),
		webPreferences: {
			preload: join(__dirname, '../preload/index.js'),
			sandbox: false,
			nodeIntegrationInWorker: true
		},
		resizable: false,
	// Make your own eventually?
	//	frame: false
	})

	// Open the webtools
	mainWindow.webContents.openDevTools()

	mainWindow.on('ready-to-show', () => {
		mainWindow.show()
	})

	mainWindow.webContents.setWindowOpenHandler((details) => {
		shell.openExternal(details.url)
		return { action: 'deny' }
	})

	// HMR for renderer base on electron-vite cli.
	// Load the remote URL for development or the local html file for production.
	if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
		mainWindow.loadURL(`${process.env['ELECTRON_RENDERER_URL']}`)
	} else {
		mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
	}

	// ipcHandlers and events
	// Resizes the window if the current window size does not match the passed values.
	ipcMain.on('resizeWindow', async (event, width, height) => {
		const currentSize = mainWindow.getSize()
		if (currentSize[0] !== width || currentSize[1] !== height) {
			mainWindow.setResizable(true)
			mainWindow.setSize(width, height)
			mainWindow.setResizable(false)
			const data = JSON.parse(await readFile(path.join(app.getPath('userData'), 'settings.json')))
			data.resolution.width = width
			data.resolution.height = height
			writeFile(data, path.join(app.getPath('userData'), 'settings.json'))
		}
	})
	// Returns the current size of the window
	ipcMain.handle('getSizes', () => {
		return mainWindow.getSize()
	}) 

	// For reading and writing to file
	ipcMain.handle('readRoutesFile', async () => {
		return readFile(path.join(app.getPath('userData'), 'routes.json'))
	})

	ipcMain.on('writeRoutesFile', async (event, data) => {
		writeFile(data, path.join(app.getPath('userData'), 'routes.json'))
	})
	
	const itemData = await fetchItemData()
	let nullVall
	if (!itemData) {
		nullVall = setInterval(() => {
			if (BrowserWindow.getAllWindows().length > 0) {
				mainWindow.webContents.send('failed-to-fetch', 'testfromfetchitemdata')
			}},1000)
	}

	ipcMain.on('clearInterval', () => {
		clearInterval(nullVall)
	})


	ipcMain.handle('itemData', () => {
		return itemData
	})

	// For testing
	ipcMain.handle('wdio-electron', () => mainWindow.webContents.getURL())
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {

	// Connect to league client
	interval = setInterval(lcuConnect, 5000)
	// Set app user model id for windows
	electronApp.setAppUserModelId('com.electron')

	const routesfilepath = path.join(app.getPath('userData'), 'routes.json')
	const routesData = {
		routes:
		[
		],
	}

	const settingsFilePath = path.join(app.getPath('userData'), 'settings.json')

	const settingsData = {
		resolution:  {
			width: 1600,
			height: 900
		}
	}
	createFileIfNotExists(settingsFilePath, settingsData)
	createFileIfNotExists(routesfilepath, routesData)

	// Default open or close DevTools by F12 in development
	// and ignore CommandOrControl + R in production.
	// see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
	app.on('browser-window-created', (_, window) => {
		optimizer.watchWindowShortcuts(window)
	})

	createWindow()

	app.on('activate', function () {
		// On macOS it's common to re-create a window in the app when the
		// dock icon is clicked and there are no other windows open.
		if (BrowserWindow.getAllWindows().length === 0) createWindow()
	})

	ipcMain.on('setRoute', async (_event, route) => {
		selectedRoute = route
		const dummyData =  JSON.parse(await readFile(path.join(app.getPath('userData'), 'dummydata.json')))
		mainWindow.webContents.send('game-ended', dummyData)
	})
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.


// LCU connection
let ws
let gameEnded = 0
/**
 * Function for connecting to the LCU
 */
const lcuConnect = async () => {
	try {
		credentials = await authenticate()
		client = new LeagueClient(credentials)
		// If client connects then declare the event emitters
		if (client) {
			client.start()			
			client.on('connect', (newCredentials) => {
				console.log(newCredentials)
			})
			client.on('disconnect', () => {
				// Attempt to reconnect upon disconnect
				interval = setInterval(lcuConnect, 5000)
			})
			// Atempt to open websocket
			ws = await createWebSocketConnection()
			mainWindow.webContents.send('lcu-connected', 'LCU is connected')

		
			// Used to determine whether game has started or not
			let gameStarted = false
			// Declare event subscriptions

			ws.subscribe('/lol-champ-select/v1/session', (data) => {
				// Triggers when user firsts enter the lobby
				if(data.timer.phase === 'PLANNING' && data.myTeam.length > 0) {
					mainWindow.webContents.send('lobby-entered')
				} else if (data.timer.phase === '' && data.myTeam.length === 0) {
					if (!gameStarted) {
						mainWindow.webContents.send('lobby-exited')
					}
				}
				// Send info about lobby state
				if(data.timer.phase !== 'GAME_STARTING') {
					mainWindow.webContents.send('champ-select-info', data)
				} 
				// Send information that the game is starting
				else if (data.timer.phase === 'GAME_STARTING') {
					gameEnded = 0
					gameStarted = true
					mainWindow.webContents.send('game-starting')
				}
			}) 
			ws.subscribe('/lol-end-of-game/v1/eog-stats-block', async (data) => {
				gameStarted = false
				mainWindow.webContents.send('lobby-exited')
				if(gameEnded === 0) {
					try {
						if (Object.keys(selectedRoute).length > 0 && data?.localPlayer) {
							mainWindow.webContents.send('game-ended', data)
							const allRoutes = JSON.parse(await readFile(path.join(app.getPath('userData'), 'routes.json')))
							const selectedRouteIndex = allRoutes.routes.findIndex(route => route.name === selectedRoute.name)
							if (selectedRouteIndex !== 1) {
								const foundRoute = allRoutes.routes[selectedRouteIndex]
								// Parse data and find enemy team index
								let enemyTeamDataArray = []
								data.teams[0].isPlayerTeam === true ? enemyTeamDataArray = data.teams[1] : enemyTeamDataArray = data.teams[0]
								// Find and assign win/loss to champion specific enemy jungle
								const enemyJgl = findEnemyJgl(enemyTeamDataArray.players)
								if (enemyJgl) {
									// eslint-disable-next-line no-unused-vars
									for (const [key, champion] of Object.entries(foundRoute.gameData.vsChampion)) {
										if (Object.keys(champion)[0] === enemyJgl.championId.toString()) {
											if (data.localPlayer.stats.LOSE){
												champion[Object.keys(champion)[0]].totalLosses++
												champion[Object.keys(champion)[0]].totalGames++
											} else if (data.localPlayer.stats.WIN) {
												champion[Object.keys(champion)[0]].totalWins++
												champion[Object.keys(champion)[0]].totalGames++
											}
											champion[Object.keys(champion)[0]].totalWr = `${Math.round((champion[Object.keys(champion)[0]].totalWins / champion[Object.keys(champion)[0]].totalGames) * 100)}%`
										}
									}
								}
								// Overall winrate
								if (data.localPlayer.stats.LOSE) {
									foundRoute.gameData.totalLosses++
									foundRoute.gameData.totalGames++
								} else if (data.localPlayer.stats.WIN) {
									foundRoute.gameData.totalWins++
									foundRoute.gameData.totalGames++
								}
								foundRoute.gameData.name = selectedRoute.name
								foundRoute.gameData.totalWr = `${Math.round((foundRoute.gameData.totalWins / foundRoute.gameData.totalGames) * 100)}%`
								writeFile(allRoutes, path.join(app.getPath('userData'), 'routes.json'))
								mainWindow.webContents.send('update-route-data', foundRoute)
							}
						}
						selectedRoute = null
						gameEnded++
					} catch (err) {
						console.log(err)
					}
				} 
			})
			clearInterval(interval)
		} 
	} catch (error) {
		credentials = null
	}
}

// Find Jungler

function findEnemyJgl(enemyTeamPlayers) {
	let jungler
	for(let i = 0; i < enemyTeamPlayers.length; i++) {
		if (enemyTeamPlayers[i].detectedTeamPosition === 'JUNGLE' && (enemyTeamPlayers[i].spell1Id === 11 || enemyTeamPlayers[i].spell2Id === 11)) {
			jungler = enemyTeamPlayers[i]
		}
	}	
	return jungler
} 

/// Write to files

function createFileIfNotExists(filepath, data) {
	if(!checkIfFileExists(filepath)) {
		fs.writeFile(filepath, JSON.stringify(data), (err) => {
			if (err) {
				console.error(err)
				return
			}
			console.log('File created successfully!')
		})
	} 
}

function checkIfFileExists(filepath) {
	try {
		return fs.existsSync(filepath)
	} catch (err) {
		console.error(err)
		return false
	}
}
  

function readFile(path) {
	return new Promise((resolve, reject) => {
		fs.readFile(path, 'utf-8', (err, data) => {
			if (err) {
				reject(err)
			} else {
				resolve(data)
			}
		})
	})
}

function writeFile(data, path) {
	fs.writeFile(path, JSON.stringify(data), (err) => {
		if (err) {
			console.error(err)
			return
		}
		console.log('File rewritten successfully!')
	})
}

// SAVE MODIFIED OBJECT AS JSON IN APPDATA IF IT DOES NOT EXIST
async function fetchItemData() {
	let url = `http://ddragon.leagueoflegends.com/cdn/${leaguePatch}/data/en_GB/item.json`
	try {
		const response = await fetch(url)
		const holder = await response.json()
		addImagePaths(holder.data)
		return holder.data
	} catch (err) {
		return null
	}
}


/**
 * Adds an image path url to riots datadragon CDN.
 * @param {object} itemObject - Object containing all item objects
 */
async function addImagePaths (itemObject) {
	for (const [key, value] of Object.entries(itemObject)) {
		value.img = `http://ddragon.leagueoflegends.com/cdn/${leaguePatch}/img/item/${key}.png`
	}
}