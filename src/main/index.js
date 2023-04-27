import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import fs from 'fs'
import path from 'path'


function createWindow() {
	// Create the browser window.
	const mainWindow = new BrowserWindow({
		width: 1920,
		height: 1080,
		show: false,
		autoHideMenuBar: true,
		...(process.platform === 'linux' ? { icon } : {}),
		webPreferences: {
			preload: join(__dirname, '../preload/index.js'),
			sandbox: false
		},
		resizable: false,
	// Make your own eventually?
	//	frame: false
	})

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
		mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
	} else {
		mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
	}

	// ipcHandlers and events
	// Resizes the window if the current window size does not match the passed values.
	ipcMain.on('resizeWindow', (event, width, height) => {
		const currentSize = mainWindow.getSize()
		if (currentSize[0] !== width || currentSize[1] !== height) {
			mainWindow.setResizable(true)
			mainWindow.setSize(width, height)
			mainWindow.setResizable(false)
		}
	})
	// Returns the current size of the window
	ipcMain.handle('getSizes', () => {
		return mainWindow.getSize()
	}) 

	ipcMain.handle('readRoutesFile', async () => {
		const filePath = path.join(app.getPath('userData'), 'routes.json')
		return new Promise((resolve, reject) => {
			fs.readFile(filePath, 'utf-8', (err, data) => {
				if (err) {
					reject(err)
				} else {
					resolve(data)
				}
			})
		})
	})

	ipcMain.on('writeRoutesFile', async (event, data) => {
		const filePath = path.join(app.getPath('userData'), 'routes.json')
		fs.writeFile(filePath, JSON.stringify(data), (err) => {
			if (err) {
				console.error(err)
				return
			}
			console.log('File rewritten successfully!')
		})
	})


}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
	// Set app user model id for windows
	electronApp.setAppUserModelId('com.electron')

	const filepath = path.join(app.getPath('userData'), 'routes.json')
	const data = {
		routes:
		[
			{
				name: 'Route One',
				distance: 10,
				duration: 120
			},
			{
				name: 'Route Two',
				distance: 5,
				duration: 60
			},
			{
				name: 'Route Three',
				distance: 15,
				duration: 180
			}
		],
	}


	createFileIfNotExists(filepath, data)

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
  