import { app, shell, BrowserWindow, ipcMain, ipcRenderer } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import fs from 'fs'
import path from 'path'
import { isTest } from '../util'
import { authenticate, LeagueClient, createWebSocketConnection } from 'league-connect'

if (isTest) {
	import('wdio-electron-service/main')
}

let mainWindow
// LCU variables
let credentials
let client
let interval

async function createWindow() {
	const { width, height } = JSON.parse(await readFile(path.join(app.getPath('userData'), 'settings.json'))).resolution

	// Create the browser window.
	mainWindow = new BrowserWindow({
		width: width,
		height: height,
		show: false,
		autoHideMenuBar: true,
		...(process.platform === 'linux' ? { icon } : {}),
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
	//	mainWindow.webContents.openDevTools()

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

	ipcMain.handle('readRoutesFile', async () => {
		return readFile(path.join(app.getPath('userData'), 'routes.json'))
	})

	ipcMain.on('writeRoutesFile', async (event, data) => {
		writeFile(data, path.join(app.getPath('userData'), 'routes.json'))
	})

	// For testing
	ipcMain.handle('wdio-electron', () => mainWindow.webContents.getURL())
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {

	// Connect to league client
	//	interval = setInterval(lcuConnect, 10000)
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

/**
 * Function for connecting to the LCU
 */
const lcuConnect = async () => {
	try {
		credentials = await authenticate()
		console.log(credentials)
		client = new LeagueClient(credentials)
		// If client connects then declare the event emitters
		if (client) {
			client.start()			
			client.on('connect', (newCredentials) => {
				console.log(newCredentials)
			})
			// Atempt to open websocket
			ws = await createWebSocketConnection()
			mainWindow.webContents.send('lcu-connected', 'LCU is connected')
			// Declare event subscriptions
			ws.subscribe('/lol-champ-select/v1/session', (data) => {
				console.log(data)
				mainWindow.webContents.send('champ-select-info', data)
			})
			ws.subscribe('/lol-end-of-game/v1/eog-stats-block', (data) => {
				console.log('end of game: ' + JSON.stringify(data))
				console.log(data.localPlayer)
			})
			clearInterval(interval)
		} 
	} catch (error) {
		credentials = null
	}
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