"use strict";
const electron = require("electron");
const path = require("path");
const utils = require("@electron-toolkit/utils");
const fs = require("fs");
async function createWindow() {
  const { width, height } = JSON.parse(await readFile(path.join(electron.app.getPath("userData"), "settings.json"))).resolution;
  const mainWindow = new electron.BrowserWindow({
    width,
    height,
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
  electron.ipcMain.on("resizeWindow", async (event, width2, height2) => {
    const currentSize = mainWindow.getSize();
    if (currentSize[0] !== width2 || currentSize[1] !== height2) {
      mainWindow.setResizable(true);
      mainWindow.setSize(width2, height2);
      mainWindow.setResizable(false);
      const data = JSON.parse(await readFile(path.join(electron.app.getPath("userData"), "settings.json")));
      data.resolution.width = width2;
      data.resolution.height = height2;
      writeFile(data, path.join(electron.app.getPath("userData"), "settings.json"));
    }
  });
  electron.ipcMain.handle("getSizes", () => {
    return mainWindow.getSize();
  });
  electron.ipcMain.handle("readRoutesFile", async () => {
    return readFile(path.join(electron.app.getPath("userData"), "routes.json"));
  });
  electron.ipcMain.on("writeRoutesFile", async (event, data) => {
    writeFile(data, path.join(electron.app.getPath("userData"), "routes.json"));
  });
}
electron.app.whenReady().then(() => {
  utils.electronApp.setAppUserModelId("com.electron");
  const routesfilepath = path.join(electron.app.getPath("userData"), "routes.json");
  const routesData = {
    routes: []
  };
  const settingsFilePath = path.join(electron.app.getPath("userData"), "settings.json");
  const settingsData = {
    resolution: {
      width: 1600,
      height: 900
    }
  };
  createFileIfNotExists(settingsFilePath, settingsData);
  createFileIfNotExists(routesfilepath, routesData);
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
function readFile(path2) {
  return new Promise((resolve, reject) => {
    fs.readFile(path2, "utf-8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}
function writeFile(data, path2) {
  fs.writeFile(path2, JSON.stringify(data), (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("File rewritten successfully!");
  });
}
