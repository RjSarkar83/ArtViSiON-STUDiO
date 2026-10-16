/* ArtViSiON STUDiO v4.5 - Electron main process */
const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 940,
    minHeight: 600,
    title: 'ArtViSiON STUDiO v9.9',
    backgroundColor: '#14161c',
    show: false,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      spellcheck: false
    }
  });
  // App apna pura UI khud render karti hai - default menu hata do
  Menu.setApplicationMenu(null);
  win.loadFile(path.join(__dirname, 'app.html'));
  win.once('ready-to-show', () => win.show());
  // Title wapas set karo (HTML title se overwrite na ho)
  win.on('page-title-updated', (e) => e.preventDefault());
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
