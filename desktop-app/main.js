/* ArtViSiON STUDiO v9.9 - Electron main process */
const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const fs = require('fs/promises');
const path = require('path');

ipcMain.handle('artvision:read-portfolio-svg', async (event, filename) => {
  if (event.senderFrame !== event.sender.mainFrame) throw new Error('Only the Studio window can read mockup files.');
  if (typeof filename !== 'string' || !/^[A-Za-z0-9_.-]{1,160}\.svg$/i.test(filename)) {
    throw new Error('Invalid portfolio SVG filename.');
  }
  const assetRoot = path.resolve(__dirname, 'assets', 'mockups');
  const target = path.resolve(assetRoot, filename);
  if (!target.startsWith(assetRoot + path.sep)) throw new Error('Mockup path is outside the library.');
  const stat = await fs.stat(target);
  if (!stat.isFile() || stat.size > 6_000_000) throw new Error('Mockup SVG is missing or too large.');
  return fs.readFile(target, 'utf8');
});

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
      preload: path.join(__dirname, 'preload.js'),
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
