"use strict";
const electron = require("electron");
const path = require("path");
const utils = require("@electron-toolkit/utils");
const fs = require("fs");
function createWindow() {
  const mainWindow = new electron.BrowserWindow({
    width: 1920,
    height: 1080,
    show: false,
    autoHideMenuBar: true,
    ...process.platform === "linux" ? { icon } : {},
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.js"),
      sandbox: false
    },
    resizable: false
    // Make your own eventually?
    //	frame: false
  });
  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });
  mainWindow.webContents.setWindowOpenHandler((details) => {
    electron.shell.openExternal(details.url);
    return { action: "deny" };
  });
  if (utils.is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    mainWindow.loadFile(path.join(__dirname, "../renderer/index.html"));
  }
  electron.ipcMain.on("resizeWindow", (event, width, height) => {
    const currentSize = mainWindow.getSize();
    if (currentSize[0] !== width || currentSize[1] !== height) {
      mainWindow.setResizable(true);
      mainWindow.setSize(width, height);
      mainWindow.setResizable(false);
    }
  });
  electron.ipcMain.handle("getSizes", () => {
    return mainWindow.getSize();
  });
  electron.ipcMain.handle("readRoutesFile", async () => {
    const filePath = path.join(electron.app.getPath("userData"), "routes.json");
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, "utf-8", (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  });
  electron.ipcMain.on("writeRoutesFile", async (event, data) => {
    const filePath = path.join(electron.app.getPath("userData"), "routes.json");
    fs.writeFile(filePath, JSON.stringify(data), (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("File rewritten successfully!");
    });
  });
}
electron.app.whenReady().then(() => {
  utils.electronApp.setAppUserModelId("com.electron");
  const filepath = path.join(electron.app.getPath("userData"), "routes.json");
  const data = {
    routes: []
  };
  createFileIfNotExists(filepath, data);
  electron.app.on("browser-window-created", (_, window) => {
    utils.optimizer.watchWindowShortcuts(window);
  });
  createWindow();
  electron.app.on("activate", function() {
    if (electron.BrowserWindow.getAllWindows().length === 0)
      createWindow();
  });
});
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    electron.app.quit();
  }
});
function createFileIfNotExists(filepath, data) {
  if (!checkIfFileExists(filepath)) {
    fs.writeFile(filepath, JSON.stringify(data), (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("File created successfully!");
    });
  }
}
function checkIfFileExists(filepath) {
  try {
    return fs.existsSync(filepath);
  } catch (err) {
    console.error(err);
    return false;
  }
}
