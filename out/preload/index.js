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
  },
  /**
   * Gets the size of the window and returns it.
   * @returns {Array} - Returns an array containing the width and height of the window.
   */
  getSizes: async () => {
    const sizes = await electron.ipcRenderer.invoke("getSizes");
    return sizes;
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
