"use strict";
const electron = require("electron");
const preload = require("@electron-toolkit/preload");
const api = {
  /**
   * Testing thing.
   * @param {number} width - Thw width to resize the window.
   * @param {number} height - The height to resize the window to.
   */
  resizeWindow: (width, height) => {
    electron.ipcRenderer.send("resizeWindow", width, height);
  }
};
if (process.contextIsolated) {
  try {
    electron.contextBridge.exposeInMainWorld("electron", preload.electronAPI);
    electron.contextBridge.exposeInMainWorld("api", api);
  } catch (error) {
    console.error(error);
  }
} else {
  window.electron = preload.electronAPI;
  window.api = api;
}
