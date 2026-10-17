'use strict';
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('artvisionMockupBridge', Object.freeze({
  readSvg: filename => ipcRenderer.invoke('artvision:read-portfolio-svg', filename)
}));
